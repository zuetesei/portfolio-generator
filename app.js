const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'Name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'Github:',
            message: 'Enter your GitHub Username:'
        },
        {
            type: 'input', 
            name: 'About:',
            message: 'Provide some information about yourself.'
        }
    ]);
};

// promptUser().then (answers => console.log(answers));

const promptProject = (portfolioData) => {
    
    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
    portfolioData.projects = [];
    }

    console.log (`
    =================
    Add a New Project
    ================= 
    `);

    return inquirer.prompt([
        {
            type: 'input',
            name: 'Name:',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'Description:',
            message: 'Provide a description of the project (Required)'
        },
        {
            type: 'checkbox',
            name: 'Languages:',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'Link:',
            message: 'Enter the Github link to your project. (Required)'
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])

    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });
   
// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);


// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output.');
// });