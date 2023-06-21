import { Button, Icon } from '@chakra-ui/react'
import { MdQrCode } from 'react-icons/md'

type QrCodeButtonProps = {
  onClick?: () => void
}

export function QrCodeButton({ onClick }: QrCodeButtonProps) {
  return (
    <Button
      display="flex"
      variant="unstyled"
      onClick={onClick}
      bg="transparent"
      width={8}
      leftIcon={<Icon boxSize={8} as={MdQrCode} color="whiteAlpha.800" />}
    />
  )
}
