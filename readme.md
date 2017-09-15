# dotnet-solution
A model, reader and writer to manage Visual Studio Solution Files (`*.sln`)

## Installation

```
npm install --save dotnet-solution
```

## Usage

```javascript
import fs from 'fs'
import { Solution, SolutionReader, SolutionWriter } from 'dotnet-solution'

// create a reader, and build a solution from the lines
const reader = new SolutionReader()
const sourceLines = fs.readFileSync(`./test-data/Complete.sln`).toString().split(/\r?\n/)
const solution = reader.fromLines(sourceLines)

solution.addProject({
  'id': '6bb2e7ed-7bb3-4ec8-964f-f49eb849bdc7', // this is the same id as in the csproj
  'name': 'Crispin.Tests',
  'path': 'src/Crispin.Tests/Crispin.Tests.csproj', // relative to the solution location
  'parent': 'Tests' // the name or id of a folder to parent it to
})

// create a writer and write back to the same file
const writer = new SolutionWriter()
const lines = writer.write(solution)
fs.writeFileSync(`./test-data/Complete.sln`, lines.join('\r\n'))
```
