let dataForBuildTreap = document.querySelector('.buildTreap');
let buttonForBuildTreap = document.querySelector('.buttonForBuildTreap');
let nodeForSplit = document.querySelector('.splitOurTreap');
let newTrepsForMerge = document.querySelector('.MergeOurTreaps');
let buttonForMerge = document.querySelector('.buttonForMerge');
let buttonForMergeOurTreapAfterSplit = document.querySelector('.MergeOurTreapsAftterSplit');
let buttonForDeleteTheFirstTreapAfterSplit = document.querySelector('.deleteFirstTreapAfterSplit');
let buttonForDeleteTheSecondTreapAfterSplit = document.querySelector('.deleteSecondTreapAfterSplit');
let buttonForDeleteAll = document.querySelector('.deleteAll');
let Treap = new BuildTreap();
let split = new TreapForSplit();

svg = d3.select(".ourHeap").append("svg")
    .attr("width", width)
    .attr("height", 450);

buttonForBuildTreap.onclick = function () {
    let ListOfNode = dataForBuildTreap.value;
    count = 0;
    let InformationAboutData = checkCorrectDataForNode(ListOfNode, Treap.getRoot());
    if (InformationAboutData[0]) {
        makeErrorMessageInvisible('build');
        deleteCode();
        codeOfBuildTreap();
        dataForBuildTreap.value = '';
        disable();
        Treap = new BuildTreap();
        count = 0;
        //buildTreap([[0, 86], [2, 4], [1, 5], [2, 7], [2, 8], [3, 6], [3, 7], [3, 4], [5, 45], [1, 98], [23, 9], [4, 8], [5, 5], [6, 2], [4, 4], [7, 0], [98, 45], [98, 0]]);
        //let listOfNodes = [[14, 1], [16, 7], [18, 9], [3, 1], [2, 4], [8, 3], [9, 5], [7, 6], [5, 7], [4, 8]]
        let listOfNodes = getListsOfNodes(ListOfNode);
        //let listOfNodes = [[0, 86], [2, 4], [1, 5], [2, 7], [2, 8], [3, 6], [3, 7], [3, 4], [5, 45], [1, 98], [23, 9], [4, 8], [5, 5], [6, 2], [4, 4], [7, 0], [98, 45], [98, 0]]
        listOfNodes = listOfNodes.sort(function (a, b) {
            if (a !== b) {
                return a[0] - b[0];
            } else {
                return a[1] - b[1];
            }
        });
        Treap.setListOfNode(listOfNodes);
        Treap.buildTreap();
        enable();
    } else {
        let errorMessage = document.querySelector('#build');
        errorMessage.textContent = InformationAboutData[1]
        errorMessage.style.display = 'block';
    }
}

let buttonForSplitTreap = document.querySelector('.buttonForSplitOurTreap');

buttonForSplitTreap.onclick = function () {
    let node = nodeForSplit.value;
    if (Treap.getRoot() != null && node !== '' && !isNaN(Number(node))) {
        deleteCode();
        codeOfSplitTreap();
        makeErrorMessageInvisible('split');
        disable();
        count = 0;
        split = new TreapForSplit();
        split.setRoot(Treap.getRoot());
        split.drawOurTreapForSlip();
        split.setNode(Number(nodeForSplit.value));
        nodeForSplit.value = '';
        split.splitOurTreap();
        if (split.getFirstTreap() != null && split.getSecondTreap() != null) {
            MakeTheButtonsAfterTheSplitVisible();
        } else if (split.getFirstTreap() == null) {
            Treap = new BuildTreap();
            Treap.setRoot(split.getSecondTreap());
            split = new TreapForSplit();
            enable();
        } else if (split.getSecondTreap() == null) {
            Treap = new BuildTreap();
            Treap.setRoot(split.getFirstTreap());
            split = new TreapForSplit();
            enable();
        }

    } else if (node === '') {
        let errorMessage = document.querySelector('#split');
        errorMessage.textContent = 'введите ключ';
        errorMessage.style.display = 'block';
    } else if (Treap.getRoot() === null) {
        let errorMessage = document.querySelector('#split');
        errorMessage.textContent = 'постройте дерево';
        errorMessage.style.display = 'block';
    } else if (isNaN(Number(node))) {
        let errorMessage = document.querySelector('#split');
        errorMessage.textContent = 'неккоректный ввод';
        errorMessage.style.display = 'block';
    }
}

buttonForMerge.onclick = function () {
    let NodeForMergeTreap = newTrepsForMerge.value;
    let Information = checkCorrectDataForMerge(NodeForMergeTreap, Treap.getListOfNodes());
    if (Information[0]) {
        disable();
        deleteCode();
        makeErrorMessageInvisible('merge');
        codeOfMergeTreap();
        let copyTime = time;
        time = 0;
        let newTreap = new BuildTreap();
        newTreap.setListOfNode(Information[1]);
        newTreap.buildTreap();
        let left, right;
        if (Information[2] === 'old') {
            left = newTreap.getRoot();
             right = Treap.getRoot();
        } else {
            right = newTreap.getRoot();
            left = Treap.getRoot();
        }
        left.x = width / 4;
        left.y = 50;
        right.x = 3 * width / 4;
        right.y = 50;
        updateForMerge(left);
        updateForMerge(right);
        drawAnimationTreapInNewNode(left);
        drawAnimationTreapInNewNode(right)
        let mergeTreap = new TreapsForMerge();
        mergeTreap.setFirstTreap(left);
        mergeTreap.setSecondTreap(right);
        count = 0;
        time = copyTime;
        mergeTreap.mergeOurTreaps();
        enable();
    } else {
        let errorMessage = document.querySelector('#merge');
        errorMessage.textContent = Information[1];
        errorMessage.style.display = 'block';
    }
}

