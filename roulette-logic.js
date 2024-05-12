import * as strategems from "./loadout/strategems.js";
import { Difficulties } from "./loadout/difficulties.js";
import { Grenades } from "./loadout/grenades.js";
import { Primary_Weapons } from "./loadout/primaries.js";
import { Secondary_Weapons } from "./loadout/secondaries.js";
import { Boosters } from "./loadout/boosters.js";

//console.log(strategems.Backpacks)
//console.log(strategems.Eagle)

//function that picks a set of 4 strategems for a player
//todo: add ability to adjust settings/parameters
export function pickStrategemSet() {
    let output = [];

    let has_backpack_type = false;
    let has_weapon_type = false;

    let strat_count = 0;

    while (strat_count < 4) {

        let strat_type_key = getRandomIntInclusive(0, 4);

        console.log("Chose strat key: " + strat_type_key);

        let random_strat = pickRandomFromCategory(strategems.Strategem_Categories[strat_type_key]);

        //check if we've already picked this one
        if (output.includes(random_strat)) {
            continue;
        }

        //also forbid having 2 backpack-type strats
        //if (has_backpack_type && (strat_type_key == 4 || strategems.weapons_with_backpacks.includes(random_strat))) {
        //    console.log("Already have backpack or autocannon, retrying");
        //    continue;
        //}

        //forbid having 2 weapon-type strats
        //if (has_weapon_type && strat_type_key == 3) {
        //    console.log("Already has weapon, retrying");
        //    continue;
        //}

        output.push(random_strat);

        if (strat_type_key == 4) {
            has_backpack_type = true;
        }
        
        if (strat_type_key == 3) {
            has_weapon_type = true;
        }

        //also need to handle special case of the autocannon
        if (strategems.weapons_with_backpacks.includes(random_strat)) {
            has_backpack_type = true;
        }

        strat_count++;
    }

    return output;
};

export function pickDifficulty() {
    return pickRandomFromCategory(Difficulties);
}

export function pickGrenade() {
    return pickRandomFromCategory(Grenades);
}

export function pickPrimary() {
    return pickRandomFromCategory(pickRandomFromCategory(Primary_Weapons));
}

export function pickSecondary() {
    return pickRandomFromCategory(Secondary_Weapons);
}

export function pickBooster() {
    return pickRandomFromCategory(Boosters);
}

//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------

//utility/helper functions
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    // The maximum is inclusive and the minimum is inclusive
}

function pickRandomFromCategory(list) {

    //console.log('list is array? ' + Array.isArray(list));

    //if (!Array.isArray(list)) {
    //    console.log(list)
    //}

    let index = (Math.random() * list.length) << 0;

    return list[index];
}