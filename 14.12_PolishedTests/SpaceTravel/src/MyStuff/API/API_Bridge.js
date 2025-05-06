import SpaceTravelApi from "../../services/SpaceTravelApi";

export async function getRawData(){
  const [planetsRes, spacecraftsRes] = await Promise.all([
    SpaceTravelApi.getPlanets(),
    SpaceTravelApi.getSpacecrafts()
  ]);

  return{
    planetInfo: planetsRes,
    spacecraftInfo: spacecraftsRes
  };
}

import { Loading } from "./Loading";
export async function spaceString(){
    const finish=Loading('fetching data...');

    const [planetsRes, spacecraftsRes] = await Promise.all([
        SpaceTravelApi.getPlanets(),
        SpaceTravelApi.getSpacecrafts()
    ]);

    finish();
    return(`
Debug Data...



Planets:
${JSON.stringify(planetsRes.data, null, 2)}



SpaceCraft:
${JSON.stringify(spacecraftsRes.data, null, 2)}
`);
}

export var allData;
import * as Converter from './Methods'
export async function ProcessData() {
    const finish=Loading('fetching starter data...');
    const rawData = await getRawData();
    
    allData = {
        spacecrafts: Converter.Convert(
            rawData.spacecraftInfo.data,
            Converter.SpacecraftType
        ),

        // (planets never change)
        planets: Converter.Convert(
            rawData.planetInfo.data,
            Converter.PlanetType,
        ),
    };
    finish();
    return allData;
}
