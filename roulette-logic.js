import * as strategems from "./strategems.js";

console.log(strategems.Backpacks)
console.log(strategems.Eagle)

function pickRandomFromCategory(list) {

    let index = Math.random() * list.length << 0;

    return list[index];
}

function pickStrategemSet() {
    
}