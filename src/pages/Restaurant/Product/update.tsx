import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Chart } from '../../../components/Chart'
import { Input } from '../../../components/Input'
import * as zod from 'zod'
import { FormButton } from '../../../components/Form/FormButton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select } from './components/Select'
import { Storage } from './components/Storage'
import { api } from '../../../service/apiClient'
import { CategoryResponse, CategoryStorage } from '../Category'
import { useAppToast } from '../../../hooks/useAppToast'
import { ImageInput } from './components/ImageInput'
import { useAuth } from '../../../hooks/useAuth'

type ProductsResponse = {
  products: [
    {
      product: {
        id: string
        name: string
        description: string
        restaurantId: string
        imageUrl: string
        priceInCents: number
        availableAmount: number
        availabilityType: string
        estimatedMinutesToPrepare: number
        isAvailable: boolean
        category: {
          id: string
          name: string
          restaurantId: string
        }
      }
    },
  ]
}

const UpdateProductValidationSchema = zod.object({
  categoryId: zod.string().min(1, 'Informe a categoria do produto'),
  name: zod.string().min(1, 'Informe a Categoria'),
  priceInCents: zod.string().min(1, 'Informe o Preco'),
  description: zod.string().min(1, 'Informe a Categoria'),
  estimatedMinutesToPrepare: zod.string().optional(),
  availableAmount: zod.string().optional() || zod.number().optional(),
})

type UpdateProductProps = zod.infer<typeof UpdateProductValidationSchema>

export function UpdateProduct() {
  const navigate = useNavigate()
  const location = useLocation()
  const { handleRequestError, handleRequestSuccess } = useAppToast()
  const [productImage, setProductImage] = useState<File | undefined>(undefined)
  const [disable, setDisable] = useState<boolean>(false)
  const product = location.state as ProductsResponse['products'][0]
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const { restaurantSession } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState<string>(
    product.product.category?.id,
  )
  const [storageCategory, setStorageCategory] = useState<string>(
    product.product.availabilityType === 'QUANTITY' ? '1' : '2',
  )
  const [aviableCategory, setAviableCategory] = useState<string>(
    product.product.isAvailable ? '1' : '2',
  )
  const [categoriesStorage] = useState<CategoryStorage[]>([
    { name: 'Quantidade', id: '1' },
    { name: 'Disponibilidade', id: '2' },
  ])
  const [categoriesAviable] = useState<CategoryStorage[]>([
    { name: 'Disponivel', id: '1' },
    { name: 'Não Disponivel', id: '2' },
  ])

  const { register, handleSubmit, reset } = useForm<UpdateProductProps>({
    resolver: zodResolver(UpdateProductValidationSchema),
    defaultValues: {
      categoryId: product.product.category?.id || '',
      name: product.product.name || '',
      priceInCents:
        (product.product.priceInCents / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }) || '0',
      description: product.product.description || '',
      estimatedMinutesToPrepare:
        product.product.estimatedMinutesToPrepare.toString() || '',
      availableAmount: product.product.availableAmount.toString() || '',
    },
  })

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setProductImage(file)
  }

  const onSubmit = async (data: UpdateProductProps) => {
    setDisable(true)
    data.priceInCents = data.priceInCents.replace(/\D/g, '')
    if (Number(data.estimatedMinutesToPrepare) < 0) {
      setDisable(false)
      return handleRequestError(
        '',
        'O Tempo de Preparo Não Pode Ser Menor Que 0',
      )
    }
    if (Number(data.availableAmount) < 0) {
      setDisable(false)
      return handleRequestError(
        '',
        'A Quantidade de Produtos Não Pode Ser Menor Que 0',
      )
    }
    if (Number(data.priceInCents) <= 0) {
      setDisable(false)
      return handleRequestError(
        '',
        'O Preço do Produtos Não Pode Ser Menor ou Igual a 0',
      )
    }

    if (Number.isNaN(Number(data.availableAmount))) {
      setDisable(false)
      return handleRequestError(
        '',
        'A Quantidade de Produtos Deve ser Um Numero!',
      )
    }

    const formData = new FormData()
    Object.entries(data).forEach((entry) => {
      const [key, value] = entry

      formData.append(key, String(value))
    })

    if (productImage) {
      console.log(productImage)

      formData.append('image', productImage)
    }

    if (storageCategory === '1') {
      formData.append('availabilityType', `QUANTITY`)
    } else {
      formData.append('availabilityType', `AVAILABILITY`)
      if (aviableCategory === '1') {
        formData.append('isAvailable', String(true))
        console.log(String(true))
      } else {
        formData.append('isAvailable', String(false))
        console.log(String(false))
      }
    }

    try {
      await api.put(`products/${product.product.id}`, formData)
      handleRequestSuccess('Produto Atualizado com sucesso!')
      reset()
      navigate('/restaurant/product')
    } catch (error) {
      handleRequestError(error)
      console.log(error)
    } finally {
      setDisable(false)
    }
  }

  async function getAllCategories() {
    try {
      const response = await api.get(
        `/restaurant-manager/categories/${restaurantSession?.restaurantId}`,
      )
      console.log(response)

      setCategories(response.data.categories)
    } catch (error) {
      console.log('ERROR =>', error)
    }
  }

  // console.log('PRODUCT IMAGE =>', product.product)

  useEffect(() => {
    console.log(product.product)
    getAllCategories()
  }, [])

  return (
    <Chart headingTitle="Editar Produto" edit={true}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="name" label="Nome do Produto" register={register} />
        <Input
          name="priceInCents"
          label="Preco do Produto"
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
          label="Descricao do Produto"
          register={register}
        />
        <Input
          name="estimatedMinutesToPrepare"
          label="Tempo estimado para o preparo"
          register={register}
        />
        {storageCategory === '1' ? (
          <Input
            name="availableAmount"
            label="Quantidade disponível"
            register={register}
          />
        ) : (
          <Select
            name="isAvailable"
            label="Está Disponivel?:"
            register={register}
            category={categoriesAviable}
            value={aviableCategory}
            onChange={(event) => {
              setAviableCategory(event.target.value)
            }}
          />
        )}
        <Select
          name="categoryId"
          label="Categoria do Produto:"
          register={register}
          category={categories}
          value={selectedCategory}
          onChange={(event) => {
            setSelectedCategory(event.target.value)
          }}
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
          url={product.product.imageUrl}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleImageChange(event)
          }
        />
        <FormButton isDisable={disable} buttonSubmitTitle="Editar" />
      </form>
    </Chart>
  )
}
