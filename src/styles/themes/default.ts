import { extendTheme } from '@chakra-ui/react'

export const defaultTheme = extendTheme({
  colors: {
    gray: {
      '900': '#181B23',
      '800': '#1F2029',
      '700': '#353646',
      '600': '#4b4d63',
      '500': '#616480',
      '400': '#797D9A',
      '300': '#9699B0',
      '200': '#b3b5c6',
      '100': '#D1D2DC',
      '50': '#EEEEF2',
    },
    default: {
      default: '#7D3421',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
        option: {
          background: ' #181B23 !important',
        },
      },
    },
  },
})
