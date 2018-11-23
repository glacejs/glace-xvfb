"use strict";

suite("e2e tests", () => {
    test("launch test in xvfb", [fxXvfb], () => {
        chunk(async () => {
            await $.pause(1, "sleep");
        });
    });
});
