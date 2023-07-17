import { Route, Routes } from 'react-router-dom'
import { Restaurant } from '../../pages/ProviderPages/Restaurant'
import { CreateRestaurant } from '../../pages/ProviderPages/Restaurant/create'
import { UpdateRestaurant } from '../../pages/ProviderPages/Restaurant/update'
import { ExpiresRestaurant } from '../../pages/ProviderPages/Restaurant/updateExpires'
import { DefaultLayout } from '../../layouts/DefaultLayout'

export function ProviderRouter(props: any) {
  return (
    <Routes>
      <Route
        path="/provider/"
        element={<DefaultLayout provider={props.provider} />}
      >
        <Route path="/provider/restaurant/" element={<Restaurant />} />
        <Route
          path="/provider/restaurant/create/"
          element={<CreateRestaurant />}
        />
        <Route
          path="/provider/restaurant/update"
          element={<UpdateRestaurant />}
        />
        <Route
          path="/provider/restaurant/updateExpires"
          element={<ExpiresRestaurant />}
        />
      </Route>
    </Routes>
  )
}
