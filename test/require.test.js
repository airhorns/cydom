Object.defineProperty(window, "Selection", {
  writable: true,
  value: class Selection {
    get isCollapsed() {
      false;
    }
  }
});

describe("built output", () => {
  test("it can be required", () => {
    const { isVisible } = require("../dist");
    const element = document.createElement("div");
    expect(isVisible(element)).toBeFalsy();
  });
});
