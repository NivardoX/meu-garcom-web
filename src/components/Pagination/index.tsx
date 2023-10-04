import { HStack, Box, Text } from '@chakra-ui/react'
import { PaginationItem } from './PaginationItem'

export type PaginationProps = {
  totalCountOfRegisters: number
  registerPerPage?: number | undefined
  currentPage?: number | undefined
  onPageChange: (page: number) => void
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

export default function Pagination({
  registerPerPage = 10,
  currentPage = 1,
  ...rest
}: PaginationProps) {
  const lastPage = Math.ceil(rest.totalCountOfRegisters / registerPerPage)

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : []

  return (
    <HStack mt="8" justify="space-between" align="center" spacing="6">
      <Box>
        <strong style={{ color: 'white' }}>{currentPage}</strong>
        <strong style={{ color: 'white' }}> de </strong>
        <strong style={{ color: 'white' }}>{lastPage}</strong>
      </Box>
      <HStack spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem onPageChange={rest.onPageChange} number={1} />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => {
            return (
              <PaginationItem
                onPageChange={rest.onPageChange}
                key={page}
                number={page}
              />
            )
          })}

        <PaginationItem
          onPageChange={rest.onPageChange}
          number={currentPage}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return (
              <PaginationItem
                onPageChange={rest.onPageChange}
                key={page}
                number={page}
              />
            )
          })}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem
              onPageChange={rest.onPageChange}
              number={lastPage}
            />
          </>
        )}
      </HStack>
    </HStack>
  )
}
