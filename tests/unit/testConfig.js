"use strict";

var CONF = require("../../lib").config;

test("Xvfb configuration", () => {
    chunk("default config", () => {
        expect(CONF.xvfb).to.exist;
        expect(CONF.xvfb.use).to.be.false;
        expect(CONF.xvfb.width).to.not.exist;
        expect(CONF.xvfb.height).to.not.exist;
    });
});
