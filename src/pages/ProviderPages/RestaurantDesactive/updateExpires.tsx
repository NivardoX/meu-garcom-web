import { Box, SimpleGrid, VStack } from '@chakra-ui/react'
import { CreateContent } from '../../../components/CreateContent'
import { useForm } from 'react-hook-form'
import { FormButton } from '../../../components/Form/FormButton'
import { Input } from '../../../components/Input'
import { apiProvider } from '../../../service/apiProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAppToast } from '../../../hooks/useAppToast'

export type CreateRestaurantProps = {
  expiresAt: Date
}

export function ExpiresRestaurant() {
  const [submited, setSubmited] = useState<boolean>(false)
  const location = useLocation()
  const navigate = useNavigate()
  const product = location.state
  const { register, handleSubmit, reset } = useForm<CreateRestaurantProps>()
  const { handleRequestError, handleRequestSuccess } = useAppToast()

  const handleCreateRestaurant = async ({
    ...props
  }: CreateRestaurantProps) => {
    console.log(product.id, {
      props,
    })

    try {
      setSubmited(!submited)
      const response = await apiProvider.patch(
        `/restaurant/${product.id}/expiration`,
        {
          expiresAt: new Date(props.expiresAt),
        },
      )

      handleRequestSuccess('Restaurante atualizado com sucesso!')
      console.log('createRestaurant Response =>', response)
      navigate(-1)
      reset()
    } catch (error) {
      console.log(error)
      handleRequestError('')
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
          <FormButton isDisable={submited} buttonSubmitTitle="Editar" />
        </form>
      </CreateContent>
    </Box>
  )
}
