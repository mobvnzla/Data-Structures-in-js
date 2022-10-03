import { mobsArray } from './mobsArray.js';
import { mobHashTable } from './mobHashTable.js';
import { MySinglyLinkedList } from './singlyLinkedList.js';
import { MyDoubleLinkedList } from './DoublyLinkedList.js';
import { Stack } from './stack.js';

let myStack = new Stack();
myStack.myPush('el primer push');
myStack.myPush('el segundo push');
myStack.myPush('el tercer push');
myStack.myPush('el cuarto push');
myStack.myPop();

console.log(myStack);
