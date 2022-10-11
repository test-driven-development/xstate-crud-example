// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'xstate.init': {type: 'xstate.init'}
  }
  invokeSrcNameMap: {
    fetch: 'done.invoke.todos-machine.fetchIndicated:invocation[0]'
  }
  missingImplementations: {
    actions: never
    services: 'fetch'
    guards: never
    delays: never
  }
  eventsCausingActions: {}
  eventsCausingServices: {
    fetch: 'xstate.init'
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: 'errored' | 'fetchIndicated' | 'fetched'
  tags: never
}
