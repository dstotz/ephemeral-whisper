"use client";

import { createWhisperServerAction } from "@/app/serverActions/createWhisper";
import { encryptString } from "@/lib/encryption/client";
import { Button, Checkbox, Flex, Heading, TextArea } from "@radix-ui/themes";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loading } from "../components/Loading";
import { CreateWhisperOpts } from "@/types/whisper";

const defaultCreateOpts: CreateWhisperOpts = {
  deleteOnOpen: true,
  showDeleteOnReadWarning: true,
};

export default function Page() {
  const [opts, setOpts] = useState<CreateWhisperOpts>(defaultCreateOpts);
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createWhisper = async () => {
    const encryptedData = encryptString(data);
    try {
      const newWhisper = await createWhisperServerAction(encryptedData, opts);
      router.push(`/whisper/${newWhisper.id}/created`);
    } catch {
      setLoading(false);
    }
  };

  const onClickCreate = async () => {
    setLoading(true);
    toast.promise(createWhisper(), {
      loading: "Creating...",
      success: "Whisper created!",
      error: "Failed to create whisper",
    });
  };

  const handleOptChange = (opt: keyof CreateWhisperOpts, value: any) => {
    const newOpts = { ...opts, [opt]: value };
    setOpts(newOpts);
  };

  return (
    <Flex direction="column" gap="5">
      <Heading>My whisper</Heading>
      {loading ? (
        <Loading text="Encrypting..." minHeight={200} />
      ) : (
        <Flex direction="column" gap="5">
          <TextArea
            size="3"
            style={{ minHeight: 200 }}
            placeholder="Type your secret here..."
            onChange={(e) => setData(e.currentTarget.value)}
            value={data}
            data-testid="whisper-input"
          />

          <Flex gap="5">
            <Flex gap="2">
              <Checkbox
                checked={opts["deleteOnOpen"]}
                onCheckedChange={(checked) =>
                  handleOptChange("deleteOnOpen", checked)
                }
              />
              Delete on open
            </Flex>
            <Flex gap="2">
              <Checkbox
                checked={opts["showDeleteOnReadWarning"]}
                onCheckedChange={(checked) =>
                  handleOptChange("showDeleteOnReadWarning", checked)
                }
              />
              Show delete on read warning
            </Flex>
          </Flex>

          <Button onClick={onClickCreate}>Create Whisper</Button>
        </Flex>
      )}
    </Flex>
  );
}
