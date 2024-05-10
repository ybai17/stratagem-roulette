import * as index_module from './index-module.js';

console.log("#### first direct function call inside index.js");

export function index_load() {
    console.log("_____________________index.js is LOADING");

    //console.log("function: " + index_module.load);

    document.getElementById("reroll").addEventListener("click", index_module.load);
}

console.log("#### CLOSE function call inside index.js");

