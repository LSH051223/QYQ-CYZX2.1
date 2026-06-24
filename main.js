// main.js
import { CONFIG } from './config.js';
import { GameState } from './state.js';
import { UI } from './ui.js';
import { enterScene } from './scenes.js';

// ---------- 全局变量 ----------
window.selectedCharId = null;
window.currentUser = null;

// ---------- 暴露 GameEngine ----------
window.GameEngine = {
    startGame() {
        const nameInput = document.getElementById('player-name-input');
        GameState.init();
        GameState.player_char_id = window.selectedCharId;
        const charData = CONFIG.PLAYER_CHARS.find(c => c.id === window.selectedCharId);
        GameState.player_name = nameInput.value.trim() || charData?.name || '玩家';
        GameState.player_char_img = charData?.img || 'https://via.placeholder.com/100?text=Avatar';
        document.getElementById('name-input-screen').style.display = 'none';
        document.getElementById('game-container').style.display = 'flex';
        UI.el.avatarImg.src = GameState.player_char_img;
        UI.applyStatusBarBg(GameState.player_char_img);
        UI.updateStatus();
        enterScene('campus');
    },

    enterScene,

    // 推进时间
    advanceTime() {
        GameState.time_index++;
        if (GameState.time_index >= CONFIG.TIME_SLOTS.length) {
            GameState.time_index = 0;
            GameState.xun++;
            // ★ 每天早晨体力回满 ★
            GameState.stamina = CONFIG.MAX_STAMINA;
            GameState.studied_today = false;
            GameState.hasFishedToday = false;

            if (!GameState.studied_today) {
                GameState.study_misses++;
                if (GameState.study_misses >= 3) {
                    this.triggerEnding("劝退结局", "由于连续三个早晨没有学习，你被学校劝退了。");
                    return false;
                }
            } else {
                GameState.study_misses = 0;
            }

            for (let key in CONFIG.NPCS) {
                if (GameState.xun - GameState.last_interaction_day[key] > 3 && GameState.affection[key] > 0) {
                    GameState.affection[key] = Math.max(0, GameState.affection[key] - 0.5);
                }
            }

            if (GameState.xun > 108) {
                this.triggerGaokao();
                return false;
            }
        }
        UI.updateStatus();
        enterScene('campus');
        return true;
    },

    // ===== 跑酷游戏集成 =====
    // 打开跑酷游戏（iframe）
    openRunningGame() {
        const overlay = document.getElementById('running-overlay');
        overlay.style.display = 'flex';
        const iframe = document.getElementById('running-iframe');
        // 添加时间戳防止缓存
        iframe.src = 'rungame.html?t=' + Date.now();
        // 隐藏对话框，避免干扰
        document.getElementById('dialog-box').style.display = 'none';
    },

    // 处理跑酷结束消息（由iframe发来）
    handleRunningResult(data) {
        const coins = data.coins || 0;
        // 确保对话框可见
        document.getElementById('dialog-box').style.display = 'flex';
        if (coins > 0) {
            GameState.money += coins;
            UI.updateStatus();
            UI.showDialog("跑酷结算", `🏃 你跑了800米，获得 ${coins} 金币！`, [
                { text: "返回校园", action: () => {
                    document.getElementById('running-overlay').style.display = 'none';
                    enterScene('campus');
                }}
            ]);
        } else {
            UI.showDialog("跑酷结算", "🏃 你跑了800米，但没有获得金币。", [
                { text: "返回校园", action: () => {
                    document.getElementById('running-overlay').style.display = 'none';
                    enterScene('campus');
                }}
            ]);
        }
    },

    consumeStamina(cost) {
        if (GameState.stamina >= cost) {
            GameState.stamina -= cost;
            UI.updateStatus();
            return true;
        } else {
            UI.showDialog("系统", "体力不足！需要休息，将自动进入下一时间段。", [
                { text: "确定", action: () => {
                    if (this.advanceTime()) {
                        enterScene('campus');
                    }
                }}
            ]);
            return false;
        }
    },

    changeAffection(charKey, amount) {
        GameState.affection[charKey] = Math.min(20, Math.max(0, GameState.affection[charKey] + amount));
        GameState.last_interaction_day[charKey] = GameState.xun;
        UI.updateStatus();
    },

    randomWalk() {
        if (GameState.stamina < 1) {
            UI.showDialog("系统", "体力不足，无法继续逛校园啦！", [{ text: "知道了", action: () => enterScene('campus') }]);
            return;
        }
        if (!this.consumeStamina(1)) return;

        const events = [
            { text: "你在花坛边捡到5元零钱！", action: () => { GameState.money += 5; UI.updateStatus(); enterScene('campus'); } },
            { text: "你遇到了王教授，他考了你一个有趣的逻辑题。(智力+1.5)", action: () => { GameState.attributes.intelligence += 1.5; UI.updateStatus(); enterScene('campus'); } },
            { text: "你帮体育老师搬器材，他教你一套训练方法。(力量+2.0)", action: () => { GameState.attributes.strength += 2.0; UI.updateStatus(); enterScene('campus'); } },
            { text: "你在艺术展厅被一幅画深深触动，审美提升。(魅力+1.8)", action: () => { GameState.attributes.charm += 1.8; UI.updateStatus(); enterScene('campus'); } },
            { text: "你捡到一本旧笔记，上面有精妙的解题思路。(智力+1.0)", action: () => { GameState.attributes.intelligence += 1.0; UI.updateStatus(); enterScene('campus'); } },
            { text: "你不小心打碎了教室的玻璃，赔偿80元！(-80金币)", action: () => { GameState.money -= 80; UI.updateStatus(); enterScene('campus'); } },
            { text: "你的钱包被偷了，损失70元。(-70金币)", action: () => { GameState.money -= 70; UI.updateStatus(); enterScene('campus'); } },
            { text: "你在图书馆超期还书，罚款60元。(-60金币)", action: () => { GameState.money -= 60; UI.updateStatus(); enterScene('campus'); } },
            { text: "你被高年级同学敲诈了50元。(-50金币)", action: () => { GameState.money -= 50; UI.updateStatus(); enterScene('campus'); } },
            { text: "你花了30元买了一本二手习题集，认真钻研后智力+2.0！(-30金币，智力+2.0)", action: () => { GameState.money -= 30; GameState.attributes.intelligence += 2.0; UI.updateStatus(); enterScene('campus'); } },
            { text: "你请朋友吃了顿饭花掉40元，但朋友教了你一些社交技巧。(魅力+1.5，-40金币)", action: () => { GameState.money -= 40; GameState.attributes.charm += 1.5; UI.updateStatus(); enterScene('campus'); } },
            { text: "你弄丢了朋友的篮球，赔了35元，但得到了锻炼。(力量+1.0，-35金币)", action: () => { GameState.money -= 35; GameState.attributes.strength += 1.0; UI.updateStatus(); enterScene('campus'); } }
        ];
        const event = events[Math.floor(Math.random() * events.length)];
        UI.showDialog("随机事件", event.text, [{ text: "继续走走", action: event.action }]);
    },

    triggerEnding(title, desc) {
        UI.showEnding(title, desc);
    },

    triggerGaokao() {
        const int = GameState.attributes.intelligence;
        const cha = GameState.attributes.charm;
        const str = GameState.attributes.strength;
        const avg = (int + cha + str) / 3;
        let university = "普通本科";
        if (avg >= 450) university = "清华大学";
        else if (avg >= 380) university = "北京大学";
        else if (avg >= 300) university = "浙江大学";
        let maxAffKey = 'ming';
        for (let key in GameState.affection) {
            if (GameState.affection[key] > GameState.affection[maxAffKey]) maxAffKey = key;
        }
        const lover = GameState.affection[maxAffKey] >= 16 ?
            `你与${CONFIG.NPCS[maxAffKey].name}修成正果，一起前往了同一座城市。` :
            "你独自踏上了新的旅程。";
        this.triggerEnding("毕业结局", `你的三年高中生活结束！\n属性均分：${avg.toFixed(1)}\n录取院校：${university}\n${lover}`);
    },

    showStatus() {
        let text = `玩家: ${GameState.player_name}\n当前时间: ${UI.formatDate(GameState.xun, GameState.time_index)}\n`;
        text += `逃课计数: ${GameState.study_misses} / 3\n`;
        text += `================================\n智力: ${GameState.attributes.intelligence.toFixed(1)} | 魅力: ${GameState.attributes.charm.toFixed(1)} | 力量: ${GameState.attributes.strength.toFixed(1)}\n金币: ${GameState.money}\n`;
        text += `================================\n-- 好感度 (0-20) --\n`;
        for (let key in CONFIG.NPCS) {
            const aff = GameState.affection[key];
            const hearts = "❤️".repeat(Math.floor(aff / 2)) + "♡".repeat(10 - Math.floor(aff / 2));
            text += `${CONFIG.NPCS[key].name}: ${hearts} (${aff.toFixed(1)}/20)\n`;
        }
        if (GameState.affection.suhe !== undefined) {
            const aff = GameState.affection.suhe;
            const hearts = "❤️".repeat(Math.floor(aff / 2)) + "♡".repeat(10 - Math.floor(aff / 2));
            text += `苏禾: ${hearts} (${aff.toFixed(1)}/20)\n`;
        }
        document.getElementById('status-content').innerText = text;
        document.getElementById('status-modal').style.display = 'block';
    },

    showCharacterIntro() {
        const grid = document.getElementById('intro-grid');
        grid.innerHTML = '';
        CONFIG.CHARACTERS.forEach(char => {
            const card = document.createElement('div');
            card.className = 'char-intro-card';
            const imgBox = document.createElement('div');
            imgBox.className = 'intro-img-box';
            if (char.img) {
                imgBox.style.backgroundImage = `url('${char.img}')`;
            } else {
                imgBox.style.backgroundColor = '#555';
                imgBox.innerText = '?';
                imgBox.style.display = 'flex';
                imgBox.style.alignItems = 'center';
                imgBox.style.justifyContent = 'center';
                imgBox.style.fontSize = '32px';
                imgBox.style.color = '#888';
            }
            const nameEl = document.createElement('div');
            nameEl.className = 'intro-name';
            nameEl.innerText = char.name;
            const genderEl = document.createElement('div');
            genderEl.className = 'intro-gender';
            genderEl.innerText = char.gender ? `${char.gender} · ${char.class || ''}` : '';
            const descEl = document.createElement('div');
            descEl.className = 'intro-desc';
            descEl.innerText = char.desc || '';
            const detailBtn = document.createElement('button');
            detailBtn.className = 'detail-btn';
            detailBtn.innerText = '📖 详细';
            detailBtn.onclick = (e) => {
                e.stopPropagation();
                window.showCharDetail(char.id);
            };
            card.appendChild(imgBox);
            card.appendChild(nameEl);
            card.appendChild(genderEl);
            card.appendChild(descEl);
            card.appendChild(detailBtn);
            card.onclick = () => {
                window.showCharDetail(char.id);
            };
            grid.appendChild(card);
        });
        document.getElementById('character-intro-screen').style.display = 'flex';
    },

    hideCharacterIntro() {
        document.getElementById('character-intro-screen').style.display = 'none';
        document.getElementById('char-detail-overlay').style.display = 'none';
    },

    showCharDetail(charId) {
        const char = CONFIG.CHARACTERS.find(c => c.id === charId);
        if (!char) return;
        const overlay = document.getElementById('char-detail-overlay');
        document.getElementById('detail-img').style.backgroundImage = char.img ? `url('${char.img}')` : 'background-color:#555';
        document.getElementById('detail-name').innerText = char.name;
        const genderText = char.gender ? `${char.gender} · ${char.class || ''} · ${char.age || ''}岁` : '';
        document.getElementById('detail-gender').innerText = genderText;
        let infoHtml = '';
        if (char.desc) infoHtml += `<strong>简介：</strong>${char.desc}<br>`;
        if (char.hobby) infoHtml += `<strong>爱好：</strong>${char.hobby}<br>`;
        if (char.personality) infoHtml += `<strong>性格：</strong>${char.personality}<br>`;
        if (char.background) infoHtml += `<strong>背景：</strong>${char.background}`;
        document.getElementById('detail-info').innerHTML = infoHtml || '暂无更多信息。';
        overlay.style.display = 'flex';
    },

    handleFishingResult(data) {
        // 支持新的9种鱼格式和旧的双色格式
        let total = 0, earned = 0;
        const COIN_MAP = { small: 10, medium: 50, large: 200 };
        if (data.caught) {
            // 新格式: { fish1: {small:0, medium:0, large:0}, ... }
            for (const fishKey in data.caught) {
                const sizes = data.caught[fishKey];
                for (const sz in sizes) {
                    const cnt = sizes[sz] || 0;
                    total += cnt;
                    earned += cnt * (COIN_MAP[sz] || 0);
                }
            }
        } else {
            // 旧格式兼容: { golden: {small,medium,large}, red: {...} }
            for (const colorKey of ['golden', 'red']) {
                const sizes = data[colorKey];
                if (sizes) {
                    for (const sz in sizes) {
                        const cnt = sizes[sz] || 0;
                        total += cnt;
                        earned += cnt * (COIN_MAP[sz] || 0);
                    }
                }
            }
        }
        GameState.money += earned;
        UI.updateStatus();
        UI.showDialog("钓鱼结算", `钓到 ${total} 条鱼，获得 ${earned} 金币！`, [
            { text: "太好了", action: () => {
                document.getElementById('fishing-overlay').style.display = 'none';
                document.getElementById('dialog-box').style.display = 'flex';
                enterScene('campus');
            }}
        ]);
    },

    // 商店面板（从旧版迁移）
    showShopPanel(shopType) {
        const oldPanel = document.getElementById('shop-panel');
        if (oldPanel) oldPanel.remove();
        const items = CONFIG.ITEMS[shopType];
        const shopName = shopType === 'cafe' ? '☕ 咖啡馆' : '🏪 校园商店';
        const panel = document.createElement('div');
        panel.id = 'shop-panel';
        panel.style.cssText = `
            position: fixed;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.95);
            border: 2px solid var(--primary-color);
            border-radius: 16px;
            padding: 25px 30px;
            z-index: 100;
            width: 85%;
            max-width: 1000px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 0 60px rgba(255,107,157,0.25);
            backdrop-filter: blur(4px);
        `;
        const title = document.createElement('h2');
        title.innerText = shopName;
        title.style.cssText = `color: var(--primary-color);text-align:center;margin-bottom:20px;font-size:28px;text-shadow:0 0 10px rgba(255,107,157,0.3);`;
        panel.appendChild(title);
        const grid = document.createElement('div');
        grid.style.cssText = `display:grid;grid-template-columns:repeat(4,1fr);gap:18px;max-height:55vh;overflow-y:auto;padding:8px 4px;scrollbar-width:thin;scrollbar-color:var(--primary-color) transparent;`;
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.style.cssText = `border:2px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.6);border-radius:12px;padding:12px 8px;cursor:pointer;transition:0.3s;display:flex;flex-direction:column;align-items:center;min-height:210px;`;
            card.onmouseover = () => { card.style.borderColor = 'var(--primary-color)'; card.style.background = 'rgba(255,107,157,0.1)'; };
            card.onmouseout = () => { card.style.borderColor = 'rgba(255,255,255,0.15)'; card.style.background = 'rgba(0,0,0,0.6)'; };
            const img = document.createElement('div');
            img.style.cssText = `width:80px;height:80px;background:url('${item.img}') center/cover no-repeat;border-radius:8px;margin-bottom:8px;border:2px solid rgba(255,255,255,0.1);background-color:#333;flex-shrink:0;`;
            card.appendChild(img);
            const name = document.createElement('div');
            name.innerText = item.name;
            name.style.cssText = `color:var(--primary-color);font-weight:bold;font-size:15px;text-align:center;margin-bottom:4px;`;
            card.appendChild(name);
            const desc = document.createElement('div');
            desc.innerText = item.desc;
            desc.style.cssText = `color:#ccc;font-size:12px;text-align:center;margin-bottom:6px;line-height:1.3;min-height:32px;`;
            card.appendChild(desc);
            const price = document.createElement('div');
            price.innerText = `${item.price} 金币`;
            price.style.cssText = `color:#ffda44;font-weight:bold;font-size:14px;margin-bottom:8px;`;
            card.appendChild(price);
            const qtyInput = document.createElement('input');
            qtyInput.type = 'number';
            qtyInput.min = '1';
            qtyInput.value = '1';
            qtyInput.style.cssText = `width:50px;padding:4px;border:1px solid var(--primary-color);border-radius:4px;text-align:center;margin-bottom:8px;font-size:13px;background:rgba(0,0,0,0.4);color:white;`;
            card.appendChild(qtyInput);
            const buyBtn = document.createElement('button');
            buyBtn.innerText = '购买';
            buyBtn.style.cssText = `background:var(--primary-color);color:white;border:none;padding:6px 18px;border-radius:6px;cursor:pointer;font-weight:bold;transition:0.3s;font-size:14px;`;
            buyBtn.onmouseover = () => buyBtn.style.background = '#ff4578';
            buyBtn.onmouseout = () => buyBtn.style.background = 'var(--primary-color)';
            buyBtn.onclick = (e) => {
                e.stopPropagation();
                const quantity = parseInt(qtyInput.value) || 1;
                const totalPrice = item.price * quantity;
                if (GameState.money >= totalPrice) {
                    GameState.money -= totalPrice;
                    if (item.stamina) {
                        GameState.stamina = Math.min(CONFIG.MAX_STAMINA, GameState.stamina + item.stamina * quantity);
                    } else if (item.attr) {
                        GameState.attributes[item.attr] += item.val * quantity;
                    }
                    UI.updateStatus();
                    panel.remove();
                    UI.showDialog('系统', `购买成功！${item.name} × ${quantity}`, [
                        { text: '继续购物', action: () => { this.showShopPanel(shopType); } },
                        { text: '离开', action: () => { enterScene('campus'); } }
                    ]);
                } else {
                    panel.remove();
                    UI.showDialog('系统', '金币不足！', [
                        { text: '返回购物', action: () => { this.showShopPanel(shopType); } },
                        { text: '离开', action: () => { enterScene('campus'); } }
                    ]);
                }
            };
            card.appendChild(buyBtn);
            card.onclick = () => {
                document.querySelectorAll('#shop-panel .item-card').forEach(c => c.style.borderColor = 'rgba(255,255,255,0.15)');
                card.style.borderColor = 'var(--primary-color)';
            };
            grid.appendChild(card);
        });
        panel.appendChild(grid);
        const closeBtn = document.createElement('button');
        closeBtn.innerText = '离开商店';
        closeBtn.style.cssText = `display:block;margin:20px auto 0;padding:10px 40px;background:var(--primary-color);color:white;border:none;border-radius:8px;font-size:18px;cursor:pointer;transition:0.3s;`;
        closeBtn.onmouseover = () => closeBtn.style.background = '#ff4578';
        closeBtn.onmouseout = () => closeBtn.style.background = 'var(--primary-color)';
        closeBtn.onclick = () => { panel.remove(); enterScene('campus'); };
        panel.appendChild(closeBtn);
        document.getElementById('main-screen').appendChild(panel);
    },

    // 查看手机消息
    checkPhoneMessages() {
        let hasMsg = false;
        let msgText = "--- 手机消息 ---\n\n";
        for (let key in CONFIG.NPCS) {
            const aff = GameState.affection[key];
            if (aff >= 1) {
                hasMsg = true;
                let level = 'low';
                if (aff >= 12) level = 'high';
                else if (aff >= 6) level = 'mid';
                const messages = CONFIG.PHONE_MESSAGES[key][level];
                const randomMsg = messages[Math.floor(Math.random() * messages.length)];
                msgText += `【${CONFIG.NPCS[key].name}】: ${randomMsg}\n\n`;
            }
        }
        if (!hasMsg) msgText += "暂无新消息。";
        UI.showDialog("手机", msgText, [
            { text: "睡觉", action: () => {
                if (this.advanceTime()) {
                    enterScene('campus');
                }
            }},
            { text: "返回宿舍", action: () => { enterScene('dorm'); } }
        ]);
    }
};

