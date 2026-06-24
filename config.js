// config.js
export const CONFIG = {
    TOTAL_MONTHS: 36,
    XUN_PER_MONTH: 3,
    TIME_SLOTS: ["早晨", "中午", "下午", "傍晚", "夜间"],
    MONTH_NAMES: ["9月","10月","11月","12月","1月","2月","3月","4月","5月","6月","7月","8月"],
    XUN_NAMES: ["上旬","中旬","下旬"],
    MAX_STAMINA: 2,

    NPCS: {
        ming: { name: "小茗", desc: "图书馆管理员", type: "charm" },
        chen: { name: "阿辰", desc: "篮球队长", type: "strength" },
        rain: { name: "小雨", desc: "音乐系才女", type: "charm" }
    },

    PLAYER_CHARS: [
        { id: "male_1", name: "林风", gender: "男", img: "images/avatar/nan1.jpg" },
        { id: "male_2", name: "宇轩", gender: "男", img: "images/avatar/player_male_2.png" },
        { id: "male_3", name: "浩然", gender: "男", img: "images/avatar/player_male_3.png" },
        { id: "female_1", name: "西野明日风", gender: "女", img: "images/avatar/nv1.jpg" },
        { id: "female_2", name: "绫乃", gender: "女", img: "images/avatar/nv2.jpg" },
        { id: "female_3", name: "莎朗", gender: "女", img: "images/avatar/nv3.jpg" }
    ],

    IMAGES: {
        bg_campus: "images/bg/bg_campus.jpg",
        bg_classroom: "images/bg/bg_classroom.jpg",
        bg_library: "images/bg/bg_library.jpg",
        bg_gym: "images/bg/bg_gym.jpg",
        bg_art: "images/bg/bg_art.jpg",
        bg_cafe: "images/bg/bg_cafe.jpg",
        bg_store: "images/bg/bg_store.jpg",
        bg_dorm: "images/bg/bg_dorm.jpg",
        char_ming: "images/char/char_ming.png",
        char_chen: "images/char/char_chen.png",
        char_rain: "images/char/char_rain.png"
    },

    PHONE_MESSAGES: {
        ming: {
            low: ["今天图书馆新进了一批艺术类书籍，你有兴趣看看吗？", "我发现了一本好书，觉得你会喜欢。", "图书馆今天好安静啊..."],
            mid: ["读书会这周五有新活动，你有兴趣吗？", "今天在图书馆看到你了，读的什么书？", "最近在忙什么呢？好久没来图书馆了."],
            high: ["有些话想当面和你说...明天能来图书馆吗？", "我把你上次推荐的书看完了，很感动。", "谢谢你也喜欢安静的地方，有你在感觉很安心。"]
        },
        chen: {
            low: ["嘿！看到你今天在广场上了。", "下次有空一起打球啊。", "刚跑完步，累死了。"],
            mid: ["下周有场重要比赛，来看吗？", "今天打球很尽兴，下次一起？", "球队在招新队员，你有兴趣试试吗？"],
            high: ["我想听你给我加油...", "赢了比赛第一个想告诉你！", "其实打篮球最开心的不是赢球...是有人在场边看我。"]
        },
        rain: {
            low: ["那个...今天的课你觉得难吗？", "我也觉得食堂的饭不好吃...", "今天的云彩形状好像音符。"],
            mid: ["我写了首新曲子，想听听你的意见。", "下个月有场音乐会，你会来吗？", "今天在艺术楼看到你了，你也喜欢艺术吗？"],
            high: ["这首曲子...是为你写的。", "如果你能来听我的音乐会就好了。", "你的笑容像阳光一样，能照进我的心里。"]
        }
    },

    ITEMS: {
        cafe: [
            { id: 'coffee', name: '☕ 咖啡', price: 1000, desc: '恢复2.0体力（性价比最高）', img: 'images/items/milk.jpg', stamina: 2.0 },
            { id: 'tea', name: '🍵 茶', price: 800, desc: '恢复1.0体力', img: 'images/items/tea.jpg', stamina: 1.0 },
            { id: 'juice', name: '🧃 果汁', price: 900, desc: '恢复1.2体力', img: 'images/items/juice.jpg', stamina: 1.2 },
            { id: 'milk', name: '🥛 牛奶', price: 600, desc: '恢复0.8体力', img: 'images/items/milk.jpg', stamina: 0.8 },
            { id: 'milktea', name: '🧋 奶茶', price: 950, desc: '恢复1.3体力', img: 'images/items/nc.jpg', stamina: 1.3 },
            { id: 'hotchoco', name: '🍫 热巧克力', price: 850, desc: '恢复1.1体力', img: 'images/items/kl.jpg', stamina: 1.1 },
            { id: 'water', name: '💧 矿泉水', price: 100, desc: '恢复0.5体力', img: 'images/items/water.jpg', stamina: 0.5 }
        ],
        store: [
            { id: 'book', name: '📚 智力书籍', price: 1000, desc: '智力+25', img: 'images/items/zlsj.jpg', attr: 'intelligence', val: 25 },
            { id: 'perfume', name: '🌸 魅力香水', price: 1200, desc: '魅力+20', img: 'images/items/mlxs.jpg', attr: 'charm', val: 20 },
            { id: 'dumbbell', name: '🏋️ 力量哑铃', price: 1000, desc: '力量+30', img: 'images/items/llyl.jpg', attr: 'strength', val: 30 }
        ]
    },

    // ===== 30+角色人物介绍（完整） =====
    CHARACTERS: [
        { id: 'changyi', name: '长意', gender: '女', age: 20, class: '校长', hobby: '开发自己校园', personality: '英明神武',
            background: '有一间从不对外开放的办公室，门牌上只刻着一行神秘的小字：“校长室·非请勿入”。没人见过她的真面目，有人说他会在考试周化身成图书馆的守夜人，用谜题考验学生，答对者将获得“免挂金牌。',
            desc: '在这个校园里是全领域的统帅', img: 'https://picsum.photos/seed/ming/200/200' },
        {
            id: 'xingheng',
            name: '星恒',
            gender: '男',
            age: 20,
            class: '秘书长/后勤主任',
            hobby: '协助校长管理校园',
            personality: '运筹帷幄',
            background: '我是学校的秘书长兼后勤大管家。简单说，我的日常就是：左手握着学校的“决策方向盘”（秘书工作），右手端着大家的"柴米油盐酱醋茶"（后勤保障）。',
            desc: '校园最强辅助．全能背锅侠·物资守护者。', img: 'https://picsum.photos/seed/ming/200/200'
        },
        { id: 'xiaowang', name: '小王', gender: '男', age: 37, class: '体育老师', hobby: '健身、哑铃和800M', personality: '一身正气',
            background: '疑似学校的“黑恶势力”', desc: '掌管“800m”的王：喜欢在学校操场抓同学跑800m的体育老师', img: 'images/avatar/xiaowang.jpg' },
        { id: 'chen', name: '阿辰', gender: '男', age: 18, class: '高三(1)班', hobby: '篮球、健身', personality: '阳光开朗，重情重义',
            background: '校篮球队的绝对主力，带领球队多次获得市级冠军。外表粗犷，内心却很细腻。', desc: '球场上的热血少年，永远充满活力。',
            img: 'https://picsum.photos/seed/chen/200/200' },
        { id: 'rain', name: '小雨', gender: '女', age: 16, class: '高二(3)班', hobby: '钢琴、作曲', personality: '温柔恬静，富有艺术气质',
            background: '音乐世家出身，从小学习钢琴，曾在省级比赛中获得金奖。梦想是成为一名作曲家。', desc: '指尖流淌着音符的文艺少女。',
            img: 'https://picsum.photos/seed/rain/200/200' },
        { id: 'char_04', name: '王浩然', gender: '男', age: 17, class: '高三(3)班', hobby: '编程、机器人', personality: '理性冷静，逻辑缜密',
            background: '学校科技社的社长，曾在全国青少年科技创新大赛中获得一等奖。对人工智能有着浓厚的兴趣。', desc: '代码世界里的探索者，未来科技之星。',
            img: 'https://picsum.photos/seed/wanghaoran/200/200' },
        { id: 'char_05', name: '陈语嫣', gender: '女', age: 16, class: '高二(1)班', hobby: '绘画、摄影', personality: '感性浪漫，善于观察',
            background: '艺术班的学生，擅长水彩和油画。作品多次在校内外展出，梦想是成为一名自由插画师。', desc: '用画笔捕捉光影的梦幻少女。',
            img: 'https://picsum.photos/seed/chenyuyan/200/200' },
        { id: 'char_06', name: '刘子轩', gender: '男', age: 18, class: '高三(5)班', hobby: '足球、电竞', personality: '热情奔放，团队领袖',
            background: '校足球队队长，带领球队闯入市级决赛。同时是电竞社的核心成员，擅长策略类游戏。', desc: '绿茵场上的追风少年，也是虚拟世界的指挥官。',
            img: 'https://picsum.photos/seed/liuzixuan/200/200' },
        { id: 'char_07', name: '林梦瑶', gender: '女', age: 17, class: '高三(4)班', hobby: '舞蹈、瑜伽', personality: '坚韧优雅，追求完美',
            background: '校舞蹈社的社长，擅长古典舞和现代舞。曾代表学校参加市级文艺汇演并获得一等奖。', desc: '舞台上的精灵，用身体诉说故事。',
            img: 'https://picsum.photos/seed/linmengyao/200/200' },
        { id: 'char_08', name: '赵天宇', gender: '男', age: 16, class: '高二(2)班', hobby: '天文、物理', personality: '好奇睿智，热爱探索',
            background: '天文社的骨干成员，对宇宙有着无限好奇。曾发现一颗小行星并获得了国际天文学会的认可。', desc: '仰望星空的少年，梦想是探索宇宙。',
            img: 'https://picsum.photos/seed/zhaotianyu/200/200' },
        { id: 'char_09', name: '苏晚晴', gender: '女', age: 18, class: '高三(6)班', hobby: '写作、辩论', personality: '聪慧犀利，能言善辩',
            background: '校辩论队的主力辩手，逻辑清晰，口才出众。曾在省级辩论赛中荣获最佳辩手称号。', desc: '用言语征服全场的辩论女王。',
            img: 'https://picsum.photos/seed/suwanqing/200/200' },
        { id: 'char_10', name: '周子豪', gender: '男', age: 17, class: '高二(4)班', hobby: '武术、书法', personality: '沉稳内敛，文武双全',
            background: '从小习武，擅长太极拳和长拳。同时写得一手好字，是学校书法社的副社长。', desc: '静若处子，动若脱兔的文武全才。',
            img: 'https://picsum.photos/seed/zhouzihao/200/200' },
        { id: 'char_11', name: '白若雪', gender: '女', age: 16, class: '高一(1)班', hobby: '烘焙、花艺', personality: '温柔细腻，心灵手巧',
            background: '从小跟随外婆学习烘焙和花艺，制作的甜点和花艺作品在学校义卖中备受欢迎。', desc: '用甜蜜和花香温暖他人的女孩。',
            img: 'https://picsum.photos/seed/bairuoxue/200/200' },
        { id: 'char_12', name: '陆子明', gender: '男', age: 18, class: '高三(7)班', hobby: '历史、考古', personality: '博学多闻，沉稳持重',
            background: '历史社的社长，对古代文明有着深入研究。曾参与省级历史知识竞赛并获得冠军。', desc: '行走的历史百科全书。',
            img: 'https://picsum.photos/seed/luziming/200/200' },
        { id: 'char_13', name: '江采薇', gender: '女', age: 17, class: '高二(5)班', hobby: '古筝、茶道', personality: '古典优雅，气质如兰',
            background: '古筝十级，多次参加市级民乐比赛并获奖。同时热爱茶道，是学校茶艺社的创始人。', desc: '琴音茶香里的古典美人。',
            img: 'https://picsum.photos/seed/jiangcaiwei/200/200' },
        { id: 'char_14', name: '徐子涵', gender: '男', age: 16, class: '高一(3)班', hobby: '昆虫、生物', personality: '专注执着，热爱自然',
            background: '生物社的骨干，对昆虫有深入的研究。曾在省级生物竞赛中获得二等奖。', desc: '大自然的小小观察家。',
            img: 'https://picsum.photos/seed/xuzihan/200/200' },
        { id: 'char_15', name: '顾嫣然', gender: '女', age: 18, class: '高三(8)班', hobby: '时装设计、手工', personality: '时尚前卫，充满创意',
            background: '服装设计爱好者，曾在校内举办个人服装展。梦想是成为一名时装设计师。', desc: '用布料和针线编织梦想的设计师。',
            img: 'https://picsum.photos/seed/guyanran/200/200' },
        { id: 'char_16', name: '沈天翔', gender: '男', age: 17, class: '高二(6)班', hobby: '登山、摄影', personality: '勇敢坚毅，热爱冒险',
            background: '登山社的社长，曾多次组织校际登山活动。摄影作品曾获得市级青少年摄影大赛金奖。', desc: '用镜头记录世界，用脚步丈量山河。',
            img: 'https://picsum.photos/seed/shentianxiang/200/200' },
        { id: 'char_17', name: '洛雪', gender: '女', age: 16, class: '高一(5)班', hobby: '动漫、配音', personality: '活泼可爱，声线多变',
            background: '动漫社的核心成员，擅长配音和cosplay。曾在校内动漫节中获得最佳配音奖。', desc: '用声音塑造角色的二次元少女。',
            img: 'https://picsum.photos/seed/luoxue/200/200' },
        { id: 'char_18', name: '顾长风', gender: '男', age: 18, class: '高三(9)班', hobby: '哲学、辩论', personality: '深刻睿智，善于思辨',
            background: '哲学社的社长，对存在主义有深入研究。是校辩论队的核心成员，曾获省级最佳辩手。', desc: '在思辨中寻找真理的哲学少年。',
            img: 'https://picsum.photos/seed/guchangfeng/200/200' },
        { id: 'char_19', name: '叶知秋', gender: '女', age: 17, class: '高二(7)班', hobby: '诗歌、书法', personality: '诗意浪漫，情感丰富',
            background: '文学社的副社长，擅长现代诗创作。作品多次在校刊和市级文学杂志上发表。', desc: '用文字编织诗意的文艺少女。',
            img: 'https://picsum.photos/seed/yezhiqiu/200/200' },
        { id: 'char_20', name: '韩子瑜', gender: '男', age: 16, class: '高一(7)班', hobby: '围棋、数学', personality: '沉静善思，逻辑严密',
            background: '围棋社的社长，业余五段。数学成绩优异，曾获省级数学竞赛一等奖。', desc: '棋盘上的智者，数学中的天才。',
            img: 'https://picsum.photos/seed/hanziyu/200/200' },
        { id: 'char_21', name: '花语嫣', gender: '女', age: 18, class: '高三(10)班', hobby: '园艺、插花', personality: '恬淡自然，热爱生命',
            background: '生物社的成员，对植物学有浓厚兴趣。在学校开辟了一个小花园，成为校园一景。', desc: '与花草为伴的悠然女孩。',
            img: 'https://picsum.photos/seed/huayuyan/200/200' },
        { id: 'char_22', name: '秦少卿', gender: '男', age: 17, class: '高二(8)班', hobby: '乐器、作曲', personality: '才华横溢，追求艺术',
            background: '校乐团的首席小提琴手，擅长作曲和编曲。曾创作多首校园歌曲，深受同学喜爱。', desc: '用音符谱写青春的才子。',
            img: 'https://picsum.photos/seed/qinshaoqing/200/200' },
        { id: 'char_23', name: '柳如烟', gender: '女', age: 16, class: '高一(9)班', hobby: '游泳、潜水', personality: '自由洒脱，热爱运动',
            background: '校游泳队的成员，曾在市级青少年游泳比赛中获得银牌。梦想是成为一名海洋生物学家。', desc: '在水中自由如鱼的运动少女。',
            img: 'https://picsum.photos/seed/liuruyan/200/200' },
        { id: 'char_24', name: '楚风', gender: '男', age: 18, class: '高三(11)班', hobby: '诗歌、篮球', personality: '豪放不羁，才华横溢',
            background: '文学社的社长，擅长古体诗和现代诗。同时热爱篮球，是校队的得分后卫。', desc: '左手写诗，右手投篮的校园传奇。',
            img: 'https://picsum.photos/seed/chufeng/200/200' },
        { id: 'char_25', name: '慕容雪', gender: '女', age: 17, class: '高二(9)班', hobby: '考古、历史', personality: '知性优雅，富有内涵',
            background: '历史社的副社长，对唐代文化有深入研究。曾参与省级历史论文比赛并获得一等奖。', desc: '与千年文明对话的知性少女。',
            img: 'https://picsum.photos/seed/murongxue/200/200' },
        { id: 'char_26', name: '凌风', gender: '男', age: 16, class: '高一(11)班', hobby: '航模、物理', personality: '动手能力强，充满好奇心',
            background: '科技社的骨干，擅长制作航模和无人机。曾在全国青少年航模锦标赛中获得三等奖。', desc: '让梦想飞上蓝天的少年工程师。',
            img: 'https://picsum.photos/seed/lingfeng/200/200' },
        { id: 'char_27', name: '阮清音', gender: '女', age: 18, class: '高三(12)班', hobby: '古琴、书法', personality: '淡雅脱俗，静心养性',
            background: '古琴社的社长，古琴九级。书法作品曾在市级青少年书法展中展出。', desc: '琴音墨香中的古典淑女。',
            img: 'https://picsum.photos/seed/ruanqingyin/200/200' },
        { id: 'char_28', name: '萧逸尘', gender: '男', age: 17, class: '高二(10)班', hobby: '赛车、机械', personality: '热血激情，追求速度',
            background: '汽车社的创始人，对汽车机械有着浓厚的兴趣。梦想是成为一名赛车工程师。', desc: '与速度共舞的机械天才。',
            img: 'https://picsum.photos/seed/xiaoyichen/200/200' },
        { id: 'char_29', name: '宁若曦', gender: '女', age: 16, class: '高一(13)班', hobby: '配音、表演', personality: '开朗大方，富有感染力',
            background: '戏剧社的成员，擅长表演和配音。曾在校内话剧节中获得最佳女演员奖。', desc: '用声音和表演打动观众的舞台之星。',
            img: 'https://picsum.photos/seed/ningruoxi/200/200' },
        { id: 'char_30', name: '陆之遥', gender: '男', age: 18, class: '高三(13)班', hobby: '旅行、写作', personality: '自由独立，热爱生活',
            background: '校报的主编，擅长游记和散文写作。曾独自骑行环游全省，写下数万字的旅行笔记。', desc: '用双脚丈量世界，用文字记录生活。',
            img: 'https://picsum.photos/seed/luzhiyao/200/200' }
    ],

    // ===== 三条主线剧情（已包含苏禾线） =====
    STORYLINES: {
        linzhixia: {
            name: "林知夏",
            title: "埋头刷题的同桌",
            layers: [
                {
                    text: "课间，同桌红着眼眶撕了一张数学模考卷，手里攥满草稿纸。",
                    choices: [
                        { text: "递纸巾轻声安慰她", effect: "affection+1, intelligence+0.5" },
                        { text: "拿出自己的错题本，主动问她难题", effect: "affection+1.5, intelligence+1" },
                        { text: "调侃：'这点分数不至于，我考得比你还差'", effect: "affection+0.5" },
                        { text: "自顾自写作业，假装没看见", effect: "affection-1" }
                    ]
                },
                {
                    text: "她开口倾诉自己跟不上物理进度。",
                    choices: [
                        { text: "放学主动留下来陪她补物理", effect: "affection+1.5, intelligence+1" },
                        { text: "分享你私藏的网课资源给她", effect: "affection+1, intelligence+1.2" },
                        { text: "劝她别太卷，适当午休放松", effect: "affection+0.5, charm+0.5" }
                    ]
                },
                {
                    text: "她说出父母只看排名，退步就会被指责，心态崩溃。",
                    choices: [
                        { text: "带她午休去操场散步散心", effect: "affection+1.5, charm+1" },
                        { text: "帮她整理各科高频考点笔记", effect: "affection+2, intelligence+1.5" },
                        { text: "和她约定周末一起去图书馆自习", effect: "affection+1.5, intelligence+1" },
                        { text: "劝她和父母好好沟通一次", effect: "affection+1, charm+0.5" }
                    ]
                },
                {
                    text: "班主任路过，看见你们聊天，皱眉看向你们俩。",
                    choices: [
                        { text: "立刻低头假装刷题，避开老师目光", effect: "affection-0.5" },
                        { text: "主动站起来和老师解释同桌状态不好", effect: "affection+1.5, charm+1" },
                        { text: "示意同桌先闭嘴，等老师走再说", effect: "affection-1" }
                    ]
                },
                {
                    text: "午休时，班里卷王过来阴阳怪气：'有些人整天聊天还想考好大学？'",
                    choices: [
                        { text: "直接帮同桌回怼对方", effect: "affection+2, charm+1.5" },
                        { text: "拉着同桌躲开，不与其争执", effect: "affection+1" },
                        { text: "沉默低头刷题，不掺和争吵", effect: "affection-0.5" },
                        { text: "理性和卷王讲道理，平和化解", effect: "affection+1.5, intelligence+1" },
                        { text: "拉同桌去小卖部买零食转移注意力", effect: "affection+1, charm+0.5" }
                    ]
                },
                {
                    text: "晚自习结束，同桌独自留在教室不肯回家，想刷完一套理综卷。",
                    choices: [
                        { text: "留下来陪她一起刷题到熄灯", effect: "affection+2, intelligence+1.5" },
                        { text: "劝她早点回家休息，身体更重要", effect: "affection+1.5, charm+1" },
                        { text: "给她带热牛奶，默默坐在旁边陪伴", effect: "affection+2, charm+0.5" },
                        { text: "直接先走，认为每个人都要自己消化压力", effect: "affection-1" }
                    ]
                },
                {
                    text: "月考即将到来，同桌问你要不要一起制定冲刺复习计划。",
                    choices: [
                        { text: "制定高强度每日刷题计划表", effect: "affection+1, intelligence+2" },
                        { text: "制定劳逸结合，每天留半小时放松", effect: "affection+1.5, intelligence+1.5" },
                        { text: "拒绝，你想独自按照自己节奏复习", effect: "affection-1" }
                    ]
                },
                {
                    text: "月考成绩出炉，同桌分数回升/依旧低迷，触发分支结局。",
                    choices: [
                        { text: "考后约她吃小吃散心，长期稳定学习搭子（暖心好友结局）", effect: "ending_linzhixia_friend" },
                        { text: "互相交换志愿，约定考同一座城市大学（双向奔赴励志结局）", effect: "ending_linzhixia_dream" },
                        { text: "保持距离，仅维持普通同学关系（平淡普通结局）", effect: "ending_linzhixia_normal" },
                        { text: "开导她放下分数焦虑，找到学习真正意义（治愈成长结局）", effect: "ending_linzhixia_heal" }
                    ]
                }
            ]
        },
        wenshu: {
            name: "温舒",
            title: "讲台抱作文本的语文课代表",
            layers: [
                {
                    text: "她抱着全班作文本站在讲台，对着作文评语叹气，草稿纸上写满诗歌。",
                    choices: [
                        { text: "上前搭话，夸赞她上次月考作文写得很好", effect: "affection+1.5, charm+1" },
                        { text: "帮她分担一半作业本，放到讲桌", effect: "affection+1" },
                        { text: "随口劝她：理科好找工作，别胡思乱想转文科", effect: "affection-1" },
                        { text: "远远看着，继续写手里的化学卷子", effect: "affection-0.5" }
                    ]
                },
                {
                    text: "她主动和你坦白：想下学期申请转文科班，害怕理科班主任反对。",
                    choices: [
                        { text: "全力支持她追逐文字爱好，陪她找老师沟通", effect: "affection+2, charm+1.5" },
                        { text: "劝她三思，文科分数线高、就业面窄", effect: "affection-0.5, intelligence+1" },
                        { text: "折中建议：不转班，课余自学文学、参加作文竞赛", effect: "affection+1.5, intelligence+1" }
                    ]
                },
                {
                    text: "语文老师走进教室，单独叫她过去，鼓励她坚持文学道路。",
                    choices: [
                        { text: "等老师聊完，主动询问老师对转科的建议", effect: "affection+1.5, charm+1" },
                        { text: "躲回座位，不掺和师生二人的谈话", effect: "affection-0.5" },
                        { text: "课后主动和语文老师交流文学书单", effect: "affection+1, intelligence+1" },
                        { text: "提醒她：理科班进度快，转科会落下大量新课", effect: "affection-0.5" },
                        { text: "拿出自己的摘抄本，和她交流写作思路", effect: "affection+1.5, charm+1.5" }
                    ]
                },
                {
                    text: "理科班主任路过讲台，看见她的诗歌草稿，当场批评她'不务正业，耽误理综学习'。",
                    choices: [
                        { text: "站出来帮她解释，文学不会拖累成绩", effect: "affection+2, charm+1.5" },
                        { text: "低头沉默，不敢和班主任对峙", effect: "affection-1" },
                        { text: "课后拉她到走廊，安抚她委屈的情绪", effect: "affection+1.5, charm+1" }
                    ]
                },
                {
                    text: "班里同学议论她：'理科班搞语文纯属浪费时间'，纷纷起哄。",
                    choices: [
                        { text: "当众反驳同学，文学也是升学加分特长", effect: "affection+2, charm+1.5" },
                        { text: "拉走温舒，避开班里的流言蜚语", effect: "affection+1.5" },
                        { text: "假装没听见，埋头刷题无视议论", effect: "affection-0.5" },
                        { text: "提议她报名全市高中生作文大赛证明自己", effect: "affection+2, intelligence+1" }
                    ]
                },
                {
                    text: "作文大赛下周截止，她没时间同时刷题、写参赛稿件。",
                    choices: [
                        { text: "每天午休帮她整理理综错题，腾出写作时间", effect: "affection+2.5, intelligence+1.5" },
                        { text: "劝她放弃比赛，优先保证月考分数", effect: "affection-1" },
                        { text: "陪她放学留校，一人刷题一人写稿互相陪伴", effect: "affection+2, charm+1" },
                        { text: "借她历年获奖范文，帮她打磨参赛文章", effect: "affection+1.5, intelligence+1" }
                    ]
                },
                {
                    text: "教务处下发转科申请表，她问你最后的建议。",
                    choices: [
                        { text: "直接填申请表，全力奔赴文科理想", effect: "affection+2, charm+2" },
                        { text: "放弃转科，留在理科班，把文学当课余爱好", effect: "affection+1, intelligence+1" },
                        { text: "暂缓决定，等作文大赛结果再做打算", effect: "affection+1.5, intelligence+1.5" }
                    ]
                },
                {
                    text: "作文大赛成绩公布，同时月考成绩下发，解锁四类结局。",
                    choices: [
                        { text: "获奖+成功转文科，考上汉语言文学专业（理想成真结局）", effect: "ending_wenshu_dream" },
                        { text: "大赛获奖但选择留理科，大学双修文学双学位（平衡成长结局）", effect: "ending_wenshu_balance" },
                        { text: "放弃文学全心学理，多年后重拾写作（遗憾留白结局）", effect: "ending_wenshu_regret" },
                        { text: "兼顾文理稳步进步，成为班级独特的文理平衡学霸（中庸圆满结局）", effect: "ending_wenshu_win" }
                    ]
                }
            ]
        },
        suhe: {
            name: "苏禾",
            title: "藏请假条、打算偷偷去医院的患病女生",
            layers: [
                {
                    text: "课间你看见她捂着小腹趴在桌上，口袋露出半张医院复诊请假单，脸色惨白。",
                    choices: [
                        { text: "轻声上前询问她哪里不舒服，主动关心", effect: "affection_suhe+2, charm+1" },
                        { text: "假装没看见请假条，埋头写自己的英语卷子", effect: "affection_suhe-1" },
                        { text: "提醒她不舒服要立刻告诉班主任", effect: "affection_suhe+1, intelligence+0.5" },
                        { text: "小声提醒她偷偷离校会被记旷课处分", effect: "affection_suhe+0.5" }
                    ]
                },
                {
                    text: "她偷偷和你坦白，每周三要去医院复查，怕落下数学新课不敢跟老师请假，想课间偷跑出去。",
                    choices: [
                        { text: "陪她一起去找班主任，正规办理病假外出手续", effect: "affection_suhe+2, charm+1.5" },
                        { text: "劝她硬扛到放学，课后再去医院不耽误上课", effect: "affection_suhe-0.5, strength+1" },
                        { text: "帮她想折中办法：午休请假外出，避开正课时间", effect: "affection_suhe+1.5, intelligence+1" }
                    ]
                },
                {
                    text: "她腹部突然剧烈绞痛，额头冒冷汗，连起身都困难。",
                    choices: [
                        { text: "立刻跑去办公室叫班主任和校医", effect: "affection_suhe+2, charm+1" },
                        { text: "扶她到走廊长椅休息，给她递温水、暖宝宝", effect: "affection_suhe+1.5, strength+0.5" },
                        { text: "帮她收拾课本笔记，答应复诊回来给她补课", effect: "affection_suhe+2, intelligence+1.5" },
                        { text: "劝说她直接放弃今天复诊，先缓解疼痛", effect: "affection_suhe-1" },
                        { text: "悄悄帮她藏好请假条，陪她溜出校门去医院", effect: "affection_suhe+1, charm+1, money-20" }
                    ]
                },
                {
                    text: "班主任发现苏禾身体不适，询问她要不要长期申请特殊休养调整作息。",
                    choices: [
                        { text: "帮苏禾说明病情，请求老师允许她弹性请假、课后补笔记", effect: "affection_suhe+2, intelligence+1" },
                        { text: "劝说苏禾接受休养，暂时放缓学习节奏", effect: "affection_suhe+1, charm+0.5" },
                        { text: "附和老师，提醒苏禾不能总因为病痛耽误进度", effect: "affection_suhe-0.5" }
                    ]
                },
                {
                    text: "后排同学看见苏禾频繁请假，私下议论她装病偷懒逃避刷题。",
                    choices: [
                        { text: "当众说出她长期慢性病的实情，制止流言", effect: "affection_suhe+2, charm+1.5" },
                        { text: "拉苏禾离开教室，躲开闲言碎语避免难过", effect: "affection_suhe+1.5" },
                        { text: "沉默刷题，不参与同学的议论调侃", effect: "affection_suhe-0.5" },
                        { text: "课后和造谣的同学单独讲道理，解释她的难处", effect: "affection_suhe+1, intelligence+1" }
                    ]
                },
                {
                    text: "下周是月考，复诊当天恰好撞上数学重要复习课，苏禾陷入两难。",
                    choices: [
                        { text: "完整记录课堂全部笔记、例题，等她回来一对一讲解", effect: "affection_suhe+2.5, intelligence+1.5" },
                        { text: "劝她推迟复诊，考完试再去医院避免丢分", effect: "affection_suhe-1, strength+1" },
                        { text: "陪她一起请假外出，路上帮她梳理本周知识点", effect: "affection_suhe+2, charm+1" },
                        { text: "分享自己的复习提纲，让她就医路上抽空翻看", effect: "affection_suhe+1.5, intelligence+1" }
                    ]
                },
                {
                    text: "医生给出两个方案：短期密集复诊调理身体 / 减少复诊频次全力备考。",
                    choices: [
                        { text: "优先身体健康，每周按时复诊，学习慢慢追赶", effect: "affection_suhe+2, charm+1.5" },
                        { text: "暂时减少复诊，以月考、学业为重，硬扛不适", effect: "affection_suhe-1, strength+2" },
                        { text: "和家长沟通，调整复诊到周末，完全不占用上课时间", effect: "affection_suhe+1.5, intelligence+1" }
                    ]
                },
                {
                    text: "月考成绩出炉，同时复诊结果出来，你希望苏禾走向哪个结局？",
                    choices: [
                        { text: "规律调理身体，成绩稳步提升，学会平衡健康与学习（自愈成长结局）", effect: "ending_suhe_self" },
                        { text: "强行推迟复诊，成绩小幅进步，但病情加重需要长期休养（遗憾取舍结局）", effect: "ending_suhe_regret" },
                        { text: "家长调整周末复诊，身体健康、成绩稳定，和你成为互相照顾的好友（温暖相伴结局）", effect: "ending_suhe_warm" },
                        { text: "过度忽视身体频繁缺课，成绩大幅下滑，下定决心调整生活作息（警醒蜕变结局）", effect: "ending_suhe_awake" }
                    ]
                }
            ]
        }
    }
};