buttonForMergeOurTreapAfterSplit.onclick = function () {
    count = 0;
    deleteCode();
    MakeTheButtonsAfterTheSplitInvisible();
    codeOfMergeTreap();
    let merge = new TreapsForMerge();
    merge.setFirstTreap(split.getFirstTreap());
    merge.setSecondTreap(split.getSecondTreap());
    merge.mergeOurTreaps();
    enable();
    MakeTheButtonsAfterTheSplitInvisible();
    Treap = new BuildTreap();
    Treap.setRoot(merge.getRoot());
    split = new TreapForSplit();
}

buttonForDeleteTheFirstTreapAfterSplit.onclick = function () {
    count = 0;
    deleteCode();
    deleteFullOurTreap(split.getFirstTreap());
    let RightTreap = split.getSecondTreap();
    RightTreap.x = width / 2;
    RightTreap.y = 50;
    RightTreap = updateForMerge(RightTreap);
    drawAnimationTreapInNewNode(RightTreap);
    MakeTheButtonsAfterTheSplitInvisible();
    enable();
    Treap = new BuildTreap();
    Treap.setRoot(RightTreap);
    split = new TreapForSplit();
}


buttonForDeleteTheSecondTreapAfterSplit.onclick = function () {
    count = 0;
    deleteCode();
    MakeTheButtonsAfterTheSplitInvisible();
    deleteFullOurTreap(split.getSecondTreap());
    let LeftTreap = split.getFirstTreap();
    LeftTreap.x = width / 2;
    LeftTreap.y = 50;
    LeftTreap = updateForMerge(LeftTreap);
    drawAnimationTreapInNewNode(LeftTreap);
    enable();
    Treap = new BuildTreap();
    Treap.setRoot(LeftTreap);
    split = new TreapForSplit();
}

buttonForDeleteAll.onclick = function () {
    count = 0;
    deleteCode();
    svg.selectAll("*").remove();
    Treap = new BuildTreap();
    MakeTheButtonsAfterTheSplitInvisible();
    enable();
}

let DataOfNewAddedNode = document.querySelector('.insertNewNode');
let buttonForInsert = document.querySelector('.buttonForInsertNewNode');

buttonForInsert.onclick = function () {
    makeErrorMessageInvisible('insert');
    let node = DataOfNewAddedNode.value;
    let Information = checkCorrectDataForInsert(node, Treap.getListOfNodes());
    if (Information[0]) {
        disable();
        deleteCode();
        codeOfInsertTreap();
        count = 0;
        let Insert = new AddedNodeToOurTreap();
        node = Information[1];
        DataOfNewAddedNode.value = '';
        Insert.setNodeForAdd(node);
        Insert.setRoot(Treap.getRoot());
        Insert.insertNewNodeForTreap();
        Treap = new BuildTreap();
        Treap.setRoot(Insert.getRoot());
        enable();
    } else {
        let errorMessage = document.querySelector('#insert');
        errorMessage.textContent = Information[1];
        errorMessage.style.display = 'block';
    }
}

let DataOfRemoveNode = document.querySelector('.removeNode');
let buttonForRemove = document.querySelector('.buttonForRemoveNode');
buttonForRemove.onclick = function () {

    makeErrorMessageInvisible('remove');
    let key = DataOfRemoveNode.value;
    if (Treap.getRoot() != null && !isNaN(Number(key)) && key !== '') {
        disable()
        deleteCode();
        codeOfRemove();
        count = 0;
        let Remove = new RemoveNodeOfTreap();
        Remove.setRoot(Treap.getRoot());
        key = Number(key);
        DataOfRemoveNode.value = '';
        Remove.setNode(key);
        Remove.RemoveTheNode()
        Treap = new BuildTreap();
        Treap.setRoot(Remove.getRoot());
        enable();
    } else if (key === '') {
        let errorMessage = document.querySelector('#remove');
        errorMessage.textContent = 'введите ключ';
        errorMessage.style.display = 'block';
    } else if (isNaN(Number(key))) {
        let errorMessage = document.querySelector('#remove');
        errorMessage.textContent = 'неккоректный ввод';
        errorMessage.style.display = 'block';
    } else if (Treap.getRoot() == null) {
        let errorMessage = document.querySelector('#remove');
        errorMessage.textContent = 'постройте дерево';
        errorMessage.style.display = 'block';
    }
}

let BuildRandomTreap = document.querySelector('.buttonForBuildRandomTreap');
BuildRandomTreap.onclick = function () {
    count = 0;
    svg.selectAll("*").remove();
    deleteCode();
    let copyTime = time;
    time = 0;
    let listOfNodes = new RandomTupleGenerator(0, 99, 9).generateRandomTuples();
    Treap = new BuildTreap();
    Treap.setListOfNode(listOfNodes);
    Treap.buildTreap();
    time = copyTime;
}

const close = document.getElementById("closeCode");

close.addEventListener('click', function () {
    const displayStyle = document.getElementById('code').style.display;
    if (displayStyle === 'none') {
        document.getElementById('code').style.display = 'block'
    } else {
        document.getElementById('code').style.display = 'none'
    }
})


time_ = document.querySelector('.slider');

time_.addEventListener("click", function() {
    time = -time_.value;
    time.value = -time;
    console.log(time_.value)
});





