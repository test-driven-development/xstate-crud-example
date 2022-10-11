import {createMachine} from 'xstate'

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLQFsCGAxgBYCWAdAHarIASqAbmAE6QDEqFAsqgK6xgNmiUAAdMJZCQ7CQAD0QAmAMwA2MgFYAjABYADMqXrtSgBxLjAGhABPRJt2aNKhQE4jKwwt0B2E94C+-lZoGNj4xOREgiwQ7Fy8-LzIMmKwElIUMvIICq5k2graJmbG2prqxSpWtghY6i5krpom6t7NJtouxSaBQSBUEHAyIZi4hKSU1HSMMSniktJIcoguumQmupulpgoqukpK1XaOPip7muZnLgUqmoHB6KPhE1EzkHNpC5lL2abajUpvICCto9iYjggLhpvGcHJcVNcFN51PcQCMwuMSB90otQNkzutNrptiZdvtDjZEFgLo4mroXKptN5mfsAr0gA */
  createMachine({
    predictableActionArguments: true,
    id: 'todos-machine',
  })
