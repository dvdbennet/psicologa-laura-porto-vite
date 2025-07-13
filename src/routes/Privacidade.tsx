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
          Esta Política de Privacidade descreve como coletamos, usamos e
          protegemos suas informações pessoais ao acessar e utilizar nosso site.
          Ao usar nosso site, você concorda com a coleta e uso de informações de
          acordo com esta política.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Informações Coletadas</h2>
        <p className="mb-4">
          Coletamos informações pessoais identificáveis, como nome, e-mail e
          outras informações que você nos fornece voluntariamente ao se
          registrar ou entrar em contato conosco. Também coletamos informações
          não pessoais, como dados de navegação e uso do site, para melhorar
          nossos serviços.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Uso das Informações</h2>
        <p className="mb-4">
          As informações coletadas são usadas para fornecer, manter e melhorar
          nossos serviços, personalizar sua experiência no site, responder a
          solicitações e enviar comunicações relacionadas ao serviço. Não
          vendemos ou alugamos suas informações pessoais a terceiros sem o seu
          consentimento, exceto quando exigido por lei.
        </p>
        <h2 className="text-2xl font-semibold mb-2">
          Segurança das Informações
        </h2>
        <p className="mb-4">
          Implementamos medidas de segurança adequadas para proteger suas
          informações pessoais contra acesso não autorizado, divulgação,
          alteração ou destruição. No entanto, nenhuma transmissão de dados pela
          internet é completamente segura, e não podemos garantir a segurança
          absoluta de suas informações.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
        <p className="mb-4">
          Nosso site pode usar cookies e tecnologias semelhantes para melhorar a
          experiência do usuário. Os cookies são pequenos arquivos de texto
          armazenados no seu dispositivo que ajudam a lembrar suas preferências
          e atividades no site. Você pode optar por desativar os cookies nas
          configurações do seu navegador, mas isso pode afetar a funcionalidade
          do site.
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
          nosso site ou pelo formulário de contato.
        </p>
        <p className="mb-4">
          Esta Política de Privacidade é eficaz a partir da data de sua
          publicação. Agradecemos por confiar em nós com suas informações
          pessoais e estamos comprometidos em protegê-las.
        </p>
        <p className="mb-4">Última atualização: [Data da última atualização]</p>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default Privacidade;
