import {useMachine} from '@xstate/react'
import type {NextPage} from 'next'
import {useState} from 'react'
import {todosMachineFactory} from './machines/todos-machine'

const Home: NextPage = () => {
  const [todosMachine] = useState(
    todosMachineFactory(),
  )
  const [state, send] = useMachine(todosMachine)

  return (
    <div>
      {JSON.stringify(state.value)}
      <button
        onClick={() =>
          send({
            type: 'onComplete',
            todos: [
              'todo1',
              'todo2',
              'todo3',
              'todo4',
              'todo5',
              'todo6',
            ],
          })
        }
      >
        Complete
      </button>
      <button
        onClick={() =>
          send({
            type: 'onError',
            error: 'something went wrong',
          })
        }
      >
        Error
      </button>
    </div>
  )
}

export default Home
