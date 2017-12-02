"use strict";
/**
 * `GlaceJS Xvfb` package.
 *
 * @module
 */

var config, Steps;

Object.defineProperties(exports, {
    /**
     * @type {GlaceConfig}
     */
    config: {
        get: function() {
            config = config || require("./config");
            return config;
        },
    },
    /**
     * @type {XvfbSteps}
     */
    Steps: {
        get: function() {
            Steps = Steps || require("./steps");
            return Steps;
        },
    },
});
