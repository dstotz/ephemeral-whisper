"use client";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button, Callout, Flex, Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

type Props = {
  whisperID: string;
  willDeleteOnOpen: boolean;
};

export default function ViewWhisperWarning({ whisperID }: Props) {
  const router = useRouter();

  return (
    <Flex direction="column" gap="5" align="start">
      <Heading>Warning</Heading>
      <Callout.Root color="red" role="alert">
        <Callout.Icon>
          <ExclamationTriangleIcon />
        </Callout.Icon>
        <Callout.Text data-testid="delete-warning">
          {
            'This Whisper can only be viewed once. Clicking the "View Whisper" button will cause the Whisper to be deleted.'
          }
        </Callout.Text>
      </Callout.Root>

      <Flex direction="row" gap="5" align="center">
        <Button onClick={() => router.push(`/whisper/${whisperID}/view`)}>
          View Whisper
        </Button>
        <Button onClick={() => router.push("/")} variant="outline">
          Not Yet
        </Button>
      </Flex>
    </Flex>
  );
}
