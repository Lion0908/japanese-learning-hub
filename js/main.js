// Main Application Logic & JSON Data Fetcher
document.addEventListener('DOMContentLoaded', () => {
    console.log('Japanese Learning Hub initialized.');

    // 1. 單字專區載入
    const vocabList = document.getElementById('vocabList');
    if (vocabList) {
        fetch('../data/vocabulary.json')
            .then(response => response.json())
            .then(data => {
                vocabList.innerHTML = data.map(item => `
                    <div style="padding: 12px; border-bottom: 1px solid #e2e8f0; margin-bottom: 8px;">
                        <span style="background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; font-weight: bold;">${item.level}</span>
                        <strong style="font-size: 1.1rem; margin-left: 8px;">${item.word}</strong> 
                        <span style="color: #64748b;">（${item.reading}）</span>
                        <p style="margin: 4px 0 0 0; color: #334155;">意思：${item.meaning}</p>
                    </div>
                `).join('');
            })
            .catch(error => {
                vocabList.innerHTML = '<p style="color: red;">載入單字資料失敗</p>';
                console.error('Error loading vocabulary:', error);
            });
    }

    // 2. 文法專區載入
    const grammarList = document.getElementById('grammarList');
    if (grammarList) {
        fetch('../data/grammar.json')
            .then(response => response.json())
            .then(data => {
                grammarList.innerHTML = data.map(item => `
                    <div style="padding: 12px; border-bottom: 1px solid #e2e8f0; margin-bottom: 8px;">
                        <span style="background: #f3e8ff; color: #7e22ce; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; font-weight: bold;">${item.level}</span>
                        <strong style="font-size: 1.1rem; margin-left: 8px;">${item.grammar}</strong>
                        <p style="margin: 4px 0 0 0; color: #334155;">解釋：${item.meaning}</p>
                    </div>
                `).join('');
            })
            .catch(error => {
                grammarList.innerHTML = '<p style="color: red;">載入文法資料失敗</p>';
            });
    }

    // 3. 慣用句專區載入
    const idiomsList = document.getElementById('idiomsList');
    if (idiomsList) {
        fetch('../data/idioms.json')
            .then(response => response.json())
            .then(data => {
                idiomsList.innerHTML = data.map(item => `
                    <div style="padding: 12px; border-bottom: 1px solid #e2e8f0; margin-bottom: 8px;">
                        <strong style="font-size: 1.1rem;">${item.idiom}</strong>
                        <p style="margin: 4px 0 0 0; color: #334155;">意思：${item.meaning}</p>
                    </div>
                `).join('');
            })
            .catch(error => {
                idiomsList.innerHTML = '<p style="color: red;">載入慣用句資料失敗</p>';
            });
    }

    // 4. 練習題專區載入
    const quizContainer = document.getElementById('quizContainer');
    if (quizContainer) {
        fetch('../data/exercises.json')
            .then(response => response.json())
            .then(data => {
                quizContainer.innerHTML = data.map((item, index) => `
                    <div style="padding: 15px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 15px;">
                        <p><strong>第 ${index + 1} 題：${item.question}</strong></p>
                        <div style="margin-left: 10px;">
                            ${item.options.map((opt, i) => `<label style="display: block; margin-bottom: 6px; cursor: pointer;"><input type="radio" name="q${index}" value="${i}"> ${opt}</label>`).join('')}
                        </div>
                    </div>
                `).join('');
            })
            .catch(error => {
                quizContainer.innerHTML = '<p style="color: red;">載入練習題失敗</p>';
            });
    }

    // 5. 閱讀測驗載入
    const readingList = document.getElementById('readingList');
    if (readingList) {
        fetch('../data/reading.json')
            .then(response => response.json())
            .then(data => {
                readingList.innerHTML = data.map(item => `
                    <div style="padding: 15px; border-bottom: 1px solid #e2e8f0; margin-bottom: 12px;">
                        <h3 style="margin-top: 0; color: #2563eb;">${item.title}</h3>
                        <p style="line-height: 1.6; color: #334155;">${item.content}</p>
                    </div>
                `).join('');
            })
            .catch(error => {
                readingList.innerHTML = '<p style="color: red;">載入閱讀測驗失敗</p>';
            });
    }

    // 6. 聽力練習載入
    const listeningList = document.getElementById('listeningList');
    if (listeningList) {
        fetch('../data/listening.json')
            .then(response => response.json())
            .then(data => {
                listeningList.innerHTML = data.map(item => `
                    <div style="padding: 15px; border-bottom: 1px solid #e2e8f0; margin-bottom: 12px;">
                        <h3 style="margin-top: 0; color: #2563eb;">${item.title}</h3>
                        <p style="color: #64748b;">音檔檔案：${item.audio}</p>
                        <p style="line-height: 1.6; color: #334155;"><strong>逐字稿：</strong>${item.transcript}</p>
                    </div>
                `).join('');
            })
            .catch(error => {
                listeningList.innerHTML = '<p style="color: red;">載入聽力練習失敗</p>';
            });
    }
});