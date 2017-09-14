import Solution from './solution'
import SolutionWriter from './solutionWriter'
import fs from 'fs'

const linesOf = name =>
  fs
    .readFileSync(`./test-data/${name}.sln`)
    .toString()
    .split(/\r?\n/)

let lines
let writer
let solution

beforeEach(() => {
  lines = []
  writer = new SolutionWriter(line => lines.push(line))
  solution = new Solution()
})

it('should be able to output a blank solution file', () => {
  writer.write(solution)

  expect(lines).toEqual(linesOf('blank'))
})

it('should write a single project to the solution file', () => {
  solution.addProject({
    id: '3F5F5B05-7B61-43BF-9217-7E2005FAEF68',
    name: 'ProjectUnderRoot',
    path: 'ProjectUnderRoot\\ProjectUnderRoot.csproj'
  })
  writer.write(solution)

  expect(lines).toEqual(linesOf('oneProject'))
})

it('should write a single folder to the solution file', () => {
  solution.addFolder({
    id: '93E2EDB0-2AB9-4A5E-A8BD-658CAD43C2B7',
    name: 'Parent',
    path: 'Parent'
  })
  writer.write(solution)

  expect(lines).toEqual(linesOf('oneFolder'))
})

it('should add a project to a folder', () => {
  solution.addFolder({
    id: '93E2EDB0-2AB9-4A5E-A8BD-658CAD43C2B7',
    name: 'Parent',
    path: 'Parent'
  })

  solution.addProject({
    id: '7EC623E8-DE59-4A2C-AD1F-333F2E54AECA',
    name: 'ProjectUnderParent',
    path: 'ProjectUnderParent\\ProjectUnderParent.csproj',
    parent: 'Parent'
  })

  writer.write(solution)

  expect(lines).toEqual(linesOf('oneFolderChildProject'))
})

it('should add folders to a folder', () => {
  solution.addFolder({
    id: '93E2EDB0-2AB9-4A5E-A8BD-658CAD43C2B7',
    name: 'Parent',
    path: 'Parent'
  })

  solution.addFolder({
    id: 'E2939C1D-DE3E-4455-88D6-CBA711FE1FAD',
    name: 'ChildOne',
    path: 'ChildOne',
    parent: 'Parent'
  })

  writer.write(solution)

  expect(lines).toEqual(linesOf('childFolder'))
})
