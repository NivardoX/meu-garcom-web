import { Route, Routes } from 'react-router-dom'

import { SignIn } from '../pages/SignIn'
import { SignInProvider } from '../pages/ProviderPages/SignInProvider'

export function AuthRouter() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/provider" element={<SignInProvider />} />
    </Routes>
  )
}
