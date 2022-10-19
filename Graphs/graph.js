class Node {
  constructor(value) {
    this.value = value;
    this.degree = 0;
    this.Edgedwith = [];
  }
}
class UndirectedUnweightedGraph {
  constructor() {
    this.nodes = {};
    this.edges = {};
    this.numberOfNodes = 0;
  }
  addNodo(number) {
    this.nodes[number] = new Node(number);
    this.edges[number] = [];
    this.numberOfNodes++;
  }
  addEdge(node1, node2) {
    if (this.check(node1) && this.check(node2)) {
      this.edges[node1].push(node2);
      this.edges[node2].push(node1);

      const nodeA = this.nodes[node1];
      const nodeB = this.nodes[node2];

      nodeA.degree++;
      nodeA.Edgedwith.push(node2);
      nodeB.degree++;
      nodeB.Edgedwith.push(node1);
    }
  }
  check(number) {
    const entry = number.toString();
    return Object.getOwnPropertyNames(this.edges).includes(entry);
    //it can be one liner sentence but it loses readable
    // return Object.getOwnPropertyNames(this.edges).includes(number.toString());
  }
  path(node1, node2) {
    return this.check(node1) && this.check(node2) ? this.FindPath(node1, node2) : console.log('cant do that');
  }
  FindPath(currentNode, nodeMeta, visited = [], path = []) {
    /*    debugger; */
    path.push(currentNode);
    const edgesOfCurrentNode = [...this.nodes[currentNode]['Edgedwith']];
    if (edgesOfCurrentNode.includes(nodeMeta)) {
      path.push(nodeMeta);
      return path;
    } else {
      visited.push(currentNode);
      const adjacentsNotVisited = edgesOfCurrentNode.filter((item) => !visited.includes(item));
      for (const node of adjacentsNotVisited) {
        this.FindPath(node, nodeMeta, visited, path);
        if (path[path.length - 1] == node) path.pop();
      }
    }
    if (path.length == 1) return 'theres no path';
    return path;
  }
}

export { UndirectedUnweightedGraph };
