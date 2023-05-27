function drawAnimationNewRootOnnewCoordinate(root, time_, count_) {
    const circle = svg.selectAll('.' + getNameOfClassNode(root));
    circle.transition()
        .duration(time_)
        .attr('cx', root.x)
        .attr('cy', root.y)
        .delay(time_ * count_);
}

function drawNewNode(root, time_, count_) {
    const circle = svg.append('circle')
        .attr('cx', root.x)
        .attr('cy', root.y)
        .attr('r', 0)
        .attr('class', getNameOfClassNode(root))
        .attr('fill', colorOfNode);
    circle.transition()
        .duration(time_)
        .attr('r', radius)
        .delay(count_ * time_);
}

function drawNewTextOfNode(root, time_, count_) {
    const textOfNode = svg.append('text')
        .attr('x', root.x - radius + 1)
        .attr('y', root.y + 2)
        .attr('class', getNameOfClassText(root))
        .text(getNameOfNode(root))
        .style('opacity', 0);
    textOfNode.transition()
        .duration(time_)
        .style('opacity', 1)
        .delay(time_ * count_);
}

function drawAnimationLineOnNewCoordinates(root1, root2, count_, time_) {
    const line = svg.selectAll('.' + getNameOfClassBetweenTwoNode(root1, root2));
    line.transition()
        .duration(time_)
        .attr('x1', root1.x)
        .attr('y1', root1.y)
        .attr('x2', root2.x)
        .attr('y2', root2.y)
        .delay(time_ * count_);
}

function drawNewLineBetweenTwoNode(root1, root2, count_, time_) {
    const line = svg.append('line')
        .attr('x1', root1.x)
        .attr('y1', root1.y)
        .attr('x2', root1.x)
        .attr('y2', root1.y)
        .attr('class', getNameOfClassBetweenTwoNode(root1, root2))
        .attr("stroke", colorOfNode)
        .attr("stroke-opacity", 0.5)
        .attr("stroke-width", 4);
    line.transition()
        .duration(time_)
        .attr('x2', root2.x)
        .attr('y2', root2.y)
        .delay(time * count);
}

function drawRemoveLineBetweenTwoNode(root1, root2, time_, count_) {
    const line = svg.selectAll('.' + getNameOfClassBetweenTwoNode(root1, root2));
    line.transition()
        .duration(time_)
        .attr('x2', root1.x)
        .attr('y2', root1.y)
        .style('opacity', 0)
        .remove()
        .delay(time_ * count_);
}

function AnimationTextOnNewCoordinate(root, time_, count_) {
    const text = svg.selectAll('.' + getNameOfClassText(root));
    text.transition()
        .duration(time_)
        .attr('x', root.x - radius + 1)
        .attr('y', root.y + 2)
        .delay(time_ * count_);
}

function drawAnimationPassOnNewCoordinate(nameOfPass, x, y, time_, count_) {
    const pass = svg.selectAll('.' + nameOfPass);
    pass.transition()
        .duration(time_)
        .attr('cx', x)
        .attr('cy', y)
        .delay(time_ * count_);
}

function createNewPass(nameOfPass, x, y, time_, count_) {
    const pass = svg.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', radius + 1)
        .attr('fill', 'none')
        .attr('stroke', colorOfPass)
        .attr('class', nameOfPass)
        .attr('stroke-width', 0);
    pass.transition()
        .duration(time_)
        .attr('stroke-width', 4)
        .delay(time_ * count_);
}

function removeThePass(nameOfPass, time_, count_) {
    const pass = svg.selectAll('.' + nameOfPass);
    pass.transition()
        .duration(time_)
        .attr("stroke-width", 0)
        .remove()
        .delay(time_ * count_);

}

function drawChangeTextOfNode(root, x, y, newText, time_, count_) {
    const text = svg.selectAll('.' + getNameOfClassText(root));
    text.transition()
        .duration(time_)
        .attr('x', x)
        .attr('y', y)
        .text(newText)
        .delay(time_ * count_);
}

function drawOnlyKey(root) {
    if (root != null) {
        drawChangeTextOfNode(root, root.x, root.y, root.key, time, count);
        drawOnlyKey(root.left);
        drawOnlyKey(root.right);
    }
}

function drawOnlyPriority(root) {
    if (root != null) {
        drawChangeTextOfNode(root, root.x, root.y, root.priority, time, count);
        drawOnlyPriority(root.left);
        drawOnlyPriority(root.right);
    }
}

function drawKeyAndPriority(root) {
    if (root != null) {
        drawChangeTextOfNode(root, root.x - radius + 1, root.y + 2, getNameOfNode(root), time, count);
        drawKeyAndPriority(root.left);
        drawKeyAndPriority(root.right);
    }
}