// ========== 所有全局函数 ==========

// 登录相关
window.openLoginModal = function() {
    const template = document.getElementById('login-template');
    const clone = document.importNode(template.content, true);
    document.getElementById('modal-body').innerHTML = '';
    document.getElementById('modal-body').appendChild(clone);
    document.getElementById('modal-container').style.display = 'flex';
    const form = document.getElementById('loginForm');
    if (form) form.onsubmit = window.handleLogin;
    const regForm = document.getElementById('registerForm');
    if (regForm) regForm.onsubmit = window.handleRegister;
};

window.handleLogin = function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    if (!username || !password) { alert('请输入账号和密码'); return; }
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username] && users[username] === password) {
        localStorage.setItem('currentUser', username);
        window.currentUser = username;
        alert('登录成功！');
        window.closeModal();
        window.checkLoginStatus();
    } else {
        alert('账号或密码错误');
    }
};

window.handleRegister = function(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const confirm = document.getElementById('regConfirm').value.trim();
    if (!username || !password || !confirm) { alert('请完整填写'); return; }
    if (password !== confirm) { alert('两次密码不一致'); return; }
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) { alert('账号已存在'); return; }
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
    alert('注册成功，请登录');
    const loginTab = document.querySelector('[data-tab="login"]');
    if (loginTab) loginTab.click();
};

