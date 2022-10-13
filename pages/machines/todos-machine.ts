import {assign, createMachine} from 'xstate'

export const todosMachineFactory = () =>
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLQFsCGAxgBYCWAdmAHTkQkF7JgBKYeEAxBhdWQG6oBrKmgzZ8xclRp0GzVhATl+9ZCVRkA2gAYAuolAAHTCVXr9IAB6IsAJgCsNm5QAcAdgAs7u84CcPgMwAbO4+gQA0IACe1gCMWq5OMTGBMf42rgGBdnYAvjkRIpi4hKTc0ipybOxgAE41qDWUBgA2DABmDTiUhWIlkjy0FSxsinyoKmqauuZGsCaT5lYIthl2lBla2a4xzlqbEdHLPlr+Lq7+IR42zu6bznkF6EXipVQ18uzqAMLvsjPGpjIi2sNn88Uonh8NkCzlScWuB2sPlcWkoNni-lC5xiNmR7geIB6xQk3F+HHUABEwM0wIx-nNAcDljZkj5KIEgs5sjjdrDwlFYpsYusfO5fGCYnZ3KkbASiS9+gRfoxKABXAwQWSfMgAVQ1fyQIFm8zMhqWtjsmModhOzjSPmSMVu-kRy0CrmclC0ktcGVSKRivrlT16JKoStYKvVmsY2oAynheGB6SagWaQaD3C5Nuc7O688lXK6sK5AmyOcFtu73P5YT5g6Jia9KBHZJRYImwJx1FIxkJuiGm4rlVQO0nRsoGJNtHpDcbGenmVDUe5cXZklobGKofzDlhsk4UujvRvHMkG88+txWyqx13avVGi12p0B42FdeR+3OxPxlP1DOKYLqA5qONK6w5rcWjBM4NzFu6Thcn6eyuNk0r3PkhKDh+VAQNStJdlwvb8P28pXrh+GML+EwAdMc4Agsi62JiqI+Jaq7ZLBtZ2MWSQwpQcQZAENo3EkuSYWRYaUHhNKxg+DRNK0yAdDUXSSc2MkEdR-5TLOhgMaaIGxGxbJuHssFsXmFy8YWlA+FyqQJKuWi+PiEnYeR0mUWAWDyTU2rDBAQGMUZzIwqcvgpNBcIeGxvGOGyDruOc9mBt6ooXqGGneb5dQNOwFiwMgbZ4G0jA1AAFGCewAJTsOp-SaYwuWPsFhmWCCNyeoEgQuaheLbOc8VZNaWTQqEASBgEeSYWQ6BwOYDVlGQgyyIFbVpqFKx+GivhaH42wsvYLoCsscR2mibEsiiHrQV4mVDqS8gbUyti4k4XjSmKcT+KWzi7oK3jsm4bi+qEJyrg9OGUH5L1MekUrWtk3r+P4hZ2EWp0ltkLigqEWSslyUOeTeVDRga+kMiFHXMrWwrpKWyIBNCn3Fr6awcldorRQEbmPO+JNfnecNbeiaTsqkFx3clkXFrswr+h6koclKNbE1JpMizTFoctatr2o6zpy+cAlBLaxzrrK7kC1JTXJvRVPtaBm7ClyaScVung2LxWjJdapZ2H4tYeGk6vZbJPmww7qavTEorCqWmx9Zih0xPFOMZKj0pSt6WQYfzl5hlroGilmq5sae27QrxqOuKNXhoy5Nagv4M05EAA */
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
