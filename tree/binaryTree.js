class Node {
  constructor(entry) {
    this.value = entry;
    this.level = null;
    this.left = null;
    this.right = null;
  }
}
//it's mandatory that when user creates an instance of a tree it has to initialize it by entering it's root
class BinrayTree {
  constructor(entry) {
    this.root = new Node(entry);
    this.root.level = 0;
    this.height = 1;
  }

  insert(entry, parent, levelOfTheNode) {
    let parentNode = parent;
    let level = levelOfTheNode;
    if (!parentNode) {
      parentNode = this.root;
      level = 1;
    }
    if (entry == parentNode.value) {
      return console.log('the value already exists');
    }

    const node = new Node(entry);
    node.level = level;

    //logic of height
    if (level == this.height) {
      this.height++;
    }

    // the following logic is about where should the new node goes
    if (entry < parentNode.value) {
      if (!parentNode.left) {
        parentNode.left = node;
      } else {
        level++;
        this.insert(entry, parentNode.left, level);
      }
    } else {
      if (!parentNode.right) {
        parentNode.right = node;
      } else {
        level++;
        this.insert(entry, parentNode.right, level);
      }
    }
  }
}

export { BinrayTree };
