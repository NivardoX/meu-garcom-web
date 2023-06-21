import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps extends ChakraInputProps {
  register: UseFormRegister<any>;
  name: string;
  type: string;
}

export function Input(props: InputProps) {
  const [type, setType] = useState<string>(props.type);
  useEffect(() => {
    console.log(props);
  }, []);
  const handleClick = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        width: "100%",
      }}
    >
      <ChakraInput
        {...props.register(props.name)}
        placeholder={props.placeholder}
        w={"100%"}
        h={12}
        bg={"white"}
        marginBottom={2}
        borderRadius={12}
        borderWidth={1}
        paddingLeft={2}
        fontSize={20}
        color={"#000"}
        type={type === "password" ? type : "text"}
      />
      <div
        onClick={handleClick}
        style={{
          position: "absolute",
          marginRight: '.85%',
          marginBottom: '.35%',
          padding: '.25rem',
          zIndex: 10,
        }}
      >
        {props.name === "password" ? (
          type === "password" ? (
            <FaEye color="black" cursor="pointer"/>
          ) : (
            <FaEyeSlash color="black" cursor="pointer"/>
          )
        ) : null}
      </div>
    </div>
  );
}

