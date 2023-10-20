import jwtDecode from "jwt-decode";
import Cookie from "js-cookie";

export const setToken = (token) => {
  if (process.SERVER_BUILD) return;
  window.localStorage.setItem("token", token);
  window.localStorage.setItem("auth", JSON.stringify(jwtDecode(token)));
  Cookie.set("jwt", token);
};

export const unsetToken = () => {
  if (process.SERVER_BUILD) return;
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("auth");
  Cookie.remove("jwt");
};

export const getUserFromLocalStorage = () => {
  const token = window.localStorage.token;
  return token || undefined;
};
export function handler(token, context, callback) {
  let origin;
  let jwksUri;
  switch (process.env.NUXT_ENV_ENVIRONMENT) {
    case "local":
    case "develop":
      jwksUri = `${process.env.NUXT_ENV_AUTH0_URL_DEVELOP}/.well-known/jwks.json`;
      origin = process.env.NUXT_ENV_ORIGIN_DEVELOP;
      break;
    case "staging":
      jwksUri = `${process.env.NUXT_ENV_AUTH0_URL_STAGING}/.well-known/jwks.json`;
      origin = process.env.NUXT_ENV_ORIGIN_STAGING;
      break;
    default:
      jwksUri = `${process.env.NUXT_ENV_AUTH0_URL}/.well-known/jwks.json`;
      origin = process.env.NUXT_ENV_ORIGIN;
  }

  const jwt = require("jsonwebtoken");
  const axios = require("axios");

  jwt.verify(token, getKey, { algorithms: ["RS256"] }, function (err, decoded) {
    if (!err) {
      const email = decoded[origin + "/email"];
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(email),
      });
    } else {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: "ERROR",
      });
    }
  });
  function getKey(header, callback) {
    const kid = header.kid;
    axios
      .get(jwksUri)
      .then((response) => {
        const keys = response.data.keys;
        const signingKey = keys.find((key) => key.kid === kid);

        if (signingKey) {
          const publicKey = signingKey.x5c[0];
          const cert = `-----BEGIN CERTIFICATE-----\n${publicKey}\n-----END CERTIFICATE-----`;
          callback(null, cert);
        } else {
          console.error("Key not found");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch JWKS:", error);
      });
  }
}
