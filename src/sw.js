importScripts('workbox-v3.1.0/Workbox-sw.js');

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

workbox.skipWaiting();
workbox.clientsClaim();

// your custom service worker code
console.log('injecting custom service worker yo')

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute([]);
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