window.logout = function() {
    localStorage.removeItem('currentUser');
    window.currentUser = null;
    window.checkLoginStatus();
};

window.checkLoginStatus = function() {
    const saved = localStorage.getItem('currentUser');
    const startBtn = document.getElementById('startGameBtn');
    if (saved) {
        window.currentUser = saved;
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('userDisplay').style.display = 'inline';
        document.getElementById('userDisplay').innerText = '👤 ' + window.currentUser;
        document.getElementById('logoutBtn').style.display = 'inline';
        if (startBtn) startBtn.disabled = false;
    } else {
        window.currentUser = null;
        document.getElementById('loginBtn').style.display = 'inline';
        document.getElementById('userDisplay').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'none';
        if (startBtn) startBtn.disabled = false;
    }
};

// 角色选择
window.showCharSelect = function() {
    if (!window.currentUser) {
        const loginHtml = `
            <div style="text-align:center; padding:20px 0;">
                <h2 style="color:var(--primary-color); margin-bottom:20px;">🔒 请先登录</h2>
                <p style="color:#ccc; font-size:18px; margin-bottom:30px;">您需要登录后才能开始游戏，点击下方按钮前往登录。</p>
                <button class="submit-btn" onclick="window.closeModal(); window.openLoginModal();" style="font-size:18px; padding:12px 40px;">
                    去登录
                </button>
            </div>
        `;
        window.openModal(loginHtml);
        return;
    }
    document.getElementById('title-screen').style.display = 'none';
    const grid = document.getElementById('char-select-grid');
    grid.innerHTML = '';
    CONFIG.PLAYER_CHARS.forEach(char => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.onclick = () => window.selectChar(char.id, char.img, card);
        const imgBox = document.createElement('div');
        imgBox.className = 'char-img-box';
        if (char.img) imgBox.style.backgroundImage = `url('${char.img}')`;
        const nameEl = document.createElement('div');
        nameEl.className = 'char-name';
        nameEl.innerText = `${char.name} (${char.gender})`;
        card.appendChild(imgBox);
        card.appendChild(nameEl);
        grid.appendChild(card);
    });
    document.getElementById('char-select-screen').style.display = 'flex';
};

