"use strict";
/**
 * Steps for virtual display.
 *
 * @module
 */

var LOG = require("glace-utils").logger;
var resolution = require("screen-resolution");
var Xvfb = require("xvfb");

require("./fixtures");
var CONF = require("./config");
/**
 * Steps to manage virtual display.
 *
 * @mixin
 */
var XvfbSteps = {
    /**
     * Step to start virtual display. Step recall will be skipped if virtual
     *  display wasn't stopped before.
     *
     * @async
     * @method
     * @instance
     * @arg {object} [opts] - Step options.
     * @arg {number} [opts.width] - Virtual display width. By default
     *  corresponds to active display.
     * @arg {number} [opts.height] - Virtual display height. By default
     *  corresponds to active display.
     * @arg {number} [opts.depth=24] - Virtual display color depth.
     * @arg {number} [opts.timeout=1000] - Time to wait for virtual display
     *  will be started, ms.
     * @return {Promise<boolean>} - `true` if step was executed, `false` if
     *  was skipped.
     */
    startXvfb: async function (opts) {

        if (this._isXvfbStarted) {
            LOG.warn("Step to start Xvfb was passed already");
            return false;
        };
        if (!CONF.xvfbWidth && !CONF.xvfbHeight) {
            var screen = await resolution.get();
        };
        opts = opts || {};
        var width = opts.width || CONF.xvfbWidth || screen.width;
        var height = opts.height || CONF.xvfbHeight || screen.height;
        var depth = opts.depth || 24;
        var timeout = opts.timeout || 1000;

        this._xvfb = new Xvfb({ timeout: timeout,
                                xvfb_args: [ "-screen", 0,
                                             `${width}x${height}x${depth}`,
                                             "-noreset", "-ac"] });
        this._xvfb.startSync();
        this._isXvfbStarted = true;
        return true;
    },
    /**
     * Step to stop virtual display. Step call will be skipped if virtual
     *  display wasn't started before.
     *
     * @method
     * @instance
     * @return {boolean} - `true` if step was executed, `false` if was skipped.
     */
    stopXvfb: function () {

        if (!this._isXvfbStarted) {
            LOG.warn("Step to start Xvfb wasn't passed yet");
            return false;
        };

        this._xvfb.stopSync();
        this._isXvfbStarted = false;
        return true;
    },
};
module.exports = XvfbSteps;