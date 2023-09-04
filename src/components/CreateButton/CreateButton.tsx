import { Button, Icon } from '@chakra-ui/react'
import { RiAddLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

export type CreateButtonProps = {
  title: string
  href?: string
  color?: string
  onPress?: () => void
}

export function CreateButton({
  title,
  href,
  onPress,
  color,
}: CreateButtonProps) {
  return (
    <>
      {href ? (
        <Link to={href}>
          <Button
            as="a"
            size="md"
            fontSize="sm"
            textColor="white"
            cursor="pointer"
            colorScheme={color || 'orange'}
            leftIcon={color ? undefined : <Icon as={RiAddLine} color="white" />}
            onClick={onPress}
          >
            {title}
          </Button>
        </Link>
      ) : (
        <Button
          as="a"
          size="md"
          fontSize="sm"
          textColor="white"
          colorScheme={color || 'orange'}
          cursor="pointer"
          leftIcon={color ? undefined : <Icon as={RiAddLine} color="white" />}
          onClick={onPress}
        >
          {title}
        </Button>
      )}
    </>
  )
}
