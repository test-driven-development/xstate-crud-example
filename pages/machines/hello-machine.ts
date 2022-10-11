import {createMachine} from 'xstate'

export const helloMachine = createMachine({
  predictableActionArguments: true,
  id: 'hello',
  initial: 'notHovered',
  states: {
    notHovered: {
      on: {
        onMouseover: 'hovered',
      },
    },
    hovered: {
      on: {
        onMouseout: 'notHovered',
      },
    },
  },
})
