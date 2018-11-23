"use strict";

/**
 * `Xvfb` fixtures.
 *
 * @module
 */

const U = require("glace-utils");

const beforeCb = ctx => async () => {
    ctx.isStarted = await $.startXvfb();
};

const afterCb = ctx => async () => {
    if (!ctx.isStarted) return;
    await $.stopXvfb();
};

/**
 * Fixture to launch Xvfb.
 * 
 * @global
 * @function
 * @arg {function} func - Test funciton.
 */
global.fxXvfb = U.makeFixture({ before: beforeCb, after: afterCb });
