const axios = require('axios');
const { removeBoundaryQuotes, formatBookOutput } = require('./clear');
const { warningColor } = require('./colors');

const getBooks = async searchQuery => {
  try {
    const fields = 'items(id,volumeInfo(title,authors,publisher))';

    const _response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: searchQuery,
        startIndex: 0,
        maxResults: 5,
        fields,
      },
    });

    const response = _response.data.items;
    if (response) {
      const books = response.map(book => {
        const { volumeInfo } = book;

        volumeInfo.publisher = volumeInfo.publisher
          ? removeBoundaryQuotes(volumeInfo.publisher)
          : volumeInfo.publisher;

        return volumeInfo;
      });
      return books;
    }

    console.log(warningColor('\nNo results, try again.\n'));
    return [];
  } catch (error) {
    console.error(warningColor(error));
  }
};

const bookChoices = results => {
  const formatted = results.map(book => {
    const { title } = book;
    const name = formatBookOutput(book);
    return {
      name,
      value: title,
      short: title,
    };
  });
  return formatted;
};

module.exports = {
  getBooks,
  bookChoices,
};