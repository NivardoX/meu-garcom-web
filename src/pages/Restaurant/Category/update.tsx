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

const UpdateCategoryValidationSchema = zod.object({
  name: zod.string().min(2, 'Informe a Categoria'),
})

export type UpdateCategoryProps = zod.infer<
  typeof UpdateCategoryValidationSchema
>

export function UpdateCategory() {
  const navigate = useNavigate()
  const { handleRequestSuccess, handleRequestError } = useAppToast()
  const location = useLocation()
  const { category } = location.state

  const { register, handleSubmit } = useForm<UpdateCategoryProps>({
    resolver: zodResolver(UpdateCategoryValidationSchema),
    defaultValues: {
      name: category.name,
    },
  })

  const handleUpdateCategory = async (form: UpdateCategoryProps) => {
    console.log(form, category.name)
    if (form.name === category.name) {
      return handleRequestError('error', 'Não houve mudança na categoria')
    }

    try {
      const response = await api.put(`/categories/${category.id}`, form)
      if (response.status === 200) {
        handleRequestSuccess('Categoria Atualizada!')
        navigate('/restaurant/category')
      }
    } catch (error) {
      handleRequestError(error)
    }
  }

  return (
    <Box w="100%">
      <CreateContent headingTitle="Editar Categoria" size="small">
        <form onSubmit={handleSubmit(handleUpdateCategory)}>
          <Input name="name" label="Nome da Categoria" register={register} />
          <FormButton isDisable={false} buttonSubmitTitle="Editar" />
        </form>
      </CreateContent>
    </Box>
  )
}
