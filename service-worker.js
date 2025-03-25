const staticDevCoffee = "listaContatos_v2"
const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})