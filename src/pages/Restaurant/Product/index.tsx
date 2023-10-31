import { Box, Icon } from '@chakra-ui/react'
import { Chart } from '../../../components/Chart'
import {
  ChartItemsProperty,
  ChartItems,
} from '../../../components/ChartItems/ChartItems'
import { ChartContent } from '../../../components/ChartContent/ChartContent'
import { api } from '../../../service/apiClient'
import { useEffect, useState } from 'react'
import { useAppToast } from '../../../hooks/useAppToast'
import { EmptyState } from '../../../components/EmptyState'
import { IoFastFoodOutline } from 'react-icons/io5'
import { Loading } from '../../../components/Loading'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../../components/Pagination'

export type GetProductsResponse = {
  products: [
    {
      id: string
      name: string
      description: string
      restaurantId: string
      imageUrl: string
      priceInCents: number
      availabilityType: string
      availableAmount: number
      isAvailable: boolean
      estimatedMinutesToPrepare: number
      category: {
        id: string
        name: string
        restaurantId: string
      }
    },
  ]
  numberOfPages: number
  matchCount: number
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
  categoryName?: string
  isAvailable: boolean
  category: {
    id: string
    name: string
    restaurantId: string
  }
}

const chartProperty: ChartItemsProperty<ProductProps> = {
  name: { label: 'Nome', format: 'text' },
  priceInCents: { label: 'Preço', format: 'currency' },
  categoryName: { label: 'Categoria', format: 'text' },
}

export function Product() {
  const navigate = useNavigate()
  const { handleRequestError, handleRequestSuccess } = useAppToast()
  const [restaurantProduct, setRestaurantProduct] = useState<ProductProps[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalItens, setTotalItens] = useState<number>(1)
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false)

  async function getAllRestaurantProduct() {
    setLoadingProducts(true)
    try {
      const response = await api.get<GetProductsResponse>(
        `/products?page=${currentPage}`,
      )
      console.log(response)
      setTotalItens(response.data.matchCount)

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
          categoryName: product.category?.name,
          isAvailable: product.isAvailable,
          category: product.category,
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

  const handleRemoveProduct = async (id: string) => {
    try {
      setLoadingProducts(true)
      await api.delete(`/products/${id}`)
      getAllRestaurantProduct()
      handleRequestSuccess('Produto Excluído!')
    } catch (error) {
      console.log(error)
      handleRequestError(error)
    }
  }

  const handleOpenUpdateProduct = (product: ProductProps) => {
    navigate('/restaurant/product/update', { state: { product } })
  }

  useEffect(() => {
    getAllRestaurantProduct()
  }, [currentPage])

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
                  onRemove={() => handleRemoveProduct(product.id)}
                />
              )
            })}
          </ChartContent>
        )}
        <Pagination
          currentPage={currentPage}
          totalCountOfRegisters={totalItens}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Chart>
    </Box>
  )
}
