import React, { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import particlesConfig from './config/particles-config'

const particlesBackground = () => {

  const particlesinit = useCallback((engine) => {
    loadFull(engine)
  }, [])
  return (
    <div>
      <Particles
        options={particlesConfig}
        init={particlesinit}
      />
    </div>
  )
}

export default particlesBackground
