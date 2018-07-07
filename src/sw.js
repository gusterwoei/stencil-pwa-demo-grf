importScripts('workbox-v3.3.0/Workbox-sw.js');

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

self.workbox.skipWaiting();
self.workbox.clientsClaim();

// your custom service worker code
console.log('injecting custom service worker yo')

self.workbox.precaching.precacheAndRoute([]);
// self.workbox.precaching.suppressWarnings();
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
