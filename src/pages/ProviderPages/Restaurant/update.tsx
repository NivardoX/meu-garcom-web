import { Box, SimpleGrid, VStack } from '@chakra-ui/react'
import { CreateContent } from '../../../components/CreateContent'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormButton } from '../../../components/Form/FormButton'
import { Input } from '../../../components/Input'
import { apiProvider } from '../../../service/apiProvider'
import { ImageInput } from '../../Restaurant/Product/components/ImageInput'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppToast } from '../../../hooks/useAppToast'

export type CreateRestaurantProps = {
  name: string
  maxTables: string
}

const CreateRestaurantValidationSchema = zod.object({
  name: zod.string().min(1, 'Informe o nome do restaurante'),
  maxTables: zod.string().min(1, 'Informe o numero de mesas do restaurante'),
})

export function UpdateRestaurant() {
  const navigate = useNavigate()
  const location = useLocation()
  const { handleRequestError, handleRequestSuccess } = useAppToast()
  const product = location.state
  useEffect(() => {
    console.log(product.maxTables)
  }, [])
  const [submited, setSubmited] = useState<boolean>(false)
  const [productImage, setProductImage] = useState<File | undefined>(undefined)
  const { register, handleSubmit, watch, reset } =
    useForm<CreateRestaurantProps>({
      resolver: zodResolver(CreateRestaurantValidationSchema),
      defaultValues: {
        name: product.name,
        maxTables: String(product.maxTables),
      },
    })
  const observerContentForm = watch(['name', 'maxTables'])
  const isSubmitDisabled: boolean = !observerContentForm
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setProductImage(file)
  }
  const handleCreateRestaurant = async ({
    ...props
  }: CreateRestaurantProps) => {
    try {
      setSubmited(!submited)
      await apiProvider.put('/restaurant/' + product.id, {
        name: props.name,
        maxTables: Number(props.maxTables),
        banner: productImage,
      })
      reset()
      handleRequestSuccess('Restaurante atualizado com sucesso!')
      navigate(-1)
    } catch (error) {
      handleRequestError('')
      console.log(error)
    }
  }
  return (
    <Box w="100%">
      <CreateContent headingTitle="Editar Restaurante">
        <form onSubmit={handleSubmit(handleCreateRestaurant)}>
          <VStack spacing="8">
            <SimpleGrid minChildWidth="200px" w="100%" spacing="8">
              <SimpleGrid>
                <Input
                  name="name"
                  label="Nome do Restaurante"
                  register={register}
                />
                <Input
                  name="maxTables"
                  label="Mesas do Restaurante"
                  type="number"
                  register={register}
                />
                {/* <Input
                  name="password"
                  label="Nova Senha"
                  register={register}
                  required={false}
                />
                <Input
                  name="confirmPassword"
                  label="Confirme a senha"
                  required={false}
                  register={register}
                /> */}
              </SimpleGrid>
              <ImageInput
                name="banner"
                label="Imagem do Produto:"
                url={product.bannerUrl}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleImageChange(event)
                }
              />
            </SimpleGrid>
          </VStack>
          <FormButton isDisable={submited} buttonSubmitTitle="Editar" />
        </form>
      </CreateContent>
    </Box>
  )
}
