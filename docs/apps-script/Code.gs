/**
 * Leads do site — Dra. Laura Porto
 *
 * setup()        → roda UMA vez: cria as abas "Upload" e "Leads" (formulário, hoje desligado no site).
 * setupCliques() → roda UMA vez: cria a aba "Cliques" (registro de clique no WhatsApp, desde 13/11/2026).
 * doPost()       → recebe do site:
 *                    - tipo "clique": quem veio de anúncio e clicou no WhatsApp → linha em "Cliques"
 *                    - formulário (legado): nome/telefone → linha em "Leads"
 * aoEditar()     → (acionador instalado pelo setup) quando a Laura muda o "Status" em "Cliques" ou "Leads",
 *                  grava a data e manda a conversão para a aba "Upload" (que o Google Ads importa todo dia).
 *
 * A Laura usa a aba "Cliques": chegou mensagem nova no WhatsApp → acha o clique do mesmo minuto → escolhe o Status.
 */

// ID da planilha "Conversões Offline — Laura (Google Ads)"
const PLANILHA_ID = '1uLtyYu5Aw84qvnAqFiYBSIPwEuvJsQVj3BpH96L4jQ8';
const planilha = () => SpreadsheetApp.openById(PLANILHA_ID);

const VALOR_FECHOU = 600;     // R$ por paciente fechado (mensalidade)
const VALOR_CONVERSOU = 0;    // conversa séria: sem valor, só sinal para o Google

const STATUS = ['Conversou', 'Fechou', 'Não respondeu'];

// Colunas da aba Leads (1 = A)
const COL = {
  DATA: 1, NOME: 2, WHATS: 3, EMAIL: 4, STATUS: 5,          // visíveis para a Laura
  CONVERSOU_EM: 6, FECHOU_EM: 7, GCLID: 8, GBRAID: 9,       // técnicas (ocultas)
  WBRAID: 10, PAGINA: 11, TELEFONE: 12, CONSENTIMENTO: 13,
};

// Colunas da aba Cliques (1 = A)
const COLC = {
  DATA: 1, APARELHO: 2, PAGINA: 3, STATUS: 4,                // visíveis para a Laura
  CONVERSOU_EM: 5, FECHOU_EM: 6, GCLID: 7, GBRAID: 8, WBRAID: 9, // técnicas (ocultas)
};

function setup() {
  const ss = planilha();
  ss.setSpreadsheetTimeZone('America/Sao_Paulo');

  // --- Upload (precisa ser a PRIMEIRA aba: é a que o Google Ads lê) ---
  const upload = ss.getSheetByName('Upload') || ss.insertSheet('Upload', 0);
  upload.getRange('A1:E1').setValues([[
    'Google Click ID', 'Conversion Name', 'Conversion Time', 'Conversion Value', 'Conversion Currency',
  ]]).setFontWeight('bold');
  upload.setFrozenRows(1);
  upload.getRange('C:C').setNumberFormat('@'); // horário como texto, no formato do Google

  // --- Leads (a aba da Laura) ---
  const leads = ss.getSheetByName('Leads') || ss.insertSheet('Leads', 1);
  leads.getRange(1, 1, 1, 13).setValues([[
    'Data', 'Nome', 'WhatsApp', 'E-mail', 'Status',
    'Conversou em', 'Fechou em', 'gclid', 'gbraid', 'wbraid', 'Página', 'Telefone', 'Consentimento',
  ]]).setFontWeight('bold').setBackground('#d1fae5');
  leads.setFrozenRows(1);
  leads.setColumnWidth(COL.DATA, 120);
  leads.setColumnWidth(COL.NOME, 180);
  leads.setColumnWidth(COL.WHATS, 150);
  leads.setColumnWidth(COL.EMAIL, 180);
  leads.setColumnWidth(COL.STATUS, 130);
  leads.getRange(2, COL.DATA, leads.getMaxRows() - 1, 1).setNumberFormat('dd/mm hh:mm');

  const regra = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS, true)
    .setAllowInvalid(false)
    .build();
  leads.getRange(2, COL.STATUS, leads.getMaxRows() - 1, 1).setDataValidation(regra);

  leads.hideColumns(COL.CONVERSOU_EM, COL.CONSENTIMENTO - COL.CONVERSOU_EM + 1);

  // Remove a aba vazia padrão
  ['Página1', 'Sheet1'].forEach(n => {
    const s = ss.getSheetByName(n);
    if (s && s.getLastRow() === 0) ss.deleteSheet(s);
  });

  // Acionador "ao editar" da planilha (dispara o envio quando a Laura muda o Status)
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'aoEditar')
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('aoEditar').forSpreadsheet(PLANILHA_ID).onEdit().create();

  Logger.log('Pronto! Planilha: ' + ss.getUrl());
}

/** Roda UMA vez: cria a aba "Cliques" (logo depois de "Upload"). */
function setupCliques() {
  const ss = planilha();
  const cliques = ss.getSheetByName('Cliques') || ss.insertSheet('Cliques', 1);
  cliques.getRange(1, 1, 1, 9).setValues([[
    'Data e hora do clique', 'Aparelho', 'Página', 'Status',
    'Conversou em', 'Fechou em', 'gclid', 'gbraid', 'wbraid',
  ]]).setFontWeight('bold').setBackground('#d1fae5');
  cliques.setFrozenRows(1);
  cliques.setColumnWidth(COLC.DATA, 170);
  cliques.setColumnWidth(COLC.APARELHO, 110);
  cliques.setColumnWidth(COLC.PAGINA, 110);
  cliques.setColumnWidth(COLC.STATUS, 140);
  cliques.hideColumns(COLC.CONVERSOU_EM, COLC.WBRAID - COLC.CONVERSOU_EM + 1);
  ss.setActiveSheet(cliques);
  Logger.log('Aba Cliques pronta.');
}

