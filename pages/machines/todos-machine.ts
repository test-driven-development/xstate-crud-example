import {createMachine, assign} from 'xstate'

export const todosMachineFactory = () =>
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLQFsCGAxgBYCWAdmAHQBmYyxAkmRCQXspAMQYWXkBuqANZU0GbPmLkqtekSYs2HCAgGolJVGQDaABgC6iUAAdMJZJrJGQAD0RYAzACYAHJQCsD3Q4CMATl0XHxddHwAWABoQAE97Jz8fSl0ANncwv3iHZPiXAF9cqLFMXEJSXllGZlZ2LjAAJzrUOspjABt2aiacSiKJUukaOkrFGpU1DS09QyQQU1hzS2s7BCw0gHZKMMyfHLDdPyjYlZ81sKT3ZIcHEIc-Nd8XZPzC9GLJMpkhoi4COrAa6xzBZaJb2PzJShBJyeHzONbuPyPZKHew+VKUZIBdz+Jy6MJrNEuJz5AogMjoODWXolKTlL4KarKQFmCwgmbLVbYpJ3bx+LJXNZ+dwolZeDaBMJhS6uKWy54ganvAYVb4QZnzVlWdmo3QbeE7NaGlz4naRGJxNYQ073BxrJw7FI+dzueWK-q8eqNP5qmZAzWglbYxJhdwuZ1eTHgvkizmQ3EOUNOonpdxOJ6kt20qi-f7KPhkYwAV2Q6uBWtAHL8Z0tj0CfLTJwO5oQTrjyRCyVSTqu2PTL3ENI+lBzo1L-u1x2ClBryTrzmSjZjF0oJycIZSATx9r8rtefSzY8WE9W8O5a15-NtQpjV6SLiyGScgrXWxJuSAA */
  createMachine(
    {
      context: {
        todos: [] as string[],
        error: undefined as string | undefined,
      },
      tsTypes:
        {} as import('./todos-machine.typegen').Typegen0,
      schema: {
        services: {} as {
          fetch: {
            data: string[]
          }
        },
      },
      predictableActionArguments: true,
      id: 'todos-machine',
      initial: 'fetchIndicated',
      states: {
        fetchIndicated: {
          invoke: {
            src: 'fetch',
            onDone: [
              {
                actions: 'setTodosInContext',
                target: 'fetched',
              },
            ],
            onError: [
              {
                actions: 'setErrorInContext',
                target: 'errored',
              },
            ],
          },
        },
        fetched: {
          on: {
            create: {
              target: 'created',
            },
          },
        },
        errored: {},
        created: {
          initial: 'input',
          states: {
            input: {},
          },
        },
      },
    },
    {
      actions: {
        setTodosInContext: assign((_, event) => {
          return {
            todos: event.data,
          }
        }),
        setErrorInContext: assign((_, event) => {
          return {
            error: (event.data as Error).message,
          }
        }),
      },
    },
  )
