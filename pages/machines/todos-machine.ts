import {createMachine} from 'xstate'

export const todosMachineFactory = () =>
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLQFsCGAxgBYCWAdmAHQBmYyxAkmRCQXspAMQYWXkBuqANZU0GbPmLkqtekSYs2HCAgGolJVGQDaABgC6iUAAdMJZJrJGQAD0RYATAHYAHJQCcugIy6HXgCwOuq6+ADQgAJ72zg4eXk6uLroArO4u7n4AzAC+2eFimLiEpLyyjMys7FxgAE41qDWUxgA27NQNOJQFEsXSNHTlilUqahpaeoZIIKaw5pbWdghY-i5uuv5eyU4ODpm77gBsLsnhUUs+7pSZLgfJB5leB0GZyTm54WTocNbdRVKlA3kFSUkGsMzmWgW9mSujcnk2MMyThh7hh-lO9ky60oGySxySuky-ncTneIF+khKMkBoKm4IskKmiyw7i8lF0KQcJNRBwSyUCGKWzjhQRcDwOXhcfn8pLy5PQhUpfVq9RqtJMZgZViZ9hlmUoFwejwcN0l-gOgrcB18Tn8r15SOSNzJFN6FDBmvmOqWr1i8OSiORulRgqwSIOOPimV5-ky7kyRNRuVyQA */
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
      actions: {},
    },
  )
