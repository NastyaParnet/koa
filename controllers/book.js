const data = require('../data');

const fieldByParam = {
  'year': 'publicationYear',
  'price': 'price',
}

const funcByTypeFilter = {
  'lte': (field, value) => (book) => (book[field] <= value),
  'gte': (field, value) => (book) => (book[field] >= value),
}

const bookController = (params) => {
  if(!Object.keys(params).length) return data;
  const fieldForFilter = fieldByParam[params.filter];
  const funcForFilter = funcByTypeFilter[params.type](fieldForFilter, +params.value);
  return data.filter(funcForFilter);
}

module.exports = bookController;