window.selectChar = function(id, imgUrl, element) {
    window.selectedCharId = id;
    GameState.player_char_img = imgUrl;
    document.querySelectorAll('.char-card').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    const btn = document.getElementById('confirm-char-btn');
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';
};

window.showNameInput = function() {
    if (!window.selectedCharId) return;
    document.getElementById('char-select-screen').style.display = 'none';
    document.getElementById('name-input-screen').style.display = 'flex';
};

// 通用弹窗
window.openModal = function(htmlContent) {
    document.getElementById('modal-body').innerHTML = htmlContent;
    document.getElementById('modal-container').style.display = 'flex';
};

window.closeModal = function() {
    document.getElementById('modal-container').style.display = 'none';
    document.getElementById('modal-body').innerHTML = '';
};

window.switchTab = function(tab) {
    const container = document.getElementById('modal-body');
    const tabs = container.querySelectorAll('.tab-content');
    const btns = container.querySelectorAll('.tab-btn');
    tabs.forEach(el => el.classList.remove('active'));
    btns.forEach(el => el.classList.remove('active'));
    const targetTab = container.querySelector('#tab-' + tab);
    if (targetTab) targetTab.classList.add('active');
    const targetBtn = container.querySelector(`[data-tab="${tab}"]`);
    if (targetBtn) targetBtn.classList.add('active');
};

