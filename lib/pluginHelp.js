"use strict";
/**
 * `Xvfb` plugin help.
 *
 * @function
 */
module.exports = (args, d) => {
    return args
        .options({
            "xvfb": {
                describe: d("Use xvfb for headless testing"),
                type: "string",
                group: "Virtual display:",
            },
        });
};
