// ================================
// 抽選シミュレーション
// ================================
function testGame(count = 100000) {

    const prizeResults = {};
    const normalResults = {};
    const specialResults = {};

    // 景品
    PRIZES.forEach(prize => {
        prizeResults[prize.name] = 0;
    });

    // 通常演出
    NORMAL_EFFECTS.forEach(effect => {
        normalResults[effect.type] = 0;
    });

    // 特殊演出
    SPECIAL_EFFECTS.forEach(effect => {
        specialResults[effect.type] = 0;
    });

    let winCount = 0;
    let loseCount = 0;

    for (let i = 0; i < count; i++) {

        // 景品抽選
        const prize = getLotteryResultData();
        prizeResults[prize.name]++;

        if (prize.isLose) {
            loseCount++;
            continue;
        }

        winCount++;

        // 特殊演出
        const special = rollSpecialEffect(true);

        if (special) {
            specialResults[special.type]++;
        } else {

            // 通常演出
            const normal = rollNormalEffects(true);

            NORMAL_EFFECTS.forEach(effect => {
                if (normal[effect.type].enabled) {
                    normalResults[effect.type]++;
                }
            });
        }
    }

    console.log("========== 景品 ==========");
    console.table(
        PRIZES.map(prize => ({
            景品: prize.name,
            回数: prizeResults[prize.name],
            実測値: (prizeResults[prize.name] / count * 100).toFixed(2) + "%"
        }))
    );

    console.log("========== 通常演出 ==========");
    console.table(
        NORMAL_EFFECTS.map(effect => ({
            演出: effect.type,
            発生回数: normalResults[effect.type],
            実測値: (normalResults[effect.type] / count * 100).toFixed(2) + "%"
        }))
    );

    console.log("========== 特殊演出 ==========");
    console.table(
        SPECIAL_EFFECTS.map(effect => ({
            演出: effect.type,
            発生回数: specialResults[effect.type],
            実測値: (specialResults[effect.type] / count * 100).toFixed(2) + "%"
        }))
    );

    console.log("========== 勝敗 ==========");
    console.table([
        {
            当たり: winCount,
            はずれ: loseCount,
            当たり率: (winCount / count * 100).toFixed(2) + "%",
            はずれ率: (loseCount / count * 100).toFixed(2) + "%"
        }
    ]);
}

// ================================
// 抽選シミュレーション(演出)
// ================================
function testEffects(count = 100000) {

    let effectCount = 0;

    const detail = {
        "通常SE": 0,
        "長時間演出": 0,
        "背景変化": 0,
        "暗転": 0,
        "復活": 0
    };

    for (let i = 0; i < count; i++) {

        // 本番と同じ
        const prize = getLotteryResultData();
        const specialEffect = rollSpecialEffect(!prize.isLose);

        if (specialEffect) {

            effectCount++;
            detail["復活"]++;

        } else {

            const normalEffects = rollNormalEffects(!prize.isLose);

            if (normalEffects.sound.enabled) {
                effectCount++;
                detail["通常SE"]++;
            }

            if (normalEffects.longAnimation.enabled) {
                effectCount++;
                detail["長時間演出"]++;
            }

            if (normalEffects.background.enabled) {
                effectCount++;
                detail["背景変化"]++;
            }

            if (normalEffects.flash.enabled) {
                effectCount++;
                detail["暗転"]++;
            }
        }
    }

    console.log("===== 演出シミュレーション =====");
    console.table([
        {
            "演出が1つ以上発生":
                (effectCount / count * 100).toFixed(2) + "%"
        }
    ]);

    console.table(
        Object.entries(detail).map(([name, value]) => ({
            演出: name,
            回数: value,
            発生率: (value / count * 100).toFixed(2) + "%"
        }))
    );
}