"use client";

import { Flex, Heading, Text } from "@radix-ui/themes";
import { AutoReturnHome } from "./AutoReturnHome";

export const WhisperNotFoundRedirect = () => {
  return (
    <Flex direction="column" gap="5">
      <Heading>Whisper not found</Heading>
      <Text>You will be automatically redirected home after 3 seconds...</Text>
      <AutoReturnHome />
    </Flex>
  );
};
