import { Box } from '@chakra-ui/react'
import { CreateContent } from '../../../components/CreateContent'
import { Input } from '../../../components/Input'
import { FormButton } from '../../../components/Form/FormButton'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { api } from '../../../service/apiClient'
import { useAppToast } from '../../../hooks/useAppToast'

interface IUpdateWaiter {
  name: string
  newPassword: string
  confirmNewPassword: string
}

const UpdateWaiterValidationSchema = zod.object({
  name: zod.string().min(1, 'Editar Nome'),
  newPassword: zod.string().min(1, 'Informe a nova senha'),
  confirmNewPassword: zod.string().min(1, 'Confirme a nova senha'),
})

export function UpdateWaiter() {
  const { handleRequestSuccess, handleRequestError } = useAppToast()
  const navigate = useNavigate()
  const location = useLocation()
  const { waiter } = location.state

  const { register, handleSubmit } = useForm<IUpdateWaiter>({
    resolver: zodResolver(UpdateWaiterValidationSchema),
    defaultValues: {
      name: waiter.name,
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const handleUpdateWaiter = async (form: IUpdateWaiter) => {
    try {
      const response = await api.put(`/waiters/${waiter.id}`, {name: form.name, password: form.newPassword})

      console.log(response.data)
      handleRequestSuccess('Categoria Atualizada!')
      navigate('/restaurant/category')
    } catch (error) {
      handleRequestError(error)
    }
  }

  useEffect(() => {
    console.log('waiter', waiter)
  }, [])

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
            name="newPassword"
            label="Nova senha para o garçom"
            register={register}
          />
          <Input
            name="confirmNewPassword"
            label="Confirmar senha"
            register={register}
          />
          <FormButton isDisable={false} />
        </form>
      </CreateContent>
    </Box>
  )
}
