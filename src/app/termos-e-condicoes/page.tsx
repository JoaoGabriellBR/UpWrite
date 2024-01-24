import Footer from "@/components/landing-page/footer";
import Header from "@/components/landing-page/header";

export default function TermosECondiçoes() {
  return (
    <>
      <Header />
      <section className=" w-full py-7">
        <div className="max-w-4xl mx-auto px-4 flex flex-col space-y-5">
          <h1 className="font-heading text-4xl sm:text-4xl md:text-5xl lg:text-6xl">
            Termos e condições de uso do{" "}
            <span className="text-primary">UpWrite</span>
          </h1>

          <div className="space-y-5 text-justify leading-normal text-muted-foreground sm:text-lg sm:leading-8">
            <h2>
              <span>1. Termos</span>
            </h2>
            <p>
              <span>
                Ao acessar o site{" "}
                <a className="text-primary" href="/">UpWrite</a>, concorda em
                cumprir estes termos de serviço, todas as leis e regulamentos
                aplicáveis ​​e concorda que é responsável pelo cumprimento de
                todas as leis locais aplicáveis. Se você não concordar com algum
                desses termos, está proibido de usar ou acessar este site. Os
                materiais contidos neste site são protegidos pelas leis de
                direitos autorais e marcas comerciais aplicáveis.
              </span>
            </p>
            <h2>
              <span>2. Uso de Licença</span>
            </h2>
            <p>
              <span>
                É concedida permissão para baixar temporariamente uma cópia dos
                materiais (informações ou software) no site UpWrite , apenas
                para visualização transitória pessoal e não comercial. Esta é a
                concessão de uma licença, não uma transferência de título e, sob
                esta licença, você não pode:&nbsp;
              </span>
            </p>
            <ol>
              <li>
                <span>modificar ou copiar os materiais;&nbsp;</span>
              </li>
              <li>
                <span>
                  usar os materiais para qualquer finalidade comercial ou para
                  exibição pública (comercial ou não comercial);&nbsp;
                </span>
              </li>
              <li>
                <span>
                  tentar descompilar ou fazer engenharia reversa de qualquer
                  software contido no site UpWrite;&nbsp;
                </span>
              </li>
              <li>
                <span>
                  remover quaisquer direitos autorais ou outras notações de
                  propriedade dos materiais; ou&nbsp;
                </span>
              </li>
              <li>
                <span>
                  transferir os materiais para outra pessoa ou {"espelhe"} os
                  materiais em qualquer outro servidor.
                </span>
              </li>
            </ol>
            <p>
              <span>
                Esta licença será automaticamente rescindida se você violar
                alguma dessas restrições e poderá ser rescindida por UpWrite a
                qualquer momento. Ao encerrar a visualização desses materiais ou
                após o término desta licença, você deve apagar todos os
                materiais baixados em sua posse, seja em formato eletrónico ou
                impresso.
              </span>
            </p>
            <h2>
              <span>3. Isenção de responsabilidade</span>
            </h2>
            <ol>
              <li>
                <span>
                  Os materiais no site do UpWrite são fornecidos {"como estão"}.
                  UpWrite não oferece garantias, expressas ou implícitas, e, por
                  este meio, isenta e nega todas as outras garantias, incluindo,
                  sem limitação, garantias implícitas ou condições de
                  comercialização, adequação a um fim específico ou não violação
                  de propriedade intelectual ou outra violação de direitos.
                </span>
              </li>
              <li>
                <span>
                  Além disso, o UpWrite não garante ou faz qualquer
                  representação relativa à precisão, aos resultados prováveis
                  ​​ou à confiabilidade do uso dos materiais em seu site ou de
                  outra forma relacionado a esses materiais ou em sites
                  vinculados a este site.
                </span>
              </li>
            </ol>
            <h2>
              <span>4. Limitações</span>
            </h2>
            <p>
              <span>
                Em nenhum caso o UpWrite ou seus fornecedores serão responsáveis
                ​​por quaisquer danos (incluindo, sem limitação, danos por perda
                de dados ou lucro ou devido a interrupção dos negócios)
                decorrentes do uso ou da incapacidade de usar os materiais em
                UpWrite, mesmo que UpWrite ou um representante autorizado da
                UpWrite tenha sido notificado oralmente ou por escrito da
                possibilidade de tais danos. Como algumas jurisdições não
                permitem limitações em garantias implícitas, ou limitações de
                responsabilidade por danos conseqüentes ou incidentais, essas
                limitações podem não se aplicar a você.
              </span>
            </p>
            <h2>
              <span>5. Precisão dos materiais</span>
            </h2>
            <p>
              <span>
                Os materiais exibidos no site do UpWrite podem incluir erros
                técnicos, tipográficos ou fotográficos. UpWrite não garante que
                qualquer material em seu site seja preciso, completo ou atual.
                UpWrite pode fazer alterações nos materiais contidos em seu site
                a qualquer momento, sem aviso prévio. No entanto, UpWrite não se
                compromete a atualizar os materiais.
              </span>
            </p>
            <h2>
              <span>6. Links</span>
            </h2>
            <p>
              <span>
                O UpWrite não analisou todos os sites vinculados ao seu site e
                não é responsável pelo conteúdo de nenhum site vinculado. A
                inclusão de qualquer link não implica endosso por UpWrite do
                site. O uso de qualquer site vinculado é por conta e risco do
                usuário.
              </span>
            </p>
            <h1 className="font-heading text-2xl">Modificações</h1>
            <p>
              <span>
                O UpWrite pode revisar estes termos de serviço do site a
                qualquer momento, sem aviso prévio. Ao usar este site, você
                concorda em ficar vinculado à versão atual desses termos de
                serviço.
              </span>
            </p>
            <h1 className="font-heading text-2xl">Lei aplicável</h1>
            <p>
              <span>
                Estes termos e condições são regidos e interpretados de acordo
                com as leis do UpWrite e você se submete irrevogavelmente à
                jurisdição exclusiva dos tribunais naquele estado ou localidade.
              </span>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
