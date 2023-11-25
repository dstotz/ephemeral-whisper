import { AutoReturnHome } from "@/app/components/AutoReturnHome";
import { Flex, Heading, Text } from "@radix-ui/themes";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  return (
    <Flex direction="column" gap="5">
      <Heading>Whisper deleted!</Heading>
      <Text>Whisper {params.id} has been deleted and is unrecoverable.</Text>
      <Text>You will be returned home in 10 seconds...</Text>
      <AutoReturnHome seconds={10} />
    </Flex>
  );
}
