"use strict";

require("../../lib").Steps;

suite("fixtures", () => {

    test("fxXvfb", () => {
        var calls,
            oGlobal,
            o$;
    
        before(() => {
            oGlobal = global;
            o$ = $;
        });
    
        after(() => {
            global = oGlobal; // eslint-disable-line
            $ = o$;
        });
    
        beforeChunk(() => {
            calls = Promise.resolve();
            global.before = cb => calls = calls.then(cb);
            global.after = cb => calls = calls.then(cb);
    
            $.startXvfb = sinon.stub().returns(true);
            $.stopXvfb = sinon.stub().returns(true);
        });
    
        chunk("exists", () => {
            expect(fxXvfb).to.be.a("function");
        });
    
        chunk("starts and stops xvfb", async () => {
            fxXvfb(() => {});
            await calls;
    
            expect($.startXvfb.calledOnce).to.be.true;
            expect($.stopXvfb.calledOnce).to.be.true;
        });
    
        chunk("doesn't stop xvfb if it wasn't started", async () => {
            $.startXvfb = sinon.stub().returns(false);
            fxXvfb(() => {});
            await calls;
    
            expect($.startXvfb.calledOnce).to.be.true;
            expect($.stopXvfb.calledOnce).to.be.false;
        });
    });
});
