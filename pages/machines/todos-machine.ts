import {assign, createMachine} from 'xstate'

export const todosMachineFactory = () =>
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLQFsCGAxgBYCWAdmAHTkQkF7JgBiYyxAxBhdWQG6oBrKmgzZ8xclRp0GzVsQTl+9ZCVRkA2gAYAuolAAHTCVXr9IAB6IsAJhsA2e5S0BGFwA5HdmwE4ANCAAntY+7u7OACwArC5aAMyxAOyuET4AvmkBIpi4hKTc0ipybETsYABO5ajllAYANgwAZtU4lNlieZI8tEUsJYp8qCpqmrrmRrAmI+ZWCLZRETaUcRGJ7h42EfFR9gHBc+5xPpTuNnFe7lHrvi4ZWeg54vlU5WB4EOzqAKK0yOPGpjIM2sLh8cUSlAiLgWLjOPmiUPcexC9ghiS2Pkc9nc8Xs0TuIHauQk3EgJkoAFcDBBZJ8yABVamyf6TQHAuZ2dwQ1ZaRKc7ERRYRZFzewrSguexaCL2WHSjxcglEp5dMnISlMxh0gDKeF4YBZUzMSEsINCS0SfPsNh2NkSPg8uyC1j5UUoazcUXBQq9SoeHRJVDVlFgerAnHUUkGQja-uJz0owdD+oGygYI20ehNEyNQJNs3mNi0kJciTiVxiCRFWFimMoZxiNqhjji7j9onjqt+IbDZUq1VqDWQzXKrWVnVJ3eTYFTQ3T6kzhrZ+bN7mOqIccS0rkSjri1etx23Np8NhcEXOsLbBLI6Dg5nHge6MkYfWIS+mK45CyWi3sUS0ex4RccEnX2LAfEg+tNg8MsHR9dtHgnF43ggD9jVAAsi2ies4hsU5UhtdZeWrHwy3dBx4TLU5LU8RCAwTCoqnKdC80w6wbW3Zx1iiAC1zWc5EgPUITk4xIolPBZIPsejO0nckqRpRhWPZWxYWOTZoi5MJUlWMCXQSd13EWNxVj-fFMkJOMVXk9VpxUr8azWYsri0M4tAk5IHSE505nEiF8PPMUxUlaE4lkmyg1+Bz2I5BIXEhZI+XwgUhWrU4NJxPktDIhIHVuSzH2eGLTW-RxIQcACgKhUDqzcbFcMWS0ZXhI4MgyIA */
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
