import { Route, Routes } from 'react-router-dom'
import { Restaurant } from '../../pages/ProviderPages/Restaurant'
import { Restaurant as RestaurantDesactive } from '../../pages/ProviderPages/RestaurantDesactive'
import { CreateRestaurant } from '../../pages/ProviderPages/Restaurant/create'
import { UpdateRestaurant } from '../../pages/ProviderPages/Restaurant/update'
import { UpdatePasswordRestaurant } from '../../pages/ProviderPages/Restaurant/updatePassword'
import { ExpiresRestaurant } from '../../pages/ProviderPages/Restaurant/updateExpires'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { UpdateRestaurantDesactive } from '../../pages/ProviderPages/RestaurantDesactive/update'

export function ProviderRouter(props: any) {
  return (
    <Routes>
      <Route
        path="/provider/"
        element={<DefaultLayout provider={props.provider} />}
      >
        <Route path="/provider/restaurant/" element={<Restaurant />} />
        <Route
          path="/provider/restaurant/desactive"
          element={<RestaurantDesactive />}
        />
        <Route
          path="/provider/restaurant/create/"
          element={<CreateRestaurant />}
        />
        <Route
          path="/provider/restaurant/update"
          element={<UpdateRestaurant />}
        />
        <Route
          path="/provider/restaurant/updatePassword"
          element={<UpdatePasswordRestaurant />}
        />
        <Route
          path="/provider/restaurant/updateExpires"
          element={<ExpiresRestaurant />}
        />
        <Route
          path="/provider/restaurant/desactive/update"
          element={<UpdateRestaurantDesactive />}
        />
        <Route
          path="/provider/restaurant/desactive/updateExpires"
          element={<ExpiresRestaurant />}
        />
      </Route>
    </Routes>
  )
}
