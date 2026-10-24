import { AlertTriangle, FileText, Shield } from "lucide-react";

const ComplianceNotice = () => {
  return (
    <section className="py-16 bg-white border-t border-ink-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="text-amber-600" size={22} />
          </div>
          <h2 className="text-xl font-semibold text-ink-900">
            Informações Importantes e Regulamentações
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-50 rounded-2xl p-6">
            <Shield className="text-emerald-600 mb-4" size={26} />
            <h3 className="text-sm font-semibold text-ink-900 mb-3">
              Registro Profissional
            </h3>
            <ul className="text-sm text-ink-500 space-y-1.5">
              <li>• CRP 01/28432</li>
              <li>• Conselho Regional de Psicologia do Distrito Federal</li>
              <li>• Formação: Psicologia - UniCEUB</li>
            </ul>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6">
            <FileText className="text-blue-600 mb-4" size={26} />
            <h3 className="text-sm font-semibold text-ink-900 mb-3">
              Avisos Legais
            </h3>
            <ul className="text-sm text-ink-500 space-y-1.5">
              <li>• Este site é apenas informativo</li>
              <li>• Não substitui consulta</li>
              <li>• Resultados podem variar</li>
              <li>• Em emergências, procure atendimento médico</li>
            </ul>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6">
            <AlertTriangle className="text-red-600 mb-4" size={26} />
            <h3 className="text-sm font-semibold text-ink-900 mb-3">
              Emergências
            </h3>
            <ul className="text-sm text-ink-500 space-y-1.5">
              <li>• SAMU: 192</li>
              <li>• Bombeiros: 193</li>
              <li>• CVV: 188 (24h)</li>
              <li>• Em caso de risco, procure atendimento imediato</li>
            </ul>
          </div>
        </div>

        <div className="mt-5 bg-slate-50 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-ink-900 mb-4">
            Conformidade com Regulamentações Brasileiras
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-ink-500">
            <div>
              <h4 className="font-medium text-ink-800 mb-1.5">
                Código de Ética Profissional:
              </h4>
              <p>
                Todos os atendimentos seguem rigorosamente o Código de Ética
                Profissional do Psicólogo, estabelecido pelo Conselho Federal
                de Psicologia (CFP).
              </p>
            </div>
            <div>
              <h4 className="font-medium text-ink-800 mb-1.5">
                LGPD - Lei Geral de Proteção de Dados:
              </h4>
              <p>
                Seus dados pessoais são protegidos conforme a LGPD.
                Utilizamos apenas as informações necessárias para o
                atendimento psicológico.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-ink-800 mb-1.5">
                Resolução CFP nº 011/2018:
              </h4>
              <p>
                Atendimentos online seguem as diretrizes do CFP para
                prestação de serviços psicológicos por meio de tecnologias da
                informação.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-ink-800 mb-1.5">
                Sigilo Profissional:
              </h4>
              <p>
                Garantia absoluta de sigilo profissional conforme Art. 9º do
                Código de Ética Profissional do Psicólogo.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ink-400">
          Este website está em conformidade com as diretrizes do Google Ads
          para anúncios de serviços de saúde no Brasil e regulamentações do
          Conselho Federal de Psicologia.
        </p>
      </div>
    </section>
  );
};

export default ComplianceNotice;