// 存档
window.openSaveManager = function() {
    if (!window.currentUser) {
        alert('请先登录！');
        return;
    }
    const template = document.getElementById('save-template');
    const clone = document.importNode(template.content, true);
    document.getElementById('modal-body').innerHTML = '';
    document.getElementById('modal-body').appendChild(clone);
    document.getElementById('modal-container').style.display = 'flex';
    window.renderSaveSlots();
};

window.renderSaveSlots = function() {
    const container = document.getElementById('saveSlots');
    if (!container) return;
    const saves = JSON.parse(localStorage.getItem('saves_' + window.currentUser) || '[]');
    while (saves.length < 10) saves.push(null);
    container.innerHTML = '';
    saves.forEach((save, index) => {
        const slot = document.createElement('div');
        slot.className = 'save-slot';
        if (save) {
            const timeStr = save.time || '未知时间';
            slot.innerHTML = `
                <div class="save-info">
                    <div class="save-name">${save.name || '未命名'}</div>
                    <div class="save-date">📅 ${timeStr}</div>
                    <div class="save-summary">第${save.data.xun}旬 · 智力${save.data.attributes.intelligence.toFixed(1)} 魅力${save.data.attributes.charm.toFixed(1)} 力量${save.data.attributes.strength.toFixed(1)} · 金币${save.data.money}</div>
                </div>
                <div class="save-actions">
                    <button onclick="window.loadSave(${index})">读取</button>
                    <button onclick="window.deleteSave(${index})">删除</button>
                </div>
            `;
        } else {
            slot.innerHTML = `
                <div class="save-info empty">空存档位</div>
                <div class="save-actions">
                    <button onclick="window.saveToSlot(${index})">保存</button>
                </div>
            `;
        }
        container.appendChild(slot);
    });
};

