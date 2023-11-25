"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  seconds?: number;
};

export const AutoReturnHome = (props: Props) => {
  const router = useRouter();
  const ms = (props.seconds || 3) * 1000;

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, ms);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <></>;
};
