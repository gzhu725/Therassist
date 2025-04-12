<<<<<<< HEAD
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
=======
import SiteHeader from "./components/SiteHeader";
import NavBar from "./components/NavBar";
export default function Home() {
  return (
    <div>
      <NavBar />
      <SiteHeader />
    </div>
>>>>>>> f9ed542de378abed460d29acffcabbc5ff88378f
  );
}
