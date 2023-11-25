"use client";

import { Button } from "@radix-ui/themes";
import { saveAs } from "file-saver";

type Props = {
  data: string;
  buttonText?: string;
  buttonProps?: typeof Button.defaultProps;
};

export const SaveButton = (props: Props) => {
  const onClickSave = () => {
    const blob = new Blob([props.data], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "whisper.txt");
  };

  return (
    <Button {...props.buttonProps} onClick={onClickSave}>
      {props.buttonText || "Save"}
    </Button>
  );
};
