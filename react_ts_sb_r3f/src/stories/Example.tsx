import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera,OrthographicCamera,OrbitControls } from '@react-three/drei'

interface ExampleProps {
  title: string;
  desc?: string;
  id?: string;
}

/**
 * Primary UI component for user interaction
 */

const Box = ({...props}) => {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef<JSX.IntrinsicElements.mesh>()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
      (ref.current.rotation.x += 0.01)
    })
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <>
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
      </>
    )
  
}

const Starter = () =>{
  return (
    <>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
    </>
  )
}

const Lesson1 = ({trigger}:{trigger:boolean}) =>{
  const sizes = {
    width: 800,
    height: 600
  }

  const ref = useRef<JSX.IntrinsicElements.mesh>()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    (ref.current.rotation.x += 0.01)
  })

  return(
    <>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[1, 1, 1]} />
        {
          trigger?
          <PerspectiveCamera 
            position={[0, 0, 3]} 
            fov={75} 
            aspect={sizes.width/sizes.height} 
            makeDefault={true} />
          :
          <OrthographicCamera 
            position={[0, 0, 3]} 
            zoom={180} 
            makeDefault />
        }
        <mesh
          ref={ref}
          scale={clicked ? 1.5 : 1}
          onClick={(event) => click(!clicked)}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={hovered ? '#ff0000' : '#ffffff'} />
        </mesh>
    </>
  )
}

export const Example = ({
  title,
  desc,
  id,
  ...props
}: ExampleProps) => {
    const [isTriggered,setTriggered] = useState<boolean>(false)
    const conditionalRendering = () => {
  
      switch (id) {
        case 'starter':
          return <Starter/>;
        case 'lesson1':
          return <Lesson1 trigger={isTriggered} />
        default:
          return (<></>)

      }

    }
    return (
      <section >
        <h2>{title}</h2>
        {desc?<p>{desc}</p>:<></>}
        <button onClick={()=>{setTriggered(!isTriggered)}}>trigger</button>
        <Canvas
          style={{
            width:`800px`,
            height:`600px`,
            border:`1px solid #d1d1d1`,
            borderRadius:`8px`
          }}
        >
          {conditionalRendering()}
        </Canvas>
      </section>
  );
};
