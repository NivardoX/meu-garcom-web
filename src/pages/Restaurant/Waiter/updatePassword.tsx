import { Box } from '@chakra-ui/react'
import { CreateContent } from '../../../components/CreateContent'
import { FormButton } from '../../../components/Form/FormButton'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { api } from '../../../service/apiClient'
import { useAppToast } from '../../../hooks/useAppToast'
import { InputPassword } from '../../../components/Input/Password'

interface IUpdateWaiter {
  password: string
  confirm: string
}

const UpdateWaiterValidationSchema = zod.object({
  password: zod.string().min(6, 'Nova senha'),
  confirm: zod.string().min(6, 'confirme sua senha'),
})

export function UpdateWaiterPassWord() {
  const { handleRequestSuccess, handleRequestError } = useAppToast()
  const navigate = useNavigate()
  const location = useLocation()
  const { waiter } = location.state

  const { register, handleSubmit } = useForm<IUpdateWaiter>({
    resolver: zodResolver(UpdateWaiterValidationSchema),
  })

  const handleUpdateWaiter = async (form: IUpdateWaiter) => {
    try {
      console.log(waiter.id)
      if (form.password === form.confirm) {
        const response = await api.patch(`/waiters/${waiter.id}`, {
          password: form.password,
        })

        console.log(response.data)
        handleRequestSuccess('Garçom Atualizado!')
        navigate('/restaurant/waiter')
      } else {
        handleRequestError('', 'as senhas não conferem')
      }
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
          <InputPassword
            name="password"
            label="Editar a senha do garçom"
            register={register}
          />
          <InputPassword
            name="confirm"
            label="Confirme a senha do garçom"
            register={register}
          />
          <FormButton isDisable={false} buttonSubmitTitle="Editar" />
        </form>
      </CreateContent>
    </Box>
  )
}
