// scenes.js
import { CONFIG } from './config.js';
import { GameState } from './state.js';
import { UI } from './ui.js';
import { showClassroomStoryEntries } from './storylines.js';

// ===== 广场场景 =====
export function sceneCampus() {
    UI.setBackground('campus');
    UI.clearCharacter();
    UI.clearSideNav();
    UI.showDialog("系统", "欢迎来到长意中学！选择要去的地方吧。", []);
    const navItems = [
        { key: 'classroom', text: '📖 教室' },
        { key: 'library', text: '📚 图书馆' },
        { key: 'gym', text: '🏀 体育馆' },
        { key: 'art_building', text: '🎨 艺术楼' },
        { key: 'cafe', text: '☕ 咖啡馆' },
        { key: 'store', text: '🏪 校园商店' },
        { key: 'part_time', text: '💼 兼职中心' },
        { key: 'dorm', text: '🛏️ 宿舍(休息)' },
        { key: 'randomWalk', text: '🎲 随机逛逛' }
    ];
    const sideNav = UI.el.sideNav;
    sideNav.innerHTML = '';
    navItems.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.innerText = item.text;
        btn.onclick = () => {
            if (item.key === 'randomWalk') {
                if (window.GameEngine && window.GameEngine.randomWalk) {
                    window.GameEngine.randomWalk();
                } else {
                    alert('随机逛逛功能未加载');
                }
            } else {
                enterScene(item.key);
            }
        };
        sideNav.appendChild(btn);
    });
}

// ===== 教室场景 =====
export function sceneClassroom() {
    UI.setBackground('classroom');
    UI.clearCharacter();
    UI.clearSideNav();
    UI.showDialog(
        "【高二三班 · 课间教室】",
        "窗外香樟树叶晃动，粉笔灰落在堆满试卷的课桌上，走廊传来老师脚步声。\n点击下方人物开启故事线（每条共8层选择）",
        [
            { text: "🚪 返回广场", action: () => { enterScene('campus'); } }
        ]
    );
    showClassroomStoryEntries();
}

// ===== 图书馆场景 =====
export function sceneLibrary() {
    UI.setBackground('library');
    UI.setCharacter('ming');
    const isMet = GameState.affection['ming'] > 0;
    UI.showDialog(
        isMet ? CONFIG.NPCS.ming.name : "???",
        isMet ? "又来啦？今天想看什么书？" : "那个...同学，你能帮我搬一下这些书吗？",
        [
            {
                text: "上前帮忙 (好感+0.8, 智力+0.1, 消耗1体力)",
                action: () => {
                    if (window.GameEngine.consumeStamina(1)) {
                        GameState.attributes.intelligence += 0.1;
                        window.GameEngine.changeAffection('ming', 0.8);
                        UI.updateStatus();
                        UI.showDialog(CONFIG.NPCS.ming.name, "太感谢了！我是小茗，图书馆的管理员。这本《时间简史》借你看吧。", [
                            { text: "道谢离开", action: () => enterScene('campus') }
                        ]);
                    }
                }
            },
            {
                text: "自己找书看 (智力+0.6, 消耗1体力)",
                action: () => {
                    if (window.GameEngine.consumeStamina(1)) {
                        GameState.attributes.intelligence += 0.6;
                        UI.updateStatus();
                        enterScene('campus');
                    }
                }
            },
            { text: "离开", action: () => enterScene('campus') }
        ]
    );
}

