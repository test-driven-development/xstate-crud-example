import {useMachine} from '@xstate/react'
import type {NextPage} from 'next'
import {useState} from 'react'
import {todosMachineFactory} from './machines/todos-machine'

const Home: NextPage = () => {
  const [todosMachine] = useState(todosMachineFactory())
  const [state, send] = useMachine(todosMachine)

  return <div>{JSON.stringify(state.value)}</div>
}

export default Home
