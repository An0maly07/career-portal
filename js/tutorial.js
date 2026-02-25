/* ===================================
   TUTORIAL.JS — Interactive Onboarding Walkthrough
   =================================== */

const Tutorial = {
    currentStep: 0,
    steps: [
        {
            icon: '👋',
            title: 'Welcome to CareerLaunch!',
            desc: 'Your professional career navigator. In just a few seconds, we\'ll show you how to get the most out of this platform.',
        },
        {
            icon: '🗺️',
            title: 'Explore Career Paths',
            desc: 'Click "Career Paths" in the navigation to browse our curated career tracks. Each path has a structured skill tree to guide you.',
            highlight: '#nav-careers'
        },
        {
            icon: '🎓',
            title: 'Your Active Learning',
            desc: 'The "My Learning" tab tracks your in-progress courses and shows exactly where you left off.',
            highlight: '#nav-learning'
        },
        {
            icon: '📈',
            title: 'Track Your Growth',
            desc: 'The "Progress" tab provides a deep dive into your skills, activity history, and milestones.',
            highlight: '#nav-progress'
        },
        {
            icon: '🎤',
            title: 'Ace the Interview',
            desc: 'Practice with AI-powered interviewers in the "Interviews" tab to get real-time feedback on your performance.',
            highlight: '#nav-interview'
        },
        {
            icon: '💬',
            title: 'Connect with Others',
            desc: 'The "Community" tab is where you can see trending topics, leaderboard rankings, and share your wins.',
            highlight: '#nav-community'
        },
        {
            icon: '🤖',
            title: 'CareerBot is Here to Help',
            desc: 'Need advice? Click the blue robot button to chat with CareerBot about your career goals.',
            highlight: '#chatbot-bubble'
        },
        {
            icon: '🚀',
            title: 'Ready to Launch?',
            desc: 'Your journey starts now. Pick a career path and begin your transformation!',
        },
    ],

    show(forceShow = false) {
        const seen = localStorage.getItem('cl_tutorial_seen');
        if (seen && !forceShow) return;
        this.currentStep = 0;
        this.render();
    },

    render() {
        // Remove existing overlay if any
        const existing = document.getElementById('tutorial-overlay');
        if (existing) existing.remove();

        const step = this.steps[this.currentStep];
        const total = this.steps.length;
        const isLast = this.currentStep === total - 1;

        const dots = this.steps.map((_, i) =>
            `<div class="tutorial-dot ${i === this.currentStep ? 'active' : ''}"></div>`
        ).join('');

        const overlay = document.createElement('div');
        overlay.className = 'tutorial-overlay';
        overlay.id = 'tutorial-overlay';
        overlay.innerHTML = `
            <div class="tutorial-card">
                <div class="tutorial-header">
                    <h2>CareerLaunch Guide</h2>
                    <p>Step ${this.currentStep + 1} of ${total}</p>
                    <div class="tutorial-steps-progress">${dots}</div>
                </div>
                <div class="tutorial-body">
                    <div class="tutorial-step">
                        <span class="tutorial-step-icon">${step.icon}</span>
                        <h3>${step.title}</h3>
                        <p>${step.desc}</p>
                    </div>
                </div>
                <div class="tutorial-footer">
                    <button class="tutorial-skip" id="tutorial-skip">
                        ${isLast ? '' : 'Skip tutorial'}
                    </button>
                    <div class="tutorial-nav">
                        ${this.currentStep > 0
                            ? `<button class="btn btn-ghost btn-small" id="tutorial-prev">← Back</button>`
                            : ''}
                        <button class="btn btn-primary btn-small" id="tutorial-next">
                            ${isLast ? '🚀 Get Started!' : 'Next →'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Apply highlight
        this.clearHighlights();
        if (step.highlight) {
            const target = document.querySelector(step.highlight);
            if (target) {
                target.classList.add('tutorial-highlight');
                // Ensure target is visible
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        this.bindOverlayEvents(overlay, isLast);
    },

    clearHighlights() {
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
        });
    },

    bindOverlayEvents(overlay, isLast) {
        const nextBtn = overlay.querySelector('#tutorial-next');
        const prevBtn = overlay.querySelector('#tutorial-prev');
        const skipBtn = overlay.querySelector('#tutorial-skip');

        nextBtn.addEventListener('click', () => {
            if (isLast) {
                this.close();
            } else {
                this.currentStep++;
                this.render();
            }
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentStep--;
                this.render();
            });
        }

        if (skipBtn) {
            skipBtn.addEventListener('click', () => this.close());
        }

        // Click outside to close (but not on first step)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay && this.currentStep > 0) this.close();
        });
    },

    close() {
        localStorage.setItem('cl_tutorial_seen', '1');
        const overlay = document.getElementById('tutorial-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                overlay.remove();
                this.clearHighlights();
            }, 300);
        }
        App.toast('🚀 Welcome! Start by exploring Career Paths.', 'info');
    },

    reset() {
        localStorage.removeItem('cl_tutorial_seen');
        this.show(true);
    }
};
