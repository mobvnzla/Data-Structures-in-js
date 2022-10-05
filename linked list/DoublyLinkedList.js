//I copied the code from the single linked list coz the logic is similar
//I just gotta add some changes and it's done

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class MyDoubleLinkedList {
  constructor(value) {
    this.head = {
      value: value,
      next: null,
      prev: null,
    };
    this.tail = this.head;

    this.length = 1;
  }
  append(entry) {
    const node = new Node(entry);
    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
    this.length++;
    return this;
  }
  preappend(entry) {
    const node = new Node(entry);
    this.head.prev = node;
    node.next = this.head;
    this.head = node;
    this.length++;
    return this;
  }
  insert(index, entry) {
    // create a new node
    const node = new Node(entry);
    // if length = 1, just append the new node to the list
    if (index >= this.length) {
      this.append(node);
      return this;
    }
    // I get the node that is about to be replace with the new one
    const oldNode = this.getNodeByIndex(index);
    // I link the old node with the new one in order to not lose it
    node.next = oldNode;
    oldNode.prev = node;
    // I look for the previous node in order to link my new node to it
    const previuosNode = this.getNodeByIndex(index - 1);
    // i link it
    previuosNode.next = node;
    node.prev = previuosNode;
    //and that's it
    //increase the length
    this.length++;
    return this;
  }
  getNodeByIndex(index) {
    let nodeRequired = this.head;
    let counter = 0;

    while (counter !== index) {
      nodeRequired = nodeRequired.next;
      counter++;
    }
    return nodeRequired;
  }
  remove(index) {
    // I get the next node to it
    const nextNode = this.getNodeByIndex(index + 1);
    // index = 0 is an special case
    if (index === 0) {
      nextNode.prev = null;
      this.head = nextNode;
      return this;
    }
    // I get the previous node to it
    const previuosNode = this.getNodeByIndex(index - 1);
    // I link the next node to the previous one
    previuosNode.next = nextNode;
    nextNode.prev = previuosNode;
    // and that's it
    //decrease the length
    this.length--;
    return this;
  }
}

export { MyDoubleLinkedList };
