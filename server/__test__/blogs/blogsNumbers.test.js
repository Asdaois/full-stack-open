const blogsHelper = require('../../utils/blogs/blogsHelper')

describe('number blogs', () => {
  test('there is one blog, return this blog ', () => {
    const blog = { author: 'Jose Guevara', blogs: 4 }
    const blogs = [{ ...blog }]
    const result = blogsHelper.findBlogMostBLogs(blogs)

    expect(result).toEqual(blog)
  })

  test('a list of blocs, return blog with major number of blogs', () => {
    const blog = {
      author: 'Calida Tripean',
      blogs: 10
    }
    const result = blogsHelper.findBlogMostBLogs(blogs)

    expect(result).toEqual(blog)
  })

  const blogs = [
    {
      author: 'Dori Roseaman',
      blogs: 6
    },
    {
      author: 'Cynthie Duberry',
      blogs: 2
    },
    {
      author: 'Olivie Berthon',
      blogs: 7
    },
    {
      author: 'Town Toombs',
      blogs: 2
    },
    {
      author: 'Gnni Clapshaw',
      blogs: 2
    },
    {
      author: 'Hedvige Beetham',
      blogs: 6
    },
    {
      author: 'Cora Crees',
      blogs: 7
    },
    {
      author: 'Maurine Albasini',
      blogs: 1
    },
    {
      author: 'Carlos Southan',
      blogs: 9
    },
    {
      author: 'Lucienne Kither',
      blogs: 2
    },
    {
      author: 'Evyn Clack',
      blogs: 2
    },
    {
      author: 'Calida Tripean',
      blogs: 10
    },
    {
      author: 'Scarlett Rowcastle',
      blogs: 1
    },
    {
      author: 'Kari Kenworthey',
      blogs: 5
    },
    {
      author: 'Dorree Dawtre',
      blogs: 5
    }
  ]
})
