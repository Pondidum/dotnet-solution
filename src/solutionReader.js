import Solution from './solution'

class SolutionReader {
  constructor() {}

  fromLines(lines) {
    const solution = new Solution()
    this.readProjects(solution, lines)
    return solution
  }

  readProjects(solution, lines) {
    const projectExpression = new RegExp(
      /Project\("\{(.*)\}"\) = "(.*?)".*?"(.*?)".*"\{(.*)\}"/,
      'i'
    )

    const projects = lines
      .map(line => line.match(projectExpression))
      .filter(match => match)
      .forEach(project => {
        solution.addProject({
          id: project[4],
          name: project[2],
          path: project[3]
        })
      })
  }
}

export default SolutionReader
