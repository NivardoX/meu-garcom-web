import { Stack, Image } from '@chakra-ui/react'

type ProductImageProps = {
  url?: string
}

export function ProductImage({ url }: ProductImageProps) {
  return (
    <Stack direction="row">
      <Image
        borderRadius={8}
        boxSize="55px"
        objectFit="cover"
        src={url || 'https://bit.ly/dan-abramov'}
        alt="image"
      />
    </Stack>
  )
}
