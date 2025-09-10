import { parseCSV } from "./basic-parser";
import {z} from "zod";
/*
  Example of how to run the parser outside of a test suite.
*/

const DATA_FILE = "./data/event.csv"; // update with your actual file name
/**
 * name,city,length,capacity
Riverwalk,Boston,1200,300
Sunset Pier,San Francisco,850,200
Grand Hall,New York,500,1200
Cedar Bridge,Portland,230,80
Maple Arena,Chicago,650,900
 */

async function main() {
  const EventSchema = z.tuple([
    z.string(),
    z.string(),
    z.coerce.number(),
    z.coerce.number()
  ]).transform(tup => ({name: tup[0], city: tup[1], length: tup[2], capacity: tup[3]}));
  // Because the parseCSV function needs to "await" data, we need to do the same here.

  const results = await parseCSV(DATA_FILE, EventSchema);

  // Notice the difference between "of" and "in". One iterates over the entries, 
  // another iterates over the indexes only.
  for(const record of results)
    console.log(record)
  for(const record in results)
    console.log(record)
}

main();