// ============================================================
// DigiBouquet - Main Application Logic
// Image-based bouquet with layered greenery + flower cluster
// Steps: 1. Flowers → 2. Greenery → 3. Card → 4. Message → 5. Theme
// ============================================================

(function () {
    'use strict';

    // State
    const state = {
        currentStep: 1,
        selectedFlowers: [],
        selectedGreenery: 'greenery1',
        selectedCard: 'classic',
        recipientName: '',
        senderName: '',
        cardMessage: '',
        selectedBackground: 'soft-blush'
    };

    // Check if we're on the reveal page
    const urlParams = new URLSearchParams(window.location.search);
    const bouquetData = urlParams.get('b');

    if (bouquetData) {
        showRevealPage(bouquetData);
        return;
    }

    // ---- Initialize Builder ----
    initFlowerGrid();
    initGreeneryGrid();
    initCardTemplates();
    initCardForm();
    initBackgroundGrid();
    initNavigation();

    // ---- Step 1: Flower Selection ----
    function initFlowerGrid() {
        const grid = document.getElementById('flowerGrid');
        FLOWERS.forEach((flower, i) => {
            const card = document.createElement('div');
            card.className = 'flower-card';
            card.dataset.id = flower.id;
            card.style.animationDelay = `${i * 0.08}s`;
            card.innerHTML = `
                <div class="flower-display">
                    <img src="${flower.image}" alt="${flower.name}" class="flower-preview-img" draggable="false">
                </div>
                <div class="flower-name">${flower.name}</div>
                <div class="flower-check">&#10003;</div>
            `;
            card.addEventListener('click', () => toggleFlower(flower.id, card));
            grid.appendChild(card);
        });
    }

    function toggleFlower(id, card) {
        const idx = state.selectedFlowers.indexOf(id);
        if (idx > -1) {
            state.selectedFlowers.splice(idx, 1);
            card.classList.remove('selected');
        } else {
            state.selectedFlowers.push(id);
            card.classList.add('selected');
        }
        document.getElementById('btnNext1').disabled = state.selectedFlowers.length < 3;
    }

    // ---- Step 2: Greenery Selection ----
    function initGreeneryGrid() {
        const grid = document.getElementById('greeneryGrid');
        GREENERY.forEach((g, i) => {
            const card = document.createElement('div');
            card.className = 'greenery-option' + (g.id === state.selectedGreenery ? ' selected' : '');
            card.dataset.id = g.id;
            card.style.animationDelay = `${i * 0.08}s`;
            card.innerHTML = `
                <div class="greenery-display">
                    <img src="${g.image}" alt="${g.name}" class="greenery-preview-img" draggable="false">
                </div>
                <div class="greenery-name">${g.name}</div>
            `;
            card.addEventListener('click', () => selectGreenery(g.id));
            grid.appendChild(card);
        });
    }

    function selectGreenery(id) {
        state.selectedGreenery = id;
        document.querySelectorAll('.greenery-option').forEach(c => {
            c.classList.toggle('selected', c.dataset.id === id);
        });
    }

    // ---- Step 3: Card Templates ----
    function initCardTemplates() {
        const grid = document.getElementById('cardTemplateGrid');
        CARD_TEMPLATES.forEach((tmpl, i) => {
            const card = document.createElement('div');
            card.className = 'card-template-option' + (tmpl.id === state.selectedCard ? ' selected' : '');
            card.dataset.id = tmpl.id;
            card.style.animationDelay = `${i * 0.08}s`;

            card.innerHTML = `
                <div class="card-template-preview" style="background:${tmpl.bgStyle}; border-color:${tmpl.borderColor}; color:${tmpl.textColor};">
                    <div class="card-tmpl-effect" data-effect="${tmpl.effect}"></div>
                    <span class="card-tmpl-name" style="color:${tmpl.accentColor};">To: You</span>
                    <span class="card-tmpl-msg" style="color:${tmpl.textColor};">Your message...</span>
                    <span class="card-tmpl-from" style="color:${tmpl.accentColor};">With love</span>
                </div>
                <div class="option-name">${tmpl.name}</div>
            `;
            card.addEventListener('click', () => selectCardTemplate(tmpl.id));
            grid.appendChild(card);
        });
    }

    function selectCardTemplate(id) {
        state.selectedCard = id;
        document.querySelectorAll('.card-template-option').forEach(c => {
            c.classList.toggle('selected', c.dataset.id === id);
        });
        applyCardTemplatePreview();
    }

    function applyCardTemplatePreview() {
        const tmpl = CARD_TEMPLATES.find(t => t.id === state.selectedCard);
        if (!tmpl) return;
        const inner = document.getElementById('cardPreviewInner');
        if (!inner) return;
        inner.style.background = tmpl.bgStyle;
        inner.style.borderColor = tmpl.borderColor;
        inner.style.color = tmpl.textColor;
        inner.querySelectorAll('.card-to, .card-from').forEach(el => {
            el.style.color = tmpl.accentColor;
        });
        inner.querySelector('.card-message').style.color = tmpl.textColor;
    }

    // ---- Step 4: Card Form ----
    function initCardForm() {
        const recipientInput = document.getElementById('recipientName');
        const senderInput = document.getElementById('senderName');
        const messageInput = document.getElementById('cardMessage');
        const charCount = document.getElementById('charCount');

        recipientInput.addEventListener('input', () => {
            state.recipientName = recipientInput.value;
            document.getElementById('previewTo').textContent = recipientInput.value || '...';
            updateCreateButton();
        });

        senderInput.addEventListener('input', () => {
            state.senderName = senderInput.value;
            document.getElementById('previewFrom').textContent = senderInput.value || '...';
            updateCreateButton();
        });

        messageInput.addEventListener('input', () => {
            state.cardMessage = messageInput.value;
            document.getElementById('previewMessage').textContent = messageInput.value || 'Your message here...';
            charCount.textContent = messageInput.value.length;
            updateCreateButton();
        });
    }

    function updateCreateButton() {
        const btnNext4 = document.getElementById('btnNext4');
        btnNext4.disabled = !state.recipientName.trim() || !state.senderName.trim() || !state.cardMessage.trim();
    }

    // ---- Navigation (5 steps) ----
    function initNavigation() {
        document.getElementById('btnNext1').addEventListener('click', () => goToStep(2));
        document.getElementById('btnBack2').addEventListener('click', () => goToStep(1));
        document.getElementById('btnNext2').addEventListener('click', () => goToStep(3));
        document.getElementById('btnBack3').addEventListener('click', () => goToStep(2));
        document.getElementById('btnNext3').addEventListener('click', () => {
            applyCardTemplatePreview();
            goToStep(4);
        });
        document.getElementById('btnBack4').addEventListener('click', () => goToStep(3));
        document.getElementById('btnNext4').addEventListener('click', () => goToStep(5));
        document.getElementById('btnBack5').addEventListener('click', () => goToStep(4));
        document.getElementById('btnCreate').addEventListener('click', createBouquet);
        document.getElementById('btnCopy').addEventListener('click', copyShareLink);

        updateCreateButton();
    }

    function goToStep(step) {
        document.querySelectorAll('.step').forEach(s => s.classList.remove('step-active'));
        document.getElementById('step' + step).classList.add('step-active');
        state.currentStep = step;

        const totalSteps = 5;
        document.querySelectorAll('.progress-step').forEach(s => {
            const sNum = parseInt(s.dataset.step);
            s.classList.toggle('active', sNum <= step);
            s.classList.toggle('completed', sNum < step);
        });
        document.getElementById('progressFill').style.width = ((step - 1) / (totalSteps - 1) * 100) + '%';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ---- Create Bouquet & Share Link ----
    function createBouquet() {
        const data = {
            f: state.selectedFlowers,
            g: state.selectedGreenery,
            c: state.selectedCard,
            to: state.recipientName,
            fr: state.senderName,
            m: state.cardMessage,
            bg: state.selectedBackground
        };

        const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
        const url = window.location.origin + window.location.pathname + '?b=' + encoded;

        document.getElementById('shareLink').value = url;

        // Hide progress bar
        document.getElementById('progressBar').style.display = 'none';

        // Render bouquet on ready page
        renderBouquet(state.selectedFlowers, state.selectedGreenery, document.getElementById('readyBouquet'));
        renderCard(state.recipientName, state.cardMessage, state.senderName, state.selectedCard, document.getElementById('readyCard'));

        // Apply background to ready page
        const readyPage = document.getElementById('step6');
        applyBackground(state.selectedBackground, readyPage);

        // Show step 6 (ready page)
        document.querySelectorAll('.step').forEach(s => s.classList.remove('step-active'));
        document.getElementById('step6').classList.add('step-active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function copyShareLink() {
        const input = document.getElementById('shareLink');
        input.select();
        navigator.clipboard.writeText(input.value).then(() => {
            const feedback = document.getElementById('copyFeedback');
            feedback.classList.add('visible');
            setTimeout(() => feedback.classList.remove('visible'), 2000);
        });
    }

    // ---- Step 5: Background & Audio ----
    function initBackgroundGrid() {
        const grid = document.getElementById('bgTemplateGrid');
        BACKGROUND_TEMPLATES.forEach((bg, i) => {
            const card = document.createElement('div');
            card.className = 'bg-template-option' + (bg.id === state.selectedBackground ? ' selected' : '');
            card.dataset.id = bg.id;
            card.style.animationDelay = `${i * 0.08}s`;
            card.innerHTML = `
                <div class="bg-preview-swatch" style="background:${bg.preview};"></div>
                <div class="bg-option-name">${bg.name}</div>
                ${bg.animated ? '<span class="bg-animated-badge">Animated</span>' : ''}
            `;
            card.addEventListener('click', () => selectBackground(bg.id));
            grid.appendChild(card);
        });
    }

    function selectBackground(id) {
        state.selectedBackground = id;
        document.querySelectorAll('.bg-template-option').forEach(c => {
            c.classList.toggle('selected', c.dataset.id === id);
        });
    }

    // ---- Background Application ----
    function applyBackground(bgId, container) {
        // Remove any existing bg classes
        BACKGROUND_TEMPLATES.forEach(bg => container.classList.remove(bg.class));
        const tmpl = BACKGROUND_TEMPLATES.find(b => b.id === bgId);
        if (tmpl) {
            container.classList.add(tmpl.class);
            if (tmpl.animated) {
                createBackgroundEffects(bgId, container);
            }
        }
    }

    function createBackgroundEffects(bgId, container) {
        // Remove old particles
        container.querySelectorAll('.bg-particle').forEach(p => p.remove());

        switch (bgId) {
            case 'midnight-garden': {
                for (let i = 0; i < 20; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'bg-particle firefly';
                    dot.style.left = Math.random() * 100 + '%';
                    dot.style.top = Math.random() * 100 + '%';
                    dot.style.animationDelay = Math.random() * 5 + 's';
                    dot.style.animationDuration = (3 + Math.random() * 4) + 's';
                    container.appendChild(dot);
                }
                break;
            }
            case 'golden-hour': {
                for (let i = 0; i < 8; i++) {
                    const ray = document.createElement('div');
                    ray.className = 'bg-particle light-ray';
                    ray.style.left = (10 + Math.random() * 80) + '%';
                    ray.style.animationDelay = Math.random() * 6 + 's';
                    ray.style.animationDuration = (6 + Math.random() * 4) + 's';
                    ray.style.opacity = 0.15 + Math.random() * 0.15;
                    container.appendChild(ray);
                }
                break;
            }
            case 'spring-meadow': {
                for (let i = 0; i < 15; i++) {
                    const petal = document.createElement('div');
                    petal.className = 'bg-particle petal';
                    petal.style.left = Math.random() * 100 + '%';
                    petal.style.animationDelay = Math.random() * 8 + 's';
                    petal.style.animationDuration = (5 + Math.random() * 5) + 's';
                    container.appendChild(petal);
                }
                break;
            }
            case 'starlit': {
                for (let i = 0; i < 30; i++) {
                    const star = document.createElement('div');
                    star.className = 'bg-particle star';
                    star.style.left = Math.random() * 100 + '%';
                    star.style.top = Math.random() * 100 + '%';
                    star.style.animationDelay = Math.random() * 4 + 's';
                    star.style.animationDuration = (1.5 + Math.random() * 2) + 's';
                    const size = 1 + Math.random() * 2;
                    star.style.width = size + 'px';
                    star.style.height = size + 'px';
                    container.appendChild(star);
                }
                break;
            }
            case 'rose-mist': {
                for (let i = 0; i < 12; i++) {
                    const mist = document.createElement('div');
                    mist.className = 'bg-particle rose-orb';
                    mist.style.left = Math.random() * 100 + '%';
                    mist.style.top = Math.random() * 100 + '%';
                    mist.style.animationDelay = Math.random() * 6 + 's';
                    mist.style.animationDuration = (4 + Math.random() * 4) + 's';
                    container.appendChild(mist);
                }
                break;
            }
            case 'ocean-breeze': {
                for (let i = 0; i < 10; i++) {
                    const bubble = document.createElement('div');
                    bubble.className = 'bg-particle bubble';
                    bubble.style.left = Math.random() * 100 + '%';
                    bubble.style.animationDelay = Math.random() * 8 + 's';
                    bubble.style.animationDuration = (4 + Math.random() * 5) + 's';
                    const size = 4 + Math.random() * 8;
                    bubble.style.width = size + 'px';
                    bubble.style.height = size + 'px';
                    container.appendChild(bubble);
                }
                break;
            }
            case 'cherry-blossom': {
                for (let i = 0; i < 18; i++) {
                    const blossom = document.createElement('div');
                    blossom.className = 'bg-particle blossom';
                    blossom.style.left = Math.random() * 100 + '%';
                    blossom.style.animationDelay = Math.random() * 10 + 's';
                    blossom.style.animationDuration = (6 + Math.random() * 6) + 's';
                    container.appendChild(blossom);
                }
                break;
            }
        }
    }

    // ============================================================
    // REVEAL PAGE
    // ============================================================
    function showRevealPage(encodedData) {
        document.getElementById('progressBar').style.display = 'none';
        document.querySelectorAll('.step').forEach(s => s.style.display = 'none');
        const revealPage = document.getElementById('revealPage');
        revealPage.style.display = 'flex';

        let data;
        try {
            data = JSON.parse(decodeURIComponent(atob(encodedData)));
        } catch (e) {
            revealPage.innerHTML = '<h1 class="step-title">Oops!</h1><p>This bouquet link seems to be invalid.</p>';
            return;
        }

        const { f: flowers, g: greeneryId, c: cardTemplate, to, fr, m, bg } = data;

        document.getElementById('revealSubtitle').textContent = `${fr} made this for ${to}`;
        document.title = `A bouquet for ${to}!`;

        renderBouquet(flowers, greeneryId || 'greenery1', document.getElementById('revealBouquet'));
        renderCard(to, m, fr, cardTemplate || 'classic', document.getElementById('revealCard'));

        // Apply background theme
        if (bg) {
            applyBackground(bg, revealPage);
        }

        const scene = document.getElementById('revealScene');
        setTimeout(() => scene.classList.add('visible'), 300);

        createSparkles();
    }

    // ============================================================
    // BOUQUET RENDERING - 3 clean layers:
    //   Layer 1 (z-0): Single selected greenery (bottom-center)
    //   Layer 2 (z-5): Detail overlay (bottom-center)
    //   Layer 3 (z-10): Flower cluster on top (randomized sizes)
    // ============================================================
    function renderBouquet(flowerIds, greeneryId, container) {
        const flowerDataList = flowerIds.map(id => FLOWERS.find(f => f.id === id)).filter(Boolean);

        // Get the selected greenery image
        const greenery = GREENERY.find(g => g.id === greeneryId) || GREENERY[0];
        const greeneryImg = greenery.image;

        // Seeded random for consistent renders
        const seed = flowerIds.join('').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
        const rand = (i) => {
            const x = Math.sin(seed * 9301 + i * 49297 + 233280) * 10000;
            return x - Math.floor(x);
        };

        // Random sizes for flowers (randomized, not based on flower type)
        const sizes = ['small', 'medium', 'large'];

        let html = `<div class="bouquet-scene">`;

        // === LAYER 1: Greenery (z-0) - single selected greenery, largest, centered ===
        html += `<div class="bouquet-greenery-layer">`;
        html += `<img src="${greeneryImg}" alt="" class="greenery-base-img" draggable="false">`;
        html += `</div>`;

        // === LAYER 2: Detail overlay (z-5) - between greenery and flowers ===
        html += `<div class="bouquet-detail-overlay">`;
        html += `<img src="${DETAIL_OVERLAY}" alt="" class="detail-overlay-img" draggable="false">`;
        html += `</div>`;

        // === LAYER 3: Flower cluster (z-10) - on top, randomized sizes, tilted edges ===
        html += `<div class="bouquet-flower-cluster">`;
        const total = flowerDataList.length;
        const centerIndex = (total - 1) / 2;
        flowerDataList.forEach((flower, i) => {
            // Distance from center (0 = center, 1 = edge)
            const distFromCenter = total > 1 ? Math.abs(i - centerIndex) / centerIndex : 0;
            // Center flowers stay upright, edge flowers tilt outward
            const tiltDirection = i < centerIndex ? -1 : (i > centerIndex ? 1 : 0);
            const tiltAmount = distFromCenter * (15 + rand(i * 5 + 80) * 15) * tiltDirection;
            // Small random jitter even for center
            const jitter = (rand(i * 3 + 50) - 0.5) * 4;
            const rotation = tiltAmount + jitter;

            const sizeClass = sizes[Math.floor(rand(i * 7 + 10) * sizes.length)];
            const delay = i * 0.1;
            html += `<div class="bouquet-flower-item" style="order: ${i};">
                <img src="${flower.image}" alt="${flower.name}"
                    class="bouquet-flower-img flower-size-${sizeClass}"
                    style="transform: rotate(${rotation.toFixed(2)}deg); animation-delay: ${delay}s;"
                    draggable="false">
            </div>`;
        });
        html += `</div>`;

        html += `</div>`;
        container.innerHTML = html;
    }

    // ============================================================
    // CARD RENDERING
    // ============================================================
    function renderCard(to, message, from, cardTemplateId, container) {
        const tmpl = CARD_TEMPLATES.find(t => t.id === cardTemplateId) || CARD_TEMPLATES[0];

        let effectHtml = '';
        switch (tmpl.effect) {
            case 'torn':
                effectHtml = `<div class="card-torn-effect">
                    <div class="torn-edge torn-edge-top"></div>
                    <div class="torn-edge torn-edge-bottom"></div>
                    <div class="torn-edge torn-edge-left"></div>
                    <div class="torn-edge torn-edge-right"></div>
                </div>`;
                break;
            case 'burnt':
                effectHtml = `<div class="card-burn-effect"></div>`;
                break;
            case 'shimmer':
                effectHtml = `<div class="card-shimmer-effect"></div>`;
                break;
            case 'watercolor':
                effectHtml = `<div class="card-watercolor-effect"></div>`;
                break;
            case 'stars':
                effectHtml = `<div class="card-stars-effect"></div>`;
                break;
            case 'botanical':
                effectHtml = `<div class="card-botanical-effect"></div>`;
                break;
        }

        container.innerHTML = `
            <div class="card-inner rendered-card" style="background:${tmpl.bgStyle}; border-color:${tmpl.borderColor}; color:${tmpl.textColor};">
                ${effectHtml}
                <div class="card-decoration top-left" style="--accent:${tmpl.accentColor}"></div>
                <div class="card-decoration top-right" style="--accent:${tmpl.accentColor}"></div>
                <div class="card-to" style="color:${tmpl.accentColor}">To: <span>${to}</span></div>
                <div class="card-message" style="color:${tmpl.textColor}">${message}</div>
                <div class="card-from" style="color:${tmpl.accentColor}">With love, <span>${from}</span></div>
                <div class="card-decoration bottom-left" style="--accent:${tmpl.accentColor}"></div>
                <div class="card-decoration bottom-right" style="--accent:${tmpl.accentColor}"></div>
            </div>
            <div class="card-expand-hint">Tap card to expand</div>
        `;

        // Make card expandable
        const cardInner = container.querySelector('.card-inner');
        cardInner.addEventListener('click', () => expandCard(cardInner));
    }

    function expandCard(cardEl) {
        // Create fullscreen overlay with cloned card
        const overlay = document.createElement('div');
        overlay.className = 'card-fullscreen-overlay';
        const clone = cardEl.cloneNode(true);
        clone.classList.remove('rendered-card');
        clone.classList.add('card-fullscreen');
        overlay.appendChild(clone);
        document.body.appendChild(overlay);

        // Trigger entrance animation
        requestAnimationFrame(() => overlay.classList.add('active'));

        // Close on overlay click (not card click)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                overlay.classList.add('closing');
                setTimeout(() => overlay.remove(), 400);
            }
        });

        // Close on Escape
        const onKey = (e) => {
            if (e.key === 'Escape') {
                overlay.classList.remove('active');
                overlay.classList.add('closing');
                setTimeout(() => overlay.remove(), 400);
                document.removeEventListener('keydown', onKey);
            }
        };
        document.addEventListener('keydown', onKey);
    }

    function createSparkles() {
        const revealPage = document.getElementById('revealPage');
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 3 + 's';
            sparkle.style.animationDuration = (2 + Math.random() * 2) + 's';
            revealPage.appendChild(sparkle);
        }
    }

})();
