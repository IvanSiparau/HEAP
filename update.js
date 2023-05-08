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