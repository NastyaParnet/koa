const data = require('../data');

const genreController = () => {
  const genres = data.reduce(function(acc, book){
    if(!acc.includes(book.genre)) {
      acc.push(book.genre);
    }
    return acc;
  }, [])
  return genres;
}

module.exports = genreController;