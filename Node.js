class Node {
    constructor(key, priority) {
        this.key = key;
        this.priority = priority;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class BuildTreap {
    constructor() {
        this.root = null;
        this.time = time;
        this.lastNode = null;
        this.count = 0;
        this.lastSetion = '';
        this.listOfNodes = null;
    }

    getTime() {
        return this.time;
    }

    getCount() {
        return this.time;
    }

    setListOfNodes(nodes) {
        this.listOfNodes = nodes;
    }

    getRoot() {
        return this.root;
    }

    setRoot(root) {
        this.root = root;
    }

    insertNode(node) {
        if (this.lastNode == null) {
            node.loc = "root";
            node.left = null;
            node.right = null;
            node.x = width / 2;
            node.y = 50;
            node.height = 1;
            this.root = node;
            return;
        }

        changeColorOfSelector('code4', 'code5');
        changeColorOfSelector('code5', 'code6');
        while ((this.lastNode.parent != null) && (node.priority < this.lastNode.priority)) {
            drawPass(this.lastNode);
            drawComparisonForBuild(this.lastNode, node);
            this.lastNode = this.lastNode.parent;
        }
        this.lastSetion = 'code6'
        if ((this.lastNode.parent == null) && ((node.priority < this.lastNode.priority))) {
            this.lastSetion = 'code7';
            drawPass(this.lastNode);
            drawComparisonForBuild(this.lastNode, node);
            changeColorOfSelector('code6', 'code7');
            node.loc = "root";
            node.parent = null;
            node.left = this.lastNode;
            node.left.parent = node;
            node.left.loc = "left";
            node.height = getHeigth(this.lastNode) + 1;
            mode = newAddedNodeBeginRootOfHeap;
            this.root = node;
            return;
        } else {
            drawPass(this.lastNode);
            drawComparisonForBuild(this.lastNode, node);
            changeColorOfSelector('code6', 'code11');
            this.lastSetion = 'code11';
            //sendMessageAboutFoundNodeWithPriorityLessThenCurrent();
            if (this.lastNode.right != null) {
                this.lastNode.right.parent = node;
                node.left = this.lastNode.right;
            }
            this.lastNode.right = node;
            node.parent = this.lastNode;
            node.loc = "right";
            if (node.left != null) {
                node.left.loc = "left";
            }
            updateHeigth(node);
            mode = newAddedNodeBeginTheRigthSonOfNode;
            this.root = node;
        }
    }

    buildTreap() {
        changeColorOfSelector(0, 'code1');
        changeColorOfSelector('code1', 'code2');
        let isFirst = true;
        let newOurHeap = null;
        changeColorOfSelector('code2', 'code3');
        this.lastSetion = 'code3';
        for (let i = 0; i < this.listOfNodes.length; i++) {
            changeColorOfSelector(this.lastSetion, 'code4');
            const [key, priority] = this.listOfNodes[i];
            const node = new Node(key, priority);
            this.insertNode(node);
            newOurHeap = update(this.root, node);
            if (isFirst) {
                changeColorOfSelector('code4', 'code5');
                changeColorOfSelector('code5', 'code7');
                changeColorOfSelector('code7', 'code8');
                changeColorOfSelector('code8', 'code10');
                this.lastSetion = 'code10'
                drawFirstNode(newOurHeap);
                isFirst = false;
                drawFirstAddedNode(node);
            } else {
                drawUpdate(newOurHeap, node);
                count++;
                if (mode === newAddedNodeBeginRootOfHeap) {
                    changeColorOfSelector(this.lastSetion, 'code8');
                    drawNewLineBetweenOurHeapAndNewNode(this.root, this.lastNode, mode);
                    changeColorOfSelector('code8', 'code9');
                    changeColorOfSelector('code9', 'code10');
                    this.lastSetion = 'code10';
                } else if (mode === newAddedNodeBeginTheRigthSonOfNode) {
                    this.lastSetion = drawNewLineBetweenOurHeapAndNewNode(node, this.lastNode, mode, this.lastSetion);
                }
            }
            changeColorOfSelector(this.lastSetion, 'code16');
            this.lastSetion = 'code16'
            drawPass(node);
            this.lastNode = node;
        }
        delatePassAndMessage();
    }
}


class TreapForSplit {
    constructor() {
        this.root = null;
        this.keyForSplit = null;
        this.firstTreap = null;
        this.secondTreap = null;
        this.lastSection = 0;
    }

    setKeyForSplit(key) {
        this.keyForSplit = key;
    }

    setRoot(otherRoot) {
        this.root = update(otherRoot);
    }

    drawOurTreapForSlip() {
        drawOnlyKey(this.root);
        count++;
    }

    getRoot() {
        return this.root;
    }

    getFirstTreap() {
        return this.firstTreap;
    }

    getSecondTreap() {
        return this.secondTreap;
    }

    updateNewLocationForLeftSplit() {
        this.firstTreap.x = width / 4;
        this.firstTreap.y = 50;
        updateForMerge(this.firstTreap);
    }

    updateNewLocationForRightSplit() {
        this.secondTreap.x = 3 * width / 4;
        this.secondTreap.y = 50;
        updateForMerge(this.secondTreap);
    }

    Split(root, key) {
        changeColorOfSelector(this.lastSection, 'code1');
        this.lastSection = 'code1';
        if (root == null) {
            drawPassForSplit(root);
            changeColorOfSelector(this.lastSection, 'code2')
            changeColorOfSelector('code2', 'code3')
            this.lastSection = 'code3';
            return [null, null];
        } else if (root.key < key) {
            drawPassForSplit(root);
            drawComparisonForSplit(root, key)
            changeColorOfSelector(this.lastSection, 'code4');
            changeColorOfSelector('code4', 'code5');
            this.lastSection = 'code5';
            let [left, right] = this.Split(root.right, key);
            changeColorOfSelector(this.lastSection, 'code6')
            changeLineBetweenTwoNode(root, root.right, left);
            changeColorOfSelector('code6', 'code7');
            this.lastSection = 'code7';
            root.right = left;
            if (root.right != null) {
                root.right.loc = 'right';
                root.right.parent = root;
            }
            return [root, right];
        } else {
            drawPassForSplit(root);
            drawComparisonForSplit(root, key);
            //drawComparisonParameterOfRootWithValue(root, root.key, key);
            changeColorOfSelector(this.lastSection, 'code8')
            changeColorOfSelector('code8', 'code9')
            this.lastSection = 'code9';
            let [left, right] = this.Split(root.left, key);
            changeColorOfSelector(this.lastSection, 'code10');
            changeLineBetweenTwoNode(root, root.left, right);
            changeColorOfSelector('code10', 'code11');
            this.lastSection = 'code11';
            root.left = right;
            if (root.left != null) {
                root.left.loc = 'left';
                root.left.parent = root;
            }
            return [left, root];
        }
    }

    splitOurTreap() {
        const [left, right] = this.Split(this.root, this.keyForSplit);
        if (left != null) {
            this.firstTreap = left;
            this.firstTreap.loc = 'root';
            this.firstTreap.parent = null;
            if (right != null) {
                this.updateNewLocationForLeftSplit();
            }
        }
        if (right != null) {
            this.secondTreap = right;
            this.secondTreap.loc = 'root';
            this.secondTreap.parent = null;
            if (left != null) {
                this.updateNewLocationForRightSplit();
            }
        }
        count += 1;
        drawAnimationTreapInNewNode(this.firstTreap);
        drawAnimationTreapInNewNode(this.secondTreap);
        count++;
        drawKeyAndPriority(this.secondTreap);
        drawKeyAndPriority(this.firstTreap);
    }

}

class TreapsForMerge {
    constructor() {
        this.root = null;
        this.firstTreap = null;
        this.secondTreap = null;
    }

    setRoot(root) {
        this.root = root;
    }

    getRoot() {
        return this.root;
    }

    setFirstTreap(treap) {
        this.firstTreap = treap;
    }

    setSecondTreap(treap) {
        this.secondTreap = treap;
    }

    drawTreapsForMerge() {
        if (this.firstTreap != null && this.secondTreap != null) {
            drawOnlyPriority(this.firstTreap);
            drawOnlyPriority(this.secondTreap);
            count++;
        }
    }

    mergeOurTreaps() {
        this.drawTreapsForMerge();
        this.root = merge(this.firstTreap, this.secondTreap);
        this.root.x = width / 2;
        this.root.y = 50;
        this.root = updateForMerge(this.root);
        drawAnimationTreapInNewNode(this.root);
        count++
        drawKeyAndPriority(this.root);
        count++;
        this.secondTreap = null;
        this.firstTreap = null;
    }
}

function merge(leftTree, rightTree) {
    if (leftTree === null) {
        drawPassesForMerge(leftTree, rightTree);
        return rightTree;
    }
    if (rightTree === null) {
        drawPassesForMerge(leftTree, rightTree);
        return leftTree;
    }

    if (leftTree.priority <= rightTree.priority) {
        drawPassesForMerge(leftTree, rightTree);
        let oldConection = leftTree.right
        leftTree.right = merge(leftTree.right, rightTree);
        changeLineBetweenTwoNodeForMerge(leftTree, oldConection, leftTree.right)
        if (leftTree.right != null) {
            leftTree.right.loc = 'right';
            leftTree.right.parent = leftTree;
        }
        let newRoots = updateForMerge(leftTree);
        drawAnimationTreapInNewNode(newRoots);
        count++;
        return leftTree;
    } else {
        drawPassesForMerge(leftTree, rightTree);
        let oldConection = rightTree.left;
        rightTree.left = merge(leftTree, rightTree.left);
        changeLineBetweenTwoNodeForMerge(rightTree, oldConection, rightTree.left)
        if (rightTree.left != null) {
            rightTree.left.loc = 'left';
            rightTree.left.parent = rightTree;

        }
        let newRoots = updateForMerge(rightTree);
        drawAnimationTreapInNewNode(newRoots);
        count++;
        return rightTree;
    }
}

function IsNodeEque(firstNode, secondNode) {
    if (firstNode == null || secondNode == null) {
        return false;
    } else if (firstNode.key === secondNode.key && firstNode.priority === secondNode.priority) {
        return true;
    }
    return false;
}

class AddedNodeToOurTreap {
    constructor() {
        this.root = null;
        this.addedNode = null;
    }

    setRoot(root) {
        this.root = root;
    }

    getRoot() {
        return this.root;
    }

    setNodeForAdd(node) {
        this.addedNode = node;
    }

    insertNewNodeForTreap() {
        if (this.root == null) {
            this.root = this.addedNode;
            let newNode = new Node(this.addedNode[0], this.addedNode[1]);
            newNode.loc = 'root';
            newNode.parent = null;
            newNode.x = width / 2;
            newNode.y = 50;
            drawFirstNode(newNode);
            this.root = newNode;
            return;
        } else {
            let SplitTreap = new TreapForSplit();
            SplitTreap.setRoot(this.root);
            SplitTreap.drawOurTreapForSlip();
            SplitTreap.setKeyForSplit(this.addedNode[0]);
            SplitTreap.splitOurTreap();
            if (SplitTreap.getSecondTreap() == null) {
                let root = SplitTreap.getFirstTreap();
                root.x = width / 4;
                root.y = 50;
                root = updateForMerge(root);
                drawAnimationTreapInNewNode(root);
                count++;
                let newAddedNode = new Node(this.addedNode[0], this.addedNode[1]);
                newAddedNode.x = width / 2;
                newAddedNode.y = 50;
                newAddedNode.loc = 'root';
                drawFirstNode(newAddedNode);
                drawOnlyPriority(newAddedNode);
                drawOnlyPriority(root);
                count++;
                root = merge(root, newAddedNode);
                root.x = width / 2;
                root.y = 50;
                root = updateForMerge(root);
                drawAnimationTreapInNewNode(root);
                count++;
                drawKeyAndPriority(root);
                this.root = root;
                return;
            } else if (SplitTreap.getFirstTreap() == null) {
                let root = SplitTreap.getSecondTreap();
                root.x  = 3 * width / 4;
                root.y = 50;
                root = updateForMerge(root);
                drawAnimationTreapInNewNode(root);
                let newAddedNode = new Node(this.addedNode[0], this.addedNode[1]);
                newAddedNode.x = width / 2;
                newAddedNode.y = 50;
                newAddedNode.loc = 'root';
                drawFirstNode(newAddedNode);
                drawOnlyPriority(root);
                drawOnlyPriority(newAddedNode);
                count++;
                root = merge(newAddedNode, root);
                root.x = width / 2;
                root.y = 50;
                root = updateForMerge(root);
                drawAnimationTreapInNewNode(root);
                count++;
                drawKeyAndPriority(root);
                this.root = root;
                return;
            }
            let newAddedNode = new Node(this.addedNode[0], this.addedNode[1]);
            newAddedNode.x = width / 2;
            newAddedNode.y = 50;
            newAddedNode.loc = 'root';
            drawFirstNode(newAddedNode);
            drawOnlyPriority(newAddedNode);
            drawOnlyPriority(SplitTreap.getFirstTreap());
            let root = merge(SplitTreap.getFirstTreap(), newAddedNode);
            root.x = width / 4;
            root.y = 50;
            root = updateForMerge(root);
            drawAnimationTreapInNewNode(root);
            count++;
            drawOnlyPriority(SplitTreap.getSecondTreap());
            count++;
            root = merge(root, SplitTreap.getSecondTreap());
            root.x = width / 2;
            root.y = 50;
            root = updateForMerge(root);
            drawAnimationTreapInNewNode(root);
            count++;
            drawKeyAndPriority(root)
            this.root = root;
        }
    }
}

class RemoveNodeOfTreap {
    constructor() {
        this.root = null;
        this.RemoveKey = null;
    }

    setRoot(root) {
        this.root = root;
    }

    getRoot() {
        return this.root;
    }

    setNode(key) {
        this.RemoveKey = key;
    }

    RemoveTheNode() {
        let SplitTreap = new TreapForSplit();
        SplitTreap.setRoot(this.root);
        SplitTreap.drawOurTreapForSlip();
        SplitTreap.setKeyForSplit(this.RemoveKey);
        SplitTreap.splitOurTreap();
        if (SplitTreap.getFirstTreap() == null) {
            drawOnlyKey(SplitTreap.getSecondTreap())
            count++;
            let [left, right] = Split(SplitTreap.getSecondTreap(), this.RemoveKey + 1);
            deleteFullOurTreap(left);
            if (right != null) {
                right.loc = 'root';
                right.parent = null;
                right.x = width / 2;
                right.y = 50;
                right = updateForMerge(right);
                drawAnimationTreapInNewNode(right);
                count++;
                drawKeyAndPriority(right);
                count++;
                this.root = right;
            }
            return;
        } else if (SplitTreap.getSecondTreap() == null) {
            this.root = SplitTreap.getFirstTreap();
            return;
        }
        drawOnlyKey(SplitTreap.getSecondTreap());
        count++;
        let [left, right] = Split(SplitTreap.getSecondTreap(), this.RemoveKey + 1);
        deleteFullOurTreap(left);
        if (right != null) {
            right.loc = 'root';
            right.parent = null;
            right.x = 3 * width / 4;
            right.y = 50;
            right = updateForMerge(right);
            drawAnimationTreapInNewNode(right);
            count++;
            let Merge = new TreapsForMerge();
            Merge.setFirstTreap(SplitTreap.getFirstTreap());
            Merge.setSecondTreap(right);
            Merge.mergeOurTreaps();
            this.root = Merge.getRoot();
        }
    }
}

function Split(root, key) {
    if (root == null) {
        drawPassForSplit(root);
        return [null, null];
    } else if (root.key < key) {
        drawPassForSplit(root);
        drawComparisonForSplit(root, key)
        let [left, right] = this.Split(root.right, key);
        changeLineBetweenTwoNode(root, root.right, left);
        root.right = left;
        if (root.right != null) {
            root.right.loc = 'right';
            root.right.parent = root;
        }
        return [root, right];
    } else {
        drawPassForSplit(root);
        drawComparisonForSplit(root, key);
        let [left, right] = this.Split(root.left, key);
        changeLineBetweenTwoNode(root, root.left, right);
        root.left = right;
        if (root.left != null) {
            root.left.loc = 'left';
            root.left.parent = root;
        }
        return [left, root];
    }
}

class RandomTupleGenerator {
    constructor(min, max, count) {
        this.min = min;
        this.max = max;
        this.count = count;
        this.existingTuples = [];
    }

    generateRandomTuples() {
        const result = [];
        for (let i = 0; i < this.count; i++) {
            const tuple = this.generateUniqueTuple();
            result.push(tuple);
        }

        return result;
    }

    generateUniqueTuple() {
        let tuple = this.generateRandomTuple();

        while (this.isTupleDuplicate(tuple)) {
            tuple = this.generateRandomTuple();
        }

        this.existingTuples.push(tuple);
        return tuple;
    }

    generateRandomTuple() {
        const a = this.getRandomInteger();
        const b = this.getRandomInteger();
        return [a, b];
    }

    isTupleDuplicate(tuple) {
        for (const existingTuple of this.existingTuples) {
            if (existingTuple[0] === tuple[0] && existingTuple[1] === tuple[1]) {
                return true;
            }
        }

        return false;
    }

    getRandomInteger() {
        return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    }
}

class randomTreap {
    constructor() {
        this.root = null;
        this.listOfNode = new RandomTupleGenerator(0, 99, 9).generateRandomTuples();
        this.lastNode = null;
    }

    getRoot() {
        return this.root;
    }

    insertNode(node) {
        if (this.lastNode == null) {
            node.loc = "root";
            node.left = null;
            node.right = null;
            node.height = 1;
            this.root = node;
            return;
        }
        while ((this.lastNode.parent != null) && (node.priority < this.lastNode.priority)) {
            this.lastNode = this.lastNode.parent;
        }
        if ((this.lastNode.parent == null) && ((node.priority < this.lastNode.priority))) {
            node.loc = "root";
            node.parent = null;
            node.left = this.lastNode;
            node.left.parent = node;
            node.left.loc = "left";
            node.height = getHeigth(this.lastNode) + 1;
            this.root = node;
            return;
        } else {
            if (this.lastNode.right != null) {
                this.lastNode.right.parent = node;
                node.left = this.lastNode.right;
            }
            this.lastNode.right = node;
            node.parent = this.lastNode;
            node.loc = "right";
            if (node.left != null) {
                node.left.loc = "left";
            }
            updateHeigth(node);
            this.root = node;
        }
    }

    buildTreap() {
        let isFirst = true;
        let newOurHeap = null;
        this.listOfNode = this.listOfNode.sort(function (a, b) {
            if (a != b) {
                return a[0] - b[0];
            } else {
                return a[1] - b[1];
            }
        });
        for (let i = 0; i < this.listOfNode.length; i++) {
            const [key, priority] = this.listOfNode[i];
            const node = new Node(key, priority);
            this.insertNode(node);
            this.lastNode = node;
        }
    }

    drawTreap() {
        this.root = update(this.root);
        drawAllTreap(this.root, 0);
    }
}

