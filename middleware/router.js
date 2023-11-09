// const languages = ['de', 'en']
const defaultLanguage = "de";

export default function ({ app, route, store, isDev, redirect }) {
  const version = route.query._storyblok || isDev ? "draft" : "published";
  const language = defaultLanguage;

  let auth;
  let lang = Promise.resolve();

  if (process.server) {
    store.commit("setCacheVersion", app.$storyapi.cacheVersion);
  }

  if (process.client) {
    if (
      !store.state.auth ||
      store.state.auth.exp > (new Date() - 30000) / 1000
    ) {
      auth = store.dispatch("checkAuth");
    }
  }

  if (!store.state.settings._uid || language !== store.state.language) {
    store.commit("setLanguage", language);
    lang = store.dispatch("loadSettings", {
      version: version,
      language: language,
    });
  }

  return Promise.all([auth, lang]);
}
