"use strict";

require("../../lib").Steps;

test("fxXvfb", () => {

    chunk("should exist", () => {
        expect(fxXvfb).to.be.a("function");
    });
});
