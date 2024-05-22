import * as Blockly from 'blockly/core';

// Events that should be send over to the plugin from the workspace
const blockEvents = new Set([
  Blockly.Events.BLOCK_CHANGE,
  Blockly.Events.BLOCK_CREATE,
  Blockly.Events.BLOCK_DELETE,
]);

export class StatsForNerdsPlugin {
  /**
   * Constructor for ...
   * @param {!Blockly.WorkspaceSvg} workspace The workspace that the plugin will
   *     be added to.
   */
  constructor(workspace) {
    /**
     * The workspace.
     * @type {!Blockly.WorkspaceSvg}
     * @protected
     */
    this.workspace = workspace;
    this.displaying = false;
  }

  /**
   * Initialize.
   */
  init() {
    const injectParentDiv = this.workspace.getInjectionDiv().parentNode;

    if (!injectParentDiv) {
      throw new Error('The workspace must be injected into the page before the plugin can be initalized');
    }

    this.box = document.createElement('div');
    this.box.style = "display: none; position: absolute; top: 8px; right: 8px; background-color: #eeee; border-radius: 8px; padding: 8px; font-family: sans-serif;"
    injectParentDiv.appendChild(this.box);

    this.registerContextMenuOption();
    this.workspace.addChangeListener((e) => void this.handleEvent(e));
    this.render();
  }

  registerContextMenuOption() {
    const workspaceItem = {
      displayText: 'Toggle Stats For Nerds',
      preconditionFn: (scope) => {
        return 'enabled';
      },
      callback: (scope) => {
        const machine = {
          block: 'none',
          none: 'block',
        }
        this.box.style.display = machine[this.box.style.display];
      },
      scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
      id: 'plugin_stats_for_nerds',
      weight: 100,
    };
    Blockly.ContextMenuRegistry.registry.register(workspaceItem);
  }

  handleEvent(event) {
    if (!blockEvents.has(event.type)) {
      return; // Filter out events.
    }

    this.render();
  }

  render() {
    const topBlocksCount = this.workspace.getTopBlocks().length;
    const allBlocksCount = this.workspace.getAllBlocks().length;
    const scale = this.workspace.getScale();
    const undoSize = this.workspace.getUndoStack().length;
    const redoSize = this.workspace.getRedoStack().length;


    this.box.innerHTML = `<div style="align: center; border-bottom: 1px solid #aaa">Stats For Nerds</div>
    <div style="margin-top: 8px">
      <div>Top blocks = ${topBlocksCount}</div>
      <div>All blocks = ${allBlocksCount}</div>
      <div>Scale = ${scale}</div>
      <div>Undo stack size = ${undoSize}</div>
      <div>Redo stack size = ${redoSize}</div>
    </div>`
  }
}
