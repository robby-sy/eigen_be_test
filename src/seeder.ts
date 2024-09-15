import { Book, Member } from "./infrastructure/sqlite";

const members = [
  {
    code: "M001",
    name: "Angga",
  },
  {
    code: "M002",
    name: "Ferry",
  },
  {
    code: "M003",
    name: "Putri",
  },
];

const books = [
  {
    code: "JK-45",
    title: "Harry Potter",
    author: "J.K Rowling",
    stock: 1,
  },
  {
    code: "SHR-1",
    title: "A Study in Scarlet",
    author: "Arthur Conan Doyle",
    stock: 1,
  },
  {
    code: "TW-11",
    title: "Twilight",
    author: "Stephenie Meyer",
    stock: 1,
  },
  {
    code: "HOB-83",
    title: "The Hobbit, or There and Back Again",
    author: "J.R.R. Tolkien",
    stock: 1,
  },
  {
    code: "NRN-7",
    title: "The Lion, the Witch and the Wardrobe",
    author: "C.S. Lewis",
    stock: 1,
  },
];

await Book.bulkCreate(
  books.map((el) => {
    return { ...el, id: el.code };
  }),
  { updateOnDuplicate: ["author", "stock", "title"] }
);
await Member.bulkCreate(
  members.map((el) => {
    return { ...el, id: el.code };
  })
);
console.log("Seeder Complete");
