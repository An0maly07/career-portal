/* ===================================
   CHATBOT.JS — AI Career Assistant
   Understands what the user needs simply
   =================================== */

const Chatbot = {
    isOpen: false,
    messageHistory: [],

    // --- Intent Patterns ---
    // The chatbot understands natural language by matching patterns to intents
    intents: [
        // --- Getting a Job ---
        {
            patterns: ['job', 'get hired', 'get a job', 'find work', 'employment', 'hire me', 'want to work', 'need a job', 'looking for work', 'career', 'profession', 'placement', 'opportunity', 'recruit', 'apply'],
            intent: 'get_job',
            response: (user) => {
                const interest = user?.interest;
                const career = interest && interest !== 'unsure' ? Careers.paths.find(c => c.id === interest) : null;
                let msg = `I can definitely help you get job-ready! Here's my plan for you:\n\n`;
                msg += `1️⃣ **Learn the skills** employers are looking for\n`;
                msg += `2️⃣ **Pass skill quizzes** to prove your knowledge\n`;
                msg += `3️⃣ **Practice interviews** so you're confident\n\n`;
                if (career) {
                    msg += `Since you're interested in **${career.name}**, I recommend starting there!`;
                    return { text: msg, actions: [{ label: `Start ${career.name} →`, action: () => Careers.openCareer(career.id) }, { label: 'Practice Interviews', action: () => App.navigate('interview-page') }] };
                }
                msg += `Let's start by finding the right career path for you!`;
                return { text: msg, actions: [{ label: 'Explore Careers →', action: () => App.navigate('careers-page') }] };
            }
        },
        // --- Learning Skills ---
        {
            patterns: ['learn', 'study', 'course', 'tutorial', 'teach me', 'how to learn', 'new skill', 'skill', 'training', 'education', 'knowledge', 'start learning', 'beginner', 'where to start', 'help me learn', 'want to learn', 'improve'],
            intent: 'learn_skills',
            response: (user) => {
                const progress = App.getProgress();
                let msg = `Great, I love your motivation to learn! 📚\n\n`;

                if (progress.watchedVideos.length > 0) {
                    msg += `You've already watched **${progress.watchedVideos.length} videos** — nice progress!\n\n`;
                    msg += `Keep going by exploring more skills, or try a new career path!`;
                } else {
                    msg += `We have **6 career paths** with curated YouTube videos for every skill level.\n\n`;
                    msg += `Each skill has:\n• 4-5 hand-picked video lessons\n• A quiz after watching\n• Progress tracking\n\n`;
                    msg += `Pick a path and start watching!`;
                }
                return { text: msg, actions: [{ label: 'Browse Career Paths', action: () => App.navigate('careers-page') }] };
            }
        },
        // --- Interview Help ---
        {
            patterns: ['interview', 'practice interview', 'mock interview', 'interview prep', 'interview tips', 'prepare for interview', 'nervous about interview', 'how to interview', 'interview question', 'scared of interview'],
            intent: 'interview_help',
            response: () => {
                let msg = `Don't worry, I've got your back! 🎤\n\n`;
                msg += `Our **Interview Practice** section has:\n\n`;
                msg += `🧠 **Behavioral** — "Tell me about yourself..." type questions\n`;
                msg += `💻 **Technical** — Coding & system design for your career\n`;
                msg += `🤝 **HR Round** — Salary, culture fit questions\n\n`;
                msg += `The AI will evaluate your answer, give you a score, and share tips to improve!\n\n`;
                msg += `**Pro tip:** Practice at least 3 times before a real interview!`;
                return { text: msg, actions: [{ label: 'Start Practicing →', action: () => App.navigate('interview-page') }] };
            }
        },
        // --- Career Advice / Confused ---
        {
            patterns: ['what career', 'which career', 'confused', 'not sure', 'don\'t know what', 'help me choose', 'which path', 'what should i', 'suggest', 'recommend', 'advice', 'guide me', 'lost', 'no idea', 'what to do', 'which field', 'right for me', 'best career'],
            intent: 'career_advice',
            response: () => {
                let msg = `That's totally okay! Let me help you figure it out. 🤔\n\n`;
                msg += `Ask yourself these questions:\n\n`;
                msg += `💻 Do you enjoy building things people use? → **Web/Mobile Dev**\n`;
                msg += `📊 Do you love puzzles and data? → **Data Science**\n`;
                msg += `🤖 Are you fascinated by AI and automation? → **AI/ML**\n`;
                msg += `🔒 Do you want to protect people online? → **Cybersecurity**\n`;
                msg += `📱 Do you love mobile apps? → **Mobile Dev**\n`;
                msg += `☁️ Do you like infrastructure and systems? → **Cloud Computing**\n\n`;
                msg += `Or just browse all paths — you might find something that clicks!`;
                return {
                    text: msg,
                    actions: [
                        { label: '💻 Web Dev', action: () => Careers.openCareer('web') },
                        { label: '📊 Data Science', action: () => Careers.openCareer('data') },
                        { label: '🤖 AI/ML', action: () => Careers.openCareer('ai') },
                        { label: '🔒 Cybersecurity', action: () => Careers.openCareer('cyber') },
                        { label: '📱 Mobile', action: () => Careers.openCareer('mobile') },
                        { label: '☁️ Cloud', action: () => Careers.openCareer('cloud') }
                    ]
                };
            }
        },
        // --- Specific Career Interests ---
        {
            patterns: ['web dev', 'web development', 'website', 'frontend', 'backend', 'full stack', 'html', 'css', 'javascript', 'react', 'node'],
            intent: 'career_web',
            response: () => {
                return {
                    text: `Awesome choice! **Web Development** is one of the most in-demand skills! 💻\n\nYou'll learn HTML, CSS, JavaScript, React, Node.js and more. Let me take you there!`,
                    actions: [{ label: 'Start Web Dev Path →', action: () => Careers.openCareer('web') }]
                };
            }
        },
        {
            patterns: ['data science', 'data analyst', 'data', 'analytics', 'pandas', 'python data', 'statistics', 'visualization'],
            intent: 'career_data',
            response: () => ({
                text: `**Data Science** is hot right now! 📊 Companies need people who can turn data into insights.\n\nYou'll learn Python, Pandas, visualization, and ML basics.`,
                actions: [{ label: 'Start Data Science →', action: () => Careers.openCareer('data') }]
            })
        },
        {
            patterns: ['artificial intelligence', 'machine learning', 'ml', 'deep learning', 'neural', 'ai engineer', 'nlp', 'computer vision', 'chatgpt', 'llm'],
            intent: 'career_ai',
            response: () => ({
                text: `**AI & Machine Learning** — the future is here! 🤖\n\nYou'll learn math foundations, neural networks, NLP, and computer vision. It's challenging but incredibly rewarding!`,
                actions: [{ label: 'Start AI/ML Path →', action: () => Careers.openCareer('ai') }]
            })
        },
        {
            patterns: ['cyber', 'security', 'hacking', 'ethical hacking', 'penetration', 'network security', 'infosec', 'pentest'],
            intent: 'career_cyber',
            response: () => ({
                text: `**Cybersecurity** — protect the digital world! 🔒\n\nYou'll learn networking, Linux, ethical hacking, and cryptography. Huge demand and great salaries!`,
                actions: [{ label: 'Start Cybersecurity →', action: () => Careers.openCareer('cyber') }]
            })
        },
        {
            patterns: ['mobile', 'app dev', 'ios', 'android', 'flutter', 'react native', 'swift', 'kotlin', 'mobile app'],
            intent: 'career_mobile',
            response: () => ({
                text: `**Mobile Development** — build apps millions will use! 📱\n\nLearn Flutter, React Native, Swift, or Kotlin. Cross-platform or native — your choice!`,
                actions: [{ label: 'Start Mobile Dev →', action: () => Careers.openCareer('mobile') }]
            })
        },
        {
            patterns: ['cloud', 'aws', 'azure', 'devops', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'infrastructure', 'server'],
            intent: 'career_cloud',
            response: () => ({
                text: `**Cloud Computing** — the backbone of modern tech! ☁️\n\nLearn AWS, Docker, Kubernetes, and CI/CD. Every company needs cloud engineers!`,
                actions: [{ label: 'Start Cloud Path →', action: () => Careers.openCareer('cloud') }]
            })
        },
        // --- Progress Check ---
        {
            patterns: ['progress', 'how am i doing', 'my stats', 'score', 'dashboard', 'status', 'how far', 'achievement'],
            intent: 'check_progress',
            response: () => {
                const progress = App.getProgress();
                let msg = `Here's your progress so far! 📈\n\n`;
                msg += `📹 Videos watched: **${progress.watchedVideos.length}**\n`;
                msg += `✅ Skills completed: **${progress.completedSkills.length}**\n`;
                msg += `📝 Quizzes passed: **${Object.keys(progress.quizScores).length}**\n`;
                msg += `🎤 Interviews done: **${progress.interviewsDone || 0}**\n\n`;

                if (progress.watchedVideos.length === 0) {
                    msg += `You haven't started yet — let's change that! 🚀`;
                } else if (progress.completedSkills.length >= 3) {
                    msg += `You're doing amazing! Keep this momentum going! 💪`;
                } else {
                    msg += `Good progress! Keep learning and you'll be job-ready soon! 💪`;
                }
                return { text: msg, actions: [{ label: 'View Dashboard', action: () => App.navigate('dashboard-page') }] };
            }
        },
        // --- Quiz Help ---
        {
            patterns: ['quiz', 'test', 'assessment', 'exam', 'take a quiz', 'test my knowledge'],
            intent: 'quiz_help',
            response: () => ({
                text: `📝 Quizzes unlock after you watch **4-5 videos** on any skill!\n\nHere's how it works:\n1. Pick a career path\n2. Choose a skill\n3. Watch the video lessons\n4. After 4+ videos, the quiz button appears\n5. Score 70%+ to pass!\n\nGo learn something and come back for your quiz!`,
                actions: [{ label: 'Start Learning →', action: () => App.navigate('careers-page') }]
            })
        },
        // --- Greeting ---
        {
            patterns: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon', 'sup', 'what\'s up', 'yo', 'hola', 'howdy'],
            intent: 'greeting',
            response: (user) => ({
                text: `Hey ${user?.name?.split(' ')[0] || 'there'}! 👋 I'm your AI career assistant!\n\nI'm here to help you with:\n🎯 Finding the right career path\n📚 Learning new skills\n🎤 Practicing for interviews\n\nJust tell me what you need — even something simple like "I want a job" or "help me learn" works!`,
                actions: []
            })
        },
        // --- Thanks ---
        {
            patterns: ['thanks', 'thank you', 'thx', 'appreciate', 'helpful', 'great help'],
            intent: 'thanks',
            response: () => ({
                text: `You're welcome! 😊 I'm always here to help. Just type anything you need — career advice, learning help, interview prep — I've got you! 💪`,
                actions: []
            })
        },
        // --- Motivation ---
        {
            patterns: ['motivate', 'motivation', 'discouraged', 'giving up', 'too hard', 'can\'t do this', 'feel stuck', 'overwhelmed', 'frustrated', 'tired', 'difficult'],
            intent: 'motivation',
            response: (user) => ({
                text: `Hey ${user?.name?.split(' ')[0] || 'friend'}, I hear you. Learning is tough sometimes. But remember:\n\n🌟 **Every expert was once a beginner**\n💪 **Small steps lead to big changes**\n🎯 **You don't have to be perfect, just consistent**\n\nThe fact that you're here means you're already ahead of most people. Take a break if you need to, then come back. I'll be here! ❤️\n\nStart with just ONE video today. That's it!`,
                actions: [{ label: 'Watch a Quick Video', action: () => App.navigate('careers-page') }]
            })
        },
        // --- Salary / Money ---
        {
            patterns: ['salary', 'money', 'how much', 'pay', 'income', 'earning', 'highest paying', 'well paid'],
            intent: 'salary_info',
            response: () => ({
                text: `Great question! Here are average salary ranges for entry-level positions:\n\n💻 Web Dev: **$55K - $85K**\n📊 Data Science: **$65K - $95K**\n🤖 AI/ML: **$80K - $120K**\n🔒 Cybersecurity: **$60K - $90K**\n📱 Mobile Dev: **$60K - $90K**\n☁️ Cloud: **$70K - $100K**\n\n💡 These go up significantly with experience! The key is to start learning and building projects. Which path interests you?`,
                actions: [{ label: 'Explore All Paths', action: () => App.navigate('careers-page') }]
            })
        },
        // --- How long / Time ---
        {
            patterns: ['how long', 'how much time', 'duration', 'timeline', 'how many months', 'how many weeks', 'when will i'],
            intent: 'timeline',
            response: () => ({
                text: `Good question! Here's a realistic timeline:\n\n📅 **1-2 months**: Complete your first skill path + pass quizzes\n📅 **3-4 months**: Feel comfortable with core skills\n📅 **5-6 months**: Ready for entry-level interviews\n\n⚡ **Pro tips to learn faster:**\n• Watch 1-2 videos daily\n• Take quizzes immediately after learning\n• Practice interviews weekly\n• Build projects alongside learning\n\nConsistency beats speed. Just 30 mins/day can transform your career! 🚀`,
                actions: []
            })
        },
        // --- Navigation Help ---
        {
            patterns: ['how do i', 'where is', 'how to use', 'navigate', 'find', 'use this', 'how does this work', 'help', 'guide'],
            intent: 'navigation',
            response: () => ({
                text: `Here's how to use CareerLaunch:\n\n📊 **Dashboard** — See your progress & stats\n🗺️ **Career Paths** — Browse 6 careers → pick skills → watch videos → take quizzes\n🎤 **Interview Practice** — Choose interview type → answer questions → get AI feedback\n🤖 **Me (Chatbot)** — Ask me anything!\n\n**Quick path:** Career Paths → Pick a career → Click a skill → Watch videos → Take quiz → Practice interview\n\nWhat would you like to do?`,
                actions: [
                    { label: 'Dashboard', action: () => App.navigate('dashboard-page'), highlight: '[data-page="dashboard-page"]' },
                    { label: 'Career Paths', action: () => App.navigate('careers-page'), highlight: '[data-page="careers-page"]' },
                    { label: 'Interview', action: () => App.navigate('interview-page'), highlight: '[data-page="interview-page"]' }
                ]
            })
        }
    ],

    init() {
        // Chat bubble toggle
        document.getElementById('chatbot-bubble').addEventListener('click', () => this.toggle());
        document.getElementById('chatbot-close').addEventListener('click', () => this.toggle());

        // Send message
        document.getElementById('chatbot-send').addEventListener('click', () => this.sendMessage());
        document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Initialize suggestions after a delay
        setTimeout(() => this.showSuggestion("I can help you find the best career path!"), 5000);
    },

    showSuggestion(text) {
        if (this.isOpen) return; // Don't show if already open

        let suggestionBox = document.getElementById('chatbot-suggestion');
        if (!suggestionBox) {
            suggestionBox = document.createElement('div');
            suggestionBox.id = 'chatbot-suggestion';
            suggestionBox.className = 'chatbot-suggestion-bubble';
            document.getElementById('chatbot-bubble').appendChild(suggestionBox);
        }
        
        suggestionBox.innerHTML = `<span>${text}</span> <button onclick="Chatbot.toggle(); event.stopPropagation();">Help</button>`;
        suggestionBox.classList.remove('hidden');
        
        const badge = document.getElementById('chatbot-badge');
        if (badge) {
            badge.textContent = '!';
            badge.classList.remove('hidden');
        }
        
        // Hide after 8 seconds
        setTimeout(() => {
            suggestionBox.classList.add('hidden');
        }, 8000);
    },

    highlightElement(selector, type = 'circle') {
        const el = document.querySelector(selector);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const highlight = document.createElement('div');
        highlight.className = `highlight-${type}`;
        
        if (type === 'circle') {
            const size = Math.max(rect.width, rect.height) * 1.5;
            highlight.style.width = `${size}px`;
            highlight.style.height = `${size}px`;
            highlight.style.left = `${rect.left + rect.width/2 - size/2}px`;
            highlight.style.top = `${rect.top + rect.height/2 - size/2}px`;
        } else {
            highlight.style.left = `${rect.left + rect.width/2 - 15}px`;
            highlight.style.top = `${rect.top - 40}px`;
        }

        document.body.appendChild(highlight);
        setTimeout(() => highlight.remove(), type === 'circle' ? 1500 : 3000);
    },

    toggle() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbot-window');
        const badge = document.getElementById('chatbot-badge');

        if (this.isOpen) {
            window.classList.add('active');
            window.classList.remove('hidden');
            badge.classList.add('hidden');
            const suggestion = document.getElementById('chatbot-suggestion');
            if (suggestion) suggestion.classList.add('hidden');
            document.getElementById('chatbot-input').focus();
        } else {
            window.classList.add('hidden');
        }
    },

    showWelcome() {
        const name = App.currentUser?.name?.split(' ')[0] || 'there';
        const interest = App.currentUser?.interest;

        let welcomeMsg = `Hi ${name}! 👋 I'm **CareerBot**, your AI career assistant.\n\n`;
        welcomeMsg += `I'm here to help with whatever you need — just tell me in your own words!\n\n`;

        if (interest === 'unsure') {
            welcomeMsg += `I see you're not sure what career to pursue yet. That's perfectly fine! Let me help you explore your options. 😊`;
        } else if (interest) {
            const career = Careers.paths.find(c => c.id === interest);
            if (career) {
                welcomeMsg += `I see you're interested in **${career.name}** — great choice! Click below to get started, or ask me anything!`;
            }
        }

        this.addBotMessage(welcomeMsg);

        // Show notification badge
        if (!this.isOpen) {
            document.getElementById('chatbot-badge').classList.remove('hidden');
        }
    },

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const text = input.value.trim();
        if (!text) return;

        // Add user message
        this.addUserMessage(text);
        input.value = '';

        // Process with typing delay
        this.showTyping();
        setTimeout(() => {
            this.removeTyping();
            this.processMessage(text);
        }, 600 + Math.random() * 800);
    },

    processMessage(text) {
        const lowerText = text.toLowerCase();

        // Find the best matching intent
        let bestMatch = null;
        let bestScore = 0;

        for (const intent of this.intents) {
            let score = 0;
            for (const pattern of intent.patterns) {
                if (lowerText.includes(pattern)) {
                    // Weight by pattern length (longer = more specific = better match)
                    score += pattern.length;
                }
            }
            if (score > bestScore) {
                bestScore = score;
                bestMatch = intent;
            }
        }

        if (bestMatch && bestScore > 0) {
            const result = bestMatch.response(App.currentUser);
            this.addBotMessage(result.text, result.actions);
        } else {
            // Fallback — try to help anyway
            this.handleFallback(text);
        }
    },

    handleFallback(text) {
        const lowerText = text.toLowerCase();

        // Check if it's a question
        if (text.includes('?')) {
            this.addBotMessage(
                `That's a great question! While I might not have the exact answer, I can help you with:\n\n🎯 Career guidance and path selection\n📚 Finding YouTube tutorials for any skill\n🎤 Interview preparation\n📊 Tracking your learning progress\n\nTry asking me something like:\n• "Which career is right for me?"\n• "Help me learn web development"\n• "I want to practice interviews"`,
                [
                    { label: 'Career Advice', action: () => { document.getElementById('chatbot-input').value = 'help me choose a career'; this.sendMessage(); }},
                    { label: 'Start Learning', action: () => App.navigate('careers-page') }
                ]
            );
        } else if (lowerText.length < 10) {
            // Very short message — try to understand intent
            this.addBotMessage(
                `I want to help! Could you tell me a bit more? For example:\n\n• "I want to get a job"\n• "Teach me coding"\n• "I'm confused about my career"\n• "Help me prepare for interviews"\n\nI understand simple language — just say what's on your mind! 😊`,
                []
            );
        } else {
            this.addBotMessage(
                `I appreciate you telling me that! Let me point you in the right direction:\n\n📚 **Want to learn?** → Browse our career paths with curated YouTube videos\n🎤 **Need interview help?** → Practice with our AI interviewer\n🤔 **Unsure about career?** → Let me help you choose\n\nJust click a button below or tell me what you need!`,
                [
                    { label: 'Explore Careers', action: () => App.navigate('careers-page') },
                    { label: 'Practice Interview', action: () => App.navigate('interview-page') },
                    { label: 'Career Advice', action: () => { document.getElementById('chatbot-input').value = 'what career is right for me'; this.sendMessage(); }}
                ]
            );
        }
    },

    addUserMessage(text) {
        const container = document.getElementById('chatbot-messages');
        const msg = document.createElement('div');
        msg.className = 'chatbot-msg user';
        msg.textContent = text;
        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;
        this.messageHistory.push({ role: 'user', text });
    },

    addBotMessage(text, actions = []) {
        const container = document.getElementById('chatbot-messages');
        const msg = document.createElement('div');
        msg.className = 'chatbot-msg bot';

        // Format text (support basic markdown)
        let formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');

        msg.innerHTML = formattedText;

        // Add action buttons
        if (actions && actions.length > 0) {
            const actionsDiv = document.createElement('div');
            actionsDiv.style.marginTop = '10px';
            actions.forEach(action => {
                const btn = document.createElement('button');
                btn.className = 'chatbot-action-btn';
                btn.textContent = action.label;
                btn.onclick = () => {
                    action.action();
                    if (action.highlight) {
                        setTimeout(() => this.highlightElement(action.highlight, 'arrow'), 300);
                    }
                    if (this.isOpen) this.toggle(); // Close chatbot when navigating
                };
                actionsDiv.appendChild(btn);
            });
            msg.appendChild(actionsDiv);
        }

        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;
        this.messageHistory.push({ role: 'bot', text });
    },

    showTyping() {
        const container = document.getElementById('chatbot-messages');
        const msg = document.createElement('div');
        msg.className = 'chatbot-msg bot';
        msg.id = 'typing-indicator';
        msg.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;
    },

    removeTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }
};

// Initialize chatbot
document.addEventListener('DOMContentLoaded', () => Chatbot.init());
