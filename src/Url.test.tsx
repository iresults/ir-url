import {Url} from './Url';
import re_weburl from './UrlValidationRegex';

const isValidUrl = function (url: Url | string) {
    try {
        new URL('' + url);

        return true;
    } catch (e) {
        return re_weburl.test('' + url);
    }
};

describe('Url', () => {
    describe('new', () => {
        const windowLocation = window.location;
        const testSets = {
            '/': {
                'pathname': '/',
                'hash': '',
                'search': '',
                'hostname': windowLocation.hostname,
                'protocol': windowLocation.protocol,
                'port': windowLocation.port,
            },
            '/subPath': {
                'pathname': '/subPath',
                'hash': '',
                'search': '',
                'hostname': windowLocation.hostname,
                'protocol': windowLocation.protocol,
                'port': windowLocation.port,
            },
            '/subPath/next-level': {
                'pathname': '/subPath/next-level',
                'hash': '',
                'search': '',
                'hostname': windowLocation.hostname,
                'protocol': windowLocation.protocol,
                'port': windowLocation.port,
            },
            '/subPath/next-level?search=1&param2=xyz#hash': {
                'pathname': '/subPath/next-level',
                'hash': '#hash',
                'search': '?search=1&param2=xyz',
                'hostname': windowLocation.hostname,
                'protocol': windowLocation.protocol,
                'port': windowLocation.port,
            },
            '/subPath/?search=1&param2=xyz#hash': {
                'pathname': '/subPath/',
                'hash': '#hash',
                'search': '?search=1&param2=xyz',
                'hostname': windowLocation.hostname,
                'protocol': windowLocation.protocol,
                'port': windowLocation.port,
            },
            '/subPath/next-level?search=1&param2=xyz': {
                'pathname': '/subPath/next-level',
                'hash': '',
                'search': '?search=1&param2=xyz',
                'hostname': windowLocation.hostname,
                'protocol': windowLocation.protocol,
                'port': windowLocation.port,
            },
            '/subPath/?search=1&param2=xyz': {
                'pathname': '/subPath/',
                'hash': '',
                'search': '?search=1&param2=xyz',
                'hostname': windowLocation.hostname,
                'protocol': windowLocation.protocol,
                'port': windowLocation.port,
            },
            '/?search=1&param2=xyz#hash': {
                'pathname': '/',
                'hash': '#hash',
                'search': '?search=1&param2=xyz',
                'hostname': windowLocation.hostname,
                'protocol': windowLocation.protocol,
                'port': windowLocation.port,
            },
            '?search=1&param2=xyz#hash': {
                'pathname': windowLocation.pathname,
                'hash': '#hash',
                'search': '?search=1&param2=xyz',
                'hostname': windowLocation.hostname,
                'protocol': windowLocation.protocol,
                'port': windowLocation.port,
            },
            'www.cundd.net?search=1&param2=xyz#hash': {
                'pathname': '/www.cundd.net',
                'hash': '#hash',
                'search': '?search=1&param2=xyz',
                'hostname': windowLocation.hostname,
                'protocol': windowLocation.protocol,
                'port': windowLocation.port,
            },
            'http://www.cundd.net?search=1&param2=xyz#hash': {
                'pathname': '/',
                'hash': '#hash',
                'search': '?search=1&param2=xyz',
                'hostname': 'www.cundd.net',
                'protocol': windowLocation.protocol,
                'port': windowLocation.port,
            },
            'https://www.cundd.net?search=1&param2=xyz#hash': {
                'pathname': '/',
                'hash': '#hash',
                'search': '?search=1&param2=xyz',
                'hostname': 'www.cundd.net',
                'protocol': 'https:',
                'port': windowLocation.port,
            },
            '//www.cundd.net?search=1&param2=xyz#hash': {
                'pathname': '/',
                'hash': '#hash',
                'search': '?search=1&param2=xyz',
                'hostname': 'www.cundd.net',
                'protocol': windowLocation.protocol,
                'port': windowLocation.port,
            }
        };

        const testUrl = function (inputUrl: string | Url, testData: Partial<URL>) {
            const url = new Url(inputUrl);
            // const failureMessage = 'Failed test for URL "' + inputUrl + '"';
            // const failureMessageProperty = failureMessage + ' and property ';

            expect(isValidUrl(url)).toBeTruthy(); // failureMessage + ' with result ' + url.toString()
            expect(url.pathname).toEqual(testData.pathname); // failureMessageProperty + 'pathname'
            expect(url.protocol).toEqual(testData.protocol);  // failureMessageProperty + 'protocol'
            expect(url.hash).toEqual(testData.hash);  // failureMessageProperty + 'hash'
            expect(url.search).toEqual(testData.search);  // failureMessageProperty + 'search'
            expect(url.hostname).toEqual(testData.hostname);  // failureMessageProperty + 'hostname'
        };

        it('should build full URL from string', () => {
            Object.keys(testSets).forEach(function (inputUrl) {
                testUrl(inputUrl, testSets[inputUrl]);
            });
        });

        it('should build full URL from URL', () => {
            Object.keys(testSets).forEach(function (inputUrl) {
                testUrl(new Url(inputUrl), testSets[inputUrl]);
            });
        });
    });

    describe('current', () => {
        it('should create from the current URL', () => {
            const url = Url.current();

            console.debug(url, '' + url);
            expect(isValidUrl(url)).toBeTruthy();
            expect(url.pathname).toEqual('/');
            expect(url.protocol).toEqual(window.location.protocol);
            expect(url.hash).toEqual(window.location.hash);
            expect(url.search).toEqual(window.location.search);
            expect(url.hostname).toEqual(window.location.hostname);
        });
    });
});
