"use strict";

var pluginHelp = require("../../lib").pluginHelp;

test("plugin help contains option", () => {

    var opts = pluginHelp({ options: opts => opts }, d => d);

    chunk("xvfb", () => {
        expect(opts["xvfb"]).to.exist;
    });
});
