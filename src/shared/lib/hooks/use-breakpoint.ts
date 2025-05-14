import { useMediaQuery } from './use-media-query'

type BreakPoint = 'xs' | 'sm' | 'md' | 'lg'

const getWidth = (breakpoint: BreakPoint) => {
  switch (breakpoint) {
    case 'xs':
      return 639
    case 'sm':
      return 767
    case 'md':
      return 1023
    case 'lg':
      return 1279
    default:
      throw new Error('Invalid breakpoint')
  }
}

export const useBreakpoint = (breakpoint: BreakPoint) => {
  return useMediaQuery(`(max-width: ${getWidth(breakpoint)}px)`)
}
