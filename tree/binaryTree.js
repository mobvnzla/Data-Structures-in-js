class Node {
  constructor(entry) {
    this.value = entry;
    this.left = null;
    this.right = null;
  }
}
//it's mandatory that when user creates an instance of a tree it has to initialize it by entering it's root
class BinrayTree {
  constructor(entry) {
    this.root = new Node(entry);
    this.height = 1;
  }

  insert(entry) {
    const node = new Node(entry);
    let parentNode = new Node('idk what to put here');
    if (this.height == 1) {
      parentNode = this.root;
    }

    if (entry < parentNode.value && !parentNode.left) {
      parentNode.left = node;
    } else if (entry > parentNode.value && !parentNode.right) {
      parentNode.right = node;
    } else insertNode();
  }
}

export { BinrayTree };
