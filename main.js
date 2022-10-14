import { BinrayTree } from './tree/binaryTree.js';

const myTree = new BinrayTree();
myTree.Insert(100);
myTree.Insert(101);
myTree.Insert(90);
myTree.Insert(91);
myTree.Insert(81);
myTree.Delete(91);
myTree.Delete(81);

console.log(myTree);
/*
myTree.Insert(170); */

/* myTree.Delete(100); */
