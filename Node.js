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
    sendMessageAboutAddedNode(node);
    while ((lastNode.parent != null) && (node.priority <= lastNode.priority)) {
        drawPass(lastNode);
        drawComparison(lastNode, node);
        lastNode = lastNode.parent;
        /*        if (lastNode.parent == null) {
                    drawComparison(lastNode, node);
                    drawPass(lastNode);
                }*/
    }
    if ((lastNode.parent == null) && ((node.priority <= lastNode.priority))) {
        drawPass(lastNode);
        drawComparison(lastNode, node);
        sendMessageAboutNewAddedNodeBeginRoot();
        node.loc = "root";
        node.parent = null;
        node.left = lastNode;
        node.left.parent = node;
        node.left.loc = "left";
        node.height = getHeigth(lastNode) + 1;
        mode = newAddedNodeBeginRootOfHeap;
        return node;
    } else {
        drawPass(lastNode);
        drawComparison(lastNode, node);
        sendMessageAboutFoundNodeWithPriorityLessThenCurrent();
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
    sendMessageAboutSortNode();
    for (let i = 0; i < nodes.length; i++) {
        const [key, priority] = nodes[i];
        const node = new Node(key, priority);
        root = insertNode(root, node);
        newOurHeap = update(root, node);
        if (isFirst) {
            sendMessageAboutFirstNode();
            drawFirstNode(newOurHeap);
            isFirst = false;
            drawFirstAddedNode(node);
        } else {
            drawUpdate(newOurHeap, node);
            count++;
            if (mode === newAddedNodeBeginRootOfHeap) {
                drawNewLineBetweenOurHeapAndNewNode(root, lastNode, mode);
            } else if (mode === newAddedNodeBeginTheRigthSonOfNode) {
                drawNewLineBetweenOurHeapAndNewNode(node, lastNode, mode);
            }
        }
        drawPassByLastAddedNode(node);
        lastNode = node;
    }
    return root;
}