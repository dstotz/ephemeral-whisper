"use client";

import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { CopyButton } from "@/app/components/CopyButton";
import { useEffect } from "react";
import { DeleteWhisperButton } from "@/app/components/DeleteWhisperButton";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const router = useRouter();
  const origin = window.location.origin;
  const whisperPath = `/whisper/${params.id}`;
  const whisperUrl = `${origin}${whisperPath}}`;
  const deletePath = `/whisper/${params.id}/deleted`;

  useEffect(() => {
    router.prefetch(whisperPath);
    router.prefetch(deletePath);
  }, []);

  const onClickView = () => {
    router.push(whisperPath);
  };

  return (
    <Flex direction="column" gap="5">
      <Heading>Whisper link ready</Heading>
      <Text data-testid="whisper-url">{whisperUrl}</Text>
      <Flex direction="row" gap="5" wrap="wrap">
        <CopyButton data={whisperUrl} buttonText="Copy Link" />

        <Button onClick={onClickView} variant="outline">
          <EyeOpenIcon width="16" height="16" />
          View Note
        </Button>

        <DeleteWhisperButton
          id={params.id}
          buttonProps={{ variant: "outline" }}
        />
      </Flex>
    </Flex>
  );
}
