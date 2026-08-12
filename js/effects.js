function startNormalEffects(effects) {

    playSoundEffect(effects);

    playFlashEffect(effects);

    applyBackgroundEffect(effects);

}

function stopNormalEffects(effects) {

    removeBackgroundEffect(effects);

}


function playSpecialEffect(
    specialEffect,
    resultDiv,
    prize,
    callback
) {

    if (!specialEffect) {
        showResult(resultDiv, prize);
        callback();
        return;
    }
	
	switch (specialEffect.type) {

		case "revival":
			playRevivalEffect(
				specialEffect,
				resultDiv,
				prize,
				callback
			);
			break;

		default:
			showResult(resultDiv, prize);
			callback();
			break;
	}
}

// ================================
// 音演出
// ================================
function playSoundEffect(effects) {

    // 暗転演出中は通常音を鳴らさない
    if (effects.flash.enabled) {
        return;
    }

    if (!effects.sound.enabled) {
        return;
    }

    const audio = new Audio(
        effects.sound.config.file
    );

    audio.play().catch(() => {});

}

function playSpecialSound() {

    revivalAudio.pause();
    revivalAudio.currentTime = 0;

    revivalAudio.play().catch(err => {
        console.log(err);
    });

}

// ================================
// 暗転演出
// ================================
function playFlashEffect(effects) {

    if (!effects.flash.enabled) {
        return;
    }

    const flash = document.getElementById("screen-flash");

    flash.classList.add("active");

    // 暗転専用SE
    const audio = new Audio(
        effects.flash.config.sound
    );

    audio.play().catch(() => {});

    setTimeout(() => {

        flash.classList.remove("active");

    }, effects.flash.config.duration);

}

// ================================
// 復活演出
// ================================
function playRevivalEffect(
    specialEffect,
    resultDiv,
    prize,
    callback
) {
    resultDiv.classList.remove("shake");
    resultDiv.innerText = "💀 はずれ 💀";

    const btn = document.getElementById("draw-btn");

    setTimeout(() => {

        const flash = document.getElementById("screen-flash");
        flash.classList.add("active");

        playSpecialSound();

        setTimeout(() => {

            flash.classList.remove("active");

            showResult(resultDiv, prize);

            callback();

        }, 3000);

    }, 1500);
}


// ================================
// 背景演出開始
// ================================
function applyBackgroundEffect(effects) {

    if (!effects.background.enabled) {
        return;
    }

	let currentIndex =
		Math.floor(Math.random() * BACKGROUND_CLASSES.length);

	document.body.classList.add(BACKGROUND_CLASSES[currentIndex]);

	backgroundTimer = setInterval(() => {

		document.body.classList.remove(BACKGROUND_CLASSES[currentIndex]);

		let nextIndex;

		do {
			nextIndex = Math.floor(Math.random() * BACKGROUND_CLASSES.length);
		} while (nextIndex === currentIndex);

		currentIndex = nextIndex;

		document.body.classList.add(BACKGROUND_CLASSES[currentIndex]);

	}, 400);
}
// ================================
// 背景演出終了
// ================================
function removeBackgroundEffect(effects) {

    if (!effects.background.enabled) {
        return;
    }

    clearInterval(backgroundTimer);

    BACKGROUND_CLASSES.forEach(cls => {
        document.body.classList.remove(cls);
    });
}


