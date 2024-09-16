const data = require('../data');

const authorController = () => {
  const authors = data.reduce(function(acc, book){
    if(!acc.includes(book.author)) {
      acc.push(book.author);
    }
    return acc;
  }, [])
  return authors;
}

module.exports = authorController;