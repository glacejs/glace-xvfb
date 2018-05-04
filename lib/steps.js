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
    /* modules */
    __resolution: resolution,
    __Xvfb: Xvfb,

    startXvfb: async function (opts) {
        /**
         * Step to start virtual display. Step recall will be skipped if virtual
         *  display wasn't stopped before.
         *
         * @async
         * @memberOf XvfbSteps
         * @method startXvfb
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

        if (this._isXvfbStarted) {
            LOG.warn("Step to start Xvfb was passed already");
            return false;
        };

        opts = U.defVal(opts, {});
        var width = U.defVal(opts.width, CONF.xvfb.width);
        var height = U.defVal(opts.height, CONF.xvfb.height);
        var depth = U.defVal(opts.depth, 24);
        var timeout = U.defVal(opts.timeout, 1) * 1000;

        allure.step("Start Xvfb");
        LOG.info("Starting Xvfb...");

        if (!((width && height) || this.xvfb)) {
            var screen = await this.__resolution.get();
            width = width || screen.width;
            height = height || screen.height;
        };

        this.xvfb = this.xvfb || new this.__Xvfb(
            { timeout: timeout,
                xvfb_args: [ "-screen", 0,
                    `${width}x${height}x${depth}`,
                    "-noreset", "-ac"] });

        this.xvfb.startSync();
        this._isXvfbStarted = true;

        LOG.info("Xvfb is started");
        allure.pass();

        return true;
    },

    stopXvfb: function () {
        /**
         * Step to stop virtual display. Step call will be skipped if virtual
         *  display wasn't started before.
         *
         * @memberOf XvfbSteps
         * @method stopXvfb
         * @instance
         * @return {boolean} - `true` if step was executed, `false` if was skipped.
         */

        if (!this._isXvfbStarted) {
            LOG.warn("Step to start Xvfb wasn't passed yet");
            return false;
        };

        allure.step("Stop Xvfb");
        LOG.info("Stopping Xvfb...");

        this.xvfb.stopSync();
        this._isXvfbStarted = false;

        LOG.info("Xvfb is stopped");
        allure.pass();

        return true;
    },
};
module.exports = XvfbSteps;
