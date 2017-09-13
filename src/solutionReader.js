import Solution from './solution'
import ChildTypes from './childTypes'

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
        const value = {
          id: project[4],
          name: project[2],
          path: project[3]
        }

        if (project[1] === ChildTypes.folder) {
          solution.addFolder(value)
        }
        if (project[1] === ChildTypes.project) {
          solution.addProject(value)
        }
      })
  }
}

export default SolutionReader
