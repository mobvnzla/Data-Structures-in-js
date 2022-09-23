// so far js doesnt run hashmaps by default so heres a humble implementation
// modern versions of hashmaps use a tree instead of a list (array)
//i'll make one using trees as soon as i learn whats a tree =)

class mobHashTable {
  constructor(size) {
    this.data = new Array(size);
  }
  //the following method create the hash
  hashMethod(key) {
    let hash = 0;
    //in this method there are lots of console.log, go the main.js and run these two lines
    //const myData = new mobHashTable(3);
    //myData.put('aa', 10);
    //open up the console and watch how the hash method runs =)
    console.log('the key is ', key);
    console.log('data length is ', this.data.length);
    console.log('');

    for (let i = 0; i < key.length; i++) {
      console.log('the hash is ', hash);
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
      console.log('after the computed is', hash);
      console.log('and the charcode of the key is ', key.charCodeAt(i));
      console.log('');
    }
    return hash;
  }
  //the put method push new entries into the structure
  put(key, value) {
    //here i get the address or hash of the data by using its key
    const address = this.hashMethod(key);
    //here I create the node where the data with that certain address goes
    if (!this.data[address]) {
      this.data[address] = [];
    }
    //here I push the data into the bucket
    this.data[address].push([key, value]);
    return this.data;
  }
  get(key) {
    //here i get the address or hash of the data by using its key
    const address = this.hashMethod(key);

    return this.data[address];
  }
}

export { mobHashTable };
