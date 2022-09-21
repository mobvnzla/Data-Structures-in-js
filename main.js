import { mobsArray } from './mobsArray.js';

const myList = new mobsArray();

console.log(myList.data);

myList.myPush('mob');
myList.myPush('has');
myList.myPush('it');

console.log(myList.data);

/* myList.myUnshift('straight');
console.log(myList.data);
myList.myUnshift('straight to the lower bound x2');

console.log(myList.data); */
