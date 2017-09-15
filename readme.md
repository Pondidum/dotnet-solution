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

## Methods

### SolutionReader

* `Solution fromLines(lines[])`

  Parses a solution file's lines into a `Solution` object.

  ```javascript
  const sourceLines = fs
    .readFileSync(`./test-data/Complete.sln`)
    .toString()
    .split(/\r?\n/)
  const solution = reader.fromLines(sourceLines)
  ```

### SolutionWriter

* `lines[] write(Solution)`

  Writes a `Solution` out as an array of lines.

  ```javascript
  const lines = writer.write(solution)
  fs.writeFileSync(`./test-data/Complete.sln`, lines.join('\r\n'))
  ```

### Solution

* `object[] getFolders()`

  Returns an array of folders in the solution.

  ```javascript
  const folders = solution.getFolders()

  /*
  [
    {
      id: '93E2EDB0-2AB9-4A5E-A8BD-658CAD43C2B7',
      name: 'Parent',
      path: 'Parent'
    },
    {
      id: 'E2939C1D-DE3E-4455-88D6-CBA711FE1FAD',
      name: 'ChildOne',
      path: 'ChildOne',
      parent: 'Parent'
    }
  ]
  */
  ```


* `object[] getProjects()`

  Returns an array of projects in the solution.

  ```javascript
  const projects = solution.getProjects()

  /*
  [
    {
      id: '7EC623E8-DE59-4A2C-AD1F-333F2E54AECA',
      name: 'ProjectUnderParent',
      path: 'ProjectUnderParent\\ProjectUnderParent.csproj',
      parent: 'Parent'
    }
  ]
  */
  ```

* `void addFolder({ id, name, path, parent })`

  Adds a folder to the solution. `parent` is optional, and can either be the `id` or the `name` of another folder in the solution.

  ```javascript
  solution.addFolder({
    id: '93E2EDB0-2AB9-4A5E-A8BD-658CAD43C2B7',
    name: 'Parent',
    path: 'Parent'
  })
  ```


* `void addProject({ id, name, path, parent })`

  Adds a project to the solution. `parent` is optional, and can either be the `id` or the `name` of a folder in the solution.

  ```javascript
  solution.addProject({
    id: '7EC623E8-DE59-4A2C-AD1F-333F2E54AECA',
    name: 'ProjectUnderParent',
    path: 'ProjectUnderParent\\ProjectUnderParent.csproj',
    parent: 'Parent'
  })
  ```
