# 斗兽棋 (Jungle Chess) · Android

触屏版斗兽棋，人机对战 / 双人同屏，打包成可直接安装的 Android APK。

![platform](https://img.shields.io/badge/platform-Android%205.0%2B-blue)
![game](https://img.shields.io/badge/游戏-斗兽棋-orange)

## 特性

- 🎮 **人机对战**（简单 AI）与 **双人同屏** 两种模式，随时切换
- 📱 **触屏操作**：点选己方棋子 → 点高亮格移动/吃子
- 🧠 **完整规则**：等级吃子、鼠吃象、象不食河鼠、陷阱、兽穴胜利
- ✨ 高亮显示所有合法走法（黄格=可走，红格=可吃）
- 🔒 **完全离线**：不依赖任何网络资源
- 📐 沉浸式全屏，适配竖屏

## 玩法

| 操作 | 说明 |
|------|------|
| 点己方棋子 | 选中，显示所有可走格 |
| 点高亮格 | 移动 / 吃子 |
| 重新开始 | 重置本局 |
| 模式 | 人机 ↔ 双人切换 |

**等级**（强→弱）：象 🐘 8 > 狮 🦁 7 > 虎 🐯 6 > 豹 🐆 5 > 狗 🐶 4 > 狼 🐺 3 > 猫 🐱 2 > 鼠 🐭 1

**胜负**：任一兽进入对方**兽穴**，或吃光对方全部棋子即获胜。

## 规则要点

1. 每回合把己方一子向上/下/左/右移动一格。
2. 可吃等级 **不高于自己** 的敌子（同级可吃）。
3. **鼠可吃象**；**象不能吃河中的鼠**。
4. 仅 **鼠** 能进河；河中鼠可吃岸上鼠。
5. 敌子进入你的**陷阱**后，你任意子都能吃它。
6. 任一兽进对方**兽穴**即胜。

## 构建 APK

依赖：Java 21、aapt、zipalign、apksigner、r8.jar、android.jar（默认取 `/root/androidbuild`，可用环境变量覆盖）。

```bash
bash build.sh
# 产物: releases/jungle-chess.apk
```

可覆盖的环境变量：`SDK` `DR` `AJAR` `R8` `JAVA_HOME` `APKSIGNER` `KS` `KS_ALIAS` `KS_PASS` `OUT`

构建流水线：`aapt(资源) → javac → D8(dex) → aapt(打包) → zipalign → apksigner(签名)`

## 安装

把 `releases/jungle-chess.apk` 传到 Android 手机，点击安装（允许"未知来源"即可）。

## 目录结构

```
jungle-chess-android/
├── web/jungle.html        # 游戏本体（HTML/JS/CSS，离线）
├── android/               # Android 壳工程
│   ├── AndroidManifest.xml
│   ├── src/…/MainActivity.java   # WebView 加载游戏
│   └── res/                      # 资源与图标
├── build.sh               # 一键构建 APK
├── releases/              # 构建产物（jungle-chess.apk）
└── README.md
```

## License

MIT
