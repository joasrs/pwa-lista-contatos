const staticDevCoffee = "listaContatos_1"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/script.js",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})