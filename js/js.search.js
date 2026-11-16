// Search & Level Filter (可同時作用)
// 依目前頁面容器決定要過濾哪一種資料

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var searchInput = document.getElementById('searchInput');
        var levelFilter = document.getElementById('levelFilter');
        if (!searchInput && !levelFilter) return;

        var pageType = detectPageType();
        if (!pageType) return;

        function applyFilter() {
            var keyword = (searchInput ? searchInput.value : '').trim().toLowerCase();
            var level = levelFilter ? levelFilter.value : 'all';

            var source = getSource(pageType);
            if (!source || !source.length) return;

            var filtered = source.filter(function (item) {
                var levelOk = (level === 'all') || (item.level === level);
                if (!levelOk) return false;
                if (!keyword) return true;
                return matchKeyword(item, keyword, pageType);
            });

            renderByType(pageType, filtered);
        }

        if (searchInput) searchInput.addEventListener('input', applyFilter);
        if (levelFilter) levelFilter.addEventListener('change', applyFilter);

        // 資料是非同步載入，等 main.js 載入後再首次套用
        waitForData(pageType, applyFilter);
    });

    function detectPageType() {
        if (document.getElementById('vocabList')) return 'vocab';
        if (document.getElementById('grammarList')) return 'grammar';
        if (document.getElementById('idiomsList')) return 'idioms';
        return null;
    }

    function getSource(type) {
        if (!window.JLH) return null;
        if (type === 'vocab') return window.JLH.vocabData;
        if (type === 'grammar') return window.JLH.grammarData;
        if (type === 'idioms') return window.JLH.idiomsData;
        return null;
    }

    function renderByType(type, data) {
        if (!window.JLH) return;
        if (type === 'vocab' && window.JLH.renderVocab) window.JLH.renderVocab(data);
        if (type === 'grammar' && window.JLH.renderGrammar) window.JLH.renderGrammar(data);
        if (type === 'idioms' && window.JLH.renderIdioms) window.JLH.renderIdioms(data);
    }

    function matchKeyword(item, keyword, type) {
        var fields = [];
        if (type === 'vocab') {
            fields = [item.word, item.reading, item.meaning, item.partOfSpeech, item.example, item.translation];
        } else if (type === 'grammar') {
            fields = [item.grammar, item.connection, item.meaning, item.usage, item.example, item.translation, item.comparison];
        } else if (type === 'idioms') {
            fields = [item.idiom, item.reading, item.meaning, item.usage, item.example, item.translation];
        }
        return fields.some(function (f) {
            return f && String(f).toLowerCase().indexOf(keyword) !== -1;
        });
    }

    // 等待 main.js 把資料放進 window.JLH（最多等 3 秒）
    function waitForData(type, callback) {
        var tries = 0;
        var maxTries = 30;
        var timer = setInterval(function () {
            var source = getSource(type);
            if (source && source.length) {
                clearInterval(timer);
                callback();
            } else if (++tries >= maxTries) {
                clearInterval(timer);
            }
        }, 100);
    }
})();