// Bloomscroll Push Notification Service Worker

self.addEventListener('push', function(event) {
  const options = {
    body: event.data ? event.data.text() : 'Time for your daily wisdom! 🌱',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      url: '/app'
    },
    actions: [
      { action: 'open', title: 'Read Now' },
      { action: 'close', title: 'Later' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Bloomscroll 🌱', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // If app is already open, focus it
      for (const client of clientList) {
        if (client.url.includes('/app') && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open new window
      if (clients.openWindow) {
        return clients.openWindow('/app');
      }
    })
  );
});

// Listen for messages from the main app
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
