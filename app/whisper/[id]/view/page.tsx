import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  Flex,
  Heading,
  TextArea,
} from "@radix-ui/themes";

import { WhisperNotFoundRedirect } from "@/app/components/WhisperNotFoundRedirect";
import { readWhisperServerAction } from "@/app/serverActions/readWhisper";
import { deleteWhisperServerAction } from "@/app/serverActions/deleteWhisper";
import { CopyButton } from "@/app/components/CopyButton";
import { SaveButton } from "@/app/components/SaveButton";
import { HomeButton } from "@/app/components/HomeButton";
import { DeleteWhisperButton } from "@/app/components/DeleteWhisperButton";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const whisper = await readWhisperServerAction(params.id);

  if (!whisper) {
    return <WhisperNotFoundRedirect />;
  }

  if (whisper.deleteOnOpen) {
    deleteWhisperServerAction(params.id);
  }

  return (
    <div>
      <Flex direction="column" gap="5" align="start">
        <Heading>Whisper</Heading>
        <TextArea
          value={whisper.data}
          size="3"
          style={{ minHeight: 200 }}
          readOnly
          data-testid="whisper-content"
        />
        {whisper.deleteOnOpen && (
          <CalloutRoot size="2" color="red">
            <CalloutIcon>
              <InfoCircledIcon />
            </CalloutIcon>
            <CalloutText>
              This Whisper has been deleted. Please make sure to save the
              contents before closing this window.
            </CalloutText>
          </CalloutRoot>
        )}
        <Flex direction="row" gap="5">
          <CopyButton buttonText="Copy Data" data={whisper.data} />
          <SaveButton buttonText="Save Data" data={whisper.data} />
          {!whisper.deleteOnOpen && <DeleteWhisperButton id={whisper.id} />}
          <HomeButton
            buttonText="Create New"
            buttonProps={{ variant: "outline" }}
          />
        </Flex>
      </Flex>
    </div>
  );
}
