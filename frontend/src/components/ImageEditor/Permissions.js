import React,{useState, useEffect} from 'react'

import SectionToggler from '../general/SectionToggler'
import Input from '../general/Input'


const Permissions = (props) => {
  const [collapsed,setCollapsed] = useState( true )
  const [relatives, setRelatives] = useState( 0 )
  const [friends, setFriends] = useState( 0 )
  const [isPublic, setPublic] = useState( false )

  useEffect( ()=>{
    if( props.permissions !== null && props.permissions.friend === -1 ){
      setPublic(true)
      setRelatives(2)
      setFriends(2)
    }
  },[])

  if( !props.hasEditRights )return(<></>)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const togglePublic = () => {
    if( !isPublic ){
      setPublic(true)
      setRelatives(2)
      setFriends(2)
      props.updatePermissions({
        relatives:2,
        friends:2,
        public:true
      })
    }
    else setPublic(!isPublic)
  }

  const setRelative = (event) => {
    let value = event.target.value
    setRelatives( value )
    if( isPublic ) setPublic(false)
    props.updatePermissions({
      relatives:event.target.value,
      friends,
      public:false
    })
  }

  const setFriend = (event) => {
    const value = event.target.value
    setFriends( value )
    if( isPublic ) setPublic(false)
    props.updatePermissions({
      relatives,
      friends:event.target.value,
      public:false
    })
  }

  return(
    <SectionToggler
      title="Permissions"
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
    >
      <table><tbody>
        <tr>
          <th></th>
          <th>View</th>
          <th>Share</th>
        </tr>
        <tr>
        <td>Relatives</td>
          <td><Input type='checkbox' checked={relatives>0 || isPublic} value={ relatives < 1 ? 1 : 0 } onChange={setRelative} icon='null'/></td>
          <td><Input type='checkbox' checked={relatives>1 || isPublic} value={ relatives < 2 ? 2 : 1 } onChange={setRelative} icon='null'/></td>
        </tr>
        <tr>
          <td>Friends</td>
          <td><Input type='checkbox' checked={friends>0 || isPublic} onChange={setFriend} value={ friends < 1 ? 1 : 0} icon='null'/></td>
          <td><Input type='checkbox' checked={isPublic} onChange={togglePublic} icon='null'/></td>
        </tr>
        <tr>
          <td>Public</td>
          <td><Input type='checkbox' icon='null' checked={isPublic} onChange={togglePublic}/></td>
          <td></td>
        </tr>
      </tbody></table>
    </SectionToggler>
  )
}

export default Permissions