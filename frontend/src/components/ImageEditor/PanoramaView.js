import React, { Component } from 'react'
import * as THREE from 'three'

class PanoramaView extends Component {

  componentDidMount(){
    let dimensions = {
      x: this.mount.clientWidth/2,
      y: this.mount.clientHeight
    }
    let scene = new THREE.Scene()
    let camera = new THREE.PerspectiveCamera( 75, dimensions.x/dimensions.y, 0.1, 1000)
    let renderer = new THREE.WebGLRenderer()
    renderer.setSize( dimensions.x,dimensions.y )
    this.mount.appendChild( renderer.domElement )

    let texture = new THREE.TextureLoader().load( `http://localhost:3001/photos/${this.props.photo.id}thumb.${this.props.photo.filetype}` )
    let sphereGeometry = new THREE.SphereBufferGeometry(50,20,20)
    let material = new THREE.MeshBasicMaterial({map:texture})
    sphereGeometry.scale(-1,1,1)
    let enviroSphere = new THREE.Mesh( sphereGeometry, material )

    scene.add( enviroSphere )
    camera.position.z = 45
    let initialized = false
    const animate = () => {
      if( bigTexture !== undefined && !initialized ){
        material.map = bigTexture
        initialized = true
      }
      if( this.mount !== null ) {requestAnimationFrame( animate )}
      enviroSphere.rotation.y += 0.01
      renderer.render( scene, camera )
    }
    let bigTexture = new THREE.TextureLoader().load( `http://localhost:3001/photos/${this.props.photo.id}.${this.props.photo.filetype}` )
    animate()
  }


  render(){
    return(
      <div style={{width:'100%',height:'100%'}}ref={ref => (this.mount = ref)}/>
    )
  }
}

export default PanoramaView