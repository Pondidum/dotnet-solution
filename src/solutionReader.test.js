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

it('should read a project under a folder', () => {
  const reader = new SolutionReader()
  const solution = reader.fromLines(linesOf('oneFolderChildProject'))

  expect(solution.getFolders()).toEqual([
    {
      id: '93E2EDB0-2AB9-4A5E-A8BD-658CAD43C2B7',
      name: 'Parent',
      path: 'Parent'
    }
  ])

  expect(solution.getProjects()).toEqual([
    {
      id: '7EC623E8-DE59-4A2C-AD1F-333F2E54AECA',
      name: 'ProjectUnderParent',
      path: 'ProjectUnderParent\\ProjectUnderParent.csproj',
      parent: 'Parent'
    }
  ])
})

it('should read a folder under a folder', () => {
  const reader = new SolutionReader()
  const solution = reader.fromLines(linesOf('childFolder'))

  expect(solution.getFolders()).toEqual([
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
  ])
})
