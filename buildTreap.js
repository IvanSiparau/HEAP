const str = '(1, 2) (3, 4) (5, 6)';
const regex = /^(\(\s*\d+\s*,\s*\d+\s*\)\s+)*(\(\s*\d+\s*,\s*\d+\s*\)\s*)?$/;

function buildTreap(listOfNodes) {
    svg = d3.select(".ourHeap").append("svg")
        .attr("width", width)
        .attr("height", 500);
    listOfNodes = listOfNodes.sort(function (a, b) {
        if (a != b) {
            return a[0] - b[0];
        } else {
            return a[1] - b[1];
        }
    });
    /*  console.log(listOfNodes);
      buildCartesianTree(listOfNodes);*/
    let Treap = new BuildTreap();
    Treap.setListOfNodes(listOfNodes);
    Treap.buildTreap();
}

function checkValidOfDataForBuildTreap(data) {
    if (data == '') {
        return true;
    }
    if (regex.test(data)) {
        return true;
    }
    return false;
}