import {assign, createMachine} from 'xstate'

export const todosMachineFactory = () =>
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLQFsCGAxgBYCWAdmAHTkQkF7JgBiYyxAxBhdWQG6oBrKmgzZ8xclRp0GzVsQTl+9ZCVRkA2gAYAuolAAHTCVXr9IAB6IsARgCcAVgAclOzZsAmJw5tOALADMAGwOQQA0IACe1jZaHn6UAOz+DgHOiR5aWUEAvjkRIpi4hKTc0ipybETsYABOtai1lAYANgwAZo04lIViJZI8tBUsVYp8qCpqmrrmRrAmU+ZWCFgeHmmU8RkBGVq+HjYOEdErTolBlKEBWo5B6+5+iXkF6EXipVS1YHgQ7OoAorRkLNjKYyEsYkFrpQAjY-E5YWkgllEgFjjEsgl4VoAnY7H4-KkHHtniBesUJNxICZKABXAwQWR-MgAVQZshB8zBEJW9icWhhiT2fn2eK0TnRKyCQsoTjxctxQTciUCpPJ7wG1OQdPZjGZAGU8LwwJyFmYkJZIYkHJRpZkCc47AF-JKsOcPJdMs4QloVc7cvkya8+pSqFrKLAjWBOOopOMhD1gxSPpRw5HjWNlAwpto9Ba5mbwRblqsDgEYTZpYkVSrQg5Eq73AEPXZa85fJX1k9A+r+lSgRGozV6o1mm1kJ1at1e6HUwP02BMxNs+pc6bucXIU4PfX7XLkiFfK6giEkn5MvE7OKHHZ-HlA2R0HBzDOU+VZCNiOvFpuVmsNs2N4eDecT+HCjY4jadhQnceyhCKJI9kmGrcF8PzfuaoAljYqIuDYzbxM6ZweO6EGxJQfgns6wrVkE55qshfZhiOtQYUWWHWAcdgtvy0G3je1weK6qI2vBxJOEqWjwg4HgMaIyaagO9KMowbE8rY24enCfjZP4dH4WiUTWOcLgycEBLrNxxI2HJbxMXONILmpv62I85aPNBfiOM4Di7sJ+KUHE4rQYqyI2Uh8koWGQLORxf6YoKwqileEpGacJ6BZksSxE6yRuLZIYfLFlp-sBdgwmVZWgSKfiNvari4R4dG+gE55+PeORAA */
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

export async function fetch() {
  return Array.from([
    'todo1',
    'todo2',
    'todo3',
    'todo4',
    'todo5',
    'todo6',
  ])
}
