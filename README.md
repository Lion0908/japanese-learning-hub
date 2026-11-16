# Japanese Learning Hub

專為 JLPT N3 與 N2 學習者打造的線上日文知識庫與練習平台。

## 功能特色

- **單字專區**：N3／N2 核心語彙，包含漢字、假名讀音、詞性、中文意思、日文例句與中文翻譯。
- **文法專區**：句型接續、中文解釋、使用說明、日文例句與翻譯，並提供相似文法比較。
- **慣用句專區**：常見日文慣用句，包含原文、讀音、中文意思、使用情境、例句與翻譯。
- **練習題測驗**：完整日文題幹、四選項、作答後顯示正誤、正確答案與中文解析，並顯示作答進度與正確率。

## 程度分類

- N3：中級日文學習內容。
- N2：中高級日文學習內容。

## 搜尋與篩選

單字、文法、慣用句頁面皆支援：

- 關鍵字搜尋（可搜尋原文、讀音、意思、例句等欄位）。
- N3／N2 程度篩選。
- 搜尋與篩選可同時使用，結果取交集。

## 技術

- HTML5
- CSS3
- 原生 JavaScript
- JSON
- GitHub Pages 部署

## 專案結構

```text
japanese-learning-hub/
├── AGENTS.md
├── README.md
├── index.html
├── pages/
│   ├── vocabulary.html
│   ├── grammar.html
│   ├── idioms.html
│   └── exercises.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── search.js
│   └── exercises.js
├── data/
│   ├── vocabulary.json
│   ├── grammar.json
│   ├── idioms.json
│   └── exercises.json
└── assets/
    └── images/