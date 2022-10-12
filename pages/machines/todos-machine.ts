import {assign, createMachine} from 'xstate'

export const todosMachineFactory = () =>
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLQFsCGAxgBYCWAdmAHTkQkF7JgBiYyxAxBhdWQG6oBrKmgzZ8xclRp0GzVsQTl+9ZCVRkA2gAYAuolAAHTCVXr9IAB6IsAJgCsNm5QAcAdgAs7u84CcPgMwAbO4+gQA0IACe1gCMWq5OMTGBMf42rgGBdnYAvjkRIpi4hKTc0ipybETsYABOtai1lAYANgwAZo04lIViJZI8tBUsVYp8qCpqmrrmRrAmU+ZWCLYZdpQZWtmuMc5aWxHRKz5a-i6u-iEeNs7uW855BehF4qVUtWB4EOzqAMIfslmxlMZCW1hs-nilE8PhsgWcqTiN0O1h8ri0lBs8X8oQuMRsaPcjxAvWKEm4AO+6gAImAWqwwED5iCwSsbMkfJRAkFnNl8XsEeEorEtjENj53L5ITE7O5UjZiaTXgMCADGJQAK4GCCyH5kACq2sBSBAcwWZhNy1sdhxlDsp2caR8yRid38KJWgVczkoWhlrgyqRSMQDiuefXJVFVn3VWp1jD1AGU8LxGSazSzLeCIe4XFsLnYvYXkq4PVhXIFOdzgjsve5-AifGHRGS3pRo7JKLAU2BOOopOMhD1w62VWqqN3U2NlAwpto9OngYss2zYRj3AS7MktDZJbChUcsNknCksX7t45ks2Xv1uB31ZPe3UGk1Wh0usOW8q7+Ouz3pxMs7qPOTLmqCK62LuYronYHj7MEzi3GWXpOLygb7K42Ryg8+QkiO35UBAdIMn2ZSDsI+G3oRxGMABkzATMi7MsuoBWhCJyUD4NobtkiENnYZZJPClBxBkAT2rcSS5LhSpUZQRH0gmz6NM0bTIJ0tTdLJkbyTRYB0UB0wLoYS4WqxsRcZybj7IhXGFpcgklpxvKpAkG5aL4RIyZROkKQyWDKbU7AWLAyCdng7SMLUAAUMr7AAlOw2ltn5jABfUjSgZm5lso6Zywd4Xh3Bk6TOIJu6cpsNw+Ih6RaF6eS4WQ6BwOYyUDOUsgjMQWUsZY4JiZivhaH4OzsvY7rCiscSOpiXHsui3r1V414Rm2lK9WZ-VsgSThFa6CKnBWzgHiK3hcm4bgBqEpwbqto7cIFm3gTlqyyna2R+v4-glrBZaYeszjsYEWQcry90Ee2v5xsaJnMVtbENmK6QVmiARwkV-2YVyOIOBK9UxAEXlPF+cn3hOPbPaytinCeqSXMt7jeqEZZ7GKQbejK3KyvWENk+OVMQfY3J2g6Toum6rMXCJQQOicW5YjEfO+XpguvVi7IuDa9jeLung2IJWhM3aFZ2H4DYeGkyspXp6Uvmr21YITcobIEWweRcaL4jE5XZOK31yrKfpZDhJM3pGDtsRKuYblxF57nCglpK44pwjuASpCNOF5EAA */
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
                actions: 'setErrorInContext',
                target: 'delete-error',
              },
            ],
          },
        },
        'delete-error': {
          after: {
            '1500': {
              target: 'indicateFetch',
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
