import { createI18n } from "vue-i18n";

const messages = {
  en: {
    viewDetails: "View Details",
    name: "Name",
    id: "ID",
    allTypes: "All Types",
  },
  pt: {
    viewDetails: "Ver Detalhes",
    name: "Nome",
    id: "ID",
    allTypes: "Todos os Tipos",
  },
  es: {
    viewDetails: "Ver Detalles",
    name: "Nombre",
    id: "ID",
    allTypes: "Todos los Tipos",
  },
};

const i18n = createI18n({
  legacy: false, // permite usar Composition API (setup)
  locale: "pt",
  fallbackLocale: "en",
  messages,
});

export default i18n;
