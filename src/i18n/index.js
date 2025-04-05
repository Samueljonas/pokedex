import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
  en: {
    name: "Name",
    id: "ID",
    allTypes: "All Types",
    viewDetails: "View Details",
  },
  pt: {
    name: "Nome",
    id: "ID",
    allTypes: "Todos os Tipos",
    viewDetails: "Ver Detalhes",
  },
  es: {
    name: "Nombre",
    id: "ID",
    allTypes: "Todos los Tipos",
    viewDetails: "Ver Detalles",
  },
};

export default new VueI18n({
  locale: "pt",
  fallbackLocale: "en",
  messages,
});
