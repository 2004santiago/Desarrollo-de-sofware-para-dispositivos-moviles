const CACHE_NOMBRE = "medicare-cache-v1";
const URLS_TO_CACHE = ["/", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NOMBRE).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NOMBRE) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((response) => {
//Cache First
//Busca en el buscador si esta el cache, en caso de estar lo devuleve, sino vuelve y los descarga desde la red
//Esta herramienta es recomendable usar con paginas estaticas, sin base de datos ni informacion que se deba actualizar constantemente
//En la app medica es recomendable usarla solo con la pagina estatica, sin necesidad de mostrar informacion sensible o informacion que constantemente see sta actualizando

      if (response) {
        return response;
      }
      return fetch(event.request).then((networkResponse) => {
        const clone = networkResponse.clone();
        caches.open(CACHE_NOMBRE).then((cache) => {
          cache.put(event.request, clone);
        });
        return networkResponse;
      });
    })
  );
});