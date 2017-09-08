import Solution from './solution'
import fs from 'fs'

const createWriter = () => {
  return {
    lines: [],
    writeLine: function(line) {
      this.lines.push(line)
    }
  }
}

const linesOf = name =>
  fs
    .readFileSync(`./test-data/${name}.sln`)
    .toString()
    .split(/\r?\n/)

it('should be able to output a blank solution file', () => {
  const writer = createWriter()
  const solution = new Solution()
  solution.writeTo(writer)

  expect(writer.lines).toEqual(linesOf('blank'))
})

it('should write a single project to the solution file', () => {
  const writer = createWriter()
  const solution = new Solution()

  solution.addProject({
    id: '3F5F5B05-7B61-43BF-9217-7E2005FAEF68',
    name: 'ProjectUnderRoot',
    path: 'ProjectUnderRoot\\ProjectUnderRoot.csproj'
  })
  solution.writeTo(writer)

  expect(writer.lines).toEqual(linesOf('oneProject'))
})
