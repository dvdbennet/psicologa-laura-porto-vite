# Redesign 3D — psilauraporto.com

Objetivo: elevar o site a nível Awwwards **sem perder conversão**. Toda decisão visual
é julgada por uma pergunta: isso aumenta ou atrapalha o clique no WhatsApp no celular?

## Fixos (não mudam)
- GA4 `G-W6LDDTYJDZ` e GTM `GTM-PKJ2NX3H` no `index.html`.
- Evento `dataLayer.push({ event: "whatsapp_click", click_location })` em todo botão de WhatsApp.
- `whatsappTracking.ts` (gclid/gbraid/wbraid, 90 dias).
- Rotas `/`, `/exterior`, `/adolescente`, `/brasilia`, `/privacidade`, `/termos` e o SEO por rota.
- Depoimentos, dados de contato, formação, CRP e números (conteúdo real, nada inventado). Copy persuasiva reescrita em 2026-11-26 a pedido do usuário: toca na dor e chama para ação, sem prometer resultado (Código de Ética do Psicólogo, art. 20).

## Direção
- **Conceito "respiro"**: uma forma orgânica 3D (Three.js, shader próprio) que respira num
  ciclo lento atrás da foto da Laura. Reage a toque/arraste, à inclinação do celular
  (giroscópio, quando o navegador permite) e à rolagem.
- **Paleta A — verde refinado** (escolhida em 2026-11-26): fundo `#F4F8F6`, tinta `#0F2A22`,
  texto secundário `#4A6159`, marca `#0E8A6A`, menta `#7FE0C2` / `#2BB39A` / `#CFEFE4`.
- **Tipografia**: Young Serif (títulos — serifada calorosa, de traço "feito à mão", passa
  acolhimento sem cara de clínica) + Onest (texto — legível em tela pequena, sem cara de template).

## Hero (mobile primeiro)
- Foto em arco, forma 3D atrás vazando pelas bordas.
- Em 390×844 e 375×667: nome/selo, título, 1 frase e **botão do WhatsApp sem rolar**.
- Linha de confiança: 400+ pacientes · adultos e adolescentes · online todo o Brasil.
- Desktop: duas colunas, arco com inclinação 3D seguindo o mouse, botão magnético.

## Conversão no celular
- Barra fixa "Agendar no WhatsApp" no rodapé assim que o botão do hero sai da tela
  (`click_location: "sticky_bar_mobile"`). No desktop continua o botão flutuante.
- Touch targets ≥ 48px. Nada de hover como única forma de revelar informação.

## Motion
- Lenis (rolagem suave no desktop; no celular mantém a rolagem nativa). Animações com Framer Motion (useScroll/whileInView); GSAP foi descartado por não ser necessário.
- Títulos revelados por linha com máscara, parallax interno nas fotos,
  depoimentos em trilho arrastável.
- `prefers-reduced-motion` e aparelhos fracos: forma 3D vira imagem estática, sem scroll suave.

## Performance (pesa no Índice de Qualidade do Google Ads)
- A foto do hero é o LCP: `fetchpriority="high"`, WebP com `srcset`.
- Three.js carregado só depois da primeira pintura (import dinâmico) e pausado fora da tela.
- Meta: LCP < 2,5 s em 4G.

## Etapas
1. ✅ Base no branch `redesign-exterior-brasilia` + ajustes de rastreamento da SITE-MELHORADO.
2. ✅ Paleta escolhida (A).
3. ✅ Tema global (cores, fontes) + hero 3D da Home + barra fixa mobile → **esboço para aprovação**.
4. ✅ Seções da Home (Serviços, Sobre, Benefícios, Abordagem, Depoimentos, FAQ, Contato) com motion.
5. ✅ Mesmo tratamento nos heros e seções de `/exterior`, `/adolescente`, `/brasilia` (hero único configurável; Serviços, Sobre, Benefícios e FAQ reaproveitados).
6. Verificação: celular 375/390, laptop baixo (~650px), Lighthouse, eventos no dataLayer.
