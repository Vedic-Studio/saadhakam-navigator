import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DailyEmailCapture } from "./DailyEmailCapture";
import { trackEmailSignup } from "@/lib/analytics/events";

// Mock the analytics module so we assert the event fires without touching gtag.
vi.mock("@/lib/analytics/events", () => ({
  trackEmailSignup: vi.fn(),
}));

const mockedTrack = vi.mocked(trackEmailSignup);

describe("DailyEmailCapture", () => {
  beforeEach(() => {
    mockedTrack.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function mockFetchOk() {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
  }

  it("renders the email input", () => {
    mockFetchOk();
    render(<DailyEmailCapture />);
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Subscribe/ })).toBeInTheDocument();
  });

  it("submitting posts to the subscribe API with interest=daily-vara", async () => {
    const fetchMock = mockFetchOk();
    render(<DailyEmailCapture />);

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "seeker@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Subscribe/ }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/newsletter/subscribe");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)).toEqual({
      email: "seeker@example.com",
      interest: "daily-vara",
    });
  });

  it("fires email_signup with source 'today' on success", async () => {
    mockFetchOk();
    render(<DailyEmailCapture />);

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "seeker@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Subscribe/ }));

    await waitFor(() => expect(mockedTrack).toHaveBeenCalledWith("today"));
    expect(mockedTrack).toHaveBeenCalledTimes(1);
  });

  it("clears the input after a successful submit", async () => {
    mockFetchOk();
    render(<DailyEmailCapture />);
    const input = screen.getByLabelText("Email address") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "seeker@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Subscribe/ }));

    await waitFor(() => expect(input.value).toBe(""));
  });

  it("does NOT fire the event when the subscribe request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false });
    vi.stubGlobal("fetch", fetchMock);
    render(<DailyEmailCapture />);

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "seeker@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Subscribe/ }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(mockedTrack).not.toHaveBeenCalled();
  });

  it("does not submit (no fetch) when the email is empty", () => {
    const fetchMock = mockFetchOk();
    render(<DailyEmailCapture />);
    // Submit the form directly without typing; the empty-guard returns early.
    fireEvent.submit(screen.getByLabelText("Email address").closest("form")!);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
