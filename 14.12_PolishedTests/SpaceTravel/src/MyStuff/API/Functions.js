

import { Loading } from "./Loading";
import SpaceTravelApi from "../../services/SpaceTravelApi";
import { refreshAll } from "./Methods";
import OuterSpace2 from "./OuterSpace2";

export async function createCraft(...args){
    const finish=Loading(`creating the ${args[0].name}...`);
    await SpaceTravelApi.buildSpacecraft(...args);
    await refreshAll();
    finish();
}

export function getPlanetById(id){
    return OuterSpace2.planets?.find(planet => planet.id === id);
}

export function getCraftById(id){
    return OuterSpace2.spacecrafts?.find(craft => craft.id === id);
}

// usually for debug purposes
export function getPlanetByName(name){
    const lower = name.toLowerCase();
    return OuterSpace2.planets.find(planet => planet.name.toLowerCase() === lower);
}

export function getCraftByName(name){
    const lower = name.toLowerCase();
    return OuterSpace2.spacecrafts.find(craft => craft.name.toLowerCase() === lower);
}
