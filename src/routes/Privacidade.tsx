import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Privacidade() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <div className="p-16">
        <h1 className="text-3xl font-bold mb-4">Política de Privacidade</h1>
        <p className="mb-4">
          Esta Política de Privacidade descreve como [Laura Porto / Psicóloga CRP: 01/28432]
         coleta, usa,armazena e protege suas informações
         pessoais quando você visita nosso site [lauraportopsi.com] ou utiliza nossos serviços.
       </p>
        <h2 className="text-2xl font-semibold mb-2">2. Informações Coletadas</h2>
        <p className="mb-4">
          2.1 Dados fornecidos voluntariamente:
•⁠  ⁠Nome completo
•⁠  ⁠E-mail
•⁠  ⁠Telefone
•⁠  ⁠Idade
•⁠  ⁠Informações sobre sua demanda psicológica (quando fornecidas em conversas ou formulários)
•⁠  ⁠Histórico de comunicações conosco
        </p>
         <p className="mb-4">
         2.2 Dados coletados automaticamente:
•⁠  ⁠Endereço IP
•⁠  ⁠Tipo de navegador e dispositivo
•⁠  ⁠Páginas visitadas em nosso site
•⁠  ⁠Tempo de permanência no site
•⁠  ⁠Origem do acesso (como chegou ao nosso site)
•⁠  ⁠Cookies e tecnologias similares

        </p>
         <p className="mb-4">
         2.3 Dados de terceiros:
•⁠  ⁠Informações provenientes de plataformas de anúncios (Google Ads, Facebook Ads)
•⁠  ⁠Dados de redes sociais (quando você interage com nossos perfis)
        </p>
        <h2 className="text-2xl font-semibold mb-2">3. Uso das Informações</h2>
        <p className="mb-4">
         3.1 Finalidades do tratamento:
•⁠  ⁠Responder às suas consultas e solicitações
•⁠  ⁠Agendar consultas e sessões
•⁠  ⁠Enviar informações sobre nossos serviços
•⁠  ⁠Melhorar nosso site e serviços
•⁠  ⁠Cumprir obrigações legais e regulamentares
•⁠  ⁠Realizar campanhas de marketing e publicidade
•⁠  ⁠Análise de dados para otimização de anúncios
        </p>
          <p className="mb-4">
         3.2 Base legal (LGPD):
•⁠  ⁠Consentimento do titular dos dados
•⁠  ⁠Execução de contrato ou procedimentos preliminares
•⁠  ⁠Legítimo interesse
•⁠  ⁠Cumprimento de obrigação legal

        </p>
        <h2 className="text-2xl font-semibold mb-2">
          4. Segurança das Informações
        </h2>
        <p className="mb-4">
          4.1 Não compartilhamos suas informações pessoais com terceiros, exceto:
•⁠  ⁠Quando necessário para prestação do serviço
•⁠  ⁠Para cumprimento de obrigações legais
•⁠  ⁠Com seu consentimento expresso
•⁠  ⁠Com prestadores de serviços que nos auxiliam (sempre com contratos de confidencialidade)

        </p>
                <p className="mb-4">
          4.2 Serviços de terceiros utilizados:
•⁠  ⁠Google Analytics (análise de tráfego)
•⁠  ⁠Google Ads (publicidade)
•⁠  ⁠Plataformas de agendamento online
•⁠  ⁠Provedores de hospedagem
•⁠  ⁠Sistemas de e-mail marketing

        </p>
        <h2 className="text-2xl font-semibold mb-2">5. Cookies</h2>
        <p className="mb-4">
        5.1 Utilizamos cookies para:
•⁠  ⁠Melhorar a experiência do usuário
•⁠  ⁠Analisar o tráfego do site
•⁠  ⁠Personalizar anúncios
•⁠  ⁠Lembrar suas preferências
        </p>
           <p className="mb-4">
        5.2 Tipos de cookies:
•⁠  ⁠Cookies essenciais: Necessários para funcionamento do site
•⁠  ⁠Cookies de desempenho: Coletam informações sobre uso do site
•⁠  ⁠Cookies de funcionalidade: Lembram suas escolhas e preferências
•⁠  ⁠Cookies de marketing: Utilizados para mostrar anúncios relevantes
        </p>
                   <p className="mb-4">
        5.3 Gerenciamento de cookies:
Você pode controlar e/ou deletar cookies conforme desejar.
Pode deletar todos os cookies já armazenados em seu computador
 e configurar a maioria dos navegadores para impedir que sejam armazenados
        </p>
        <h2 className="text-2xl font-semibold mb-2">
          Alterações nesta Política
        </h2>
        <p className="mb-4">
          Reservamo-nos o direito de atualizar ou modificar esta Política de
          Privacidade a qualquer momento. Recomendamos que você revise esta
          página periodicamente para estar ciente de quaisquer alterações. Seu
          uso contínuo do site após a publicação de alterações constitui sua
          aceitação das novas condições.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Contato</h2>
        <p className="mb-4">
          Se você tiver alguma dúvida ou preocupação sobre esta Política de
          Privacidade, entre em contato conosco através do e-mail fornecido em
          nosso site ou pela áreacontato.
        </p>
        <p className="mb-4">
          Esta Política de Privacidade é eficaz a partir da data de sua
          publicação. Agradecemos por confiar em nós com suas informações
          pessoais e estamos comprometidos em protegê-las.
        </p>
        <p className="mb-4">Última atualização: [21/07/2025]</p>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default Privacidade;
