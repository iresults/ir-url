import {Url} from './Url';
import re_weburl from './UrlValidationRegex';

function isValidUrl(url: Url | string) {
    try {
        new URL('' + url);

        return true;
    } catch (e) {
        return re_weburl.test('' + url);
    }
}

function getLocation(): Partial<Location> {
    if (typeof window !== 'undefined' && window.location) {
        return window.location;
    }
    throw 'Use the Jest option `--env=jsdom`';
}

function generateTestSets() {
    const testLocation = getLocation();

    return {
        '/': {
            'pathname': '/',
            'hash': '',
            'search': '',
            'hostname': testLocation.hostname,
            'protocol': testLocation.protocol,
            'port': testLocation.port,
        },
        '/subPath': {
            'pathname': '/subPath',
            'hash': '',
            'search': '',
            'hostname': testLocation.hostname,
            'protocol': testLocation.protocol,
            'port': testLocation.port,
        },
        '/subPath/next-level': {
            'pathname': '/subPath/next-level',
            'hash': '',
            'search': '',
            'hostname': testLocation.hostname,
            'protocol': testLocation.protocol,
            'port': testLocation.port,
        },
        '/subPath/next-level?search=1&param2=xyz#hash': {
            'pathname': '/subPath/next-level',
            'hash': '#hash',
            'search': '?search=1&param2=xyz',
            'hostname': testLocation.hostname,
            'protocol': testLocation.protocol,
            'port': testLocation.port,
        },
        '/subPath/?search=1&param2=xyz#hash': {
            'pathname': '/subPath/',
            'hash': '#hash',
            'search': '?search=1&param2=xyz',
            'hostname': testLocation.hostname,
            'protocol': testLocation.protocol,
            'port': testLocation.port,
        },
        '/subPath/next-level?search=1&param2=xyz': {
            'pathname': '/subPath/next-level',
            'hash': '',
            'search': '?search=1&param2=xyz',
            'hostname': testLocation.hostname,
            'protocol': testLocation.protocol,
            'port': testLocation.port,
        },
        '/subPath/?search=1&param2=xyz': {
            'pathname': '/subPath/',
            'hash': '',
            'search': '?search=1&param2=xyz',
            'hostname': testLocation.hostname,
            'protocol': testLocation.protocol,
            'port': testLocation.port,
        },
        '/?search=1&param2=xyz#hash': {
            'pathname': '/',
            'hash': '#hash',
            'search': '?search=1&param2=xyz',
            'hostname': testLocation.hostname,
            'protocol': testLocation.protocol,
            'port': testLocation.port,
        },
        '?search=1&param2=xyz#hash': {
            'pathname': testLocation.pathname,
            'hash': '#hash',
            'search': '?search=1&param2=xyz',
            'hostname': testLocation.hostname,
            'protocol': testLocation.protocol,
            'port': testLocation.port,
        },
        'www.cundd.net?search=1&param2=xyz#hash': {
            'pathname': '/www.cundd.net',
            'hash': '#hash',
            'search': '?search=1&param2=xyz',
            'hostname': testLocation.hostname,
            'protocol': testLocation.protocol,
            'port': testLocation.port,
        },
        'http://www.cundd.net?search=1&param2=xyz#hash': {
            'pathname': '/',
            'hash': '#hash',
            'search': '?search=1&param2=xyz',
            'hostname': 'www.cundd.net',
            'protocol': testLocation.protocol,
            'port': testLocation.port,
        },
        'https://www.cundd.net?search=1&param2=xyz#hash': {
            'pathname': '/',
            'hash': '#hash',
            'search': '?search=1&param2=xyz',
            'hostname': 'www.cundd.net',
            'protocol': 'https:',
            'port': testLocation.port,
        },
        '//www.cundd.net?search=1&param2=xyz#hash': {
            'pathname': '/',
            'hash': '#hash',
            'search': '?search=1&param2=xyz',
            'hostname': 'www.cundd.net',
            'protocol': testLocation.protocol,
            'port': testLocation.port,
        }
    };
}

describe('Url', () => {
    describe('new', () => {
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
            const testSets = generateTestSets();

            Object.keys(testSets).forEach(function (inputUrl) {
                testUrl(inputUrl, testSets[inputUrl]);
            });
        });

        it('should build full URL from URL', () => {
            const testSets = generateTestSets();

            Object.keys(testSets).forEach(function (inputUrl) {
                testUrl(new Url(inputUrl), testSets[inputUrl]);
            });
        });
    });

    describe('current', () => {
        it('should create from the current URL', () => {
            const testLocation = getLocation();
            const url = Url.current();

            expect(isValidUrl(url)).toBeTruthy();
            expect(url.pathname).toEqual('/');
            expect(url.protocol).toEqual(testLocation.protocol);
            expect(url.hash).toEqual(testLocation.hash);
            expect(url.search).toEqual(testLocation.search);
            expect(url.hostname).toEqual(testLocation.hostname);
        });
    });
});
