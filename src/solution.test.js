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
