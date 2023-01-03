const { removeBoundaryQuotes, formatBookOutput } = require('../src/utils');
const { titleColor, authorsColor, publisherColor } = require('../src/colors');

describe('removeBoundaryQuotes removes quotes from beginning and end of string', () => {
    const strings = [
      '"Remove my strings!"',
      "Don't remove my strings",
      "Don't remove 'my' strings",
      'Don\'t remove "my" strings either',
    ];

    const cleanStrings = [
        'Remove my strings!',
        "Don't remove my strings",
        "Don't remove 'my' strings",
        'Don\'t remove "my" strings either',
      ];
      
      it('removes first and last double quotes', () => {
        expect(removeBoundaryQuotes(strings[0])).toEqual(cleanStrings[0]);
      });
    
      it('does not remove single quotes', () => {
        expect(removeBoundaryQuotes(strings[1])).toEqual(cleanStrings[1]);
      });
    
      it('does not remove single quotes in middle of string', () => {
        expect(removeBoundaryQuotes(strings[2])).toEqual(cleanStrings[2]);
      });
    
      it('does not remove double quotes in middle of string', () => {
        expect(removeBoundaryQuotes(strings[3])).toEqual(cleanStrings[3]);
      });
    });

    describe('formatBookOutput correctly formats output for reading list and book choices', () => {
        const taleSearchResults = [
          {
            title: 'Tale of Two Cities',
            authors: ['Charles Dickens'],
            publisher: 'Little, Brown',
          },
          {
            title: 'Tale',
            authors: ['Charles Dickens'],
          },
          {
            title: 'Tale',
            publisher: "Chapman & Hall",
          },
          {
            title: 'Tale of Two Cities',
          },
        ];
        
        describe('correctly formats output for reading list', () => {
            const middot = String.fromCharCode(186);
            const desiredOutput = [
              `${middot} ${titleColor('Tale of Two Cities')}\n   by ${authorsColor(
                'Seth Charles Dickens',
              )}\n   published by ${publisherColor('Chapman & Hall')}\n`,
              `${middot} ${titleColor('Tale')}\n   by ${authorsColor('Charles Dickens')}\n`,
              `${middot} ${titleColor('Tale')}\n   published by ${publisherColor(
                "Chapman & Hall",
              )}\n`,
              `${middot} ${titleColor('Tale of Two Cities')}   \n`,
            ];

            it('where has title, authors and publisher', () => {
                expect(formatBookOutput(taleSearchResults[0], 'reading-list')).toEqual(desiredOutput[0]);
              });
          
              it('where has title and authors', () => {
                expect(formatBookOutput(taleSearchResults[1], 'reading-list')).toEqual(desiredOutput[1]);
              });
          
              it('where has title and publisher', () => {
                expect(formatBookOutput(taleSearchResults[2], 'reading-list')).toEqual(desiredOutput[2]);
              });
          
              it('where has title only', () => {
                expect(formatBookOutput(taleSearchResults[3], 'reading-list')).toEqual(desiredOutput[3]);
              });
            });

            describe('correctly formats output for book choices', () => {
                const desiredOutput = [
                  ` ${titleColor('Tale of Two Cities')}\n      by ${authorsColor(
                    'Charles Dickens',
                  )}, published by ${publisherColor('Chapman & Hall')}`,
                  ` ${titleColor('Tale')}\n      by ${authorsColor('Charles Dickens')}`,
                  ` ${titleColor('Tale')}\n      published by ${publisherColor("Chapman & Hall")}`,
                  ` ${titleColor('Tale of Two Cities')}      `,
                ];

                it('where has title, authors and publisher', () => {
                    expect(formatBookOutput(taleSearchResults[0])).toEqual(desiredOutput[0]);
                  });
              
                  it('where has title and authors', () => {
                    expect(formatBookOutput(taleSearchResults[1])).toEqual(desiredOutput[1]);
                  });
              
                  it('where has title and publisher', () => {
                    expect(formatBookOutput(taleSearchResults[2])).toEqual(desiredOutput[2]);
                  });
              
                  it('where has title only', () => {
                    expect(formatBookOutput(taleSearchResults[3])).toEqual(desiredOutput[3]);
                  });
                });
              });