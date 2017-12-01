"use strict";
/**
 * Configures `Xvfb` plugin.
 * 
 * @module
 */

var expect = require("chai").expect;

var U = require("glace-utils");

var config = U.config;
var args = config.args;

config.xvfb = U.defVal(config.xvfb, {});

config.xvfb.use = U.defVal(args.xvfb, false);
if (typeof(args.xvfb) === "number") {
    args.xvfb = String(args.xvfb);
};
if (typeof(args.xvfb) === "string") {
    var [ width, height ] = args.xvfb.split("x");
    expect(width && height,
        "Invalid `xvfb` options. Use variants " +
        "`--xvfb` or `--xvfb <width>x<height>`").to.exist;
    config.xvfb.width = width;
    config.xvfb.height = height;
};

 module.exports = config;
