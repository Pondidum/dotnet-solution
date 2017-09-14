import fs from 'fs'
import Solution from './solution'
import SolutionReader from './solutionReader'
import SolutionWriter from './solutionWriter'

const linesOf = name =>
  fs
    .readFileSync(`./test-data/${name}.sln`)
    .toString()
    .split(/\r?\n/)

it('should read and write an existing solution with no changes', () => {
  const sourceLines = linesOf('complete')
  const lines = []

  const reader = new SolutionReader()
  const writer = new SolutionWriter(line => lines.push(line))

  const solution = reader.fromLines(sourceLines)
  writer.write(solution)

  expect(lines).toEqual(sourceLines)
})
