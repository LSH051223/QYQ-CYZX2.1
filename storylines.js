// storylines.js
import { CONFIG } from './config.js';
import { GameState } from './state.js';
import { UI } from './ui.js';
import { enterScene } from './scenes.js';

function applyEffect(effectStr) {
    if (!effectStr) return;
    const parts = effectStr.split(',');
    parts.forEach(part => {
        part = part.trim();
        if (part.startsWith('affection_')) {
            const [key, val] = part.replace('affection_','').split('+');
            if (key && val) {
                const num = parseFloat(val);
                if (!isNaN(num)) {
                    GameState.affection[key] = (GameState.affection[key] || 0) + num;
                }
            }
        } else if (part.startsWith('ending_')) {
            const endingKey = part.replace('ending_','');
            handleEnding(endingKey);
        } else {
            const [attr, raw] = part.split('+');
            if (attr && raw) {
                const val = parseFloat(raw);
                if (!isNaN(val)) {
                    if (attr === 'money') GameState.money += val;
                    else if (attr === 'stamina') GameState.stamina = Math.min(CONFIG.MAX_STAMINA, GameState.stamina + val);
                    else if (attr === 'intelligence' || attr === 'charm' || attr === 'strength') {
                        GameState.attributes[attr] += val;
                    }
                }
            }
        }
    });
    UI.updateStatus();
}

// ✅ 处理所有故事线的结局
function handleEnding(key) {
    let title, desc;
    if (key.startsWith('linzhixia_')) {
        switch(key) {
            case 'linzhixia_friend':
                title = "暖心好友结局";
                desc = "你和林知夏成为了长期稳定的学习搭子，互相鼓励，共同进步。";
                break;
            case 'linzhixia_dream':
                title = "双向奔赴励志结局";
                desc = "你们约定考同一座城市大学，为共同的未来努力。";
                break;
            case 'linzhixia_normal':
                title = "平淡普通结局";
                desc = "你们保持着普通同学关系，各自走向不同的人生。";
                break;
            case 'linzhixia_heal':
                title = "治愈成长结局";
                desc = "你开导她放下分数焦虑，她找到了学习的真正意义。";
                break;
            default: return;
        }
    } else if (key.startsWith('wenshu_')) {
        switch(key) {
            case 'wenshu_dream':
                title = "理想成真结局";
                desc = "温舒获奖并成功转文科，考上汉语言文学专业。";
                break;
            case 'wenshu_balance':
                title = "平衡成长结局";
                desc = "她大赛获奖但留理科，大学双修文学双学位。";
                break;
            case 'wenshu_regret':
                title = "遗憾留白结局";
                desc = "她放弃文学全心学理，多年后重拾写作。";
                break;
            case 'wenshu_win':
                title = "中庸圆满结局";
                desc = "她兼顾文理，成为独特的文理平衡学霸。";
                break;
            default: return;
        }
    } else if (key.startsWith('suhe_')) {
        switch(key) {
            case 'suhe_self':
                title = "自愈成长结局";
                desc = "苏禾规律复诊，身体好转，成绩稳步提升，她学会了平衡健康与学习。";
                break;
            case 'suhe_regret':
                title = "遗憾取舍结局";
                desc = "苏禾强行推迟复诊，成绩略有进步，但病情加重，需要长期休养。";
                break;
            case 'suhe_warm':
                title = "温暖相伴结局";
                desc = "家长调整复诊到周末，苏禾身体健康、成绩稳定，和你成为互相照顾的好友。";
                break;
            case 'suhe_awake':
                title = "警醒蜕变结局";
                desc = "苏禾过度忽视身体，成绩大幅下滑，她下定决心调整生活作息。";
                break;
            default: return;
        }
    } else {
        return; // 未知结局
    }

    // 用对话框显示结局，并返回教室
    UI.showDialog(
        "🎉 " + title,
        desc + "\n\n故事线已完结。",
        [
            { text: "📚 返回教室", action: () => { enterScene('classroom'); } }
        ]
    );

    // 标记该主线已完成
    let storyKey = null;
    if (key.startsWith('linzhixia')) storyKey = 'linzhixia';
    else if (key.startsWith('wenshu')) storyKey = 'wenshu';
    else if (key.startsWith('suhe')) storyKey = 'suhe';
    if (storyKey) GameState.storyCompleted[storyKey] = true;
}

export function enterStoryLine(storyKey) {
    const story = CONFIG.STORYLINES[storyKey];
    if (!story) return;
    const progress = GameState.storyProgress[storyKey] || 0;
    if (progress >= story.layers.length) {
        UI.showDialog("系统", "这条故事线已经结束。", [
            { text: "返回教室", action: () => { enterScene('classroom'); } }
        ]);
        return;
    }
    const layer = story.layers[progress];
    const choices = layer.choices.map(choice => ({
        text: choice.text,
        action: () => {
            applyEffect(choice.effect);
            GameState.storyProgress[storyKey] = progress + 1;
            // 如果是结局层（索引7），结局已由 handleEnding 显示，不重复弹窗
            if (progress < 7) {
                enterStoryLine(storyKey);
            }
        }
    }));
    UI.showDialog(story.name, layer.text, choices);
}

export function showClassroomStoryEntries() {
    const nav = UI.el.sideNav;
    nav.innerHTML = '';
    const entries = [
        { key: 'linzhixia', label: '① 埋头刷题的同桌林知夏' },
        { key: 'wenshu', label: '② 讲台抱作文本的语文课代表温舒' },
        { key: 'suhe', label: '③ 藏请假条的女生苏禾' }
    ];
    entries.forEach(entry => {
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.innerText = entry.label;
        btn.onclick = () => {
            if (GameState.storyCompleted[entry.key]) {
                UI.showDialog("提示", "这条故事线你已经体验过了。", [
                    { text: "返回教室", action: () => { enterScene('classroom'); } }
                ]);
                return;
            }
            GameState.storyProgress[entry.key] = 0;
            enterStoryLine(entry.key);
        };
        nav.appendChild(btn);
    });
}