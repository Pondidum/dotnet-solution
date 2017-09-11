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

it('should write a single folder to the solution file', () => {
  const writer = createWriter()
  const solution = new Solution()

  solution.addFolder({
    id: '93E2EDB0-2AB9-4A5E-A8BD-658CAD43C2B7',
    name: 'Parent',
    path: 'Parent'
  })
  solution.writeTo(writer)

  expect(writer.lines).toEqual(linesOf('oneFolder'))
})

it('should add a project to a folder', () => {
  const writer = createWriter()
  const solution = new Solution()

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

  solution.writeTo(writer)

  expect(writer.lines).toEqual(linesOf('oneFolderChildProject'))
})

it('should add folders to a folder', () => {
  const writer = createWriter()
  const solution = new Solution()

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

  solution.writeTo(writer)

  expect(writer.lines).toEqual(linesOf('childFolder'))
})
