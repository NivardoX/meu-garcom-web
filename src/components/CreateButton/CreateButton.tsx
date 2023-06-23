import { Button, Icon } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export type CreateButtonProps = {
  title: string;
  href?: string;
  color?: string;
  onPress?: () => void;
};

export function CreateButton({
  title,
  href,
  onPress,
  color,
}: CreateButtonProps) {
  return (
    <>
      {href ? (
        <Link to={href}>
          <Button
            as="a"
            size="md"
            fontSize="sm"
            textColor="white"
            bg={color || "#7D3421"}
            leftIcon={color ? undefined : <Icon as={RiAddLine} color="white" />}
            onClick={onPress}
          >
            {title}
          </Button>
        </Link>
      ) : (
        <Button
          as="a"
          size="md"
          fontSize="sm"
          textColor="white"
          bg={color || "#7D3421"}
          leftIcon={color ? undefined : <Icon as={RiAddLine} color="white" />}
          onClick={onPress}
        >
          {title}
        </Button>
      )}
    </>
  );
}

