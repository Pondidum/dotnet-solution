import solution from './solution'
import fs from 'fs'

const linesOf = name =>
  fs
    .readFileSync(`./test-data/${name}.sln`)
    .toString()
    .split(/\r?\n/)

it('should be able to output a blank solution file', () => {
  const lines = []
  const writer = {
    writeLine: line => lines.push(line)
  }

  solution.writeTo(writer)

  expect(lines).toEqual(linesOf('blank'))
})

it('should write a single project to the solution file', () => {
  const lines = []
  const writer = {
    writeLine: line => lines.push(line)
  }

  solution.addProject({
    id: '3F5F5B05-7B61-43BF-9217-7E2005FAEF68',
    name: 'ProjectUnderRoot',
    path: 'ProjectUnderRoot\\ProjectUnderRoot.csproj'
  })
  solution.writeTo(writer)

  expect(lines).toEqual(linesOf('oneProject'))
})
