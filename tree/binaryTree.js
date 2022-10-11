//if you dont know what's a binary tree
// probably you wanna take a look at
// https://appliedgo.net/bintree/

class Node {
  constructor(entry = null) {
    this.value = entry;
    this.level = null;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.balance = 0;
  }
  setChild(node, dir) {
    /* dir == 'left' ? this.balance++ : this.balance--; */
    dir == 'left' ? (this.left = node) : (this.right = node);
  }
}

class BinrayTree {
  constructor() {
    this.root = null;
    this.height = 0;
  }

  Insert(number, parent = this.root) {
    /* debugger; */
    const node = new Node(number);

    //is there root?
    if (parent == null) {
      node.level = 1;
      node.parent = 'itself';
      this.height = 1;
      this.root = node;
      return;
    }

    //compare number with parent
    let dir;
    if (number == parent.value) {
      console.log('number already exist');
      return;
    } else if (number < parent.value) {
      dir = 'left';
    } else {
      dir = 'right';
    }

    //parent has child in that direction?
    if (!parent[dir]) {
      node.level = parent.level + 1;
      node.parent = parent;
      parent.setChild(node, dir);
      node.setBalance(dir);
      if (this.height < node.level) this.height = node.level;
      return;
    }
    this.Insert(number, parent[dir]);
  }
  Search(number, parent = this.root) {
    /* debugger; */
    //is there root?
    if (parent == null) {
      return parent;
    }

    //compare number with parent
    let dir;
    if (number == parent.value) {
      return true;
    } else if (number < parent.value) {
      dir = 'left';
    } else {
      dir = 'right';
    }

    //parent has child in that direction?
    if (!parent[dir]) {
      return false;
    }
    return this.Search(number, parent[dir]);
  }
  Delete(number, parent = this.root) {
    //1) step one, deleting root?
    //2) compare number with parent
    let dir, destroyRoot;
    if (number == parent.value) {
      destroyRoot = true;
    } else if (number < parent.value) {
      dir = 'left';
    } else {
      dir = 'right';
    }
    //gotta delete root? special case
    let biggest;
    if (destroyRoot) {
      if (!parent.left && !parent.right) {
        this.root = null;
        this.height = 0;
        return;
      } else if (parent.left ^ parent.right) {
        if (parent.left) {
          return (this.root = parent.left);
        } else return (this.root = parent.right);
      } else {
        biggest = this.getTheGreatest(parent.left);
        this.Delete(biggest.value, biggest);
        this.root.value = biggest.value;
        return;
      }
    }
    //3) parent has child in that direction?
    if (!parent[dir] && !destroyRoot) {
      console.log('number to be delete is not part of tree');
      return;
    }
    console.log(parent[dir]);
    //4) number == child of parent in that direction?
    if (!number == parent[dir].value && !destroyRoot) {
      this.Delete(number, parent[dir]);
    }
    // from now on the code assumes number has been found

    //5) parent has grandchil in that direction?
    if (!parent[dir].left || !parent[dir].right) {
      parent[dir] = null;
      return;
    }

    //6) number has 1 child?
    if (parent[dir].left ^ parent[dir].right) {
      let childOfnumber;
      if (parent[dir].left) {
        childOfnumber = parent[dir].left;
      } else {
        childOfnumber = parent[dir].right;
      }
      parent[dir] = childOfnumber;
      return;
    }

    //7)find the greatest number on the left subtree
    biggest = this.GetTheGreatest(parent[dir].left);

    //8 apply cut and paste with biggest over number
    this.Delete(biggest.value, biggest);
    this.number.value = biggest.value;
  }
  GetTheGreatest(startingPointNode) {
    //startingPointNode has right child?
    if (!startingPointNode.right) {
      return startingPointNode.value;
    }
    return this.getTheGreatest(startingPointNode.right);
  }
  GetTheSmallest(startingPointNode) {
    //startingpoingNode has left child?
    if (!startingPointNode.left) {
      return startingPointNode.value;
    }
    return this.getTheSmallest(startingPointNode.left);
  }
  setBalance(dir) {
    /* debugger; */
    dir == 'left' ? this.balance-- : this.balance++;
    if (this.parent != 'itself') {
      let newDir;
      this.parent.value > this.value ? (newDir = 'right') : (newDir = 'left');
      this.parent.setBalance(newDir);
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

//my first attempt sucks AF T_T
/*
insert(entry, parent = this.root) {
  //friendly warning: entry can be either a node or a number
  let rootExist = true;

  //now we process if entry is either a node or a number
  const [node, nodeValue] = this.processEntry(entry);

  //after the check below, we can assume:
  //1) entry is a valid value
  //2) root exists or its about to be created
  const [canIContinue, whyNotMsg] = this.areTheseEntriesPossible(nodeValue, parent);
  if (!canIContinue) {
    if (whyNotMsg == 'there is no root') {
      rootExist = false;
    } else if (whyNotMsg == 'entry value not valid') {
      console.log(whyNotMsg);
      return;
    }
  }

  //ok, what if there's no root?
  if (!rootExist) {
    this.createRoot(node);
    return this;
  }
  //ok so, from now on there's root

  //the following logic handles when nodeValue already exist
  //but their children dont
  if (whyNotMsg == 'entry is a value valid and exists already') {
    if (node.left) this.insert(node.left, this.root);
    if (node.right) this.insert(node.right, this.root);
    return console.log('value already exists');
  }

  //from now on we can assume nodeValue isn't in the tree
  //which means that probably the tree is about to get higher
  let currentLevel = parent.level;
  currentLevel++;
  node.setLevel(currentLevel);
  if (this.height == currentLevel) {
    this.height = currentLevel + 1;
  }

  // the following logic determines where should the new node goes

  if (nodeValue < parent.value) {
    !parent.left ? parent.setChild(node, 'left') : this.insert(node, parent.left);
  } else {
    !parent.right ? parent.setChild(node, 'right') : this.insert(node, parent.right);
  }
}

//search method always returns a node
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

  //after the check below, we can assume:
  //1) entry is a valid value
  //2) root exists
  //3) entry is part of the tree
  const [canIContinue, whyNotMsg] = this.areTheseEntriesPossible(entry, parent);
  if (!canIContinue) return console.log(whyNotMsg);

  //now we process if entry is either a node or a number
  const [node, nodeValue] = this.processEntry(entry);

  //the following logic return the parent
  if (node == this.root) {
    return this.root;
  } else if (parent.left == node || parent.right == node) {
    return parent;
  } else if (nodeValue < parent.value) {
    return this.fetchTheParentOf(node, parent.left);
  } else if (nodeValue > parent.value) {
    return this.fetchTheParentOf(node, parent.right);
  } else {
    console.log(
      'your node wasnt found but the following node of the three is alike, im gonna return its parent',
      parent,
    );
    return parent;
  }
}
//put numbers as entry value only!
delete(entry = null, parent = this.root) {
  //after the check below, we can assume:
  //1) entry is a valid value
  //2) root exists
  //3) entry is part of the tree
  const [canIContinue, whyNotMsg] = this.areTheseEntriesPossible(entry, parent);
  if (!canIContinue) return console.log('cant delete', whyNotMsg);

  //now we process if entry is either a node or a number
  const nodeToBeDeleted = this.search(entry);
  const childLeft = nodeToBeDeleted.left;
  const childRight = nodeToBeDeleted.right;
  const nodeParent = this.fetchTheParentOf(nodeToBeDeleted);

  let leafNode, halfLeafNode;
  leafNode = halfLeafNode = false;
  if (!childLeft && !childRight) leafNode = true;
  if (!childLeft ^ !childRight) halfLeafNode = true;

  if (leafNode) {
    if (nodeParent.left == nodeToBeDeleted) {
      nodeParent.left = null;
    } else if (nodeParent.right == nodeToBeDeleted) {
      nodeParent.right = null;
    } else {
      //nodeToBeDeleted == this.root
      this.root = null;
      this.height = 0;
    }
  } else if (halfLeafNode) {
    if (nodeParent.left == nodeToBeDeleted) {
      nodeParent.left = null;
    } else if (nodeParent.right == nodeToBeDeleted) {
      nodeParent.right = null;
    } else {
      //nodeToBeDeleted == this.root
      this.root = null;
      this.height = 0;
    }
    childLeft ? this.insert(childLeft) : this.insert(childRight);
  } else {
    if (nodeParent.left == nodeToBeDeleted) {
      nodeParent.left = null;
    } else if (nodeParent.right == nodeToBeDeleted) {
      nodeParent.right = null;
    } else {
      this.root = null;
      this.height = 0;
    }
    this.insert(childLeft);
    this.insert(childRight);
  }
  return this;
}

//this method return true when: entry is valid, root exists, entry exists
//entry
areTheseEntriesPossible(entry = null, parent = this.root) {
  if (!entry && entry != 0) return [false, 'entry value not valid'];
  if (parent == null) return [false, 'there is no root'];
  if (!this.search(entry, parent)) return [false, 'entry isnt part of the tree'];
  return [true, 'entry is a value valid and exists already'];
}
processEntry(entry) {
  if (entry instanceof Node) return [entry, entry.value];
  return [new Node(entry), entry];
}
createRoot(nodo) {
  this.root = nodo;
  this.root.setLevel(0);
  this.height = 1;
} */
