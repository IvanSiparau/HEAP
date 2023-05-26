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
    .attr("height", 600);

buttonForBuildTreap.onclick = function () {
    count = 0;
    codeOfBuildTreap();
    let ListOfNode = dataForBuildTreap.value;
    makeErrorMessageInvisible('build');
    if (checkValidOfDataForBuildTreap(ListOfNode) && Treap.getRoot() == null) {
        dataForBuildTreap.value = '';
        disable();
        Treap = new BuildTreap();
        count = 0;
        /*        svg = d3.select(".ourHeap").append("svg")
                    .attr("width", width)
                    .attr("height", 500);*/
        //buildTreap([[0, 86], [2, 4], [1, 5], [2, 7], [2, 8], [3, 6], [3, 7], [3, 4], [5, 45], [1, 98], [23, 9], [4, 8], [5, 5], [6, 2], [4, 4], [7, 0], [98, 45], [98, 0]]);
        //let listOfNodes = [[14, 1], [16, 7], [18, 9], [3, 1], [2, 4], [8, 3], [9, 5], [7, 6], [5, 7], [4, 8]]
        let listOfNodes = [[0, 86], [2, 4], [1, 5], [2, 7], [2, 8], [3, 6], [3, 7], [3, 4], [5, 45], [1, 98], [23, 9], [4, 8], [5, 5], [6, 2], [4, 4], [7, 0], [98, 45], [98, 0]]
        listOfNodes = listOfNodes.sort(function (a, b) {
            if (a !== b) {
                return a[0] - b[0];
            } else {
                return a[1] - b[1];
            }
        });
        Treap.setListOfNodes(listOfNodes);
        Treap.buildTreap();
        enable();
    } else if (Treap.getRoot() !== null) {
        let errorMessage = document.querySelector('#build');
        errorMessage.textContent = 'дерево уже построенно';
        errorMessage.style.display = 'block';
    } else if (ListOfNode === '') {
        let errorMessage = document.querySelector('#build');
        errorMessage.textContent = 'введите список вершин';
        errorMessage.style.display = 'block';
    } else if (!checkValidOfDataForBuildTreap(ListOfNode)) {
        let errorMessage = document.querySelector('#build');
        errorMessage.textContent = 'некорректый ввод';
        errorMessage.style.display = 'block';
    }
}

let buttonForSplitTreap = document.querySelector('.buttonForSplitOurTreap');

buttonForSplitTreap.onclick = function () {
    codeOfSplitTreap();
    makeErrorMessageInvisible('split');
    let node = nodeForSplit.value;
    if (Treap.getRoot() != null && node !== '' && !isNaN(Number(node))) {
        disable();
        time = 1000;
        count = 0;
        delateOurTreap(update(Treap.getRoot()));
        split = new TreapForSplit();
        split.setRoot(Treap.getRoot());
        split.drawOurTreapForSlip();
        split.setKeyForSplit(Number(nodeForSplit.value));
        nodeForSplit.value = '';
        split.splitOurTreap();
        if (split.getFirstTreap() != null && split.getSecondTreap() != null) {
            MakeTheButtonsAfterTheSplitVisible();
        } else if (split.getFirstTreap() == null) {
            normalizationCoordinateForTreap(split.getSecondTreap());
            drawNormalizationTreap(split.getSecondTreap());
            Treap = new BuildTreap();
            Treap.setRoot(split.getSecondTreap());
            split = new TreapForSplit();
            enable();
        } else if (split.getSecondTreap() == null) {
            normalizationCoordinateForTreap(split.getFirstTreap());
            drawNormalizationTreap(split.getFirstTreap());
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
    if (split.getFirstTreap() != null && split.getSecondTreap() != null) {
        disable();
        time = 1000;
        count = 0;
        let merge = new TreapsForMerge();
        merge.setFirstTreap(split.getFirstTreap());
        merge.setSecondTreap(split.getSecondTreap());
        merge.drawTreapsForMerge();
        merge.mergeOurTreaps();
        enable();
    }
}

buttonForMergeOurTreapAfterSplit.onclick = function () {
    time = 500;
    count = 0;
    MakeTheButtonsAfterTheSplitInvisible();
    let merge = new TreapsForMerge();
    merge.setFirstTreap(split.getFirstTreap());
    merge.setSecondTreap(split.getSecondTreap());
    merge.drawTreapsForMerge();
    merge.mergeOurTreaps();
    enable();
    MakeTheButtonsAfterTheSplitInvisible();
    normalizationCoordinateForTreap(merge.getRoot());
    drawNormalizationTreap(merge.getRoot());
    Treap = new BuildTreap();
    Treap.setRoot(merge.getRoot());
    split = new TreapForSplit();
}

buttonForDeleteTheFirstTreapAfterSplit.onclick = function () {
    count = 0;
    deleteFullOurTreap(split.getFirstTreap());
    normalizationCoordinateForTreap(split.getSecondTreap());
    drawNormalizationTreap(split.getSecondTreap());
    MakeTheButtonsAfterTheSplitInvisible();
    enable();
    Treap = new BuildTreap();
    Treap.setRoot(split.getSecondTreap());
    //console.log(Treap.getRoot())
    split = new TreapForSplit();
}


buttonForDeleteTheSecondTreapAfterSplit.onclick = function () {
    count = 0;
    MakeTheButtonsAfterTheSplitInvisible();
    deleteFullOurTreap(split.getSecondTreap());
    normalizationCoordinateForTreap(split.getFirstTreap());
    drawNormalizationTreap(split.getFirstTreap());
    enable();
    Treap = new BuildTreap();
    Treap.setRoot(split.getFirstTreap());
    split = new TreapForSplit();
}

buttonForDeleteAll.onclick = function () {
    count = 0;
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
    if (checkCorrectDataForInsert(node)) {
        disable();
        count = 0;
        time = 500;
        let Insert = new AddedNodeToOurTreap();
        node = node.split(' ');
        node[0] = Number(node[0]);
        node[1] = Number(node[1]);
        DataOfNewAddedNode.value = '';
        Insert.setNodeForAdd(node);
        Insert.setRoot(Treap.getRoot());
        Insert.insertNewNodeForTreap();
        Treap = new BuildTreap();
        Treap.setRoot(Insert.getRoot());
        enable();
    } else {
        let errorMessage = document.querySelector('#insert');
        errorMessage.textContent = sendMessageErrorForInsert(node);
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
        count = 0;
        time = 500;
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
    let randomTreap_ = new randomTreap();
    randomTreap_.buildTreap();
    randomTreap_.drawTreap();
    Treap = new BuildTreap();
    Treap.setRoot(update(randomTreap_.getRoot()));
}






