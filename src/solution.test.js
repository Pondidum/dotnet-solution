import Solution from './solution'

it('should not leak type property when fetching projects', () => {
  const solution = new Solution()
  const project = {
    id: '3F5F5B05-7B61-43BF-9217-7E2005FAEF68',
    name: 'ProjectUnderRoot',
    path: 'ProjectUnderRoot\\ProjectUnderRoot.csproj'
  }

  solution.addProject(project)

  expect(solution.getProjects()).toEqual([project])
})

it('should set folder parents correctly, when defined out of order', () => {
  const solution = new Solution()

  solution.addFolder({
    id: 'child-id',
    name: 'child-name',
    parent: 'parent-id'
  })

  solution.addFolder({
    id: 'parent-id',
    name: 'parent-name'
  })

  expect(solution.getFolders()).toEqual([
    {
      id: 'child-id',
      name: 'child-name',
      parent: 'parent-name'
    },
    {
      id: 'parent-id',
      name: 'parent-name'
    }
  ])
})

it('should remove folders by id', () => {
  const solution = new Solution()

  solution.addFolder({
    id: 'child-id',
    name: 'child-name',
    parent: 'parent-id'
  })

  solution.removeFolder('child-id')

  expect(solution.getFolders()).toEqual([])
})

it('should remove folders by name', () => {
  const solution = new Solution()

  solution.addFolder({
    id: 'child-id',
    name: 'child-name',
    parent: 'parent-id'
  })

  solution.removeFolder('child-name')

  expect(solution.getFolders()).toEqual([])
})

it('should remove projects by id', () => {
  const solution = new Solution()

  solution.addProject({
    id: 'child-id',
    name: 'child-name',
    parent: 'parent-id'
  })

  solution.removeProject('child-id')

  expect(solution.getProjects()).toEqual([])
})

it('should remove projects by name', () => {
  const solution = new Solution()

  solution.addProject({
    id: 'child-id',
    name: 'child-name',
    parent: 'parent-id'
  })

  solution.removeProject('child-name')

  expect(solution.getProjects()).toEqual([])
})

it('should add configurations', () => {
  const solution = new Solution()

  solution.addConfiguration('Debug|x86')

  expect(solution.getConfigurations()).toEqual([
    'Debug|Any CPU',
    'Release|Any CPU',
    'Debug|x86'
  ])
})

it('should remove configurations', () => {
  const solution = new Solution()

  solution.removeConfiguration('Debug|Any CPU')

  expect(solution.getConfigurations()).toEqual(['Release|Any CPU'])
})
