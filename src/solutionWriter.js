import ChildTypes from './childTypes'

class SolutionWriter {
  write(solution) {
    const lines = []
    const append = line => lines.push(line)

    append('Microsoft Visual Studio Solution File, Format Version 12.00')
    append('# Visual Studio 14')
    append('VisualStudioVersion = 14.0.25420.1')
    append('MinimumVisualStudioVersion = 10.0.40219.1')

    this.appendChildren(append, solution)

    append('Global')

    this.appendConfigurations(append, solution)
    this.appendPlatforms(append, solution)
    this.appendProperties(append, solution)
    this.appendNesting(append, solution)

    append('EndGlobal')
    append('')

    return lines
  }

  appendChildren(append, solution) {
    solution.getChildren().forEach(x => {
      append(`Project("{${x.type}}") = "${x.name}", "${x.path}", "{${x.id}}"`)
      append(`EndProject`)
    })
  }

  appendConfigurations(append, solution) {
    append('	GlobalSection(SolutionConfigurationPlatforms) = preSolution')
    solution
      .getConfigurations()
      .forEach(config => append(`\t\t${config} = ${config}`))
    append('	EndGlobalSection')
  }

  appendProperties(append, solution) {
    append('	GlobalSection(SolutionProperties) = preSolution')
    append('		HideSolutionNode = FALSE')
    append('	EndGlobalSection')
  }

  appendPlatforms(append, solution) {
    append('\tGlobalSection(ProjectConfigurationPlatforms) = postSolution')

    solution
      .getChildren()
      .filter(child => child.type === ChildTypes.project)
      .forEach(project => {
        solution.getConfigurations().forEach(config => {
          append(`\t\t{${project.id}}.${config}.ActiveCfg = ${config}`)
          append(`\t\t{${project.id}}.${config}.Build.0 = ${config}`)
        })
      })
    append('	EndGlobalSection')
  }

  appendNesting(append, solution) {
    append('	GlobalSection(NestedProjects) = preSolution')

    const reducer = (result, child) =>
      Object.assign(result, {
        [child.id]: child.id,
        [child.name]: child.id
      })

    const relationships = solution.getChildren().reduce(reducer, {})

    solution
      .getChildren()
      .filter(child => child.parent && relationships[child.parent])
      .forEach(child => {
        append(`\t\t{${child.id}} = {${relationships[child.parent]}}`)
      })

    append('	EndGlobalSection')
  }
}

export default SolutionWriter
