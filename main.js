import { BinrayTree } from './tree/binaryTree.js';

const myTree = new BinrayTree();
myTree.Insert(105);
myTree.Insert(100);
myTree.Insert(150);
myTree.Insert(90);
myTree.Insert(110);
myTree.Insert(160);
myTree.Insert(155);
myTree.Insert(170);
myTree.Delete(100);

console.log(myTree);
/*
myTree.Insert(170); */

/* myTree.Delete(100); */
