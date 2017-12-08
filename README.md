## GlaceJS Xvfb plugin

Provides steps for [GlaceJS](https://glacejs.github.io/glace-core/) framework to launch tests inside [virtual display](https://en.wikipedia.org/wiki/Xvfb) on Linux machines.

## Features

- Start & stop Xvfb server

## Requirements

- Installed Xvfb server, for example, on **ubuntu** may be installed with command `sudo apt-get install xvfb`

## How to install

```
npm i glace-xvfb
```

## How to use

```javascript
var glaceXvfb = require("glace-xvfb");
glaceXvfb.Steps;
glaceXvfb.config;
```

If plugin is used as a part of `GlaceJS` it will be loaded automatically.

## CLI options

- `--xvfb` - Use Xvfb server to launch autotests.

## API

- [config](GlaceConfig.html)
- [fixtures](global.html)
- [steps](XvfbSteps.html)

## Test examples

See [integration tests](https://github.com/glacejs/glace-js/blob/master/tests/integration/testXvfb.js) in order to explore examples.
