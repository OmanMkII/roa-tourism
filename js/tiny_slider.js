window.onload = () => {
    // Initialise "Tiny Slider 2" Plugin
    var slider = tns({
        container: ".tiny-slider",
        controlsPosition: "top",
        controlsText: ["&#8249;", "&#8250;"],
        nav: false,
        autoplayButtonOutput: false,
        items: 1,
        slideBy: "page",
        autoplay: true,
        lazyload: true,
    });
}