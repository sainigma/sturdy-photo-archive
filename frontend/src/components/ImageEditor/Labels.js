import React from 'react'

const Label = (props) => {
  return(
    <>
      <div className="labelcontainer">
        {props.label.name}
      </div>
    </>
  )
}

const Labels = (props) => {
  const labels=[
    {
      id:'1',
      name:'nature'
    },
    {
      id:'213',
      name:'forest'
    },
    {
      id:'321',
      name:'sunset'
    }
  ]


  return(
    <div className="labelssection">
      <div><h3>Labels ({labels.length})</h3></div>
      <div>
        { labels.map( label => <Label key={label.id} label={label}/> ) }
        <Label label={ {id:'-1', name: 'Create new'} }/>
      </div>
    </div>
  )
}

export default Labels