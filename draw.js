svg = d3.select(".ourHeap").append("svg")
  .attr("width", width)
  .attr("height", 500);
  
  
function drawAllHeap(node) {
  if (node != null) {
    if (node.parent != null) {
      const line = d3.line()
        .x(d => d.x)
        .y(d => d.y);
      const data1 = [
        { x: node.x, y: node.y },
        { x: node.parent.x, y: node.parent.y }
            ];
      svg.append("path")
        .datum(data1)
        .attr("d", line)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "none");
    }
    svg.append("circle")
      .attr("cx", node.x)
      .attr("cy", node.y)
      .attr('r', 15)
      .attr('fill', 'red');
    svg.append('text')
      .attr('x', node.x)
      .attr('y', node.y)
      .attr('fill', 'black')
      .text(node.x);
    drawAllHeap(node.left);
    drawAllHeap(node.right);
  }
}

function getNameOfClass (node) {
  if (node != null) {
  return "NodeWithKey" + String(node.key) + "AndPrioriy" + String(node.key);}
}

function drawFirstNode (node) {
  const circle = svg.append("circle")
    .attr("cx", node.x)
    .attr("cy", node.y)
    .attr('class', getNameOfClass(node))
    .attr('r', 0)
    .attr("fill", "white");
  circle.transition()
    .duration(time)
    .attr("r", 15)
    .delay(time * count)
    .style("fill", '#960000');
  count++;
}


function drawNewAddedNode(node) {
  const circle = svg.append("circle")
    .attr("cx", 50)
    .attr("cy", 400)
    .attr('class', getNameOfClass(node))
    .attr('r', 0)
    .attr("fill", "white");
  circle.transition()
    .duration(time)
    .attr("r", 15)
    .delay(time * count)
    .style("fill", '#960000');
  count++;
}

function drawUpdate(node){
  if (node != null) {
    const circle = d3.select("." + getNameOfClass(node));
    circle.transition()
      .duration(time)
      .attr("cx", node.x)
      .attr('cy', node.y)
      .delay(time *count);
    drawUpdate(node.left);
    drawUpdate(node.right);
  }
}
