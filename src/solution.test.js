import solution from './solution'
import fs from 'fs'

const blankSolution = fs
  .readFileSync('./test-data/blank.sln')
  .toString()
  .split(/\r?\n/)

it('should be able to output a blank solution file', () => {
  const lines = []
  const writer = {
    writeLine: line => lines.push(line)
  }

  solution.writeTo(writer)

  expect(lines).toEqual(blankSolution)
})
