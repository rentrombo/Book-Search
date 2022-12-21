const inquirer = require('inquirer');
const{clearConsole} = require('./clear')
const {readingList} = require('./reading-list');
const search = require('./search');
const {errorColor} = require('./colors');

const start = [
    {
       type: 'list',
       name: 'choice',
       message: 'Take me to...',
       choices: [
        {name: 'Book Search', value: 'search'},
        {name: 'Reading List', value: 'list'},
       ]
    },
    {
        type:'input',
        name: 'searchQuery',
        message: 'Search for a keyword: ',
        when(answers) {
            return answers.action ==='search';

        },
    },
];
const booksearch = async () => {
    clearConsole();
    try{
        let exit = false;
        while(!exit){
            const nextMove = await inquirer.prompt(start);

            const {action, searchQuery} = nextMove;

            switch(action) {
                case 'search':
                    await search(searchQuery);
                    break;
                case'list':
                    console.log('\n');
                    readingList();
                    break;
                default:
                    console.log('Please make a selection form the options.');


            }
        }
    } catch (error){
        throw new Error(errorColor(error));
    }
};

module.exports = booksearch;