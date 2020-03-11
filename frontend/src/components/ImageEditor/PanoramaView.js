import React, { Component } from 'react'
import * as THREE from 'three'

class PanoramaView extends Component {

  componentDidMount(){
    let dimensions = {
      x: this.props.scaleX ? this.mount.clientWidth * this.props.scaleX : this.mount.clientWidth,
      y: this.props.scaleY ? this.mount.clientHeight * this.props.scaleY : this.mount.clientHeight
    }
    let scene = new THREE.Scene()
    let camera = new THREE.PerspectiveCamera( 75, dimensions.x/dimensions.y, 0.1, 1000)
    let renderer = new THREE.WebGLRenderer()
    renderer.setSize( dimensions.x,dimensions.y )
    this.mount.appendChild( renderer.domElement )

    const subdivisions = this.props.large ? 64 : 20

    let texture = new THREE.TextureLoader().load( `http://localhost:3001/photos/${this.props.photo.id}thumb.${this.props.photo.filetype}` )
    let sphereGeometry = new THREE.SphereBufferGeometry(100,subdivisions,subdivisions)
    let cylinderGeometry = new THREE.CylinderBufferGeometry(50,50,50,subdivisions,2,true)
    let material = new THREE.MeshBasicMaterial({map:texture})
    sphereGeometry.scale(-1,1,1)
    cylinderGeometry.scale(-1,1.5,1)

    let enviroMesh = this.props.photo.equirectangular ? new THREE.Mesh( sphereGeometry, material ) : new THREE.Mesh( cylinderGeometry, material )

    scene.add( enviroMesh )
    camera.position.z = this.props.photo.equirectangular ? 30 : 10
    let initialized = false
    const animate = () => {
      if( bigTexture !== undefined && !initialized ){
        material.map = bigTexture
        initialized = true
      }
      if( this.mount !== null ) {requestAnimationFrame( animate )}
      enviroMesh.rotation.y += 0.0025
      renderer.render( scene, camera )
    }
    let bigTexture = new THREE.TextureLoader().load( `http://localhost:3001/photos/${this.props.photo.id}.${this.props.photo.filetype}` )
    animate()
  }


  render(){
    return(
      <div style={{width:'100%',height:'100%',zIndex:2000,cursor:'grab'}}ref={ref => (this.mount = ref)}/>
    )
  }
}

export default PanoramaView