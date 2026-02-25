/* ===================================
   VIDEOS.JS — YouTube Video Integration
   =================================== */

// Related topics per skill
const RELATED_TOPICS = {
    'html-css':        ['CSS Animations', 'CSS Variables', 'Responsive Design', 'Sass/SCSS', 'CSS Grid'],
    'javascript':      ['ES6+ Features', 'Async/Await', 'DOM Events', 'Closures', 'Promises'],
    'react':           ['React Router', 'Redux', 'Context API', 'Next.js', 'React Query'],
    'nodejs':          ['Authentication', 'Databases', 'Middleware', 'REST APIs', 'WebSockets'],
    'fullstack':       ['Deployment', 'CI/CD', 'Auth Systems', 'Cloud Storage', 'Microservices'],
    'python-basics':   ['File Handling', 'OOP in Python', 'List Comprehensions', 'Decorators', 'Modules'],
    'pandas':          ['NumPy', 'Data Cleaning', 'GroupBy Operations', 'Merging DataFrames', 'Time Series'],
    'visualization':   ['Interactive Plots', 'Dashboards', 'Tableau', 'Power BI', 'D3.js'],
    'ml-basics':       ['Feature Engineering', 'Model Evaluation', 'Cross Validation', 'Hyperparameters', 'Pipelines'],
    'math-ai':         ['Gradient Descent', 'Eigenvalues', 'Probability Distributions', 'Bayesian Stats', 'Optimization'],
    'deep-learning':   ['Convolutional Nets', 'Recurrent Nets', 'Transfer Learning', 'GANs', 'Batch Normalization'],
    'nlp':             ['Word Embeddings', 'Attention Mechanism', 'Fine-tuning LLMs', 'Text Preprocessing', 'Named Entity Recognition'],
    'computer-vision': ['Data Augmentation', 'Object Tracking', 'Semantic Segmentation', 'Feature Extraction', 'Anchor Boxes'],
    'networking':      ['Subnetting', 'OSI Model', 'VPN', 'Load Balancing', 'Packet Analysis'],
    'linux-security':  ['Shell Scripting', 'File Permissions', 'SSH Keys', 'Log Analysis', 'Package Management'],
    'ethical-hacking': ['OSINT', 'Social Engineering', 'XSS', 'CSRF', 'Buffer Overflow'],
    'cryptography':    ['Public Key Infrastructure', 'Zero-Knowledge Proofs', 'TLS Handshake', 'JWT Tokens', 'Key Exchange'],
    'flutter':         ['State Management', 'Firebase', 'Animations', 'Navigation', 'Platform Channels'],
    'react-native':    ['AsyncStorage', 'Push Notifications', 'Maps Integration', 'Camera API', 'App Publishing'],
    'swift-ios':       ['Core Data', 'SwiftUI Animation', 'ARKit', 'MapKit', 'In-App Purchases'],
    'kotlin-android':  ['Room Database', 'Hilt Dependency Injection', 'Coroutines', 'WorkManager', 'Play Store Publishing'],
    'aws-basics':      ['IAM Policies', 'VPC Networking', 'Lambda Functions', 'RDS Databases', 'CloudWatch'],
    'docker':          ['Multi-stage Builds', 'Volume Mounts', 'Docker Networks', 'Container Security', 'Registry Management'],
    'kubernetes':      ['Helm Charts', 'Horizontal Pod Autoscaling', 'ConfigMaps', 'Secrets', 'Ingress Controllers'],
    'cicd':            ['Blue-Green Deployment', 'Feature Flags', 'Testing Strategies', 'Infrastructure as Code', 'Monitoring'],
};

