import { WhisperNotFoundRedirect } from "@/app/components/WhisperNotFoundRedirect";
import db from "@/lib/db";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const { id } = params;
  const whisper = await db.whisper.findFirst({ where: { id } });

  if (!whisper) {
    return <WhisperNotFoundRedirect />;
  }

  if (
    whisper.deleteOnOpen === false ||
    whisper.showDeleteOnReadWarning === false
  ) {
    redirect(`/whisper/${params.id}/view`);
  } else {
    redirect(`/whisper/${params.id}/warn`);
  }

  return <></>;
}
