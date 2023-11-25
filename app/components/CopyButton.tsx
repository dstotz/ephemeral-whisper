"use client";

import { Button } from "@radix-ui/themes";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

type Props = {
  data: string;
  buttonText?: string;
  buttonProps?: typeof Button.defaultProps;
};

export const CopyButton = (props: Props) => {
  const onClickCopy = () => {
    navigator.clipboard.writeText(props.data).then(() => {
      toast("Copied data to clipboard", { icon: "📋" });
    });
  };

  return (
    <Button {...props.buttonProps} onClick={onClickCopy}>
      <ClipboardCopyIcon width="16" height="16" />
      {props.buttonText || "Copy"}
    </Button>
  );
};
