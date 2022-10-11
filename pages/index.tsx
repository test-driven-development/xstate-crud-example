import {useMachine} from '@xstate/react'
import type {NextPage} from 'next'
import {helloMachine} from './machines/hello-machine'

const Home: NextPage = () => {
  const [state, send] = useMachine(helloMachine)
  return (
    <div>
      {JSON.stringify(state.value)}
      <button onClick={() => send('onMouseover')}>
        Mouseover
      </button>
      <button onClick={() => send('onMouseout')}>
        Mouseout
      </button>
    </div>
  )
}

export default Home
