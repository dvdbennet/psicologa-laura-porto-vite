import { whatsapp } from "@/config";
import React from "react";

const WhatsAppContext = React.createContext<{ whatsappLink: string }>({
  whatsappLink: "",
});

export default function WhatsAppProvider({
  children,
  message,
}: {
  children: React.ReactNode;
  message?: string;
}) {
  const whatsappLink = whatsapp(message);

  return (
    <WhatsAppContext.Provider value={{ whatsappLink }}>
      {children}
    </WhatsAppContext.Provider>
  );
}

export function useWhatsApp() {
  const context = React.useContext(WhatsAppContext);
  if (!context) {
    throw new Error(
      "useWhatsApp must be used within a WhatsAppProvider. Wrap your component tree with WhatsAppProvider.",
    );
  }
  return context.whatsappLink;
}
