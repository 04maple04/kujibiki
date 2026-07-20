// ================================
// 確率表を作成
// ================================
function createProbabilityTable() {

    const tbody = document.querySelector("#probability-table tbody");
    tbody.innerHTML = "";

    const totalWeight = PRIZES.reduce(
        (sum, prize) => sum + prize.weight,
        0
    );

    PRIZES.forEach(prize => {

        const row = document.createElement("tr");

        const effectCell = document.createElement("td");
        effectCell.textContent = prize.name;

        const probabilityCell = document.createElement("td");

        const probability =
            (prize.weight / totalWeight * 100);

        probabilityCell.textContent =
            probability.toFixed(2).replace(/\.?0+$/, "") + "%";

        row.appendChild(effectCell);
        row.appendChild(probabilityCell);

        tbody.appendChild(row);
    });

}

// ================================
// 抽選処理
// ================================
function getLotteryResultData() {

    const totalWeight =
        PRIZES.reduce((sum, prize) => sum + prize.weight, 0);

    const randomNumber =
        Math.random() * totalWeight;

    let currentWeightSum = 0;

    for (const prize of PRIZES) {

        currentWeightSum += prize.weight;

        if (randomNumber < currentWeightSum) {
            return prize;
        }
    }

    return PRIZES[PRIZES.length - 1];
}

// ================================
// 演出抽選
// ================================
function rollNormalEffects(isWin) {

    const result = {};

    for (const effect of NORMAL_EFFECTS) {

        result[effect.type] = {
            enabled: false,
            config: effect
        };

        if (!isWin) {
            continue;
        }

        if (!effect.enabled) {
            continue;
        }

        if (Math.random() * 100 < effect.chance) {
            result[effect.type].enabled = true;
        }

    }

    return result;

}

function rollSpecialEffect(isWin) {

    if (!isWin) {
        return null;
    }

    for (const effect of SPECIAL_EFFECTS) {

        if (!effect.enabled) {
            continue;
        }

        if (Math.random() * 100 < effect.chance) {
            return effect;
        }

    }

    return null;

}

// ================================
// 演出時間
// ================================
function getAnimationDuration(effects) {

    if (!effects.longAnimation.enabled) {
        return 3000;
    }

    return effects.longAnimation.config.duration;

}

// ================================
// シャッフル開始
// ================================
function startShuffle(resultDiv) {

    return setInterval(() => {

        const randomIndex =
            Math.floor(Math.random() * PRIZES.length);

        resultDiv.innerText =
            PRIZES[randomIndex].name;

    }, 50);

}

// ================================
// シャッフル終了
// ================================
function stopShuffle(intervalId) {

    clearInterval(intervalId);

}

// ================================
// 抽選開始
// ================================
function startLottery() {

    const btn = document.getElementById("draw-btn");
    const resultDiv = document.getElementById("result");

	btn.disabled = true;
	btn.classList.add("disabled");
    resultDiv.classList.add("shake");

    // 景品抽選
    const prize = getLotteryResultData();

    // 特殊演出抽選
    const specialEffect = rollSpecialEffect(!prize.isLose);
	if (specialEffect) {
		setTimeout(() => {
			btn.classList.remove("disabled");
		}, 3000);
	}
    // 通常演出がある場合だけ
    let normalEffects = null;
    let duration = 3000;

    if (!specialEffect) {

        normalEffects = rollNormalEffects(!prize.isLose);

		startNormalEffects(normalEffects);

        duration = getAnimationDuration(normalEffects);

    }

    // シャッフル開始
    const shuffle = startShuffle(resultDiv);

    setTimeout(() => {

        stopShuffle(shuffle);

        if (normalEffects) {
            stopNormalEffects(normalEffects);
        }
		playSpecialEffect(
			specialEffect,
			resultDiv,
			prize,
			() => {
				btn.disabled = false;
				btn.classList.remove("disabled");
			}
		);
    }, duration);
}

// ================================
// 結果表示
// ================================
function showResult(resultDiv, prize) {

    resultDiv.classList.remove("shake");

    resultDiv.innerText = prize.name;

}