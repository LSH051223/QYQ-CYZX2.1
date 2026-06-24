// state.js
import { CONFIG } from './config.js';

export const GameState = {
    player_name: "",
    player_char_id: "",
    player_char_img: "",
    xun: 1,
    time_index: 0,
    stamina: CONFIG.MAX_STAMINA,
    money: 100,
    attributes: { intelligence: 50, charm: 50, strength: 50 },
    study_misses: 0,
    studied_today: false,
    affection: { ming: 0, chen: 0, rain: 0, suhe: 0 },   // 新增 suhe
    last_interaction_day: { ming: 0, chen: 0, rain: 0, suhe: 0 },
    hasFishedToday: false,

    // 剧情进度记录（每条主线当前层数，0开始）
    storyProgress: {
        linzhixia: 0,
        wenshu: 0,
        suhe: 0
    },
    // 是否已完成某条主线（结局已触发）
    storyCompleted: {
        linzhixia: false,
        wenshu: false,
        suhe: false
    },

    init() {
        this.xun = 1;
        this.time_index = 0;
        this.stamina = CONFIG.MAX_STAMINA;
        this.money = 100;
        this.attributes = { intelligence: 50, charm: 50, strength: 50 };
        this.study_misses = 0;
        this.studied_today = false;
        this.affection = { ming: 0, chen: 0, rain: 0, suhe: 0 };
        this.last_interaction_day = { ming: 0, chen: 0, rain: 0, suhe: 0 };
        this.hasFishedToday = false;
        this.storyProgress = { linzhixia: 0, wenshu: 0, suhe: 0 };
        this.storyCompleted = { linzhixia: false, wenshu: false, suhe: false };
    }
};