import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Accordion as ChakraAccordion,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type AccordionProps = {
  title: string
  children: ReactNode
}

export function Accordion({ title, children }: AccordionProps) {
  return (
    <ChakraAccordion defaultIndex={[-1]} allowMultiple>
      <AccordionItem border="none">
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{children}</AccordionPanel>
      </AccordionItem>
    </ChakraAccordion>
  )
}
