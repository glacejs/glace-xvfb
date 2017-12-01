// glace examples/xvfb/xvfbVideo.js --xvfb
test("Run test in xvfb", () => {
    chunk(async() => {
        await SS.pause(10, "wait");
    });
});
