import { mobsArray } from './mobsArray.js';
import { mobHashTable } from './mobHashTable.js';
import { MySinglyLinkedList } from './singlyLinkedList.js';
import { MyDoubleLinkedList } from './DoublyLinkedList.js';

let myLinkedList = new MyDoubleLinkedList(1);

myLinkedList.append(2);
myLinkedList.append(3);
myLinkedList.preappend(0);
myLinkedList.insert(1, 'algo');
myLinkedList.remove(2);

console.log(myLinkedList);
