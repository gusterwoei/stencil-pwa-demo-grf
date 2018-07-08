// importScripts('workbox-v3.3.0/Workbox-sw.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js');

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

self.workbox.skipWaiting();
self.workbox.clientsClaim();

// your custom service worker code
console.log('injecting custom service worker yo')

self.addEventListener('push', (event) => {
   console.log('[Service Worker] Push Received.');
   console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

   const title = 'Push Notification';
   const options = {
      body: `${event.data.text()}`,
      icon: 'images/icon.png',
      badge: 'images/badge.png'
   };

   event.waitUntil(self.registration.showNotification(title, options));
});

self.workbox.precaching.precacheAndRoute([]);