// ===== 体育馆场景（整合 1/3 概率触发体育老师事件） =====
export function sceneGym() {
    UI.setBackground('gym');
    UI.setCharacter('chen');

    // 1/3 概率触发体育老师小王事件
    if (Math.random() < 1/3) {
        showTeacherModal();
        return;
    }

    // 原有正常交互（阿辰）
    const isMet = GameState.affection['chen'] > 0;
    UI.showDialog(
        isMet ? CONFIG.NPCS.chen.name : "???",
        isMet ? "哟！来运动啊？" : "喂！那边那个，缺人三缺一，来不？",
        [
            {
                text: "加入比赛 (好感+0.8, 力量+1.2, 消耗1体力)",
                action: () => {
                    if (window.GameEngine.consumeStamina(1)) {
                        GameState.attributes.strength += 1.2;
                        window.GameEngine.changeAffection('chen', 0.8);
                        UI.updateStatus();
                        UI.showDialog(CONFIG.NPCS.chen.name, "打得不错嘛！我叫阿辰，校队的。下次一起打！", [
                            { text: "告别", action: () => enterScene('campus') }
                        ]);
                    }
                }
            },
            {
                text: "在旁边观看 (力量+0.5, 消耗0.5体力)",
                action: () => {
                    if (window.GameEngine.consumeStamina(0.5)) {
                        GameState.attributes.strength += 0.5;
                        UI.updateStatus();
                        enterScene('campus');
                    }
                }
            },
            { text: "离开", action: () => enterScene('campus') }
        ]
    );
}

