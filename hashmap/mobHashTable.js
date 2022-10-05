// so far js doesnt run hashmaps by default so heres a humble implementation
// modern versions of hashmaps use a tree instead of a list (array)
//i'll make one using trees as soon as i learn whats a tree =)

//Una función criptográfica hash- usualmente conocida como “hash”-
//es un algoritmo matemático que transforma cualquier bloque arbitrario de datos
//en una nueva serie de caracteres con una longitud fija.
//Independientemente de la longitud de los datos de entrada,
//el valor hash de salida tendrá siempre la misma longitud

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

    /* console.log('the key is ', key);
    console.log('data length is ', this.data.length);
    console.lo g(''); */

    for (let i = 0; i < key.length; i++) {
      /* console.log('the hash is ', hash); */
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
      /* console.log('after the computed is', hash);
      console.log('and the charcode of the key is ', key.charCodeAt(i));
      console.log(''); */
    }
    return hash;
  }

  //the following method create a node, inside of it the data lives
  node(key, value, hash) {
    return [key, value, hash];
  }

  //the put method push new entries into the structure
  put(key, value) {
    //here i get the hash of the data by using its key
    const hash = this.hashMethod(key);
    //here I create the bucket where the data with that certain hash goes
    if (!this.data[hash]) {
      this.data[hash] = [];
    }
    //here I push the node into the bucket
    this.data[hash].push(this.node(key, value, hash));
    return this.data;
  }

  getValueOf(key) {
    //here i get the hash of the data by using its key
    const hash = this.hashMethod(key);
    //get the bucket where the nodes with that certain data went
    const bucket = this.data[hash];
    //now iterate over the bucket to get the node
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          return bucket[i][1];
        }
      }
    }
    //if the key hasnt been putted into the structure the method returns an undefined
    return undefined;
  }
  // https://stackoverflow.com/questions/56659890/possible-to-push-empty-slot-to-an-array
  erase(key) {
    //key exist check
    if (!this.getValueOf(key)) {
      return undefined;
    }
    //here i get the hash
    const hash = this.hashMethod(key);
    // then i get the bucket
    const bucket = this.data[hash];
    //and here i get the node and kick it out
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] == key) {
        const dataDeleted = bucket[i];
        bucket.splice(i, 1);
        return dataDeleted;
      }
    }
  }
}

export { mobHashTable };
