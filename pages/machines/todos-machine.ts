import {createMachine} from 'xstate'

export const todosMachineFactory = () =>
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLQFsCGAxgBYCWAdmAHQBmYyxAkmRCQXspAMSpkDCqOAA4AbOmEShBmEshI8JIAB6IsARgDMAFkoAGLQHYAbOo3qAHAFZ9FgEwAaEAE8VqwzcqG3l9eps79AJw6hgC+IQ5oGNj4xORUtPRETCxsHBDcZACiAE7ZqNkKUrAycmQKyghYJqqUmmaGwToB+vomZuoWDs6VZvqUNsa9hgFmZqoWEzZh4SBk6HAKkZi4hKQUNHSMzKzskIXSsvJISipaFv0Bmjqqqjb6N4aBhl0uhmYehhZmAW+BN21hCLoZYxNbxTZEPbHIolI6gCpqVQBShmHTfdTWTxImx3F6VW6UCaaEYWczjCzNXyAkBLaKrOKUMC5fJQyQHUrlU4aSgaazjTS8v54tTuIkkskTZo2MzU2krWIUfbFQ5lY4I9TDC5XG53B5PYU2K4fCy3L6te6qaYhIA */
  createMachine(
    {
      predictableActionArguments: true,
      id: 'todos-machine',
      initial: 'fetchIndicated',
      states: {
        fetchIndicated: {
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
