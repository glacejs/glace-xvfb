"use strict";

var LOG = require("glace-utils").logger;

var Steps = require("../../lib").Steps;

scope("Steps", () => {
    var ctx;

    beforeChunk(() => {
        ctx = {};
        ctx.__Xvfb = function (opts) {
            this.opts = opts;
            this.startSync = sinon.spy();
        };
        ctx.__resolution = { get: sinon.stub().returns({ width: 800,
            height: 600 }) };
        delete CONF.xvfb.width;
        delete CONF.xvfb.height;
        LOG.warn = sinon.spy();
    });

    test(".startXvfb()", () => {

        beforeChunk(() => {
            ctx.startXvfb = Steps.startXvfb;
            ctx._isXvfbStarted = false;
        });

        chunk("skipped if already launched", async () => {
            ctx._isXvfbStarted = true;
            expect(await ctx.startXvfb()).to.be.false;
            expect(LOG.warn.calledOnce).to.be.true;
        });

        chunk("runs with screen resolution", async () => {
            expect(await ctx.startXvfb()).to.be.true;
            expect(ctx._isXvfbStarted).to.be.true;
            expect(ctx.__resolution.get.calledOnce).to.be.true;
            expect(ctx.xvfb.startSync.calledOnce).to.be.true;
            expect(ctx.xvfb.opts.timeout).to.be.equal(1000);
            expect(ctx.xvfb.opts.xvfb_args).to.include("800x600x24");
        });

        chunk("runs with specified xvfb width and height", async () => {
            CONF.xvfb.width = 700;
            CONF.xvfb.height = 500;

            expect(await ctx.startXvfb()).to.be.true;
            expect(ctx._isXvfbStarted).to.be.true;
            expect(ctx.__resolution.get.called).to.be.false;
            expect(ctx.xvfb.startSync.calledOnce).to.be.true;
            expect(ctx.xvfb.opts.timeout).to.be.equal(1000);
            expect(ctx.xvfb.opts.xvfb_args).to.include("700x500x24");
        });

        chunk("runs with passed options", async () => {
            expect(await ctx.startXvfb({
                width: 1024,
                height: 768,
                depth: 32,
                timeout: 2,
            })).to.be.true;
            expect(ctx._isXvfbStarted).to.be.true;
            expect(ctx.__resolution.get.called).to.be.false;
            expect(ctx.xvfb.startSync.calledOnce).to.be.true;
            expect(ctx.xvfb.opts.timeout).to.be.equal(2000);
            expect(ctx.xvfb.opts.xvfb_args).to.include("1024x768x32");
        });

        chunk("runs with the same xvfb instance", async () => {
            ctx.xvfb = {
                startSync: sinon.spy(),
            };

            expect(await ctx.startXvfb()).to.be.true;
            expect(ctx.__resolution.get.called).to.be.false;
            expect(ctx.xvfb.startSync.calledOnce).to.be.true;
        });
    });

    test(".stopXvfb()", () => {

        beforeChunk(() => {
            ctx.stopXvfb = Steps.stopXvfb;
            ctx.xvfb = {
                stopSync: sinon.spy(),
            };
        });

        chunk("skipped if not launched yet", () => {
            ctx._isXvfbStarted = false;
            expect(ctx.stopXvfb()).to.be.false;
            expect(LOG.warn.calledOnce).to.be.true;
        });

        chunk("stops xvfb", () => {
            ctx._isXvfbStarted = true;
            expect(ctx.stopXvfb()).to.be.true;
            expect(ctx.xvfb.stopSync.calledOnce).to.be.true;
            expect(ctx._isXvfbStarted).to.be.false;
        });
    });
});
