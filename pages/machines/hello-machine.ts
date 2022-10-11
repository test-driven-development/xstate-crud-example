import {createMachine} from 'xstate'

const helloMachine = createMachine({
  id: 'hello',
  initial: 'unHover',
  states: {
    unHover: {
      on: {
        onHovered: 'hover',
      },
    },
    hover: {
      on: {
        onUnhovered: 'unHover',
      },
    },
  },
})
