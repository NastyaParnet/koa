const http = require("http");
const request = require("supertest");
const app = require("../app.js");
const data = require("../data.js");

console.log("Tests are started.");

const authors = [
  "F. Scott Fitzgerald",
  "Harper Lee",
  "J.R.R. Tolkien",
  "J.K. Rowling",
  "George Orwell",
  "Jane Austen",
  "J.D. Salinger",
  "Dan Brown",
  "Aldous Huxley",
  "C.S. Lewis",
  "Stephen King",
  "Paulo Coelho",
  "Herman Melville",
  "Cormac McCarthy",
  "Arthur Conan Doyle",
  "Homer",
  "Robert Frost",
  "Stieg Larsson",
  "Ernest Hemingway",
].sort();

const genres = [
  "Fiction",
  "Fantasy",
  "Dystopian",
  "Romance",
  "Coming of Age",
  "Mystery",
  "Horror",
  "Adventure",
  "Post-Apocalyptic",
  "Epic Poetry",
  "Poetry",
].sort();

const filterBooks = {
  "/book?filter=price&type=lte&value=7": [
    {
      id: 18,
      title: "The Road Not Taken",
      author: "Robert Frost",
      genre: "Poetry",
      price: 6.99,
      publicationYear: 1916,
    },
  ],
  "book?filter=price&type=lte&value=3": [],
  "/book?filter=price&type=gte&value=10": [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      price: 12.99,
      publicationYear: 1925,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      price: 10.49,
      publicationYear: 1960,
    },
    {
      id: 3,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      price: 14.99,
      publicationYear: 1937,
    },
    {
      id: 5,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      price: 11.99,
      publicationYear: 1949,
    },
    {
      id: 8,
      title: "The Da Vinci Code",
      author: "Dan Brown",
      genre: "Mystery",
      price: 13.49,
      publicationYear: 2003,
    },
    {
      id: 9,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      price: 19.99,
      publicationYear: 1954,
    },
    {
      id: 10,
      title: "Brave New World",
      author: "Aldous Huxley",
      genre: "Dystopian",
      price: 10.99,
      publicationYear: 1932,
    },
    {
      id: 11,
      title: "The Chronicles of Narnia",
      author: "C.S. Lewis",
      genre: "Fantasy",
      price: 15.99,
      publicationYear: 1950,
    },
    {
      id: 12,
      title: "The Shining",
      author: "Stephen King",
      genre: "Horror",
      price: 12.49,
      publicationYear: 1977,
    },
    {
      id: 14,
      title: "Moby-Dick",
      author: "Herman Melville",
      genre: "Adventure",
      price: 11.99,
      publicationYear: 1851,
    },
    {
      id: 15,
      title: "The Road",
      author: "Cormac McCarthy",
      genre: "Post-Apocalyptic",
      price: 14.49,
      publicationYear: 2006,
    },
    {
      id: 17,
      title: "The Odyssey",
      author: "Homer",
      genre: "Epic Poetry",
      price: 10.99,
      publicationYear: -800,
    },
    {
      id: 19,
      title: "The Girl with the Dragon Tattoo",
      author: "Stieg Larsson",
      genre: "Mystery",
      price: 11.99,
      publicationYear: 2005,
    },
  ],
  "/book?filter=year&type=gte&value=2005": [
    {
      id: 15,
      title: "The Road",
      author: "Cormac McCarthy",
      genre: "Post-Apocalyptic",
      price: 14.49,
      publicationYear: 2006,
    },
    {
      id: 19,
      title: "The Girl with the Dragon Tattoo",
      author: "Stieg Larsson",
      genre: "Mystery",
      price: 11.99,
      publicationYear: 2005,
    },
  ],
  "/book?filter=year&type=lte&value=1900": [
    {
      id: 6,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      price: 8.99,
      publicationYear: 1813,
    },
    {
      id: 14,
      title: "Moby-Dick",
      author: "Herman Melville",
      genre: "Adventure",
      price: 11.99,
      publicationYear: 1851,
    },
    {
      id: 16,
      title: "Sherlock Holmes: A Study in Scarlet",
      author: "Arthur Conan Doyle",
      genre: "Mystery",
      price: 8.99,
      publicationYear: 1887,
    },
    {
      id: 17,
      title: "The Odyssey",
      author: "Homer",
      genre: "Epic Poetry",
      price: 10.99,
      publicationYear: -800,
    },
  ],
};
let koaApp;

beforeEach(() => {
  koaApp = http.createServer(app.callback()).listen(3000);
});

afterEach(() => {
  koaApp.close();
});

describe("Books list", () => {
  test("GET /book", async () => {
    const resp = await request(koaApp).get("/book");

    expect(resp.text).toEqual(JSON.stringify(data));
  });
});

describe("Authors list", () => {
  test("GET /author", async () => {
    const resp = await request(koaApp).get("/author");
    const respAuthors = JSON.parse(resp.text).sort();
    expect(respAuthors).toEqual(authors);
  });
});

describe("Genres list", () => {
  test("GET /genre", async () => {
    const resp = await request(koaApp).get("/genre");
    const respGenres = JSON.parse(resp.text).sort();
    expect(respGenres).toEqual(genres);
  });
});

describe("Book filter list", () => {
  const urlTest1 = "/book?filter=price&type=lte&value=7";
  test(`GET ${urlTest1}`, async () => {
    const resp = await request(koaApp).get("/book").query({
      filter: "price",
      type: "lte",
      value: 7,
    });

    const respBooks = JSON.parse(resp.text).sort();
    expect(respBooks).toEqual(filterBooks[urlTest1]);
  });

  const urlTest2 = "book?filter=price&type=lte&value=3";
  test(`GET ${urlTest2}`, async () => {
    const resp = await request(koaApp).get("/book").query({
      filter: "price",
      type: "lte",
      value: 3,
    });

    const respBooks = JSON.parse(resp.text).sort();
    expect(respBooks).toEqual(filterBooks[urlTest2]);
  });

  const urlTest3 = "/book?filter=price&type=gte&value=10";
  test(`GET ${urlTest3}`, async () => {
    const resp = await request(koaApp).get("/book").query({
      filter: "price",
      type: "gte",
      value: 10,
    });

    const respBooks = JSON.parse(resp.text).sort();
    expect(respBooks).toEqual(filterBooks[urlTest3]);
  });

  const urlTest4 = "/book?filter=year&type=gte&value=2005";
  test(`GET ${urlTest4}`, async () => {
    const resp = await request(koaApp).get("/book").query({
      filter: "year",
      type: "gte",
      value: 2005,
    });

    const respBooks = JSON.parse(resp.text).sort();
    expect(respBooks).toEqual(filterBooks[urlTest4]);
  });

  const urlTest5 = "/book?filter=year&type=lte&value=1900";
  test(`GET ${urlTest5}`, async () => {
    const resp = await request(koaApp).get("/book").query({
      filter: "year",
      type: "lte",
      value: 1900,
    });

    const respBooks = JSON.parse(resp.text).sort();
    expect(respBooks).toEqual(filterBooks[urlTest5]);
  });
});
