
// Aaron Binay
// 8/30/2024

let favoriteNumber = 87

// Part 1
async function part1(number){
    let factAbout87 = await $.getJSON("http://numbersapi.com/"+number.toString()+"?json");
    return factAbout87;
}
console.log(part1(favoriteNumber));

// Part 2
async function part2(){
    let A = 3; let B = 5;
    let twoNumbers = await $.getJSON("http://numbersapi.com/"+A.toString()+","+B.toString()+"?json");
    console.log(twoNumbers);
}
part2();

// Part 3
async function part3(){
    let promises = [part1(favoriteNumber), part1(favoriteNumber), part1(favoriteNumber), part1(favoriteNumber)];
    let facts = await Promise.all(promises);
    facts.forEach(data => {
        $('body').append(`<p>${data.text}</p>`);
    });
}
part3();