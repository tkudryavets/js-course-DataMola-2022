/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
class Node {
  constructor(val = "") {
    this._next = null;
    this._value = val;
  }

  get next() {
    return this._next;
  }

  set next(node) {
    this._next = node;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }
}
