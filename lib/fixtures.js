"use strict";
/**
 * `Xvfb` fixtures.
 *
 * @module
 */

/**
 * Fixture to launch xvfb.
 * 
 * @global
 * @function
 * @arg {function} func - Test funciton.
 */
global.fxXvfb = func => {
    var isStarted;

    before(async () => {
        isStarted = await SS.startXvfb();
    });

    func();

    after(async () => {
        if (!isStarted) return;
        await SS.stopXvfb();
    });
};