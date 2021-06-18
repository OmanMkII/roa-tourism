document.addEventListener("readystatechange", (event) => {

    // Sends a HEAD request to a filepath, returns true if the file exists
    function fileExists(filepath) {
        let req = new XMLHttpRequest();
        req.open('HEAD', filepath, false); // only care about the response
        req.send();
        return req.status === 200;
    }

    // variables for dark mode
    var theme;
    var darkMode;

    // modularity for dark/light modes
    function assignDarkMode(imgPath, cssPath, darkModeText, mainLogo, navLogo, imgLogo) {
        if (darkMode === "true") {
            setLightMode(imgPath, cssPath, darkModeText,
                mainLogo, navLogo, imgLogo);
            darkMode = "false";
        } else {
            setDarkMode(imgPath, cssPath, darkModeText,
                mainLogo, navLogo, imgLogo);
            darkMode = "true";
        }
    }
    function setDarkMode(imgPath, cssPath, darkModeText, mainLogo, navLogo, imgLogo) {
        // set page style and switch
        theme.setAttribute("href", cssPath + "style_dark.css");
        // darkMode = "true";
        darkModeText[0].textContent = "Light Mode"
        darkModeText[1].textContent = "Light Mode"
        // set logo styles (shadow for better contrast)
        mainLogo.src = imgPath + "website_title_shadow.png"
        navLogo.src = imgPath + "website_title_small_shadow.png"
        imgLogo.src = imgPath + "rocket_logo_shadow.png"
    }
    function setLightMode(imgPath, cssPath, darkModeText, mainLogo, navLogo, imgLogo) {
        // set page style and switch
        theme.setAttribute("href", cssPath + "style_light.css");
        // darkMode = "false";
        darkModeText[0].textContent = "Dark Mode"
        darkModeText[1].textContent = "Dark Mode"
        // set logo styles
        mainLogo.src = imgPath + "website_title.png"
        navLogo.src = imgPath + "website_title.png"
        imgLogo.src = imgPath + "rocket_logo.png"
    }

    // "main" per se
	if(event.target.readyState == "interactive") {
        // The sticky navbar
        let navbar = document.getElementById("navbar");
        let title = document.getElementById("main-logo");
        let hamburger = document.getElementById("hamburger");
        let mobileShadow = document.getElementById("mobile-menu");
        let mobileMenu = document.getElementById("navbar-mobile");
        // media query for mobile
        let isMobile = window.matchMedia("only screen and (max-width: 1200px)");
        // once title img loaded assign function
        let hasChecked = false;
        title.onload = () => {
            if (hasChecked === false) {
                let stickyOffset = navbar.offsetTop;
                // on scroll, attach or detach
                window.onscroll = () => {
                    if (window.pageYOffset >= stickyOffset) {
                        if (isMobile.matches) {
                            navbar.classList.add("sticky");
                            // hide all buttons, show hamburger
                            for (button of navbar.getElementsByClassName("item")) {
                                button.style.display = "none";
                            }
                            hamburger.style.display = "block";
                        } else {
                            navbar.classList.add("sticky");
                        }
                        title.style.marginBottom = navbar.offsetHeight + 'px';
                    } else {
                        // if mobile, show everything again
                        if (isMobile.matches) {
                            for (button of navbar.getElementsByClassName("item")) {
                                button.style.display = "block";
                            }
                            hamburger.style.display = "none";
                        }
                        navbar.classList.remove("sticky");
                        title.style.marginBottom = 0;
                    }
                }
                // prevent the value from being adjusted when the image reloads
                hasChecked = true;
            }
        }

        function showMobileMenu() {
            mobileShadow.style.display = "block";
            mobileShadow.style.opacity = "1";
            mobileMenu.style.right = "0vw";
        }
        function hideMobileMenu() {
            mobileShadow.style.opacity = "0";
            mobileMenu.style.right = "-75vw";
            mobileShadow.style.display = "none";
        }

        // show mobile navbar when hamburger tapped
        hamburger.onclick = showMobileMenu;
        // hide mobile navbar when arrow tapped
        let arrow = document.getElementById("mobile-arrow");
        arrow.onclick = hideMobileMenu;
        mobileShadow.onclick = hideMobileMenu;

        // Sticky footer if the page is too short || resized
        var footer = document.querySelector("footer");
        // attach listener on load || resize
        window.addEventListener("load", attachFooter);
        window.addEventListener("resize", attachFooter);
        // conditional attach
        function attachFooter() {
            // console.log(`Comparing data ${window.innerHeight} > ${document.body.scrollHeight} ?`)
            if (window.innerHeight > document.body.scrollHeight) {
                // console.log(`Window height greater than document height`)
                // page is too short for the window
                footer.classList.add("sticky-footer");
            }
            // else page is fine
        }

        // Dark Mode button
        // theme mode
        darkMode = null;
        theme = document.getElementById("theme")
        // get theme - saved from cache or default to OS
        if (localStorage.getItem("darkMode") === null) {
            darkMode = "true";
            localStorage.setItem("darkMode", darkMode);
        } else {
            darkMode = localStorage.getItem("darkMode");
        }
        // get filepath (museum/* files need relative adjustment)
        let cssPath = "css/";
        let imgPath = "images/";
        if (! fileExists(cssPath + "style_dark.css")) {
            console.log("NOTE: 404 error will be logged here, that's intended");
            // I'm in a sub-folder, add parent dir
            cssPath = "../" + cssPath;
            imgPath = "../" + imgPath;
        }
        // set button to switch modes
        let darkModeButtonDesktop = document.querySelector("#dark-mode-button-desktop");
        let darkModeTextDesktop = document.querySelector("#dark-mode-text-desktop");
        let darkModeButtonMobile = document.querySelector("#dark-mode-button-mobile");
        let darkModeTextMobile = document.querySelector("#dark-mode-text-mobile");
        let darkModeText = [darkModeTextDesktop, darkModeTextMobile];
        // store logos
        let mainLogo = document.getElementById("main-logo");
        let navLogo = document.getElementById("nav-logo");
        let imgLogo = document.getElementById("img-logo");
        // set theme at start
        if (darkMode === "true") {
            setDarkMode(imgPath, cssPath, darkModeText,
                mainLogo, navLogo, imgLogo);
        } else {
            setLightMode(imgPath, cssPath, darkModeText,
                mainLogo, navLogo, imgLogo);
        }
        // on click, switch modes
        darkModeButtonDesktop.onclick = () => {
            assignDarkMode(imgPath, cssPath, darkModeText, mainLogo, navLogo, imgLogo);
        };
        darkModeButtonMobile.onclick = () => {
            assignDarkMode(imgPath, cssPath, darkModeText, mainLogo, navLogo, imgLogo);
        };
        // on close, store dark mode variable
        window.onbeforeunload = () => {
            localStorage.setItem("darkMode", darkMode);
        }

        // collapsing references
        let references = document.getElementById("references");
        let referencesButton = references.getElementsByTagName("button")[0];
        let referencesTab = document.getElementById("references-tab");
        let referencesContent = document.getElementById("reference-data");
        // set values at t0
        referencesContent.style.maxHeight = "0px";
        referencesContent.style.paddingBottom = "0px";
        // set listener
        referencesButton.addEventListener("click", () => {
            if (referencesContent.style.maxHeight !== "0px") {
                referencesContent.style.maxHeight = "0px";
                referencesContent.style.paddingBottom = "0px";
                referencesTab.textContent = "\u25BC";
            } else {
                referencesContent.style.maxHeight = referencesContent.scrollHeight + "px";
                // some padding for the bottom of page
                referencesContent.style.paddingBottom = "25px";
                // swap arrow
                referencesTab.textContent = "\u25B2";
            }
        });

        // window.onresize = () => {
        //     console.log(`New window size of ${window.innerWidth} x ${window.innerHeight}`)
        //     if (window.innerWidth > 1200) {
        //         console.log("Entering Desktop mode");
        //     } else if (window.innerWidth > 700) {
        //         console.log("Entering Tablet mode");
        //     } else {
        //         console.log("Entering Mobile mode");
        //     }
        // }

        // TODO: pre-fill form when clicking from map
        // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    }
});