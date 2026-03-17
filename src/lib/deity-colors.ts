const DEITY_COLORS: Record<string, string> = {
  shiva: "59, 130, 246",      // blue
  vishnu: "99, 102, 241",     // indigo
  lakshmi: "234, 179, 8",     // gold
  krishna: "59, 130, 246",    // blue
  rama: "34, 197, 94",        // green
  ganesha: "249, 115, 22",    // orange
  durga: "239, 68, 68",       // red
  saraswati: "226, 232, 240", // white
  hanuman: "249, 115, 22",    // orange
  surya: "251, 191, 36",      // golden
  chandra: "226, 232, 240",   // silver
};

export function getDeityColor(slug: string): string {
  return DEITY_COLORS[slug] || "249, 115, 22";
}
