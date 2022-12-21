const inquirer = require('inquirer');
const { getBooks, bookChoices } = require('./books');
const { readingList } = require('./reading-list');
const { warningColor } = require('./colors');

const search = async query => {
  if (query) {
    const bookResults = await getBooks(query);

    if (bookResults.length) {
      const answerList = await inquirer.prompt({
        type: 'checkbox',
        name: 'addToList',
        message: `Search results for: ${"${query}"}. Select whch books you would like to add to your Reading List`,
        async choices() {
          return bookChoices(bookResults);
        },
      });

      if (answerList.addToList.length) {
        addToReadingList(bookResults,answerList.addToList);
      } else {
        console.log('\nNo books were added to your list.\n');
      }
    }
  } else {
    console.log(warningColor('\nPlease try again.\n'));
  }
};

module.exports = search;