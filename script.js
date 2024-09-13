let videoLoaded = false;

// Função para a contagem regressiva
function countdown() {
  const targetDate = new Date('2024-12-24T18:00:00');
  const now = new Date();
  const timeDifference = targetDate - now;

  if (timeDifference >= 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      updateCountdownDisplay(days, hours, minutes, seconds);
  }
}

function updateCountdownDisplay(days, hours, minutes, seconds) {
  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Atualiza a contagem regressiva a cada segundo
setInterval(countdown, 1000);

// Função para inicializar o player do YouTube
function onYouTubeIframeAPIReady() {
  const videoID = 'fn2v5Wa2lpQ';
  const player = new YT.Player('youtube-player', {
      height: '100%',
      width: '100%',
      videoId: videoID,
      playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
		  cc_load_policy: 0,
      },
      events: {
          onReady: onPlayerReady
      }
  });
}

function onPlayerReady(event) {
  const player = event.target;
  player.mute();
  videoLoaded = true; // Marcar que o vídeo foi carregado
  setupPlayerControls(player);
  // initializeIframe(); // Inicializa o iframe somente depois que o vídeo está pronto
}

function setupPlayerControls(player) {
  const fullscreenButton = document.getElementById('fullscreen-button');
  const muteButton = document.getElementById('mute-button');
  const volumeUpButton = document.getElementById('volume-up');
  const volumeDownButton = document.getElementById('volume-down');
  const volumeIndicator = document.getElementById('volume-indicator');

  muteButton.addEventListener('click', () => toggleMute(player, muteButton));
  volumeUpButton.addEventListener('click', () => adjustVolume(player, 10, volumeIndicator));
  volumeDownButton.addEventListener('click', () => adjustVolume(player, -10, volumeIndicator));
  fullscreenButton.addEventListener('click', toggleFullscreen);
}

function toggleMute(player, button) {
  if (player.isMuted()) {
      player.unMute();
      button.textContent = 'Mute';
  } else {
      player.mute();
      button.textContent = 'Unmute';
  }
}

function adjustVolume(player, change, volumeIndicator) {
  let currentVolume = player.getVolume();
  currentVolume = Math.min(100, Math.max(0, currentVolume + change));
  player.setVolume(currentVolume);
  showVolumeIndicator(volumeIndicator, currentVolume);
}

function showVolumeIndicator(volumeIndicator, volume) {
  volumeIndicator.textContent = `Volume: ${volume}%`;
  volumeIndicator.style.display = 'block';
  setTimeout(() => volumeIndicator.style.display = 'none', 2500);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
      enterFullscreen();
  } else {
      exitFullscreen();
  }
}

function enterFullscreen() {
  if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
  }
  document.getElementById('fullscreen-button').textContent = 'Sair da Tela Cheia';
}

function exitFullscreen() {
  if (document.exitFullscreen) {
      document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
  }
  document.getElementById('fullscreen-button').textContent = 'Tela Cheia';
}

// Inicializa o banner de cookies
function initializeCookieBanner() {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookiesButton = document.getElementById('accept-cookies');

  if (!localStorage.getItem('cookiesAccepted')) {
      cookieBanner.style.display = 'block';
  }

  acceptCookiesButton.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieBanner.style.display = 'none';
  });
}

// Funções para rolar e recarregar o iframe
const iframe = document.getElementById('floating-iframe');

function initializeIframe() {
  if (videoLoaded) { // Verifica se o vídeo foi carregado
    scrollIframe();
    setInterval(scrollIframe, 30000); // 30 segundos
    setInterval(reloadIframe, 120000); // 2 minutos
  }
}

function scrollIframe() {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    if (iframeDoc) {
        iframeDoc.documentElement.scrollTop += 100;
    }
}

function reloadIframe() {
    iframe.src = iframe.src; // Recarrega o iframe
}

// Inicializa o banner de cookies
initializeCookieBanner();
