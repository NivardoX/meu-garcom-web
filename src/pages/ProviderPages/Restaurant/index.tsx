import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chart } from '../../../components/Chart'
import { ChartContent } from '../../../components/ChartContent/ChartContent'
import {
  ChartItems,
  ChartItemsProperty,
} from '../../../components/ChartItems/ChartItems'
import { apiProvider } from '../../../service/apiProvider'

type RestaurantProps = {
  name: string
  expiresAt: string
}

const chartProperty: ChartItemsProperty<RestaurantProps> = {
  name: { label: 'Nome do Restaurante', format: 'text' },
  expiresAt: { label: 'Data de Expiração', format: 'date' },
}

export function Restaurant() {
  const [itemData, setItemData] = useState<RestaurantProps[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    apiProvider
      .get('restaurant?page=1')
      .then((response) => {
        setItemData(response.data.restaurants)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const handleOpenUpdateExpires = (restaurant: any) => {
    navigate('updateExpires', { state: restaurant })
  }
  const handleOpenEditRestaurant = (restaurant: any) => {
    navigate('update', { state: restaurant })
  }
  const handleOpenEditPasswordRestaurant = (restaurant: any) => {
    navigate('updatePassword', { state: restaurant })
  }
  return (
    <Box w="100%" height={'100%'}>
      <Chart headingTitle="Restaurantes" href="/provider/restaurant/create/">
        <ChartContent headers={chartProperty}>
          {itemData.map((element, index) => {
            return (
              <ChartItems
                values={chartProperty}
                data={element}
                key={index}
                expires={true}
                password
                onEdit={() => handleOpenEditRestaurant(element)}
                onPassword={() => handleOpenEditPasswordRestaurant(element)}
                onExpires={() => handleOpenUpdateExpires(element)}
              />
            )
          })}
        </ChartContent>
      </Chart>
    </Box>
  )
}
