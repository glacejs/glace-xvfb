"use strict";
/**
 * `GlaceJS Xvfb` package.
 *
 * @module
 */

var config, Steps;

Object.defineProperties(exports, {
    /**
     * `Xvfb` config.
     */
    config: {
        get: function() {
            config = config || require("./config");
            return config;
        },
    },
    /**
     * @type {XvfbXteps}
     */
    Steps: {
        get: function() {
            Steps = Steps || require("./steps");
            return Steps;
        },
    },
});
