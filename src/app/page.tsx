import Header from "@/components/landing-page/header";
import Jumbotron from "@/components/landing-page/jumbotron";
import Garanta from "@/components/landing-page/garanta";
import Organizaçao from "@/components/landing-page/organizaçao";
import Preserve from "@/components/landing-page/preserve";
import Novidades from "@/components/landing-page/novidades";
import PerguntasRespostas from "@/components/landing-page/perguntas-e-respostas";
import DeUmUp from "@/components/landing-page/de-um-up";
import Footer from "@/components/landing-page/footer";
import ScreenMockup from "@/components/landing-page/screen-mockup";

export default function Home() {
  return (
    <>
      <Header />
      <Jumbotron />
      <ScreenMockup />
      <Garanta />
      <Organizaçao />
      <Preserve />
      <Novidades />
      <PerguntasRespostas />
      <DeUmUp />
      <Footer />
    </>
  );
}
