const buttonOrInputInDisplay = ['.buttonForBuildTreap', '.deleteAll', '.buildTreap',
    '.buttonForSplitOurTreap', '.MergeOurTreaps', '.buttonForMerge', '.buttonForInsertNewNode',
    '.removeNode', '.splitOurTreap', '.insertNewNode', '.randomTreap', '.buttonForRemoveNode'] //8

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

function checkCorrectDataForInsert(data) {
    if (data === '') {
        return false;
    }
    if ((data.split(' ')).length !== 2) {
        return false;
    }
    if (isNaN(Number(data.split(' ')[0])) || isNaN(Number(data.split(' ')[1]))) {
        return false;
    }
    return true;
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