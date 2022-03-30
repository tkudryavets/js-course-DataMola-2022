/* eslint-disable no-plusplus */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
class List {
  constructor(val) {
    this._root = new Node(val);
    this._length = 1;
  }

  addNode(value, i) {
    if (this._length <= i) {
      return false;
    }

    if (!i) {
      i = this._length - 1;
    }

    let currentNode = this._root;
    let newNodeNext = currentNode.next;
    const newNode = new Node(value);
    for (let j = 0; j < i; j++) {
      currentNode = newNodeNext;
      newNodeNext = currentNode.next;
    }
    currentNode.next = newNode;
    newNode.next = newNodeNext;
    this._length++;
    return true;
  }

  removeNode(i) {
    if (this._length <= i || this._length === 1) {
      return false;
    }

    if (!i && i !== 0) {
      i = this._length - 1;
    }

    if (i === 0) {
      this._root = this._root.next;
      this._length--;
      return true;
    }

    let currentNode = this._root;
    let nodeToDelete = currentNode.next;
    for (let j = 0; j < i - 1; j++) {
      currentNode = nodeToDelete;
      nodeToDelete = currentNode.next;
    }
    currentNode.next = nodeToDelete.next;
    this._length--;

    return true;
  }

  print() {
    let str = "";
    let currentNode = this._root;
    for (let i = 0; i < this._length - 1; i++) {
      str += `${currentNode.value}, `;
      currentNode = currentNode.next;
    }
    str += `${currentNode.value}`;
    console.log(str);
  }
}

const list = new List(0);
list.addNode(1);
list.addNode(2);
list.addNode(4);
list.addNode(5);
list.addNode(3, 2);
list.removeNode(4);
list.print();
