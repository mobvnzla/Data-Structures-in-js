import { mobsArray } from './mobsArray.js';
import { mobHashTable } from './mobHashTable.js';
import { MySinglyLinkedList } from './singlyLinkedList.js';
import { MyDoubleLinkedList } from './DoublyLinkedList.js';
import { Stack } from './stack.js';
import { Queue } from './queue.js';

let myStack = new Queue();
myStack.enqueue('halana');
myStack.enqueue('enays');
myStack.enqueue('gilberto');
myStack.enqueue('jessica');
myStack.enqueue('mariafrica');

console.log('');
myStack.peek();
