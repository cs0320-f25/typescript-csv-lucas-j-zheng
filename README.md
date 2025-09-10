# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

Commas inside of quotes in the csv are split when they shouldn't be. This leads to being unable to have quoted fields with commas

Empty cells are returned as empty strings, cells with empty strings should be returned as empty strings, not empty cells which should be null

Quotes in cells can be multiple lines, in those cases the line splitting should not read 1 line per, instead it should read the multi line quote as a single cell.

Extensibility:

The function could ask the caller if there is a header row. That would be helpful since then the data could accurately be parsed where header is possibly treated differently

Ability to parse certain # of lines in a csv or parse lines until a certain cell in a row would be nice in case you're looking for something or parsing a specific amount.

- #### Step 2: Use an LLM to help expand your perspective.

Functionality:

Having different delimiters other than commas for parsing. (For other regions or use cases)

Type casting, converting strings to numbers, strings to booleans when needed.

Extensibility

Reverse support too, from object/arrays into CSVs -- reverse parsing would be helpful as a tool to store data

Export functionality (convert) into tensors or NumPY arrays


- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    1. Having different delimiters other than commas (LLM) Functionality
    2. Commas inside of quotes being kept (not splitting on those commas) (Me and LLM) Functionality
    3. Empty cells returned as null but empty strings returned as empty strings (me) Functionality
    4. Reverse support too, from object/arrays into CSVs -- reverse parsing would be helpful as a tool to store data (LLM) Extensibility

    My initial ideas are above in step 1. The LLM suggested the ones in step 2. The results differed when I prompted specifically for different use cases. I prompted to ask for a parser that works well for parsing ML training data & it mentioned specific tensor/numpy functionality and type casting needs. But generally, it gave more broad answers that weren't as helpful. I really liked the 2 I put in my step 3 (1,4). Different delimiters is a great idea to make it a more all-encompassing parser and also the reverse support is a great idea. It mentioned something about different types of newlines for operating systems/computers -- i didn't really understand that.

    As a user of the application I am able to use delimiters other than commas in case I am given data in that way, I am able to get the same information from csv or other types of delimiters.
    As a user of the application, I can put entire sentences with commas inside of quotes without it adversely affecting parsing.
    As a user of the application, I can give incomplete data and the parser labels the incomplete cells as null.
    As a user of the application, I can reverse parse, turn an object or array into a csv for storage.

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs: Issues with running parser. No npm run build like in gear up. Couldn't figure out how to run, checked package.json
#### Tests: Handling empty csv, extra whitespace, extra 
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI): Used to help generate part of event.csv for testing.
#### Total estimated time it took to complete project: 4 hours
#### Link to GitHub Repo: https://github.com/cs0320-f25/typescript-csv-lucas-j-zheng
