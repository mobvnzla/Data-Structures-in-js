import { mobsArray } from './mobsArray.js';

const myList = new mobsArray();

myList.myPush('mob');
myList.myPush('has');
myList.myPush('it');

/* myList.myUnshift('unshift');
myList.myUnshift('another unshift'); */

myList.myShift();
console.log(myList.data);
