const defaultLines = [
  'Microsoft Visual Studio Solution File, Format Version 12.00',
  '# Visual Studio 14',
  'VisualStudioVersion = 14.0.25420.1',
  'MinimumVisualStudioVersion = 10.0.40219.1',
  'Global',
  '	GlobalSection(SolutionConfigurationPlatforms) = preSolution',
  '		Debug|Any CPU = Debug|Any CPU',
  '		Release|Any CPU = Release|Any CPU',
  '	EndGlobalSection',
  '	GlobalSection(ProjectConfigurationPlatforms) = postSolution',
  '	EndGlobalSection',
  '	GlobalSection(SolutionProperties) = preSolution',
  '		HideSolutionNode = FALSE',
  '	EndGlobalSection',
  '	GlobalSection(NestedProjects) = preSolution',
  '	EndGlobalSection',
  'EndGlobal',
  ''
]

const solution = {
  addProject: function(project) {},

  removeProject: function(project) {},

  writeTo: function(writer) {
    defaultLines.forEach(line => writer.writeLine(line))
  }
}

export default solution
