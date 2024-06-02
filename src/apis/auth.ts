export const isAuthenticated = () => {
  //   Cookies.set('loggedIn', 'true')
  const loggedIn = localStorage.getItem('loggedIn') === 'true'

  // console.log('loggedIn', typeof loggedIn)

  if (loggedIn) {
    return true
  }

  return false
}
