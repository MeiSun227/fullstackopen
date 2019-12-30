const blogs = [
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12,
    user: {
      username: 'tester'
    }
  },

  {
    title: "Finlandcocos",
    author: "Robert C. Martin",
    likes: 4,
    user: {
      username: 'tester'
    }
  },
  {
    title: "Santa is a dream man",
    author: "Maye Ikava",
    likes: 1,
    user: {
      username: 'tester'
    }
  }
  
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }