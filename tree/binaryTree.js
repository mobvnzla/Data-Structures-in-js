//if you dont know what's a binary tree
// probably you wanna take a look at
// https://appliedgo.net/bintree/

class Node {
  constructor(value, parent) {
    this.value = value;
    this.parent = parent;
    this.balance = 0;
    this.left = null;
    this.right = null;
  }
  setChild(node, dir) {
    dir == 'left' ? (this.left = node) : (this.right = node);
  }
  IncreaseBalance(dir) {
    //step 1
    dir == 'right' ? this.balance++ : this.balance--;
    let nodeOutOfBalance;

    //step *
    if (this.balance == 0) return nodeOutOfBalance;

    //step 2
    if (this.balance < -1 || this.balance > 1) {
      nodeOutOfBalance = this;
      return nodeOutOfBalance;
    }

    //step 3 and 4
    if (this.parent != 'itself') {
      this.parent.value < this.value ? (dir = 'right') : (dir = 'left');
      nodeOutOfBalance = this.parent.IncreaseBalance(dir);
    }
    return nodeOutOfBalance;
  }
  DecreaseBalance(dir) {
    //step 1
    dir == 'right' ? this.balance-- : this.balance++;
    let nodeOutOfBalance;

    //step *
    if (this.balance == -1 || this.balance == 1) return nodeOutOfBalance;

    //step 2
    if (this.balance < -1 || this.balance > 1) {
      nodeOutOfBalance = this;
      return nodeOutOfBalance;
    }

    //step 3 and 4
    if (this.parent != 'itself') {
      this.parent.value < this.value ? (dir = 'right') : (dir = 'left');
      nodeOutOfBalance = this.parent.DecreaseBalance(dir);
    }
    return nodeOutOfBalance;
  }
}

class BinrayTree {
  constructor() {
    this.root = null;
    this.height = 0;
  }
  CreateRoot(number) {
    this.root = new Node(number, 'itself');
    this.height = 1;
  }
  Insert(number, parent = this.root) {
    //is there root?
    if (parent == null) return this.CreateRoot(number);

    //compare number with parent
    let dir;
    if (number == parent.value) {
      console.log('number already exist');
      return;
    } else if (number < parent.value) {
      dir = 'left';
    } else dir = 'right';

    //parent has child in that direction?
    if (!parent[dir]) {
      const node = new Node(number, parent);
      parent.setChild(node, dir);
      const nodeOutOfBalance = parent.IncreaseBalance(dir);
      if (nodeOutOfBalance) this.Balance(nodeOutOfBalance);
    } else this.Insert(number, parent[dir]);
  }
  Search(number, parent = this.root) {
    //compare number with parent
    let dir;
    if (number == parent.value) {
      return parent;
    } else if (number < parent.value) {
      dir = 'left';
    } else {
      dir = 'right';
    }
    //parent has child in that direction?
    if (!parent[dir]) {
      return null;
    }
    return this.Search(number, parent[dir]);
  }
  Delete(number, parent = this.root) {
    //1) number exist?
    let nodeToBeDeleted = this.Search(number);
    if (!nodeToBeDeleted) {
      console.log('cant delete ', number);
      return;
    }
    let parentNode = this.FetchParent(number);

    //++) check if node to be deleted is also the root
    const destroyRoot = nodeToBeDeleted == parentNode;

    //+) get direction of nodeToBeDeleted according to its parent
    let dir;
    if (!destroyRoot) dir = parentNode.left == nodeToBeDeleted ? 'left' : 'right';

    //2) nodeToBeDelete has no children?
    if (!nodeToBeDeleted.left && !nodeToBeDeleted.right) {
      if (destroyRoot) {
        this.DestroyRoot();
        return;
      }
      nodeToBeDeleted.parent = null;
      dir == 'left' ? (parentNode.left = null) : (parentNode.right = null);
    }
    //3) nodeToBeDelete has 1 child?
    else if (!nodeToBeDeleted.left ^ !nodeToBeDeleted.right) {
      if (!nodeToBeDeleted.left) {
        nodeToBeDeleted.right.parent = destroyRoot ? parentNode.parent : parentNode;
        destroyRoot ? (this.root = nodeToBeDeleted.right) : (parentNode[dir] = nodeToBeDeleted.right);
      } else {
        nodeToBeDeleted.left.parent = destroyRoot ? parentNode.parent : parentNode;
        destroyRoot ? (this.root = nodeToBeDeleted.left) : (parentNode[dir] = nodeToBeDeleted.left);
      }
    }
    //from now on assume nodeToBeDelete has 2 children
    //step 4 and 5: do whats better according to balance
    else {
      let surrogateNode;
      if (nodeToBeDeleted.balance >= 0) {
        surrogateNode = this.GetTheSmallest(nodeToBeDeleted.right);
        this.Delete(surrogateNode.value, nodeToBeDeleted.right);
      } else {
        surrogateNode = this.GetTheGreatest(nodeToBeDeleted.left);
        this.Delete(surrogateNode.value, nodeToBeDeleted.left);
      }
      nodeToBeDeleted.value = surrogateNode.value;
    }
    if (!destroyRoot) {
      const nodeOutOfBalance = parentNode.DecreaseBalance(dir);
      if (nodeOutOfBalance) this.Balance(nodeOutOfBalance);
    }
  }
  FetchParent(number, parent = this.root) {
    //friendly reminder: this method assume number is part of the tree
    //1) compare number with parent
    if (number == parent.value) {
      return this.root.value == number ? parent : parent.parent;
    } else if (number < parent.value) {
      return this.FetchParent(number, parent.left);
    } else return this.FetchParent(number, parent.right);
  }
  GetTheGreatest(startingPointNode) {
    //startingPointNode has right child?
    if (!startingPointNode.right) {
      return startingPointNode;
    } else return this.GetTheGreatest(startingPointNode.right);
  }
  GetTheSmallest(startingPointNode) {
    //startingpoingNode has left child?
    if (!startingPointNode.left) {
      return startingPointNode;
    } else return this.GetTheSmallest(startingPointNode.left);
  }
  Balance(nodeOutOfBalance) {
    //step 1 and 2
    const unbalancePositive = nodeOutOfBalance.balance > 0;
    const surrogateNode = unbalancePositive
      ? this.GetTheSmallest(nodeOutOfBalance.right)
      : this.GetTheGreatest(nodeOutOfBalance.left);

    //step 3
    const numberToBeReInserted = nodeOutOfBalance.value;
    this.Delete(surrogateNode.value, nodeOutOfBalance);
    nodeOutOfBalance.value = surrogateNode.value;
    //step 4
    this.Insert(numberToBeReInserted, nodeOutOfBalance);
  }
  DestroyRoot() {
    this.root = null;
    this.height = 0;
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
