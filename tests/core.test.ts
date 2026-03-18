import { describe, it, expect } from "vitest";
import { Weathernow } from "../src/core.js";
describe("Weathernow", () => {
  it("init", () => { expect(new Weathernow().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Weathernow(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Weathernow(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
