import {useMachine} from '@xstate/react'
import type {NextPage} from 'next'
import {useState} from 'react'
import {todosMachineFactory} from './machines/todos-machine'

const todos = new Set<string>([
  'todo1',
  'todo2',
  'todo3',
  'todo4',
  'todo5',
  'todo6',
])

const Home: NextPage = () => {
  const [todosMachine] = useState(
    todosMachineFactory(),
  )
  const [state, send] = useMachine(todosMachine, {
    services: {
      fetch: async function (): Promise<
        string[]
      > {
        return Array.from(todos)
      },
      save: async (context, event) => {
        todos.add(context.todo)
      },
    },
  })

  return (
    <div>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
      <div>
        {state.matches('read') && (
          <button
            onClick={() => {
              send({type: 'onEdit'})
            }}
          >
            Edit
          </button>
        )}
        {state.matches('edit.update') && (
          <input
            onChange={event => {
              send({
                type: 'onUpdate',
                value: event.target.value,
              })
            }}
          ></input>
        )}
      </div>
    </div>
  )
}

export default Home
