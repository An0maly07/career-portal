/* ===================================
   QUIZ.JS — Quiz Engine
   =================================== */

const Quiz = {
    currentSkill: null,
    questions: [],
    currentIndex: 0,
    score: 0,
    selectedAnswer: null,

    startQuiz(skill) {
        this.currentSkill = skill;
        this.questions = [...skill.quiz];
        this.currentIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;

        document.getElementById('quiz-title').textContent = `📝 Quiz: ${skill.name}`;
        document.getElementById('quiz-total').textContent = this.questions.length;

        App.navigate('quiz-page');
        this.showQuestion();
    },

    showQuestion() {
        const question = this.questions[this.currentIndex];
        if (!question) return;

        this.selectedAnswer = null;
        document.getElementById('quiz-question-num').textContent = this.currentIndex + 1;
        document.getElementById('quiz-question').textContent = question.q;

        // Update quiz progress bar
        const pct = Math.round(((this.currentIndex + 1) / this.questions.length) * 100);
        const pBar = document.getElementById('quiz-progress-fill');
        if (pBar) pBar.style.width = pct + '%';

        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = question.options.map((opt, i) => `
            <div class="quiz-option" onclick="Quiz.selectAnswer(${i})" id="quiz-opt-${i}">
                <strong>${String.fromCharCode(65 + i)}.</strong> ${opt}
            </div>
        `).join('');

        const nextBtn = document.getElementById('quiz-next-btn');
        nextBtn.disabled = true;
        nextBtn.textContent = this.currentIndex === this.questions.length - 1 ? 'Finish Quiz ✓' : 'Next Question →';
        nextBtn.onclick = () => this.nextQuestion();
    },

    selectAnswer(index) {
        if (this.selectedAnswer !== null) return; // Already answered

        this.selectedAnswer = index;
        const question = this.questions[this.currentIndex];
        const correct = question.answer;

        // Highlight answers
        document.querySelectorAll('.quiz-option').forEach((opt, i) => {
            opt.style.pointerEvents = 'none';
            if (i === correct) {
                opt.classList.add('correct');
            }
            if (i === index && i !== correct) {
                opt.classList.add('wrong');
            }
        });

        if (index === correct) {
            this.score++;
        }

        document.getElementById('quiz-next-btn').disabled = false;
    },

    nextQuestion() {
        this.currentIndex++;

        if (this.currentIndex >= this.questions.length) {
            this.showResults();
        } else {
            this.showQuestion();
        }
    },

    showResults() {
        const percent = Math.round((this.score / this.questions.length) * 100);
        const passed = percent >= 70;

        // Update progress
        const progress = App.getProgress();
        progress.quizScores[this.currentSkill.id] = percent;
        App.saveProgress(progress);

        // Navigate to results page
        App.navigate('quiz-results-page');

        // Update UI
        document.getElementById('score-percent').textContent = percent + '%';
        const scoreCircle = document.getElementById('score-circle');
        scoreCircle.className = `score-circle ${passed ? 'pass' : 'fail'}`;

        if (passed) {
            document.getElementById('quiz-results-icon').textContent = '🎉';
            document.getElementById('quiz-results-title').textContent = 'Quiz Passed!';
            document.getElementById('quiz-results-message').textContent = 
                `Amazing! You scored ${this.score}/${this.questions.length}. You've mastered this skill!`;
            
            App.toast('🏆 Quiz Passed! Great work!', 'success');
            
            // Confetti!
            setTimeout(() => App.confetti(), 300);

            // Add Certificate Button
            const resultsActions = document.getElementById('quiz-results-actions');
            if (resultsActions) {
                const certBtn = document.createElement('button');
                certBtn.id = 'claim-cert-btn';
                certBtn.className = 'btn btn-primary';
                certBtn.innerHTML = '<i data-lucide="award"></i> Claim Verified Certificate';
                certBtn.onclick = () => Careers.showCertificate(this.currentSkill.id);
                resultsActions.prepend(certBtn);
                lucide.createIcons();
            }

            // Check skill completion
            // Videos.checkQuizTrigger(this.currentSkill, App.getProgress());

            // Achievement
            const updatedProgress = App.getProgress();
            if (Object.keys(updatedProgress.quizScores).length === 1) {
                App.toast('🏆 Achievement Unlocked: Quiz Master!', 'success');
            }
            if (Object.keys(updatedProgress.quizScores).length === 5) {
                App.toast('🏆 Achievement Unlocked: Brain Power!', 'success');
            }
        } else {
            document.getElementById('quiz-results-icon').textContent = '😔';
            document.getElementById('quiz-results-title').textContent = 'Not quite!';
            document.getElementById('quiz-results-message').textContent = 
                `You scored ${this.score}/${this.questions.length}. You need 70% to pass. Review the videos and try again!`;
        }

        // Button actions
        document.getElementById('quiz-retry-btn').onclick = () => {
            this.startQuiz(this.currentSkill);
        };

        document.getElementById('quiz-continue-btn').onclick = () => {
            if (Careers.currentCareer) {
                Careers.openSkill(Careers.currentCareer.id, this.currentSkill.id);
            } else {
                App.navigate('careers-page');
            }
        };
    }
};
