export const isAuthenticated = () => {
  const isLogged = localStorage.getItem('loggedIn')

  if (isLogged) {
    const booleanValue = JSON.parse(isLogged)
    return booleanValue
  } else {
    return false
  }
}
