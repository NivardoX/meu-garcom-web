import { Box } from '@chakra-ui/react'
import { CreateContent } from '../../../components/CreateContent'
import { FormButton } from '../../../components/Form/FormButton'
import { Input } from '../../../components/Input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { api } from '../../../service/apiClient'
import { useAppToast } from '../../../hooks/useAppToast'
import { useNavigate } from 'react-router-dom'
import { InputPassword } from '../../../components/Input/Password'
import { useEffect, useState } from 'react'

export type CreateWaiterProps = {
  waiterUserName: string
  waiterName: string
  waiterPassword: string
  waiterConfirmPassword: string
}

const CreateCategoryValidationSchema = zod.object({
  waiterName: zod.string().min(1, 'Informe a categoria do produto'),
  waiterUserName: zod.string().min(1, 'Informe o preço do produto').email(),
  waiterPassword: zod.string().min(1, 'Informe a descrição do produto'),
  waiterConfirmPassword: zod.string().min(1, 'Informe a Categoria'),
})

export function CreateWaiter() {
  const navigate = useNavigate()
  const [disable, setDisable] = useState<boolean>(false)
  const { handleRequestError, handleRequestSuccess } = useAppToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateWaiterProps>({
    resolver: zodResolver(CreateCategoryValidationSchema),
    defaultValues: {
      waiterName: '',
      waiterUserName: '',
      waiterPassword: '',
      waiterConfirmPassword: '',
    },
  })

  const handleCreateWaiter = async ({ ...props }: CreateWaiterProps) => {
    if (props.waiterConfirmPassword !== props.waiterPassword) {
      return handleRequestError('', 'As senhas devem ser iguais')
    }
    if (props.waiterPassword.length < 6) {
      return handleRequestError(
        '',
        'As senhas devem ter no minimo 6 caracteres',
      )
    }
    setDisable(true)
    try {
      const response = await api.post('/waiters', {
        name: props.waiterName,
        username: props.waiterUserName,
        email: props.waiterUserName,
        password: props.waiterPassword,
      })
      if (response.status === 201) {
        handleRequestSuccess('Novo garçom criado!')
      }

      reset()
      navigate('/restaurant/waiter')
    } catch (error) {
      handleRequestError(error)
      console.log(error)
    } finally {
      setDisable(false)
    }
  }
  useEffect(() => {
    if (errors) {
      if (errors.waiterUserName) {
        handleRequestError('', 'email Invalido!')
      }
    }
  }, [errors])

  return (
    <Box w="100%">
      <CreateContent headingTitle="Criar Garçom">
        <form onSubmit={handleSubmit(handleCreateWaiter)}>
          <Input
            name="waiterName"
            label="Nome do garçom"
            placeHolder="Informe o nome do garçom"
            register={register}
          />
          <Input
            name="waiterUserName"
            label="Email do garçom"
            placeHolder="Informe o email do garçom"
            register={register}
          />
          <InputPassword
            name="waiterPassword"
            label="Senha do garçom"
            placeHolder="Informe a senha do garçom"
            register={register}
          />
          <InputPassword
            name="waiterConfirmPassword"
            label="Confirmar senha"
            placeHolder="Confirme a senha digitada no campo anterior"
            register={register}
          />
          <FormButton isDisable={disable} />
        </form>
      </CreateContent>
    </Box>
  )
}
