// ================================
// 景品設定
// ================================
const PRIZES = [
    { name: "赤単色を2倍", weight: 2.0,isLose: false },
    { name: "黒単色を2倍", weight: 2.0,isLose: false },
    { name: "多色を2倍", weight: 2.0,isLose: false },
    { name: "年数×1000", weight: 2.0,isLose: false },
    { name: "Sトリガーなら2倍", weight: 2.0,isLose: false },
    { name: "青単色を2倍", weight: 3.0,isLose: false },
    { name: "お互い追加2枚", weight: 3.0,isLose: false },
    { name: "同値の場合貫通", weight: 3.0,isLose: false },
    { name: "鬼タイム", weight: 3.0,isLose: false },
    { name: "ハイパーモード", weight: 3.0,isLose: false },
    { name: "コスト×1000", weight: 3.0,isLose: false },
    { name: "プラス効果参照", weight: 3.0,isLose: false },
    { name: "マイナス効果参照", weight: 3.0,isLose: false },
    { name: "カード交換", weight: 3.0,isLose: false },
    { name: "ヨビ二オンなら追加1枚", weight: 3.0,isLose: false },
    { name: "💀 はずれ 💀", weight: 60.0 ,isLose: true}
];

// ================================
// 音声
// ================================
const revivalAudio = new Audio("audio/revival.mp3");

// ================================
// 演出設定
// ================================

// ================================
// 通常演出
// ================================
const NORMAL_EFFECTS = [
    {
        type: "sound",
        enabled: true,
        chance: 40,
        file: "audio/bare.mp3"
    },
    {
        type: "longAnimation",
        enabled: true,
        chance: 30,
        duration: 6000
    },
    {
        type: "background",
        enabled: true,
        chance: 30,
        className: "special-background"
    },
    {
        type: "flash",
        enabled: true,
        chance: 30,
        duration: 2000,
        sound: "audio/flash.mp3"
    }
];

// ================================
// 背景色演出用
// ================================
const BACKGROUND_CLASSES = [
    "bg-red",
    "bg-blue",
    "bg-purple",
    "bg-green"
];
let backgroundTimer = null;

// ================================
// 特殊演出
// ================================
const SPECIAL_EFFECTS = [
    {
        type: "revival",
        enabled: true,
        chance: 15,
        sound: "revival.mp3"
    }
];

