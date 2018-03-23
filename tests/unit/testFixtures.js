"use strict";

require("../../lib").Steps;

test("fxXvfb", () => {
    var calls,
        oGlobal,
        oSS;

    before(() => {
        oGlobal = global;
        oSS = SS;
    });

    after(() => {
        global = oGlobal; // eslint-disable-line
        SS = oSS;
    });

    beforeChunk(() => {
        calls = Promise.resolve();
        global.before = cb => calls = calls.then(cb);
        global.after = cb => calls = calls.then(cb);

        SS.startXvfb = sinon.stub().returns(true);
        SS.stopXvfb = sinon.stub().returns(true);
    });

    chunk("exists", () => {
        expect(fxXvfb).to.be.a("function");
    });

    chunk("starts and stops xvfb", async () => {
        fxXvfb(() => {});
        await calls;

        expect(SS.startXvfb.calledOnce).to.be.true;
        expect(SS.stopXvfb.calledOnce).to.be.true;
    });

    chunk("doesn't stop xvfb if it wasn't started", async () => {
        SS.startXvfb = sinon.stub().returns(false);
        fxXvfb(() => {});
        await calls;

        expect(SS.startXvfb.calledOnce).to.be.true;
        expect(SS.stopXvfb.calledOnce).to.be.false;
    });
});
