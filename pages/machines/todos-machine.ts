import {createMachine, assign} from 'xstate'

export const todosMachineFactory = () =>
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLQFsCGAxgBYCWAdmAHTkQkF7JgBiYyxAxBhdWQG6oBrKmgzZ8xclRp0GzVsQTl+9ZCVRkA2gAYAuolAAHTCVXr9IAB6IsAFgCMNyloAcdgKwB2OwCYAbFoc3dwAaEABPawBmb0c3by1fXzctAE4tGOc3GwBfbNCRTFxCUm5pFTk2InYwACca1BrKAwAbBgAzBpxKArFiyR5acpZKxT5UFTVNXXMjWBNJ8ysELF9vO0p4zPS3FN93LRtQiOX470pfZ2cPAPcUh1Tc-PRC8RKqGrA8CHZ1AFFaZAzYymMiLax2FLOSh2FxeBzXbweZzeNxHazeNaULyRLyJLI2FwpSKPEA9IoSbiQEyUACuBggsh+ZAAqvTZEC5iCwct3GccQ4bJF0nZInFomiEFpzh40s5fB5BSKAncUrk8iAyOg4OYya9+mVZMNiBz5mYkJZrKtHFdVt5nCkPPiJVhIqKsXYLn4CQS3PiSbq+twPl8TVzzUssBDIpQhSjvCldkK3HtvM7IjCNttUpFEgF4h5-c9ehSqLV6jVQwtw9ZPB5KG5ov47XYfDjDuFrM5ozYUjYgjFXX3os5C6JyW9KFTkLS2YxK2bQBGYo4UsvMt5Is4+zLUx3ltdKNutI2Fa4G95Ry9A6WAfPQdWThdKKubDZ15vtylnQ4zn3VmkAl8SI7i0NxL2LN4725FY30oG0MXtR1X2dAk61xGFnAOIUCRHNUgA */
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
                onUpdate: {},
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
      },
    },
  )
