const blogs = [
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12
  },

  {
    title: "Finlandcocos",
    author: "Robert C. Martin",
    likes: 4
  },
  {
    title: "Santa is a dream man",
    author: "Maye Ikava",
    likes: 1
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }