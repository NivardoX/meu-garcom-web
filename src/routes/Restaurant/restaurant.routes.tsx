import { Route, Routes } from 'react-router-dom'
import { Table } from '../../pages/Restaurant/Table'
import { CreateProduct } from '../../pages/Restaurant/Product/create'
import { Product } from '../../pages/Restaurant/Product'
import { Waiter } from '../../pages/Restaurant/Waiter'
import { CreateWaiter } from '../../pages/Restaurant/Waiter/create'
import { Category } from '../../pages/Restaurant/Category'
import { CreateCategory } from '../../pages/Restaurant/Category/create'
import { Employee } from '../../pages/Restaurant/Employee'
import { CreateEmployee } from '../../pages/Restaurant/Employee/create'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { TableOrder } from '../../pages/Restaurant/Table/tableOrder'
import { UpdateProduct } from '../../pages/Restaurant/Product/update'
import { UpdateCategory } from '../../pages/Restaurant/Category/update'
import { UpdateWaiter } from '../../pages/Restaurant/Waiter/update'
import { UpdateWaiterPassWord } from '../../pages/Restaurant/Waiter/updatePassword'
import { UpdateEmployee } from '../../pages/Restaurant/Employee/update'

export function RestaurantRouter() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/restaurant/table" element={<Table />} />
        <Route path="/restaurant/table/order" element={<TableOrder />} />

        <Route path="/restaurant/product" element={<Product />} />
        <Route path="/restaurant/product/create" element={<CreateProduct />} />
        <Route path="/restaurant/product/update" element={<UpdateProduct />} />

        <Route path="/restaurant/waiter" element={<Waiter />} />
        <Route path="/restaurant/waiter/create" element={<CreateWaiter />} />
        <Route path="/restaurant/waiter/update" element={<UpdateWaiter />} />
        <Route
          path="/restaurant/waiter/updatepass"
          element={<UpdateWaiterPassWord />}
        />

        <Route path="/restaurant/category" element={<Category />} />
        <Route
          path="/restaurant/category/create"
          element={<CreateCategory />}
        />
        <Route
          path="/restaurant/category/update"
          element={<UpdateCategory />}
        />

        <Route path="/restaurant/employee" element={<Employee />} />
        <Route
          path="/restaurant/employee/create"
          element={<CreateEmployee />}
        />
        <Route
          path="/restaurant/employee/update"
          element={<UpdateEmployee />}
        />
      </Route>
    </Routes>
  )
}
