import { offlineFallback, warmStrategyCache } from 'workbox-recipes';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';

// Precache assets defined in __WB_MANIFEST
precacheAndRoute(self.__WB_MANIFEST);

// Strategy for caching pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm up strategy cache for specific URLs
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register strategy for navigating pages
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Cache CSS, JS, and other assets with StaleWhileRevalidate strategy
registerRoute(
  /\.(?:css|js|json|woff|woff2|ttf|otf)$/,
  new StaleWhileRevalidate({
    cacheName: 'assets-cache',
  })
);

// Cache images with CacheFirst strategy
registerRoute(
  /\.(?:png|jpg|jpeg|gif|svg|ico)$/,
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

// Implement runtime caching for dynamic content (example: API responses)
registerRoute(
  // Define your dynamic content route here, e.g., /api/
  // Adjust the pattern based on your API endpoints
  ({ url }) => url.pathname.startsWith('/api/'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
  })
);

// Handle offline fallback
offlineFallback();
