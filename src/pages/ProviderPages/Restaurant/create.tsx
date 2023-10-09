import { Box, SimpleGrid, VStack } from '@chakra-ui/react'
import { CreateContent } from '../../../components/CreateContent'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormButton } from '../../../components/Form/FormButton'
import { Input } from '../../../components/Input'
import { apiProvider } from '../../../service/apiProvider'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useAppToast } from '../../../hooks/useAppToast'
import { ImageInput } from '../../Restaurant/Product/components/ImageInput'

export type CreateRestaurantProps = {
  restaurantName: string
  managerName: string
  username: string
  password: string
  restaurantConfirmPassword: string
  expiresAt: Date
}

const CreateRestaurantValidationSchema = zod.object({
  restaurantName: zod.string().min(1, 'Informe a categoria do produto'),
  managerName: zod.string().min(1, 'Informe o preço do produto'),
  username: zod.string().min(1, 'Informe a descrição do produto'),
  password: zod.string().min(6, 'Informe a descrição do produto'),
  restaurantConfirmPassword: zod.string().min(1, 'Informe o preço do produto'),
  expiresAt: zod.string().min(1, 'Informe a Categoria'),
})

export function CreateRestaurant() {
  const [submited, setSubmited] = useState<boolean>(false)
  const [maxTables, setMaxTables] = useState()
  const { handleRequestError, handleRequestSuccess } = useAppToast()
  const [productImage, setProductImage] = useState<File | undefined>(undefined)

  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm<CreateRestaurantProps>({
    resolver: zodResolver(CreateRestaurantValidationSchema),
    defaultValues: {
      restaurantName: '',
      managerName: '',
      username: '',
      password: '',
      restaurantConfirmPassword: '',
    },
  })
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setProductImage(file)
  }

  const handleCreateRestaurant = async ({
    ...props
  }: CreateRestaurantProps) => {
    const formData = new FormData()
    Object.entries(props).forEach((entry) => {
      const [key, value] = entry
      console.log(key)
      if (key === 'expiresAt') {
        const date = new Date(value)
        return formData.append(key, date.toISOString())
      }

      formData.append(key, String(value))
    })
    if (productImage) {
      console.log(productImage)

      formData.append('banner', productImage)
    }
    formData.append('maxTables', String(maxTables))

    try {
      setSubmited(true)
      const response = await apiProvider.post('/restaurant', formData)

      console.log('createRestaurant Response =>', response)
      handleRequestSuccess('Restaurante atualizado com sucesso!')
      reset()
      navigate('/provider/restaurant')
    } catch (error) {
      console.log(error)
      handleRequestError('')
      setSubmited(false)
    }
  }
  return (
    <Box w="100%">
      <CreateContent headingTitle="Criar Restaurante">
        <form onSubmit={handleSubmit(handleCreateRestaurant)}>
          <VStack spacing="8">
            <SimpleGrid minChildWidth="200px" w="100%" spacing="8">
              <Input
                name="restaurantName"
                label="Nome do Restaurante"
                register={register}
              />
              <Input
                name="managerName"
                label="Nome do gerente"
                register={register}
              />
              <Input
                name="username"
                label="Email do restaurante"
                register={register}
              />
              <Input
                name="password"
                label="Senha do restaurante"
                register={register}
              />
              <Input
                name="restaurantConfirmPassword"
                label="Confirmar senha"
                register={register}
              />
              <Input
                name="expiresAt"
                label="Expiração do restaurante"
                type="date"
                register={register}
              />
              <Input
                name="maxTables"
                label="Numero de mesas"
                type="number"
                onChange={(e: any) => setMaxTables(e.target.value)}
                register={register}
              />
              <ImageInput
                name="banner"
                label="Imagem do Produto:"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleImageChange(event)
                }
              />
            </SimpleGrid>
          </VStack>
          <FormButton isDisable={submited} />
        </form>
      </CreateContent>
    </Box>
  )
}
