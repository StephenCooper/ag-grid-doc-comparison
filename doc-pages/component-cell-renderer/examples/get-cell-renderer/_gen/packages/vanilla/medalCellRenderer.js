function _optionalChain(ops) {
  let lastAccessLHS = undefined;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
      return undefined;
    }
    if (op === 'access' || op === 'optionalAccess') {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === 'call' || op === 'optionalCall') {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = undefined;
    }
  }
  return value;
}
class MedalCellRenderer {
  // init method gets the details of the cell to be renderer
  init(params) {
    this.params = params;
    this.eGui = document.createElement('span');
    this.eGui.innerHTML = new Array(params.value).fill('#').join('');
  }

  getGui() {
    return this.eGui;
  }

  medalUserFunction() {
    console.log(
      `user function called for medal column: row = ${
        this.params.rowIndex
      }, column = ${_optionalChain([
        this,
        'access',
        (_) => _.params,
        'access',
        (_2) => _2.column,
        'optionalAccess',
        (_3) => _3.getId,
        'call',
        (_4) => _4(),
      ])}`
    );
  }

  refresh(params) {
    return false;
  }
}
