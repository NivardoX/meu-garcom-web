import { Box, SimpleGrid, VStack } from '@chakra-ui/react'
import { CreateContent } from '../../../components/CreateContent'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormButton } from '../../../components/Form/FormButton'
import { Input } from '../../../components/Input'
import { apiProvider } from '../../../service/apiProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppToast } from '../../../hooks/useAppToast'
import { InputPassword } from '../../../components/Input/Password'
import { useState } from 'react'

export type CreateRestaurantProps = {
  username: string
  password: string
  confirmPassword: string
}
export type RestaurantProps = {
  id: string
  name: string
  username: string
  password: string
  restaurantId: string
  createdAt: string
  isOwner: boolean
}

const CreateRestaurantValidationSchema = zod.object({
  username: zod.string().min(1, 'Digite o novo Email'),
  password: zod.string().optional(),
  confirmPassword: zod.string().optional(),
})

export function UpdatePasswordRestaurant() {
  const navigate = useNavigate()
  const location = useLocation()
  const { handleRequestError, handleRequestSuccess } = useAppToast()
  const [submited, setSubmited] = useState<boolean>(false)
  const restaurant: RestaurantProps = location.state

  const { register, handleSubmit, reset } = useForm<CreateRestaurantProps>({
    resolver: zodResolver(CreateRestaurantValidationSchema),
    defaultValues: {
      username: restaurant.username,
      password: '',
      confirmPassword: '',
    },
  })
  const handleCreateRestaurant = async ({
    ...props
  }: CreateRestaurantProps) => {
    if (props.password !== props.confirmPassword) {
      return handleRequestError('', 'As senhas devem ser iguais!')
    }
    if (props.password.length < 6 && props.password.length > 0) {
      return handleRequestError(
        '',
        'As senhas devem ter no minimo 6 caracteres',
      )
    }
    try {
      setSubmited(true)
      await apiProvider.put(
        '/restaurant-manager/' + restaurant.id + '/provider',
        {
          name: restaurant.name,
          username: props.username,
          password: props.password,
        },
      )
      reset()
      handleRequestSuccess('Restaurante atualizado com sucesso!')
      navigate(-1)
    } catch (error: any) {
      if (error.response.data.message[0] === 'username must be an email') {
        return handleRequestError('', 'Digite um email valido')
      }
      handleRequestError(error)
      console.log(error)
    } finally {
      setSubmited(false)
    }
  }
  return (
    <Box w="100%">
      <CreateContent headingTitle="Editar Restaurante">
        <form onSubmit={handleSubmit(handleCreateRestaurant)}>
          <VStack spacing="8">
            <SimpleGrid minChildWidth="200px" w="100%" spacing="8">
              <SimpleGrid>
                <Input
                  name="username"
                  label="Email do gerente"
                  register={register}
                />
              </SimpleGrid>
              <SimpleGrid>
                <InputPassword
                  name="password"
                  label="Nova Senha"
                  register={register}
                  required={false}
                />
                <InputPassword
                  name="confirmPassword"
                  label="Confirme sua senha"
                  register={register}
                  required={false}
                />
                {/* <Input
                  name="password"
                  label="Nova Senha"
                  register={register}
                  required={false}
                />
                <Input
                  name="confirmPassword"
                  label="Confirme a senha"
                  required={false}
                  register={register}
                /> */}
              </SimpleGrid>
            </SimpleGrid>
          </VStack>
          <FormButton isDisable={submited} buttonSubmitTitle="Editar" />
        </form>
      </CreateContent>
    </Box>
  )
}
