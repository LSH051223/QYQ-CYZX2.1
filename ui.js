// ui.js
import { CONFIG } from './config.js';
import { GameState } from './state.js';

export const UI = {
    el: {
        dialogBox: document.getElementById('dialog-box'),
        speakerEl: document.getElementById('speaker-name'),
        textEl: document.getElementById('dialog-text'),
        choicesEl: document.getElementById('choices-container'),
        charLayer: document.getElementById('character-layer'),
        container: document.getElementById('game-container'),
        statusBg: document.getElementById('status-bg-img'),
        avatarImg: document.getElementById('player-avatar'),
        sideNav: document.getElementById('side-nav')
    },

    showDialog(speaker, text, choices = []) {
        this.el.speakerEl.innerText = speaker || "";
        this.el.textEl.innerText = text;
        this.el.choicesEl.innerHTML = '';
        this.el.sideNav.innerHTML = '';
        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = choice.text;
            btn.onclick = () => choice.action();
            this.el.choicesEl.appendChild(btn);
        });
    },

    setBackground(sceneKey) {
        const bgKey = `bg_${sceneKey}`;
        if (CONFIG.IMAGES && CONFIG.IMAGES[bgKey]) {
            this.el.container.style.backgroundImage = `url('${CONFIG.IMAGES[bgKey]}')`;
            this.el.container.style.backgroundColor = '#1a1a2e';
        } else {
            this.el.container.style.backgroundImage = 'none';
            const colors = { campus: '#2c3e50', classroom: '#34495e', library: '#2c3e50', gym: '#3e2723',
                art_building: '#1a237e', cafe: '#3e2723', store: '#1b5e20', dorm: '#37474f',
                part_time: '#2c3e50' };
            this.el.container.style.backgroundColor = colors[sceneKey] || '#1a1a2e';
        }
    },

    setCharacter(charKey) {
        const imgKey = `char_${charKey}`;
        if (CONFIG.IMAGES && CONFIG.IMAGES[imgKey]) {
            this.el.charLayer.style.backgroundImage = `url('${CONFIG.IMAGES[imgKey]}')`;
            this.el.charLayer.innerHTML = "";
        } else {
            this.el.charLayer.style.backgroundImage = '';
            this.el.charLayer.innerHTML = `<div style="background:rgba(0,0,0,0.5);padding:10px;border-radius:5px;color:white;">立绘占位: ${CONFIG.NPCS?.[charKey]?.name || charKey}</div>`;
        }
    },

    clearCharacter() {
        this.el.charLayer.style.backgroundImage = '';
        this.el.charLayer.innerHTML = '';
    },

    formatDate(xun, timeIdx) {
        const monthIndex = Math.floor((xun - 1) / CONFIG.XUN_PER_MONTH);
        const xunInMonth = (xun - 1) % CONFIG.XUN_PER_MONTH;
        const year = Math.floor(monthIndex / 12) + 1;
        const monthName = CONFIG.MONTH_NAMES[monthIndex % 12];
        const xunName = CONFIG.XUN_NAMES[xunInMonth];
        const timeName = CONFIG.TIME_SLOTS[timeIdx] || "";
        return `第${year}年 ${monthName}${xunName} ${timeName}`;
    },

    updateStatus() {
        const dateStr = this.formatDate(GameState.xun, GameState.time_index);
        document.getElementById('ui-date').innerText = dateStr;
        document.getElementById('ui-stamina').innerText = `${GameState.stamina}/${CONFIG.MAX_STAMINA}`;
        document.getElementById('ui-money').innerText = GameState.money;
        document.getElementById('ui-int').innerText = GameState.attributes.intelligence.toFixed(1);
        document.getElementById('ui-cha').innerText = GameState.attributes.charm.toFixed(1);
        document.getElementById('ui-str').innerText = GameState.attributes.strength.toFixed(1);
    },

    applyStatusBarBg(imgUrl) {
        this.el.statusBg.style.backgroundImage = `url('${imgUrl}')`;
    },

    showEnding(title, desc) {
        document.getElementById('ending-title').innerText = title;
        document.getElementById('ending-desc').innerText = desc;
        document.getElementById('ending-screen').style.display = 'flex';
    },

    clearSideNav() {
        this.el.sideNav.innerHTML = '';
    }
};