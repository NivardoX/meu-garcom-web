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
import { useState } from 'react'

const UpdateEmployeeValidationSchema = zod.object({
  name: zod.string().min(1, 'Informe a Categoria'),
  password: zod.string().optional(),
  confirmPassword: zod.string().optional(),
})

export type UpdateEmployeeProps = zod.infer<
  typeof UpdateEmployeeValidationSchema
>

export function UpdateEmployee() {
  const navigate = useNavigate()
  const { handleRequestSuccess, handleRequestError } = useAppToast()
  const location = useLocation()
  const [disable, setDisable] = useState<boolean>(false)
  const { employee } = location.state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateEmployeeProps>({
    resolver: zodResolver(UpdateEmployeeValidationSchema),
    defaultValues: {
      name: employee.name,
      password: '',
      confirmPassword: '',
    },
  })
  console.log(errors)

  const handleUpdateEmployee = async (form: UpdateEmployeeProps) => {
    console.log(form, employee.name)
    if (form.password && form.password.length < 6 && form.password.length > 0) {
      return handleRequestError(
        '',
        'As senhas devem ter no minimo 6 caracteres',
      )
    }
    if (form.password !== form.confirmPassword) {
      return handleRequestError('', 'As senhas devem ser iguais!')
    }
    setDisable(true)
    try {
      const response = await api.put(`/restaurant-manager/${employee.id}`, form)
      if (response.status === 200) {
        handleRequestSuccess('Gerente Atualizada!')
        navigate('/restaurant/employee')
      }
    } catch (error) {
      handleRequestError(error)
    } finally {
      setDisable(false)
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
            required={false}
          />
          <InputPassword
            name="confirmPassword"
            label="Confirmar senha"
            required={false}
            register={register}
          />
          <FormButton isDisable={disable} buttonSubmitTitle="Editar" />
        </form>
      </CreateContent>
    </Box>
  )
}
