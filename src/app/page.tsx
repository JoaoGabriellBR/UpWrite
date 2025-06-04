import dynamic from "next/dynamic";
import Header from "@/components/landing-page/header";
import Jumbotron from "@/components/landing-page/jumbotron";
import ScreenMockup from "@/components/landing-page/screen-mockup";

// Lazy load non-critical components
const Garanta = dynamic(() => import("@/components/landing-page/garanta"), {
  loading: () => <div className="min-h-[40vh]" />,
});

const Organizaçao = dynamic(
  () => import("@/components/landing-page/organizaçao"),
  {
    loading: () => <div className="min-h-[40vh]" />,
  }
);

const Preserve = dynamic(() => import("@/components/landing-page/preserve"), {
  loading: () => <div className="min-h-[40vh]" />,
});

const Novidades = dynamic(() => import("@/components/landing-page/novidades"), {
  loading: () => <div className="min-h-[40vh]" />,
});

const PerguntasRespostas = dynamic(
  () => import("@/components/landing-page/perguntas-e-respostas"),
  {
    loading: () => <div className="min-h-[40vh]" />,
  }
);

const DeUmUp = dynamic(() => import("@/components/landing-page/de-um-up"), {
  loading: () => <div className="min-h-[40vh]" />,
});

const Footer = dynamic(() => import("@/components/landing-page/footer"), {
  loading: () => <div className="min-h-[20vh]" />,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
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
    </main>
  );
}
