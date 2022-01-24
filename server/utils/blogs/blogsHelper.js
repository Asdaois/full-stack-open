const totalLikes = blogs => {
  const total = blogs.reduce((sumLikes, current) => {
    const likes = current.likes
    return likes + sumLikes
  }, 0)

  return total
}

const findFavoriteBlog = blogs => {
  const find = (mostLiked, blog) =>
    blog.likes > mostLiked.likes ? blog : mostLiked

  const favorite = blogs.reduce(find, { likes: -1 })

  return favorite
}

const findBlogMostBlogs = blogs => {
  const find = (mostBlogs, blog) =>
    blog.blogs > mostBlogs.blogs ? blog : mostBlogs

  const mostBlogs = blogs.reduce(find, { blogs: -1 })

  return mostBlogs
}
const blogsHelper = { totalLikes, findFavoriteBlog, findBlogMostBLogs: findBlogMostBlogs }
module.exports = blogsHelper
