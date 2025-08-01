import Footer from "@/components/landing-page/footer";
import Header from "@/components/landing-page/header";

export default function PoliticaDePrivacidade() {
  return (
    <>
      <Header />
      <section className=" w-full py-7">
        <div className="max-w-4xl mx-auto px-4 flex flex-col space-y-5">
          <h1 className="font-heading text-4xl sm:text-4xl md:text-5xl lg:text-6xl">
            Política de privacidade do{" "}
            <span className="text-gradient">UpWrite</span>
          </h1>

          <div className="space-y-5 text-justify leading-normal text-muted-foreground sm:text-lg sm:leading-8">
            <p>
              <span>
                A sua privacidade é importante para nós. É política do UpWrite
                respeitar a sua privacidade em relação a qualquer informação sua
                que possamos coletar no site{" "}
                <a className="text-gradient" href="/">
                  UpWrite
                </a>
                , e outros sites que possuímos e operamos.
              </span>
            </p>
            <p>
              <span>
                Solicitamos informações pessoais apenas quando realmente
                precisamos delas para lhe fornecer um serviço. Fazemo-lo por
                meios justos e legais, com o seu conhecimento e consentimento.
                Também informamos por que estamos coletando e como será usado.
              </span>
            </p>
            <p>
              <span>
                Apenas retemos as informações coletadas pelo tempo necessário
                para fornecer o serviço solicitado. Quando armazenamos dados,
                protegemos dentro de meios comercialmente aceitáveis ​​para
                evitar perdas e roubos, bem como acesso, divulgação, cópia, uso
                ou modificação não autorizados.
              </span>
            </p>
            <p>
              <span>
                Não compartilhamos informações de identificação pessoal
                publicamente ou com terceiros, exceto quando exigido por lei.
              </span>
            </p>
            <p>
              <span>
                Você é livre para recusar a nossa solicitação de informações
                pessoais, entendendo que talvez não possamos fornecer alguns dos
                serviços desejados.
              </span>
            </p>
            <p>
              <span>
                O uso continuado de nosso site será considerado como aceitação
                de nossas práticas em torno de privacidade e informações
                pessoais. Se você tiver alguma dúvida sobre como lidamos com
                dados do usuário e informações pessoais, entre em contacto
                connosco.
              </span>
            </p>
            <p>
              <span />
            </p>
            <h1 className="font-heading text-2xl">
              <span>Compromisso do Usuário</span>
            </h1>
            <p>
              <span>
                O usuário se compromete a fazer uso adequado dos conteúdos e da
                informação que o UpWrite oferece no site e com caráter
                enunciativo, mas não limitativo:
              </span>
            </p>
            <ul>
              <li>
                <span>
                  A) Não se envolver em atividades que sejam ilegais ou
                  contrárias à boa fé a à ordem pública;
                </span>
              </li>
              <li>
                <span>
                  B) Não difundir propaganda ou conteúdo de natureza racista,
                  xenofóbica,{" "}
                </span>
                <span>
                  {" "}
                  ou azar, qualquer tipo de pornografia ilegal, de apologia ao
                  terrorismo ou contra os direitos humanos;
                </span>
              </li>
              <li>
                <span>
                  C) Não causar danos aos sistemas físicos (hardwares) e lógicos
                  (softwares) do UpWrite, de seus fornecedores ou terceiros,
                  para introduzir ou disseminar vírus informáticos ou quaisquer
                  outros sistemas de hardware ou software que sejam capazes de
                  causar danos anteriormente mencionados.
                </span>
              </li>
            </ul>
            <h1 className="font-heading text-2xl">
              <span>Mais informações</span>
            </h1>
            <p>
              <span>
                Esperemos que esteja esclarecido e, como mencionado
                anteriormente, se houver algo que você não tem certeza se
                precisa ou não, geralmente é mais seguro deixar os cookies
                ativados, caso interaja com um dos recursos que você usa em
                nosso site.
              </span>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
