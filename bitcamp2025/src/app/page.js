import Image from "next/image";
import TherapistView from "./therapist.js";
import ClientView from "./client.js";

import SiteHeader from "./components/SiteHeader";
import NavBar from "./components/NavBar";
export default function Home() {
  const therapist = true;

  return (
    <div>
      <NavBar />
      <SiteHeader />
      {/* <>
      toggle bt therapist and client view 
      {therapist ? <TherapistView/> : <ClientView/>}
    </> */}
    </div>
  );
}
