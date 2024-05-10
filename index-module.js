import * as roulette from './roulette-logic.js';
import { SVG_All } from './strategem-svg-maps.js';

export default function load() {
    console.log("index-module.js LOAD");

    let players_div = document.getElementById("players");

        for (let i = 0; i < 4; i++) {
            let player_node = document.createElement("p");
            player_node.id = "player" + i;

            let strategem_set = roulette.pickStrategemSet();

            player_node.innerHTML = strategem_set;
            
            players_div.appendChild(player_node);

            strategem_set.forEach(strat => {
                let strategem_svg = document.createElement("img");
                strategem_svg.width = "100";
                strategem_svg.height = "100";

                strategem_svg.src = SVG_All[strat];
                players_div.appendChild(strategem_svg);
            });
        }
}