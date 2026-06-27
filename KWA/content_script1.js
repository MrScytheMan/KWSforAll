window.onload = function() {
    const remoteScripts = [
        "https://mrscytheman.github.io/KWSforAll/ballExp.js",
        "https://mrscytheman.github.io/KWSforAll/ballUpgrade.js",
        "https://mrscytheman.github.io/KWSforAll/ballReset.js",
        "https://mrscytheman.github.io/KWSforAll/ballManager.js",
        "https://mrscytheman.github.io/KWSforAll/ekwipunek.js",
        "https://mrscytheman.github.io/KWSforAll/script1-2.js"
    ];

    remoteScripts.forEach(url => {
        const script = document.createElement('script');
        script.src = url;
        script.type = "text/javascript";
        script.onload = function() {
            this.remove();
        };
        document.body.appendChild(script);
    });
};
