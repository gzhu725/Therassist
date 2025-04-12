import Image from "next/image";
import TherapistView from "./therapist.js";
import ClientView from "./client.js";

export default function Home() {
  const therapist = true;

  return (
    <>
      {/* toggle bt therapist and client view  */}
      {therapist ? <TherapistView/> : <ClientView/>}
    </>
  );
}
