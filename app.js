const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'Name',
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true; 
                } else {
                    console.log ('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'Github Username:',
            message: 'Enter your GitHub Username:',
            validate: githubUserInput => {
                if (githubUserInput) {
                    return true;
                } else {
                    console.log ('Please enter your GitHub username!');
                    return false;
                }
            }

        },
        {
            type: 'confirm', 
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
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
            name: 'Project Name:',
            message: 'What is the name of your project?',
            validate: projectName => {
                if (projectName) {
                    return true;
                } else {
                    console.log ('Please enter your Project Name!');
                    return false;
                }
            }
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
            name: 'GitHub Link:',
            message: 'Enter the Github link to your project. (Required)',
            validate: projectGithubLink => {
                if (projectGithubLink) {
                    return true;
                } else {
                    console.log ('Please enter your Project GitHub Link!');
                    return false;
                }
            }
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