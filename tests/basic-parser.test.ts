import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const SENTENCES_CSV_PATH = path.join(__dirname, "../data/sentences.csv");
const EMPTY_CSV_PATH = path.join(__dirname, "../data/empties.csv");
const EMPTY_FILE_CSV_PATH = path.join(__dirname, "../data/empty_file.csv");
const SPACE_TRIMMING_CSV_PATH = path.join(__dirname, "../data/spaces.csv");
const EVENT_CSV_PATH = path.join(__dirname, "../data/event.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, undefined)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, undefined)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV handles commas in quotes", async () => {
  /**  Sentences csv:
   * writer,sentence,reader
    John,"I am hungry, and I am tired",Jerry
    Priscilla,"Hmm, what is the time?",Sam
  */
  const results = await parseCSV(SENTENCES_CSV_PATH, undefined)

  expect (results).toHaveLength(3);
  expect(results[0]).toEqual(["writer","sentence","reader"]);
  expect(results[1]).toEqual(["John","I am hungry, and I am tired","Jerry"]);
  expect(results[2]).toEqual(["Priscilla","Hmm, what is the time?","Sam"]);
});

test("parseCSV handles empty lines and empty columns", async () => {
  /**  Empties csv:
   * name,age
    Alice,23

    Bob,thirty
    Charlie,
    ,22
  */
  const results = await parseCSV(EMPTY_CSV_PATH, undefined)
  expect (results).toHaveLength(5);
  expect(results[0]).toEqual(["name","age"]);
  expect(results[1]).toEqual(["Alice","23"]);
  expect(results[2]).toEqual(["Bob","thirty"]);
  expect(results[3]).toEqual(["Charlie",null]);
  expect(results[4]).toEqual([null,"22"]);
});

test("parseCSV handles space trimming", async () => {
  /**
   * name, age
  Alice , 23
  Bob, 30 
  Charlie ,  40
   */
  const results = await parseCSV(SPACE_TRIMMING_CSV_PATH, undefined)
  expect (results).toHaveLength(4);
  expect(results[0]).toEqual(["name","age"]);
  expect(results[1]).toEqual(["Alice","23"]);
  expect(results[2]).toEqual(["Bob","30"]);
  expect(results[3]).toEqual(["Charlie","40"]);
});
test("parseCSV handles empty file", async () => {
  const results = await parseCSV(EMPTY_FILE_CSV_PATH, undefined)
  expect (results).toHaveLength(0);
  expect(results).toEqual([]);
});

test("parseCSV with schema yields typed objects 1", async () => {
  const personSchema = z.tuple([
    z.string(), // name
    z.coerce.number(),]).transform( tup => ({name:tup[0], age:tup[1]}));

  const results = await parseCSV(PEOPLE_CSV_PATH, personSchema)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual({name: "name", age: NaN});
  expect(results[1]).toEqual({name: "Alice", age: 23});
  expect(results[2]).toEqual({name: "Bob", age: NaN}); 
  expect(results[3]).toEqual({name: "Charlie", age: 25});
  expect(results[4]).toEqual({name: "Nim", age: 22});
});

test("parseCSV with schema yields only typed objects 2", async () => {
  /**
   * 
The Hall,Boston,300,300
Pier 2324,San Francisco,200,200
Grand Central,New York,200,1200
Portland Arena,Portland,400,80

   */
const EventSchema = z.tuple([
    z.string(),
    z.string(),
    z.coerce.number(),
    z.coerce.number()
]).transform(tup => ({name: tup[0], city: tup[1], length: tup[2], capacity: tup[3]}));
  const results = await parseCSV(EVENT_CSV_PATH, EventSchema)
  for(const record of results) {
    expect(typeof record).toBe("object");
    expect(record).toHaveProperty("name");
    expect(record).toHaveProperty("city");
    expect(record).toHaveProperty("length");
    expect(record).toHaveProperty("capacity");
  }
  expect(results).toHaveLength(4);
  expect(results[0]).toEqual({name: "The Hall", city: "Boston", length: 300, capacity: 300});
  expect(results[1]).toEqual({name: "Pier 2324", city: "San Francisco", length: 200, capacity: 200});
  expect(results[2]).toEqual({name: "Grand Central", city: "New York", length: 200, capacity: 1200});
  expect(results[3]).toEqual({name: "Portland Arena", city: "Portland", length: 400, capacity: 80});
});