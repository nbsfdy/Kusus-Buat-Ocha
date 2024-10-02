// Mengambil elemen-elemen dari DOM
const apologizeButton = document.getElementById('apologizeButton');
const responseButtons = document.getElementById('responseButtons');
const message = document.getElementById('message');
const reasonInputContainer = document.getElementById('reasonInputContainer');
const reasonInput = document.getElementById('reasonInput');
const submitReasonButton = document.getElementById('submitReasonButton');
const noButton = document.getElementById('noButton');
const finalThankYouMessage = document.getElementById('finalThankYouMessage');
const title = document.getElementById('mainTitle');

let reasons = JSON.parse(localStorage.getItem('reasons')) || [];

// Event listener untuk tombol minta maaf
apologizeButton.addEventListener('click', function() {
    document.getElementById('apologySound').play();
    responseButtons.style.display = 'block';
    message.textContent = 'Maafin Nibras ya? Dia udah bikin janji mau beliin Mixue kan?';
    apologizeButton.style.display = 'none';
});

// Event listener untuk tombol ya
document.getElementById('yesButton').addEventListener('click', function() {
    responseButtons.style.display = 'none'; 
    reasonInputContainer.style.display = 'block';
});

// Fungsi untuk memindahkan tombol "No"
function moveNoButton() {
    const buttonRect = noButton.getBoundingClientRect();
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    
    const safeArea = 150; // Jarak aman dari kotak teks

    const maxX = containerRect.width - buttonRect.width - safeArea;
    const maxY = containerRect.height - buttonRect.height - safeArea;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noButton.style.position = 'absolute';
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
}

// Event listener untuk tombol tidak
noButton.addEventListener('click', function() {
    message.textContent = 'Pleasee?';
    moveNoButton();
});

// Event listener untuk mouse masuk ke textarea
reasonInput.addEventListener('mouseenter', moveNoButton);

// Event listener untuk tombol kirim alasan
submitReasonButton.addEventListener('click', function() {
    const reason = reasonInput.value.trim();
    if (!reason) {
        message.textContent = 'yang bener! masa gak ada sih?!👀';
        reasonInput.focus();
        return;
    }
    
    reasons.push(reason);
    localStorage.setItem('reasons', JSON.stringify(reasons)); // Simpan ke localStorage

    // Tambahkan log untuk menampilkan alasan di console
    console.log('Alasan yang dimasukkan:', reason);

    reasonInput.disabled = true;
    reasonInputContainer.style.display = 'none';

    // Menampilkan pesan terima kasih
    finalThankYouMessage.textContent = 'Makasih Chaa!, Nibras bakalan ngelakuin hal itu, insyallah! 🎉';
    finalThankYouMessage.style.display = 'block';

    // Mengosongkan input
    reasonInput.value = '';
    
    // Menghilangkan h1 setelah submit
    title.style.display = 'none';
    message.textContent = '';
});

// Tidak ada pemanggilan untuk updateLastReasons lagi
