function $(element) {
    var elem = document.querySelector(element);
    elem.html = html;
    return elem
}

function html(newСontent) {
    if(newСontent === undefined) {
        return this.innerHTML;
    }
    return this.innerHTML = newСontent
}