class KwsConnectionManager {
    constructor() {
        console.log("KWS: new connection monitor created");
        const reconnectionCookieName = "KwsReconnectCharId";
        this.runConnectionMonitor();
    }
    setReconnectionCookie(reset = false) {
        const d = new Date();
        d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        var cookieValue = reset ? '' : GAME.char_id;
        console.log("KWS: setting reconnection cookie = %s", cookieValue);
        document.cookie = this.reconnectionCookieName + "=" + cookieValue + ";" + expires + ";path=/";
      }
      
      getReconnectionCookie() {
        let name = this.reconnectionCookieName + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return '';
      }

      redirectToMain() {
        console.log("KWS: redirect to main page after disconnect");
        GAME.redirect(locals.main_url,0);
      }

      logout() {
        console.log("KWS: logout after disconnect");
        GAME.emitOrder({a:1});
        setTimeout(this.redirectToMain, 200);
      }

      login() {
        var disconnectedCharacterId = getReconnectionCookie();
        if (disconnectedCharacterId != '') {
            console.log("KWS: reconnecting to disconnected charID = %s", disconnectedCharacterId);
            GAME.emitOrder({ a: 2, char_id: disconnectedCharacterId });
        }
      }

      runConnectionMonitor() {
        console.log("KWS: connection monitor check...");
        if($("#kom_con").find('button[data-option="logout"]').length > 0) {
            console.log("KWS: disconnect detected!");
            this.setReconnectionCookie();
            this.logout();
            return;
        } else {
            console.log("KWS: attempt to login...");
            if($("#cg_login_button2").length != 0) {
                $("#cg_login_button2").eq(0).click();
                console.log("KWS: try to select character in 1s...");
                setTimeout(this.login, 1000);
            } else {
                console.log("KWS: no login needed, check connection in 5s...");
                setTimeout(this.runConnectionMonitor, 5000);
            }
        }
        console.log("KWS: connection monitor, check in 5s...");
        setTimeout(this.runConnectionMonitor, 5000);
      }
}

var kwsConnectionMonitor = undefined;

if(typeof kwsConnectionMonitor === 'undefined') {
    console.log("KWS: no connection monitor - create new");
    kwsConnectionMonitor = new KwsConnectionManager();
} else {
    console.log("KWS: connection monitor detected - run monitoring");
    kwsConnectionMonitor.runConnectionMonitor();
}