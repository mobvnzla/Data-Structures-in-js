class Node {
  constructor(entry) {
    this.value = entry;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }
  myPush(entry) {
    const node = new Node(entry);
    if (this.length == 0) {
      this.top = node;
      this.bottom = node;
    } else {
      node.next = this.top;
      this.top = node;
    }
    this.length++;
    return this;
  }
  myPop() {
    const secondNodeInline = this.top.next;
    this.top = secondNodeInline;
    if (this.length == 1) {
      this.bottom = null;
    }
    this.length--;
    return this;
  }
  peek() {
    return this.top;
  }
}

export { Stack };
