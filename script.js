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

var placing_pixel = false;

function try_place() {
    if (placing_pixel) {
        return;
    }
    console.log("place attempt");
    let templateNameElement = document.getElementsByTagName("mlpminimap")[0].querySelector("div[data-id='templateName']");
    let currentTemplateName = templateNameElement.querySelector("span").textContent;

    if (currentTemplateName != "mlp") {
        console.log("current template is " + currentTemplateName + ", changing...");
        templateNameElement.click();
        return;
    }

    let progressElement = document.getElementsByTagName("mlpminimap")[0].querySelector("div[data-id='pixelDisplayProgress']");
    let progressText = progressElement.querySelector("span").textContent;
    console.log(progressText)
    if (progressText.includes("NaN")) {
        return;
    }
    if (progressText.includes("100") || progressText.includes("99") || progressText.includes("98") || progressText.includes("97") || progressText.includes("96") || progressText.includes("95")) {
        return;
    }
    let statuspill = document.getElementsByTagName("garlic-bread-embed")[0].shadowRoot.querySelector("garlic-bread-status-pill");
    console.log(statuspill);
    let nexttilein = statuspill.attributes["next-tile-available-in"];
    console.log(nexttilein)

    if (nexttilein == undefined || nexttilein.value == "0") {
        console.log("placing pixel...");
        let placebutton = statuspill.shadowRoot.querySelector("button");
        placebutton.click();
        placing_pixel = true;
        setTimeout(() => {
            let colorpicker = document.getElementsByTagName("garlic-bread-embed")[0].shadowRoot.querySelector("garlic-bread-color-picker");
            let autopickbutton = colorpicker.shadowRoot.querySelector(".actions").children[2];
            autopickbutton.click();
            setTimeout(() => {
                let placebuttonfinal = colorpicker.shadowRoot.querySelector(".actions").children[1];
                console.log("placebutton");
                placebuttonfinal.click();
                placing_pixel = false;
            }, 5000);
        }, 2000);
    }
}

setInterval(try_place, 5000);