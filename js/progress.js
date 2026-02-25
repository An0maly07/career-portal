/* ===================================
   PROGRESS.JS — Progress Tracker Page
   =================================== */

const Progress = {
    init() {
        this.refresh();
    },

    refresh() {
        const progress = App.getProgress();
        const allPaths = Careers.paths;

        // --- Overall Progress ---
        let totalSkills = 0, completedSkills = 0, totalVideos = 0, watchedVideos = 0;
        allPaths.forEach(career => {
            career.skills.forEach(skill => {
                totalSkills++;
                totalVideos += skill.videos.length;
                const watched = progress.watchedVideos.filter(v => v.startsWith(skill.id + '::')).length;
                watchedVideos += watched;
                if (progress.completedSkills.includes(skill.id)) completedSkills++;
            });
        });

        const overallPercent = totalSkills > 0
            ? Math.round(((completedSkills / totalSkills) * 0.6 + (watchedVideos / Math.max(totalVideos,1)) * 0.4) * 100)
            : 0;

        const pEl = document.getElementById('overall-percent');
        const pfEl = document.getElementById('overall-progress-fill');
        if (pEl) pEl.textContent = overallPercent + '%';
        if (pfEl) pfEl.style.width = overallPercent + '%';

        // Milestones
        const milestones = [
            { label: 'First Video',    reached: progress.watchedVideos.length >= 1 },
            { label: '10 Videos',      reached: progress.watchedVideos.length >= 10 },
            { label: 'First Skill',    reached: progress.completedSkills.length >= 1 },
            { label: 'First Quiz',     reached: Object.keys(progress.quizScores||{}).length >= 1 },
            { label: 'Interview Done', reached: (progress.interviewsDone||0) >= 1 },
            { label: '5 Skills',       reached: progress.completedSkills.length >= 5 },
            { label: '20 Videos',      reached: progress.watchedVideos.length >= 20 },
        ];
        const msEl = document.getElementById('progress-milestones');
        if (msEl) msEl.innerHTML = milestones.map(m =>
            `<span class="milestone ${m.reached ? 'reached' : ''}">${m.label}</span>`
        ).join('');

        // --- Per-Career Breakdown ---
        const breakdownEl = document.getElementById('career-progress-breakdown');
        if (breakdownEl) {
            breakdownEl.innerHTML = allPaths.map(career => {
                const total = career.skills.length;
                const done = career.skills.filter(s => progress.completedSkills.includes(s.id)).length;
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;

                const chips = career.skills.map(s => {
                    const isDone = progress.completedSkills.includes(s.id);
                    return `<span class="cpi-skill-chip ${isDone ? 'done' : ''}">${isDone ? '✓ ' : ''}${s.name}</span>`;
                }).join('');

                return `
                    <div class="career-progress-item" onclick="Careers.openCareer('${career.id}')">
                        <div class="cpi-header">
                            <div class="cpi-title"><span>${career.icon}</span>${career.name}</div>
                            <span class="cpi-percent">${done}/${total} skills · ${pct}%</span>
                        </div>
                        <div class="cpi-bar"><div class="cpi-fill" style="width:${pct}%"></div></div>
                        <div class="cpi-skills">${chips}</div>
                    </div>
                `;
            }).join('');
        }

        // --- Activity Tracker (simulated 12-week grid) ---
        const activityEl = document.getElementById('activity-tracker');
        if (activityEl) {
            const totalCells = 84; // 12 weeks × 7 days
            const cells = [];
            const activityScore = Math.min(progress.watchedVideos.length + completedSkills * 3 + (progress.interviewsDone||0) * 5, totalCells * 4);
            let remaining = activityScore;

            for (let i = 0; i < totalCells; i++) {
                let level = 0;
                if (remaining > 0) {
                    level = Math.min(4, Math.ceil(Math.random() * 2));
                    remaining -= level;
                }
                cells.push(`<div class="activity-cell level-${level}" title="Activity day ${i+1}"></div>`);
            }
            activityEl.innerHTML = cells.join('');
        }

        // --- Stats Row ---
        const quizzesPassed = Object.values(progress.quizScores||{}).filter(s => s >= 70).length;
        const achievementsUnlocked = [
            progress.watchedVideos.length >= 1,
            quizzesPassed >= 1,
            (progress.interviewsDone||0) >= 1,
            progress.completedSkills.length >= 5,
            progress.watchedVideos.length >= 20,
            quizzesPassed >= 5,
        ].filter(Boolean).length;

        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        set('ps-videos', progress.watchedVideos.length);
        set('ps-skills', progress.completedSkills.length);
        set('ps-quizzes', quizzesPassed);
        set('ps-interviews', progress.interviewsDone || 0);
        set('ps-achievements', achievementsUnlocked);
    }
};
