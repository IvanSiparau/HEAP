function updateHeigth(node) {
    if (node != null) {
        node.height = Math.max(getHeigth(node.left), getHeigth(node.right)) + 1;
        updateHeigth(node.parent);
    }
}

function updateCoordinateX(node) {
    if (node != null) {
        if (node.loc === "root") {
            node.x = width / 2;
        } else if (node.loc === 'left') {
            node.x = node.parent.x - ((2 ** (getHeigth(node.right) + 1.5)) * 10);
        } else if (node.loc === "right") {
            node.x = node.parent.x + ((2 ** (getHeigth(node.left) + 1.5)) * 10);
        }
        updateCoordinateX(node.left);
        updateCoordinateX(node.right);
    }
}

function updateCoordinateY(node) {
    if (node != null) {
        if (node.loc === 'root') {
            node.y = 50;
        } else {
            node.y = node.parent.y + 50;
        }
        updateCoordinateY(node.left);
        updateCoordinateY(node.right);
    }
}

function getRoot(node) {
    while (node.loc !== 'root') {
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

function getHeigthForSplit(root) {
    if (root === null) {
        return 0;
    } else {
        //root.height = math.max(updateHeigthForSplit(root.left), updateHeigthForSplit(root.right)) + 1
        return Math.max(getHeigthForSplit(root.left), getHeigthForSplit(root.right)) + 1;
    }
}

function updateCoordinateForNewCoordinateOfOurSplitTreap(root, distanceX, distanceY) {
    if (root != null) {
        root.x += distanceX;
        root.y += distanceY;
        updateCoordinateForNewCoordinateOfOurSplitTreap(root.left, distanceX, distanceY);
        updateCoordinateForNewCoordinateOfOurSplitTreap(root.right, distanceX, distanceY);
    }
}

function updateHeightForSplitTreap(root) {
    if (root != null) {
        root.height = getHeigthForSplit(root)
        updateHeightForSplitTreap(root.left);
        updateHeightForSplitTreap(root.right);
    }
}

function UpdateCoordinateYForSplit(root) {
    if (root != null) {
        if (root.loc !== 'root') {
            root.y = root.parent.y + 50;
        }
        UpdateCoordinateYForSplit(root.left);
        UpdateCoordinateYForSplit(root.right);
    }
}

function UpdateCoordinateXForSplit(root) {
    if (root != null) {
        if (root.loc === 'left') {
            root.x = root.parent.x - ((2 ** (getHeigth(root.right) + 1.5)) * 10);
        } else if (root.loc === "right") {
            root.x = root.parent.x + ((2 ** (getHeigth(root.left) + 1.5)) * 10);
        }
        UpdateCoordinateXForSplit(root.left);
        UpdateCoordinateXForSplit(root.right);
    }
}

function updateForMerge(root) {
    let newRoot = getRoot(root);
    UpdateCoordinateYForSplit(newRoot);
    updateHeightForSplitTreap(newRoot);
    UpdateCoordinateXForSplit(newRoot);
    return newRoot;
}