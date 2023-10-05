import { Box, Icon } from '@chakra-ui/react'
import { Chart } from '../../../components/Chart'
import { ChartContent } from '../../../components/ChartContent/ChartContent'
import {
  ChartItems,
  ChartItemsProperty,
} from '../../../components/ChartItems/ChartItems'
import { api } from '../../../service/apiClient'
import { useEffect, useState } from 'react'
import { useAppToast } from '../../../hooks/useAppToast'
import { EmptyState } from '../../../components/EmptyState'
import { AiOutlineTag } from 'react-icons/ai'
import { Loading } from '../../../components/Loading'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../../components/Pagination'

export type CategoryResponse = {
  id: string
  name: string
  createAt: Date
}
export type CategoryStorage = {
  id: string
  name: string
}

type CategoryProps = {
  name: string
}

const chartProperty: ChartItemsProperty<CategoryProps> = {
  name: { label: 'Nome', format: 'text' },
}

export function Category() {
  const navigate = useNavigate()
  const { handleRequestError, handleRequestSuccess } = useAppToast()
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalItens, setTotalItens] = useState<number>(1)

  async function getAllCategories() {
    setLoadingCategories(true)
    try {
      const response = await api.get(`/categories?page=${currentPage}`)
      console.log(response)

      setTotalItens(response.data.matchCount)
      setCategories(response.data.categories)
    } catch (error) {
      handleRequestError(error)
    } finally {
      setLoadingCategories(false)
    }
  }

  const handleRemoveCategory = async (categoryId: string) => {
    try {
      const response = await api.delete(`/categories/${categoryId}`)

      if (response.status === 204) {
        handleRequestSuccess('Categoria removida com sucesso!')
        getAllCategories()
      }
    } catch (error) {
      handleRequestError(error)
    }
  }

  const handleOpenUpdateCategory = (category: CategoryProps) => {
    navigate('/restaurant/category/update', { state: { category } })
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <Box w="100%">
      <Chart headingTitle="Categoria" href="/restaurant/category/create">
        {loadingCategories ? (
          <Loading />
        ) : categories.length === 0 ? (
          <EmptyState
            title="Você não possui Categorias criadas para listagem..."
            icon={
              <Icon
                as={AiOutlineTag}
                boxSize={20}
                color="gray.300"
                marginBottom={5}
              />
            }
          />
        ) : (
          <ChartContent headers={chartProperty}>
            {categories.map((category, categoryIndex) => {
              return (
                <ChartItems
                  values={chartProperty}
                  data={category}
                  key={categoryIndex}
                  onEdit={() => {
                    handleOpenUpdateCategory(category)
                  }}
                  onRemove={() => {
                    handleRemoveCategory(category.id)
                  }}
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
