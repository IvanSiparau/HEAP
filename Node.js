class Node {
    constructor(key, priority) {
        this.key = key;
        this.priority = priority;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

function find(nodess, findNode) {
    if (nodess != null) {
        if (nodess.key === findNode.key && nodess.priority === findNode.priority) {
            console.log(nodess);
            return nodess;
        }
        find(nodess.left, findNode);
        find(nodess.right, findNode);
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
    while ((lastNode.parent != null) && (node.priority <= lastNode.priority)) {
        drawFirstAddedNode(lastNode);
        lastNode = lastNode.parent;
    }
    if ((lastNode.parent == null) && ((node.priority <= lastNode.priority))) {
        node.loc = "root";
        node.parent = null;
        node.left = lastNode;
        node.left.parent = node;
        node.left.loc = "left";
        node.height = getHeigth(lastNode) + 1;
        mode = newAddedNodeBeginRootOfHeap;
        return node;
    } else {
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
        mode = newAddedNodeBeginTheRigthSonOfNode;
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
/*        if (!isFirst) {
            drawNewAddedNode(node);
        }*/
        root = insertNode(root, node);
        newOurHeap = update(root, node);
        if (isFirst) {
            drawFirstNode(newOurHeap);
            isFirst = false;
            drawFirstAddedNode(node);
        } else {
            drawUpdate(newOurHeap, node);
            let NewNode = find(newOurHeap, node);
            //console.log(NewNode);
            count++;
            if (mode == newAddedNodeBeginRootOfHeap) {
                drawNewLineBetweenOurHeapAndNewNode(root, lastNode, mode);
            } else if (mode == newAddedNodeBeginTheRigthSonOfNode) {
                drawNewLineBetweenOurHeapAndNewNode(node, lastNode, mode);
            }
        }
        lastNode = node;
    }
    return root;
}