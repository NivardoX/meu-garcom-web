import { useToast } from '@chakra-ui/react'
import { createContext, ReactNode } from 'react'
import { AxiosError } from 'axios'

type ServiceError = {
  error: string
  message: string
  statusCode: number
}

type AppToastContextDataProps = {
  handleRequestError(error: any, customMessage?: string): void
  handleRequestSuccess(customMessage: string): void
}

type AppToastContextProviderProps = {
  children: ReactNode
}

export const AppToastContext = createContext<AppToastContextDataProps>(
  {} as AppToastContextDataProps,
)

export function AppToastProvider({ children }: AppToastContextProviderProps) {
  const toast = useToast()

  function handleRequestError(
    error: AxiosError<ServiceError>,
    customMessage: string,
  ) {
    const isAppError = error instanceof AxiosError && error.response
    const errorDescription = isAppError
      ? error.response?.data.message
      : customMessage ||
        'Não foi possível completar a operação. Tente novamente mais tarde.'

    toast({
      title: 'Erro!',
      description: errorDescription,
      position: 'top-right',
      status: 'error',
      duration: 2000,
      isClosable: true,
    })
  }

  function handleRequestSuccess(customMessage: string) {
    toast({
      title: 'Sucesso!',
      description: customMessage || 'Operação realizada com sucesso!',
      position: 'top-right',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <AppToastContext.Provider
      value={{ handleRequestError, handleRequestSuccess }}
    >
      {children}
    </AppToastContext.Provider>
  )
}
