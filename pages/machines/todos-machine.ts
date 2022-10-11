import {createMachine, assign} from 'xstate'

export const todosMachineFactory = () =>
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLQFsCGAxgBYCWAdmAHQBmYyxAkmRCQXspAMQYWXkBuqANZU0GbPmLkqtekSYs2HCAgGolJVGQDaABgC6iUAAdMJZJrJGQAD0RYATAFYAzJQCcTgIxP3ugBy6nl4A7AA0IACe9g6elLoh-i7+SV4AbCG6aQC+2RFimLiEpLyyjMys7FxgAE41qDWUxgA27NQNOJQFEsXSNHTlilUqahpaeoZIIKaw5pbWdghYTk668cnu-gAsLmkbDmkR0UteWw6UTlvuae4Hul73ugm5+eiFkiUyA0RcBDVgVWsMzmWgWiHcW0oIVuWxCKxcB3cLnc4Si9i8DjcuhWW38XhRIXxIRCuTyIDI6Dg1m6RSkpW+CkqyiBZgsoKmi2W3niKN0yN2Lhc0KcR3sLgS8W2Wz2Dm2aWlWxeIBpHz6ZR+EBZszZVg5iH8IUoN3cKLSaQczi8QsOaKWsq8FwNmMuDlh2IcSpVvV4tXq-01U2BOrBS28Tko4txTzS6T8sVFCHDSL2GRS4uhGPcnrePTpVD+AOZgdZ8z1CBSPNdAStV3xLi8CaTAtTSQS7itOTJXrzWpButAnKccJ5mX5eyFngTWAnkqFWyumL2oUVpKAA */
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
        created: {},
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
