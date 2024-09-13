function mysteryOperation ()
{
    const outcome = Math.random(); // Generates a random number between 0 and 1.


    if (outcome < 0.5)
    {
        console.log("The operation is completed successfully!");
    }
    else
    {
        throw new Error("The operation is failed mysteriously!");
    }
}


// Aaron Binay
// 7/31/2024


console.log("");
// node "C:\Users\gdeve\Downloads\detective.js\detective.js"
for (let i = 1; i < 21; i++) {
    console.log("Mission "+i.toString()+":");
    try {
        // Code that might throw an error
        let result = mysteryOperation();
        console.log("Boss: Congrats, 13 days paid time off!");
    } catch (error) {
        console.error("An error occurred:", error.message);
        console.log("Boss: I'm sorry about that. Only one day paid time off.");
    } finally {
        console.log("Detective: May I please have this whole year off?");
    }
    console.log("");
}

