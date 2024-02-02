import { Box, Flex, HStack, Heading } from "@chakra-ui/react";
import { CreateButton } from "../CreateButton/CreateButton";
import { ReactNode } from "react";
import { QrCodeButton } from "../../pages/Restaurant/Table/components/QrCodeButton";
import { useNavigate } from 'react-router-dom'

interface ChartProps {
  headingTitle: string;
  children: ReactNode;
  href?: string;
  hasCreateButton?: boolean;
  goBack?: boolean;
  edit?: boolean;
  session?: boolean;
  openModal?: () => void;
  onPress?: () => void;
}

export function Chart({
  hasCreateButton = true,
  edit = false,
  goBack = false,
  session = false,
  ...props
}: ChartProps) {
  const navigate = useNavigate()
  return (
    <Flex w="100%" my="9" maxWidth={1480} mx="auto" px="8">
      <Box flex="1" borderRadius={8} bg="gray.800" p={8}>
        <Flex mb="8" justifyContent="space-between" align="center">
          {goBack && <CreateButton
            title={"Voltar"}
            color="orange"
            href={props.href}
            onPress={() => navigate(-1)}
          />}
          <Heading size="lg" fontWeight="normal" color="white">
            {props.headingTitle}
          </Heading>
          {hasCreateButton ? (
            !edit && (
              <CreateButton
                title={"Criar Novo"}
                href={props.href}
                onPress={props.onPress}
              />
            )
          ) : (
            <HStack w="auto">
              <QrCodeButton onClick={props.openModal} />
              {session && (
                <CreateButton
                  title={"Fechar Mesa"}
                  color="red"
                  href={props.href}
                  onPress={props.onPress}
                />
              )}
            </HStack>
          )}
        </Flex>
        {props.children}
      </Box>
    </Flex>
  );
}

