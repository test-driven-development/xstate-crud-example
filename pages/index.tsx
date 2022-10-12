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
      delete: async (context, event) => {
        todos.delete(event.todo)
      },
    },
  })

  return (
    <div>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
      <div>
        {state.context.todos.map(todo => (
          <div key={todo}>
            <button
              onClick={() => {
                send({
                  type: 'onDelete',
                  todo,
                })
              }}
            >
              Delete
            </button>
            &#8212;
            <span>{todo}</span>
          </div>
        ))}
      </div>
      <br />
      <div>
        {state.matches('read') && (
          <button
            onClick={() => {
              send({type: 'onCreate'})
            }}
          >
            Create
          </button>
        )}
        {state.matches('create.update') && (
          <form
            onSubmit={event => {
              event.preventDefault()
              send({
                type: 'onSave',
              })
            }}
          >
            <input
              onChange={event => {
                send({
                  type: 'onUpdate',
                  value: event.target.value,
                })
              }}
            ></input>
          </form>
        )}
      </div>
    </div>
  )
}

export default Home
