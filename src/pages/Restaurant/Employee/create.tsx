import { Box } from '@chakra-ui/react'
import { CreateContent } from '../../../components/CreateContent'
import { api } from '../../../service/apiClient'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormButton } from '../../../components/Form/FormButton'
import { Input } from '../../../components/Input'
import { InputPassword } from '../../../components/Input/Password'
import { useAppToast } from '../../../hooks/useAppToast'
import { useNavigate } from 'react-router-dom'

export type CreateEmployeeProps = {
  employeeName: string
  employeeUserName: string
  employeePassword: string
  employeeConfirmPassword: string
}

const CreateCategoryValidationSchema = zod.object({
  employeeName: zod.string().min(1, 'Informe o nome'),
  employeeUserName: zod.string().min(1, 'Informe o usuário'),
  employeePassword: zod.string().min(1, 'Crie uma senha'),
  employeeConfirmPassword: zod.string().min(1, 'Senhas devem ser identicas'),
})

export function CreateEmployee() {
  const navigate = useNavigate()
  const { handleRequestError, handleRequestSuccess } = useAppToast()
  const { register, handleSubmit, watch, reset } = useForm<CreateEmployeeProps>(
    {
      resolver: zodResolver(CreateCategoryValidationSchema),
      defaultValues: {
        employeeName: '',
        employeeUserName: '',
        employeePassword: '',
        employeeConfirmPassword: '',
      },
    },
  )

  const observerContentForm = watch([
    'employeeName',
    'employeeUserName',
    'employeePassword',
    'employeeConfirmPassword',
  ])
  const isSubmitDisabled: boolean = !observerContentForm

  const handleCreateEmployee = async ({ ...props }: CreateEmployeeProps) => {
    try {
      const response = await api.post('/restaurant-manager', {
        name: props.employeeName,
        username: props.employeeUserName,
        password: props.employeePassword,
      })
      if (response.status === 201) {
        handleRequestSuccess('Novo garçom criado!')
      }

      reset()
      navigate('/restaurant/employee')
    } catch (error) {
      handleRequestError(error)
    }
  }
  return (
    <Box w="100%">
      <CreateContent headingTitle="Criar Colaborador">
        <form onSubmit={handleSubmit(handleCreateEmployee)}>
          <Input
            name="employeeName"
            label="Nome do colaborador"
            placeHolder="Informe o nome do colaborador"
            register={register}
          />
          <Input
            name="employeeUserName"
            label="Email do colaborador"
            placeHolder="Informe o Email do colaborador"
            register={register}
          />
          <InputPassword
            name="employeePassword"
            label="Senha do colaborador"
            placeHolder="Informe a senha do colaborador"
            type="password"
            register={register}
          />
          <InputPassword
            name="employeeConfirmPassword"
            label="Confirmar senha"
            placeHolder="Confirme a senha digitada no campo anterior"
            type="password"
            register={register}
          />
          <FormButton isDisable={isSubmitDisabled} />
        </form>
      </CreateContent>
    </Box>
  )
}
