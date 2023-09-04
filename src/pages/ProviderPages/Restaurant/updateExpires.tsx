import { Box, Button, SimpleGrid, VStack } from '@chakra-ui/react'
import { CreateContent } from '../../../components/CreateContent'
import { useForm } from 'react-hook-form'
import { FormButton } from '../../../components/Form/FormButton'
import { Input } from '../../../components/Input'
import { apiProvider } from '../../../service/apiProvider'
import { useLocation } from 'react-router-dom'

export type CreateRestaurantProps = {
  expiresAt: Date
}

export function ExpiresRestaurant() {
  const location = useLocation()
  const product = location.state
  const { register, handleSubmit, watch, reset } =
    useForm<CreateRestaurantProps>()

  const observerContentForm = watch(['expiresAt'])
  const isSubmitDisabled: boolean = !observerContentForm

  const handleCreateRestaurant = async ({
    ...props
  }: CreateRestaurantProps) => {
    console.log(product.id, {
      props,
    })

    try {
      const response = await apiProvider.patch(
        `/restaurant/${product.id}/expiration`,
        {
          expiresAt: new Date(props.expiresAt),
        },
      )

      console.log('createRestaurant Response =>', response)
      reset()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box w="100%">
      <CreateContent headingTitle="Atualizar Data de Expiração">
        <form onSubmit={handleSubmit(handleCreateRestaurant)}>
          <VStack spacing="8">
            <SimpleGrid minChildWidth="200px" w="100%" spacing="8">
              <Input
                name="expiresAt"
                label="Expiração do restaurante"
                type="date"
                w={'50%'}
                register={register}
              />
            </SimpleGrid>
          </VStack>
          <FormButton isDisable={isSubmitDisabled} />
        </form>
      </CreateContent>
    </Box>
  )
}
