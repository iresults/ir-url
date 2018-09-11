export class Url {
    public static current() {
        if (typeof window === 'undefined') {
            throw new TypeError('window not defined in this context');
        }
        return new Url(window.location.href);
    }

    private _protocol: string = '';
    private _host: string = '';
    private _hostname: string = '';
    private _port: string = '';
    private _hash: string = '';
    private _search: string = '';
    private _pathname: string = '/';

    constructor(href?: string | Url | URL) {
        if (typeof href !== 'undefined') {
            const parser = document.createElement('a');
            const location: URL = typeof window !== 'undefined' ? window.location : ({} as any);
            parser.href = this._prepareDoubleStash('' + href);

            this._protocol = parser.protocol && parser.protocol !== ':' ? parser.protocol : location.protocol;   // => "http:"
            this._port = parser.port || location.port;           // => "3000"
            this._hostname = parser.hostname || location.hostname;   // => "example.com"
            this._host = parser.host || (this._port ? this._hostname + ':' + this._port : this._hostname);           // => "example.com:3000"
            this.setPathname(parser.pathname || location.pathname);  // => "/pathname/"
            this.setHash(parser.hash);          // => "#hash"
            this.setSearch(parser.search);      // => "?search=test"
        }
    }

    /**
     * Return the host
     *
     * @returns {String}
     */
    public getHost() {
        return this._host;
    }

    /**
     * Set the host
     *
     * @returns {String}
     */
    public setHost(newValue: string) {
        const hostDefinitionParts = newValue.split(':');
        this._host = newValue;
        this._hostname = hostDefinitionParts[0];
        this._port = hostDefinitionParts[1];
    }

    /**
     * Return the hostname
     *
     * @returns {String}
     */
    public getHostname() {
        return this._hostname;
    }

    /**
     * Set the hostname
     *
     * @returns {String}
     */
    public setHostname(newValue: string) {
        this._hostname = newValue;
        this._host = newValue + ':' + this._port;
    }

    /**
     * Return the port
     *
     * @returns {String}
     */
    public getPort() {
        return this._port;
    }

    /**
     * Set the port
     *
     * @returns {String}
     */
    public setPort(newValue: string | number) {
        this._port = '' + newValue;
        this._host = this._hostname + ':' + newValue;
    }

    /**
     * Return the protocol
     *
     * @returns {String}
     */
    public getProtocol() {
        return this._protocol;
    }

    /**
     * Set the protocol
     *
     * @param {String} newValue
     */
    public setProtocol(newValue: string) {
        this._protocol = newValue;
    }

    /**
     * Return the pathname
     *
     * @returns {String}
     */
    public getPathname() {
        return this._pathname;
    }

    /**
     * Set the pathname
     *
     * @param {String} newValue
     */
    public setPathname(newValue: string) {
        newValue = '' + newValue;
        if (!newValue || newValue[0] !== '/') {
            newValue = '/' + newValue;
        }
        this._pathname = newValue;
    }

    /**
     * Return the hash
     *
     * @returns {String}
     */
    public getHash() {
        return this._hash;
    }

    /**
     * Set the hash
     *
     * @param {String} newValue
     */
    public setHash(newValue: string) {
        newValue = '' + newValue;
        if (newValue && newValue.charAt(0) !== '#') {
            newValue = '#' + newValue;
        }
        this._hash = newValue;
    }

    /**
     * Return the search
     *
     * @returns {String}
     */
    public getSearch() {
        return this._search;
    }

    /**
     * Set the search
     *
     * @param {String} newValue
     */
    public setSearch(newValue: string) {
        newValue = '' + newValue;
        if (newValue && newValue[0] !== '?') {
            newValue = '?' + newValue;
        }
        this._search = newValue;
    }

    /**
     * Return if the URL is local
     *
     * @returns {boolean}
     */
    public isLocal() {
        return '' + window.location.host === '' + this._host;
    }

    /**
     * Return if the URL is equal to the current page
     *
     * @param {boolean} [ignoreSearch] If set to TRUE the URL's search/query part will not be compared
     * @returns {boolean}
     */
    public isSamePage(ignoreSearch: boolean = false) {
        const pageUrl = Url.current();

        return (
            ('' + pageUrl.host) === ('' + this.host) &&
            pageUrl._protocol === this._protocol &&
            pageUrl.pathname === this.pathname &&
            (ignoreSearch || pageUrl.search === this.search)
        );
    }

    /**
     * Return if the URL fully matches the current location
     *
     * @returns {boolean}
     */
    public isCurrent() {
        return this.isEqualTo(Url.current());
    }

    /**
     * Return if the URL is equal to the given URL
     *
     * @param {String|URL|Url} url
     * @returns {boolean}
     */
    public isEqualTo(url: string | URL | Url) {
        return ('' + url) === ('' + this);
    }

    /**
     * Return a string representation of the URL object
     *
     * @returns {string}
     */
    public toString() {
        return (this._protocol ? this._protocol + '//' : '') +
            this.host +
            this.pathname +
            this.search +
            this._hash;
    }

    /**
     * Adds the protocol if the URI starts with //
     *
     * @param {String} input
     * @returns String}
     * @private
     */
    private _prepareDoubleStash(input: string): string {
        if (input.substr(0, 2) === '//') {
            if (typeof window !== 'undefined') {
                return window.location.protocol + input;
            }
            return 'http:' + input;
        }
        return input;
    }


    get protocol(): string {
        return this.getProtocol();
    }

    set protocol(value: string) {
        this.setProtocol(value);
    }

    get host(): string {
        return this.getHost();
    }

    set host(value: string) {
        this.setHost(value);
    }

    get hostname(): string {
        return this.getHostname();
    }

    set hostname(value: string) {
        this.setHostname(value);
    }

    get port(): string {
        return this.getPort();
    }

    set port(value: string) {
        this.setPort(value);
    }

    get hash(): string {
        return this.getHash();
    }

    set hash(value: string) {
        this.setHash(value);
    }

    get search(): string {
        return this.getSearch();
    }

    set search(value: string) {
        this.setSearch(value);
    }

    get pathname(): any {
        return this.getPathname();
    }

    set pathname(value: any) {
        this.setPathname(value);
    }
}
