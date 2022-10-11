// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'done.invoke.todos-machine.indicateFetch:invocation[0]': {
      type: 'done.invoke.todos-machine.indicateFetch:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'error.platform.todos-machine.indicateFetch:invocation[0]': {
      type: 'error.platform.todos-machine.indicateFetch:invocation[0]'
      data: unknown
    }
    'xstate.init': {type: 'xstate.init'}
  }
  invokeSrcNameMap: {
    fetch: 'done.invoke.todos-machine.indicateFetch:invocation[0]'
  }
  missingImplementations: {
    actions: 'setUpdateInContext'
    services: 'fetch'
    guards: never
    delays: never
  }
  eventsCausingActions: {
    setErrorInContext: 'error.platform.todos-machine.indicateFetch:invocation[0]'
    setTodosInContext: 'done.invoke.todos-machine.indicateFetch:invocation[0]'
    setUpdateInContext: 'onUpdate'
  }
  eventsCausingServices: {
    fetch: 'xstate.init'
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | 'edit'
    | 'edit.update'
    | 'error'
    | 'indicateFetch'
    | 'read'
    | {edit?: 'update'}
  tags: never
}
