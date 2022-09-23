import { mobsArray } from './mobsArray.js';
import { mobHashTable } from './mobHashTable.js';

// "a" gives me a output hash 0
// "aa" gives me a output hash 1
// "zppdq" gives me a output hash 2

const myData = new mobHashTable(3);
myData.put('aa', 10);

console.log(myData.getValueOf('aaa'));
