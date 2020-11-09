export const getNextProjectID = (id, projects) => {
  const index = projects.map(project => project.sys.id).indexOf(id);
  if(index === -1 ) return null
  if(index + 1 < projects.length) return projects[index + 1].sys.id;
  return projects[0].sys.id;
}
