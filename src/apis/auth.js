export const isAuthenticated = () => {
  const isLogged = localStorage.getItem('auth')
  //@ts-expect-error
  if (isLogged) {
    const booleanValue = JSON.parse(isLogged)
    return booleanValue.isLogged
  } else {
    false
  }
}
