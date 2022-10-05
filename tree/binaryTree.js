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
    if (!parentNode.left && entry < parentNode.value) {
      parentNode.left = node;
      this.height++;
    } else if (!parentNode.right && entry > parentNode.value) {
      parentNode.right = node;
    } else insertNode();
  }
}
