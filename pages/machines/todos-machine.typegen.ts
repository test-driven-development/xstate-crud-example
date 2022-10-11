// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'done.invoke.todos-machine.fetchIndicated:invocation[0]': {
      type: 'done.invoke.todos-machine.fetchIndicated:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'xstate.init': {type: 'xstate.init'}
  }
  invokeSrcNameMap: {
    fetch: 'done.invoke.todos-machine.fetchIndicated:invocation[0]'
  }
  missingImplementations: {
    actions: 'setTodosInContext'
    services: 'fetch'
    guards: never
    delays: never
  }
  eventsCausingActions: {
    setTodosInContext: 'done.invoke.todos-machine.fetchIndicated:invocation[0]'
  }
  eventsCausingServices: {
    fetch: 'xstate.init'
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: 'errored' | 'fetchIndicated' | 'fetched'
  tags: never
}
