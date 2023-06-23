import { Box, Icon } from '@chakra-ui/react'
import { Chart } from '../../../components/Chart'
import {
  ChartItemsProperty,
  ChartItems,
} from '../../../components/ChartItems/ChartItems'
import { ChartContent } from '../../../components/ChartContent/ChartContent'
import { api } from '../../../service/apiClient'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useAppToast } from '../../../hooks/useAppToast'
import { EmptyState } from '../../../components/EmptyState'
import { IoFastFoodOutline } from 'react-icons/io5'
import { Loading } from '../../../components/Loading'
import { useNavigate } from 'react-router-dom'

export type GetProductsResponse = {
  products: [
    {
      id: string
      name: string
      description: string
      restaurantId: string
      imageUrl: string
      priceInCents: number
      availabilityType: string,
      availableAmount: number
      estimatedMinutesToPrepare: number
      category: {
        id: string
        name: string
        restaurantId: string
      }
    },
  ]
}

export type ProductProps = {
  id: string
  name: string
  description: string
  restaurantId: string
  imageUrl: string
  priceInCents: number
  availableAmount: number
  estimatedMinutesToPrepare: number
  categoryName: string
}

const chartProperty: ChartItemsProperty<ProductProps> = {
  name: { label: 'Nome', format: 'text' },
  priceInCents: { label: 'Preço', format: 'currency' },
  categoryName: { label: 'Categoria', format: 'text' },
}

export function Product() {
  const navigate = useNavigate()
  const { handleRequestError } = useAppToast()
  const [restaurantProduct, setRestaurantProduct] = useState<ProductProps[]>([])
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false)
  const { restaurantSession } = useAuth()

  async function getAllRestaurantProduct() {
    setLoadingProducts(true)
    try {
      const response = await api.get<GetProductsResponse>(`/products?page=1`)

      console.log('response PRODUCT =>', response.data)
      const products: ProductProps[] = response.data.products.map((product) => {
        
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          restaurantId: product.restaurantId,
          imageUrl: product.imageUrl,
          priceInCents: product.priceInCents,
          availableAmount: product.availableAmount,
          availabilityType: product.availabilityType,
          estimatedMinutesToPrepare: product.estimatedMinutesToPrepare,
          categoryName: product.category.name,
        }
      })
      setRestaurantProduct(products)
    } catch (error) {
      handleRequestError(error)
    } finally {
      setLoadingProducts(false)
    }
  }

  // TODO: delete dos produtos ainda não implementado na APi

  // const handleRemoveProduct = async () => {
  //   try {

  //   } catch (error) {

  //   }
  // }

  const handleOpenUpdateProduct = (product: ProductProps) => {
    navigate('/restaurant/product/update', { state: { product } })
  }

  useEffect(() => {
    getAllRestaurantProduct()
  }, [])

  return (
    <Box w="100%">
      <Chart headingTitle="Produtos" href="/restaurant/product/create">
        {loadingProducts ? (
          <Loading />
        ) : restaurantProduct.length === 0 ? (
          <EmptyState
            title="Você não possui Produtos criados para à listagem..."
            icon={
              <Icon
                as={IoFastFoodOutline}
                boxSize={20}
                color="gray.300"
                marginBottom={5}
              />
            }
          />
        ) : (
          <ChartContent headers={chartProperty}>
            {restaurantProduct.map((product, productIndex) => {
              return (
                <ChartItems
                  values={chartProperty}
                  data={product}
                  key={productIndex}
                  onEdit={() => handleOpenUpdateProduct(product)}
                />
              )
            })}
          </ChartContent>
        )}
      </Chart>
    </Box>
  )
}
