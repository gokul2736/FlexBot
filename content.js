(function() {
    'use strict';

    // --- 1. THE UI STYLES ---
    const style = document.createElement('style');
    style.textContent = `
        /* PANEL CONTAINER */
        #flux-overlay {
            position: fixed; top: 20px; right: 20px; width: 320px;
            background: #fff; 
            border: 1px solid rgba(0,0,0,0.08); 
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
            border-radius: 16px; z-index: 2147483647; font-family: 'Segoe UI', sans-serif;
            color: #333; 
            transition: left 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), top 0.3s ease, height 0.3s ease;
            display: flex; flex-direction: column; overflow: hidden;
            font-size: 13px;
        }
        #flux-overlay.dragging { transition: none !important; }

        /* HEADER */
        #flux-header {
            padding: 12px 16px; cursor: grab; 
            background: #fff;
            border-bottom: 1px solid #f0f0f0; 
            display: flex; justify-content: space-between; align-items: center;
            flex-shrink: 0;
        }
        #flux-header:active { cursor: grabbing; }
        
        #flux-title { font-weight: 800; font-size: 14px; color: #333; letter-spacing: 0.5px; text-transform: uppercase; display: flex; align-items: center; gap: 6px; }
        .flux-logo-icon { color: #ff5722; font-size: 18px; }
        
        .header-controls { display: flex; gap: 8px; align-items: center; }

        /* CONFIG BUTTON */
        #btn-settings {
            background: #f5f7fa; color: #444; border: 1px solid #e1e4e8;
            padding: 6px 12px; border-radius: 20px;
            font-size: 11px; font-weight: 700; cursor: pointer;
            display: flex; align-items: center; gap: 6px;
            transition: all 0.2s; text-transform: uppercase;
        }
        #btn-settings:hover { background: #e3f2fd; color: #2196f3; border-color: #2196f3; transform: translateY(-1px); }

        /* ICON BUTTONS (Minimize & Exit) */
        .header-icon-btn {
            width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
            border-radius: 50%; cursor: pointer; color: #999; font-size: 18px; transition: 0.2s;
        }
        .header-icon-btn:hover { background: #f0f0f0; color: #333; }
        
        /* Specific Exit Style */
        #btn-exit:hover { background: #ffebee; color: #ff5252; }

        /* MAIN BODY */
        #flux-body { padding: 18px; transition: opacity 0.2s; background: #fdfdfd; }
        
        label { font-size: 10px; font-weight: 700; color: #999; display: block; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
        
        .flux-input {
            width: 100%; background: #f7f9fc; border: 1px solid #eef0f2; color: #333;
            padding: 12px; margin-bottom: 15px; border-radius: 8px; font-size: 13px;
            box-sizing: border-box; outline: none; transition: 0.2s;
        }
        .flux-input:focus { border-color: #2196f3; background: #fff; box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1); }
        
        .flux-btn {
            width: 100%; padding: 12px; border: none; border-radius: 8px;
            font-weight: 700; cursor: pointer; margin-top: 5px; font-size: 13px;
            background: #2196f3; color: #fff; transition: transform 0.1s, background 0.2s;
            box-shadow: 0 4px 10px rgba(33, 150, 243, 0.2);
        }
        .flux-btn:hover { background: #1976d2; box-shadow: 0 6px 15px rgba(33, 150, 243, 0.3); }
        .flux-btn:active { transform: scale(0.98); }

        /* ACTIVE RULE BOX */
        #active-rule-box {
            margin-top: 15px; padding-top: 15px; border-top: 1px dashed #eee;
        }
        .active-rule-item {
            display: flex; justify-content: space-between; align-items: center;
            background: #fff; border: 1px solid #eee; border-left: 4px solid #00c853;
            padding: 10px; border-radius: 6px; margin-bottom: 6px;
            font-size: 12px; color: #555;
        }
        .rule-close { color: #ff5252; cursor: pointer; padding: 4px; font-weight: bold; }

        /* COMMAND CENTER */
        #flux-settings {
            display: none; flex-direction: column; height: 100%; background: #f7f9fc;
        }
        .settings-header {
            padding: 15px 18px; font-weight: 800; font-size: 12px; color: #555; text-transform: uppercase;
            display: flex; justify-content: space-between; align-items: center;
        }
        .close-settings { cursor: pointer; font-size: 18px; color: #999; }
        .close-settings:hover { color: #333; }

        #settings-list {
            padding: 0 15px 15px 15px; overflow-y: auto; max-height: 350px; display: flex; flex-direction: column; gap: 8px;
        }
        
        .cmd-card {
            background: #fff; border-radius: 10px; padding: 12px 15px;
            display: flex; justify-content: space-between; align-items: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.03); border: 1px solid transparent;
            transition: 0.2s;
        }
        .cmd-card:hover { border-color: #e0e0e0; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        
        .cmd-info { display: flex; flex-direction: column; gap: 3px; }
        .cmd-name { font-weight: 600; color: #333; font-size: 13px; }
        .cmd-key-badge { 
            background: #e0e0e0; color: #666; font-size: 10px; font-weight: 700; 
            padding: 2px 6px; border-radius: 4px; align-self: flex-start; 
        }
        
        .cmd-actions { display: flex; gap: 10px; align-items: center; }
        .cmd-icon { cursor: pointer; color: #ccc; font-size: 14px; transition: 0.2s; }
        
        .cmd-icon.play { font-size: 12px; background: #e3f2fd; color: #2196f3; padding: 5px; border-radius: 50%; width: 14px; height: 14px; display:flex; align-items:center; justify-content:center; }
        .cmd-icon.play:hover { background: #2196f3; color: #fff; transform: scale(1.1); box-shadow: 0 2px 5px rgba(33, 150, 243, 0.3); }
        .cmd-icon.edit:hover { color: #2196f3; }
        .cmd-icon.del:hover { color: #ff5252; }

        .add-cmd-btn {
            margin: 0 15px 15px 15px; padding: 12px; background: #2196f3; color: #fff;
            text-align: center; border-radius: 8px; font-weight: 700; font-size: 13px;
            cursor: pointer; transition: 0.2s; box-shadow: 0 4px 10px rgba(33, 150, 243, 0.2);
        }
        .add-cmd-btn:hover { background: #1976d2; }

        /* BUBBLE MODE */
        #flux-overlay.minimized { 
            width: 56px; height: 56px; border-radius: 28px; cursor: grab; background: #fff; 
            box-shadow: 0 5px 20px rgba(0,0,0,0.2); border: none;
        }
        #flux-overlay.minimized > *:not(.bubble-icon) { display: none !important; }
        .bubble-icon { 
            display: none; width: 100%; height: 100%; 
            align-items: center; justify-content: center;
            font-size: 24px; color: #ff5722; pointer-events: none;
        }
        #flux-overlay.minimized .bubble-icon { display: flex; }

        /* EDIT MODAL */
        #edit-modal {
            position: absolute; top: 0; left: 0; right:0; bottom:0;
            background: rgba(255,255,255,0.98); z-index: 10;
            padding: 20px; display: none; flex-direction: column; gap: 10px; justify-content: center;
        }
    `;
    document.head.appendChild(style);

    // --- 2. HTML STRUCTURE ---
    const overlay = document.createElement('div');
    overlay.id = 'flux-overlay';
    overlay.style.opacity = '0';
    overlay.innerHTML = `
        <div id="flux-header">
            <div id="flux-title"><span class="flux-logo-icon">⚡</span> FLEXBOT</div>
            <div class="header-controls">
                <div id="btn-settings" title="Open Command Center">
                    <span>⚙</span> CONFIG
                </div>
                <div id="btn-minimize" class="header-icon-btn" title="Minimize">−</div>
                <div id="btn-exit" class="header-icon-btn" title="Close FlexBot">✕</div>
            </div>
        </div>

        <div class="bubble-icon">⚡</div>

        <div id="view-main">
            <div id="flux-body">
                <label>TARGET SELECTOR (ID/Class)</label>
                <input type="text" id="inp-selector" class="flux-input" placeholder="#mod_quiz-next-nav">
                
                <label>TRIGGER KEY</label>
                <input type="text" id="inp-key" class="flux-input" placeholder="e.g. n" maxlength="1">
                
                <button id="btn-activate" class="flux-btn">ACTIVATE</button>

                <div id="active-rule-box"></div>
            </div>
        </div>

        <div id="flux-settings">
            <div class="settings-header">
                <span>COMMAND CENTER</span>
                <span class="close-settings">×</span>
            </div>
            <div id="settings-list"></div>
            <div class="add-cmd-btn">+ Add Custom Command</div>
        </div>

        <div id="edit-modal">
            <label>NAME</label>
            <input id="edit-name" class="flux-input">
            <label>SELECTOR / ACTION</label>
            <input id="edit-sel" class="flux-input">
            <label>KEY</label>
            <input id="edit-key" class="flux-input" maxlength="1">
            <div style="display:flex; gap:10px;">
                <button id="btn-cancel-edit" class="flux-btn" style="background:#ddd; color:#333;">CANCEL</button>
                <button id="btn-save-edit" class="flux-btn">SAVE</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // --- 3. DATA & LOGIC ---
    const DEFAULTS = [
        { id: 1, name: 'Moodle Next', selector: '#mod_quiz-next-nav', key: 'n' },
        { id: 2, name: 'Copy Body', selector: '#region-main', key: 'k' },
        { id: 3, name: 'Select Copy', selector: 'ACTION:COPY_SEL', key: 'j' },
        { id: 4, name: 'Select All', selector: 'ACTION:COPY_ALL', key: 'a' },
        { id: 5, name: 'Reload', selector: 'ACTION:RELOAD', key: 'r' }
    ];
    let presets = [];
    let tempRule = null;

    chrome.storage.local.get(['fluxPresets', 'fluxState', 'fluxPosition', 'fluxTemp'], (data) => {
        presets = data.fluxPresets || DEFAULTS;
        tempRule = data.fluxTemp || null;
        
        renderSettings();
        renderTempRule();
        
        if (data.fluxPosition) {
            overlay.style.left = data.fluxPosition.left;
            overlay.style.top = data.fluxPosition.top;
        } else {
            overlay.style.right = '20px';
        }

        if (data.fluxState && data.fluxState.minimized) {
            overlay.classList.add('minimized');
            setTimeout(snapToEdge, 100);
        } else {
            setTimeout(smartBoundsCheck, 100);
        }
        overlay.style.opacity = '1';
    });

    function savePresets() {
        chrome.storage.local.set({ fluxPresets: presets });
        renderSettings();
    }

    // --- 4. RENDERERS ---
    function renderSettings() {
        const list = document.getElementById('settings-list');
        list.innerHTML = '';
        presets.forEach(p => {
            const card = document.createElement('div');
            card.className = 'cmd-card';
            card.innerHTML = `
                <div class="cmd-info">
                    <span class="cmd-name">${p.name}</span>
                    <span class="cmd-key-badge">[${p.key.toUpperCase()}]</span>
                </div>
                <div class="cmd-actions">
                    <span class="cmd-icon play" title="Load & Activate">▶</span>
                    <span class="cmd-icon edit" title="Edit">✎</span>
                    <span class="cmd-icon del" title="Delete">🗑</span>
                </div>
            `;
            
            card.querySelector('.play').onclick = () => {
                tempRule = { selector: p.selector, key: p.key };
                chrome.storage.local.set({ fluxTemp: tempRule });
                renderTempRule();
                document.getElementById('inp-selector').value = p.selector;
                document.getElementById('inp-key').value = p.key;
                document.getElementById('flux-settings').style.display = 'none';
                document.getElementById('view-main').style.display = 'block';
                showToast(`Activated: ${p.name}`, '#2196f3');
            };

            card.querySelector('.edit').onclick = () => openEdit(p);
            card.querySelector('.del').onclick = () => {
                if(confirm('Delete rule?')) {
                    presets = presets.filter(x => x.id !== p.id);
                    savePresets();
                }
            };
            list.appendChild(card);
        });
    }

    function renderTempRule() {
        const box = document.getElementById('active-rule-box');
        box.innerHTML = '';
        if (tempRule) {
            box.innerHTML = `
                <div class="active-rule-item">
                    <span>Key: <b>[${tempRule.key.toUpperCase()}]</b> → ${tempRule.selector.substring(0,15)}...</span>
                    <span class="rule-close">✕</span>
                </div>
            `;
            box.querySelector('.rule-close').onclick = () => {
                tempRule = null;
                chrome.storage.local.set({ fluxTemp: null });
                renderTempRule();
            };
        }
    }

    // --- 5. NAVIGATION & ACTIONS ---
    const viewMain = document.getElementById('view-main');
    const viewSettings = document.getElementById('flux-settings');
    
    document.getElementById('btn-settings').onclick = () => {
        viewMain.style.display = 'none';
        viewSettings.style.display = 'flex';
    };
    
    document.querySelector('.close-settings').onclick = () => {
        viewSettings.style.display = 'none';
        viewMain.style.display = 'block';
    };

    // --- EXIT BUTTON LOGIC ---
    document.getElementById('btn-exit').onclick = (e) => {
        e.stopPropagation();
        if(confirm('Close FlexBot for this session?')) {
            overlay.remove(); // Removes the UI entirely
        }
    };

    // --- EDITING LOGIC ---
    const editModal = document.getElementById('edit-modal');
    let editingId = null;

    function openEdit(p = null) {
        editModal.style.display = 'flex';
        editingId = p ? p.id : null;
        document.getElementById('edit-name').value = p ? p.name : '';
        document.getElementById('edit-sel').value = p ? p.selector : '';
        document.getElementById('edit-key').value = p ? p.key : '';
    }

    document.getElementById('btn-cancel-edit').onclick = () => editModal.style.display = 'none';
    document.querySelector('.add-cmd-btn').onclick = () => openEdit();

    document.getElementById('btn-save-edit').onclick = () => {
        const newP = {
            id: editingId || Date.now(),
            name: document.getElementById('edit-name').value || 'Custom',
            selector: document.getElementById('edit-sel').value,
            key: document.getElementById('edit-key').value.toLowerCase()
        };
        if (editingId) {
            const idx = presets.findIndex(x => x.id === editingId);
            if (idx !== -1) presets[idx] = newP;
        } else {
            presets.push(newP);
        }
        savePresets();
        editModal.style.display = 'none';
    };

    // --- 6. BOT ENGINE ---
    document.getElementById('btn-activate').onclick = () => {
        const sel = document.getElementById('inp-selector').value;
        const k = document.getElementById('inp-key').value;
        if (sel && k) {
            tempRule = { selector: sel, key: k };
            chrome.storage.local.set({ fluxTemp: tempRule });
            renderTempRule();
            showToast('Rule Activated', '#2196f3');
            toggleMinimize(true);
        }
    };

    document.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
        const pressed = e.key.toLowerCase();
        
        if (tempRule && tempRule.key.toLowerCase() === pressed) {
            execute(tempRule);
            return;
        }
    });

    function execute(rule) {
        if (rule.selector === 'ACTION:RELOAD') { location.reload(); return; }
        if (rule.selector === 'ACTION:COPY_SEL') {
            const t = window.getSelection().toString();
            if(t) { navigator.clipboard.writeText(t); showToast('Selection Copied', '#4caf50'); }
            return;
        }
        if (rule.selector === 'ACTION:COPY_ALL') {
            navigator.clipboard.writeText(document.body.innerText);
            showToast('Page Copied', '#4caf50');
            return;
        }

        let target = document.querySelector(rule.selector);
        if (!target && !rule.selector.startsWith('#') && !rule.selector.startsWith('.')) {
            target = document.querySelector('#' + rule.selector);
        }
        
        if (target) {
            target.click();
            showToast('Clicked!', '#00c853');
            if (!overlay.classList.contains('minimized')) toggleMinimize(true);
        }
    }

    // --- 7. UI HELPERS ---
    const header = document.getElementById('flux-header');
    let isDragging = false, hasMoved = false, startX, startY, initialLeft, initialTop;

    header.addEventListener('mousedown', (e) => {
        if (e.target.closest('#btn-settings') || e.target.closest('.header-icon-btn')) return;
        isDragging = true; hasMoved = false;
        startX = e.clientX; startY = e.clientY;
        initialLeft = overlay.offsetLeft; initialTop = overlay.offsetTop;
        overlay.classList.add('dragging');
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        if (Math.abs(e.clientX - startX) > 3) hasMoved = true;
        overlay.style.left = `${initialLeft + (e.clientX - startX)}px`;
        overlay.style.top = `${initialTop + (e.clientY - startY)}px`;
    });

    document.addEventListener('mouseup', () => { 
        if(isDragging) {
            overlay.classList.remove('dragging');
            if(hasMoved) snapToEdge();
            chrome.storage.local.set({ fluxPosition: { left: overlay.style.left, top: overlay.style.top } });
        }
        isDragging = false; 
    });

    function snapToEdge() {
        const winW = window.innerWidth;
        const rect = overlay.getBoundingClientRect();
        if (overlay.classList.contains('minimized')) {
            const centerX = rect.left + (rect.width / 2);
            overlay.style.left = (centerX < winW / 2) ? '20px' : (winW - 76) + 'px';
        } else {
            smartBoundsCheck();
        }
    }

    function smartBoundsCheck() {
        const rect = overlay.getBoundingClientRect();
        const winW = window.innerWidth;
        if (rect.left + 320 > winW) overlay.style.left = (winW - 340) + 'px';
        if (rect.left < 20) overlay.style.left = '20px';
    }

    const toggleMinimize = (force = null) => {
        const min = force !== null ? force : !overlay.classList.contains('minimized');
        if (min) overlay.classList.add('minimized');
        else overlay.classList.remove('minimized');
        chrome.storage.local.set({ fluxState: { minimized: min } });
        setTimeout(snapToEdge, 100);
    };

    document.getElementById('btn-minimize').onclick = (e) => { e.stopPropagation(); toggleMinimize(true); };
    overlay.addEventListener('click', (e) => {
        if (!hasMoved && overlay.classList.contains('minimized')) toggleMinimize(false);
    });

    function showToast(msg, color) {
        const t = document.createElement('div');
        t.innerText = msg;
        t.style = `position:fixed; bottom:30px; left:50%; transform:translateX(-50%); background:#fff; padding:8px 20px; border-radius:30px; font-weight:600; z-index:999999; border-left: 5px solid ${color}; box-shadow: 0 5px 20px rgba(0,0,0,0.2); font-family: sans-serif; font-size: 13px;`;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 2000);
    }
})();