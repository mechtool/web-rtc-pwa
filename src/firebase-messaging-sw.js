// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts("https://www.gstatic.com/firebasejs/5.9.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.3/firebase-messaging.js");
firebase.initializeApp({
	apiKey: "AIzaSyBChEdGazV_JMdbwmINOzWMDMolaKTbD7Y",
	authDomain: "web-rtc-pwa.firebaseapp.com",
	databaseURL: "https://web-rtc-pwa.firebaseio.com",
	projectId: "web-rtc-pwa",
	storageBucket: "web-rtc-pwa.appspot.com",
	messagingSenderId: "453075967208"
}) ;
  
var messaging = firebase.messaging();

/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.
 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
 // Initialize the Firebase app in the service worker by passing in the
 // messagingSenderId.
 firebase.initializeApp({
   'messagingSenderId': 'YOUR-SENDER-ID'
 });
 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 // [END initialize_firebase_in_sw]
 **/

 /*
 *
 * navigator.serviceWorker.register('./your-serviceworker-file.js')
.then((registration) => {
  messaging.useServiceWorker(registration);

  // Request permission and get token.....
});
 * */
// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
	console.log('[firebase-messaging-sw.js] Получено сообщение с сервера ', payload);
	// Здесь идет настройка сообщения
	var notificationTitle = 'Заголовок серверного сообщения';
	var notificationOptions = {
		body: 'Background Message body.',
		icon: '/firebase-logo.png'
	};
	
	return self.registration.showNotification(notificationTitle,
		notificationOptions);
});
// [END background_handler]

/*
var cacheName = 'weatherPWA-step-6-1';
var filesToCache = ['/'];//файлы оболочки приложения
//при установки сервисного рабочего заполняем кэш
importScripts('/cache-polyfill.js');


self.addEventListener('install', function(evt) {
	console.log('The service worker is being installed.');
	evt.waitUntil(precache());
});

self.addEventListener('activate', function(e) {
	console.log('[ServiceWorker] Activate');
	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key !== cacheName) {
					console.log('[ServiceWorker] Removing old cache', key);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});

self.addEventListener('fetch', function(evt) {
	console.log('Начало прослушивания клиентов.');
	evt.respondWith(fromCache(evt.request));
	evt.waitUntil(update(evt.request));
});

function precache() {
	return caches.open(cacheName).then(function (cache) {
		return cache.addAll([
			'/',
			'/app-public-key'
		]);
	});
}

function fromCache(request) {
	return caches.open(cacheName).then(function (cache) {
		return cache.match(request).then(function (matching) {
			return matching || Promise.reject('no-match');
		});
	});
}

function update(request) {
	return caches.open(cacheName).then(function (cache) {
		return fetch(request).then(function (response) {
			return cache.put(request, response);
		});
	});
}
 */
