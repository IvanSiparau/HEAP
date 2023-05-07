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
    return node;
  }
  while((lastNode.parent != null) && (node.priority <= lastNode.priority)) {
    lastNode = lastNode.parent;
  }
  if ((lastNode.parent == null) && ((node.priority <= lastNode.priority))) {
    node.parent = null;
    node.left = lastNode;
    lastNode.parent = node;
    return node;
  } else  {
    if (lastNode.right != null) {
      lastNode.right.parent = node;
      node.left = lastNode.right;
    }
    lastNode.right = node;
    node.parent = lastNode;
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
  let currentNode = root;
  while(currentNode.parent != null) {
    currentNode = currentNode.parent;
  }
  return root;
}

let roots = buildCartesianTree([[1, 5],  [2,4], [3, 6], [4, 8], [5, 5], [6, 2]]);
console.log("key: " + String(roots.key) + " priority: " + String(roots.priority));

console.log(roots);
// Мне нужно реализовать функцию update, и вести координаты x, y. Написать функцию для построения самого дерево, пуускай без  каких,то анимаций,  но сделать ее, черт побери, хотя это изи чел.