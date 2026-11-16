// Exercises & Quiz Logic
// 全權負責練習題：載入 JSON、渲染題目、作答判斷、解析、下一題、進度

(function () {
    'use strict';

    var questions = [];
    var currentIndex = 0;
    var answered = false;
    var correctCount = 0;

    document.addEventListener('DOMContentLoaded', function () {
        var quizContainer = document.getElementById('quizContainer');
        if (!quizContainer) return;

        fetch('../data/exercises.json')
            .then(function (res) {
                if (!res.ok) throw new Error('exercises.json HTTP ' + res.status);
                return res.json();
            })
            .then(function (data) {
                questions = Array.isArray(data) ? data : [];
                if (!questions.length) {
                    quizContainer.innerHTML = '<p class="empty-msg">目前沒有練習題。</p>';
                    return;
                }
                currentIndex = 0;
                correctCount = 0;
                renderQuestion();
            })
            .catch(function (err) {
                quizContainer.innerHTML = '<p class="error-msg">載入練習題失敗，請稍後再試。</p>';
                console.error('Error loading exercises:', err);
            });
    });

    function escapeHtml(str) {
        if (str === undefined || str === null) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function renderQuestion() {
        var quizContainer = document.getElementById('quizContainer');
        if (!quizContainer) return;

        answered = false;
        var q = questions[currentIndex];
        var total = questions.length;

        var optionsHtml = q.options.map(function (opt, i) {
            return '' +
                '<label class="quiz-option" data-index="' + i + '">' +
                    '<input type="radio" name="quizOption" value="' + i + '">' +
                    '<span class="quiz-option-text">' + escapeHtml(opt) + '</span>' +
                '</label>';
        }).join('');

        quizContainer.innerHTML = '' +
            '<div class="quiz-header">' +
                '<span class="quiz-progress">第 ' + (currentIndex + 1) + ' / ' + total + ' 題</span>' +
                '<span class="quiz-score">目前答對：' + correctCount + ' 題</span>' +
            '</div>' +
            '<p class="quiz-question">' + escapeHtml(q.question) + '</p>' +
            '<div class="quiz-options">' + optionsHtml + '</div>' +
            '<div class="quiz-actions">' +
                '<button id="submitAnswer" class="btn-primary">送出答案</button>' +
                '<button id="nextQuestion" class="btn-secondary" style="display:none;">下一題</button>' +
            '</div>' +
            '<div id="quizFeedback" class="quiz-feedback"></div>';

        var submitBtn = document.getElementById('submitAnswer');
        var nextBtn = document.getElementById('nextQuestion');

        submitBtn.addEventListener('click', function () {
            if (answered) return;
            var selected = document.querySelector('input[name="quizOption"]:checked');
            if (!selected) {
                alert('請先選擇一個答案。');
                return;
            }
            checkAnswer(parseInt(selected.value, 10));
        });

        nextBtn.addEventListener('click', function () {
            if (currentIndex < questions.length - 1) {
                currentIndex++;
                renderQuestion();
            } else {
                renderResult();
            }
        });
    }

    function checkAnswer(selectedIndex) {
        answered = true;
        var q = questions[currentIndex];
        var isCorrect = selectedIndex === q.answer;
        if (isCorrect) correctCount++;

        var optionLabels = document.querySelectorAll('.quiz-option');
        optionLabels.forEach(function (label) {
            var idx = parseInt(label.getAttribute('data-index'), 10);
            var input = label.querySelector('input');
            if (input) input.disabled = true;
            if (idx === q.answer) label.classList.add('correct');
            if (idx === selectedIndex && !isCorrect) label.classList.add('wrong');
        });

        var feedback = document.getElementById('quizFeedback');
        var correctText = q.options[q.answer];
        feedback.innerHTML = '' +
            '<p class="' + (isCorrect ? 'feedback-correct' : 'feedback-wrong') + '">' +
                (isCorrect ? '✅ 答對了！' : '❌ 答錯了。') +
            '</p>' +
            '<p class="feedback-answer">正確答案：' + escapeHtml(correctText) + '</p>' +
            (q.explanation ? '<p class="feedback-explanation">解析：' + escapeHtml(q.explanation) + '</p>' : '');

        var submitBtn = document.getElementById('submitAnswer');
        var nextBtn = document.getElementById('nextQuestion');
        if (submitBtn) submitBtn.style.display = 'none';
        if (nextBtn) {
            nextBtn.style.display = 'inline-block';
            nextBtn.textContent = (currentIndex < questions.length - 1) ? '下一題' : '查看結果';
        }

        var scoreEl = document.querySelector('.quiz-score');
        if (scoreEl) scoreEl.textContent = '目前答對：' + correctCount + ' 題';
    }

    function renderResult() {
        var quizContainer = document.getElementById('quizContainer');
        if (!quizContainer) return;
        var total = questions.length;
        var rate = total ? Math.round((correctCount / total) * 100) : 0;

        quizContainer.innerHTML = '' +
            '<div class="quiz-result">' +
                '<h3>測驗完成！</h3>' +
                '<p>答對題數：' + correctCount + ' / ' + total + '</p>' +
                '<p>正確率：' + rate + '%</p>' +
                '<button id="restartQuiz" class="btn-primary">重新開始</button>' +
            '</div>';

        var restartBtn = document.getElementById('restartQuiz');
        if (restartBtn) {
            restartBtn.addEventListener('click', function () {
                currentIndex = 0;
                correctCount = 0;
                renderQuestion();
            });
        }
    }
})();