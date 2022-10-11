import {createMachine, assign} from 'xstate'

export const todosMachineFactory = () =>
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLQFsCGAxgBYCWAdmAHQBmYyxAkmRCQXspAMQYWXkBuqANZU0GbPmLkqtekSYs2HCAgGolJVGQDaABgC6iUAAdMJZJrJGQAD0RYATADYAnJQAcARicBWACwAzC4OAOzuobohADQgAJ72DsGUfp6eLu6+AX4uOU5+AL75MWKYuISkvLKMzKzsXGAATg2oDZTGADbs1C04lCUS5dI0dNWKdSpqGlp6hkggprDmltZ2CFh+7u6Uuik+IQ4OAYcuTu4+MfFrnrpuARk+TgHeDroBPgGFRSBk6HDW-WUpJURvIakpINYFkstCt7D5dFsXLpPD54QEQvCXPC-Bd7AEdslPO4ET5ia9siFCsV0KVJBUZCCIXMoRYYXNVo4-B4XqEci8XCFdIcnLi1qFES93H49i5PIKAnkqSAAXSho1mg0mSYzKyrOz7H4QgFKNcXE9nhkiX4RXFEFsnEKQtKFUaMRklSrBhRITrlvq1u8HJQkSi0RibudbWt0U5CUb4QcMq53J98kA */
  createMachine(
    {
      tsTypes:
        {} as import('./todos-machine.typegen').Typegen0,
      schema: {
        services: {} as {
          fetch: {
            data: string[]
          }
        },
      },
      context: {
        todos: [] as string[],
        error: undefined as string | undefined,
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
