// Interaksi 1: tema gelap/terang, navigasi buka/tutup
const modeButton = document.querySelector('.mode');

modeButton.addEventListener('click', () => {
document.body.classList.toggle('darkmode');
});

const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('header');

if (menuToggle && header) {
    menuToggle.addEventListener('click', () => {
        const menuTerbuka = header.classList.toggle('nav-terbuka');
        menuToggle.setAttribute('aria-expanded', menuTerbuka);
        menuToggle.textContent = menuTerbuka ? 'X' : '☰';
        menuToggle.setAttribute(
            'aria-label', menuTerbuka ? 'Tutup Navigasi' : 'Buka Navgasi'
        );
    });
}

// Interaksi 2: mencegah form kosong/format salah
const form = document.querySelector('#form-pesan');
const inputNama = document.querySelector('#nama');
const gNama = document.querySelector('#error-nama');
const inputEmail = document.querySelector('#email');
const gEmail = document.querySelector('#error-email');

function periksaNama(v) {
    if (!v) return 'Nama wajib diisi.';
    if (v.length < 3) return 'Nama minimal 3 huruf.';
    return '';
}

function periksaEmail(v) {
    if (!v) return 'Email wajib diisi.';
    const pola = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pola.test(v)) return 'Format email salah. Contoh: ali@gmail.com';
    return '';
}

function tampilkanError (el, kotak, pesan) {
    kotak.textContent = pesan;
    el.classList.toggle('input-error', pesan !== '');
    el.setAttribute('aria-invalid', pesan !== '' ? 'true' : 'false');
}

if (form && inputNama && inputEmail) {
    inputNama.addEventListener('blur', () => {
    tampilkanError(inputNama, gNama, periksaNama(inputNama.value.trim()));
    });

    inputEmail.addEventListener('blur', () => {
    tampilkanError(inputEmail, gEmail, periksaEmail(inputEmail.value.trim()));
    });


    form.addEventListener('submit', e => {
    e.preventDefault();

    const nama = inputNama.value.trim();
    const email = inputEmail.value.trim();

    const errorNama = periksaNama(nama);
    const errorEmail = periksaEmail(email);

    tampilkanError(inputNama, gNama, errorNama);
    tampilkanError(inputEmail, gEmail, errorEmail);

    if (errorNama || errorEmail) {
        (errorNama ? inputNama : inputEmail).focus();
            return;
    }

    form.reset();

    tampilkanError(inputNama, gNama, '');
    tampilkanError(inputEmail, gEmail, '');
    });
}


// Interaksi 3: ambil data.json dengan fetch
const daftar = document.querySelector('#daftar-kegiatan');
const statusData = document.querySelector('#status-data');

function buatKartu(item) {
    const kartu = document.createElement('article');
    kartu.classList.add('kartu');

    const judul = document.createElement('h3');
    judul.textContent = item.nama;

    const meta = document.createElement('p');
    meta.classList.add('meta');
    meta.textContent = item.tahun;

    const isi = document.createElement('p');
    isi.textContent = item.deskripsi;

    kartu.append(judul, meta, isi);
    return kartu;
}

async function muatData() {
    try {
        const respon = await fetch('data.json');
        if (!respon.ok) {
            throw new Error('Status ' + respon.status);
        }

        const data = await respon.json();
        data.forEach(item => {
            daftar.appendChild(buatKartu(item));
        });

        statusData.textContent = 'Menampilkan ' + data.length + ' kegiatan.';
    } catch (err) {
        statusData.textContent = 'Data gagal dimuat. Pastikan situs dijalankan.'
        console.error(err);
    }
}

if (daftar && statusData) {
    muatData();
}

// service worker
if ('serviceWorker' in navigator)
    navigator.serviceWorker.register('/sw.js');