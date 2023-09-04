import { Box, Button, SimpleGrid, VStack } from '@chakra-ui/react'
import { CreateContent } from '../../../components/CreateContent'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormButton } from '../../../components/Form/FormButton'
import { Input } from '../../../components/Input'
import { apiProvider } from '../../../service/apiProvider'
import { ImageInput } from '../../Restaurant/Product/components/ImageInput'
import { useState } from 'react'

export type CreateRestaurantProps = {
  restaurantName: string
  restaurantBanner: string
}

const CreateRestaurantValidationSchema = zod.object({
  restaurantName: zod.string().min(1, 'Informe a categoria do produto'),
  restaurantManagerName: zod.string().min(1, 'Informe o preço do produto'),
  restaurantUsernameRestaurant: zod
    .string()
    .min(1, 'Informe a descrição do produto'),
  restaurantConfirmPassword: zod.string().min(1, 'Informe o preço do produto'),
  expiresAt: zod.string().min(1, 'Informe a Categoria'),
})

export function UpdateRestaurant() {
  const [productImage, setProductImage] = useState<File | undefined>(undefined)
  const { register, handleSubmit, watch, formState, reset } =
    useForm<CreateRestaurantProps>({
      resolver: zodResolver(CreateRestaurantValidationSchema),
      defaultValues: {
        restaurantName: '',
        restaurantBanner: '',
      },
    })

  const observerContentForm = watch(['restaurantName', 'restaurantBanner'])
  const isSubmitDisabled: boolean = !observerContentForm
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setProductImage(file)
    console.log('imagem', file)
  }
  const handleCreateRestaurant = async ({
    ...props
  }: CreateRestaurantProps) => {
    console.log('oi', {
      props,
    })

    try {
      const response = await apiProvider.post('/restaurant', {
        Name: props.restaurantName,
        Banner: props.restaurantBanner,
      })

      console.log('createRestaurant Response =>', response)
      reset()
    } catch (error) {
      console.log(error)
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
              <ImageInput
                name="image"
                label="Imagem do Produto:"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleImageChange(event)
                }
              />
            </SimpleGrid>
          </VStack>
          <FormButton isDisable={isSubmitDisabled} />
        </form>
      </CreateContent>
    </Box>
  )
}
