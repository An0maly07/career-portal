/* ===================================
   COMMUNITY.JS — Community Feed & Skill Discussion
   =================================== */

const Community = {
    // Seed posts shown to all users
    seedPosts: [
        { author: 'Sarah M.', initials: 'SM', text: '🎉 Just passed my JavaScript quiz with 100%! The video on closures finally clicked for me. Highly recommend rewatching it slowly.', time: '2h ago', likes: 14, liked: false },
        { author: 'Dev Kumar', initials: 'DK', text: '💡 Pro tip for anyone starting Data Science: install Jupyter Notebook and practice every Python concept immediately in a cell. Hands-on beats passive watching every time!', time: '4h ago', likes: 32, liked: false },
        { author: 'Alex Chen', initials: 'AC', text: '🔥 Completed the full Web Development path! It took 3 weeks but so worth it. The React + Node combo section was 🤯', time: '1d ago', likes: 47, liked: false },
        { author: 'Priya R.', initials: 'PR', text: 'Just did my first Technical interview practice session. The AI feedback was super detailed and pointed out I need to work on explaining my thought process. Game changer!', time: '2d ago', likes: 21, liked: false },
        { author: 'Marcus T.', initials: 'MT', text: '🚀 Started the Cloud Computing path today. AWS content is really well organized here. Anyone else working through it?', time: '3d ago', likes: 8, liked: false },
    ],

    userPosts: [],

    init() {
        this.renderCommunityFeed();
        this.renderSidebar();
        this.bindEvents();
    },

    renderCommunityFeed() {
        const postsEl = document.getElementById('community-posts');
        if (!postsEl) return;
        const allPosts = [...this.userPosts, ...this.seedPosts];
        postsEl.innerHTML = allPosts.map((post, i) => this.renderPost(post, i)).join('');
    },

    renderPost(post, index) {
        return `
            <div class="community-post-card" id="community-post-${index}">
                <div class="post-author-row">
                    <div class="profile-avatar small" style="background: ${this.colorForInitials(post.initials)}">${post.initials}</div>
                    <div class="post-author-info">
                        <strong>${post.author}</strong>
                        <span>${post.time}</span>
                    </div>
                </div>
                <p class="post-text">${post.text}</p>
                <div class="post-actions">
                    <button class="post-action-btn ${post.liked ? 'liked' : ''}" onclick="Community.toggleLike(${index})">
                        👍 Like <span>${post.likes}</span>
                    </button>
                    <button class="post-action-btn" onclick="Community.focusReply()">
                        💬 Comment
                    </button>
                    <button class="post-action-btn">
                        ↗ Share
                    </button>
                </div>
            </div>
        `;
    },

    colorForInitials(initials) {
        const colors = [
            'linear-gradient(135deg,#0a66c2,#004182)',
            'linear-gradient(135deg,#057642,#0a8754)',
            'linear-gradient(135deg,#e07b39,#c95f1e)',
            'linear-gradient(135deg,#8b5cf6,#6d28d9)',
            'linear-gradient(135deg,#e11d48,#be123c)',
        ];
        const idx = (initials.charCodeAt(0) + (initials.charCodeAt(1)||0)) % colors.length;
        return colors[idx];
    },

    toggleLike(index) {
        const allPosts = [...this.userPosts, ...this.seedPosts];
        const post = allPosts[index];
        if (!post) return;
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        this.renderCommunityFeed();
    },

    focusReply() {
        const input = document.getElementById('community-post-input');
        if (input) { input.focus(); input.placeholder = 'Write a reply...'; }
    },

    addPost(text) {
        const user = App.currentUser;
        if (!user || !text.trim()) return;
        const name = user.name;
        const initials = name.split(' ').map(w => w[0]).join('').substring(0,2).toUpperCase();
        this.userPosts.unshift({
            author: name,
            initials: initials,
            text: text.trim(),
            time: 'Just now',
            likes: 0,
            liked: false
        });
        this.renderCommunityFeed();
        App.toast('✅ Post shared!', 'success');
    },

    bindEvents() {
        const postBtn = document.getElementById('community-post-btn');
        const postInput = document.getElementById('community-post-input');
        if (postBtn && postInput) {
            postBtn.addEventListener('click', () => {
                this.addPost(postInput.value);
                postInput.value = '';
                postInput.placeholder = 'Share a tip, question, or win! 🎉';
            });
            postInput.addEventListener('keydown', e => {
                if (e.key === 'Enter') {
                    this.addPost(postInput.value);
                    postInput.value = '';
                }
            });
        }

        // Update community avatar
        const user = App.currentUser;
        if (user) {
            const avEl = document.getElementById('community-avatar');
            if (avEl) avEl.textContent = user.name.charAt(0).toUpperCase();
        }
    },

    renderSidebar() {
        // Trending skills
        const trending = [
            { name: 'React.js', count: '2.4k learners' },
            { name: 'Python', count: '1.9k learners' },
            { name: 'AWS Fundamentals', count: '1.2k learners' },
            { name: 'Machine Learning', count: '987 learners' },
            { name: 'Docker', count: '743 learners' },
        ];
        const trendEl = document.getElementById('trending-skills');
        if (trendEl) {
            trendEl.innerHTML = trending.map(t => `
                <div class="trending-skill-item">
                    <span class="trending-skill-name">${t.name}</span>
                    <span class="trending-skill-count">${t.count}</span>
                </div>
            `).join('');
        }

        // Leaderboard (simulated)
        const leaders = [
            { name: 'Alex Chen', score: '4,820 pts', rank: 1 },
            { name: 'Priya R.', score: '3,940 pts', rank: 2 },
            { name: 'Dev Kumar', score: '3,210 pts', rank: 3 },
            { name: 'Sarah M.', score: '2,780 pts', rank: 4 },
            { name: 'Marcus T.', score: '1,950 pts', rank: 5 },
        ];
        const rank_class = ['gold','silver','bronze','',''];
        const lbEl = document.getElementById('leaderboard-list');
        if (lbEl) {
            lbEl.innerHTML = leaders.map((l, i) => `
                <div class="leaderboard-item">
                    <span class="lb-rank ${rank_class[i]}">${l.rank === 1 ? '🥇' : l.rank === 2 ? '🥈' : l.rank === 3 ? '🥉' : l.rank}</span>
                    <span class="lb-name">${l.name}</span>
                    <span class="lb-score">${l.score}</span>
                </div>
            `).join('');
        }
    },

    // Discussion: per-skill mini chat
    skillDiscuss: {},

    loadSkillDiscussion(skillId, skillName) {
        const container = document.getElementById('discuss-messages');
        if (!container) return;

        // Seed messages for a skill if none exist
        if (!this.skillDiscuss[skillId]) {
            this.skillDiscuss[skillId] = [
                { author: 'CareerBot AI', initials: '🤖', text: `Welcome to the ${skillName} discussion! Ask questions, share tips, and help each other learn.`, time: 'Just now' },
            ];
        }
        this.renderSkillMessages(skillId);
    },

    renderSkillMessages(skillId) {
        const container = document.getElementById('discuss-messages');
        if (!container) return;
        const messages = this.skillDiscuss[skillId] || [];
        container.innerHTML = messages.map(msg => `
            <div class="discuss-msg">
                <div class="profile-avatar small" style="background:var(--gradient-primary)">${msg.initials}</div>
                <div class="discuss-msg-body">
                    <div class="discuss-msg-author">${msg.author}</div>
                    <div class="discuss-msg-text">${msg.text}</div>
                    <div class="discuss-msg-time">${msg.time}</div>
                </div>
            </div>
        `).join('');
        container.scrollTop = container.scrollHeight;
    },

    postSkillMessage(skillId) {
        const input = document.getElementById('discuss-input');
        if (!input || !input.value.trim()) return;
        const user = App.currentUser;
        if (!user) return;

        if (!this.skillDiscuss[skillId]) this.skillDiscuss[skillId] = [];
        const initials = user.name.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase();
        this.skillDiscuss[skillId].push({
            author: user.name,
            initials,
            text: input.value.trim(),
            time: 'Just now'
        });
        input.value = '';
        this.renderSkillMessages(skillId);

        // Simulate AI reply after short delay
        setTimeout(() => {
            const replies = [
                "Great question! Keep experimenting with what you've learned — hands-on practice is the fastest way to improve.",
                "That's a common challenge! Try breaking it down into smaller steps and test each one individually.",
                "Excellent insight! This concept connects to what you'll learn in the next skill too.",
                "You're on the right track! Don't hesitate to rewatch the relevant video section if something is unclear.",
                "Good thinking! Community learning is one of the best ways to solidify your understanding.",
            ];
            this.skillDiscuss[skillId].push({
                author: 'CareerBot AI',
                initials: '🤖',
                text: replies[Math.floor(Math.random() * replies.length)],
                time: 'Just now'
            });
            this.renderSkillMessages(skillId);
        }, 1200);
    }
};
