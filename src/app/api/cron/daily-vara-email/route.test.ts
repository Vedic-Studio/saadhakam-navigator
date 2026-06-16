import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

/**
 * Resend is mocked so no real email is ever sent. `contacts.list` and
 * `emails.send` are spies whose behaviour each test configures. The module
 * exports a mutable `resend` object the route imports by reference.
 */
const contactsList = vi.fn();
const emailsSend = vi.fn();

vi.mock("@/lib/resend", () => ({
  resend: {
    contacts: { list: (...args: unknown[]) => contactsList(...args) },
    emails: { send: (...args: unknown[]) => emailsSend(...args) },
  },
}));

function makeRequest(authHeader?: string): Request {
  const headers = new Headers();
  if (authHeader) headers.set("authorization", authHeader);
  return new Request("https://example.com/api/cron/daily-vara-email", { headers });
}

describe("GET /api/cron/daily-vara-email", () => {
  beforeEach(() => {
    contactsList.mockReset();
    emailsSend.mockReset();
    vi.stubEnv("CRON_SECRET", "test-secret");
    vi.stubEnv("RESEND_AUDIENCE_ID", "aud_123");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns 401 when the Authorization header is missing", async () => {
    const { GET } = await import("./route");
    const response = await GET(makeRequest());
    expect(response.status).toBe(401);
    // Never touched the subscriber list or sent anything.
    expect(contactsList).not.toHaveBeenCalled();
    expect(emailsSend).not.toHaveBeenCalled();
  });

  it("returns 401 when the bearer token is wrong", async () => {
    const { GET } = await import("./route");
    const response = await GET(makeRequest("Bearer wrong-token"));
    expect(response.status).toBe(401);
    expect(emailsSend).not.toHaveBeenCalled();
  });

  it("with a valid token, builds the email and sends to each active contact", async () => {
    contactsList.mockResolvedValue({
      data: {
        data: [
          { email: "a@example.com", unsubscribed: false },
          { email: "b@example.com", unsubscribed: false },
        ],
      },
      error: null,
    });
    emailsSend.mockResolvedValue({ data: { id: "msg_1" }, error: null });

    const { GET } = await import("./route");
    const response = await GET(makeRequest("Bearer test-secret"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({ sent: 2, failed: 0, total: 2 });

    // Sent once per active contact.
    expect(emailsSend).toHaveBeenCalledTimes(2);
    // The send payload carries the built subject/html and the daily-vara tag.
    const firstCall = emailsSend.mock.calls[0][0] as {
      to: string;
      subject: string;
      html: string;
      tags: { name: string; value: string }[];
    };
    expect(firstCall.to).toBe("a@example.com");
    expect(firstCall.subject.length).toBeGreaterThan(0);
    expect(firstCall.html).toContain("<!DOCTYPE html>");
    expect(firstCall.tags).toEqual([{ name: "source", value: "daily-vara" }]);
  });

  it("skips unsubscribed contacts", async () => {
    contactsList.mockResolvedValue({
      data: {
        data: [
          { email: "active@example.com", unsubscribed: false },
          { email: "gone@example.com", unsubscribed: true },
        ],
      },
      error: null,
    });
    emailsSend.mockResolvedValue({ data: { id: "msg_1" }, error: null });

    const { GET } = await import("./route");
    const response = await GET(makeRequest("Bearer test-secret"));
    const body = await response.json();

    expect(body.sent).toBe(1);
    expect(emailsSend).toHaveBeenCalledTimes(1);
    expect((emailsSend.mock.calls[0][0] as { to: string }).to).toBe("active@example.com");
  });

  it("counts a rejected send as failed without aborting the batch", async () => {
    contactsList.mockResolvedValue({
      data: {
        data: [
          { email: "ok@example.com", unsubscribed: false },
          { email: "bad@example.com", unsubscribed: false },
        ],
      },
      error: null,
    });
    emailsSend
      .mockResolvedValueOnce({ data: { id: "msg_1" }, error: null })
      .mockResolvedValueOnce({ data: null, error: { message: "rejected" } });

    const { GET } = await import("./route");
    const response = await GET(makeRequest("Bearer test-secret"));
    const body = await response.json();

    expect(body).toMatchObject({ sent: 1, failed: 1, total: 2 });
  });

  it("returns sent:0 when there are no active subscribers", async () => {
    contactsList.mockResolvedValue({ data: { data: [] }, error: null });

    const { GET } = await import("./route");
    const response = await GET(makeRequest("Bearer test-secret"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({ sent: 0, failed: 0 });
    expect(emailsSend).not.toHaveBeenCalled();
  });

  it("returns 500 when CRON_SECRET is not configured", async () => {
    vi.stubEnv("CRON_SECRET", "");
    const { GET } = await import("./route");
    const response = await GET(makeRequest("Bearer test-secret"));
    expect(response.status).toBe(500);
  });
});
