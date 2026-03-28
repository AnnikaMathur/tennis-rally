// ================================================================
// SERVICE WORKER
//
// This file runs in the background and caches the game files.
// After the first load, the game works completely offline —
// no internet connection needed.
// ================================================================

var CACHE_NAME = 'tennis-rally-v2';

// List of files to cache
var urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// When the service worker is first installed, cache all files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// When the app requests a file, serve it from cache if available
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // If we have it cached, return the cached version
      if (response) {
        return response;
      }
      // Otherwise, fetch from the network
      return fetch(event.request);
    })
  );
});
