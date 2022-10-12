import {assign, createMachine} from 'xstate'

export const todosMachineFactory = () =>
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLQFsCGAxgBYCWAdmAHTkQkF7JgBiYyxAxBhdWQG6oBrKmgzZ8xclRp0GzVsQTl+9ZCVRkA2gAYAuolAAHTCVXr9IAB6IsAJgCsNm5QAcAdgAs7u84CcPgMwAbO4+gQA0IACe1gCMWq5OMTGBMf42rgGBdnYAvjkRIpi4hKTc0ipybETsYABOtai1lAYANgwAZo04lIViJZI8tBUsVYp8qCpqmrrmRrAmU+ZWCLYZdpQZWtmuMc5aWxHRKz5a-i6u-iEeNs7uW855BehF4qVUtWB4EOzqAKK0yFmxlMZCW1hs-nilBsMQCMQ87kCl2Ch2soR8lH88JCgX2iOc8MeIF6xQk3A+Xx+ZAAImAWqwwED5iCwSsYYFnJQfHZAj4CTCtPY7O5USs4u4YpQ7Bc7DE7P4Fe4bIFXESSa8BpATJQAK4GCCyKkAVX1siZCzMSEs4PlGLsp2caR8yRid38oqwKs5WjlrgyqRS8NV+WJzz6ZKoWuQutNjCpAGU8LxGVa5hbQVblrYIe4XFsZSqeclXB7XLzKEjgjsVe5-ASfGqw6S3pQo5RYEmwJx1FJxkIek2Ndw2x3k2NlAwpto9KngYtM+CfDYtJQldzkoL3L5lR7sk4UsufRvHMlG6Jm5qAe3OzV6o1mm1kJ1at11f1h1fR2BxxNJ+pp+aLILmyNgShs+Z3FowTOLcHoqk4zjSs6+yuNkEoPCGb4RpQEB0gy3ZlH2wiDu+VC4fSjA-pM-4zLOzLzqAWYQicXLykq2QwXWdgekkHKUHEGQBPatxJLkmEkdh5H4XUDRNK0HRdAO55DmReGUUov4ggBdHpqyWCwv46yhHKzigbaHLcVEsQxDYGK4nc9qnLZS55CGZDoHA5hYS25SyCMxCAQx1psoJ0K+Fofg7DC9julZYpaI60LcjCrjxHswRiU8ymkZQFIQIFlqMeCkJOBFwrwryWThHF+n5hsPgZH6UE+OhwZZS8OUyY0BUZkVIXClK2Q+gqxbSqW2QuMxgRZMkfKZaG2XYW2eoGowPV6RCBLQn6vIZGkGUijVfrrEiyUtVBBnuGeHVLZ+nbrcBthORWqSXFBniuL41VHFgeySgGn1ykiwq1td4YtlGD19bYPJnPadZOi6boem4ZwBg6JyyjYYMXtwUlrTpQHQ8uMIuPKQqmZ4So8Vo7iuFKZZ2H4dYeGkOMqZQFAAO4AASwMgsg8zEUPBfpS4YsihmGUkiK1jxMKcoE9heKdPoSuzpEi0xLW5musq4qB27fbEtkrkrdP2DBtMwmJeRAA */
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
          save: {
            data: void
          }
          delete: {
            data: void
          }
        },
        events: {} as
          | {
              type: 'onEdit'
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
            onDelete: {
              target: 'delete',
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
                      '#todos-machine.indicateFetch',
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
                target: 'indicateFetch',
              },
            ],
            onError: [
              {
                target: 'new state 1',
              },
            ],
          },
        },
        'new state 1': {},
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
