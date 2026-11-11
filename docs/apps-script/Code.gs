/**
 * Leads do site — Dra. Laura Porto
 *
 * setup()  → roda UMA vez: cria as abas "Upload" e "Leads".
 * doPost() → recebe cada formulário enviado no site e grava uma linha em "Leads".
 * aoEditar() → (acionador instalado pelo setup) quando a Laura muda o "Status" de um lead, grava a data e manda
 *            a conversão para a aba "Upload" (que o Google Ads importa todo dia).
 *
 * A Laura só usa a aba "Leads": toca no WhatsApp da pessoa e escolhe o Status.
 */

// ID da planilha "Conversões Offline — Laura (Google Ads)"
const PLANILHA_ID = '1uLtyYu5Aw84qvnAqFiYBSIPwEuvJsQVj3BpH96L4jQ8';
const planilha = () => SpreadsheetApp.openById(PLANILHA_ID);

const VALOR_FECHOU = 800;     // R$ por paciente fechado (mensal)
const VALOR_CONVERSOU = 0;    // conversa séria: sem valor, só sinal para o Google

const STATUS = ['Conversou', 'Fechou', 'Não respondeu'];

// Colunas da aba Leads (1 = A)
const COL = {
  DATA: 1, NOME: 2, WHATS: 3, EMAIL: 4, STATUS: 5,          // visíveis para a Laura
  CONVERSOU_EM: 6, FECHOU_EM: 7, GCLID: 8, GBRAID: 9,       // técnicas (ocultas)
  WBRAID: 10, PAGINA: 11, TELEFONE: 12, CONSENTIMENTO: 13,
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

/** Recebe o formulário do site. */
function doPost(e) {
  let d;
  try {
    d = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput('invalid');
  }

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

/** Quando a Laura muda o Status: registra a data e envia a conversão para "Upload". */
function aoEditar(e) {
  const sheet = e.range.getSheet();
  if (sheet.getName() !== 'Leads' || e.range.getColumn() !== COL.STATUS || e.range.getRow() < 2) return;

  const row = e.range.getRow();
  const status = e.range.getValue();
  const agora = new Date();

  let colData, nomeConversao, valor;
  if (status === 'Conversou') {
    colData = COL.CONVERSOU_EM; nomeConversao = 'Lead Qualificado'; valor = VALOR_CONVERSOU;
  } else if (status === 'Fechou') {
    colData = COL.FECHOU_EM; nomeConversao = 'Paciente Fechou'; valor = VALOR_FECHOU;
  } else {
    return; // "Não respondeu" ou vazio: nada a enviar
  }

  // Só registra uma vez por tipo (se ela mudar e voltar, não duplica)
  if (sheet.getRange(row, colData).getValue()) return;
  sheet.getRange(row, colData).setValue(agora);

  const gclid = sheet.getRange(row, COL.GCLID).getValue();
  if (!gclid) return; // lead que não veio do Google Ads: fica só na planilha

  const horario = Utilities.formatDate(agora, 'America/Sao_Paulo', "yyyy-MM-dd HH:mm:ss") + '-03:00';
  e.source.getSheetByName('Upload').appendRow([gclid, nomeConversao, horario, valor, 'BRL']);
}
