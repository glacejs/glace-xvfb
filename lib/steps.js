"use strict";
/**
 * Steps for virtual display.
 *
 * @mixin XvfbSteps
 * @prop {Xvfb} xvfb - Xvfb instance.
 */

var U = require("glace-utils");
var LOG = U.logger;
var resolution = require("screen-resolution");
var Xvfb = require("xvfb");

require("./fixtures");
var CONF = require("./config");

var XvfbSteps = {
    /**
     * Step to start virtual display. Step recall will be skipped if virtual
     *  display wasn't stopped before.
     *
     * @async
     * @method
     * @instance
     * @arg {object} [opts] - Step options.
     * @arg {number} [opts.width] - Virtual display width. Default is active
     *  display width.
     * @arg {number} [opts.height] - Virtual display height. Default is active
     *  display height.
     * @arg {number} [opts.depth=24] - Virtual display color depth.
     * @arg {number} [opts.timeout=1] - Time to wait for virtual display
     *  will be started, sec.
     * @return {Promise<boolean>} - `true` if step was executed, `false` if
     *  was skipped.
     */
    startXvfb: async function (opts) {

        if (this._isXvfbStarted) {
            LOG.warn("Step to start Xvfb was passed already");
            return false;
        };
        if (!CONF.xvfb.width && !CONF.xvfb.height) {
            var screen = await resolution.get();
        };
        opts = U.defVal(opts, {});
        var width = U.defVal(opts.width, CONF.xvfb.width, screen.width);
        var height = U.defVal(opts.height, CONF.xvfb.height, screen.height);
        var depth = U.defVal(opts.depth, 24);
        var timeout = U.defVal(opts.timeout, 1) * 1000;

        this.xvfb = this.xvfb || new Xvfb(
            { timeout: timeout,
              xvfb_args: [ "-screen", 0,
                           `${width}x${height}x${depth}`,
                           "-noreset", "-ac"] });

        this.xvfb.startSync();
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

        this.xvfb.stopSync();
        this._isXvfbStarted = false;
        return true;
    },
};
module.exports = XvfbSteps;
