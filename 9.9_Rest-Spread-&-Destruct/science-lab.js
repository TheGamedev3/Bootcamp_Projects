

// use "node science-lab.js" to run this script


/* Task 1: Compile Participant Details with Shorthand Property Names */
// TODO: Construct an object named `participant` with properties for `name`, `age`, and `studyField`. Utilize shorthand property names to simplify your code.
const participant = {name:'Uno', age:1, studyField:null}

/* Task 2: Implement a Shorthand Function for Participant Info */
// TODO: Copy the `participant` object by adding a shorthand method named `displayInfo` that prints the participant's details using `this` and a template string.
const participant2 = {
    name:'Dos',
    age:2,
    studyField:null,
    displayInfo(){console.log(this.name+"'s data:", this)}
}
participant2.displayInfo();

/* Task 3: Implement a Same Shorthand Arrow Function for Participant Info */
// TODO: Echo the above task with an arrow function. Observe the behavior of `this` and explain your findings.

const participant3 = {
    name:'Tres',
    age:3,
    studyField:null,
    displayInfo:()=>{console.log(this.name+"'s data:", this)}
}
participant3.displayInfo();
/*
 * Observations:
 * "this" fails to reference the correct object because with arrow functions, it isn't binded to the object, but rather the "this" from where it was called from
 */

/* Task 4: Using Computed Property Names */
// TODO: Implement a function named `updateParticipantInfo` that takes a property name and value as arguments alongside an object and returns a new object with that property dynamically set.
function updateParticipantInfo(object, name, value){
    const newObject = {...object, [name]:value}
    return newObject;
}
console.log("before:",participant2,"after:",updateParticipantInfo(
    participant2,
    'name', 'Two'
));


/*

Terminal Output:
> node science-lab.js

Dos's data: {
  name: 'Dos',
  age: 2,
  studyField: null,
  displayInfo: [Function: displayInfo]
}
undefined's data: {}
before: {
  name: 'Dos',
  age: 2,
  studyField: null,
  displayInfo: [Function: displayInfo]
} after: {
  name: 'Two',
  age: 2,
  studyField: null,
  displayInfo: [Function: displayInfo]
}

*/