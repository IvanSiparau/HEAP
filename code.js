function deleteCode() {
    let codeOfBuild = d3.selectAll('code').remove();
}

function createCode(code_) {
    document.getElementById('code').style.display = 'block'
    let codeOfBuild = document.getElementById('code');
    for (var i = 0; i < code_.length; ++i) {
        let code = document.createElement('code');
        code.className = 'code' + String(i + 1);
        code.textContent = code_[i];
        codeOfBuild.appendChild(code);
    }
}
const codeForBuild =
    [
        'root = null',
        'last = null',
        'for (x, y) in sort(nodes)',
        '   cur = last',
        '   while (cur && y < cur -> y)',
        '       cur = cur -> parent',
        '   if (cur == null)',
        '       (x, y) -> left = cur',
        '       if root: root -> parent = (x, y)',
        '       root = (x, y)',
        '   else',
        '       cur -> right = (x, y)',
        '       (x, y) -> parent = cur',
        '       (x, y) -> left = cur -> right',
        '       if cur->right: cur -> right -> parent = (x, y)',
        '   last = (x, y)'
    ]
function codeOfBuildTreap() {
    createCode(codeForBuild);
}

const codeForSplit = [
    'function split(treap, key)',
    '   if (treap == null)',
    '       return (null, null)',
    '   else if (treap.key < key):',
    '       (t1, t2) = split(treap.left, key)',
    '       treap.right = t1',
    '       return (treap, t2)',
    '   else:',
    '       (t1, t2) = split(treap.right, key)',
    '       treap.left = t2',
    '       return (t1, treap)'
]
function codeOfSplitTreap()  {
    createCode(codeForSplit);
}

const codeForMerge = [
    'function merge(treap1, treap2)',                        //code1
    '   if (treap1 == null):',                               //code2
    '       return treap2',                                  //code3
    '   else if (treap2 == null):',                          //code4
    '       return treap1',                                  //code5
    '   else if (treap1.priority <= treap2.priority)',       //code6
    '       treap1.right = merge(treap1.right, treap2)',     //code7
    '       return treap1',                                  //code8
    '   else:',                                              //code9
    '       treap2.left = merge(treap1, treap2.left)',       //code10
    '       return treap2'                                   //code11
]
function codeOfMergeTreap()  {
    createCode(codeForMerge);
}

const codeForInsert = [
    'function insert(treap, node)',                     //code1
    '   if (!treap) return node',                       //code2
    '   (treap1, treap2) = split(treap, node.key)',     //code3
    '   treap3 = merge(treap, node)',                   //code4
    '   treap = merge(treap3, treap2)',                 //code5
    '   return treap'                                   //code6
];

function codeOfInsertTreap() {
    createCode(codeForInsert);
}

const codeForRemove = [
    'function remove(treap, key):',
    '   (treap1, treap2) = split(treap, key)',
    '   (trea3, treap4) = split(treap2, key + 1)',
    '   return merge(treap1, treap4)'
];

function codeOfRemove() {
    createCode(codeForRemove);
}