window.saveToSlot = function(index) {
    const name = prompt('请输入存档名称：', '存档' + (index + 1));
    if (name === null) return;
    const saves = JSON.parse(localStorage.getItem('saves_' + window.currentUser) || '[]');
    while (saves.length < 10) saves.push(null);
    const saveData = {
        name: name.trim() || '未命名',
        time: new Date().toLocaleString(),
        data: JSON.parse(JSON.stringify(GameState))
    };
    saves[index] = saveData;
    localStorage.setItem('saves_' + window.currentUser, JSON.stringify(saves));
    window.renderSaveSlots();
    alert('存档成功！');
};

window.loadSave = function(index) {
    if (!confirm('确定要读取此存档吗？当前进度将被覆盖。')) return;
    const saves = JSON.parse(localStorage.getItem('saves_' + window.currentUser) || '[]');
    const save = saves[index];
    if (!save) { alert('存档不存在'); return; }
    Object.assign(GameState, save.data);
    UI.updateStatus();
    UI.applyStatusBarBg(GameState.player_char_img);
    window.closeModal();
    enterScene('campus');
    alert('读档成功！');
};

window.deleteSave = function(index) {
    if (!confirm('确定删除此存档吗？')) return;
    const saves = JSON.parse(localStorage.getItem('saves_' + window.currentUser) || '[]');
    saves[index] = null;
    localStorage.setItem('saves_' + window.currentUser, JSON.stringify(saves));
    window.renderSaveSlots();
};

