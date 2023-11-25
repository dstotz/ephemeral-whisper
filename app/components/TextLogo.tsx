import { CrumpledPaperIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";

type Props = {
  icon?: React.ReactNode;
  text?: string;
};

export const TextLogo = (props: Props) => {
  return (
    <Flex align="center" gap="2">
      {props.icon || <CrumpledPaperIcon width="25" height="25" />}
      {props.text || (
        <div>
          <span style={{ fontWeight: "200" }}>Ephemeral</span>{" "}
          <span style={{ fontWeight: "500" }}>Whisper</span>
        </div>
      )}
    </Flex>
  );
};
