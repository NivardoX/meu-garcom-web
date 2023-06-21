import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Chart } from '../../../components/Chart'
import { Input } from '../../../components/Input'
import * as zod from 'zod'
import { FormButton } from '../../../components/Form/FormButton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select } from './components/Select'
import { Storage } from "./components/Storage";
import { api } from '../../../service/apiClient'
import { CategoryResponse, CategoryStorage } from '../Category'
import { GetProductsResponse } from '.'
import { Image } from '@chakra-ui/react'
import { ProductImage } from '../Table/components/ProductImage'

const UpdateProductValidationSchema = zod.object({
  categoryId: zod.string().min(1, 'Informe a categoria do produto'),
  name: zod.string().min(1, 'Informe a Categoria'),
  price: zod.number().min(1, 'Informe o Preco'),
  description: zod.string().min(1, 'Informe a Categoria'),
  estimatedMinutesToPrepare: zod.string().optional(),
  image: zod.string().optional() || File,
  isAvailable: zod.boolean().optional(),
  availableAmount: zod.string().optional() || zod.number().optional()
})

type UpdateProductProps = zod.infer<typeof UpdateProductValidationSchema>

export function UpdateProduct() {
  const location = useLocation()
  const product = location.state as GetProductsResponse['products'][0]
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const [productImage, setProductImage] = useState<File | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>()
  const [storageCategory, setStorageCategory] = useState<string>();
  const [categoriesStorage, setCategoriesStogare] = useState<CategoryStorage[]>(
    [
      { name: "QUANTITY", id: "1" },
      { name: "AVAILABILITY", id: "2" },
    ]
  );
  const { register, handleSubmit, watch, reset } = useForm<UpdateProductProps>({
    resolver: zodResolver(UpdateProductValidationSchema),
    defaultValues: {
      categoryId: product.category || '',
      name: product.product.name || '',
      price: product.product.priceInCents / 100 || '',
      description: product.product.description || '',
      estimatedMinutesToPrepare:
        product.product.estimatedMinutesToPrepare || '',
        image: product.product.imageUrl || '',
        availableAmount: product.product.availableAmount || '',
    },
  })

  const onSubmit = async (data: UpdateProductProps) => {
    console.log(data);
    try {
      const res = await api.put(`products/${product.product.id}`,data)
      console.log(res);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  async function getAllCategories() {
    try {
      const response = await api.get(`/categories?page=1`)
      setCategories(response.data.categories)
    } catch (error) {
      console.log('ERROR =>', error)
    }
  }

  console.log('PRODUCT IMAGE =>', product)

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <Chart headingTitle="Editar Produto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="name" label="Nome do Produto" register={register} />
        <Input name="price" label="Preco do Produto" register={register} />
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
        <Input
          name="availableAmount"
          label="Quantidade disponível"
          register={register}
        />
        <Select
          name="categoryId"
          category={categories}
          label="Categoria"
          value={watch('categoryId')}
          register={register}
          defaultValue={product.product.name}
        />
        <Storage
            name="availabilityType"
            label="Categoria de quantidade:"
            register={register}
            category={categoriesStorage}
            value={storageCategory}
            onChange={(event) => {
              setStorageCategory(event.target.value);
            }}
          />
        <FormButton buttonSubmitTitle="Editar">Salvar</FormButton>
      </form>
    </Chart>
  )
}