// 显示体育老师模态框（独立于对话框，使用固定定位）
function showTeacherModal() {
    const oldModal = document.querySelector('.teacher-modal-overlay');
    if (oldModal) oldModal.remove();

    const teacher = CONFIG.CHARACTERS.find(c => c.id === 'xiaowang');
    const name = teacher ? teacher.name : '小王老师';
    const title = teacher ? teacher.class : '体育老师';
    const desc = teacher ? teacher.desc : '掌管"800m"的王：喜欢抓同学跑800m的体育老师';
    const img = teacher && teacher.img ? teacher.img : 'images/avatar/xiaowang.jpg';

    const modal = document.createElement('div');
    modal.className = 'teacher-modal-overlay';
    modal.innerHTML = `
        <div class="teacher-modal-box">
            <div class="teacher-img" style="background-image: url('${img}');"></div>
            <div class="teacher-name">${name}</div>
            <div class="teacher-title">${title}</div>
            <div class="teacher-desc">
                你被 <span class="highlight">${name}</span> 抓到了！<br>
                他说："跑完800米才能离开！现在开始跑酷吧！"
            </div>
            <button class="confirm-btn" id="teacherConfirmBtn">接受挑战 🏃</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('teacherConfirmBtn').addEventListener('click', () => {
        modal.remove();
        if (window.GameEngine && window.GameEngine.openRunningGame) {
            window.GameEngine.openRunningGame();
        } else {
            alert('跑酷游戏功能未加载');
        }
    });
}

// ===== 艺术楼场景 =====
export function sceneArt() {
    UI.setBackground('art');
    UI.setCharacter('rain');
    const isMet = GameState.affection['rain'] > 0;
    UI.showDialog(
        isMet ? CONFIG.NPCS.rain.name : "???",
        isMet ? "你也要听我弹琴吗？" : "（远处传来悠扬的钢琴声...）",
        [
            {
                text: "静静聆听 (好感+0.8, 魅力+1.2, 消耗1体力)",
                action: () => {
                    if (window.GameEngine.consumeStamina(1)) {
                        GameState.attributes.charm += 1.2;
                        window.GameEngine.changeAffection('rain', 0.8);
                        UI.updateStatus();
                        UI.showDialog(CONFIG.NPCS.rain.name, "啊...有人？我是小雨，音乐系的。你...你喜欢听吗？", [
                            { text: "点头微笑", action: () => enterScene('campus') }
                        ]);
                    }
                }
            },
            {
                text: "欣赏画作 (魅力+0.5, 消耗0.5体力)",
                action: () => {
                    if (window.GameEngine.consumeStamina(0.5)) {
                        GameState.attributes.charm += 0.5;
                        UI.updateStatus();
                        enterScene('campus');
                    }
                }
            },
            { text: "离开", action: () => enterScene('campus') }
        ]
    );
}

// ===== 咖啡馆场景（调用商店面板） =====
export function sceneCafe() {
    UI.setBackground('cafe');
    UI.showDialog('☕ 咖啡馆', '欢迎光临！', []);
    if (window.GameEngine.showShopPanel) {
        window.GameEngine.showShopPanel('cafe');
    } else {
        UI.showDialog('系统', '商店功能未加载', [{ text: '返回', action: () => enterScene('campus') }]);
    }
}

// ===== 校园商店场景（调用商店面板） =====
export function sceneStore() {
    UI.setBackground('store');
    UI.showDialog('🏪 校园商店', '欢迎光临！这里有各种学习用品和装备。', []);
    if (window.GameEngine.showShopPanel) {
        window.GameEngine.showShopPanel('store');
    } else {
        UI.showDialog('系统', '商店功能未加载', [{ text: '返回', action: () => enterScene('campus') }]);
    }
}

// ===== 宿舍场景 =====
export function sceneDorm() {
    UI.setBackground('dorm');
    UI.showDialog("系统", "你回到了宿舍。", [
        {
            text: "直接睡觉 (进入下一时间段)",
            action: () => {
                GameState.stamina = Math.min(CONFIG.MAX_STAMINA, GameState.stamina + 1);
                if (window.GameEngine.advanceTime()) {
                    enterScene('campus');
                }
            }
        },
        {
            text: "查看手机消息",
            action: () => {
                if (window.GameEngine.checkPhoneMessages) {
                    window.GameEngine.checkPhoneMessages();
                } else {
                    UI.showDialog("系统", "手机消息功能暂未开放。", [{ text: "返回", action: () => sceneDorm() }]);
                }
            }
        },
        { text: "返回广场", action: () => enterScene('campus') }
    ]);
}

// ===== 兼职中心场景 =====
export function scenePartTime() {
    UI.setBackground('campus');
    UI.showDialog("兼职中心", "目前有以下兼职：", [
        {
            text: "图书馆整理 (消耗2体力, 获得50金币)",
            action: () => {
                if (window.GameEngine.consumeStamina(2)) {
                    GameState.money += 50;
                    UI.updateStatus();
                    UI.showDialog("系统", "辛苦了，获得50金币。", [{ text: "返回", action: () => enterScene('campus') }]);
                }
            }
        },
        {
            text: "体育馆清洁 (消耗2体力, 获得60金币)",
            action: () => {
                if (window.GameEngine.consumeStamina(2)) {
                    GameState.money += 60;
                    UI.updateStatus();
                    UI.showDialog("系统", "辛苦了，获得60金币。", [{ text: "返回", action: () => enterScene('campus') }]);
                }
            }
        },
        {
            text: "🎣 钓鱼赚钱 (每日一次)",
            action: () => {
                if (GameState.hasFishedToday) {
                    UI.showDialog("系统", "今天已经钓过鱼了，明天再来吧！", [
                        { text: "知道了", action: () => enterScene('campus') }
                    ]);
                    return;
                }
                GameState.hasFishedToday = true;
                const overlay = document.getElementById('fishing-overlay');
                overlay.style.display = 'flex';
                const iframe = document.getElementById('fishing-iframe');
                iframe.src = 'diaoyu-B.html?t=' + Date.now();
                UI.showDialog("系统", "🎣 开始钓鱼吧！限时180秒，钓到的鱼会直接兑换金币。\n大鱼200金 | 中鱼50金 | 小鱼10金\n共9种鱼等你来钓！", [
                    { text: "知道了", action: () => {} }
                ]);
                document.getElementById('dialog-box').style.display = 'none';
            }
        },
        { text: "离开", action: () => enterScene('campus') }
    ]);
}

// ===== 场景映射表 =====
export const sceneMap = {
    'campus': sceneCampus,
    'classroom': sceneClassroom,
    'library': sceneLibrary,
    'gym': sceneGym,
    'art_building': sceneArt,
    'cafe': sceneCafe,
    'store': sceneStore,
    'dorm': sceneDorm,
    'part_time': scenePartTime
};

// ===== 场景入口函数 =====
export function enterScene(sceneKey) {
    document.getElementById('shop-panel')?.remove();
    UI.clearCharacter();
    UI.clearSideNav();
    if (sceneMap[sceneKey]) {
        sceneMap[sceneKey]();
    } else {
        UI.showDialog("系统", "🚧 场景待开发", [
            { text: "返回广场", action: () => enterScene('campus') }
        ]);
    }
}