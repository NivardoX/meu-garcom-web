import {
  SignInButton,
  SignInContainer,
  SignInContent,
  SignInGeneralContent,
  WelcomeText,
  SignInFormContent,
} from "./styles";
import { Input } from "./Components/Input";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useNavigate } from "react-router-dom";

const signInFormValidationSchema = zod.object({
  username: zod.string().min(1, "Informe o email"),
  password: zod.string().min(1, "Informa a senha"),
});

export type SignInProps = zod.infer<typeof signInFormValidationSchema>;

export function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { register, handleSubmit, watch } = useForm<SignInProps>({
    resolver: zodResolver(signInFormValidationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const observerCredentials = watch("username", "password");
  const isSubmitDisabled: boolean = !observerCredentials;

  const handleSignIn = async (restaurantCredentials: SignInProps) => {
    try {
      await signIn({
        username: restaurantCredentials.username,
        password: restaurantCredentials.password,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SignInContainer>
      <SignInContent>
        <SignInGeneralContent>
          <div
            style={{
              marginBottom: "15%",
              marginTop: "15%",
            }}
          >
            <WelcomeText>Meu </WelcomeText>
            <WelcomeText
              style={{
                color: "orange",
              }}
            >
              Garçom
            </WelcomeText>
          </div>
          <SignInFormContent onSubmit={handleSubmit(handleSignIn)}>
            <Input name="username" placeholder="Email" type='text' register={register} />
            <Input name="password" placeholder="Senha" type='password' register={register} />
            <SignInButton type="submit" disabled={isSubmitDisabled}>
              ENTRAR
            </SignInButton>
          </SignInFormContent>
        </SignInGeneralContent>
      </SignInContent>
    </SignInContainer>
  );
}

