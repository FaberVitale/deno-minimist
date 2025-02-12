import { assertEquals } from "../dev_deps.ts";
import parse from "../mod.ts";

Deno.test({
  name: "nums",
  fn: () => {
    const argv = parse([
      "-x",
      "1234",
      "-y",
      "5.67",
      "-z",
      "1e7",
      "-w",
      "10f",
      "--hex",
      "0xdeadbeef",
      "789",
    ]);
    assertEquals(argv, {
      x: 1234,
      y: 5.67,
      z: 1e7,
      w: "10f",
      hex: 0xdeadbeef,
      _: [789],
    });

    assertEquals(typeof argv.x, "number");
    assertEquals(typeof argv.y, "number");
    assertEquals(typeof argv.z, "number");
    assertEquals(typeof argv.w, "string");
    assertEquals(typeof argv.hex, "number");
    assertEquals(typeof argv._[0], "number");
  },
});

Deno.test({
  name: "already a number",
  fn: () => {
    const argv = parse(["-x", 1234, 789] as any);
    assertEquals(argv, { x: 1234, _: [789] });
    assertEquals(typeof argv.x, "number");
    assertEquals(typeof argv._[0], "number");
  },
});
