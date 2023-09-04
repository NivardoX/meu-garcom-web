import { Box } from '@chakra-ui/react'
import { CreateContent } from '../../../components/CreateContent'
import * as zod from 'zod'
import { FormButton } from '../../../components/Form/FormButton'
import { Input } from '../../../components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '../../../service/apiClient'
import { Select } from './components/Select'
import { Storage } from './components/Storage'
import { CategoryResponse, CategoryStorage } from '../Category'
import { useEffect, useState } from 'react'
import { ImageInput } from './components/ImageInput'
import { useAppToast } from '../../../hooks/useAppToast'
import { useNavigate } from 'react-router-dom'

export interface ICreateProduct {
  image?: File
  categoryId: string
  availabilityType: string
  name: string
  description: string
  priceInCents: string
  estimatedMinutesToPrepare?: string
}

const CreateProductValidationSchema = zod.object({
  categoryId: zod.string().min(1, 'Informe a categoria do produto'),
  name: zod.string().min(1, 'Informe o nome'),
  description: zod.string().min(1, 'Informe a descrição do produto'),
  priceInCents: zod.string().min(1, 'Informe o preço do produto'),
  estimatedMinutesToPrepare: zod
    .string()
    .min(1, 'Informe o tempo de preparo do do produto'),
})

export function CreateProduct() {
  const navigate = useNavigate()
  const { handleRequestError, handleRequestSuccess } = useAppToast()
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const [categoriesStorage] = useState<CategoryStorage[]>([
    { name: 'Quantidade', id: '1' },
    { name: 'Disponibilidade', id: '2' },
  ])
  const [productImage, setProductImage] = useState<File | undefined>(undefined)
  const [selectedCategory, setSelectedCategory] = useState<string>()
  const [storageCategory, setStorageCategory] = useState<string>('2')

  const { register, handleSubmit, reset } = useForm<ICreateProduct>({
    resolver: zodResolver(CreateProductValidationSchema),
    defaultValues: {
      categoryId: '',
      availabilityType: '',
      name: '',
      description: '',
      priceInCents: '',
      estimatedMinutesToPrepare: '',
    },
  })

  const handleCreateProduct = async (form: ICreateProduct) => {
    form.priceInCents = form.priceInCents.replace(/\D/g, '')
    const time = parseInt(form.estimatedMinutesToPrepare)
    const formData = new FormData()

    Object.entries(form).forEach((entry) => {
      const [key, value] = entry

      formData.append(key, value)
    })
    if (form.priceInCents === '000') {
      console.log(form.priceInCents)

      return handleRequestError('', 'O Preço não pode ser Zero')
    }
    if (time < 0) {
      return handleRequestError('', 'O tempo não pode ser menor que Zero')
    }
    if (productImage) {
      formData.append('image', productImage)
    }
    if (storageCategory === '1') {
      formData.append('availabilityType', `QUANTITY`)
    } else {
      formData.append('availabilityType', `AVAILABILITY`)
    }

    try {
      console.log('aqui')

      await api.post('/products', formData)
      console.log('aqui2')

      handleRequestSuccess('Produto Criado com sucesso!')
      reset()
      navigate('/restaurant/product')
    } catch (error) {
      handleRequestError(error)
    }
  }

  async function getAllCategories() {
    try {
      const response = await api.get(`/categories?page=1`)
      console.log(response.data.categories)

      setCategories(response.data.categories)
      setSelectedCategory(response.data.categories[0].id)
    } catch (error) {
      console.log('ERROR =>', error)
    }
  }

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    console.log(event.target.value)
    setSelectedCategory(event.target.value)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setProductImage(file)
    console.log('imagem', file)
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <Box w="100%">
      <CreateContent headingTitle="Criar novo produto">
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <Input
            name="name"
            label="Nome do produto"
            placeHolder="Informe o nome do produto"
            register={register}
          />
          <Input
            name="priceInCents"
            label="Preço do produto"
            placeHolder="Informe o Preço"
            onChange={(e) => {
              const value = parseFloat(e.target.value.replace(/\D/g, '')) / 100
              e.target.value = value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
            }}
            register={register}
          />
          <Input
            name="description"
            label="Descrição do produto"
            placeHolder="Digite a descrição do produto"
            register={register}
          />
          <Input
            type="number"
            name="estimatedMinutesToPrepare"
            placeHolder="Tempo de preparo em minutos"
            label="Tempo estimado para o preparo"
            register={register}
          />

          <Select
            name="categoryId"
            label="Categoria do Produto:"
            register={register}
            category={categories}
            value={selectedCategory}
            onChange={(event) => handleCategoryChange(event)}
          />

          <Storage
            name="availabilityType"
            label="Categoria de quantidade:"
            register={register}
            category={categoriesStorage}
            value={storageCategory}
            onChange={(event) => {
              setStorageCategory(event.target.value)
            }}
          />

          <ImageInput
            name="image"
            label="Imagem do Produto:"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleImageChange(event)
            }
          />
          <FormButton isDisable={false} />
        </form>
      </CreateContent>
    </Box>
  )
}
