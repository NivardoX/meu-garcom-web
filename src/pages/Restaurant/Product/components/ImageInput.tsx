import React, { useState } from 'react'
import { Box, Image } from '@chakra-ui/react'

interface ImageInputProps {
  name: string
  label: string
  url?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function ImageInput({ url, ...props }: ImageInputProps) {
  const [preview, setPreview] = useState<string | null>(url || null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileChange(file)
      props.onChange(event)
    }
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleFileChange = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const inputRef = React.useRef<HTMLInputElement | null>(null)

  return (
    <Box position="relative" marginTop="10px">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(event) => handleChange(event)}
        style={{
          opacity: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: '100%',
          height: '100%',
          cursor: 'pointer',
        }}
      />
      {preview ? (
        <Image
          src={preview}
          alt="Imagem do Produto"
          maxW={500}
          maxH={500}
          marginTop={8}
        />
      ) : (
        <Box
          bgColor="gray.900"
          color="gray.400"
          textAlign="center"
          borderRadius="md"
          p={2}
          fontWeight="medium"
          fontSize="md"
          _hover={{ bgColor: 'gray.700', cursor: 'pointer' }}
        >
          Clique para adicionar uma imagem
        </Box>
      )}
    </Box>
  )
}
