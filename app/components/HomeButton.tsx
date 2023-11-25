"use client";

import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

type Props = {
  buttonText?: string;
  buttonProps?: typeof Button.defaultProps;
};

export const HomeButton = (props: Props) => {
  const router = useRouter();

  return (
    <Button {...props.buttonProps} onClick={() => router.push("/")}>
      {props.buttonText || "Home"}
    </Button>
  );
};
