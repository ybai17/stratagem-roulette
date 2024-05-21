import * as roulette from "./roulette-logic.js";
import { SVG_All } from "./icon-maps/strategem-icon-maps.js";
import { Primary_Icons } from "./icon-maps/primary-icon-maps.js";
import { Secondary_Icons } from "./icon-maps/secondary-icon-maps.js";
import { Grenade_Icons } from "./icon-maps/greande-icon-maps.js";
//import { Booster_Icons } from "./icon-maps/booster-icon-maps.js";

let total_player_number = 4;
let table_cell_width = "100";

//default doesn't work
export function load_strats() {
    console.log("index-module.js LOAD");

    document.getElementById("players").replaceChildren();

    let players_div = document.getElementById("players");

        for (let i = 0; i < total_player_number; i++) {

            let loadout = {
                strategems: roulette.pickStrategemSet(),
                primary_weapon: roulette.pickPrimary(),
                secondary_weapon: roulette.pickSecondary(),
                grenade: roulette.pickGrenade(),
                booster: roulette.pickBooster(),
            };

            console.log("-----------------------------------------------------------------");

            create_player_strat_table(players_div, i, loadout);
        }
}

function create_player_strat_table(players_div, player_id, loadout) {

    let player_table = document.createElement("table");
    player_table.id = "player_" + player_id;
    player_table.style = "border: 3px solid; padding: 10px; margin: auto; table-layout: fixed; width: 1200px;";
    
    let player_table_header_row = build_table_header(player_id, loadout);
    let player_table_icon_row = build_table_icons(player_id, loadout);

    player_table.appendChild(player_table_header_row);
    player_table.appendChild(player_table_icon_row);
    
    players_div.appendChild(player_table);

    buildPrimaryElements(player_id, loadout.primary_weapon);
    buildSecondaryElements(player_id, loadout.secondary_weapon);
    buildGrenadeElements(player_id, loadout.grenade);

    players_div.appendChild(document.createElement("br"));
}

function build_table_header(player_id, loadout) {
    let output = document.createElement("tr");
    output.setAttribute("id", "player_" + player_id + "_header_row");
    output.style = "text-align: center; border: 1 px solid;";


    //add the strategem headers
    for (let i = 0; i < 4; i++) {
        let player_table_headers_single = document.createElement("th");
        player_table_headers_single.style = "padding: 20px; width: " + table_cell_width + "px;";

        player_table_headers_single.innerHTML = loadout.strategems[i];

       output.appendChild(player_table_headers_single);
    }

    //now add the other headers (primary weapon, secondary weapon, grenade, booster)

    //primary weapon th
    let player_primary_header = document.createElement("th");
    player_primary_header.style = "border: 1 px solid; padding: 10px; width: 50 px; padding-left: 30px;";
    player_primary_header.setAttribute("id", player_id + "_primary_header");
    output.appendChild(player_primary_header);


    //secondary weapon th
    let player_secondary_header = document.createElement("th");
    player_secondary_header.style = "border: 1 px solid; padding: 10px; width: 50 px;";
    player_secondary_header.setAttribute("id", player_id + "_secondary_header");
    output.appendChild(player_secondary_header);


    //grenade th
    let player_grenade_header = document.createElement("th");
    player_grenade_header.style = "border: 1 px solid; padding: 10px; width: 50 px;";
    player_grenade_header.setAttribute("id", player_id + "_grenade_header");
    output.appendChild(player_grenade_header);


    //booster
    /*
    let player_booster_header = document.createElement("th");
    player_booster_header.style = "border: 1 px solid; padding: 10px; width: 50 px;";

    let player_booster = loadout.booster;
    player_booster_header.innerHTML = player_booster;

    output.appendChild(player_booster_header);
    */

    return output;
}

function build_table_icons(player_id, loadout) {
    let output = document.createElement("tr");
    output.setAttribute("id", "player_" + player_id + "_header_row");

    loadout.strategems.forEach(strat => {
        let icon_td = document.createElement("td");
        icon_td.style = "text-align: center;";

        let strategem_svg = document.createElement("img");
        strategem_svg.width = table_cell_width;
        strategem_svg.height = table_cell_width;

        strategem_svg.src = SVG_All[strat];

        icon_td.appendChild(strategem_svg);
        output.appendChild(icon_td);
    });

    //add td space for the primary weapon icon
    let icon_primary_td = document.createElement("td");
    icon_primary_td.style = "text-align: center; padding-left: 30px;";
    icon_primary_td.setAttribute("id", player_id + "_primary_td");
    output.appendChild(icon_primary_td);


    //add td space for the secondary weapon icon
    let icon_secondary_td = document.createElement("td");
    icon_secondary_td.style = "text-align: center;";
    icon_secondary_td.setAttribute("id", player_id + "_secondary_td");
    output.appendChild(icon_secondary_td);


    //add td space for the grenade icon
    let icon_grenade_td = document.createElement("td");
    icon_grenade_td.style = "text-align: center;";
    icon_grenade_td.setAttribute("id", player_id + "_grenade_td");
    output.appendChild(icon_grenade_td);


    //create icon for booster
    /*
    let icon_booster_td = document.createElement("td");
    icon_booster_td.style = "text-align: center;";

    let icon_booster = document.createElement("img");
    icon_booster.width = "80";
    icon_booster.height = "70";

    icon_booster.src = Booster_Icons[loadout.booster];

    icon_booster_td.appendChild(icon_booster);
    output.appendChild(icon_booster_td);
    */

    return output;
}

//--------------------------------------
//helper functions for building the elements for the primary weapon, secondary weapon, and grenade, respectively
//--------------------------------------

//takes the player id and primary weapon, finds the header and icon elements for that respective player,
//clears them (if already existing) and adds in the new weapon name and icons
function buildPrimaryElements(player_id, primary_weapon) {

    console.log(primary_weapon);

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

    console.log(secondary_weapon);

    let player_secondary_header = document.getElementById(player_id + "_secondary_header");
    let icon_secondary_td = document.getElementById(player_id + "_secondary_td");

    //header element
    player_secondary_header.innerHTML = secondary_weapon;

    //----------------------------------------------------------------------

    //icon element
    let icon_secondary = document.createElement("img");
    icon_secondary.setAttribute("class", "can-reroll");

    icon_secondary_td.addEventListener("click", () => {
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

//assign the main function for loading the interface to the reroll button
document.getElementById("reroll").addEventListener("click", load_strats);