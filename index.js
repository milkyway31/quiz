// routes/index.js

const express = require('express');
const router = express.Router();

// 문제 목록
const historyQuestions = [
    "세계에서 가장 오래된 문명은?",
    "고대 이집트 문명의 대표적인 강은?",
    "고대 그리스의 수도는?",
    "로마 제국의 창건자는?",
    "프랑스 혁명의 중심지로 알려진 도시는?",
    "제1차 세계 대전이 발발한 연도는?",
    "마오쩌둥이 이끈 중국 공산당이 정권을 장악한 연도는?",
    "한국에서 최초로 산업 혁명이 일어난 시기는?",
    "아프리카 대륙에서 유럽 식민지로서 가장 마지막으로 독립한 나라는?",
    "제2차 세계 대전 중 유대인 대항기구의 선언은?"
];

// 정답 목록
const correctAnswers = ["sumer", "나일강", "아테네", "아우구스투스", "파리", "1914", "1949", "1950", "에티오피아", "1942"];

// 메인 페이지 라우트
router.get('/', (req, res) => {
    res.send(`
        <h1>온라인 퀴즈 플랫폼</h1>
        <ul>
            <li><a href="/beginner">초급 퀴즈</a></li>
            <li><a href="/intermediate">중급 퀴즈</a></li>
            <li><a href="/advanced">고급 퀴즈</a></li>
        </ul>
    `);
});

// 초급 퀴즈 페이지 라우트
router.get('/beginner', (req, res) => {
    res.send(`
        <h2>초급 퀴즈 페이지</h2>
        <ul>
            <li><a href="/beginner/history">역사</a></li>
            <li><a href="/beginner/general-knowledge">상식</a></li>
            <li><a href="/beginner/countries">나라</a></li>
        </ul>
    `);
});

// 초급 퀴즈 - 역사 페이지 라우트
router.get('/beginner/history', (req, res) => {
    res.send(`
        <h3>초급 퀴즈 - 역사</h3>
        <form action="/check" method="post">
            <ol>
                ${historyQuestions.map((question, index) => `
                    <li>
                        <p>${question}</p>
                        <input type="text" name="answer${index + 1}" required>
                    </li>`).join('')}
            </ol>
            <button type="submit">제출</button>
        </form>
    `);
});

// 정답 확인 라우트
router.post('/check', (req, res) => {
    const userAnswers = Object.keys(req.body).map(key => req.body[key]);
    let score = 0;
    let correctAnswerIndexes = [];
    let wrongAnswerIndexes = [];

    userAnswers.forEach((answer, index) => {
        if (answer.toLowerCase() === correctAnswers[index]) {
            score++;
            correctAnswerIndexes.push(index);
        } else {
            wrongAnswerIndexes.push(index);
        }
    });

    let resultMessage = `총 ${historyQuestions.length}문제 중 ${score}문제를 맞추셨습니다.`;

    if (wrongAnswerIndexes.length > 0) {
        resultMessage += `<br><br>틀린 문제:<ul>`;
        wrongAnswerIndexes.forEach((index) => {
            resultMessage += `<li>${historyQuestions[index]} - 정답: ${correctAnswers[index]}</li>`;
        });
        resultMessage += `</ul>`;
    }

    res.send(resultMessage);
});

module.exports = router;
