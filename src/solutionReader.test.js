import fs from 'fs'
import Solution from './solution'
import SolutionReader from './solutionReader'

const linesOf = name =>
  fs
    .readFileSync(`./test-data/${name}.sln`)
    .toString()
    .split(/\r?\n/)

it('should read a blank solution file', () => {
  const reader = new SolutionReader()
  const solution = reader.fromLines([])

  expect(solution.getProjects()).toEqual([])
  expect(solution.getConfigurations()).toEqual([
    'Debug|Any CPU',
    'Release|Any CPU'
  ])
})

it('should read a single project', () => {
  const reader = new SolutionReader()
  const solution = reader.fromLines(linesOf('oneProject'))

  expect(solution.getProjects()).toEqual([
    {
      id: '3F5F5B05-7B61-43BF-9217-7E2005FAEF68',
      name: 'ProjectUnderRoot',
      path: 'ProjectUnderRoot\\ProjectUnderRoot.csproj'
    }
  ])
})

it('should read a single folder', () => {
  const reader = new SolutionReader()
  const solution = reader.fromLines(linesOf('oneFolder'))

  expect(solution.getFolders()).toEqual([
    {
      id: '93E2EDB0-2AB9-4A5E-A8BD-658CAD43C2B7',
      name: 'Parent',
      path: 'Parent'
    }
  ])
})
