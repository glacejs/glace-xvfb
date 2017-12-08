"use strict";

var _ = require("lodash");
var glaceXvfb = require("../../lib");


test("Plugin lazy import", () => {

    chunk("empty by default", () => {
        expect(_.isEmpty(glaceXvfb)).to.be.true;
    });

    chunk("has config", () => {
        expect(glaceXvfb.config).to.exist;
    });

    chunk("has plugin help", () => {
        expect(glaceXvfb.pluginHelp).to.exist;
    });

    chunk("has steps", () => {
        expect(glaceXvfb.Steps).to.exist;
    });
});
