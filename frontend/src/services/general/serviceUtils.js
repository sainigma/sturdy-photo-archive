let user = false

export const config = (newuser) => {
  user = newuser
  return {
    headers: { Authorization: newuser.token,
      'Content-type':'multipart/form-data'
     }
  }
}

export const getUser = () => {
  if( user ) return user
  return false
}