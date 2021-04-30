const chalk = require('chalk');
const fetch = require('node-fetch');
const readline = require('readline');
const red = chalk.bold.red;
const green = chalk.bold.green;

const link = "http://localhost:3000";

// Get data from the server
async function getData() {
    await fetch(`${link}/info`)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => console.log(red("Server is offline!")));
}

// Post data to the server
async function postData(body) {
    await fetch(`${link}/add`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        }).catch((err) => console.log(red("Server is offline!")));
}

const showMenu = function () {
    console.log(green("\nMENU:"));
    console.log("0.- Exit");
    console.log("1.- Get TODOs from the server");
    console.log("2.- Add new TODO to the server\n");
};

let code;

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function readCodeAndExecute() {
    showMenu();

    rl.question('Enter the code of the action: ', async (answer) => {
        if (isNaN(answer)) {
            console.log(red("The code is not a number!"));
            readCodeAndExecute();
            return;
        }
        code = parseInt(answer);

        if (code === 1) {
            await getData();
            readCodeAndExecute();
        } else if (code === 2) {
            const todo = {
                name: "??",
                description: "??"
            };

            rl.question("Name: ", (answer) => {
                todo.name = answer;
                rl.question("Description: ", async (answer) => {
                    todo.description = answer;
                    await postData(todo);
                    readCodeAndExecute();
                });
            });

        } else if (code === 0) {
            console.log("Bye! :)");
            rl.close();
        } else {
            console.log(red("The code is not in the range. See the menu!"));
            readCodeAndExecute();
        }
    });
}


readCodeAndExecute();