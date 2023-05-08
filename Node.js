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
  let isFirst = true;
  let newOurHeap = null;
  for (let i = 0; i < nodes.length; i++) {
    const [key, priority] = nodes[i];
    const node = new Node(key, priority);
    if (!isFirst) {
      drawNewAddedNode(node);
    }
    root = insertNode(root, node);
    lastNode = node;
    newOurHeap = update(root);
    if (isFirst) {
      drawFirstNode(newOurHeap);
      isFirst = false;
    } else {
      drawUpdate(newOurHeap);
      count++;
    }
  }
  return root;
}


let roots = buildCartesianTree([[1, 5],  [2,4], [3, 6], [4, 8], [5, 5], [6, 2]]);
roots = update(roots)
console.log(roots);