/* eslint-env browser, serviceworker, es6 */

'use strict';

self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
    
    const msg = event.data.text();
    
    clients.matchAll().then(clients => {
        if (clients.length) {
            clients.forEach(client => {
                client.postMessage(msg);
            })
        } else {            
            const title = 'Notification from admin';
            const options = {
                body: msg,
                icon: 'images/icon.png',
                badge: 'images/badge.png'
            };
        
            event.waitUntil(self.registration.showNotification(title, options));
        }
        
    })
});

self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
  
    event.notification.close();
  
    event.waitUntil(
      clients.openWindow(self.location.origin)
    );
});