function drawAllHeap(node) {
    if (node != null) {
        if (node.parent != null) {
            const line = d3.line()
                .x(d => d.x)
                .y(d => d.y);
            const data1 = [
                {x: node.x, y: node.y},
                {x: node.parent.x, y: node.parent.y}
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
            .attr('r', radius)
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

function getNameOfClassText(node) {
    return 'textOf' + getNameOfClassNode(node);
}

function getNameOfClassNode(node) {
    if (node != null) {
        return "NodeWithKey" + String(node.key) + "AndPrioriy" + String(node.priority);
    }
}

function getNameOfClassBetweenTwoNode(firstNode, secondNode) {
    return 'LineBetween' + getNameOfClassNode(firstNode) + getNameOfClassNode(secondNode);
}

function drawFirstNode(node) {
    const circle = svg.append("circle")
        .attr("cx", node.x)
        .attr("cy", node.y)
        .attr('class', getNameOfClassNode(node))
        .attr('r', 0)
        .attr("fill", "white");
    circle.transition()
        .duration(time)
        .attr("r", radius)
        .delay(time * count)
        .style("fill", '#960000');
    var textOfFirstNode = svg.append('text')
        .attr('x', node.x - radius + 1)
        .attr('y', node.y + 2)
        .attr('fill', 'white')
        .attr('class', getNameOfClassText(node))
        .text(String(node.key) + "," + String(node.priority))
        .style('opacity', 0);
    textOfFirstNode.transition()
        .duration(time)
        .style('opacity', 1)
        .delay(time * count);
    count++;
}


function drawNewAddedNode(node, lastNode) {
    const circle = svg.append("circle")
        .attr("cx", 50)
        .attr("cy", 400)
        .attr('class', getNameOfClassNode(node))
        .attr('r', 0)
        .attr("fill", "white");
    circle.transition()
        .duration(time)
        .attr("r", radius)
        .delay(time * count)
        .style("fill", '#960000');
    count++;
}

function drawUpdate(root, node) {
    if (root != null) {
        const circle = d3.select("." + getNameOfClassNode(root));
        circle.transition()
            .duration(time)
            .attr("cx", root.x)
            .attr('cy', root.y)
            .delay(time * count);
        var textOfNode = svg.select("." + getNameOfClassText(root));
        textOfNode.transition()
            .duration(time)
            .attr('x', root.x - radius + 1)
            .attr('y', root.y + 2)
            .delay(time * count);
        if (root.left != null) {
            d3.select("." + getNameOfClassBetweenTwoNode(root, root.left))
                .transition()
                .duration(time)
                .attr('x1', root.x)
                .attr('y1', root.y)
                .attr('x2', root.left.x)
                .attr('y2', root.left.y)
                .delay(time * count);
        }
        if (root.right != null) {
            d3.select("." + getNameOfClassBetweenTwoNode(root, root.right))
                .transition()
                .duration(time)
                .attr('x1', root.x)
                .attr('y1', root.y)
                .attr('x2', root.right.x)
                .attr('y2', root.right.y)
                .delay(time * count);
        }
        if ((root.key == node.key && root.priority == node.priority)) {
            const circle = svg.append("circle")
                .attr("cx", root.x)
                .attr("cy", root.y)
                .attr('class', getNameOfClassNode(node))
                .attr('r', 0)
                .attr("fill", "none");
            circle.transition()
                .duration(time)
                .attr("r", radius)
                .delay(time * count)
                .style("fill", "#960000");
            var textOfNewAddedtNode = svg.append('text')
                .attr('x', node.x - radius + 1)
                .attr('y', node.y + 2)
                .attr('fill', 'white')
                .attr('class', getNameOfClassText(node))
                .text(String(node.key) + "," + String(node.priority))
                .style('opacity', 0);
            textOfNewAddedtNode.transition()
                .duration(time)
                .style('opacity', 1)
                .delay(time * count);
            if (root.loc === "root") {
                if (root.left != null) {
                    var ourPass = svg.select(".passOfNode");
                    ourPass.transition()
                        .duration(time)
                        .attr("cx", root.left.x)
                        .attr("cy", root.left.y)
                        .delay(time * count);
                }
            } else {
                var ourPass = svg.select(".passOfNode");
                ourPass.transition()
                    .duration(time)
                    .attr("cx", root.parent.x)
                    .attr("cy", root.parent.y)
                    .delay(time * count);
            }
            if (root.parent != null && root.left != null) {
                d3.select("." + getNameOfClassBetweenTwoNode(root.parent, root.left))
                    .transition()
                    .duration(time)
                    .attr('x1', root.parent.x)
                    .attr('y1', root.parent.y)
                    .attr('x2', root.left.x)
                    .attr('y2', root.left.y)
                    .remove()
                    .delay(time * count);
            }
        }
        drawUpdate(root.left, node);
        drawUpdate(root.right, node);
    }
}

function drawNewLineBetweenOurHeapAndNewNode(node, lastNode, modes) {
    if (modes == newAddedNodeBeginRootOfHeap) {
        var x1 = node.x, y1 = node.y;
        var x2 = node.left.x, y2 = node.left.y;
        var line = svg.append("line")
            .attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x1)
            .attr("y2", y1)
            .attr('class', getNameOfClassBetweenTwoNode(node, node.left))
            .attr("stroke", "#960000")
            .attr("stroke-opacity", 0.5)
            .attr("stroke-width", 2);
        line.transition()
            .duration(time)
            .delay(time * count)
            .attr("x2", x2)
            .attr("y2", y2);
    } else if (modes === newAddedNodeBeginTheRigthSonOfNode) {
        var x2 = node.x, y2 = node.y;
        var x1 = node.parent.x, y1 = node.parent.y;
        var lineBetweenParentOfAddedNodeAndNode = svg.append("line")
            .attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x1)
            .attr("y2", y1)
            .attr('class', getNameOfClassBetweenTwoNode(node.parent, node))
            .attr("stroke", "#960000")
            .attr("stroke-opacity", 0.5)
            .attr("stroke-width", 2);
        lineBetweenParentOfAddedNodeAndNode.transition()
            .duration(time)
            .delay(time * count)
            .attr("x2", x2)
            .attr("y2", y2);
        if (node.left != null) {
            x1 = node.x, y1 = node.y, x2 = node.left.x, y2 = node.left.y;
            var lineBetweenAddedNodeAndLeftSon = svg.append('line')
                .attr("x1", x1)
                .attr("y1", y1)
                .attr("x2", x1)
                .attr("y2", y1)
                .attr('class', getNameOfClassBetweenTwoNode(node, node.left))
                .attr("stroke", "#960000")
                .attr("stroke-opacity", 0.5)
                .attr("stroke-width", 2);
            lineBetweenAddedNodeAndLeftSon.transition()
                .duration(time)
                .delay(time * count)
                .attr("x2", x2)
                .attr("y2", y2)
            const removeLine = d3.select("." + getNameOfClassBetweenTwoNode(node.parent, node.left));
            removeLine.transition()
                .duration(time)
                .attr("x2", node.parent.x)
                .attr("y2", node.parent.y)
                .remove()
                .delay(count * time);
        }
    }
    count++;
}

function getCircle(node) {
    var circle = svg.select('.' + getNameOfClassNode(node));
    var x = circle.attr('cx');
    var y = circle.attr('cy');
    return [x, y];
}

function drawFirstAddedNode(node) {
    var newCircle = svg.append('circle')
        .attr('cx', getCircle(node)[0])
        .attr('cy', getCircle(node)[1])
        .attr('r', radius + 1)
        .attr('fill', 'none')
        .attr('stroke', "blue")
        .attr('class', "passOfNode")
        .attr('stroke-width', 0);
    newCircle.transition()
        .duration(time)
        .attr('stroke-width', 4)
        .delay(time * count);
    count++;
}

function drawPassByLastAddedNode(node) {
    var theLastPass = svg.select(".passOfNode");
    theLastPass.transition()
        .duration(time)
        .attr("cx", getCircle(node)[0])
        .attr("cy", getCircle(node)[1])
        .delay(time * count);
    count++;
}

function drawPass(node) {
    var theLastPass = svg.select('.passOfNode');
    theLastPass.transition()
        .duration(time)
        .attr("cx", getCircle(node)[0])
        .attr("cy", getCircle(node)[1])
        .delay(time * count);
    count++;
}

function drawComparison(node, newNode) {
    var comparison = svg.append('text')
        .attr('x', node.x + radius + 5)
        .attr('y', node.y)
        .text(String(newNode.priority) + " ∨ " + String(node.priority))
        .style('opacity', 0);
    comparison.transition()
        .duration(0)
        .style("opacity", 1)
        .delay(time * count);
    count++;
    comparison.transition()
        .duration(0)
        .style('opacity', 0)
        .remove()
        .delay(count * time);
    if (node.priority >= newNode.priority) {
        var text = svg.append('text')
            .attr('x', node.x + radius + 5)
            .attr('y', node.y)
            .text(String(newNode.priority) + " ⩽ " + String(node.priority))
            .style('opacity', 0);
        text.transition()
            .duration(0)
            .style("opacity", 1)
            .delay(time * count);
        count++;
        text.transition()
            .duration(time)
            .style('opacity', 0)
            .remove()
            .delay(count * time);
        count++;
    } else {
        var otherText = svg.append('text')
            .attr('x', node.x + radius + 5)
            .attr('y', node.y)
            .text(String(newNode.priority) + " > " + String(node.priority))
            .style('opacity', 0);
        otherText.transition()
            .duration(0)
            .style("opacity", 1)
            .delay(time * count);
        count++;
        otherText.transition()
            .duration(time)
            .style('opacity', 0)
            .remove()
            .delay(count * time);
        count++;
    }
}

function sendMessageAboutSortNode() {
    var text = svg.append('text')
        .attr('x', 10)
        .attr('y', 20)
        .attr('class', 'messageText')
        .style('opacity', 0)
        .text("Сначало отсортируем все вершины по ключам");
    text.transition()
        .duration(0)
        .style("opacity", 1)
        .delay(time * count);
    count++;
}

function sendMessageAboutFirstNode() {
    var text = svg.select('.messageText');
    text.transition()
        .duration(0)
        .text("Самая первая вершина становиться корнем дерево \rпри этом запоминаем ее как последнию добавленую")
        .delay(time * count);
    count++;
}

function sendMessageAboutAddedNode(node) {
    var text = svg.select('.messageText');
    text.transition()
        .duration(0)
        .text("Хотим добавить вершину (" + String(node.key) + "," +
            String(node.priority) + ") двигаемся вверх по родителям, пока не найдем вершину с приоритетом меньше или не дойдем до корня")
        .delay(time * count);
    count++;
}

function sendMessageAboutNewAddedNodeBeginRoot() {
    var text = svg.select('.messageText');
    text.transition()
        .duration(0)
        .text("Дошли до корня, тогда наша вершина становиться корнем при этом запоминаем ее как последнюю добавленую")
        .delay(time * count);
    count++;
}

function sendMessageAboutFoundNodeWithPriorityLessThenCurrent() {
    var text = svg.select('.messageText');
    text.transition()
        .duration(0)
        .text("Нашли первую вершину с приоритетом меньше, тогда наша вершина становиться правым сыном этой вершины, а правый сын - левым сыном новой вершины при этом запоминаем ее как последнюю добавленую")
        .delay(time * count);
    count++;
}