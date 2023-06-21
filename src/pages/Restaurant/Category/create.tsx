import { Box } from '@chakra-ui/react'
import { CreateContent } from '../../../components/CreateContent'
import { api } from '../../../service/apiClient'
import { Input } from '../../../components/Input'
import { FormButton } from '../../../components/Form/FormButton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useAppToast } from '../../../hooks/useAppToast'
import { useNavigate } from 'react-router-dom'

const CreateCategoryValidationSchema = zod.object({
  name: zod.string().min(1, 'Informe a Categoria'),
})

export type CreateCategoryProps = zod.infer<
  typeof CreateCategoryValidationSchema
>

export const CreateCategory: React.FC = () => {
  const navigate = useNavigate()
  const { handleRequestError, handleRequestSuccess } = useAppToast()
  const { register, handleSubmit, watch, reset } = useForm<CreateCategoryProps>(
    {
      resolver: zodResolver(CreateCategoryValidationSchema),
      defaultValues: {
        name: '',
      },
    },
  )

  const observerContentForm: string = watch('name')
  const isSubmitDisabled: boolean = !observerContentForm

  const handlecreateCategory = async (
    props: CreateCategoryProps,
  ): Promise<void> => {
    try {
      const response = await api.post('/categories', {
        name: props.name,
      })

      if (response.status === 201) {
        handleRequestSuccess('Novo garçom criado!')
      }

      reset()
      navigate('/restaurant/category')
    } catch (error) {
      handleRequestError(error)
    }
  }

  return (
    <Box w="100%">
      <CreateContent headingTitle="Criar Categoria" size="small">
        <form onSubmit={handleSubmit(handlecreateCategory)}>
          <Input
            name="name"
            label="Nome da Categoria"
            placeHolder="Informe o nome da categoria"
            register={register}
          />
          <FormButton isDisable={isSubmitDisabled} />
        </form>
      </CreateContent>
    </Box>
  )
}
