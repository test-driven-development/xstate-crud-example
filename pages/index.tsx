import {useMachine} from '@xstate/react'
import type {NextPage} from 'next'
import {useState} from 'react'
import {todosMachineFactory} from './machines/todos-machine'

const Home: NextPage = () => {
  const [todosMachine] = useState(
    todosMachineFactory(),
  )
  const [state, send] = useMachine(todosMachine, {
    services: {
      fetch: async () => {
        return [
          'todo1',
          'todo2',
          'todo3',
          'todo4',
          'todo5',
          'todo6',
        ]
      },
    },
  })

  return (
    <div>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
    </div>
  )
}

export default Home
