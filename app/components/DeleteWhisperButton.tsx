"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteWhisperServerAction } from "../serverActions/deleteWhisper";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  buttonProps?: typeof Button.defaultProps;
};

export const DeleteWhisperButton = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteWhisper = async () => {
    try {
      await deleteWhisperServerAction(props.id);
      router.push(`/whisper/${props.id}/deleted`);
    } catch {
      setLoading(false);
    }
  };

  const onClickDelete = () => {
    setLoading(true);
    toast.promise(
      deleteWhisper(),
      {
        loading: "Deleting...",
        success: "Whisper deleted!",
        error: "Whisper has already been deleted",
      },
      { success: { icon: "🗑️" } }
    );
  };

  return (
    <Button {...props.buttonProps} onClick={onClickDelete} disabled={loading}>
      <TrashIcon width="16" height="16" />
      Delete Whisper
    </Button>
  );
};
