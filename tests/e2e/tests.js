"use strict";

suite("e2e tests", () => {
    test("launch test in xvfb", null, [fxXvfb], () => {
        chunk(async () => {
            await SS.pause(1, "sleep");
        });
    });
});
