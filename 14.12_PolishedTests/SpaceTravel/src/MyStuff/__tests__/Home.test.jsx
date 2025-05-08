




// create and destroy a ship with the buttons and forum stuff

// create and send a ship to a new planet
// see if the population increased
// destroy the ship again and clean it up

///////////////// SANDBOX EACH TEST /////////////////

import { vi } from 'vitest';
beforeEach(() => {
  vi.resetModules();
});

import { cleanup } from '@testing-library/react';
afterEach(() => {
  cleanup();         // ← unmount all components
  vi.restoreAllMocks();
  vi.resetModules(); // ← reset module cache
});

//////////////////////////////////////////////////////


import { describe, test, expect } from 'vitest';

test('home page', async()=>{
    // test initial render

    const { testInstance } = await import('./testHelpers.jsx');
    const inst = await testInstance();

    expect(await inst.textElement('🏠 Welcome to Space!')).toBeInTheDocument();
});

test('planets & ships loaded', async()=>{
    // test navigating and planet/ship elements

    const { testInstance } = await import('./testHelpers.jsx');
    const inst = await testInstance();

    const planets = inst.OuterSpace2.planets.map(planet => planet.name);
    async function allPlanetsExist(){
        await Promise.all([
            ...planets.map(async (name) => {
                expect(await inst.textElement(name)).toBeInTheDocument();
            }),
        ]);
    }
    console.log(planets);

    inst.goto('planets');
    await allPlanetsExist();


    const ships = inst.OuterSpace2.spacecrafts.map(ship => ship.name);
    async function allShipsExist(){
        await Promise.all([
            ...ships.map(async (name) => {
                expect(await inst.textElement(name)).toBeInTheDocument();
            })
        ]);
    }
    console.log(ships);

    inst.goto('flights');
    await inst.wait(0.7);
    await allPlanetsExist();
    await allShipsExist();

    inst.goto('ships');
    await inst.wait(0.7);
    await allShipsExist();
});

test('ship lifecycle', async()=>{
    // create, move, destroy

    // go to the ship list page...
    const { testInstance } = await import('./testHelpers.jsx');
    const inst = await testInstance();
    inst.goto('ships');
    await inst.wait(0.7);

    // this ship doesnt exist yet
    expect(inst.checkForText('Prototype_Ship')).not.toBeInTheDocument();
    inst.clickBtn('create new');
    await inst.wait(0.7);

    // search for header
    expect(await inst.textElement('🚀 Create a new ship!')).toBeInTheDocument();
    
    // now confirmed to be in the ship creation forum
    const fillin={
        name: 'Prototype_Ship',
        capacity: 789,
        description: 'testing ship...'
    }
    Object.entries(fillin).forEach(([index, value])=>{
        inst.editText(index, value);
    });
    inst.clickBtn('Create Ship');
    await inst.wait(3.5); // wait extra for it to create...

    // back at the ship list page
    expect(inst.assertText('Prototype_Ship')).toBeInTheDocument();

    inst.clickBtn('Prototype_Ship');
    await inst.wait(0.7);
    // now in the ship details page, search for the description and capacity
    expect(inst.assertText('Prototype_Ship')).toBeInTheDocument();
    expect(inst.assertText('789')).toBeInTheDocument();
    expect(inst.assertText('testing ship...')).toBeInTheDocument();

    inst.goto('flights');
    await inst.wait(0.7);

    const OuterSpace2 = inst.OuterSpace2;
    const pop1 = OuterSpace2.getPlanetByName('Jupiter').currentPopulation;

    // proto ship starts at Earth
    // fly proto ship from Earth to Jupiter
    // Jupiter should have a population increase
    inst.clickBtn('Prototype_Ship');
    await inst.wait(0.2);
    inst.clickBtn('Jupiter');
    await inst.wait(3.5); // wait extra for ship to fly...
    const pop2 = OuterSpace2.getPlanetByName('Jupiter').currentPopulation;
    expect(pop2 > pop1).toBeTruthy();

    // go the ship's description page and scrap it
    inst.goto('ships');
    await inst.wait(0.7);
    inst.clickBtn('Prototype_Ship');
    await inst.wait(0.7);
    inst.clickBtn('Scrap');
    await inst.wait(3);

    // back at the ship list page, it should be removed
    expect(inst.checkForText('Prototype_Ship')).not.toBeInTheDocument();

}, 20000); // allow up to 20 sec
