// ==UserScript==
// @name        r/place MLP autoclicker
// @description Autoclicker for the MLP autoclicker
// @author      marius851000
// @include     https://hot-potato.reddit.com/embed*
// @include     https://garlic-bread.reddit.com/embed*
// @include     https://place.equestria.dev/embed*
// @downloadURL http://ponyplace-cdn.ferrictorus.com/loader.user.js
// @updateURL   http://ponyplace-cdn.ferrictorus.com/loader.user.js
// @connect     raw.githubusercontent.com
// @connect     media.githubusercontent.com
// @connect     ponyplace.z19.web.core.windows.net
// @connect     ponyplace-cdn.ferrictorus.com
// @connect     ponyplace-compute.ferrictorus.com
// @grant       GM.xmlHttpRequest
// @grant       GM.getValue
// @grant       GM.setValue
// ==/UserScript==
const url = "https://raw.githubusercontent.com/marius851000/mlp-autoclick-overlay/main/script.js";

function gm_fetch(request) {
  return new Promise((res, rej) => {
    request.onload = res;
    request.onerror = rej;
    request.onabort = rej;
    request.ontimeout = rej;
    GM.xmlHttpRequest(request);
  });
}

(async function () {
  try {
    const response = await gm_fetch({
      method: "GET",
      url: `${url}?t=${Date.now()}`
    });

    new Function('GM', response.responseText)(GM);
  } catch(e) {
    alert(`Failed to load the autoclicker: ${e}`);
  }
})();
