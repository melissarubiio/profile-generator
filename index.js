// node modules
const inquirer = require('inquirer');
const fs = require('fs');

// generated HTML link
const generateHTML= require('./src/boilerplate');

// team profiles
const Manager = require('./lib/Manager');
//const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 
const Engineer = require('./lib/Engineer');

// array of teams
const teamArr = [];

// prompt
const addManager = () => {
    inquirer.prompt ([
        {
            message: 'Who is the manager of this team?',
            name: 'name',
            type: 'input'
        },
        {
            message: 'ID',
            name: 'id',
            type: 'input'
        },
        {
            message: 'EMAIL',
            name: 'email',
            type: 'input'
        },
        {
            message: 'OFFICE NUMBER',
            name: 'officeNumber',
            type: 'input'
        }
    ]).then(answer =>{
        const {name, id, email, officeNumber} = answer
        const newManager = new Manager (name, id, email, officeNumber)
        teamArr.push(newManager)
        askAgain()
    })
}
const addIntern = () => {
    inquirer.prompt ([
        {
            message: 'Who is the intern of this team?',
            name: 'name',
            type: 'input'
        },
        {
            message: 'ID',
            name: 'id',
            type: 'input'
        },
        {
            message: 'EMAIL',
            name: 'email',
            type: 'input'
        },
        {
            message: 'SCHOOL',
            name: 'school',
            type: 'input'
        }
    ]).then(answer =>{
        const {name, id, email, school} = answer
        const newIntern = new Intern (name, id, email, school)
        teamArr.push(newIntern)
        askAgain()
    })
}

const addEngineer = () => {
    inquirer.prompt ([
        {
            message: 'Who is the engineer of this team?',
            name: 'name',
            type: 'input'
        },
        {
            message: 'ID',
            name: 'id',
            type: 'input'
        },
        {
            message: 'EMAIL',
            name: 'email',
            type: 'input'
        },
        {
            message: 'GITHUB',
            name: 'github',
            type: 'input'
        }
    ]).then(answer =>{
        const {name, id, email, github} = answer
        const newEngineer = new Engineer (name, id, email, github)
        teamArr.push(newEngineer)
        askAgain()
    })
}

//writes the html file to the dist folder
function writeFile(answers) {
    fs.writeFile('./dist/index.html', answers, (err) => {
        err ? console.error(err) : console.log('***Your webpage has been generated!***')
    });
};

function askAgain(){
    inquirer.prompt({
        message:"do you want to add another employee?",
        type: "confirm",
        name:"again"
    }).then(
        answer =>{


            if(answer.again){
                inquirer.prompt(
                {message: "which employee you want to add?",
                type: "list",
                choices: ["manager", "engineer", "intern"],
                name:"choice"
            }
                ).then(
                    answer=>{
                        switch(answer.choice){
                            case "manager": return addManager();
                            case "engineer": return addEngineer();
                            case "intern": return addIntern();
                            default: return
                        }
                    }


    
                )
           //}else{console.log(teamArr)}
            }else{writeFile(generateHTML(teamArr))};
        }
    )
}

//askAgain();
addManager();