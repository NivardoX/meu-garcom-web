import { useLocation, useNavigate } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { CreateContent } from '../../../components/CreateContent'
import { FormButton } from '../../../components/Form/FormButton'
import { Input } from '../../../components/Input'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '../../../service/apiClient'
import { useAppToast } from '../../../hooks/useAppToast'
import { InputPassword } from '../../../components/Input/Password'
import { useEffect } from 'react'

const UpdateEmployeeValidationSchema = zod.object({
  name: zod.string().min(2, 'Informe a Categoria'),
  password: zod.string().min(2, 'Informe a nova senha'),
  confirmPassword: zod.string().min(2, 'Confirme sua senha'),
})

export type UpdateEmployeeProps = zod.infer<
  typeof UpdateEmployeeValidationSchema
>

export function UpdateEmployee() {
  const navigate = useNavigate()
  const { handleRequestSuccess, handleRequestError } = useAppToast()
  const location = useLocation()
  const { employee } = location.state

  const { register, handleSubmit } = useForm<UpdateEmployeeProps>({
    resolver: zodResolver(UpdateEmployeeValidationSchema),
    defaultValues: {
      name: employee.name,
      password: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    console.log(employee)
  }, [])

  const handleUpdateEmployee = async (form: UpdateEmployeeProps) => {
    console.log(form, employee.name)

    try {
      const response = await api.put(`/restaurant-manager/${employee.id}`, form)
      if (response.status === 200) {
        handleRequestSuccess('Gerente Atualizada!')
        navigate('/restaurant/employee')
      }
    } catch (error) {
      handleRequestError(error)
    }
  }

  return (
    <Box w="100%">
      <CreateContent headingTitle="Editar funcionario" size="large">
        <form onSubmit={handleSubmit(handleUpdateEmployee)}>
          <Input name="name" label="Nome do funcionario" register={register} />
          <InputPassword
            name="password"
            label="Nova senha"
            register={register}
          />
          <InputPassword
            name="confirmPassword"
            label="Confirmar senha"
            register={register}
          />
          <FormButton isDisable={false} buttonSubmitTitle="Editar" />
        </form>
      </CreateContent>
    </Box>
  )
}
