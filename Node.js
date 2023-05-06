class Node {
  constructor(key, priority, height, posY, parent) {
    this.key = key;
    this.priority = priority;
    this.height = height;
    this.x = width /  2;
    this.y = posY;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
}

function getHieght(node) {
  if (node == null) {
    return 0;
  } else {
    return node.height;
  }
}
function addOnlyOneNode(node, value) {
  if (node == null) {
    const newNode = new Node();
    return newNode;
  }
}

function buildHeap(node, listOfNodes) {
  for (let i = 0; i < listOfNodes.lenght; ++i) {
    node = addOnlyOneNode(node, listOfNodes[i]);
  }
  return node;
}

function update(node) {
  
}