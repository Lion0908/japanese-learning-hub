// Main Application Logic & JSON Data Fetcher
// 負責：單字、文法、慣用句的資料載入與渲染
// 練習題完全交由 exercises.js 處理

(function () {
    'use strict';

    // 將載入的資料存到全域，供 search.js 使用
    window.JLH = window.JLH || {
        vocabData: [],
        grammarData: [],
        idiomsData: []
    };

    document.addEventListener('DOMContentLoaded', function () {
        console.log('Japanese Learning Hub initialized.');

        // 1. 單字專區
        var vocabList = document.getElementById('vocabList');
        if (vocabList) {
            fetch('../data/vocabulary.json')
                .then(function (res) {
                    if (!res.ok) throw new Error('vocabulary.json HTTP ' + res.status);
                    return res.json();
                })
                .then(function (data) {
                    window.JLH.vocabData = Array.isArray(data) ? data : [];
                    renderVocab(window.JLH.vocabData);
                })
                .catch(function (err) {
                    vocabList.innerHTML = '<p class="error-msg">載入單字資料失敗，請稍後再試。</p>';
                    console.error('Error loading vocabulary:', err);
                });
        }

        // 2. 文法專區
        var grammarList = document.getElementById('grammarList');
        if (grammarList) {
            fetch('../data/grammar.json')
                .then(function (res) {
                    if (!res.ok) throw new Error('grammar.json HTTP ' + res.status);
                    return res.json();
                })
                .then(function (data) {
                    window.JLH.grammarData = Array.isArray(data) ? data : [];
                    renderGrammar(window.JLH.grammarData);
                })
                .catch(function (err) {
                    grammarList.innerHTML = '<p class="error-msg">載入文法資料失敗，請稍後再試。</p>';
                    console.error('Error loading grammar:', err);
                });
        }

        // 3. 慣用句專區
        var idiomsList = document.getElementById('idiomsList');
        if (idiomsList) {
            fetch('../data/idioms.json')
                .then(function (res) {
                    if (!res.ok) throw new Error('idioms.json HTTP ' + res.status);
                    return res.json();
                })
                .then(function (data) {
                    window.JLH.idiomsData = Array.isArray(data) ? data : [];
                    renderIdioms(window.JLH.idiomsData);
                })
                .catch(function (err) {
                    idiomsList.innerHTML = '<p class="error-msg">載入慣用句資料失敗，請稍後再試。</p>';
                    console.error('Error loading idioms:', err);
                });
        }
    });

    // ---------- 渲染函式（掛到全域，供 search.js 重用）----------

    function escapeHtml(str) {
        if (str === undefined || str === null) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function levelBadge(level, colorClass) {
        var cls = colorClass || 'level-badge';
        return '<span class="' + cls + '">' + escapeHtml(level || '') + '</span>';
    }

    function renderVocab(data) {
        var container = document.getElementById('vocabList');
        if (!container) return;

        if (!data.length) {
            container.innerHTML = '<p class="empty-msg">沒有符合條件的單字。</p>';
            return;
        }

        container.innerHTML = data.map(function (item) {
            return '' +
                '<div class="item-card">' +
                    levelBadge(item.level) +
                    '<strong class="item-title">' + escapeHtml(item.word) + '</strong>' +
                    '<span class="item-reading">（' + escapeHtml(item.reading) + '）</span>' +
                    (item.partOfSpeech ? '<span class="item-pos">' + escapeHtml(item.partOfSpeech) + '</span>' : '') +
                    '<p class="item-meaning">意思：' + escapeHtml(item.meaning) + '</p>' +
                    (item.example ? '<p class="item-example">例：' + escapeHtml(item.example) + '</p>' : '') +
                    (item.translation ? '<p class="item-translation">譯：' + escapeHtml(item.translation) + '</p>' : '') +
                '</div>';
        }).join('');
    }

    function renderGrammar(data) {
        var container = document.getElementById('grammarList');
        if (!container) return;

        if (!data.length) {
            container.innerHTML = '<p class="empty-msg">沒有符合條件的文法。</p>';
            return;
        }

        container.innerHTML = data.map(function (item) {
            var comparisonHtml = '';
            if (item.comparison && item.comparison.trim() !== '') {
                comparisonHtml = '<div class="item-comparison"><strong>相似文法比較：</strong>' + escapeHtml(item.comparison) + '</div>';
            }
            return '' +
                '<div class="item-card">' +
                    levelBadge(item.level, 'level-badge level-badge-purple') +
                    '<strong class="item-title">' + escapeHtml(item.grammar) + '</strong>' +
                    (item.connection ? '<p class="item-connection">接續：' + escapeHtml(item.connection) + '</p>' : '') +
                    '<p class="item-meaning">意思：' + escapeHtml(item.meaning) + '</p>' +
                    (item.usage ? '<p class="item-usage">說明：' + escapeHtml(item.usage) + '</p>' : '') +
                    (item.example ? '<p class="item-example">例：' + escapeHtml(item.example) + '</p>' : '') +
                    (item.translation ? '<p class="item-translation">譯：' + escapeHtml(item.translation) + '</p>' : '') +
                    comparisonHtml +
                '</div>';
        }).join('');
    }

    function renderIdioms(data) {
        var container = document.getElementById('idiomsList');
        if (!container) return;

        if (!data.length) {
            container.innerHTML = '<p class="empty-msg">沒有符合條件的慣用句。</p>';
            return;
        }

        container.innerHTML = data.map(function (item) {
            return '' +
                '<div class="item-card">' +
                    (item.level ? levelBadge(item.level, 'level-badge level-badge-green') : '') +
                    '<strong class="item-title">' + escapeHtml(item.idiom) + '</strong>' +
                    (item.reading ? '<span class="item-reading">（' + escapeHtml(item.reading) + '）</span>' : '') +
                    '<p class="item-meaning">意思：' + escapeHtml(item.meaning) + '</p>' +
                    (item.usage ? '<p class="item-usage">情境：' + escapeHtml(item.usage) + '</p>' : '') +
                    (item.example ? '<p class="item-example">例：' + escapeHtml(item.example) + '</p>' : '') +
                    (item.translation ? '<p class="item-translation">譯：' + escapeHtml(item.translation) + '</p>' : '') +
                '</div>';
        }).join('');
    }

    // 暴露給 search.js
    window.JLH.renderVocab = renderVocab;
    window.JLH.renderGrammar = renderGrammar;
    window.JLH.renderIdioms = renderIdioms;
    window.JLH.escapeHtml = escapeHtml;
})();