// 人物详情关闭
window.closeCharDetail = function() {
    document.getElementById('char-detail-overlay').style.display = 'none';
};

// 游戏简介
window.openGameIntro = function() {
    const introText = `
        📖 《长意中学》玩法简介

        你将在这所中学度过完整的三年高中时光（36个月），体验真实的学习与社交生活。时间以「月-旬-时段」推进，每旬分为早晨、中午、下午、傍晚、夜间五个时段。合理安排你的体力与行动，迎接最终的毕业结局。

        【九大场景玩法】

        ① 教室 —— 早晨必须准时学习，否则会累积逃课次数，连续三次逃课将被劝退！平时自习可稳定提升智力。

        ② 图书馆 —— 偶遇图书管理员小茗，帮忙整理书籍可获得好感度和智力加成，自己阅读也能提升智力。

        ③ 体育馆 —— 与篮球队长阿辰切磋球技，提升力量并增进友谊，旁观也能获得少量力量。

        ④ 艺术楼 —— 聆听音乐才女小雨的演奏，提升魅力与好感，欣赏画作同样可以陶冶情操。

        ⑤ 咖啡馆 —— 购买各种饮料恢复体力（小数体力），让你有更多精力探索校园。

        ⑥ 校园商店 —— 出售永久提升属性的道具（智力书籍、魅力香水、力量哑铃），需要积攒金币购买。

        ⑦ 兼职中心 —— 通过打工赚取金币，是积累财富的主要途径。另有钓鱼小游戏，钓到的鱼可直接兑换金币。

        ⑧ 宿舍 —— 睡觉推进时间，查看手机消息（好感度达到一定值后，角色会给你发来问候或邀约）。

        ⑨ 随机逛逛 —— 消耗体力在校园中闲逛，可能会捡到金币、偶遇教授提升属性，也可能会遇到小偷或罚款等意外，收益与风险并存！

        【核心目标】
        平衡智力、魅力、力量三大属性，与心仪的角色培养好感度（0-20），最终的毕业院校和感情归宿将取决于你的选择与努力。
    `;
    const html = `<div style="white-space:pre-line; color:#eaeaea; font-size:15px; line-height:1.8;">${introText}</div>`;
    window.openModal(html);
};

