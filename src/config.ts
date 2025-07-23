export const whatsapp = (message: string = "Olá, quero marcar uma consulta. Quais horários estão disponíveis?") => {
  const codPais = '55';
  const ddd = '61';
  const telefone = '999914224';
  const telefoneCompleto = codPais + ddd + telefone;
  return `https://wa.me/${telefoneCompleto}?text=${encodeURIComponent(message)}`
};