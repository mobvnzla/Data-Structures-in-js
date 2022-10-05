//queue implementation using oneway linked list structure for its nodes

class Node {
  constructor(entry) {
    this.value = entry;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }
  //it's mandatory that the getNodebyIndex method be invoked with a type of index valid
  getNodeByIndex(index) {
    let nodeRequired = this.first;
    let counter = 0;
    while (counter != index) {
      nodeRequired = nodeRequired.next;
      counter++;
    }
    return nodeRequired;
  }

  getNodeByValue(entry) {
    let nodeRequired = this.first;

    for (let i = 0; i < this.length; i++) {
      if (nodeRequired.value == entry) {
        return [nodeRequired, i];
      } else {
        nodeRequired = nodeRequired.next;
      }
    }
    return nodeRequired;
  }
  enqueue(entry) {
    const node = new Node(entry);
    if (this.length == 0) {
      this.first = this.last = node;
      this.length++;
      return console.log('the following item has been queued up ', node);
    }
    this.last.next = node;
    this.last = node;
    this.length++;
    return console.log('the following item has been queued up ', node);
  }

  dequeueByIndex(index) {
    //what if the queue is empty, then
    if (this.length == 0) {
      return console.log('queue was already empty');
    }
    //what if the index is outta range?, then
    if (index < 0 || index >= this.length) {
      if (this.length == 1) {
        return console.log('0 is the only number acceptable as index');
      }
      return console.log('the range goes from 0 to ', this.length - 1);
    }
    //what if the queue has only one node, then
    if (this.length == 1) {
      const nodeDeleted = this.first;
      this.first = this.last = null;
      this.length--;
      return console.log('this item has been deleted ', nodeDeleted);
    }
    //what if the queue has several nodes and the index entered is 0
    if (index == 0) {
      const secondNodeInline = this.getNodeByIndex(1);
      const nodeToRemoved = this.first;
      this.first = secondNodeInline;
      this.length--;
      return console.log('this item has been deleted ', nodeToRemoved);
    }
    //what if the queue has several nodes and the index entered is any but 0
    const node = this.getNodeByIndex(index);
    const previousNode = this.getNodeByIndex(index - 1);
    previousNode.next = node.next;
    //what if the index entered is the last item inqueue, then
    if (index == this.length - 1) {
      this.last = previousNode;
    }
    this.length--;
    return console.log('the following item has been deleted ', node);
  }

  dequeueByValue(entry) {
    //what if the queue is empty?, then
    if (this.length == 0) {
      return console.log('the queue was already empty');
    }
    //what if the value is not in the queue?
    if (!this.getNodeByValue(entry)) {
      return console.log('the entry:', entry, ', is not in the queue');
    }
    //what if the queue has only one item?, then
    if (this.length == 1) {
      const nodeRemoved = this.first;
      this.first = this.last = null;
      this.length--;
      return console.log('the following node has been removed:', nodeRemoved, 'now the queue is empty');
    }
    //what if the queue has multi-nodes and the entry entered match with the first node
    const [node, index] = this.getNodeByValue(entry);
    const previousNode = this.getNodeByIndex(index - 1);
    previousNode.next = node.next;
    if (index == this.length - 1) {
      this.last = previousNode;
    }
    this.length--;
    return console.log('the following node has beed removed:', node);
  }
  //peek return the first item and the last item in the queue
  peek() {
    if (this.length == 0) {
      return console.log('the queue is empty');
    } else if (this.length == 1) {
      return console.log('the queue has only this item:', this.first);
    } else {
      return console.log('the first item is:', this.first, 'and  the last item is:', this.last);
    }
  }
}

export { Queue };
