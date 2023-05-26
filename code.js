function deleteCode() {
    let codeOfBuild = document.getElementById('code');
    codeOfBuild.removeChild('.code');
}
function codeOfBuildTreap() {
    let codeOfBuild = document.getElementById('code');
    let code1 = document.createElement('code');
    code1.className = 'code1'
    code1.textContent = "root = null";
    codeOfBuild.appendChild(code1);
    let code2 = document.createElement('code');
    code2.className = 'code2'
    code2.textContent = "last = null";
    codeOfBuild.appendChild(code2);
    let code3 = document.createElement('code');
    code3.className = 'code3'
    code3.textContent = "for (x, y) in sort(nodes):";
    codeOfBuild.appendChild(code3);
    let code4 = document.createElement('code');
    code4.className = 'code4'
    code4.textContent = "   cur = last";
    codeOfBuild.appendChild(code4);
    let code5 = document.createElement('code');
    code5.className = 'code5'
    code5.textContent = "   while (cur && y < cur -> y):";
    codeOfBuild.appendChild(code5);
    let code6 = document.createElement('code');
    code6.className = 'code6'
    code6.textContent = "       cur = cur -> parent";
    codeOfBuild.appendChild(code6);
    let code7 = document.createElement('code');
    code7.className = 'code7'
    code7.textContent = "   if (cur == null):";
    codeOfBuild.appendChild(code7);
    let code8 = document.createElement('code');
    code8.className = 'code8'
    code8.textContent = "       (x, y) -> left = root";
    codeOfBuild.appendChild(code8);
    let code9 = document.createElement('code');
    code9.className = 'code9'
    code9.textContent = "       if root: root -> parent = (x, y)";
    codeOfBuild.appendChild(code9);
    let code10 = document.createElement('code');
    code10.className = 'code10'
    code10.textContent = "       root = (x, y)";
    codeOfBuild.appendChild(code10);
    let code11 = document.createElement('code');
    code11.className = 'code11'
    code11.textContent = "   else:";
    codeOfBuild.appendChild(code11);
    let code12 = document.createElement('code');
    code12.className = 'code12'
    code12.textContent = "      cur -> right = (x, y)";
    codeOfBuild.appendChild(code12);
    let code13 = document.createElement('code');
    code13.className = 'code13'
    code13.textContent = "       (x, y) -> parent = cur";
    codeOfBuild.appendChild(code13);
    let code14 = document.createElement('code');
    code14.className = 'code14'
    code14.textContent = "       (x, y) -> left = cur -> right";
    codeOfBuild.appendChild(code14);
    let code15 = document.createElement('code');
    code15.className = 'code15'
    code15.textContent = "       if cur->right: cur -> right -> parent = (x, y)";
    codeOfBuild.appendChild(code15);
    let code16 = document.createElement('code');
    code16.className = 'code16'
    code16.textContent = "   last = (x, y)";
    codeOfBuild.appendChild(code16);
}

function codeOfSplitTreap()  {
    let codeOfBuild = document.getElementById('code');
    let code1 = document.createElement('code');
    code1.className = 'code1';
    code1.textContent = "function split(treap, key)";
    codeOfBuild.appendChild(code1);
    let code2 = document.createElement('code');
    code2.className = 'code2'
    code2.textContent = "   if (treap == null):";
    codeOfBuild.appendChild(code2);
    let code3 = document.createElement('code');
    code3.className = 'code3'
    code3.textContent = "       return (null, null)";
    codeOfBuild.appendChild(code3);
    let code4 = document.createElement('code');
    code4.className = 'code4'
    code4.textContent = "   else if (treap.key < key):";
    codeOfBuild.appendChild(code4);
    let code5 = document.createElement('code');
    code5.className = 'code5'
    code5.textContent = "       (t1, t2) = split(treap.left, key)";
    codeOfBuild.appendChild(code5);
    let code6 = document.createElement('code');
    code6.className = 'code6'
    code6.textContent = "       treap.right = t1";
    codeOfBuild.appendChild(code6);
    let code7 = document.createElement('code');
    code7.className = 'code7'
    code7.textContent = "       return (treap, t2)";
    codeOfBuild.appendChild(code7);
    let code8 = document.createElement('code');
    code8.className = 'code8'
    code8.textContent = "   else:";
    codeOfBuild.appendChild(code8);
    let code9 = document.createElement('code');
    code9.className = 'code9'
    code9.textContent = "       (t1, t2) = split(treap.right, key)";
    codeOfBuild.appendChild(code9);
    let code10 = document.createElement('code');
    code10.className = 'code10'
    code10.textContent = "       treap.left = t2";
    codeOfBuild.appendChild(code10);
    let code11 = document.createElement('code');
    code11.className = 'code11'
    code11.textContent = "       return (t1, treap)";
    codeOfBuild.appendChild(code11);
}

function codeOfMergeTreap()  {
    let codeOfBuild = document.getElementById('code');
    let code1 = document.createElement('code');
    code1.className = 'code1';
    code1.textContent = "function merge(treap1, treap2)";
    codeOfBuild.appendChild(code1);
    let code2 = document.createElement('code');
    code2.className = 'code2'
    code2.textContent = "   if (treap1 == null):";
    codeOfBuild.appendChild(code2);
    let code3 = document.createElement('code');
    code3.className = 'code3'
    code3.textContent = "       return treap2";
    codeOfBuild.appendChild(code3);
    let code4 = document.createElement('code');
    code4.className = 'code4'
    code4.textContent = "   else if (treap2 == null):";
    codeOfBuild.appendChild(code4);
    let code5 = document.createElement('code');
    code5.className = 'code5'
    code5.textContent = "       return treap1";
    codeOfBuild.appendChild(code5);
    let code6 = document.createElement('code');
    code6.className = 'code6'
    code6.textContent = "       treap.right = t1";
    codeOfBuild.appendChild(code6);
    let code7 = document.createElement('code');
    code7.className = 'code7'
    code7.textContent = "       return (treap, t2)";
    codeOfBuild.appendChild(code7);
    let code8 = document.createElement('code');
    code8.className = 'code8'
    code8.textContent = "   else:";
    codeOfBuild.appendChild(code8);
    let code9 = document.createElement('code');
    code9.className = 'code9'
    code9.textContent = "       (t1, t2) = split(treap.right, key)";
    codeOfBuild.appendChild(code9);
    let code10 = document.createElement('code');
    code10.className = 'code10'
    code10.textContent = "       treap.left = t2";
    codeOfBuild.appendChild(code10);
    let code11 = document.createElement('code');
    code11.className = 'code11'
    code11.textContent = "       return (t1, treap)";
    codeOfBuild.appendChild(code11);
}