import * as roulette from "./roulette-logic.js";
import { SVG_All } from "./icon-maps/stratagem-icon-maps.js";
import { Primary_Icons } from "./icon-maps/primary-icon-maps.js";
import { Secondary_Icons } from "./icon-maps/secondary-icon-maps.js";
import { Grenade_Icons } from "./icon-maps/greande-icon-maps.js";
import { Booster_Icons } from "./icon-maps/booster-icon-maps.js";

let total_player_number = 4;
let table_cell_width = "100";

//default doesn't work
export function load_strats() {
    console.log("index-module.js LOAD");

    document.getElementById("players").replaceChildren();

    //pick boosters separately
    let boosters = roulette.pickBoosters();

    let players_div = document.getElementById("players");

        for (let i = 0; i < total_player_number; i++) {

            let loadout = {
                stratagems: roulette.pickstratagemSet(),
                primary_weapon: roulette.pickPrimary(),
                secondary_weapon: roulette.pickSecondary(),
                grenade: roulette.pickGrenade(),
                booster: boosters[i],
            };

            console.log("-----------------------------------------------------------------");

            create_player_strat_table(players_div, i, loadout);
        }
}

function create_player_strat_table(players_div, player_id, loadout) {

    let player_table = document.createElement("table");
    player_table.id = "player_" + player_id;
    player_table.setAttribute("class", "player-table");
    
    let player_table_header_row = build_table_header(player_id, loadout);
    let player_table_icon_row = build_table_icons(player_id, loadout);

    player_table.appendChild(player_table_header_row);
    player_table.appendChild(player_table_icon_row);
    
    players_div.appendChild(player_table);

    buildPrimaryElements(player_id, loadout.primary_weapon);
    buildSecondaryElements(player_id, loadout.secondary_weapon);
    buildGrenadeElements(player_id, loadout.grenade);
    buildBoosterElements(player_id, loadout.booster);

    players_div.appendChild(document.createElement("br"));
}

function build_table_header(player_id, loadout) {
    let output = document.createElement("tr");
    output.setAttribute("id", "player_" + player_id + "_header_row");
    output.setAttribute("class", "player-header-row");


    //add the stratagem headers
    for (let i = 0; i < 4; i++) {
        let player_stratagem_header_single = document.createElement("th");
        player_stratagem_header_single.setAttribute("class", "player-stratagem-headers");

        player_stratagem_header_single.innerHTML = loadout.stratagems[i];

       output.appendChild(player_stratagem_header_single);
    }

    //now add the other headers (primary weapon, secondary weapon, grenade, booster)

    //primary weapon th
    let player_primary_header = document.createElement("th");
    player_primary_header.setAttribute("id", player_id + "_primary_header");
    player_primary_header.setAttribute("class", "player-primary-headers");
    output.appendChild(player_primary_header);


    //secondary weapon th
    let player_secondary_header = document.createElement("th");
    player_secondary_header.setAttribute("id", player_id + "_secondary_header");
    player_secondary_header.setAttribute("class", "player-secondary-headers");
    output.appendChild(player_secondary_header);


    //grenade th
    let player_grenade_header = document.createElement("th");
    player_grenade_header.setAttribute("id", player_id + "_grenade_header");
    player_grenade_header.setAttribute("class", "player-grenade-headers");
    output.appendChild(player_grenade_header);


    //booster th
    let player_booster_header = document.createElement("th");
    player_booster_header.setAttribute("id", player_id + "_booster_header");
    player_booster_header.setAttribute("class", "player-booster-headers");
    output.appendChild(player_booster_header);

    return output;
}

function build_table_icons(player_id, loadout) {
    let output = document.createElement("tr");
    output.setAttribute("id", "player_" + player_id + "_header_row");

    loadout.stratagems.forEach(strat => {
        let icon_td = document.createElement("td");
        icon_td.setAttribute("class", "stratagem-icons");

        let stratagem_svg = document.createElement("img");
        stratagem_svg.setAttribute("class", "stratagem-icons-img");

        stratagem_svg.src = SVG_All[strat];

        icon_td.appendChild(stratagem_svg);
        output.appendChild(icon_td);
    });

    //add td space for the primary weapon icon
    let icon_primary_td = document.createElement("td");
    icon_primary_td.setAttribute("id", player_id + "_primary_td");
    icon_primary_td.setAttribute("class", "primary-icons");
    output.appendChild(icon_primary_td);


    //add td space for the secondary weapon icon
    let icon_secondary_td = document.createElement("td");
    icon_secondary_td.setAttribute("id", player_id + "_secondary_td");
    icon_secondary_td.setAttribute("class", "secondary-icons");
    output.appendChild(icon_secondary_td);


    //add td space for the grenade icon
    let icon_grenade_td = document.createElement("td");
    icon_grenade_td.setAttribute("id", player_id + "_grenade_td");
    icon_grenade_td.setAttribute("class", "grenade-icons");
    output.appendChild(icon_grenade_td);


    //add td space for the booster icon
    let icon_booster_td = document.createElement("td");
    icon_booster_td.setAttribute("id", player_id + "_booster_td");
    icon_booster_td.setAttribute("class", "booster-icons");
    output.appendChild(icon_booster_td);

    return output;
}

