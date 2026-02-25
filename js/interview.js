/* ===================================
   INTERVIEW.JS — Virtual Interview Practice
   =================================== */

const Interview = {
    selectedType: null,
    selectedCareer: null,
    questions: [],
    currentIndex: 0,
    answers: [],
    scores: [],

    // --- Question Banks ---
    questionBank: {
        behavioral: [
            { q: "Tell me about yourself and your background.", tips: ["Start with education", "Mention relevant experience", "Show career progression", "End with what you're looking for now"], keywords: ["experience", "education", "skills", "learned", "grew", "achieved", "developed", "passionate"] },
            { q: "What is your greatest strength?", tips: ["Be specific", "Give an example", "Relate to the job"], keywords: ["strength", "skill", "ability", "good at", "excel", "strong", "best", "proficient", "expertise"] },
            { q: "Tell me about a time you faced a challenge at work or school.", tips: ["Use the STAR method", "Describe the situation", "Explain your actions", "Share the result"], keywords: ["challenge", "problem", "difficult", "solved", "overcame", "handled", "managed", "result", "outcome", "situation"] },
            { q: "Where do you see yourself in 5 years?", tips: ["Show ambition", "Align with the company", "Be realistic"], keywords: ["goal", "future", "grow", "develop", "learn", "lead", "advance", "career", "aspire", "plan"] },
            { q: "Why should we hire you?", tips: ["Highlight unique value", "Match skills to requirements", "Show enthusiasm"], keywords: ["value", "unique", "contribute", "skill", "experience", "bring", "offer", "team", "help", "impact"] }
        ],
        technical: {
            web: [
                { q: "Explain the difference between let, const, and var in JavaScript.", tips: ["Scope differences", "Hoisting behavior", "Mutability"], keywords: ["scope", "block", "hoisting", "mutable", "reassign", "function", "global", "const", "let", "var"] },
                { q: "What is the virtual DOM and why is it used in React?", tips: ["Performance optimization", "Diffing algorithm", "Batch updates"], keywords: ["virtual", "dom", "performance", "render", "diff", "update", "real", "efficient", "reconciliation", "batch"] },
                { q: "Explain RESTful API design principles.", tips: ["HTTP methods", "Stateless", "Resource-based URLs"], keywords: ["rest", "http", "get", "post", "put", "delete", "stateless", "resource", "endpoint", "api", "status"] },
                { q: "How would you optimize a slow web page?", tips: ["Image optimization", "Code splitting", "Caching"], keywords: ["optimize", "performance", "cache", "lazy", "minify", "compress", "cdn", "bundle", "load", "speed", "reduce"] },
                { q: "Explain how CSS Flexbox and Grid differ.", tips: ["1D vs 2D", "Use cases", "Alignment"], keywords: ["flex", "grid", "layout", "row", "column", "1d", "2d", "align", "justify", "responsive", "container"] }
            ],
            data: [
                { q: "What is the difference between supervised and unsupervised learning?", tips: ["Labels", "Training data", "Use cases"], keywords: ["supervised", "unsupervised", "label", "training", "classification", "clustering", "regression", "data", "predict"] },
                { q: "How would you handle missing data in a dataset?", tips: ["Drop, fill, or impute", "Understand the data first"], keywords: ["missing", "null", "nan", "drop", "fill", "impute", "mean", "median", "interpolate", "handle"] },
                { q: "Explain what overfitting is and how to prevent it.", tips: ["Training vs test accuracy", "Regularization", "Cross-validation"], keywords: ["overfit", "regularization", "training", "test", "validation", "cross", "dropout", "early", "generalize", "bias", "variance"] },
                { q: "What are the differences between SQL and NoSQL databases?", tips: ["Structure", "Scalability", "Use cases"], keywords: ["sql", "nosql", "relational", "document", "schema", "scale", "structured", "flexible", "table", "collection"] },
                { q: "Walk me through your approach to a data analysis project.", tips: ["Define problem", "Collect data", "EDA", "Model", "Communicate"], keywords: ["data", "analysis", "explore", "clean", "visualize", "model", "insight", "present", "gather", "define", "problem"] }
            ],
            ai: [
                { q: "Explain backpropagation in neural networks.", tips: ["Chain rule", "Gradient descent", "Weight updates"], keywords: ["backprop", "gradient", "chain", "weight", "loss", "forward", "backward", "update", "derivative", "error", "learning"] },
                { q: "What is the transformer architecture?", tips: ["Self-attention", "Positional encoding", "Encoder-decoder"], keywords: ["attention", "transformer", "self-attention", "encoder", "decoder", "position", "token", "parallel", "sequence", "bert", "gpt"] },
                { q: "How would you evaluate a classification model?", tips: ["Accuracy, Precision, Recall, F1", "Confusion matrix"], keywords: ["accuracy", "precision", "recall", "f1", "confusion", "matrix", "auc", "roc", "metric", "evaluate", "true", "false", "positive"] },
                { q: "What is transfer learning and when would you use it?", tips: ["Pretrained models", "Fine-tuning", "Limited data"], keywords: ["transfer", "pretrain", "fine-tune", "model", "feature", "layer", "freeze", "domain", "imagenet", "bert"] },
                { q: "Explain the difference between CNNs and RNNs.", tips: ["Images vs sequences", "Architecture", "Use cases"], keywords: ["cnn", "rnn", "convolutional", "recurrent", "image", "sequence", "filter", "kernel", "lstm", "temporal", "spatial"] }
            ],
            cyber: [
                { q: "What is the CIA triad in cybersecurity?", tips: ["Confidentiality", "Integrity", "Availability"], keywords: ["confidentiality", "integrity", "availability", "cia", "security", "protect", "data", "access", "authorized"] },
                { q: "Explain a SQL injection attack and how to prevent it.", tips: ["Input validation", "Parameterized queries", "ORM"], keywords: ["sql", "injection", "input", "validate", "parameterize", "sanitize", "query", "escape", "prepared", "statement"] },
                { q: "What is the difference between encryption and hashing?", tips: ["Reversibility", "Use cases", "Keys"], keywords: ["encrypt", "hash", "reversible", "one-way", "key", "password", "digest", "cipher", "decrypt", "sha", "aes"] },
                { q: "How would you respond to a security breach?", tips: ["Contain", "Investigate", "Remediate", "Communicate"], keywords: ["incident", "response", "contain", "investigate", "forensic", "log", "patch", "notify", "document", "remediate"] },
                { q: "What is a man-in-the-middle attack?", tips: ["Intercepting communication", "SSL/TLS", "Prevention"], keywords: ["mitm", "intercept", "communication", "ssl", "tls", "certificate", "encrypt", "proxy", "arp", "spoof"] }
            ],
            mobile: [
                { q: "What is the difference between native and cross-platform development?", tips: ["Performance", "Code sharing", "Platform APIs"], keywords: ["native", "cross-platform", "performance", "code", "share", "platform", "api", "swift", "kotlin", "flutter", "react native"] },
                { q: "Explain the mobile app lifecycle.", tips: ["Launch", "Active", "Background", "Terminated"], keywords: ["lifecycle", "launch", "active", "background", "foreground", "pause", "resume", "terminate", "state", "create", "destroy"] },
                { q: "How do you handle offline functionality in mobile apps?", tips: ["Local storage", "Sync", "Caching"], keywords: ["offline", "cache", "local", "storage", "sync", "database", "sqlite", "realm", "queue", "network"] },
                { q: "What is state management in mobile apps?", tips: ["Global state", "Provider/Bloc/Redux", "UI updates"], keywords: ["state", "management", "global", "provider", "bloc", "redux", "context", "store", "update", "ui", "reactive"] },
                { q: "How do you optimize mobile app performance?", tips: ["Lazy loading", "Image optimization", "Memory management"], keywords: ["optimize", "performance", "lazy", "memory", "image", "cache", "load", "render", "reduce", "efficient", "profile"] }
            ],
            cloud: [
                { q: "What is the difference between IaaS, PaaS, and SaaS?", tips: ["Level of abstraction", "Examples", "Responsibility"], keywords: ["iaas", "paas", "saas", "infrastructure", "platform", "software", "service", "manage", "abstraction", "aws", "azure"] },
                { q: "Explain containerization and its benefits.", tips: ["Isolation", "Portability", "Efficiency"], keywords: ["container", "docker", "isolation", "portable", "lightweight", "image", "deploy", "microservice", "virtual", "efficient"] },
                { q: "What is auto-scaling and when would you use it?", tips: ["Load-based", "Cost optimization", "Configuration"], keywords: ["auto-scale", "scale", "load", "traffic", "instance", "cost", "horizontal", "vertical", "demand", "elastic"] },
                { q: "How does a CI/CD pipeline work?", tips: ["Build", "Test", "Deploy", "Automate"], keywords: ["ci", "cd", "build", "test", "deploy", "automate", "pipeline", "integration", "delivery", "continuous", "github"] },
                { q: "What is Infrastructure as Code?", tips: ["Terraform", "CloudFormation", "Version control"], keywords: ["infrastructure", "code", "terraform", "cloudformation", "provision", "automate", "version", "reproducible", "declarative"] }
            ]
        },
        hr: [
            { q: "What are your salary expectations?", tips: ["Research market rates", "Give a range", "Show flexibility"], keywords: ["salary", "range", "market", "research", "flexible", "value", "compensation", "benefit", "negotiable", "fair"] },
            { q: "How do you handle work-life balance?", tips: ["Set boundaries", "Prioritize effectively", "Stay organized"], keywords: ["balance", "boundary", "priority", "organize", "time", "manage", "health", "efficient", "schedule", "focus"] },
            { q: "What kind of work environment do you prefer?", tips: ["Be honest", "Show adaptability", "Mention collaboration"], keywords: ["environment", "team", "collaborate", "remote", "office", "culture", "flexible", "supportive", "communicate", "grow"] },
            { q: "How do you handle feedback and criticism?", tips: ["Show openness", "Give an example", "Growth mindset"], keywords: ["feedback", "criticism", "learn", "improve", "open", "constructive", "grow", "accept", "adapt", "grateful"] },
            { q: "Do you have any questions for us?", tips: ["Ask about team culture", "Growth opportunities", "Company direction"], keywords: ["question", "team", "culture", "growth", "opportunity", "project", "technology", "vision", "challenge", "day"] }
        ]
    },

    init() {
        this.selectedType = null;
        this.selectedCareer = null;

        // Reset UI
        document.getElementById('interview-setup').classList.remove('hidden');
        document.getElementById('interview-session').classList.add('hidden');
        document.getElementById('interview-results').classList.add('hidden');

        // Interview type selection
        document.querySelectorAll('.interview-type-card').forEach(card => {
            card.classList.remove('selected');
            card.onclick = () => {
                document.querySelectorAll('.interview-type-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.selectedType = card.dataset.type;
                this.checkReady();
            };
        });

        // Career selection
        const careerGrid = document.getElementById('interview-career-select');
        careerGrid.innerHTML = Careers.paths.map(career => `
            <div class="interview-career-option" data-career="${career.id}" onclick="Interview.selectCareer('${career.id}', this)">
                <span>${career.icon}</span>
                <small>${career.name}</small>
            </div>
        `).join('');

        document.getElementById('start-interview-btn').disabled = true;
        document.getElementById('start-interview-btn').onclick = () => this.startSession();
    },

    selectCareer(careerId, element) {
        document.querySelectorAll('.interview-career-option').forEach(c => c.classList.remove('selected'));
        element.classList.add('selected');
        this.selectedCareer = careerId;
        this.checkReady();
    },

    checkReady() {
        const btn = document.getElementById('start-interview-btn');
        btn.disabled = !(this.selectedType && this.selectedCareer);
    },

    startSession() {
        // Get questions
        if (this.selectedType === 'behavioral') {
            this.questions = [...this.questionBank.behavioral];
        } else if (this.selectedType === 'hr') {
            this.questions = [...this.questionBank.hr];
        } else {
            const techQuestions = this.questionBank.technical[this.selectedCareer];
            this.questions = techQuestions ? [...techQuestions] : [...this.questionBank.behavioral];
        }

        this.currentIndex = 0;
        this.answers = [];
        this.scores = [];

        // Update UI
        document.getElementById('interview-setup').classList.add('hidden');
        document.getElementById('interview-session').classList.remove('hidden');

        const typeLabels = { behavioral: 'Behavioral Interview', technical: 'Technical Interview', hr: 'HR Round' };
        document.getElementById('interview-type-label').textContent = typeLabels[this.selectedType] || 'Interview';
        document.getElementById('interview-q-total').textContent = this.questions.length;

        // Show first question
        this.showInterviewQuestion();

        // Setup submit
        document.getElementById('submit-answer-btn').onclick = () => this.submitAnswer();
    },

    showInterviewQuestion() {
        const question = this.questions[this.currentIndex];
        document.getElementById('interview-q-num').textContent = this.currentIndex + 1;

        const chat = document.getElementById('interview-chat');

        // Add bot question
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message bot';
        msgDiv.innerHTML = `
            <div class="sender">🤖 AI Interviewer</div>
            <p>${question.q}</p>
        `;
        chat.appendChild(msgDiv);
        chat.scrollTop = chat.scrollHeight;

        // Clear input
        document.getElementById('interview-answer').value = '';
        document.getElementById('interview-answer').focus();
    },

    submitAnswer() {
        const answerText = document.getElementById('interview-answer').value.trim();
        if (!answerText) {
            App.toast('Please type an answer before submitting!', 'error');
            return;
        }

        const question = this.questions[this.currentIndex];
        const chat = document.getElementById('interview-chat');

        // Show user answer
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        userMsg.innerHTML = `
            <div class="sender">You</div>
            <p>${answerText}</p>
        `;
        chat.appendChild(userMsg);

        // Calculate score
        const score = this.evaluateAnswer(answerText, question);
        this.answers.push(answerText);
        this.scores.push(score);

        // Show feedback with typing delay
        setTimeout(() => {
            const feedbackMsg = document.createElement('div');
            feedbackMsg.className = 'chat-message feedback';

            let feedbackText = '';
            if (score >= 80) {
                feedbackText = `✅ Excellent answer! (${score}/100) `;
            } else if (score >= 60) {
                feedbackText = `👍 Good answer! (${score}/100) `;
            } else if (score >= 40) {
                feedbackText = `⚠️ Decent start. (${score}/100) `;
            } else {
                feedbackText = `💡 Needs improvement. (${score}/100) `;
            }

            // Add tips
            const missedTips = question.tips.filter(tip => {
                const tipWords = tip.toLowerCase().split(' ');
                return !tipWords.some(w => answerText.toLowerCase().includes(w));
            });

            if (missedTips.length > 0) {
                feedbackText += `\n\n💡 Tips: Try to also mention: ${missedTips.join(', ')}`;
            }

            feedbackMsg.innerHTML = `
                <div class="sender">📋 Feedback</div>
                <p>${feedbackText}</p>
            `;
            chat.appendChild(feedbackMsg);
            chat.scrollTop = chat.scrollHeight;

            // Next question or results
            if (this.currentIndex < this.questions.length - 1) {
                this.currentIndex++;
                setTimeout(() => this.showInterviewQuestion(), 1500);
            } else {
                setTimeout(() => this.showResults(), 1500);
            }
        }, 800);
    },

    evaluateAnswer(answer, question) {
        const words = answer.toLowerCase().split(/\s+/);
        let score = 0;

        // Length score (max 25)
        if (words.length >= 50) score += 25;
        else if (words.length >= 30) score += 20;
        else if (words.length >= 15) score += 15;
        else if (words.length >= 8) score += 10;
        else score += 5;

        // Keyword matching (max 50)
        const matchedKeywords = question.keywords.filter(kw =>
            answer.toLowerCase().includes(kw.toLowerCase())
        );
        const keywordScore = Math.min(50, Math.round((matchedKeywords.length / question.keywords.length) * 50));
        score += keywordScore;

        // Structure bonus (max 15) - Check for examples, explanations
        const structureIndicators = ['for example', 'because', 'such as', 'i have', 'i believe', 'in my experience', 'specifically', 'additionally', 'furthermore', 'result', 'outcome', 'achieved'];
        const structureMatches = structureIndicators.filter(ind => answer.toLowerCase().includes(ind));
        score += Math.min(15, structureMatches.length * 5);

        // Professionalism bonus (max 10)
        if (answer.length > 100) score += 5;
        if (!answer.includes('idk') && !answer.includes('dunno')) score += 5;

        return Math.min(100, score);
    },

    showResults() {
        const avgScore = Math.round(this.scores.reduce((a, b) => a + b, 0) / this.scores.length);

        // Save progress
        const progress = App.getProgress();
        progress.interviewsDone = (progress.interviewsDone || 0) + 1;
        progress.interviewScores.push(avgScore);
        App.saveProgress(progress);

        // Achievement
        if (progress.interviewsDone === 1) {
            App.toast('🏆 Achievement Unlocked: Interviewer!', 'success');
        }

        // Show results UI
        document.getElementById('interview-session').classList.add('hidden');
        document.getElementById('interview-results').classList.remove('hidden');

        document.getElementById('interview-score-value').textContent = avgScore;

        // Feedback list
        const feedbackList = document.getElementById('interview-feedback-list');
        feedbackList.innerHTML = this.questions.map((q, i) => `
            <div class="feedback-item">
                <strong>Q${i + 1}:</strong> ${q.q}<br>
                <span style="color: ${this.scores[i] >= 70 ? 'var(--color-success)' : 'var(--color-warning)'}">
                    Score: ${this.scores[i]}/100
                </span>
            </div>
        `).join('');

        if (avgScore >= 70) {
            App.confetti();
        }

        // Button actions
        document.getElementById('interview-retry-btn').onclick = () => {
            document.getElementById('interview-chat').innerHTML = '';
            this.init();
        };
    }
};
