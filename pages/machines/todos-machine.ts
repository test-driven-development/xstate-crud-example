import {createMachine} from 'xstate'

export const todosMachineFactory = () =>
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLQFsCGAxgBYCWAdmAHRmrIASqAbmAE6QDEqZAsqgK6wwTVolAAHTCWQkuokAA9EWAEwAWSgEYNygAwA2ZXoDMRvXoAcGowBoQAT0THKygKx7V7natUvzAdg0-PQBfYNs0DGx8YnIqImE2CE4efkF+ZDkJWCkZMjlFBBUdSg8jPxcjAE4jVWVTFxdbB0K9Ss1VKorqytqPULCQGgg4OQjMXEJSCmpaBmZEzMlpWSQFJUqXEp0-Ix0NSuqNHUtzJqUNEt2q2p0dDb8g1VDw9HHoqbiEyEXs5bzVgpBSiVcz6ZTKB57FyuZRnFqUPyqHq7AyVLyqUFPAZjKKTWI-HIrUAFLBaNqqba7faHY4aU72c6qC4aDq6HQufSg-RY0JAA */
  createMachine({
    predictableActionArguments: true,
    id: 'todos-machine',
  })
