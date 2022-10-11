import {createMachine} from 'xstate'

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLQFsCGAxgBYCWAdmAHRmrIASqAbmAE6QDEqZAsqgK6wwTVolAAHTCWQkuokAA9EWACwBmVZQAMqgOw7lygGwAOAEwBOAKzLLAGhABPJacPnKxgIw7Va4+fMexoYeAL4h9mgY2PjE5FREwmwQnDz8gvzIchKwUjJkcooIWK4elPouni6qxpbmyvZORcaalB5eZoaqhnr++mHhIDQQcHKRmLiEpBTUtAzMSVmS0rJICkombhaalvqWqrWamh4NzjqW7qbaZ6qaxs2q5mER6OMxU-GJkIs5y-mrhSoPC1tFdLIdlJpTDsTk1DK1LncIf5gh5TDoniAxtFJnFvrkVqAAToPOdyiZUZ0anUYVgfDp3B5zJ0XGDdEz+iEgA */
  createMachine({
    id: 'todos-machine',
    predictableActionArguments: true,
    initial: 'notHovered',
    states: {
      notHovered: {
        on: {
          onMouseover: {
            target: 'hovered',
          },
        },
      },
      hovered: {
        on: {
          onMouseout: {
            target: 'notHovered',
          },
        },
      },
    },
  })
