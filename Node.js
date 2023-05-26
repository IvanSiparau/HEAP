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
            node.height = 1;
            this.root = node;
            return;
        }
        sendMessageAboutAddedNode(node);
        changeColorOfSelector('code4', 'code5');
        changeColorOfSelector('code5', 'code6');
        while ((this.lastNode.parent != null) && (node.priority < this.lastNode.priority)) {
            drawPass(this.lastNode);
            drawComparison(this.lastNode, node);
            this.lastNode = this.lastNode.parent;
        }
        this.lastSetion = 'code6'
        if ((this.lastNode.parent == null) && ((node.priority < this.lastNode.priority))) {
            this.lastSetion = 'code7';
            drawPass(this.lastNode);
            drawComparison(this.lastNode, node);
            changeColorOfSelector('code6', 'code7');
            //sendMessageAboutNewAddedNodeBeginRoot();
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
            drawComparison(this.lastNode, node);
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
        /*let root = null;*/
        /*let lastNode = null;*/
        changeColorOfSelector(0, 'code1');
        changeColorOfSelector('code1', 'code2');
        let isFirst = true;
        let newOurHeap = null;

        /*sendMessageAboutSortNode();*/
        changeColorOfSelector('code2', 'code3');
        this.lastSetion = 'code3';
        for (let i = 0; i < this.listOfNodes.length; i++) {
            changeColorOfSelector(this.lastSetion, 'code4');
            const [key, priority] = this.listOfNodes[i];
            const node = new Node(key, priority);
            this.insertNode(node);
            newOurHeap = update(this.root, node);
            if (isFirst) {
                //sendMessageAboutFirstNode();
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
            drawPassByLastAddedNode(node);
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
        drawTreapForSplit(this.root);
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
        updateCoordinateForNewCoordinateOfOurSplitTreap(this.firstTreap, (width / 4) - this.firstTreap.x, 50 - this.firstTreap.y)
    }

    updateNewLocationForRightSplit() {
        updateCoordinateForNewCoordinateOfOurSplitTreap(this.secondTreap, 3 * (width / 4) - this.secondTreap.x, 50 - this.secondTreap.y)
    }

    Split(root, key) {
        changeColorOfSelector(this.lastSection, 'code1');
        this.lastSection = 'code1';
        if (root == null) {
            drawPassForSplit(root);
            changeColorOfSelector(this.lastSection, 'code2')
            changeColorOfSelector('code2', 'code3')
            this.lastSection  = 'code3';
            return [null, null];
        } else if (root.key < key) {
            drawPassForSplit(root);
            drawComparisonParameterOfRootWithValue(root, root.key, key);
            changeColorOfSelector(this.lastSection, 'code4');
            changeColorOfSelector('code4', 'code5');
            this.lastSection = 'code5'
            //drawComparisonParameterOfRootWithValue(root, root.key, key);
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
            drawComparisonParameterOfRootWithValue(root, root.key, key);
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
                drawOurSplitTreap(this.firstTreap);
                UpdateCoordinateYForSplit(this.firstTreap);
                updateHeightForSplitTreap(this.firstTreap);
                UpdateCoordinateXForSplit(this.firstTreap);
            }
        }
        if (right != null) {
            this.secondTreap = right;
            this.secondTreap.loc = 'root';
            this.secondTreap.parent = null;
            if (left != null) {
                this.updateNewLocationForRightSplit();
                drawOurSplitTreap(this.secondTreap);
                UpdateCoordinateYForSplit(this.secondTreap);
                updateHeightForSplitTreap(this.secondTreap);
                UpdateCoordinateXForSplit(this.secondTreap);
            }
        }
        count += 2;
        drawOurSplitTreap(this.firstTreap);
        drawOurSplitTreap(this.secondTreap);
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
            drawOneTreapForMerge(this.firstTreap);
            drawOneTreapForMerge(this.secondTreap);
            count++;
        }
    }

    mergeOurTreaps() {
        this.drawTreapsForMerge();
        this.root = merge(this.firstTreap, this.secondTreap);
        this.secondTreap = null;
        this.firstTreap = null;
        console.log(this.root);
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
        drawOurMergesTreap(newRoots);
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
        drawOurMergesTreap(newRoots);
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

function normalizationCoordinateForTreap(root) {
    updateCoordinateX(root);
    updateCoordinateY(root);
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
                updateCoordinateForNewCoordinateOfOurSplitTreap(SplitTreap.getFirstTreap(),
                    (width / 4) - SplitTreap.getFirstTreap().x,
                    50 - SplitTreap.getFirstTreap().y)
                drawOurSplitTreap(SplitTreap.getFirstTreap());
                count++;
                let newAddedNode = new Node(this.addedNode[0], this.addedNode[1]);
                newAddedNode.x = width / 2;
                newAddedNode.y = 50;
                newAddedNode.loc = 'root';
                drawFirstNode(newAddedNode);
                let MergeTreap = new TreapsForMerge();
                MergeTreap.setFirstTreap(SplitTreap.getFirstTreap());
                MergeTreap.setSecondTreap(newAddedNode);
                MergeTreap.drawTreapsForMerge();
                count++;
                MergeTreap.mergeOurTreaps();
                normalizationCoordinateForTreap(MergeTreap.getRoot());
                drawNormalizationTreap(MergeTreap.getRoot());
                count++;
                drawTextAboutKeyAndPriority(MergeTreap.getRoot());
                count++;
                this.root = MergeTreap.getRoot();
                return;
            } else if (SplitTreap.getFirstTreap() == null) {
                updateCoordinateForNewCoordinateOfOurSplitTreap(SplitTreap.getSecondTreap(),
                    (3 * width) / 4 - SplitTreap.getSecondTreap().x,
                    50 - SplitTreap.getSecondTreap().y);
                drawOurSplitTreap(SplitTreap.getSecondTreap());
                let newAddedNode = new Node(this.addedNode[0], this.addedNode[1]);
                newAddedNode.x = width / 2;
                newAddedNode.y = 50;
                newAddedNode.loc = 'root';
                drawFirstNode(newAddedNode);
                let MergeTreap = new TreapsForMerge();
                MergeTreap.setSecondTreap(SplitTreap.getSecondTreap());
                MergeTreap.setFirstTreap(newAddedNode);
                MergeTreap.drawTreapsForMerge();
                count++;
                MergeTreap.mergeOurTreaps();
                normalizationCoordinateForTreap(MergeTreap.getRoot());
                drawNormalizationTreap(MergeTreap.getRoot());
                count++;
                drawTextAboutKeyAndPriority(MergeTreap.getRoot());
                count++;
                this.root = MergeTreap.getRoot();
                return;
            }
            let newAddedNode = new Node(this.addedNode[0], this.addedNode[1]);
            newAddedNode.x = width / 2;
            newAddedNode.y = 50;
            newAddedNode.loc = 'root';
            drawFirstNode(newAddedNode);
            let MergeTreap = new TreapsForMerge();
            MergeTreap.setFirstTreap(SplitTreap.getFirstTreap());
            MergeTreap.setSecondTreap(newAddedNode);
            MergeTreap.drawTreapsForMerge();
            count++;
            MergeTreap.mergeOurTreaps();
            drawTextAboutKeyAndPriority(MergeTreap.getRoot());
            count++;
            let NewMerge = new TreapsForMerge();
            if (MergeTreap.getRoot().x === width / 2) {  //обработать случай, когда  вершина имеет координаты .x == width / 2//
                MergeTreap.getRoot().x = width / 4;
                MergeTreap.setRoot(updateForMerge(MergeTreap.getRoot()));
                drawNormalizationTreap(MergeTreap.getRoot());
                count++;
            }
            NewMerge.setFirstTreap(MergeTreap.getRoot());
            console.log(MergeTreap.getRoot())
            NewMerge.setSecondTreap(SplitTreap.getSecondTreap());
            NewMerge.drawTreapsForMerge();
            NewMerge.mergeOurTreaps();
            normalizationCoordinateForTreap(NewMerge.getRoot());
            drawNormalizationTreap(NewMerge.getRoot());
            this.root = NewMerge.getRoot()
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

    //Нужно проработать случай когда самый левый элемент//

    RemoveTheNode() {
        let SplitTreap = new TreapForSplit();
        SplitTreap.setRoot(this.root);
        SplitTreap.drawOurTreapForSlip();
        SplitTreap.setKeyForSplit(this.RemoveKey);
        SplitTreap.splitOurTreap();
        console.log(SplitTreap.getFirstTreap());
        if (SplitTreap.getFirstTreap() == null) {
            drawTreapForSplit(SplitTreap.getSecondTreap())
            count++;
            let [left, right] = Split(SplitTreap.getSecondTreap(), this.RemoveKey + 1);
            deleteFullOurTreap(left);
            if (right != null) {
                right.loc = 'root';
                right.parent = null;
                right = updateForMerge(right);
                drawOurMergesTreap(right);
                count++;
                normalizationCoordinateForTreap(right);
                drawNormalizationTreap(right);
                count++;
                this.root = right;
            }
            return;
        } else if (SplitTreap.getSecondTreap() == null) {
            this.root = SplitTreap.getFirstTreap();
            console.log('!!!DONE!!!')
            return;
        }
        let SplitTheLagestNode = new TreapForSplit();
        SplitTheLagestNode.setKeyForSplit(this.RemoveKey + 1);
        SplitTheLagestNode.setRoot(SplitTreap.getSecondTreap());
        updateCoordinateForNewCoordinateOfOurSplitTreap(SplitTreap.getFirstTreap(),
            (width / 4) - SplitTreap.getFirstTreap().x,
            50 - SplitTreap.getFirstTreap().y);
        updateCoordinateForNewCoordinateOfOurSplitTreap(SplitTreap.getSecondTreap(),
            3 * (width / 4) - SplitTreap.getSecondTreap().x,
            50 - SplitTreap.getSecondTreap().y);
        drawOurSplitTreap(SplitTreap.getSecondTreap());
        let [left, right] = Split(SplitTreap.getSecondTreap(), this.RemoveKey + 1);
        deleteFullOurTreap(left);
        if (right != null) {
            right.parent = null;
            right.loc = 'root';
            right.x = (3 * width) / 4;
            right.y = 50;
            count++;
            right = updateForMerge(right);
            drawOurSplitTreap(right);
            count++;
        }
        let NewTreap = new TreapsForMerge();
        NewTreap.setFirstTreap(SplitTreap.getFirstTreap());
        NewTreap.setSecondTreap(right);
        NewTreap.mergeOurTreaps();
        normalizationCoordinateForTreap(NewTreap.getRoot());
        drawNormalizationTreap(NewTreap.getRoot());
        count++;
        this.root = NewTreap.getRoot();
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
        drawRandomTreap(this.root);
    }
}

