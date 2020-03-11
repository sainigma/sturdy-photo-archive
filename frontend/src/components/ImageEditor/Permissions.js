import React,{useState} from 'react'

import SectionToggler from '../general/SectionToggler'
import Input from '../general/Input'


const Permissions = (props) => {
  const [collapsed,setCollapsed] = useState( true )
  const [relatives, setRelatives] = useState( 0 )
  const [friends, setFriends] = useState( 0 )
  const [isPublic, setPublic] = useState( false )

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const togglePublic = () => {
    setPublic(!isPublic)
  }

  const setRelative = (event) => {
    const value = event.target.value
    setRelatives( value )
  }

  const setFriend = (event) => {
    const value = event.target.value
    setFriends( value )
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
        <td>Relatives {relatives}</td>
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