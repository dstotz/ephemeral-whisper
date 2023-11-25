import { GearIcon } from "@radix-ui/react-icons";
import { Flex, Heading } from "@radix-ui/themes";

const sizes = {
  small: 16,
  medium: 32,
  large: 64,
  xlarge: 80,
};

type Props = {
  size?: keyof typeof sizes;
  text?: string;
  minHeight?: number;
};

export const Loading = (props: Props) => {
  const { size = "large", text = "Loading..." } = props;
  const sizeValue = sizes[size];

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{ minHeight: props.minHeight }}
      gap="3"
    >
      <GearIcon
        className="loading-spinner"
        height={sizeValue}
        width={sizeValue}
      />
      <Heading size="4">{text}</Heading>
    </Flex>
  );
};
