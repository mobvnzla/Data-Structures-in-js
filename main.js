import { mobsArray } from './mobsArray.js';

const myList = new mobsArray();

console.log('myList has ', myList.length, ' items');

myList.push('mob');
myList.push('has');
myList.push('it');

console.log('myList has ', myList.length, ' items');

console.log('in the index 0 is ', myList.data[0]);
console.log('in the index 1 is ', myList.data[1]);
console.log('in the index 2 is ', myList.data[2]);

myList.eraseByIndex(1);

console.log('after the eraseByIndex I got ', myList);
