// ✅ FETCH EVENT — Intercepts fetch requests
self.addEventListener("fetch", (event) => {
  console.log("📡 [SW] Intercepted fetch:", event.request.url);

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log("📥 [SW] From cache:", event.request.url);
        return cachedResponse;
      }

      console.log("🌍 [SW] Fetching from network:", event.request.url);
      return fetch(event.request).then((networkResponse) => {
        return caches.open("xchange-cache").then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});

// ✅ SYNC EVENT — Background sync for exchange data
self.addEventListener("sync", (event) => {
  console.log("🔄 [SW] Sync event triggered:", event.tag);

  if (event.tag === "sync-exchange-data") {
    event.waitUntil(syncExchangeRates("USD")); // You can pass any base currency
  }
});

// 🔄 Background sync logic using your API
async function syncExchangeRates(baseCurrency) {
  const url = `https://v6.exchangerate-api.com/v6/951cfa22757af9794ed0b2d6/latest/${baseCurrency}`;
  console.log(`💱 [SW] Fetching exchange rates for: ${baseCurrency}`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Optionally store it in cache for offline use
    const cache = await caches.open("xchange-cache");
    await cache.put(url, new Response(JSON.stringify(data)));

    console.log("✅ [SW] Exchange rates synced and cached successfully");
  } catch (err) {
    console.error("❌ [SW] Failed to sync exchange rates:", err);
  }
}

// ✅ PUSH EVENT — Notification from server (optional for now)
self.addEventListener("push", (event) => {
  console.log("📨 [SW] Push event received");

  const data = event.data?.json() || { title: "Exchange Alert", body: "Rates updated!" };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons8-money-96.png",
    })
  );
});
