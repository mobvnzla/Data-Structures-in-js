class Node {
  constructor(entry, level) {
    this.value = entry;
    this.level = level;
    this.left = null;
    this.right = null;
  }
  setChild(node, dir) {
    dir == 'left' ? (this.left = node) : (this.right = node);
  }
  setLevel(level) {
    this.level = level;
    level++;
    if (this.left) {
      this.left.setLevel(level);
    }
    if (this.right) {
      this.right.setLevel(level);
    }
  }
}

class BinrayTree {
  constructor() {
    this.root = null;
    this.height = 0;
  }

  insert(entryParameter, parent = this.root, level = 0) {
    const parentNode = parent;
    let currentLevel = level;

    //what if there's no root?
    if (!this.root) {
      this.root = new Node(entry, +currentLevel);
      this.height++;
      return this;
    }
    //ok so, from now on there's root
    //what if the entryParameter is a node
    let entry;
    entryParameter instanceof Node ? (entry = entryParameter.value) : (entry = entryParameter);

    //the following logic handles when entry already exist
    if (!this.search(entry)) {
      return console.log('value already exists');
    }

    //from now on we can assume entry isn't in the tree
    //which means that probably the tree is about to get higher
    currentLevel++;
    const node = new Node(entry, currentLevel);
    if (this.height == currentLevel) {
      this.height = currentLevel + 1;
    }

    // the following logic determines where should the new node goes

    if (entry < parentNode.value) {
      !parentNode.left ? parentNode.setChild(node, 'left') : this.insert(entryParameter, parentNode.left, currentLevel);
    } else {
      !parentNode.right
        ? parentNode.setChild(node, 'right')
        : this.insert(entryParameter, parentNode.right, currentLevel);
    }
  }

  search(entry = null, parent = this.root) {
    if (!entry) {
      return entry;
    } else if (parent == null) {
      return parent;
    } else if (entry < parent.value) {
      return this.search(entry, parent.left);
    } else if (entry > parent.value) {
      return this.search(entry, parent.right);
    } else {
      return parent;
    }
  }
  fetchTheParentOf(node, parentNode = this.root) {
    let parent = parentNode;
    if (parent.left == node || parent.right == node) {
      return parent;
    } else if (node.value < parent.value) {
      parent = parent.left;
      return this.fetchTheParentOf(node, parent);
    } else if (node.value > parent.value) {
      parent = parent.right;
      return this.fetchTheParentOf(node, parent);
    }
  }

  delete(entry, parent = this.root) {
    const nodeToBeDeleted = this.search(entry);

    //what if the entry doesnt exist in the tree?
    if (!nodeToBeDeleted) {
      return console.log('value doesnt exist');
    }

    //ok, from now on assume that the entry is part of the tree
    const nodeParent = this.fetchTheParentOf(nodeToBeDeleted);
    if (nodeToBeDeleted.left) {
      const nodeSubstitute = nodeToBeDeleted.left;
      const nodeToBeReInserted = nodeToBeDeleted.right;
    }
    //then, what if the nodeToBeReplaced has no children?
  }
}

export { BinrayTree };

/*

Chang's solution

const DIR = {
  LEFT: 'left',
  RIGHT: 'right',
};

class Node {
  constructor(entry, level = 0) {
    this.value = entry;
    this.level = level;
    this.left = null;
    this.right = null;
  }

  setChild(entry, dir = DIR.LEFT) {
    return this[dir] ? !this[dir] : (this[dir] = new Node(+entry, this.level + 1));
  }
}

class BinaryTree {
  constructor(entry) {
    this.root = new Node(entry);
    this.height = 1;
  }

  add(entry, parent = this.root) {
    if (!entry && entry !== 0) {
      console.log('Invalid value');
      return;
    }

    if (entry === parent.value) {
      console.log('Value already exists');
      return;
    }

    const dir = entry < parent.value ? DIR.LEFT : DIR.RIGHT;
    const child = parent.setChild(entry, dir);

    if (!child) {
      this.add(entry, parent[dir]);
    } else if (this.height == child.level) {
      this.height = child.level + 1;
    }
  }
} */