function drawAllTreap(root, time_) {
    if (root != null) {
        drawNewNode(root, time_, count);
        drawNewTextOfNode(root, time_, count);
        if (root.parent != null) {
            drawNewLineBetweenTwoNode(root.parent, root, count, time_);
        }
        drawAllTreap(root.right, time_);
        drawAllTreap(root.left, time_);
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
    drawNewNode(node, time, count);
    drawNewTextOfNode(node, time, count);
    count++;
}

function drawTextNearNode(str, isNew, x, y, time, count) {
    if (isNew) {
        text = svg.append('text')
            .attr('x', x)
            .attr('y', y)
            .attr("class", 'comparison')
            .text(str)
            .style('opacity', 0);
        text.transition()
            .duration(0)
            .style("opacity", 1)
            .delay(time * count);
    } else {
        text = svg.selectAll('.comparison');
        text.transition()
            .duration(0)
            .text(str)
            .delay(time * count);
    }
}

function removeComparison() {
    svg.selectAll('.comparison')
        .transition()
        .duration(0)
        .remove()
        .style('opacity', 0)
        .delay(time * count);
}


function drawUpdate(root, node) {
    if (root != null) {
        drawAnimationNewRootOnnewCoordinate(root, time, count);
        AnimationTextOnNewCoordinate(root, time, count);
        if (root.left != null) {
            drawAnimationLineOnNewCoordinates(root, root.left, count, time);
        }
        if (root.right != null) {
            drawAnimationLineOnNewCoordinates(root, root.right, count, time);
        }
        if ((root.key == node.key && root.priority == node.priority)) {
            drawNewNode(root, time, count);
            drawNewTextOfNode(root, time, count);
            if (root.loc === "root") {
                if (root.left != null) {
                    drawAnimationPassOnNewCoordinate('passOfNode', root.left.x, root.left.y, time, count);
                }
            } else {
                drawAnimationPassOnNewCoordinate('passOfNode', root.parent.x, root.parent.y, time, count);
            }
            if (root.parent != null && root.left != null) {
                drawAnimationLineOnNewCoordinates(root.parent, root.left, count, time);
            }
        }
        drawUpdate(root.left, node);
        drawUpdate(root.right, node);
    }
}

function drawNewLineBetweenOurHeapAndNewNode(node, lastNode, modes, lastSection) {
    if (modes === newAddedNodeBeginRootOfHeap) {
        drawNewLineBetweenTwoNode(node, node.left, count, time);
    } else if (modes === newAddedNodeBeginTheRigthSonOfNode) {
        changeColorOfSelector(lastSection, 'code12');
        drawNewLineBetweenTwoNode(node.parent, node, count, time);
        changeColorOfSelector('code12', 'code13');
        if (node.left != null) {
            changeColorOfSelector('code13', 'code14');
            changeColorOfSelector('code14', 'code15');
            count++;
            drawNewLineBetweenTwoNode(node, node.left);
            count++;
            drawRemoveLineBetweenTwoNode(node.parent, node.left, time, count);
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
    createNewPass('passOfNode', getCircle(node)[0], getCircle(node)[1], time, count);
    count++;
}

function drawPass(node) {
    drawAnimationPassOnNewCoordinate('passOfNode', getCircle(node)[0], getCircle(node)[1], time, count)
    count++;
}

function drawComparison_(valueOfNode, value, x, y) {
    let comparison = String(valueOfNode) + ' v ' + String(value);
    drawTextNearNode(comparison, true, x, y, time, count);
    count++;
    if (valueOfNode >= value) {
        comparison = String(valueOfNode) + ' ≥ ' + String(value);
    } else {
        comparison = String(valueOfNode) + ' < ' + String(value);
    }
    count++;
    drawTextNearNode(comparison, false, x, y, time, count);
    count++;
    removeComparison();
}

function drawComparisonForBuild(node, newNode) {
    drawComparison_(node.priority, newNode.priority, node.x + radius + 5, node.y);
}

function getNameOfNode(node) {
    return String(node.key) + ', ' + String(node.priority);
}

function delatePassAndMessage() {
    removeThePass('passOfNode', time, count);
}

function drawPassForSplit(root) {
    if (root != null && root.loc === 'root') {
        createNewPass('passForSplit', root.x, root.y, time, count);
        count++;
    } else if (root) {
        drawAnimationPassOnNewCoordinate('passForSplit', root.x, root.y, time, count);
        count++;
    } else {
        removeThePass('passForSplit', time, count);
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
        drawRemoveLineBetweenTwoNode(currentNode, oldConnection, time, count);
    }
    if (!IsNodeEque(oldConnection, newConnection) && newConnection != null) {
        drawNewLineBetweenTwoNode(currentNode, newConnection, time, count);
    }
    count++;
    circle.transition()
        .duration(time)
        .attr('r', radius)
        .delay(time * count);
    count++;
}

function drawPassesForMerge(root1, root2) {
    if (root1 != null && root2 != null) {
        if (root1.loc === 'root' && root2.loc === 'root') {
            createNewPass('passForSplit1', root1.x, root1.y, time, count);
            createNewPass('passForSplit2', root2.x, root2.y, time, count);
            count++;
        } else {
            drawAnimationPassOnNewCoordinate('passForSplit1', root1.x, root1.y, time, count);
            drawAnimationPassOnNewCoordinate('passForSplit2', root2.x, root2.y, time, count);
            count++;
        }
    } else {
        removeThePass('passForSplit1', time, count);
        removeThePass('passForSplit2', time, count);
        count++;
    }
}

function changeLineBetweenTwoNodeForMerge(currentNode, oldConnection, newConnection) {
    if (newConnection != null && newConnection.parent != null && !IsNodeEque(newConnection, oldConnection)) {
        drawRemoveLineBetweenTwoNode(newConnection.parent, newConnection, time, count);
        count++;
    }
    changeLineBetweenTwoNode(currentNode, oldConnection, newConnection);
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

function drawComparisonForSplit(root, key) {
    drawComparison_(root.key, key, root.x - radius - 5, root.y - radius - 2);
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

function drawAnimationTreapInNewNode(root) {
    if (root != null) {
        drawAnimationNewRootOnnewCoordinate(root, time, count);
        AnimationTextOnNewCoordinate(root, time, count);
        if (root.parent != null) {
            drawAnimationLineOnNewCoordinates(root.parent, root, count, time);
        }
        drawAnimationTreapInNewNode(root.left);
        drawAnimationTreapInNewNode(root.right);
    }
}