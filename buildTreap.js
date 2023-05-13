function buildTreap(listOfNodes) {
  svg = d3.select(".ourHeap").append("svg")
    .attr("width", width)
    .attr("height", 500);
  listOfNodes = listOfNodes.sort(function(a, b) {
    return a[0] - b[0];
  });
  console.log(listOfNodes);
  buildCartesianTree(listOfNodes);
}

buildTreap( [[1, 5],  [2,4], [3, 6], [5, 45], [1, 98], [23, 9], [4, 8], [5, 5], [6, 2], [4, 4], [7, 0], [98, 45], [98, 0]]);