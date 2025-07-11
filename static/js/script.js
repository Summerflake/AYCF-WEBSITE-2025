// production mode
window.alert = function () { };
window.confirm = function () { return false; };
window.prompt = function () { return null; };

console.log = function () { };
console.warn = function () { };
console.error = function () { };
console.info = function () { };
console.debug = function () { };
console.trace = function () { };
console.table = function () { };
