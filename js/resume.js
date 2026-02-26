/* ===================================
   RESUME.JS — Resume Builder Module
   =================================== */

const ResumeBuilder = {
  data: {
    contact: { fullName: '', jobTitle: '', email: '', phone: '', location: '', website: '' },
    summary: '',
    experience: [],
    education: [],
    skills: '',
    projects: [],
  },
  sectionOrder: ['contact', 'summary', 'experience', 'education', 'skills', 'projects'],
  currentTemplate: 'classic',

  init() {
    this.loadFromStorage();
    this.populateForm();
    this.renderPreview();
    if (window.lucide) setTimeout(() => lucide.createIcons(), 30);
  },

  // ========================
  //  STORAGE
  // ========================
  getStorageKey() {
    return `cl_resume_${App.currentUser?.email || 'guest'}`;
  },

  saveToStorage() {
    const payload = {
      data: this.data,
      sectionOrder: this.sectionOrder,
      currentTemplate: this.currentTemplate,
    };
    localStorage.setItem(this.getStorageKey(), JSON.stringify(payload));
  },

  loadFromStorage() {
    const saved = localStorage.getItem(this.getStorageKey());
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.data) {
          this.data = {
            contact: { fullName: '', jobTitle: '', email: '', phone: '', location: '', website: '', ...parsed.data.contact },
            summary: parsed.data.summary || '',
            experience: parsed.data.experience || [],
            education: parsed.data.education || [],
            skills: parsed.data.skills || '',
            projects: parsed.data.projects || [],
          };
        }
        this.sectionOrder = parsed.sectionOrder || this.sectionOrder;
        this.currentTemplate = parsed.currentTemplate || 'classic';
      } catch (e) { /* ignore */ }
    }
  },

  // ========================
  //  ADD / REMOVE ENTRIES
  // ========================
  addExperience() {
    this.data.experience.push({ company: '', title: '', startDate: '', endDate: '', bullets: '' });
    this.renderExperienceEntries();
    this.saveToStorage();
    if (window.lucide) setTimeout(() => lucide.createIcons(), 30);
  },

  addEducation() {
    this.data.education.push({ school: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' });
    this.renderEducationEntries();
    this.saveToStorage();
    if (window.lucide) setTimeout(() => lucide.createIcons(), 30);
  },

  addProject() {
    this.data.projects.push({ name: '', tech: '', description: '', link: '' });
    this.renderProjectEntries();
    this.saveToStorage();
    if (window.lucide) setTimeout(() => lucide.createIcons(), 30);
  },

  removeEntry(type, index) {
    if (!this.data[type]) return;
    this.data[type].splice(index, 1);
    if (type === 'experience') this.renderExperienceEntries();
    else if (type === 'education') this.renderEducationEntries();
    else if (type === 'projects') this.renderProjectEntries();
    this.saveToStorage();
    this.renderPreview();
  },

  // ========================
  //  RENDER EDITOR ENTRIES
  // ========================
  renderExperienceEntries() {
    const container = document.getElementById('experience-entries');
    if (!container) return;

    container.innerHTML = this.data.experience.map((exp, i) => `
      <div class="resume-entry-card" data-type="experience" data-index="${i}">
        <button class="resume-entry-remove" title="Remove">&times;</button>
        <div class="form-row">
          <div class="form-group">
            <label>Company</label>
            <input type="text" class="resume-input" data-type="experience" data-index="${i}" data-key="company" value="${this._esc(exp.company)}" placeholder="Google">
          </div>
          <div class="form-group">
            <label>Job Title</label>
            <input type="text" class="resume-input" data-type="experience" data-index="${i}" data-key="title" value="${this._esc(exp.title)}" placeholder="Software Engineer">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Start Date</label>
            <input type="text" class="resume-input" data-type="experience" data-index="${i}" data-key="startDate" value="${this._esc(exp.startDate)}" placeholder="Jan 2022">
          </div>
          <div class="form-group">
            <label>End Date</label>
            <input type="text" class="resume-input" data-type="experience" data-index="${i}" data-key="endDate" value="${this._esc(exp.endDate)}" placeholder="Present">
          </div>
        </div>
        <div class="form-group">
          <label>Bullet Points (one per line)</label>
          <textarea class="resume-input resume-textarea" data-type="experience" data-index="${i}" data-key="bullets" placeholder="Led development of microservices architecture&#10;Reduced API response time by 40%&#10;Mentored 3 junior developers" rows="4">${this._esc(exp.bullets)}</textarea>
        </div>
      </div>
    `).join('');
  },

  renderEducationEntries() {
    const container = document.getElementById('education-entries');
    if (!container) return;

    container.innerHTML = this.data.education.map((edu, i) => `
      <div class="resume-entry-card" data-type="education" data-index="${i}">
        <button class="resume-entry-remove" title="Remove">&times;</button>
        <div class="form-row">
          <div class="form-group">
            <label>School / University</label>
            <input type="text" class="resume-input" data-type="education" data-index="${i}" data-key="school" value="${this._esc(edu.school)}" placeholder="MIT">
          </div>
          <div class="form-group">
            <label>Degree</label>
            <input type="text" class="resume-input" data-type="education" data-index="${i}" data-key="degree" value="${this._esc(edu.degree)}" placeholder="Bachelor of Science">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Field of Study</label>
            <input type="text" class="resume-input" data-type="education" data-index="${i}" data-key="field" value="${this._esc(edu.field)}" placeholder="Computer Science">
          </div>
          <div class="form-group">
            <label>GPA (optional)</label>
            <input type="text" class="resume-input" data-type="education" data-index="${i}" data-key="gpa" value="${this._esc(edu.gpa)}" placeholder="3.8/4.0">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Start Date</label>
            <input type="text" class="resume-input" data-type="education" data-index="${i}" data-key="startDate" value="${this._esc(edu.startDate)}" placeholder="Aug 2018">
          </div>
          <div class="form-group">
            <label>End Date</label>
            <input type="text" class="resume-input" data-type="education" data-index="${i}" data-key="endDate" value="${this._esc(edu.endDate)}" placeholder="May 2022">
          </div>
        </div>
      </div>
    `).join('');
  },

  renderProjectEntries() {
    const container = document.getElementById('project-entries');
    if (!container) return;

    container.innerHTML = this.data.projects.map((proj, i) => `
      <div class="resume-entry-card" data-type="projects" data-index="${i}">
        <button class="resume-entry-remove" title="Remove">&times;</button>
        <div class="form-row">
          <div class="form-group">
            <label>Project Name</label>
            <input type="text" class="resume-input" data-type="projects" data-index="${i}" data-key="name" value="${this._esc(proj.name)}" placeholder="E-Commerce Platform">
          </div>
          <div class="form-group">
            <label>Technologies Used</label>
            <input type="text" class="resume-input" data-type="projects" data-index="${i}" data-key="tech" value="${this._esc(proj.tech)}" placeholder="React, Node.js, MongoDB">
          </div>
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="resume-input resume-textarea" data-type="projects" data-index="${i}" data-key="description" placeholder="Built a full-stack e-commerce platform with user authentication, payment processing, and real-time inventory management." rows="3">${this._esc(proj.description)}</textarea>
        </div>
        <div class="form-group">
          <label>Link (optional)</label>
          <input type="text" class="resume-input" data-type="projects" data-index="${i}" data-key="link" value="${this._esc(proj.link)}" placeholder="github.com/johndoe/project">
        </div>
      </div>
    `).join('');
  },

  // ========================
  //  POPULATE FORM FROM DATA
  // ========================
  populateForm() {
    // Contact fields
    document.querySelectorAll('#section-contact .resume-input').forEach(input => {
      const field = input.dataset.field;
      if (field && this.data.contact[field] !== undefined) {
        input.value = this.data.contact[field];
      }
    });

    // Summary
    const summaryInput = document.querySelector('[data-field="summary"]');
    if (summaryInput) summaryInput.value = this.data.summary || '';

    // Skills
    const skillsInput = document.querySelector('[data-field="skills"]');
    if (skillsInput) skillsInput.value = this.data.skills || '';

    // Dynamic entries
    this.renderExperienceEntries();
    this.renderEducationEntries();
    this.renderProjectEntries();

    // Reorder sections in DOM to match saved order
    const list = document.getElementById('resume-sections-list');
    if (list) {
      this.sectionOrder.forEach(sectionId => {
        const block = list.querySelector(`[data-section="${sectionId}"]`);
        if (block) list.appendChild(block);
      });
    }

    // Set active template button
    document.querySelectorAll('.template-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.template === this.currentTemplate);
    });
  },

  // ========================
  //  BUILD RESUME (Submit)
  // ========================
  buildResume() {
    const c = this.data.contact;
    if (!c.fullName.trim()) {
      App.toast('Please enter your full name to build your resume.', 'warning');
      const nameInput = document.querySelector('[data-field="fullName"]');
      if (nameInput) nameInput.focus();
      return;
    }

    if (!c.email.trim() && !c.phone.trim()) {
      App.toast('Please add at least an email or phone number.', 'warning');
      return;
    }

    // Count filled sections
    const filledSections = [];
    if (c.fullName) filledSections.push('Contact');
    if (this.data.summary.trim()) filledSections.push('Summary');
    if (this.data.experience.some(e => e.company || e.title)) filledSections.push('Experience');
    if (this.data.education.some(e => e.school || e.degree)) filledSections.push('Education');
    if (this.data.skills.trim()) filledSections.push('Skills');
    if (this.data.projects.some(p => p.name)) filledSections.push('Projects');

    this.saveToStorage();
    this.renderPreview();

    // Scroll preview into view on mobile
    const previewPanel = document.querySelector('.resume-preview-panel');
    if (previewPanel && window.innerWidth <= 900) {
      previewPanel.scrollIntoView({ behavior: 'smooth' });
    }

    App.toast(`Resume built with ${filledSections.length} sections: ${filledSections.join(', ')}`, 'success');

    // Flash animation
    const paper = document.getElementById('resume-preview');
    if (paper) {
      paper.style.animation = 'none';
      paper.offsetHeight;
      paper.style.animation = 'resumeBuiltFlash 0.6s ease';
    }
  },

  // ========================
  //  LIVE PREVIEW RENDERING
  // ========================
  renderPreview() {
    const preview = document.getElementById('resume-preview');
    if (!preview) return;

    const d = this.data;
    const hasContent = d.contact.fullName || d.contact.email || d.summary ||
                       d.experience.length > 0 || d.education.length > 0 ||
                       d.skills || d.projects.length > 0;

    if (!hasContent) {
      preview.innerHTML = `
        <div class="resume-empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted)"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          <h3>Your resume preview will appear here</h3>
          <p>Fill in your details on the left, then click <strong>Build Resume</strong> to generate it.</p>
        </div>`;
      return;
    }

    const template = this.currentTemplate;
    let html = `<div class="rv rv-${template}">`;

    this.sectionOrder.forEach(section => {
      switch (section) {
        case 'contact': html += this._previewContact(d, template); break;
        case 'summary': html += this._previewSummary(d); break;
        case 'experience': html += this._previewExperience(d); break;
        case 'education': html += this._previewEducation(d); break;
        case 'skills': html += this._previewSkills(d); break;
        case 'projects': html += this._previewProjects(d); break;
      }
    });

    html += '</div>';
    preview.innerHTML = html;
  },

  _previewContact(d, template) {
    const c = d.contact;
    if (!c.fullName && !c.email && !c.phone) return '';
    const details = [c.email, c.phone, c.location, c.website].filter(Boolean);
    const sep = template === 'minimal' ? '<span class="rv-sep">&bull;</span>' : '<span class="rv-sep">|</span>';
    return `
      <div class="rv-header rv-header-${template}">
        <h1>${this._esc(c.fullName || 'Your Name')}</h1>
        ${c.jobTitle ? `<div class="rv-jobtitle">${this._esc(c.jobTitle)}</div>` : ''}
        ${details.length > 0 ? `<div class="rv-contact-row">${details.map(x => `<span>${this._esc(x)}</span>`).join(sep)}</div>` : ''}
      </div>`;
  },

  _previewSummary(d) {
    if (!d.summary || !d.summary.trim()) return '';
    return `
      <div class="rv-section">
        <div class="rv-section-title">Professional Summary</div>
        <div class="rv-divider"></div>
        <p class="rv-summary-text">${this._esc(d.summary)}</p>
      </div>`;
  },

  _previewExperience(d) {
    const filled = d.experience.filter(e => e.company || e.title || e.bullets);
    if (filled.length === 0) return '';
    return `
      <div class="rv-section">
        <div class="rv-section-title">Work Experience</div>
        <div class="rv-divider"></div>
        ${filled.map(exp => {
          const bullets = (exp.bullets || '').split('\n').filter(b => b.trim());
          const dateStr = [exp.startDate, exp.endDate].filter(Boolean).join(' \u2014 ');
          return `
            <div class="rv-entry">
              <div class="rv-entry-header">
                <div class="rv-entry-left">
                  <div class="rv-entry-title">${this._esc(exp.title || 'Position')}</div>
                  <div class="rv-entry-subtitle">${this._esc(exp.company || 'Company')}</div>
                </div>
                ${dateStr ? `<div class="rv-entry-date">${this._esc(dateStr)}</div>` : ''}
              </div>
              ${bullets.length > 0 ? `<ul class="rv-bullets">${bullets.map(b => `<li>${this._esc(b.replace(/^[•\-\*]\s*/, ''))}</li>`).join('')}</ul>` : ''}
            </div>`;
        }).join('')}
      </div>`;
  },

  _previewEducation(d) {
    const filled = d.education.filter(e => e.school || e.degree);
    if (filled.length === 0) return '';
    return `
      <div class="rv-section">
        <div class="rv-section-title">Education</div>
        <div class="rv-divider"></div>
        ${filled.map(edu => {
          const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(' \u2014 ');
          return `
            <div class="rv-entry">
              <div class="rv-entry-header">
                <div class="rv-entry-left">
                  <div class="rv-entry-title">${this._esc(edu.degree || 'Degree')}${edu.field ? ` in ${this._esc(edu.field)}` : ''}</div>
                  <div class="rv-entry-subtitle">${this._esc(edu.school || 'School')}${edu.gpa ? ` \u2014 GPA: ${this._esc(edu.gpa)}` : ''}</div>
                </div>
                ${dateStr ? `<div class="rv-entry-date">${this._esc(dateStr)}</div>` : ''}
              </div>
            </div>`;
        }).join('')}
      </div>`;
  },

  _previewSkills(d) {
    if (!d.skills || !d.skills.trim()) return '';
    const skillList = d.skills.split(',').map(s => s.trim()).filter(Boolean);
    if (skillList.length === 0) return '';
    return `
      <div class="rv-section">
        <div class="rv-section-title">Skills</div>
        <div class="rv-divider"></div>
        <div class="rv-skills">${skillList.map(s => `<span class="rv-skill-tag">${this._esc(s)}</span>`).join('')}</div>
      </div>`;
  },

  _previewProjects(d) {
    const filled = d.projects.filter(p => p.name || p.description);
    if (filled.length === 0) return '';
    return `
      <div class="rv-section">
        <div class="rv-section-title">Projects</div>
        <div class="rv-divider"></div>
        ${filled.map(proj => `
          <div class="rv-entry">
            <div class="rv-entry-header">
              <div class="rv-entry-left">
                <div class="rv-entry-title">${this._esc(proj.name || 'Project')}${proj.link ? ` <span class="rv-link">${this._esc(proj.link)}</span>` : ''}</div>
                ${proj.tech ? `<div class="rv-entry-subtitle">${this._esc(proj.tech)}</div>` : ''}
              </div>
            </div>
            ${proj.description ? `<p class="rv-project-desc">${this._esc(proj.description)}</p>` : ''}
          </div>
        `).join('')}
      </div>`;
  },

  // ========================
  //  PDF EXPORT
  // ========================
  exportPDF() {
    const preview = document.getElementById('resume-preview');
    if (!preview || !this.data.contact.fullName) {
      App.toast('Please build your resume first before exporting.', 'warning');
      return;
    }
    this.renderPreview();
    App.toast('Generating PDF...', 'info');

    const opt = {
      margin: 0,
      filename: `${this.data.contact.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(preview).save().then(() => {
      App.toast('Resume exported successfully!', 'success');
    }).catch(() => {
      App.toast('Failed to export PDF. Please try again.', 'error');
    });
  },

  // ========================
  //  CLEAR ALL
  // ========================
  clearAll() {
    if (!confirm('Are you sure you want to clear all resume data? This cannot be undone.')) return;
    this.data = {
      contact: { fullName: '', jobTitle: '', email: '', phone: '', location: '', website: '' },
      summary: '',
      experience: [],
      education: [],
      skills: '',
      projects: [],
    };
    this.sectionOrder = ['contact', 'summary', 'experience', 'education', 'skills', 'projects'];
    this.saveToStorage();
    this.populateForm();
    this.renderPreview();
    App.toast('Resume cleared.', 'info');
  },

  // ========================
  //  DRAG AND DROP
  // ========================
  _handleDrag(handle) {
    const list = document.getElementById('resume-sections-list');
    const block = handle.closest('.resume-section-block');
    if (!list || !block) return;

    block.classList.add('dragging');

    const onMove = (e) => {
      const afterEl = this._getDragAfter(list, e.clientY);
      if (afterEl) {
        list.insertBefore(block, afterEl);
      } else {
        list.appendChild(block);
      }
    };

    const onUp = () => {
      block.classList.remove('dragging');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      this.sectionOrder = [...list.children]
        .filter(c => c.dataset && c.dataset.section)
        .map(c => c.dataset.section);
      this.saveToStorage();
      this.renderPreview();
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  },

  _getDragAfter(container, y) {
    const els = [...container.querySelectorAll('.resume-section-block:not(.dragging)')];
    return els.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  },

  // ========================
  //  UTILITY
  // ========================
  _esc(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },
};


/* =========================================================
   GLOBAL EVENT LISTENERS — bound once at script load time
   Uses document-level delegation so it works regardless
   of when init() is called or page visibility.
   ========================================================= */

// --- CLICK events (Add, Remove, Build, Export, Clear, Accordion, Templates, Drag) ---
document.addEventListener('click', function(e) {
  // Only handle clicks inside resume page
  if (!e.target.closest('#resume-page')) return;

  // 1) ADD ENTRY buttons
  var addBtn = e.target.closest('.resume-add-btn');
  if (addBtn) {
    e.preventDefault();
    e.stopPropagation();
    var addType = addBtn.getAttribute('data-add');
    if (addType === 'experience') ResumeBuilder.addExperience();
    else if (addType === 'education') ResumeBuilder.addEducation();
    else if (addType === 'projects') ResumeBuilder.addProject();
    return;
  }

  // 2) REMOVE ENTRY buttons
  var removeBtn = e.target.closest('.resume-entry-remove');
  if (removeBtn) {
    e.preventDefault();
    e.stopPropagation();
    var card = removeBtn.closest('.resume-entry-card');
    if (card) {
      var type = card.getAttribute('data-type');
      var index = parseInt(card.getAttribute('data-index'));
      ResumeBuilder.removeEntry(type, index);
    }
    return;
  }

  // 3) BUILD RESUME button
  if (e.target.closest('#resume-build-btn')) {
    e.preventDefault();
    ResumeBuilder.buildResume();
    return;
  }

  // 4) EXPORT PDF button
  if (e.target.closest('#resume-export-btn')) {
    e.preventDefault();
    ResumeBuilder.exportPDF();
    return;
  }

  // 5) CLEAR button
  if (e.target.closest('#resume-clear-btn')) {
    e.preventDefault();
    ResumeBuilder.clearAll();
    return;
  }

  // 6) TEMPLATE selector buttons
  var tmplBtn = e.target.closest('.template-btn');
  if (tmplBtn) {
    document.querySelectorAll('.template-btn').forEach(function(b) { b.classList.remove('active'); });
    tmplBtn.classList.add('active');
    ResumeBuilder.currentTemplate = tmplBtn.getAttribute('data-template');
    ResumeBuilder.saveToStorage();
    ResumeBuilder.renderPreview();
    return;
  }

  // 7) SECTION HEADER toggles (accordion)
  var header = e.target.closest('.resume-section-header');
  if (header) {
    if (e.target.closest('.resume-section-drag')) return; // don't toggle on drag handle
    var block = header.closest('.resume-section-block');
    if (block) block.classList.toggle('collapsed');
    return;
  }
});

// --- MOUSEDOWN for drag handles ---
document.addEventListener('mousedown', function(e) {
  var dragHandle = e.target.closest('.resume-section-drag');
  if (dragHandle && e.target.closest('#resume-page')) {
    e.preventDefault();
    ResumeBuilder._handleDrag(dragHandle);
  }
});

// --- INPUT events for all resume form fields ---
document.addEventListener('input', function(e) {
  if (!e.target.closest('#resume-page')) return;
  var input = e.target.closest('.resume-input');
  if (!input) return;

  var field = input.getAttribute('data-field');
  var type = input.getAttribute('data-type');

  if (field) {
    // Static fields
    if (field in ResumeBuilder.data.contact) {
      ResumeBuilder.data.contact[field] = input.value;
    } else if (field === 'summary') {
      ResumeBuilder.data.summary = input.value;
    } else if (field === 'skills') {
      ResumeBuilder.data.skills = input.value;
    }
  } else if (type) {
    // Dynamic entry fields
    var index = parseInt(input.getAttribute('data-index'));
    var key = input.getAttribute('data-key');
    if (ResumeBuilder.data[type] && ResumeBuilder.data[type][index] !== undefined && key) {
      ResumeBuilder.data[type][index][key] = input.value;
    }
  }

  ResumeBuilder.saveToStorage();
});
