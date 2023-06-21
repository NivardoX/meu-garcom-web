import { Box, Button, SimpleGrid, VStack } from "@chakra-ui/react";
import { CreateContent } from "../../../components/CreateContent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { FormButton } from "../../../components/Form/FormButton";
import { Input } from "../../../components/Input";
import { apiProvider } from "../../../service/apiProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export type CreateRestaurantProps = {
  restaurantName: string;
  restaurantManagerName: string;
  restaurantUsernameRestaurant: string;
  restaurantPassword: string;
  restaurantConfirmPassword: string;
  expiresAt: Date;
};

const CreateRestaurantValidationSchema = zod.object({
  restaurantName: zod.string().min(1, "Informe a categoria do produto"),
  restaurantManagerName: zod.string().min(1, "Informe o preço do produto"),
  restaurantUsernameRestaurant: zod
    .string()
    .min(1, "Informe a descrição do produto"),
  restaurantConfirmPassword: zod.string().min(1, "Informe o preço do produto"),
  expiresAt: zod.string().min(1, "Informe a Categoria"),
});

export function CreateRestaurant() {
  const [ maxTables, setMaxTables] = useState()
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState, reset } =
    useForm<CreateRestaurantProps>({
      resolver: zodResolver(CreateRestaurantValidationSchema),
      defaultValues: {
        restaurantName: "",
        restaurantManagerName: "",
        restaurantUsernameRestaurant: "",
        restaurantPassword: "",
        restaurantConfirmPassword: "",
      },
    });

  const observerContentForm = watch([
    "restaurantName",
    "restaurantManagerName",
    "restaurantUsernameRestaurant",
    "restaurantPassword",
    "restaurantConfirmPassword",
    "expiresAt",
  ]);
  const isSubmitDisabled: boolean = !observerContentForm;

  const handleCreateRestaurant = async ({
    ...props
  }: CreateRestaurantProps) => {
    console.log("oi", {
      props
    });

    try {
      const response = await apiProvider.post("/restaurant", {
        restaurantName: props.restaurantName,
        managerName: props.restaurantManagerName,
        username: props.restaurantUsernameRestaurant,
        password: props.restaurantConfirmPassword,
        expiresAt: new Date(props.expiresAt),
        maxTables: Number(maxTables)
      });

      console.log("createRestaurant Response =>", response);
      reset();
      navigate('/provider/restaurant')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box w="100%">
      <CreateContent headingTitle="Criar Restaurante">
        <form onSubmit={handleSubmit(handleCreateRestaurant)}>
          <VStack spacing="8">
            <SimpleGrid minChildWidth="200px" w="100%" spacing="8">
              <Input
                name="restaurantName"
                label="Nome do Restaurante"
                register={register}
              />
              <Input
                name="restaurantManagerName"
                label="Nome do gerente"
                register={register}
              />
              <Input
                name="restaurantUsernameRestaurant"
                label="Email do restaurante"
                register={register}
              />
              <Input
                name="restaurantPassword"
                label="Senha do restaurante"
                register={register}
              />
              <Input
                name="restaurantConfirmPassword"
                label="Confirmar senha"
                register={register}
              />
              <Input
                name="expiresAt"
                label="Expiração do restaurante"
                type="date"
                register={register}
              />
               <Input
                name="maxTables"
                label="Numero de mesas"
                type="number"
                onChange={e => setMaxTables(e.target.value)}
                register={register}
              />
            </SimpleGrid>
          </VStack>
          <FormButton isDisable={isSubmitDisabled} />
        </form>
      </CreateContent>
    </Box>
  );
}

