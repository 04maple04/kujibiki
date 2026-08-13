// ================================
// 初期化
// ================================
document.getElementById("draw-btn").addEventListener("click", () => {
	revivalAudio.muted = true;

	revivalAudio.play().then(() => {
		revivalAudio.pause();
		revivalAudio.currentTime = 0;
		revivalAudio.muted = false;
	});
}, { once: true });
revivalAudio.load();
createProbabilityTable();

// ================================
// ページ復帰時のボタン状態リセット
// ================================
window.addEventListener("pageshow", () => {

    const btn = document.getElementById("draw-btn");

    if (!btn) {
        return;
    }

    btn.disabled = false;
    btn.classList.remove("disabled");

});
