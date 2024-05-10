import * as strategems from "./strategems.js";

//console.log(strategems.Backpacks)
//console.log(strategems.Eagle)

function pickRandomFromCategory(list) {

    //console.log('list is array? ' + Array.isArray(list));

    //if (!Array.isArray(list)) {
    //    console.log(list)
    //}

    let index = (Math.random() * list.length) << 0;

    return list[index];
}

//function that picks a set of 4 strategems for a player
export function pickStrategemSet() {
    let output = [];

    let has_backpack_type = false;

    let strat_count = 0;

    while (strat_count < 4) {

        let strat_type_key = getRandomIntInclusive(0, 4);

        //console.log("Chose strat key: " + strat_type_key);

        let random_strat = pickRandomFromCategory(strategems.Strategem_Categories[strat_type_key]);

        //check if we've already picked this one
        if (output.includes(random_strat)) {
            continue;
        }

        //also forbid having 2 backpack-type strats
        if (has_backpack_type && (strat_type_key == 4 || random_strat === "Autocannon")) {
            console.log("Already have backpack or autocannon, retrying");
            continue;
        }

        output.push(random_strat);

        if (strat_type_key == 4) {
            has_backpack_type = true;
        }

        //also need to handle special case of the autocannon
        if (random_strat === "Autocannon") {
            has_backpack_type = true;
        }

        strat_count++;
    }

    return output
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    // The maximum is inclusive and the minimum is inclusive
}