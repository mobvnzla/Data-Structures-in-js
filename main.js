import { BinrayTree } from './tree/binaryTree.js';

const myTree = new BinrayTree();
myTree.insert(5);
myTree.insert(4);
myTree.insert(3);
myTree.insert(2);
myTree.insert(1);
myTree.delete(3);

console.log(myTree);
