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
  if (lastNode == null) {  //здесь рассматриваем самую первую вешину
    node.loc = "root";
    return node;
  }
  while((lastNode.parent != null) && (node.priority <= lastNode.priority)) {
    lastNode = lastNode.parent;
  }
  if ((lastNode.parent == null) && ((node.priority <= lastNode.priority))) { //здесь добавленная вершина становится корнем
    node.loc = "root";
    node.parent = null;
    node.left = lastNode;
    node.left.parent = node;
    node.left.loc = "left";
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

// Мне нужно реализовать функцию update, и вести координаты x, y. Написать функцию для построения самого дерево, пуускай без  каких,то анимаций,  но сделать ее, черт побери, хотя это изи чел.
function getHeigth(node) {
  if (node == null) {
    return 0;
  } else {
    return node.heigth; 
  }
}
function updateHeigth(node) {
  
}

function updateCoordinateX(node) {
  
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

let roots = buildCartesianTree([[1, 5], [2, 4], [3, 6], [4, 8], [5, 5], [6, 2]]);
updateCoordinateY(roots);
console.log(roots);