/** Recebe do site: clique no WhatsApp (tipo "clique") ou formulário (legado). */
function doPost(e) {
  let d;
  try {
    d = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput('invalid');
  }

  if (d.tipo === 'clique') return registrarClique(d);

  // Filtro anti-spam: campo invisível preenchido = robô; dados mínimos obrigatórios
  if (d.website || !d.nome || !d.telefone || !d.consentimento) {
    return ContentService.createTextOutput('ignored');
  }

  const nome = String(d.nome).slice(0, 120);
  const telefone = String(d.telefone).replace(/[^\d+]/g, '').slice(0, 20); // +5561999999999
  const email = String(d.email || '').slice(0, 160);
  const whatsLink = 'https://wa.me/' + telefone.replace('+', '');
  const exibicao = String(d.telefoneExibicao || telefone).slice(0, 30);

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const leads = planilha().getSheetByName('Leads');
    const row = leads.getLastRow() + 1;
    leads.getRange(row, 1, 1, 13).setValues([[
      new Date(), nome, '', email, '',
      '', '', d.gclid || '', d.gbraid || '', d.wbraid || '',
      d.pagina || '', telefone, 'Sim',
    ]]);
    // Telefone clicável: abre a conversa direto no WhatsApp
    // (link nativo da célula: funciona em qualquer idioma da planilha)
    leads.getRange(row, COL.WHATS).setRichTextValue(
      SpreadsheetApp.newRichTextValue().setText(exibicao).setLinkUrl(whatsLink).build()
    );
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput('ok');
}

/** Clique de quem veio de anúncio: linha nova no TOPO da aba Cliques (mais recente primeiro). */
function registrarClique(d) {
  const limpa = (v, n) => String(v || '').replace(/[^\w\-]/g, '').slice(0, n);
  const gclid = limpa(d.gclid, 200), gbraid = limpa(d.gbraid, 200), wbraid = limpa(d.wbraid, 200);
  if (!gclid && !gbraid && !wbraid) return ContentService.createTextOutput('ignored');

  const aparelho = d.aparelho === 'Computador' ? 'Computador' : 'Celular';
  const pagina = String(d.pagina || '/').replace(/[^\w\/\-]/g, '').slice(0, 60) || '/';

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const cliques = planilha().getSheetByName('Cliques');
    if (!cliques) return ContentService.createTextOutput('sem aba Cliques');

    // Mesmo gclid em menos de 2 min = clique repetido (dois botões, aba reaberta): não duplica
    if (cliques.getLastRow() >= 2 && gclid) {
      const topo = cliques.getRange(2, 1, 1, 9).getValues()[0];
      if (topo[COLC.GCLID - 1] === gclid && (new Date() - new Date(topo[COLC.DATA - 1])) < 2 * 60 * 1000) {
        return ContentService.createTextOutput('dup');
      }
    }

    cliques.insertRowBefore(2);
    cliques.getRange(2, 1, 1, 9).setValues([[
      new Date(), aparelho, pagina, '', '', '', gclid, gbraid, wbraid,
    ]]);
    cliques.getRange(2, 1, 1, 9).setFontWeight('normal').setBackground(null);
    cliques.getRange(2, COLC.DATA).setNumberFormat('ddd dd/mm "às" hh:mm:ss');
    cliques.getRange(2, COLC.STATUS).setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(STATUS, true).setAllowInvalid(false).build()
    );
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput('ok');
}

/** Quando a Laura muda o Status (aba Cliques ou Leads): registra a data e envia a conversão para "Upload". */
function aoEditar(e) {
  const sheet = e.range.getSheet();
  const nome = sheet.getName();
  const C = nome === 'Cliques' ? COLC : nome === 'Leads' ? COL : null;
  if (!C || e.range.getColumn() !== C.STATUS || e.range.getRow() < 2) return;

  const row = e.range.getRow();
  const status = e.range.getValue();
  const agora = new Date();

  let colData, nomeConversao, valor;
  if (status === 'Conversou') {
    colData = C.CONVERSOU_EM; nomeConversao = 'Lead Qualificado'; valor = VALOR_CONVERSOU;
  } else if (status === 'Fechou') {
    colData = C.FECHOU_EM; nomeConversao = 'Paciente Fechou'; valor = VALOR_FECHOU;
  } else {
    return; // "Não respondeu" ou vazio: nada a enviar
  }

  // Só registra uma vez por tipo (se ela mudar e voltar, não duplica)
  if (sheet.getRange(row, colData).getValue()) return;
  sheet.getRange(row, colData).setValue(agora);

  const gclid = sheet.getRange(row, C.GCLID).getValue();
  if (!gclid) return; // lead que não veio do Google Ads: fica só na planilha

  const horario = Utilities.formatDate(agora, 'America/Sao_Paulo', "yyyy-MM-dd HH:mm:ss") + '-03:00';
  e.source.getSheetByName('Upload').appendRow([gclid, nomeConversao, horario, valor, 'BRL']);
}
