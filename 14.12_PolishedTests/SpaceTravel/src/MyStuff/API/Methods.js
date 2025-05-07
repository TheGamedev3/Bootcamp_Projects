

export function Convert(array, classType){
    return array.map(inst=>{
        const instance={};
        Object.assign(instance, inst);
        Object.assign(instance, classType);
        instance.constructor?.();
        return instance;
    });
}

import SpaceTravelApi from "../../services/SpaceTravelApi";
import { Loading } from "./Loading";
export const PlanetType = {
    type:'planet'
}

import OuterSpace2 from "./OuterSpace2";
import { getPlanetById } from "./Functions";

export const SpacecraftType = {
    type:'spacecraft',
    async destroy(){
        const finish=Loading(`destroying craft ${this.name}...`);
        await SpaceTravelApi.destroySpacecraftById({id:this.id});
        await refreshAll();
        finish();
    },
    async sendTo(planet){
        const finish=Loading(`flying ${this.name} to ${planet.name}...`);
        await SpaceTravelApi.sendSpacecraftToPlanet({spacecraftId:this.id, targetPlanetId:planet.id});
        await refreshAll();
        finish();
    },
    isAtPlanet(planet){return this.currentLocation === planet.id},
    getMyPlanet(){return getPlanetById(this.currentLocation)}
}

import { fireSignal } from "./Events";
export async function refreshAll() {
    const [planetInfo, spacecraftInfo] = await Promise.all([
      SpaceTravelApi.getPlanets(),
      SpaceTravelApi.getSpacecrafts()
    ]);
  
    OuterSpace2.planets = Convert(planetInfo.data, PlanetType);
    OuterSpace2.spacecrafts = Convert(spacecraftInfo.data, SpacecraftType);
  
    fireSignal('planets', OuterSpace2.planets);
    fireSignal('crafts', OuterSpace2.spacecrafts);
}
