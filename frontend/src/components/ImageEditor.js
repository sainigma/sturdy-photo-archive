import React from 'react'

const LeftContainer = (props) => {
  return(
    <div className="imgeditorleftcontainer">
      <img className="uploadpreviewImg" src={props.fileurl}/>
      <div className="uploadpreviewBackground" style={{backgroundImage: `url(${props.fileurl})`}}/>
    </div>
  )
}

const RightContainer = (props) => {
  return(
    <div className="imgeditorrightcontainer">
      {props.children}
    </div>
  )
}

const ImageEditor = (props) => {
  const url = 'http://localhost:3001/photos/'
  const id = '4a7a8ddd-1e13-411e-8e95-be3adee1c5b8'
  const id2 = '7fa73427-9d79-46d6-9695-eae69d1bc91c'
  const filetype = 'jpg'
  const fileurl = `${url}${id}.${filetype}`
  return(
    <div className="imgeditorbackground">
      <div className="imgeditorcontainer">
        <LeftContainer fileurl={fileurl}/>
        <RightContainer>
          <p>Header</p>
          <p>Location</p>
          <p>Labels</p>
          <p>Comments</p>
        </RightContainer>
      </div>
    </div>
  )
}

export default ImageEditor