const accounts = [
    {id: 1, owner: "Alice", balance: 500},
    {id: 2, owner: "Bob", balance: 300}
];


function getAccountById (id)
{
    if (!(typeof amount === "number") && !Number.isInteger(id)){throw new Error("Not an integer");}
    for (const account of accounts)
    {
        if (account.id == id)
        {
            return account;
        }
    }
}


function createAccount (newAccountId, newAccountOwner)
{
    if (!(typeof amount === "number") && !Number.isInteger(newAccountId)){throw new Error("Not an integer");}
    if (newAccountId <= 0){throw new Error("Invalid ID");} // Each account has the ID (positive integer)
    if (String(newAccountOwner).replace(/\s+/g, '') == ""){throw new Error("Invalid Owner Name");}// the owner (non-empty string)
    accounts.push(
        {
            id: newAccountId,
            owner: newAccountOwner,
            balance: "0"
        }
    );
}


function depositMoney (accountId, amount)
{
    const account = getAccountById(accountId);


    if (!account)
    {
        throw new Error("Account not found");
    }
    if (amount <= 0){throw new Error("Zero or Negative Deposit");} // Account holders can deposit money to their accounts if the amount to be deposited is greater than 0, of course!
    // eslint-disable-next-line no-constant-condition, no-constant-binary-expression
    if (!(typeof amount === "number")){throw new Error("Not a number");}
    if (!Number.isFinite(amount)){throw new Error("Deposit must be finite");}


    account.balance += amount;
}


function withdrawMoney (accountId, amount)
{
    const account = getAccountById(accountId);


    if (!account)
    {
        throw new Error("Account not found.");
    }


    if (!(typeof amount === "number")){throw new Error("Not a number");}
    if (amount <= 0){throw new Error("Zero or Negative Withdraw");} // Account holders can withdraw money from their accounts with their ID if the amount to be withdrawn is greater than 0, of course!


    if (!Number.isFinite(amount))
    {
        throw new Error("Invalid value for withdrawal amount: The amount must be a finite number.");
    }


    account.balance -= amount;
}


function transferMoney (fromAccountId, toAccountId, amount)
{
    const fromAccount = getAccountById(fromAccountId);
    const toAccount = getAccountById(toAccountId);


    if (!fromAccount)
    {
        throw new Error("Source account not found.");
    }
    if (!toAccount){throw new Error("Destination account not found.");}


    if (!(typeof amount === "number")){throw new Error("Not a number");}
    if (!Number.isFinite(amount) || amount <= 0)
    {
        throw new Error("Invalid value for transfer amount: The amount must be a positive finite number.");
    }


    // CHANGED LOGIC
    withdrawMoney (fromAccountId, amount);
    depositMoney (toAccountId, amount);
    //toAccount.balance += amount;
}


// node "C:\Users\gdeve\Downloads\Starter Code\Starter Code\rich-bank.js"


// Aaron Binay
// 7/31/2024


// Test Cases
if(true){


// getAccountById("1"); // Not an integer


createAccount(1, "Alice");
// createAccount("3", "Charlie"); // Not an integer
// createAccount(-3, "Charlie"); // Error Invalid ID
// createAccount(3, ["Charlie"]); // Type Error, Supposed to be String, not Array
// createAccount(3, ""); // Invalid Owner Name
// createAccount(3, "  "); // Invalid Owner Name


depositMoney(1, 300)
// depositMoney(1, "300") // Not a number
// depositMoney(1, -300) // Zero or Negative Deposit
// depositMoney(1, 0) // Zero or Negative Deposit
// depositMoney(1, Infinity) // Deposit must be finite
// depositMoney(4, 100) // Account not found


// withdrawMoney(1, -100) // Zero or Negative Withdraw
// withdrawMoney(1, 0) // Zero or Negative Withdraw
withdrawMoney(1, 501)


// transferMoney(1, 4, 100) // Destination account not found.
// transferMoney(1, 2, 501); // Zero or Negative Withdraw because Alice only has 300 dollars
transferMoney(1, 2, 100);
}


