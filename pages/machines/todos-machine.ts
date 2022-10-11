import {assign, createMachine} from 'xstate'

export const todosMachineFactory = () =>
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLQFsCGAxgBYCWAdmAHTkQkF7JgBiYyxAxBhdWQG6oBrKmgzZ8xclRp0GzVsQTl+9ZCVRkA2gAYAuolAAHTCVXr9IAB6IsAFgBMANkoBGO84Cc7rQ+cOArAAc7s4ANCAAntYAzHYA7JTudgEOUTbuaZ52dgC+2WEimLiEpNzSKnJsROxgAE41qDWUBgA2DABmDTiUBWLFkjy05SyVinyoKmqauuZGsCaT5lYIWClRlHY2QW7ufnZ+6TZhkct23pRa7g4Osc5azgEPNn4OufnoheIlVDVgeBDs6gAorRkDNjKYyItrG4tC40s4oloAo5YllnLEjtC9i43A5kn5nDZnLsXnkQD0ihJuJATJQAK4GCCyAFkACqjNkYLmEKhJ2czkomy0Wn29yRfii6MxCFhN2SsVWaSiDjs7lisVyZLI6Dg5gpn36ZVkw2IXPmZiQlmsKScwSumyikoeUQC0qwjvcOJssUujiiPuCr3J716VO+vwgZp5lqWWFOfkoqVVSo8fmFWkOEWiCMoPgzPqyflifiLNiD+r61LqDSjCxj1kCnqLiLR1zxCLdyQSWg2yNVksuO3LIcpX0oNOQ9I5jFrFtAscRNnOjtuCLVOwebtisKJsRsNkRAURFyyw9Eo-6E9nkPryxiAWXkruUXXgVdWeWhLsgt824zG0CNIcjJCsw2vXkVgcWE7QcB0nSPd9jlsfkvS0REYjQ5tNWyIA */
  createMachine(
    {
      context: {
        todos: [] as string[],
        error: undefined as string | undefined,
        todo: '',
      },
      tsTypes:
        {} as import('./todos-machine.typegen').Typegen0,
      schema: {
        services: {} as {
          fetch: {
            data: string[]
          }
        },
        events: {} as
          | {
              type: 'onEdit'
            }
          | {
              type: 'onUpdate'
              value: string
            },
      },
      predictableActionArguments: true,
      id: 'todos-machine',
      initial: 'indicateFetch',
      states: {
        indicateFetch: {
          invoke: {
            src: 'fetch',
            onDone: [
              {
                actions: 'setTodosInContext',
                target: 'read',
              },
            ],
            onError: [
              {
                actions: 'setErrorInContext',
                target: 'error',
              },
            ],
          },
        },
        read: {
          on: {
            onEdit: {
              target: 'edit',
            },
          },
        },
        error: {},
        edit: {
          initial: 'update',
          states: {
            update: {
              on: {
                onUpdate: {
                  actions: 'setUpdateInContext',
                },
              },
            },
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
        setUpdateInContext: assign((_, event) => {
          return {
            todo: event.value,
          }
        }),
      },
    },
  )

export async function fetch() {
  return [
    'todo1',
    'todo2',
    'todo3',
    'todo4',
    'todo5',
    'todo6',
  ]
}
