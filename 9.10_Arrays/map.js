
// Aaron Binay
// 9/14/2024

const users = [
	{firstName: "Alice", lastName: "Johnson", points: 120},
	{firstName: "Bob", lastName: "Smith", points: 99},
	{firstName: "Charlie", lastName: "Brown", points: 180}
];

console.log(users.map((user) => {

    const {firstName, lastName, points} = user;
    user.fullName = firstName+" "+lastName;
    
    if(points > 100){
        user.membershipStatus = "Premium";
    }else{
        user.membershipStatus = "Standard";
    }

    return user;
}));