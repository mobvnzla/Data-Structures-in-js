import { mobsArray } from './mobsArray.js';
import { mobHashTable } from './mobHashTable.js';

// "a" gives me a output hash 0
// "aa" gives me a output hash 1
// "zppdq" gives me a output hash 2

const myData = new mobHashTable(3);
myData.set('aa', 10);
