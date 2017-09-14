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
    const relationshipExpression = new RegExp(/\{(.*?)\} = \{(.*?)\}/, 'i')

    const relationships = lines
      .map(line => line.match(relationshipExpression))
      .filter(match => match)
      .reduce((o, match) => Object.assign(o, { [match[1]]: match[2] }), {})

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
          path: project[3],
          parent: relationships[project[4]]
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
