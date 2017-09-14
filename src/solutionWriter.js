import ChildTypes from './childTypes'

class SolutionWriter {
  constructor(append) {
    this.append = append
  }

  write(solution) {
    const append = this.append

    append('Microsoft Visual Studio Solution File, Format Version 12.00')
    append('# Visual Studio 14')
    append('VisualStudioVersion = 14.0.25420.1')
    append('MinimumVisualStudioVersion = 10.0.40219.1')

    this.appendChildren(solution)

    append('Global')

    this.appendConfigurations(solution)
    this.appendPlatforms(solution)
    this.appendProperties(solution)

    this.appendNesting(solution)

    append('EndGlobal')
    append('')
  }

  appendChildren(solution) {
    solution.children.forEach(x => {
      this.append(
        `Project("{${x.type}}") = "${x.name}", "${x.path}", "{${x.id}}"`
      )
      this.append(`EndProject`)
    })
  }

  appendConfigurations(solution) {
    this.append('	GlobalSection(SolutionConfigurationPlatforms) = preSolution')
    solution.configurations.forEach(config =>
      this.append(`\t\t${config} = ${config}`)
    )
    this.append('	EndGlobalSection')
  }

  appendProperties(solution) {
    this.append('	GlobalSection(SolutionProperties) = preSolution')
    this.append('		HideSolutionNode = FALSE')
    this.append('	EndGlobalSection')
  }

  appendPlatforms(solution) {
    this.append('\tGlobalSection(ProjectConfigurationPlatforms) = postSolution')

    solution.children
      .filter(child => child.type === ChildTypes.project)
      .forEach(project => {
        solution.configurations.forEach(config => {
          this.append(`\t\t{${project.id}}.${config}.ActiveCfg = ${config}`)
          this.append(`\t\t{${project.id}}.${config}.Build.0 = ${config}`)
        })
      })
    this.append('	EndGlobalSection')
  }

  appendNesting(solution) {
    this.append('	GlobalSection(NestedProjects) = preSolution')

    const reducer = (result, child) =>
      Object.assign(result, {
        [child.id]: child.id,
        [child.name]: child.id
      })

    const relationships = solution.children.reduce(reducer, {})

    solution.children
      .filter(child => child.parent && relationships[child.parent])
      .forEach(child => {
        this.append(`\t\t{${child.id}} = {${relationships[child.parent]}}`)
      })

    this.append('	EndGlobalSection')
  }
}

export default SolutionWriter
