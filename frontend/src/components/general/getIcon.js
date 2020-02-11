const getIcon = (icon) => {
  let iconClass = 'null'
  switch (icon){
    case 'map':
      iconClass = 'map-marker'
      break
    case 'user':
      iconClass = 'user'
      break
    case 'users':
      iconClass = 'users'
      break
    case 'label':
      iconClass = 'tag'
      break
    case 'labels':
      iconClass = 'tags'
      break
    case 'albums':
      iconClass = 'images'
      break
    case 'file':
      iconClass = 'file-image-o'
      break
    case 'save':
      iconClass = 'save'
      break
    case 'address':
      iconClass = 'mail-bulk'
      break
    default:
      iconClass = 'user'
  }
  iconClass = "fa fa-"+iconClass+" icon"
  return iconClass
} 

export default getIcon