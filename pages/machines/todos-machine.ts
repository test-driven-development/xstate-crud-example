import {createMachine, assign} from 'xstate'

export const todosMachineFactory = () =>
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLQFsCGAxgBYCWAdmAHQBmYyxAkmRCQXspAMQYWXkBuqANZU0GbPmLkqtekSYs2HCAgGolJVGQDaABgC6iUAAdMJZJrJGQAD0RYATADYAnJQAcARicBWACwAzC4OAOzuobohADQgAJ72DsGUfp6eLu6+AX4uOU5+AL75MWKYuISkvLKMzKzsXGAATg2oDZTGADbs1C04lCUS5dI0dNWKdSpqGlp6hkggprDmltZ2CFg+kR6B2T4BIT5OuuEx8WueQR7uAQGePqlOIefXhUUgZOhw1v1lUpUj8jUlJBrAslloVvYNu5KC5dLcNnsNi4Nn4TvYAro-MlPO4jj5cbosi4QoViuhSpIKjJ-sC5qCLOC5qtHFjwrpQjkHLpieyAk40WtQtDgkc-D4Qi5PCFCXlSSBvpSho1mg1aSYzAyrEz7H4QgFKJ5uTdvA4Mji-Py4ohoYdQmK+Xr9hk5QrBhQQRrltq1rsHDC4T4EftuT4BVg9k5sXrAp4UsFdk4XvkgA */
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
                target: 'fetched',
                actions: 'setTodosInContext',
              },
            ],
            onError: [
              {
                target: 'errored',
              },
            ],
          },
        },
        fetched: {},
        errored: {},
      },
    },
    {
      actions: {
        setTodosInContext: assign((_, event) => {
          return {
            todos: event.data,
          }
        }),
      },
    },
  )
