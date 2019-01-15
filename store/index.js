import Vuex from 'vuex';
import auth0 from 'auth0-js';
import { setToken, unsetToken, getUserFromLocalStorage } from '~/utils/auth';
import axios from 'axios';

const origin = process.client ? window.location.origin : process.env.ORIGIN;

let webAuth = new auth0.WebAuth({
  domain:       'auth.grandgarage.eu',
  clientID:     'lwqb_LrkbU8b2rHfbC05C87xqM4bSfms',
  responseType: 'token id_token',
  redirectUri:  origin + '/auth'
});

let version = 'draft';

const createStore = () => {
  return new Vuex.Store({
    state: {
      cacheVersion: '',
      debug: '',
      language: 'de',
      sidebar: null,
      settings: {},
      user: null,
      auth: null,
      packages: null,
      trainings: null,
    },
    mutations: {
      setAuth(state, auth) {
        state.auth = auth;
      },
      setUser (state, user) {
        state.user = user;
      },
      setPackages (state, p) {
        state.p = p;
      },
      setSettings (state, settings) {
        state.settings = settings;
      },
      setLanguage (state, language) {
        state.language = language;
      },
      setCacheVersion (state, version) {
        state.cacheVersion = version;
      }
    },
    actions: {
      nuxtServerInit({ state }, context) {
        /*
        if (!context.isDev) {
          let p = axios.get(`${origin}/.netlify/functions/getPackages`).then(r => r.data);
          let t = axios.get(`${origin}/.netlify/functions/getTrainings`).then(r => r.data);
          return Promise.all([p, t]).then(([packages, trainings]) => {
            commit('setPackages', packages);
            commit('setTrainings', trainings);
          });
        }
        */
      },
      init({ state }) {
        if (state.auth && !state.user) {
          return dispatch('getUser');
        }
      },
      getUser({ state, commit }) {
        return axios.get(`${origin}/.netlify/functions/getUser`).then((r) => {
          commit('setUser', r.data);
        }).catch((err) => {
          console.log(err);
        });
      },
      checkAuth({ commit, dispatch, state }) {
        if (state.auth || getUserFromLocalStorage()) {
          // renew Token
          return new Promise((resolve, reject) => {
            webAuth.checkSession({}, function (err, authResult) {
              if (err) return reject(err);
              if (authResult && authResult.accessToken) {
                //set auth
                let auth = {
                  accessToken: authResult.accessToken,
                }
                setToken(authResult.accessToken);
                commit('setAuth', auth);
                resolve();
              }
            });
          });
        }
      },
      auth({ commit }, { hash }) {
        return new Promise((resolve, reject) => {
          webAuth.parseHash({ hash }, function(err, authResult) {
            if (err) {
              return reject(err);
            }

            //set auth
            let auth = {
              accessToken: authResult.accessToken,
            }
            setToken(authResult.accessToken);
            resolve();
          });
        });
      },
      logout({ commit }) {
        commit('setAuth', null)
        unsetToken();
      },
      loginUser({ commit }, context) {
        return new Promise((resolve, reject) => {
          webAuth.login({
            connection: 'Username-Password-Authentication',
            email: context.email,
            password: context.password,
          }, function (err, r) {
            if (err) reject(err);
            resolve(r);
          });
        });
      },
      registerUser({ commit }, context) {
        return new Promise((resolve, reject) => {
          webAuth.signup({
            connection: 'Username-Password-Authentication',
            email: context.email,
            password: context.password,
            user_metadata: context.user_metadata,
          }, function (err, r) {
            if (err) reject(err);
            resolve(r);
          });
        });
      },
      setSidebar({state}, value) {
        state.sidebar = value;
      },
      loadTags ({state}) {
        return this.$storyapi.get(`cdn/tags`, {
        }).then((res) => {
          return res.data.tags;
        });
      },
      loadTeam ({state}) {
        return this.$storyapi.get(`cdn/stories`, {
          filter_query: {
            'component': {
              'in': 'team-member'
            }
          },
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data;
        });
      },
      loadFullPage ({state}, path) {
        return this.$storyapi.get(`cdn/stories${path}`, {
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data;
        })
      },
      loadPage ({state}, path) {
        if (!path) {
          path = '/';
        }

        return this.$storyapi.get(`cdn/stories/${state.language}${path}`, {
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data;
        })
      },
      loadMachineItem ({state}, slug) {
        let endpoint = `cdn/stories/${state.language}/machines/${slug}`;
        return this.$storyapi.get(endpoint, {
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data;
        }).catch((res) => {
          console.log(res);
        });
      },
      loadWorkshopItem ({state}, slug) {
        let endpoint = `cdn/stories/${state.language}/workshops/${slug}`;
        return this.$storyapi.get(endpoint, {
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data;
        }).catch((res) => {
          console.log(res);
        });
      },
      findMachines ({state}, filters) {
        return this.$storyapi.get(`cdn/stories`, {
          ...filters,
          version: version,
          cv: state.cacheVersion,
        }).then((res) => {
          return res.data;
        }).catch((res) => {
          console.log(res);
        });
      },
      findWorkshops ({state}, filters) {
        return this.$storyapi.get(`cdn/stories`, {
          ...filters,
          version: version,
          cv: state.cacheVersion,
        }).then((res) => {
          return res.data;
        }).catch((res) => {
          console.log(res);
        });
      },
      loadNewsItem ({state}, slug) {
        let endpoint = `cdn/stories/${state.language}/news/${slug}`;
        return this.$storyapi.get(endpoint, {
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data;
        }).catch((res) => {
          console.log(res);
        });
      },
      findNews ({state}, filters) {
        return this.$storyapi.get('cdn/stories', {
          filter_query: filters.filter_query,
          version: version,
          cv: state.cacheVersion,
          starts_with: `${state.language}/news`,
        }).then((res) => {
          return res.data;
        }).catch((res) => {
          console.log(res);
        });
      },
      loadSitemap ({ state, commit }) {
        return this.$storyapi.get('cdn/links', {
          version: version,
          cv: state.cacheVersion,
          starts_with: state.language,
        }).then((res) => {
          return res.data
        }).catch((res) => {
          console.log(res);
        })
      },
      loadSettings ({ state, commit }, context) {
        return this.$storyapi.get(`cdn/stories/${context.language}/settings`, {
          version: version,
        }).then((res) => {
          commit('setSettings', res.data.story.content)
        }).catch((e) => {
          console.log(e);
        });
      },
    }
  })
}

export default createStore