// ===== 消息监听：处理钓鱼和跑酷的返回消息 =====
window.addEventListener('message', function(event) {
    const data = event.data;
    if (data && data.type === 'fishing_result') {
        if (window.GameEngine.handleFishingResult) {
            window.GameEngine.handleFishingResult(data.data);
        } else {
            console.warn('未实现 handleFishingResult');
        }
    } else if (data && data.type === 'fishing_exit') {
        document.getElementById('fishing-overlay').style.display = 'none';
        document.getElementById('dialog-box').style.display = 'flex';
        if (data.data && data.data.totalCatches === 0) {
            UI.showDialog("系统", "🎣 今天一条鱼都没钓到，明天继续加油吧！", [
                { text: "好的", action: () => { enterScene('campus'); } }
            ]);
        } else {
            enterScene('campus');
        }
    }
    // ★★★ 修改：处理跑酷游戏结束消息 ★★★
    else if (data && data.type === 'running_exit') {
        // ★ 必须先隐藏跑酷的遮罩层！否则它会挡住结算对话框，导致按钮点不动！
        document.getElementById('running-overlay').style.display = 'none';
        document.getElementById('dialog-box').style.display = 'flex';
        
        if (window.GameEngine.handleRunningResult) {
            window.GameEngine.handleRunningResult(data.data);
        } else {
            console.warn('未实现 handleRunningResult');
        }
    }
});
// 页面加载后检查登录状态
document.addEventListener('DOMContentLoaded', function() {
    window.checkLoginStatus();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        window.closeCharDetail();
    }
});

console.log('✅ main.js 加载完成，所有全局函数已挂载');
