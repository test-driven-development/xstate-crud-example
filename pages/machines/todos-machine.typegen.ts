// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'done.invoke.todos-machine.create.save:invocation[0]': {
      type: 'done.invoke.todos-machine.create.save:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.todos-machine.delete:invocation[0]': {
      type: 'done.invoke.todos-machine.delete:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.todos-machine.indicateFetch:invocation[0]': {
      type: 'done.invoke.todos-machine.indicateFetch:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'error.platform.todos-machine.create.save:invocation[0]': {
      type: 'error.platform.todos-machine.create.save:invocation[0]'
      data: unknown
    }
    'error.platform.todos-machine.delete:invocation[0]': {
      type: 'error.platform.todos-machine.delete:invocation[0]'
      data: unknown
    }
    'error.platform.todos-machine.indicateFetch:invocation[0]': {
      type: 'error.platform.todos-machine.indicateFetch:invocation[0]'
      data: unknown
    }
    'xstate.init': {type: 'xstate.init'}
  }
  invokeSrcNameMap: {
    delete: 'done.invoke.todos-machine.delete:invocation[0]'
    fetch: 'done.invoke.todos-machine.indicateFetch:invocation[0]'
    save: 'done.invoke.todos-machine.create.save:invocation[0]'
  }
  missingImplementations: {
    actions: never
    services: 'fetch' | 'save' | 'delete'
    guards: never
    delays: never
  }
  eventsCausingActions: {
    setErrorInContext:
      | 'error.platform.todos-machine.create.save:invocation[0]'
      | 'error.platform.todos-machine.delete:invocation[0]'
      | 'error.platform.todos-machine.indicateFetch:invocation[0]'
    setTodosInContext: 'done.invoke.todos-machine.indicateFetch:invocation[0]'
    setUpdateInContext: 'onUpdate'
  }
  eventsCausingServices: {
    delete: 'onDelete'
    fetch:
      | 'done.invoke.todos-machine.create.save:invocation[0]'
      | 'done.invoke.todos-machine.delete:invocation[0]'
      | 'xstate.init'
    save: 'onSave'
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | 'create'
    | 'create.save'
    | 'create.update'
    | 'delete'
    | 'error'
    | 'indicateFetch'
    | 'new state 1'
    | 'read'
    | {create?: 'save' | 'update'}
  tags: never
}
