import {useMachine} from '@xstate/react'
import type {NextPage} from 'next'
import {helloMachine} from './machines/hello-machine'

const Home: NextPage = () => {
  const [state, send] = useMachine(helloMachine)
  return (
    <div>
      {JSON.stringify(state.value)}
      <button onClick={() => send('onMouseover')}>
        Toggle
      </button>
    </div>
  )
}

export default Home
