import React from 'react';
import { AlertTriangle, Shield, FileText } from 'lucide-react';

const ComplianceNotice = () => {
  return (
    <section className="py-12 bg-yellow-50 border-t border-yellow-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <AlertTriangle className="text-yellow-600 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Informações Importantes e Regulamentações
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Shield className="text-emerald-600 mb-4" size={32} />
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Registro Profissional
            </h3>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>• CRP 06/123456</li>
              <li>• Conselho Regional de Psicologia de São Paulo</li>
              <li>• Formação: Psicologia - USP</li>
              <li>• Especialização em Psicologia Clínica</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <FileText className="text-blue-600 mb-4" size={32} />
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Avisos Legais
            </h3>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>• Este site é apenas informativo</li>
              <li>• Não substitui consulta presencial</li>
              <li>• Resultados podem variar</li>
              <li>• Em emergências, procure atendimento médico</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <AlertTriangle className="text-red-600 mb-4" size={32} />
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Emergências
            </h3>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>• SAMU: 192</li>
              <li>• Bombeiros: 193</li>
              <li>• CVV: 188 (24h)</li>
              <li>• Em caso de risco, procure atendimento imediato</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Conformidade com Regulamentações Brasileiras
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
            <div>
              <h4 className="font-medium text-slate-800 mb-2">Código de Ética Profissional:</h4>
              <p>
                Todos os atendimentos seguem rigorosamente o Código de Ética Profissional 
                do Psicólogo, estabelecido pelo Conselho Federal de Psicologia (CFP).
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-2">LGPD - Lei Geral de Proteção de Dados:</h4>
              <p>
                Seus dados pessoais são protegidos conforme a LGPD. Utilizamos apenas 
                as informações necessárias para o atendimento psicológico.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-2">Resolução CFP nº 011/2018:</h4>
              <p>
                Atendimentos online seguem as diretrizes do CFP para prestação de 
                serviços psicológicos por meio de tecnologias da informação.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-2">Sigilo Profissional:</h4>
              <p>
                Garantia absoluta de sigilo profissional conforme Art. 9º do 
                Código de Ética Profissional do Psicólogo.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          <p>
            Este website está em conformidade com as diretrizes do Google Ads para anúncios 
            de serviços de saúde no Brasil e regulamentações do Conselho Federal de Psicologia.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComplianceNotice;