const buttonOrInputInDisplay = ['.buttonForBuildTreap', '.deleteAll', '.buildTreap',
    '.buttonForSplitOurTreap', '.MergeOurTreaps', '.buttonForMerge', '.buttonForInsertNewNode',
    '.removeNode', '.splitOurTreap', '.insertNewNode', '.randomTreap', '.buttonForRemoveNode', '.slider'] //8

const eventAfterSplit = ['.deleteFirstTreapAfterSplit', '.deleteSecondTreapAfterSplit', '.MergeOurTreapsAftterSplit',
    '.deleteAll'];

function disable() {
    for (var i = 0; i < buttonOrInputInDisplay.length; ++i) {
        d3.select(buttonOrInputInDisplay[i])
            .transition()
            .attr("disabled", true)
            .delay(0);
    }
}

function enable() {
    for (var i = 0; i < buttonOrInputInDisplay.length; ++i) {
        d3.select(buttonOrInputInDisplay[i])
            .transition()
            .attr("disabled", null)
            .delay(time * count);
    }
}

function MakeTheButtonsAfterTheSplitVisible() {
    count++;
    for (var i = 0; i < eventAfterSplit.length; ++i) {
        d3.selectAll(eventAfterSplit[i])
            .transition()
            .duration(0)
            .style("display", "block")
            .delay(time * count);
    }
}

function MakeTheButtonsAfterTheSplitInvisible() {
    d3.selectAll(".deleteFirstTreapAfterSplit")
        .transition()
        .duration(0)
        .style("display", "none")
        .delay(time * count);
    d3.selectAll(".deleteSecondTreapAfterSplit")
        .transition()
        .duration(0)
        .style("display", "none")
        .delay(time * count);
    d3.selectAll(".MergeOurTreapsAftterSplit")
        .transition()
        .duration(0)
        .style("display", "none")
        .delay(time * count);
}

function makeErrorMessageInvisible(id) {
    let errorMessage = document.querySelector('#' + id);
    errorMessage.text = '';
    errorMessage.style.display = 'none';
}

function checkCorrectDataForInsert(data, listOfNode) {
    if (data == '') {
        return [false, 'введите числа'];
    }
    data = data.split(' ');
    if (data.length != 2) {
        return [false, 'введите два числа'];
    }
    if (isNaN(Number(data[0])) || isNaN(Number(data[0]))) {
        return [false, 'некорректный ввод'];
    }
    data = [Number(data[0]), Number(data[1])];
    if (listOfNode.length === 0) {
        return [true, data];
    }
    for (var i = 0; i < listOfNode.length; ++i) {
        if (data[0] === listOfNode[i][0] && data[1] === listOfNode[i][1]) {
            return [false, 'все вершины должны быть различны'];
        }
    }
    return [true, data]
}

function sendMessageErrorForInsert(node) {
    if (node === '') {
        return 'введите числа'
    }
    node = node.split(' ');
    if (node.length !== 2) {
        return 'введите два числа';
    }
    if (isNaN(node[0]) || isNaN(node[1])) {
        return 'некорректный ввод';
    }
}

function getListsOfNodes(str) {
    const regex = /\((\d+), (\d+)\)/g;
    const matches = str.matchAll(regex);
    const result = [];
    const vertices = new Set();

    for (const match of matches) {
        const int1 = parseInt(match[1]);
        const int2 = parseInt(match[2]);
        const vertex = [int1, int2];
        if (vertices.has(vertex.toString())) {
            console.error('Вершины должны быть различными.');
            return null;
        }

        vertices.add(vertex.toString());
        result.push(vertex);
    }

    return result;
}

function checkCorrectDataForNode(str, root) {
    if (str === '') {
        return [false, 'введите вершины']
    }
    if (root != null) {
        return [false, 'удалите дерево']
    }
    const regex = /^\(\d+, \d+\)( \(\d+, \d+\))*$/;

    if (!regex.test(str)) {
        return [false, 'некоректный ввод'];
    }

    const pairs = str.match(/\d+, \d+/g);
    const uniquePairs = new Set(pairs);
    if (pairs.length !== uniquePairs.size) {
        return [false, 'все вершины должны быть уникальные'];
    }
    return [true];
}

function checkCorrectDataForMerge(listOfNewNode, listOfOldNode) {
    if (listOfNewNode === '') {
        return [false, 'введите вершины']
    } if (listOfOldNode.length === 0){
        return [false, 'постройте сначало дерево']
    }
    const regex = /^\(\d+, \d+\)( \(\d+, \d+\))*$/;
    if (!regex.test(listOfNewNode)) {
        return [false, 'некорекный ввоод'];
    }
    const pairs = listOfNewNode.match(/\d+, \d+/g);
    const uniquePairs = new Set(pairs);
    if (pairs.length !== uniquePairs.size) {
        return [false, 'все вершины должны быть уникальные'];
    }
    listOfNewNode = getListsOfNodes(listOfNewNode);
    listOfNewNode =listOfNewNode.sort(function (a, b) {
        return a[1] - b[1];
    });
    listOfOldNode = listOfOldNode.sort(function (a, b) {
        if (a !== b) {
            return a[0] - b[0];
        } else {
            return a[1] - b[1];
        }
    });
    if (listOfNewNode[0][0] > listOfOldNode[listOfOldNode.length -1 ][0]) {
        return [true, listOfNewNode, 'new'];
    }
    if (listOfNewNode[listOfNewNode.length - 1][0] < listOfOldNode[0][0]) {
        listOfNewNode = listOfNewNode.sort(function (a, b) {
            if (a !== b) {
                return a[0] - b[0];
            } else {
                return a[1] - b[1];
            }
        });
        return [true, listOfNewNode, 'old'];
    }
    return [false, 'ключи одного дерево больше, чем приоритеты второго'];
}
