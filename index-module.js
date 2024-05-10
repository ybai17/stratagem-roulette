import * as roulette from './roulette-logic.js';
import { SVG_All } from './strategem-svg-maps.js';

let total_player_number = 4;
let table_cell_width = 100;

//default doesn't work
export function load_strats() {
    console.log("index-module.js LOAD");

    document.getElementById("players").replaceChildren();

    let players_div = document.getElementById("players");

        for (let i = 0; i < total_player_number; i++) {
            let strategem_list = roulette.pickStrategemSet();

            console.log("-----------------------------------------------------------------");

            create_player_strat_table(players_div, i, strategem_list);
        }
}

function create_player_strat_table(players_div, player_id, strategem_list) {

    let player_table = document.createElement("table");
    player_table.id = "player" + player_id;
    player_table.style = "border: 3px solid; padding: 10px; margin: auto; table-layout: fixed; width: 800px;";

    //player_table.innerHTML = strategem_list;
    
    let player_table_header_row = build_table_header(player_id, strategem_list);
    let player_table_icon_row = build_table_icons(player_id, strategem_list);

    player_table.appendChild(player_table_header_row);
    player_table.appendChild(player_table_icon_row);
    
    players_div.appendChild(player_table);

    players_div.appendChild(document.createElement("br"));
}

function build_table_header(player_id, strategem_list) {
    let output = document.createElement("tr");
    output.setAttribute("id", "player_" + player_id + "_header_row");
    output.style = "text-align: center; border: 1 px solid;";

    for (let i = 0; i < 4; i++) {
        let player_table_headers_single = document.createElement("th");
        player_table_headers_single.style = "padding: 10px; width: 100px";

        player_table_headers_single.innerHTML = strategem_list[i];

       output.appendChild(player_table_headers_single);
    }

    return output;
}

function build_table_icons(player_id, strategem_list) {
    let output = document.createElement("tr");
    output.setAttribute("id", "player_" + player_id + "_header_row");

    strategem_list.forEach(strat => {
        let icon_td = document.createElement("td");
        icon_td.style = "text-align: center;";

        let strategem_svg = document.createElement("img");
        strategem_svg.width = "100";
        strategem_svg.height = "100";

        strategem_svg.src = SVG_All[strat];

        icon_td.appendChild(strategem_svg);

        output.appendChild(icon_td);
    });

    return output;
}

document.getElementById("reroll").addEventListener("click", load_strats);