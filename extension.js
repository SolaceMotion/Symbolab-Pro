var code = `window.onload = function(){
    /* set subscription parameters */
    if (typeof(SYSTEPS) != 'undefined') { SYSTEPS.subscribed = true };
    if (typeof(SOLUTIONS) != 'undefined') { SOLUTIONS.subscribed = true };
    if (typeof(SYMBOLAB) != 'undefined') { SYMBOLAB.params.subscribed = true };
    isUserLoggedIn = function() { return true; }

    /* removes popup when verify solution box is clicked */
    if ($("#click-capture")) {
        $("#click-capture").addClass("click-capture-subscribed");
    }

    /* improvements to dark mode */
    fixDarkMode = function() {
        if($("#invert-style").length > 0) {
            var invertStyle = $("#invert-style")[0].innerHTML;
            $("#invert-style")[0].remove();
            document.head.insertAdjacentHTML("beforeend",
                \`<style type='text/css' id="invert-style">\`+
                invertStyle+\`
                img,
                #HomeTopNav svg,
                button.btn.btn-large.btn-custom.search, 
                button.verify-button,
                li#solutionsTopNav a span,
                span.bloggerIcon,
                a.show-hide-button.show-hide-plot.print-hide,
                a.stepsPracticeLink span,
                .m2u>li>a.active,
                .m3u>li>a.active,
                li a.nl-leftMenu span,
                .nl-feedback.nl-redText.print-hide span {
                    filter: invert(1);
                }

                img.open,
                img.close,
                ul.solution-examples li svg,
                a.nl-leftMenu.active span {
                    filter: invert(0);
                }

                button.btn.btn-large.btn-custom.search {
                    border: 1px solid black;
                }
    
                div#nl-subNav {
                    background-color: rgba(220, 220, 220, 1);
                }
    
                a.nl-topMenu span,
                a.nl-topMenu.active .nl-topSubMenu span,
                #nl-subNav ul li .nl-topSubMenu a:hover span {
                    color: #000000;
                }
    
                a.nl-topMenu.active span,
                #nl-subNav ul li a:hover span {
                    color: #ffffff;
                }</style>\`);
        }
    };
    
    fixDarkMode();

    /* overwrite toggle function to fix dark mode at end */
    lightsOut = function() {
        var a = getInverseCookieValue();
        if (a === "true") {
            createInvertCookie("false");
            liveToggleInvert(false);
            symbolab_log(getProductByUrl(), "LightsOn", null)
        } else {
            createInvertCookie("true");
            liveToggleInvert(true);
            symbolab_log(getProductByUrl(), "LightsOut", null)
        }
        fixDarkMode();    
    };
}`;

document.documentElement.setAttribute('onreset', code);
document.documentElement.dispatchEvent(new CustomEvent('reset'));
document.documentElement.removeAttribute('onreset');