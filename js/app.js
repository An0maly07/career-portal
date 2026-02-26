/* ===================================
   APP.JS — Main Application Controller
   =================================== */

const App = {
  currentPage: "login-page",
  currentUser: null,

  init() {
    this.initParticles();
    this.initNavigation();
    this.initSkillTabs();
    this.initRouter();
    this.checkSession();
  },

  // --- Router (Fix Back Button) ---
  initRouter() {
    window.addEventListener("hashchange", () => {
      const pageId = location.hash.replace("#", "") || (this.currentUser ? "dashboard-page" : "login-page");
      this.navigate(pageId, false);
    });

    // Initial load
    const initialPage = location.hash.replace("#", "") || (this.currentUser ? "dashboard-page" : "login-page");
    if (location.hash) {
      this.navigate(initialPage, false);
    }
  },

  // --- Particle Background (LinkedIn blue dots) ---
  initParticles() {
    const bg = document.getElementById("particles-bg");
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      const size = Math.random() * 3 + 1;
      particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(10, 102, 194, ${Math.random() * 0.2 + 0.05});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 25 + 20}s ease-in-out infinite;
                animation-delay: ${Math.random() * -20}s;
            `;
      bg.appendChild(particle);
    }

    const style = document.createElement("style");
    style.textContent = `
            @keyframes floatParticle {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.15; }
                25% { transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) scale(1.3); opacity: 0.3; }
                50% { transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) scale(0.8); opacity: 0.2; }
                75% { transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) scale(1.1); opacity: 0.25; }
            }
        `;
    document.head.appendChild(style);
  },

  // --- Navigation ---
  initNavigation() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        if (page) location.hash = page;
      });
    });
  },

  navigate(pageId, updateHash = true) {
    if (updateHash) {
      location.hash = pageId;
      return; // hashchange will trigger navigate(pageId, false)
    }

    document
      .querySelectorAll(".page.active")
      .forEach((p) => p.classList.remove("active"));

    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add("active");
      target.style.animation = "none";
      target.offsetHeight;
      target.style.animation = "fadeIn 0.4s ease";
    }

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.dataset.page === pageId);
    });

    const nav = document.querySelector(".main-nav");
    if (nav) {
      nav.style.display = pageId === "login-page" ? "none" : "flex";
    }

    this.currentPage = pageId;

    // Page-specific init
    if (pageId === "dashboard-page")  Dashboard.refresh();
    if (pageId === "careers-page")    {
      Careers.renderPaths();
      if (window.Chatbot) setTimeout(() => Chatbot.showSuggestion("Want to explore a specific career? Click a card!"), 2000);
    }
    if (pageId === "interview-page")  {
      Interview.init();
      if (window.Chatbot) setTimeout(() => Chatbot.showSuggestion("Ready to practice? I can help you with mock questions!"), 2000);
    }
    if (pageId === "progress-page")   Progress.init();
    if (pageId === "community-page")  { Community.init(); }
    if (pageId === "learning-page")   {
      this.renderMyLearning();
      if (window.Chatbot) setTimeout(() => Chatbot.showSuggestion("Keep track of your certificates here!"), 2000);
    }
    if (pageId === "resume-page")    {
      if (window.ResumeBuilder) ResumeBuilder.init();
    }

    // Re-initialize icons for dynamic content
    if (window.lucide) {
      setTimeout(() => lucide.createIcons(), 50);
    }
  },

  // --- Skill Page Tabs ---
  initSkillTabs() {
    document.querySelectorAll(".skill-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        const tabId = tab.dataset.tab;
        // Switch active tab button
        document.querySelectorAll(".skill-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        // Switch active tab content
        document.querySelectorAll(".skill-tab-content").forEach(c => c.classList.add("hidden"));
        const target = document.getElementById(tabId);
        if (target) target.classList.remove("hidden");

        // Lazy init for specific tabs
        if (tabId === "notes-tab") this.loadNotes();
        if (tabId === "discuss-tab") this.loadDiscussion();
        if (tabId === "quiz-inline-tab") this.prepInlineQuiz();
      });
    });
  },

  loadNotes() {
    const skill = Careers.currentSkill;
    if (!skill) return;
    const key = `cl_notes_${skill.id}`;
    const textarea = document.getElementById("skill-notes");
    if (textarea) {
      textarea.value = localStorage.getItem(key) || "";
    }
    const saveBtn = document.getElementById("save-notes-btn");
    if (saveBtn) {
      saveBtn.onclick = () => {
        localStorage.setItem(key, textarea.value);
        App.toast("📝 Notes saved!", "success");
      };
    }
  },

  loadDiscussion() {
    const skill = Careers.currentSkill;
    if (!skill) return;
    Community.loadSkillDiscussion(skill.id, skill.name);

    // Update avatar
    if (App.currentUser) {
      const av = document.getElementById("discuss-avatar");
      if (av) av.textContent = App.currentUser.name.charAt(0).toUpperCase();
    }

    const sendBtn = document.getElementById("discuss-send");
    const input = document.getElementById("discuss-input");
    if (sendBtn && input) {
      // Remove old listener by replacing element
      const newBtn = sendBtn.cloneNode(true);
      sendBtn.parentNode.replaceChild(newBtn, sendBtn);
      newBtn.addEventListener("click", () => Community.postSkillMessage(skill.id));
      input.addEventListener("keydown", e => {
        if (e.key === "Enter") Community.postSkillMessage(skill.id);
      });
    }
  },

  prepInlineQuiz() {
    const skill = Careers.currentSkill;
    if (!skill) return;
    const btn = document.getElementById("inline-start-quiz-btn");
    if (btn) {
      btn.onclick = () => Quiz.startQuiz(skill);
    }
  },

  // --- My Learning Page ---
  renderMyLearning() {
    const container = document.getElementById("my-learning-content");
    if (!container) return;
    const progress = App.getProgress();

    // Collect all skills that have any progress
    const inProgress = [];
    Careers.paths.forEach(career => {
      career.skills.forEach(skill => {
        const watched = progress.watchedVideos.filter(v => v.startsWith(skill.id + "::")). length;
        if (watched > 0) {
          const total = skill.videos.length;
          const pct = Math.round((watched / total) * 100);
          const done = progress.completedSkills.includes(skill.id);
          inProgress.push({ career, skill, watched, total, pct, done });
        }
      });
    });

    if (inProgress.length === 0) {
      container.innerHTML = `
        <div class="empty-learning-state">
          <span>🎓</span>
          <h3>No courses started yet</h3>
          <p>Explore career paths and watch your first video to start tracking your learning here.</p>
          <button class="btn btn-primary" onclick="App.navigate('careers-page')">Explore Career Paths →</button>
        </div>
      `;
      return;
    }

    container.innerHTML = inProgress.map(({ career, skill, watched, total, pct, done }) => `
      <div class="my-learning-card" onclick="Careers.openSkill('${career.id}', '${skill.id}')">
        <div class="mlc-header">
          <span class="mlc-title">${skill.name}</span>
          <span class="mlc-badge">${done ? '✅ Complete' : 'In Progress'}</span>
        </div>
        <div class="mlc-career"><i data-lucide="${career.icon}"></i> ${career.name}</div>
        <div class="mlc-bar"><div class="mlc-fill" style="width:${pct}%"></div></div>
        <div class="mlc-meta">
          <span>${watched}/${total} videos</span>
          <span>${pct}%</span>
        </div>
      </div>
    `).join('');
  },

  // --- Session ---
  checkSession() {
    const user = JSON.parse(localStorage.getItem("career_portal_user"));
    if (user) {
      this.currentUser = user;
      document.getElementById("sidebar-user-name").textContent = user.name;
      document.getElementById("sidebar-profile-img").innerHTML = `<img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0a66c2&color=fff" alt="Profile">`;
      this.navigate("dashboard-page");
      if (window.Chatbot) Chatbot.showWelcome();
    } else {
      this.navigate("login-page");
    }
  },

  onLogin(showTutorial = true) {
    const firstName = this.currentUser.name.split(" ")[0];
    const nameEl = document.getElementById("nav-user-name");
    if (nameEl) nameEl.textContent = firstName;
    const avatarEl = document.getElementById("nav-avatar");
    if (avatarEl) avatarEl.textContent = firstName.charAt(0).toUpperCase();
    document.getElementById("welcome-name").textContent = firstName;
    this.navigate("dashboard-page");

    // Show chatbot welcome
    setTimeout(() => { Chatbot.showWelcome(); }, 1500);

    // Show tutorial on first login
    if (showTutorial) {
      setTimeout(() => { Tutorial.show(); }, 2500);
    }
  },

  onLogout() {
    localStorage.removeItem("cl_user");
    this.currentUser = null;
    this.navigate("login-page");
  },

  // --- Progress ---
  getProgress() {
    const key = `cl_progress_${this.currentUser?.email}`;
    const data = localStorage.getItem(key);
    return data
      ? JSON.parse(data)
      : {
          watchedVideos: [],
          completedSkills: [],
          quizScores: {},
          interviewsDone: 0,
          interviewScores: [],
          achievements: [],
        };
  },

  saveProgress(progress) {
    const key = `cl_progress_${this.currentUser?.email}`;
    localStorage.setItem(key, JSON.stringify(progress));
  },

  // --- Toast ---
  toast(message, type = "info") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    // icon map
    const icons = { success: "✅", error: "❌", warning: "⚠️", info: "ℹ️" };
    toast.innerHTML = `<span class="toast-icon">${icons[type]||"ℹ️"}</span> ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  },

  // --- Confetti ---
  confetti() {
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ["#0a66c2", "#057642", "#f5a623", "#e11d48", "#7c3aed", "#0891b2"];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: Math.random() * 3 + 2,
        vx: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 6 - 3,
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.rotation += p.rotationSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      frame++;
      if (frame < 200) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animate();
  },
};

// --- Dashboard Module ---
const Dashboard = {
  refresh() {
    const progress = App.getProgress();
    document.getElementById("stat-skills").textContent = progress.completedSkills.length;
    document.getElementById("stat-videos").textContent = progress.watchedVideos.length;
    document.getElementById("stat-quizzes").textContent = Object.keys(progress.quizScores || {}).length;
    document.getElementById("stat-interviews").textContent = progress.interviewsDone || 0;

    // Calculate Overall Percent (approximate weighting)
    const totalPossiblePoints = 100; // Say, 10 for each skill completion, etc.
    const currentPoints = (progress.completedSkills.length * 10) + (progress.watchedVideos.length * 0.5);
    const overallPercent = Math.min(99, Math.round(currentPoints)); // Stay below 100 until "done"

    // Update Radial Progress
    const radial = document.getElementById("radial-main");
    const radialText = document.getElementById("radial-main-text");
    const statusText = document.getElementById("overall-status-text");

    if (radial) radial.setAttribute("stroke-dasharray", `${overallPercent}, 100`);
    if (radialText) radialText.textContent = overallPercent + "%";
    
    if (statusText) {
      if (overallPercent === 0) statusText.textContent = "ready to start";
      else if (overallPercent < 20) statusText.textContent = "getting started";
      else if (overallPercent < 50) statusText.textContent = "gaining momentum";
      else statusText.textContent = "moving fast";
    }

    const readinessPercent = Math.min(100, Math.round((currentPoints / 50) * 100)); // Scaled for bar
    document.getElementById("readiness-bar").style.width = readinessPercent + "%";

    this.checkAchievements(progress);
    this.updateContinueLearning(progress);
    this.updateRecommendations();
  },

  checkAchievements(progress) {
    const achievements = document.querySelectorAll(".achievement");
    const checks = [
      progress.watchedVideos.length >= 1,
      Object.keys(progress.quizScores || {}).length >= 1,
      (progress.interviewsDone || 0) >= 1,
      progress.completedSkills.length >= 5,
      progress.watchedVideos.length >= 20,
      Object.keys(progress.quizScores || {}).length >= 5,
    ];

    checks.forEach((unlocked, i) => {
      if (achievements[i]) {
        achievements[i].classList.toggle("locked", !unlocked);
        achievements[i].classList.toggle("unlocked", unlocked);
      }
    });
  },

  updateContinueLearning(progress) {
    const container = document.getElementById("continue-learning-content");
    if (progress.watchedVideos.length > 0) {
      const lastVideo = progress.watchedVideos[progress.watchedVideos.length - 1];
      const parts = lastVideo.split("::");
      container.innerHTML = `
                <div style="padding: 12px 0;">
                    <p style="color: var(--text-secondary); font-size: 14px;">Last watched:</p>
                    <p style="font-weight: 600; margin-top: 4px;">${parts[1] || "Video"} — ${parts[0] || "Skill"}</p>
                    <p style="color: var(--text-muted); font-size: 13px; margin-top: 4px;">${progress.watchedVideos.length} videos completed total</p>
                </div>
            `;
    }
  },

  updateRecommendations() {
    const container = document.getElementById("recommended-content");
    const interest = App.currentUser?.interest;
    if (interest && interest !== "unsure") {
      const career = Careers.paths.find((c) => c.id === interest);
      if (career) {
        container.innerHTML = `
                    <div style="padding: 12px 0;">
                        <p style="color: var(--text-secondary); font-size: 14px;">Based on your interests:</p>
                        <div style="display: flex; align-items: center; gap: 12px; margin-top: 10px; cursor: pointer;" onclick="Careers.openCareer('${career.id}')">
                            <span style="font-size: 32px;">${career.icon}</span>
                            <div>
                                <p style="font-weight: 600;">${career.name}</p>
                                <p style="color: var(--text-muted); font-size: 13px;">${career.skills.length} skills to master</p>
                            </div>
                        </div>
                    </div>
                `;
      }
    }
  },
};

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  App.init();
  document.getElementById("logout-btn").addEventListener("click", () => App.onLogout());
});
