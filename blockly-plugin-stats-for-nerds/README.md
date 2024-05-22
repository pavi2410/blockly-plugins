# blockly-plugin-stats-for-nerds [![Built on Blockly](https://tinyurl.com/built-on-blockly)](https://github.com/google/blockly)

A [Blockly](https://www.npmjs.com/package/blockly) plugin that displays workspace Stats For Nerds!

![GH7sBlWasAE7kyM](https://github.com/pavi2410/blockly-plugins/assets/28837746/c3e15e0d-20cb-4bd1-8239-2c669db183d1)

## Installation

```
npm install blockly-plugin-stats-for-nerds
```

## Usage

```js
import * as Blockly from 'blockly';
import {StatsForNerdsPlugin} from 'blockly-plugin-stats-for-nerds';

// Inject Blockly.
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolboxCategories,
});

// Initialize plugin.
const plugin = new StatsForNerdsPlugin(workspace);
plugin.init();
```

Initialzing this plugin adds a context menu option on the workspace named "Toggle Stats For Nerds". When it is toggled on, it is displayed on the top-right corner of the workspace.

## License

Apache 2.0
