var cacheName = 'v1';
let cacheFiles = [
				'./',
				'./index.html',
				'./script.js',
				'./styles.css',
				'../img',
				'https://fonts.googleapis.com/css?family=Roboto'
			]

self.addEventListener('install', event => {
	console.log('[Service Worker] installed')
	event.waitUntil(
		caches.open(cacheName).then(cache => {
			console.log('[Service Worker] caching cacheFiles');
			return cache.addAll(cacheFiles);
		})
	)
})

self.addEventListener('activate', event => {
	console.log('[Service Worker] activated')
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(cacheNames.map(thisCacheName => {
				if(thisCacheName !== cacheName){
					console.log('[Service Worker] Removing cached files from: ' + thisCacheName);
					return caches.delete(thisCacheName);
				}
			}))
		})
	)
})

self.addEventListener('fetch', event => {
	console.log('[Service Worker] fetching', event.request.url)
	event.respondWith(
		caches.match(event.request)
		.then(response => {
			if(response){
				console.log('[Service Worker] found in cache', event.request.url, response);
				return response;
			}

			let requestClone = event.request.clone();
			return fetch(requestClone)
			.then(response => {
				if(!response){
					console.log('[Service Worker] no response from fetch');
					return response;
				}
					let responseClone = event.response.clone();
					caches.open(cacheName).then(cache => {
						cache.put(event.request, responseClone);
						console.log('[ServiceWorker] New Data Cached', event.request.url);
						return response;
					});

				})
			.catch(error => {
				console.log('[Service Worker] Error fetching and caching new data', error)
			})
		})
	);
});
