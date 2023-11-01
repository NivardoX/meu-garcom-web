import { Box } from '@chakra-ui/react'
import { CreateContent } from '../../../components/CreateContent'
import { Input } from '../../../components/Input'
import { FormButton } from '../../../components/Form/FormButton'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../../../service/apiClient'
import { useAppToast } from '../../../hooks/useAppToast'
import { useAuth } from '../../../hooks/useAuth'

interface IUpdateWaiter {
  name: string
  username: string
}

const UpdateWaiterValidationSchema = zod.object({
  name: zod.string().min(1, 'Editar Nome'),
  username: zod.string().min(1, 'Informe o nove Email').email(),
})

export function UpdateWaiter() {
  const { handleRequestSuccess, handleRequestError } = useAppToast()
  const [disable, setDisable] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { waiter } = location.state
  const { restaurantSession } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateWaiter>({
    resolver: zodResolver(UpdateWaiterValidationSchema),
    defaultValues: {
      name: waiter.name,
      username: waiter.username,
    },
  })

  const handleUpdateWaiter = async (form: IUpdateWaiter) => {
    setDisable(true)
    try {
      const response = await api.put(`/waiters/${waiter.id}`, {
        name: form.name,
        username: form.username,
        restaurantManagerId: restaurantSession?.id,
      })

      console.log(response.data)
      handleRequestSuccess('Garçom Atualizado!')
      navigate('/restaurant/waiter')
    } catch (error) {
      handleRequestError(error)
    } finally {
      setDisable(false)
    }
  }

  useEffect(() => {
    if (errors) {
      if (errors.username) {
        handleRequestError('', 'email Invalido!')
      }
    }
  }, [errors])

  return (
    <Box w="100%">
      <CreateContent headingTitle="Editar Garçom">
        <form onSubmit={handleSubmit(handleUpdateWaiter)}>
          <Input
            name="name"
            label="Editar nome do garçom"
            register={register}
          />
          <Input
            name="username"
            label="Editar nome do garçom"
            register={register}
          />
          <FormButton isDisable={disable} buttonSubmitTitle="Editar" />
        </form>
      </CreateContent>
    </Box>
  )
}
