const cache = 'situs-v1';
const bekal = [
    'index.html', 'profil.html', 'kontak.html', 'css/style.css', 'js/main.js', 'offline.html', 'data.json', 'foto.avif', 'manifest.json', 'icons/192.png', 'icons/512.png'
];

self.addEventListener('install', e=> {
    e.waitUntil(
        caches.open(cache).then(c => c.addAll(bekal))
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(hit => hit || fetch(e.request).catch(() => caches.match('offline.html'))
        )
    );
});