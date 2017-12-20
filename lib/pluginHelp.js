"use strict";
/**
 * `Xvfb` plugin help.
 *
 * @function
 * @name pluginHelp
 * @arg {yargs} yargs - `yargs` instance in order to expand its options.
 * @arg {function} d - Function to manage option description: join, colorize, etc.
 * @return {yargs} - Expanded `yargs` instance.
 */
module.exports = (yargs, d) => {
    return yargs
        .options({
            "xvfb": {
                describe: d("Use xvfb for headless testing.",
                            "Just '--xvfb' or '--xvfb [<width>x<height>]'"),
                group: "Virtual display:",
            },
        });
};
