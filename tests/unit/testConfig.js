"use strict";

var CONF = require("../../lib").config;

suite("config", () => {

    test("includes", () => {

        chunk("xvfb section", () => {
            expect(CONF.xvfb).to.exist;
        });
    
        chunk("disabled xvfb", () => {
            expect(CONF.xvfb.use).to.be.false;
        });
    
        chunk("empty xvfb width", () => {
            expect(CONF.xvfb.width).to.not.exist;
        });
    
        chunk("empty xvfb height", () => {
            expect(CONF.xvfb.height).to.not.exist;
        });
    });
});
