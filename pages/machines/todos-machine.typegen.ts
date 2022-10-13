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
    'done.invoke.todos-machine.indicateRead:invocation[0]': {
      type: 'done.invoke.todos-machine.indicateRead:invocation[0]'
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
    'error.platform.todos-machine.indicateRead:invocation[0]': {
      type: 'error.platform.todos-machine.indicateRead:invocation[0]'
      data: unknown
    }
    'xstate.after(3000)#todos-machine.delete-error': {
      type: 'xstate.after(3000)#todos-machine.delete-error'
    }
    'xstate.init': {type: 'xstate.init'}
  }
  invokeSrcNameMap: {
    delete: 'done.invoke.todos-machine.delete:invocation[0]'
    read: 'done.invoke.todos-machine.indicateRead:invocation[0]'
    save: 'done.invoke.todos-machine.create.save:invocation[0]'
  }
  missingImplementations: {
    actions: never
    services: 'read' | 'save' | 'delete'
    guards: never
    delays: never
  }
  eventsCausingActions: {
    setErrorInContext:
      | 'error.platform.todos-machine.create.save:invocation[0]'
      | 'error.platform.todos-machine.delete:invocation[0]'
      | 'error.platform.todos-machine.indicateRead:invocation[0]'
    setTodosInContext: 'done.invoke.todos-machine.indicateRead:invocation[0]'
    setUpdateInContext: 'onUpdate'
  }
  eventsCausingServices: {
    delete: 'onDelete'
    read:
      | 'done.invoke.todos-machine.create.save:invocation[0]'
      | 'done.invoke.todos-machine.delete:invocation[0]'
      | 'onRead'
      | 'xstate.after(3000)#todos-machine.delete-error'
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
    | 'delete-error'
    | 'error'
    | 'indicateRead'
    | 'read'
    | {create?: 'save' | 'update'}
  tags: never
}
