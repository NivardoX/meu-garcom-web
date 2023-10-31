import {
  SignInButton,
  SignInContainer,
  SignInContent,
  WelcomeText,
  SignInFormContent,
} from './styles'
// import { Input } from '@chakra-ui/react'
import { Input } from '../components/InputProvider'
import { useAuth } from '../../../hooks/useAuthProvider'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const signInProviderFormValidationSchema = zod.object({
  username: zod.string().min(1, 'Informe o email'),
  password: zod.string().min(1, 'Informa a senha'),
})

export type SignInProviderProps = zod.infer<
  typeof signInProviderFormValidationSchema
>

export function SignInProvider() {
  const navigate = useNavigate()
  const { signInProvider, isAuthenticated } = useAuth()
  const [type] = useState<string>('password')
  const { register, handleSubmit, watch } = useForm<SignInProviderProps>({
    resolver: zodResolver(signInProviderFormValidationSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const observerCredentials = watch('username', 'password')
  const isSubmitDisabled: boolean = !observerCredentials

  const handleSignIn = async (providerCredentials: SignInProviderProps) => {
    try {
      await signInProvider({
        username: providerCredentials.username,
        password: providerCredentials.password,
      })

      if (isAuthenticated) {
        navigate('/provider/restaurant/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <SignInContainer>
      <SignInContent>
        <div
          style={{
            marginBottom: '15%',
            marginTop: '10%',
          }}
        >
          <WelcomeText>Meu </WelcomeText>
          <WelcomeText
            style={{
              color: 'orange',
            }}
          >
            Garçom
          </WelcomeText>
        </div>
        <SignInFormContent onSubmit={handleSubmit(handleSignIn)}>
          <Input
            name="username"
            placeholder="Email"
            type="text"
            register={register}
          />
          <Input
            name="password"
            placeholder="Senha"
            type={type}
            register={register}
          />
          <SignInButton type="submit" disabled={isSubmitDisabled}>
            ENTRAR
          </SignInButton>
        </SignInFormContent>
      </SignInContent>
    </SignInContainer>
  )
}
