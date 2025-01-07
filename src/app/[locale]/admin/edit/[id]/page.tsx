import EditEntryForm from "./params";

export default async function EditEntryPage({ params }: { params: { id: string } }) {
  const paramsWaited = await params;
  return <EditEntryForm id={paramsWaited.id} />;
}
