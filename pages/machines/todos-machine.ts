import {assign, createMachine} from 'xstate'

export const todosMachineFactory = () =>
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLQFsCGAxgBYCWAdmAHTkQkF7JgBKYeEAxBhdWQG6oBrKmgzZ8xclRp0GzVhATl+9ZCVRkA2gAYAuolAAHTCVXr9IAB6IsAJgCsAFgeUAHAGYXAdgBs3u3ZsHbzcAGhAAT2sARiibG1cATm8kt0cXOzckgF8ssJFMXEJSbmkVOTZ2MAAnKtQqygMAGwYAMzqcSnyxIskeWjKWNkU+VBU1TV1zI1gTcfMrBFsfBMoErQSkrU8HKIcEt1CI6xcXb0pPO1PvWOvvG083HLz0AvFiqir5dnUAYU-ZKbGUxkebWGxuLaUJwJGzeFxRNxRLQ2FxhSKLBKeLSUGxbTLeB6xTEOJ4gLqFCTcf4cdQAETAjTAjEBM2BoMWNiiyUowTh-liLi08O8aOiWjsUXOCQcLn2WiijgRNlJ5LevQI-0YlAArgYILJvmQAKp6gFIEDTWZmc0LWwZFZ2LQeNw2BJc3ZO0WLAkuSjyuyeTxutzXKKBlUvbqUqga1ha3X6xiGgDKeF4YBZVpBNrB4OcgoDqQJdluni9WGWPJDDk8XO2HiiCQjogp70osdklFgabAnHUUhGQk6kdb6s1VG76eGygY420enNlrZOY5bpWbgc9ghJa8yIc5cczm8WmuGxP7ll3mbrx63A7WsnveqtXqTVa7WHLbVd-HXZ709GWd1HnTNl1AW04h2c5xW2LQTxlFx9yOb1PHidIgyRLZ-B2FxryjNsIAZJley4Ad+CHVVbyoQjGUYACxmAyZFyBOYV1sEMVlddZpQDXY-HLWIET9ANghrIVvCcK9cjJEdv2ooik2fOoGmaZA2iqDpKOjSgaOI+igImBdDBY61wOiTZVmSXFrhwySBKiWVVn2BVkkyBJLjsPDR24XTGCwJSqkNQYIFA1izI5CS0KDOxpRhIVkQE+5fSRO4nE5OCA2VaStIIhSwH8mo6nYCxYGQTs8BaRgqgACghOCAEp2By3pfPygLQtMywwROSUSxRJxaz2S4kPRLAESE1JN0dMNj22JtSTIdA4HMZqSjIfpZGCjrs3C2wTjcKFcSRRx3JdXZ7MRSgw0dU53M8W6vLkyhqW29lbFdeIHEVGUkTcHxTgE8VfThe7AyDY8Nyy54vyoyh2uY1kwq6jlUOB7YdhBlwbHLB5fSxYMnUdazPOy2TYfvKgEzNYzEc6iCGxxQNkiDF0JMcHGLirdzXQcE9Gw3R7yd-R9XrY3EXR5BEN3gmtL3LQVJQRH0XMmhxHlJmHtIp0XdvsYJKEdZ1XXdXnDlGrwDqVp1j2PWE7kF7TWp15HbGRSV0hdfwsacTdAZrA2fBi-YvDVqGZM13LaLawqqmd21G03VwYoyeKYX5ASIQO-Ha2PcUnCxh33jjsFpQOyGU53LFAgz9JKFSVJcXR+x3ByHIgA */
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
          read: {
            data: string[]
          }
          save: {
            data: void
          }
          delete: {
            data: void
          }
        },
        events: {} as
          | {
              type: 'onCreate'
            }
          | {
              type: 'onSave'
            }
          | {
              type: 'onUpdate'
              value: string
            }
          | {
              type: 'onDelete'
              todo: string
            }
          | {
              type: 'onRead'
            },
      },
      predictableActionArguments: true,
      id: 'todos-machine',
      initial: 'indicateRead',
      states: {
        indicateRead: {
          entry: 'clearErrorsFromContext',
          invoke: {
            src: 'read',
            onDone: [
              {
                actions: 'setTodosInContext',
                cond: 'notEmpty',
                target: 'read',
              },
              {
                target: 'create',
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
            onCreate: {
              target: 'create',
            },
            onDelete: {
              target: 'delete',
            },
          },
        },
        error: {},
        create: {
          initial: 'update',
          states: {
            update: {
              on: {
                onUpdate: {
                  actions: 'setUpdateInContext',
                },
                onSave: {
                  target: 'save',
                },
              },
            },
            save: {
              invoke: {
                src: 'save',
                onDone: [
                  {
                    target:
                      '#todos-machine.indicateRead',
                  },
                ],
                onError: [
                  {
                    actions: 'setErrorInContext',
                    target: 'update',
                  },
                ],
              },
            },
          },
        },
        delete: {
          invoke: {
            src: 'delete',
            onDone: [
              {
                target: 'indicateRead',
              },
            ],
            onError: [
              {
                actions: 'setErrorInContext',
                target: 'delete-error',
              },
            ],
          },
        },
        'delete-error': {
          after: {
            '3000': {
              target: 'indicateRead',
            },
          },
          on: {
            onRead: {
              target: 'indicateRead',
            },
          },
        },
      },
    },
    {
      guards: {
        notEmpty: (_, event) => {
          return event.data.length > 0
        },
      },
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
        clearErrorsFromContext: assign(
          (context, _) => {
            return {
              error: undefined,
            }
          },
        ),
      },
    },
  )