//--------------------------------------
//helper functions for building the elements for the primary weapon, secondary weapon, and grenade, respectively
//--------------------------------------

//takes the player id and primary weapon, finds the header and icon elements for that respective player,
//clears them (if already existing) and adds in the new weapon name and icons
function buildPrimaryElements(player_id, primary_weapon) {

    //console.log(primary_weapon);

    let player_primary_header = document.getElementById(player_id + "_primary_header");
    let icon_primary_td = document.getElementById(player_id + "_primary_td");
    
    //header element
    player_primary_header.innerHTML = primary_weapon;

    //----------------------------------------------------------------------

    //icon element
    let icon_primary = document.createElement("img");
    icon_primary.setAttribute("class", "can-reroll");

    icon_primary.addEventListener("click", () => {
        //alert("You clicked: " + icon_primary_td.id);
        buildPrimaryElements(player_id, roulette.pickPrimary());
    });

    icon_primary.width = "200";
    icon_primary.height = "100";

    icon_primary.src = Primary_Icons[primary_weapon];

    icon_primary_td.replaceChildren(icon_primary);
}

//takes the player id and secondary weapon, finds the header and icon elements for that respective player,
//clears them (if already existing) and adds in the new weapon name and icons
function buildSecondaryElements(player_id, secondary_weapon) {

    let player_secondary_header = document.getElementById(player_id + "_secondary_header");
    let icon_secondary_td = document.getElementById(player_id + "_secondary_td");
    
    //header element
    player_secondary_header.innerHTML = secondary_weapon;

    //----------------------------------------------------------------------

    //icon element
    let icon_secondary = document.createElement("img");
    icon_secondary.setAttribute("class", "can-reroll");

    icon_secondary.addEventListener("click", () => {
        //alert("You clicked: " + icon_secondary_td.id);
        buildSecondaryElements(player_id, roulette.pickSecondary());
    });

    icon_secondary.width = "150";
    icon_secondary.height = "100";

    icon_secondary.src = Secondary_Icons[secondary_weapon];

    icon_secondary_td.replaceChildren(icon_secondary);

}

//takes the player id and grenade, finds the header and icon elements for that respective player,
//clears them (if already existing) and adds in the new grenade name and icons
function buildGrenadeElements(player_id, grenade) {
    
    //clear the header and icon elements first
    let player_grenade_header = document.getElementById(player_id + "_grenade_header");
    let icon_grenade_td = document.getElementById(player_id + "_grenade_td");

    //header element
    player_grenade_header.innerHTML = grenade;

    //----------------------------------------------------------------------

    //icon element
    let icon_grenade = document.createElement("img");
    icon_grenade.setAttribute("class", "can-reroll");

    icon_grenade.addEventListener("click", () => {
        //alert("You clicked: " + icon_grenade_td.id);
        buildGrenadeElements(player_id, roulette.pickGrenade());
    });

    icon_grenade.width = "100";
    icon_grenade.height = "100";

    icon_grenade.src = Grenade_Icons[grenade];

    icon_grenade_td.replaceChildren(icon_grenade);

}

//takes the player id and booster, finds the header and icon elements for that respective player,
//clears them (if already existing) and adds in the new booster name and icons
function buildBoosterElements(player_id, booster) {

    let player_booster_header = document.getElementById(player_id + "_booster_header");
    let icon_booster_td = document.getElementById(player_id + "_booster_td");

    //header element
    player_booster_header.innerHTML = booster;

    //----------------------------------------------------------------------

    //icon element
    let icon_booster = document.createElement("img");
    icon_booster.setAttribute("class", "can-reroll-boosters");

    icon_booster.addEventListener("click", () => {
        //alert("You clicked: " + icon_booster_td.id);

        let exclude_list = [];

        for (let i = 0; i < total_player_number; i++) {
            let curr_booster_iter = document.getElementById(i + "_booster_header").innerHTML;
            exclude_list.push(curr_booster_iter);
        }

        console.log("REROLL EXCLUDE LIST:");
        console.log(exclude_list);

        let selected_booster = roulette.rerollBooster(exclude_list);
        buildBoosterElements(player_id, selected_booster);
    });

    icon_booster.width = "80";
    icon_booster.height = "70";

    icon_booster.src = Booster_Icons[booster];

    icon_booster_td.replaceChildren(icon_booster);
}

//assign the main function for loading the interface to the reroll button
document.getElementById("reroll").addEventListener("click", load_strats);