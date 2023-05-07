class Node {
  constructor(key, priority) {
    this.key = key;
    this.priority = priority;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

function insertNode(lastNode, node) {
  if (lastNode == null) {
    node.loc = "root";
    node.left = null;
    node.right = null;
    node.height = 1;
    return node;
  }
  while((lastNode.parent != null) && (node.priority <= lastNode.priority)) {
    lastNode = lastNode.parent;
  }
  if ((lastNode.parent == null) && ((node.priority <= lastNode.priority))) {
    node.loc = "root";
    node.parent = null;
    node.left = lastNode;
    node.left.parent = node;
    node.left.loc = "left";
    node.height = getHeigth(lastNode) + 1;
    return node;
  } else  {
    if (lastNode.right != null) {
      lastNode.right.parent = node;
      node.left = lastNode.right;
    }
    lastNode.right = node;
    node.parent = lastNode;
    node.loc = "right";
    if (node.left != null) {
      node.left.loc = "left";
    }
    updateHeigth(node);
    return node;
  }
}


function buildCartesianTree(nodes) {
  let root = null;
  let lastNode = null;

  for (let i = 0; i < nodes.length; i++) {
    const [key, priority] = nodes[i];
    const node = new Node(key, priority);
    root = insertNode(root, node);
    lastNode = node;
  }
  return root;
}

function updateHeigth(node) {
  if (node != null) {
    node.height = Math.max(getHeigth(node.left), getHeigth(node.right)) + 1;
    updateHeigth(node.parent);
  }
}

function updateCoordinateX(node) {
  if (node != null) {
    if (node.loc == "root") {
      node.x = width / 2;
    } else if (node.loc == 'left') {
      node.x = node.parent.x - ((2 ** (getHeigth(node.right) + 1)) * 10);
    } else if (node.loc == "right") {
      node.x = node.parent.x + ((2 ** (getHeigth(node.left) + 1)) * 10);
    }
    updateCoordinateX(node.left);
    updateCoordinateX(node.right);
  }
}

function updateCoordinateY(node) {
  if (node != null) {
    if (node.loc == 'root') {
      node.y = 50;
    } else {
      node.y = node.parent.y + 40;
    }
    updateCoordinateY(node.left);
    updateCoordinateY(node.right);
  } 
}

function getRoot(node) {
  while (node.loc != 'root') {
    node = node.parent;
  }
  return node;
}

function getHeigth(node) {
  if (node == null) {
    return 0;
  } else {
    return node.height;
  }
}

function update(node) {
  let newHeap = getRoot(node);
  updateCoordinateY(newHeap);
  updateCoordinateX(newHeap);
  return newHeap;
}


let roots = buildCartesianTree([[1, 5],  [2,4], [3, 6], [4, 8], [5, 5], [6, 2]]);
roots = update(roots)
console.log(roots);