class UrlHandler {
    constructor(url) {
        this.url = url;
    }

    getHostname() {
        let hostname = "";
        if (this.url.indexOf("//") > -1) {
          hostname = this.url.split('/')[2];
        } else {
          hostname = this.url.split('/')[0];
        }
      
        hostname = hostname.split(':')[0];
      
        hostname = hostname.split('?')[0];
      
        return hostname;
      }
}

module.exports = UrlHandler;