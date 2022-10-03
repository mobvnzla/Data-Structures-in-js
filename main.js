import { mobsArray } from './mobsArray.js';
import { mobHashTable } from './mobHashTable.js';
import { MySinglyLinkedList } from './singlyLinkedList.js';

let myLinkedList = new MySinglyLinkedList(1);

myLinkedList.append(2);
myLinkedList.append(3);
myLinkedList.append(4);

myLinkedList.preappend(0);
myLinkedList.insert(2, 'mi insert en el index 2');
myLinkedList.remove(0);
myLinkedList.remove(0);

console.log(myLinkedList);