const Videos = {
    currentSkill: null,
    watchedInSession: 0,

    loadSkill(skill) {
        this.currentSkill = skill;
        this.watchedInSession = 0;

        const progress = App.getProgress();

        document.getElementById('skill-title').textContent = skill.name;
        this.updateProgress(skill, progress);

        // Reset video player
        document.getElementById('video-player').innerHTML = `
            <div class="video-placeholder">
                <span>🎬</span>
                <p>Select a video to start learning</p>
            </div>
        `;
        document.getElementById('current-video-title').textContent = 'Select a video from the list';

        // Hide related topics until a video is selected
        const relatedEl = document.getElementById('related-topics');
        if (relatedEl) relatedEl.classList.add('hidden');

        // Render video list
        const videoList = document.getElementById('video-list');
        videoList.innerHTML = skill.videos.map((video, i) => {
            const videoKey = `${skill.id}::${video.title}`;
            const isWatched = progress.watchedVideos.includes(videoKey);

            return `
                <div class="video-item ${isWatched ? 'watched' : ''}" 
                     onclick="Videos.playVideo('${video.id}', ${i})" 
                     id="video-item-${i}">
                    <div class="video-num">${isWatched ? '✓' : i + 1}</div>
                    <div class="video-item-info">
                        <div class="video-item-title">${video.title}</div>
                        <div class="video-item-duration" style="font-size:12px;color:var(--text-muted);margin-top:2px;">⏱️ ${video.duration}</div>
                    </div>
                </div>
            `;
        }).join('');

        this.checkQuizTrigger(skill, progress);

        // Reset to videos tab when a new skill loads
        document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.skill-tab-content').forEach(c => c.classList.add('hidden'));
        const firstTab = document.querySelector('.skill-tab[data-tab="videos-tab"]');
        const firstContent = document.getElementById('videos-tab');
        if (firstTab) firstTab.classList.add('active');
        if (firstContent) firstContent.classList.remove('hidden');
    },

    playVideo(videoId, index) {
        const skill = this.currentSkill;
        if (!skill) return;

        const video = skill.videos[index];

        // Extract the real YouTube video ID from the full URL (e.g. ?v=kUMe1FH4CHE)
        let ytId = videoId;
        if (video.youtube) {
            try {
                ytId = new URL(video.youtube).searchParams.get('v') || videoId;
            } catch (e) {
                ytId = videoId;
            }
        }

        // Embed YouTube player
        document.getElementById('video-player').innerHTML = `
            <iframe
                src="https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1"
                title="${video.title}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        `;

        document.getElementById('current-video-title').textContent = video.title;

        // Show related topics
        this.showRelatedTopics(skill.id);

        // Mark active video item
        document.querySelectorAll('.video-item').forEach(item => item.classList.remove('active'));
        const currentItem = document.getElementById(`video-item-${index}`);
        if (currentItem) currentItem.classList.add('active');

        this.markWatched(skill, video, index);
    },

    showRelatedTopics(skillId) {
        const topics = RELATED_TOPICS[skillId] || [];
        if (!topics.length) return;

        const relatedEl = document.getElementById('related-topics');
        const tagsEl = document.getElementById('related-tags-list');
        if (relatedEl && tagsEl) {
            tagsEl.innerHTML = topics.map(t =>
                `<span class="related-tag">${t}</span>`
            ).join('');
            relatedEl.classList.remove('hidden');
        }
    },

    markWatched(skill, video, index) {
        const progress = App.getProgress();
        const videoKey = `${skill.id}::${video.title}`;

        if (!progress.watchedVideos.includes(videoKey)) {
            progress.watchedVideos.push(videoKey);
            App.saveProgress(progress);
            this.watchedInSession++;

            const currentItem = document.getElementById(`video-item-${index}`);
            if (currentItem && !currentItem.classList.contains('watched')) {
                currentItem.classList.add('watched');
                const numEl = currentItem.querySelector('.video-num');
                if (numEl) numEl.textContent = '✓';
            }

            this.updateProgress(skill, progress);

            if (progress.watchedVideos.length === 1) App.toast('🏆 Achievement: First Video watched!', 'success');
            if (progress.watchedVideos.length === 20) App.toast('🏆 Achievement: Binge Learner!', 'success');

            this.checkQuizTrigger(skill, progress);
        }
    },

    updateProgress(skill, progress) {
        const watched = progress.watchedVideos.filter(v => v.startsWith(skill.id + '::')).length;
        const total = skill.videos.length;
        const percent = Math.round((watched / total) * 100);

        document.getElementById('skill-progress-fill').style.width = percent + '%';
        document.getElementById('skill-progress-text').textContent = `${percent}% Complete (${watched}/${total} videos)`;
    },

    checkQuizTrigger(skill, progress) {
        const watched = progress.watchedVideos.filter(v => v.startsWith(skill.id + '::')).length;
        const quizTrigger = document.getElementById('quiz-trigger');
        const hasPassedQuiz = progress.quizScores[skill.id] && progress.quizScores[skill.id] >= 70;

        if (watched >= 3 && !hasPassedQuiz) {
            if (quizTrigger) quizTrigger.classList.remove('hidden');
            const startBtn = document.getElementById('start-quiz-btn');
            if (startBtn) startBtn.onclick = () => Quiz.startQuiz(skill);
            if (this.watchedInSession === 3) App.toast('🧠 Quiz unlocked! Test your knowledge!', 'info');
        } else {
            if (quizTrigger) quizTrigger.classList.add('hidden');
        }

        if (watched >= skill.videos.length && hasPassedQuiz) {
            if (!progress.completedSkills.includes(skill.id)) {
                progress.completedSkills.push(skill.id);
                App.saveProgress(progress);
                App.toast(`✅ Skill Complete: ${skill.name}!`, 'success');
                App.confetti();
            }
        }
    }
};
