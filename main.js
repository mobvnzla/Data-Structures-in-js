import { BinrayTree } from './tree/binaryTree.js';

const myTree = new BinrayTree();
myTree.Insert(100);
myTree.Insert(110);
myTree.Insert(120);
myTree.Insert(90);
myTree.Delete(120);
myTree.Delete(110);
myTree.Insert(110);

console.log(myTree);
