## Description

All data is in the data.js file.
The task is to implement the server using koa.js. 
Only GET methods are used

**Routes** are required:
- ***/genre*** - return a list of unique book genres from data.js
- ***/author*** - return a list of unique authors of books from data.js
- ***/book*** - return a list of all books. The book route has additional features:
  - *filter* attribute. Possible values: *[year, price]*.
  - *type* attribute. Possible values: *[gte, lte]*. *gte* - greater than or equal to, *lte* - less than or equal to
  - *value* attribute. Possible values: *numbers*
  

The condition for completing the task is successfully passed tests

## Examples

| **Request** | **Response : Text** |
|--|--|
| /book | '[array of all books objects]' |
| /book?filter=year&type=lte&value=1000 | '[{"id":17,"title":"The Odyssey","author":"Homer","genre":"Epic Poetry","price":10.99,"publicationYear":-800}]' |
| /book?filter=year&type=gte&value=2006 | '[{"id":15,"title":"The Road","author":"Cormac McCarthy","genre":"Post-Apocalyptic","price":14.49,"publicationYear":2006}]'|
| /book?filter=year&type=gte&value=2005 | '[{"id":15,"title":"The Road","author":"Cormac McCarthy","genre":"Post-Apocalyptic","price":14.49,"publicationYear":2006},{"id":19,"title":"The Girl with the Dragon Tattoo","author":"Stieg Larsson","genre":"Mystery","price":11.99,"publicationYear":2005}]' |
| /book?filter=price&type=gte&value=20 | '[]' |
| /book?filter=price&type=gte&value=15 | '[{"id":9,"title":"The Lord of the Rings","author":"J.R.R. Tolkien","genre":"Fantasy","price":19.99,"publicationYear":1954},{"id":11,"title":"The Chronicles of Narnia","author":"C.S. Lewis","genre":"Fantasy","price":15.99,"publicationYear":1950}]' |
| /book?filter=price&type=lte&value=7 |'[{"id":18,"title":"The Road Not Taken","author":"Robert Frost","genre":"Poetry","price":6.99,"publicationYear":1916}]' |
| /genre | '["Fiction","Fantasy","Dystop... all unique genres]'|
| /author | '["F. Scott Fitzgerald","Harper Lee","J.R.R... all unique authors]' |

