export const config = (user) => {
  return {
    headers: { Authorization: user.token,
      'Content-type':'multipart/form-data'
     }
  }
}
