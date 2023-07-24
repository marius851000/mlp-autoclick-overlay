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

const version = 2;
const min_version_url = "https://raw.githubusercontent.com/marius851000/mlp-autoclick-overlay/main/min_version.txt";
var placed_pixel = 0;

function gm_fetch(request, res, rej) {
    request.onload = res;
    request.onerror = rej;
    request.onabort = rej;
    request.ontimeout = rej;
    GM.xmlHttpRequest(request);
}

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
        placing_pixel = true;
        setTimeout(() => {
            placing_pixel = false;
        }, 11000); // it might take some times for the template to change
        return;
    }

    let progressElement = document.getElementsByTagName("mlpminimap")[0].querySelector("div[data-id='pixelDisplayProgress']");
    let progressText = progressElement.querySelector("span").textContent;
    const progressMatch = progressText.match(/(\d+(?:\.\d+))[\w\d\s\n]+%[\w\d\s\n]+\((\d+)\/(\d+)\)/)
    if( !progressMatch ) {
        console.log("could not detect current progress, retrying...");
        return;
    }
    const currentProgress = parseFloat(progressMatch[1]);
    if( currentProgress >= 99 ) {
        console.log("current progress above 99%, retrying...");
        return;
    }

    let statuspill = document.getElementsByTagName("garlic-bread-embed")[0].shadowRoot.querySelector("garlic-bread-status-pill");
    console.log(statuspill);
    let nexttilein = statuspill.attributes["next-tile-available-in"];
    console.log(nexttilein)

    if (nexttilein == undefined || nexttilein.value == "0") {
        console.log("checking for update...");
        placing_pixel = true;
        
        gm_fetch({
            method: "GET",
            url: min_version_url
        }, (res) => {
            let min_version = parseInt(res.responseText);
            if (min_version > version) {
                var waitTime = 10 * 1000;
                if (placed_pixel == 0) {
                    waitTime = 50 * 1000;
                }
                console.log("Outdated version of autoclicker detected. Reloading the page in " + waitTime + " milliseconds...");

                setTimeout(() => {
                    console.log("actually reloading...")
                    location.reload();
                }, waitTime);
                return;
            }
            console.log("placing pixel...");
            let placebutton = statuspill.shadowRoot.querySelector("button");
            placebutton.click();
            
            setTimeout(() => {
                let colorpicker = document.getElementsByTagName("garlic-bread-embed")[0].shadowRoot.querySelector("garlic-bread-color-picker");
                let autopickbutton = colorpicker.shadowRoot.querySelector(".actions").children[2];
                autopickbutton.click();
                placed_pixel += 1;
                setTimeout(() => {
                    let placebuttonfinal = colorpicker.shadowRoot.querySelector(".actions").children[1];
                    console.log("placebutton");
                    placebuttonfinal.click();
                    placing_pixel = false;
                }, 5000);
            }, 2000);
        },
        (rej) => {
            console.log("Failed to fetch whether update are available. Doing nothing");
            placing_pixel = false;
        });
    }
}

setInterval(try_place, 5000);