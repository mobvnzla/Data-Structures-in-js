//if you dont know what's a binary tree
// probably you wanna take a look at
// https://appliedgo.net/bintree/

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

  insert(entry, parent = this.root, parentLevel = 0) {
    //friendly warning: entry can be either a node or a number
    if (!entry && entry != 0) {
      console.log('entry value not valid');
      return entry;
    }

    //now we check if entry is either a node or a number
    let node;
    let nodeValue;
    let currentLevel = parentLevel;
    if (entry instanceof Node) {
      node = entry;
      nodeValue = entry.value;
      node.setLevel(currentLevel);
    } else {
      node = new Node(+entry, +currentLevel);
      nodeValue = entry;
    }

    //ok, what if there's no root?
    if (!this.root) {
      this.root = node;
      this.height++;
      return this;
    }
    //ok so, from now on there's root

    //the following logic handles when nodeValue already exist
    //but their children dont
    if (this.search(+nodeValue)) {
      if (node.left || node.right) {
        this.insert(node.left, node, +currentLevel);
        this.insert(node.right, node, +currentLevel);
      }
      return console.log('value already exists');
    }

    //from now on we can assume nodeValue isn't in the tree
    //which means that probably the tree is about to get higher
    currentLevel++;
    node.setLevel(currentLevel);
    if (this.height == currentLevel) {
      this.height = currentLevel + 1;
    }

    // the following logic determines where should the new node goes

    if (nodeValue < parent.value) {
      !parent.left ? parent.setChild(node, 'left') : this.insert(node, parent.left, currentLevel);
    } else {
      !parent.right ? parent.setChild(node, 'right') : this.insert(node, parent.right, currentLevel);
    }
  }

  search(entry = null, parent = this.root) {
    if (!entry && entry != 0) {
      return null;
    } else if (!parent) {
      return parent;
    } else if (entry < parent.value) {
      return this.search(entry, parent.left);
    } else if (entry > parent.value) {
      return this.search(entry, parent.right);
    } else {
      return parent;
    }
  }

  fetchTheParentOf(entry = null, parent = this.root) {
    //friendly warning: entry can be either a node or a number

    //after the checks below, we can assume:
    //1) entry is a valid value
    //2) root exists
    //3) entry is part of the tree
    if (!entry && entry != 0) {
      console.log('entry value not valid');
      return entry;
    }
    if (parent == null) {
      return console.log('there is no root');
    }
    if (!this.search(entry)) {
      return console.log('entry isnt part of the tree');
    }

    //now we check if entry is either a node or a number
    let node;
    let nodeValue;
    if (entry instanceof Node) {
      node = entry;
      nodeValue = entry.value;
    } else {
      node = this.search(entry);
      nodeValue = +entry;
    }

    //the following logic return the parent
    if (node == parent) {
      return parent;
    } else if (parent.left == node || parent.right == node) {
      return parent;
    } else if (nodeValue < parent.value) {
      return this.fetchTheParentOf(nodeValue, parent.left);
    } else if (nodeValue > parent.value) {
      return this.fetchTheParentOf(nodeValue, parent.right);
    } else {
      console.log('your node wasnt found but the following node of the three is alike', parent);
      return parent;
    }
  }

  delete(entry) {
    //friendly warning: as in insert() entry can be either a node or a number

    //after the checks below, we can assume:
    //1) entry is a valid value
    //2) root exists
    //3) entry is part of the tree
    if (!entry && entry != 0) {
      console.log('entry value not valid');
      return entry;
    }
    if (!this.root) {
      return console.log('there is no root');
    }
    if (!this.search(entry)) {
      return console.log('entry isnt part of the tree');
    }

    //now we check if entry is either a node or a number
    let nodeToBeDeleted;
    if (entry instanceof Node) {
      nodeToBeDeleted = entry;
    } else {
      nodeToBeDeleted = this.search(+entry);
    }

    const nodeParent = this.fetchTheParentOf(nodeToBeDeleted);
    nodeToBeDeleted.setLevel(nodeParent.level);
    const childLeft = nodeToBeDeleted.left;
    const childRight = nodeToBeDeleted.right;
    if (nodeParent.left == nodeToBeDeleted) {
      nodeParent.left = null;
    } else if (nodeParent.right == nodeToBeDeleted) {
      nodeParent.right = null;
    } else {
      this.root = null;
    }
    if (childLeft) {
      this.insert(childLeft, nodeParent, nodeParent.level);
    }
    if (childRight) {
      this.insert(childRight, nodeParent, nodeParent.level);
    }
  }
}

export { BinrayTree };

/*

Chang's solution

const DIR = {
    LEFT: 'left',
    RIGHT: 'right'
};

class Node {
    constructor(entry, level = 0) {
        this.value = entry;
        this.level = level;
        this.left = null;
        this.right = null;
    }

    setChild(entry, dir) {
        return dir && this[dir] ? !this[dir] : this[dir] = new Node(entry, this.level + 1);
    }
}

class BinaryTree {
    constructor(entry) {
        this.root = new Node(entry);
        this.height = 1;
    }

    add(entry, parent = this.root) {
        if (!entry && entry !== 0) return console.log('Invalid value');
        if (entry === parent.value) return console.log('Value already exists');
        
        const dir = entry < parent.value ? DIR.LEFT : DIR.RIGHT;
        const child = parent.setChild(entry, dir);

        if (!child) {
            this.add(entry, parent[dir]);
        } else if (this.height == child.level) {
            this.height = child.level + 1;
        }
    }

    remove(entry, node = this.root) {
        return this.find(entry, node, true);
    }

    find(entry, node = this.root, destroy = false) {
        if (!node) return null;
        if (node.value === entry) return destroy ? this.destroy(node) : node;

        const dir = entry < node.value ? DIR.LEFT : DIR.RIGHT;
        const result = this.find(entry, node[dir], destroy);

        if (destroy) node[dir] = result;
        return destroy ? node : result;
    }

    destroy(node = this.root) {
        if (!node.left && !node.right) {
            node = null;
        } else if (!node.left) {
            node = node.right;
        } else if (!node.right) {
            node = node.left;
        } else {
            const temp = this.min(node.right);
            node.value = temp.value;
            node.right = this.remove(temp.value, node.right);
        }

        return node;
    }

    min(node = this.root) {
        return node.left ? this.min(node.left) : node;
    }

    getParent(entry, node = this.root, parent = null) {
        if (!node) return console.log(entry, 'does not exist');

        if (entry == node.value) {
            if (parent == null) return console.log('Root has no parent');
            return parent;
        }

        return entry < node.value ? this.getParent(entry, node.left, node) : this.getParent(entry, node.right, node);
    }
}*/
