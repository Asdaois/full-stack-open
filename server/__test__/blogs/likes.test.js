const { findFavoriteBlog } = require('../../utils/blogs/blogsHelper')
const listHelper = require('../../utils/blogs/blogsHelper')

describe('total likes', () => {
  test('only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blog)

    expect(result).toBe(48)
  })
})

describe('Favorite blog', () => {
  test('if only exist one blog, return it', () => {
    const result = findFavoriteBlog(blog)
    expect(result).toBe(blog[0])
  })

  test('favorite founded in a collection', () => {
    const result = findFavoriteBlog(blogs)
    expect(result).toEqual(blogs[0])
  })
})

const blog = [
  {
    title: 'stable',
    author: 'Becky Pargetter',
    likes: 48
  }
]

const blogs = [
  {
    title: 'Cloned',
    author: 'Marlane Treske',
    likes: 99
  },
  {
    title: 'Compatible',
    author: 'Carola Vearncomb',
    likes: 31
  },
  {
    title: 'matrices',
    author: 'Koressa Labbez',
    likes: 36
  },
  {
    title: 'global',
    author: 'Rochelle Bayman',
    likes: 54
  },
  {
    title: 'Polarised',
    author: 'Kai Bernasek',
    likes: 50
  },
  {
    title: 'Expanded',
    author: 'Rica Sparks',
    likes: 83
  },
  {
    title: 'initiative',
    author: 'Enriqueta Abramamov',
    likes: 39
  },
  {
    title: 'motivating',
    author: 'Jarrid Seton',
    likes: 16
  },
  {
    title: 'architecture',
    author: 'Remus Cardillo',
    likes: 46
  },
  {
    title: 'standardization',
    author: 'Enrica Decreuze',
    likes: 22
  },
  {
    title: 'portal',
    author: 'Ingaborg Tidridge',
    likes: 48
  },
  {
    title: 'archive',
    author: 'Neall Speaks',
    likes: 2
  },
  {
    title: 'Front-line',
    author: 'Vinson Benbow',
    likes: 79
  },
  {
    title: 'access',
    author: 'Zorah Tinghill',
    likes: 30
  },
  {
    title: 'core',
    author: 'Phillis Fullman',
    likes: 83
  }
]
