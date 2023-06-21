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

export type CreateWaiterProps = {
  waiterUserName: string
  waiterName: string
  waiterPassword: string
  waiterConfirmPassword: string
}

const CreateCategoryValidationSchema = zod.object({
  waiterName: zod.string().min(1, 'Informe a categoria do produto'),
  waiterUserName: zod.string().min(1, 'Informe o preço do produto'),
  waiterPassword: zod.string().min(1, 'Informe a descrição do produto'),
  waiterConfirmPassword: zod.string().min(1, 'Informe a Categoria'),
})

export function CreateWaiter() {
  const navigate = useNavigate()
  const { handleRequestError, handleRequestSuccess } = useAppToast()
  const { register, handleSubmit, watch, reset } = useForm<CreateWaiterProps>({
    resolver: zodResolver(CreateCategoryValidationSchema),
    defaultValues: {
      waiterName: '',
      waiterUserName: '',
      waiterPassword: '',
      waiterConfirmPassword: '',
    },
  })

  const observerContentForm = watch([
    'waiterName',
    'waiterUserName',
    'waiterPassword',
    'waiterConfirmPassword',
  ])
  const isSubmitDisabled: boolean = !observerContentForm

  const handleCreateWaiter = async ({ ...props }: CreateWaiterProps) => {
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
    }
  }

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
          <Input
            name="waiterPassword"
            label="Senha do garçom"
            placeHolder="Informe a senha do garçom"
            register={register}
          />
          <Input
            name="waiterConfirmPassword"
            label="Confirmar senha"
            placeHolder="Confirme a senha digitada no campo anterior"
            register={register}
          />
          <FormButton isDisable={isSubmitDisabled} />
        </form>
      </CreateContent>
    </Box>
  )
}
