function drawAnimationNewRootOnnewCoordinate(root, time_) {
    const circle = svg.selectAll('.' + getNameOfClassNode(root));
    circle.transition()
        .duration(time_)
        .attr('cx', root.x)
        .attr('cy', root.y)
        .delay(time * count);
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
        .attr("fill", colorOfText);
    circle.transition()
        .duration(time)
        .attr("r", radius)
        .delay(time * count)
        .style("fill", colorOfNode);
    var textOfFirstNode = svg.append('text')
        .attr('x', node.x - radius + 1)
        .attr('y', node.y + 2)
        .attr('fill', colorOfText)
        .attr('class', getNameOfClassText(node))
        .text(getNameOfNode(node))
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
        .attr("fill", colorOfText);
    circle.transition()
        .duration(time)
        .attr("r", radius)
        .delay(time * count)
        .style("fill", colorOfNode);
    count++;
}

function drawUpdate(root, node) {
    if (root != null) {
        drawAnimationNewRootOnnewCoordinate(root, time);
        var textOfNode = svg.selectAll("." + getNameOfClassText(root));
        textOfNode.transition()
            .duration(time)
            .attr('x', root.x - radius + 1)
            .attr('y', root.y + 2)
            .delay(time * count);
        if (root.left != null) {
            d3.selectAll("." + getNameOfClassBetweenTwoNode(root, root.left))
                .transition()
                .duration(time)
                .attr('x1', root.x)
                .attr('y1', root.y)
                .attr('x2', root.left.x)
                .attr('y2', root.left.y)
                .delay(time * count);
        }
        if (root.right != null) {
            d3.selectAll("." + getNameOfClassBetweenTwoNode(root, root.right))
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
                .style("fill", colorOfNode);
            var textOfNewAddedtNode = svg.append('text')
                .attr('x', node.x - radius + 1)
                .attr('y', node.y + 2)
                .attr('fill', colorOfText)
                .attr('class', getNameOfClassText(node))
                .text(String(node.key) + "," + String(node.priority))
                .style('opacity', 0);
            textOfNewAddedtNode.transition()
                .duration(time)
                .style('opacity', 1)
                .delay(time * count);
            if (root.loc === "root") {
                if (root.left != null) {
                    var ourPass = svg.selectAll(".passOfNode");
                    ourPass.transition()
                        .duration(time)
                        .attr("cx", root.left.x)
                        .attr("cy", root.left.y)
                        .delay(time * count);
                }
            } else {
                var ourPass = svg.selectAll(".passOfNode");
                ourPass.transition()
                    .duration(time)
                    .attr("cx", root.parent.x)
                    .attr("cy", root.parent.y)
                    .delay(time * count);
            }
            if (root.parent != null && root.left != null) {
                d3.selectAll("." + getNameOfClassBetweenTwoNode(root.parent, root.left))
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

function drawNewLineBetweenOurHeapAndNewNode(node, lastNode, modes, lastSection) {
    if (modes === newAddedNodeBeginRootOfHeap) {
        var x1 = node.x, y1 = node.y;
        var x2 = node.left.x, y2 = node.left.y;
        var line = svg.append("line")
            .attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x1)
            .attr("y2", y1)
            .attr('class', getNameOfClassBetweenTwoNode(node, node.left))
            .attr("stroke", colorOfNode)
            .attr("stroke-opacity", 0.5)
            .attr("stroke-width", 4);
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
            .attr("stroke", colorOfNode)
            .attr("stroke-opacity", 0.5)
            .attr("stroke-width", 4);
        changeColorOfSelector(lastSection, 'code12');
        lineBetweenParentOfAddedNodeAndNode.transition()
            .duration(time)
            .delay(time * count)
            .attr("x2", x2)
            .attr("y2", y2);
        changeColorOfSelector('code12', 'code13');
        if (node.left != null) {
            x1 = node.x, y1 = node.y, x2 = node.left.x, y2 = node.left.y;
            var lineBetweenAddedNodeAndLeftSon = svg.append('line')
                .attr("x1", x1)
                .attr("y1", y1)
                .attr("x2", x1)
                .attr("y2", y1)
                .attr('class', getNameOfClassBetweenTwoNode(node, node.left))
                .attr("stroke", colorOfNode)
                .attr("stroke-opacity", 0.5)
                .attr("stroke-width", 4);
            changeColorOfSelector('code13', 'code14');
            lineBetweenAddedNodeAndLeftSon.transition()
                .duration(time)
                .delay(time * count)
                .attr("x2", x2)
                .attr("y2", y2)
            count++;
            const removeLine = d3.selectAll("." + getNameOfClassBetweenTwoNode(node.parent, node.left));
            changeColorOfSelector('code14', 'code15');
            removeLine.transition()
                .duration(time)
                .attr("x2", node.parent.x)
                .attr("y2", node.parent.y)
                .remove()
                .delay(count * time);
            count++;
            return 'code15'
        }
        count++;
        changeColorOfSelector('code13', 'code14');
        return 'code14';
    }
    count++;
}

function getCircle(node) {
    var circle = svg.selectAll('.' + getNameOfClassNode(node));
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
        .attr('stroke', colorOfPass)
        .attr('class', "passOfNode")
        .attr('stroke-width', 0);
    newCircle.transition()
        .duration(time)
        .attr('stroke-width', 4)
        .delay(time * count);
    count++;
}

function drawPassByLastAddedNode(node) {
    var theLastPass = svg.selectAll(".passOfNode");
    theLastPass.transition()
        .duration(time)
        .attr("cx", getCircle(node)[0])
        .attr("cy", getCircle(node)[1])
        .delay(time * count);
    count++;
}

function drawPass(node) {
    var theLastPass = svg.selectAll('.passOfNode');
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

function sendMessageAboutAddedNode(node) {
    var text = svg.selectAll('.messageText');
    text.transition()
        .duration(0)
        .text("Хотим добавить вершину (" + String(node.key) + "," +
            String(node.priority) + ") двигаемся вверх по родителям, пока не найдем вершину с приоритетом меньше или не дойдем до корня")
        .delay(time * count);
    count++;
}

function getNameOfNode(node) {
    let i = 6 - (String(node.key).length + String(node.priority).length);
    console.log(i);
    let space = '';
    for (let j = 0; j < i; ++j) {
        space += '-';
    }
    return String(node.key) + ', ' + String(node.priority);
}

function drawTreapForSplit(root) {
    if (root != null) {
        const circle = svg.append('circle')
            .attr('cx', root.x)
            .attr('cy', root.y)
            .attr('r', 0)
            .attr('class', getNameOfClassNode(root))
            .attr('fill', colorOfNode);
        circle.transition()
            .duration(0)
            .attr('r', radius)
            .delay(count * time);
        const textOfNode = svg.append('text')
            .attr("x", root.x)
            .attr('y', root.y)
            .text(root.key)
            .attr('class', getNameOfClassText(root))
            .attr('fill', 'none')
        textOfNode.transition()
            .duration(0)
            .attr('fill', colorOfText)
            .delay(time * count);
        if (root.parent != null) {
            const line = svg.append('line')
                .attr('x1', root.parent.x)
                .attr('y1', root.parent.y)
                .attr('x2', root.x)
                .attr('y2', root.y)
                .attr("stroke", colorOfNode)
                .attr("class", getNameOfClassBetweenTwoNode(root.parent, root))
                .attr("stroke-opacity", 0.5)
                .attr("stroke-width", 0);
            line.transition()
                .duration(0)
                .attr("stroke-width", 4)
                .delay(time * count);
        }
        drawTreapForSplit(root.left);
        drawTreapForSplit(root.right);
    }
}

function delateOurTreap(root) {
    if (root != null) {
        const circle = svg.selectAll('.' + getNameOfClassNode(root));
        circle.transition()
            .duration(0)
            .attr('fill', 'none')
            .remove()
            .delay(count * time);
        const text = svg.selectAll('.' + getNameOfClassText(root));
        text.transition()
            .duration(0)
            .attr("fill", "none")
            .remove()
            .delay(time * count);
        if (root.parent != null) {
            const line = svg.selectAll('.' + getNameOfClassBetweenTwoNode(root.parent, root));
            line.transition()
                .duration(0)
                .style("stroke", "none")
                .remove()
                .delay(time * count);
        }
        delateOurTreap(root.left);
        delateOurTreap(root.right);
    }
}

/**/
function delatePassAndMessage() {
    const message = svg.selectAll('.messageText');
    message.transition()
        .duration(time)
        .attr("fill", "none")
        .remove()
        .delay(time * count);
    const pass = svg.selectAll(".passOfNode");
    pass.transition()
        .duration(time)
        .attr("stroke-width", 0)
        .remove()
        .delay(time * count);
}

function drawPassForSplit(root) {
    if (root != null && root.loc === 'root') {
        const pass = svg.append('circle')
            .attr('cx', root.x)
            .attr('cy', root.y)
            .attr('r', radius + 1)
            .attr('fill', 'none')
            .attr('stroke', colorOfPass)
            .attr('class', "passForSplit")
            .attr('stroke-width', 0);
        pass.transition()
            .duration(time)
            .attr('stroke-width', 4)
            .delay(time * count);
        count++;
    } else if (root) {
        const pass = svg.selectAll('.passForSplit');
        pass.transition()
            .duration(time)
            .attr('cx', root.x)
            .attr('cy', root.y)
            .delay(time * count);
        count++;
    } else {
        const pass = svg.selectAll('.passForSplit');
        pass.transition()
            .duration(time)
            .attr("stroke-width", 0)
            .remove()
            .delay(time * count);
        count++;
    }
}

function changeLineBetweenTwoNode(currentNode, oldConnection, newConnection) {
    const circle = svg.selectAll('.' + getNameOfClassNode(currentNode));
    circle.transition()
        .duration(time)
        .attr('r', radius + 5)
        .delay(time * count);
    count++;
    if (oldConnection != null && !IsNodeEque(oldConnection, newConnection)) {
        d3.selectAll("." + getNameOfClassBetweenTwoNode(currentNode, oldConnection))
            .transition()
            .duration(time)
            .attr("x2", currentNode.x)
            .attr("y2", currentNode.y)
            .style('opacity', 0)
            .remove()
            .style('opacity', 0)
            .delay(time * count);
    }
    if (!IsNodeEque(oldConnection, newConnection) && newConnection != null) {
        const newLine = svg.append('line')
            .attr("x1", currentNode.x)
            .attr("y1", currentNode.y)
            .attr("x2", currentNode.x)
            .attr("y2", currentNode.y)
            .attr("stroke-opacity", 0.5)
            .attr("stroke-width", 4)
            .attr("stroke", colorOfNode)
            .attr("class", getNameOfClassBetweenTwoNode(currentNode, newConnection));
        newLine.transition()
            .duration(time)
            .attr('x2', newConnection.x)
            .attr('y2', newConnection.y)
            .delay(count * time);
    }
    count++;
    circle.transition()
        .duration(time)
        .attr('r', radius)
        .delay(time * count);
    count++;
}

function drawOurSplitTreap(root) {
    if (root != null) {
        drawAnimationNewRootOnnewCoordinate(root, time);
        const text = svg.selectAll('.' + getNameOfClassText(root));
        text.transition()
            .duration(2 * time)
            .text(String(root.key) + ", " + String(root.priority))
            .attr('x', root.x - radius + 2)
            .attr('y', root.y)
            .delay(time * count);

        if (root.parent != null) {
            const line = svg.selectAll('.' + getNameOfClassBetweenTwoNode(root.parent, root));
            line.transition()
                .duration(2 * time)
                .attr('x1', root.parent.x)
                .attr('y1', root.parent.y)
                .attr('x2', root.x)
                .attr('y2', root.y)
                .delay(time * count)
        }
        drawOurSplitTreap(root.left);
        drawOurSplitTreap(root.right);
    }
}

function drawOneTreapForMerge(root) {
    if (root != null) {
        const text = svg.selectAll('.' + getNameOfClassText(root));
        text.transition()
            .duration(time)
            .attr('x', root.x)
            .attr('y', root.y)
            .text(root.priority)
            .delay(time * count);
        drawOneTreapForMerge(root.left);
        drawOneTreapForMerge(root.right);
    }
}

function drawPassesForMerge(root1, root2) {
    if (root1 != null && root2 != null) {
        if (root1.loc === 'root' && root2.loc === 'root') {
            const pass1 = svg.append('circle')
                .attr('cx', root1.x)
                .attr('cy', root1.y)
                .attr('r', radius + 1)
                .attr('fill', 'none')
                .attr('stroke', colorOfPass)
                .attr('class', "passForSplit1")
                .attr('stroke-width', 0);
            pass1.transition()
                .duration(time)
                .attr('stroke-width', 4)
                .delay(time * count);
            const pass2 = svg.append('circle')
                .attr('cx', root2.x)
                .attr('cy', root2.y)
                .attr('r', radius + 1)
                .attr('fill', 'none')
                .attr('stroke', colorOfPass)
                .attr('class', "passForSplit2")
                .attr('stroke-width', 0);
            pass2.transition()
                .duration(time)
                .attr('stroke-width', 4)
                .delay(time * count);
            count++;
        } else {
            const pass1 = svg.selectAll('.passForSplit1');
            const pass2 = svg.selectAll('.passForSplit2');
            pass1.transition()
                .duration(time)
                .attr('cx', root1.x)
                .attr('cy', root1.y)
                .delay(time * count);
            pass2.transition()
                .duration(time)
                .attr('cx', root2.x)
                .attr('cy', root2.y)
                .delay(time * count);
            count++;
        }
    } else {
        const pass1 = svg.selectAll('.passForSplit1');
        const pass2 = svg.selectAll('.passForSplit2');
        pass1.transition()
            .duration(time)
            .attr("stroke-width", 0)
            .remove()
            .delay(time * count)
        pass2.transition()
            .duration(time)
            .attr("stroke-width", 0)
            .remove()
            .delay(time * count)
    }
}

function changeLineBetweenTwoNodeForMerge(currentNode, oldConnection, newConnection) {
    /*changeLineBetweenTwoNode(currentNode, oldConnection, newConnection);*/
    if (newConnection != null && newConnection.parent != null && !IsNodeEque(newConnection, oldConnection)) {
        svg.selectAll("." + getNameOfClassBetweenTwoNode(newConnection.parent, newConnection))
            .transition()
            .duration(time)
            .attr("x2", newConnection.parent.x)
            .attr("y2", newConnection.parent.y)
            .style('opacity', 0)
            .remove()
            .delay(time * count);
        count++;
    }
    changeLineBetweenTwoNode(currentNode, oldConnection, newConnection);
}

function drawOurMergesTreap(root) {
    if (root != null) {
        drawAnimationNewRootOnnewCoordinate(root, time);
        const text = svg.selectAll('.' + getNameOfClassText(root));
        text.transition()
            .duration(time)
            .attr('x', root.x)
            .attr('y', root.y)
            .delay(time * count);

        if (root.parent != null) {
            const line = svg.selectAll('.' + getNameOfClassBetweenTwoNode(root.parent, root));
            line.transition()
                .duration(time)
                .attr('x1', root.parent.x)
                .attr('y1', root.parent.y)
                .attr('x2', root.x)
                .attr('y2', root.y)
                .delay(time * count)
        }
        drawOurMergesTreap(root.left);
        drawOurMergesTreap(root.right);
    }
}

function deleteFullOurTreap(root) {
    if (root != null) {
        const circle = svg.selectAll('.' + getNameOfClassNode(root));
        circle.transition()
            .duration(0)
            .attr('r', 0)
            .remove()
            .delay(time * count);
        const text = svg.selectAll('.' + getNameOfClassText(root));
        text.transition()
            .duration(0)
            .style('opacity', 0)
            .remove()
            .delay(time * count);
        if (root.parent != null) {
            const line = svg.selectAll('.' + getNameOfClassBetweenTwoNode(root.parent, root));
            line.transition()
                .duration(0)
                .attr('opacity', 0)
                .remove()
                .delay(time * count);
        }
        deleteFullOurTreap(root.left);
        deleteFullOurTreap(root.right);
    }
}

function drawNormalizationTreap(root) {
    if (root != null) {
        drawAnimationNewRootOnnewCoordinate(root, time);
        const text = svg.selectAll('.' + getNameOfClassText(root));
        text.transition()
            .duration(time)
            .text(String(root.key) + ", " + String(root.priority))
            .attr('x', root.x - radius + 2)
            .attr('y', root.y)
            .delay(time * count);
        if (root.parent != null) {
            const line = svg.selectAll('.' + getNameOfClassBetweenTwoNode(root.parent, root));
            line.transition()
                .duration(time)
                .attr("x1", root.parent.x)
                .attr("y1", root.parent.y)
                .attr("x2", root.x)
                .attr("y2", root.y)
                .delay(time * count);
        }
        drawNormalizationTreap(root.right);
        drawNormalizationTreap(root.left);
    }
}

function drawTextAboutKeyAndPriority(root) {
    if (root != null) {
        const text = svg.selectAll('.' + getNameOfClassText(root));
        text.transition()
            .duration(time)
            .attr('x', root.x - radius + 1)
            .attr('y', root.y + 2)
            .attr('fill', colorOfText)
            .text(getNameOfNode(root))
            .delay(time * count)
        drawTextAboutKeyAndPriority(root.left);
        drawTextAboutKeyAndPriority(root.right);
    }
}

function drawComparisonParameterOfRootWithValue(root, parametr, value) {
    if (root != null) {
        const text = svg.append('text')
            .attr('x', root.x - radius - 5)
            .attr('y', root.y - radius - 2)
            .text(String(parametr) + " V " + String(value))
            .style('opacity', 0);
        text.transition()
            .duration(0)
            .style('opacity')
            .delay(time * count);
        count++;
        if (parametr <= value) {
            text.transition()
                .duration(0)
                .text(String(parametr) + " ⩽ " + String(value))
                .delay(time * count);
            count++;
        } else {
            text.transition()
                .duration(0)
                .text(String(parametr) + " > " + String(value))
                .delay(time * count);
            count++;
        }
        text.transition()
            .delay(time)
            .style('opacity', 0)
            .remove()
            .delay(time * count);
        count++
    }
}

function changeColorOfSelector(lastSelector, newSelector) {
    if (lastSelector !== 0) {
        d3.select('.' + lastSelector)
            .transition()
            .duration(0)
            .style('background-color', 'white')
            .delay(time * count);
    }
    d3.select('.' + newSelector)
        .transition()
        .duration(0)
        .style('background-color', 'yellow')
        .delay(time * count);
    count++;
}

function drawRandomTreap(root) {
    if (root != null) {
        const circle = svg.append('circle')
            .attr('cx', root.x)
            .attr('cy', root.y)
            .attr('r', 0)
            .attr('class', getNameOfClassNode(root))
            .attr('fill', colorOfNode);
        circle.transition()
            .duration(0)
            .attr('r', radius)
            .delay(count * time);
        const textOfNode = svg.append('text')
            .attr("x", root.x - radius + 1)
            .attr('y', root.y + 2)
            .text(String(root.key) + ', ' + String(root.priority))
            .attr('class', getNameOfClassText(root))
            .attr('fill', 'none')
        textOfNode.transition()
            .duration(0)
            .attr('fill', colorOfText)
            .delay(time * count);
        if (root.parent != null) {
            const line = svg.append('line')
                .attr('x1', root.parent.x)
                .attr('y1', root.parent.y)
                .attr('x2', root.x)
                .attr('y2', root.y)
                .attr("stroke", colorOfNode)
                .attr("class", getNameOfClassBetweenTwoNode(root.parent, root))
                .attr("stroke-opacity", 0.5)
                .attr("stroke-width", 0);
            line.transition()
                .duration(0)
                .attr("stroke-width", 4)
                .delay(time * count);
        }
        drawRandomTreap(root.left);
        drawRandomTreap(root.right);
    }
}
