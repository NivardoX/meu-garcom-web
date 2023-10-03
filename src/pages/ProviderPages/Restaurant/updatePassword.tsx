import { Box, SimpleGrid, VStack } from '@chakra-ui/react'
import { CreateContent } from '../../../components/CreateContent'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormButton } from '../../../components/Form/FormButton'
import { Input } from '../../../components/Input'
import { apiProvider } from '../../../service/apiProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppToast } from '../../../hooks/useAppToast'

export type CreateRestaurantProps = {
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
  password: zod.string().min(6, 'Informe a nova senha do restaurante'),
  confirmPassword: zod.string().min(6, 'Confirme sua senha'),
})

export function UpdatePasswordRestaurant() {
  const navigate = useNavigate()
  const location = useLocation()
  const [restaurant, setRestaurant] = useState<RestaurantProps>(
    {} as RestaurantProps,
  )
  const { handleRequestError, handleRequestSuccess } = useAppToast()
  const product: RestaurantProps = location.state
  useEffect(() => {
    const handleGetRestaurant = async () => {
      try {
        const { data } = await apiProvider.get<RestaurantProps[]>(
          '/restaurant-manager/all',
        )
        console.log(data.find((res: any) => res.restaurantId === product.id))
        const res: RestaurantProps = data.find(
          (res: RestaurantProps) => res.restaurantId === product.id,
        ) as RestaurantProps
        setRestaurant(res)
      } catch (error) {
        handleRequestError('')
        navigate(-1)
      }
    }
    handleGetRestaurant()
  }, [])
  const { register, handleSubmit, watch, reset } =
    useForm<CreateRestaurantProps>({
      resolver: zodResolver(CreateRestaurantValidationSchema),
      defaultValues: {
        password: '',
        confirmPassword: '',
      },
    })
  const observerContentForm = watch(['password', 'confirmPassword'])
  const isSubmitDisabled: boolean = !observerContentForm
  const handleCreateRestaurant = async ({
    ...props
  }: CreateRestaurantProps) => {
    console.log(restaurant)
    try {
      await apiProvider.put(
        '/restaurant-manager/' + restaurant.id + '/provider',
        {
          name: restaurant.name,
          password: props.password,
        },
      )
      reset()
      handleRequestSuccess('Restaurante atualizado com sucesso!')
      navigate(-1)
    } catch (error) {
      handleRequestError('')
      console.log(error)
    }
  }
  return (
    <Box w="100%">
      <CreateContent headingTitle="Editar Restaurante">
        <form onSubmit={handleSubmit(handleCreateRestaurant)}>
          <VStack spacing="8">
            <SimpleGrid minChildWidth="200px" w="100%" spacing="8">
              <Input name="password" label="Nova Senha" register={register} />
              <Input
                name="confirmPassword"
                label="Confirme sua senha"
                register={register}
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
          </VStack>
          <FormButton isDisable={isSubmitDisabled} buttonSubmitTitle="Editar" />
        </form>
      </CreateContent>
    </Box>
  )
}
