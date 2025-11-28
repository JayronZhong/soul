import React, { useState, useEffect, useRef } from 'react';
import {
  Heart, Wind, Music, Bot, Home, ArrowLeft, Calendar, Sparkles,
  Play, Pause, SkipForward, Send, CloudRain, Sun, Cloud, ArrowRight,
  Grid3X3, Languages, Trash2, Brain, ChevronDown, ChevronRight,
  Flame, BookOpen, CheckCircle, XCircle, Info, X, RefreshCw
} from 'lucide-react';

// --- 1. 全局配置 (Global Configuration) ---
const API_CONFIG = {
  CHAT_KEY: "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",
  CHAT_URL: "https://openrouter.ai/api/v1/chat/completions",
  CHAT_MODEL: "x-ai/grok-4.1-fast:free",
  HUANGLI_KEY: "hSTn4QZtSnCB9hvIHY2R1O7cfE",
  HUANGLI_AI_KEY: "sk-ycywgnuikgpuggtfckveauwaywcovrvkljflujkujmkdrxsq",
  HUANGLI_AI_URL: "https://api.siliconflow.cn/v1/chat/completions",
  HUANGLI_URL: "https://api.shwgij.com/api/lunars/lunar",
  HUANGLI_MODEL: "Qwen/Qwen2.5-7B-Instruct"
};

const MUSIC_TRACK_IDS = [
  { id: 1, duration: "15:00" },
  { id: 2, duration: "10:00" },
  { id: 3, duration: "04:30" },
  { id: 4, duration: "05:15" },
  { id: 5, duration: "20:00" },
];

// --- 2. 语言字典 (Language Dictionary) ---
const LANG_DICT = {
  'zh-TW': {
    langName: "繁體中文",
    title_website: "心靈導航",
    common: {
      back: "返回",
      close: "關閉",
      loading: "加載中...",
      nav: { home: "主頁", mindfulness: "靜觀", bubble: "泡泡", music: "音樂", ai: "AI輔導" }
    },
    home: {
      greeting: "你好，旅行者",
      mood_title: "心情指數",
      mood_labels: ["低落", "開心"],
      explore_title: "探索更多",
      quotes: {
        stormy: "允許雨水落下，就像允許眼淚流出。",
        cloudy: "雲捲雲舒，享受當下的寧靜。",
        sunny: "陽光正好，盡情感受這份溫暖吧。"
      },
      suggestions: {
        stormy: { text: "心裡好像裝著很多事？寫下來然後捏爆它吧。", action: "去捏泡泡" },
        cloudy: { text: "平平淡淡也是一種福氣。要試著放鬆一下嗎？", action: "做個靜觀練習" },
        sunny: { text: "太棒了！要把這份好心情延續下去嗎？", action: "聽點歡快的音樂" }
      },
      features: {
        bubble: { title: "減壓泡泡", subtitle: "捏爆煩惱 · 紓壓音效" },
        mindfulness: { title: "靜觀", subtitle: "每日打卡 · 參考心牌" },
        music: { title: "音樂", subtitle: "白噪音 · 舒緩情緒" },
        ai: { title: "AI 輔導", subtitle: "情緒指引 · 聊天" }
      }
    },
    bubble: {
      title: '減壓泡泡',
      placeholder: '每一行代表一個煩惱...\n例如：\n期末考試壓力大\n和朋友吵架了\n天氣不好心情差\n(按下 Enter 換行)',
      button_seal: '封印煩惱',
      instruction: '點擊泡泡，擊破煩惱！',
      reset: '再來一次',
      cleared: '煩惱已消散',
      sound_on: '請開啟聲音以獲得最佳體驗 🔊'
    },
    mindfulness: {
      title: "靜觀練習",
      streak: "連續 {n} 天",
      calendar_title: "今日心靈黃歷",
      loading_huangli: "正在同步宇宙數據...",
      yi: "宜",
      ji: "忌",
      all_yi: "諸事皆宜",
      all_ji: "諸事不忌",
      quote_default_s: "相信自己。",
      quote_default_l: "每一天都是新的開始。",
      checkin_done: "今日已打卡",
      checkin_action: "完成今日靜觀",
      card_title: "每日心牌",
      card_change: "換一張",
      card_loading: "✨ 生成中...",
      card_connecting: "✨ 正在連接宇宙頻率...",
      fallback_yi: ["靜心", "閱讀", "休息"],
      fallback_ji: ["焦慮", "爭執"],
      fallback_quote_s: "心若向陽，無畏悲傷。",
      fallback_quote_l: "即使網絡信號微弱，我們與內心的連接依然強大。",
      ai_explain_title: "心理學解讀",
      ai_explain_loading: "✨ 正在轉譯傳統智慧...",
      ai_explain_error: "暫時無法連接到宇宙數據庫，請憑直覺感受這個詞的含義。",
      ai_explain_btn: "收到了",
      ai_instruction: "點擊上方的詞語，獲取 ✨心理學解讀",
      ai_prompt: "生成 50 句關於「靜觀、自我關懷」的短句。使用語言：{lang}。每行一句，純文本。",
      ai_explain_prompt: "你是一個現代心理療癒師。用戶給出了傳統黃歷中的詞彙「{term}」。請先用普遍角度去解釋。請用**心理學、靜觀或自我關懷**的角度再重新詮釋它。例如「修飾垣牆」可以解釋為「建立心理邊界，保護自己的能量」。兩個解釋要簡短溫暖，合共50字以內。使用語言：{lang}。"
    },
    music: {
      title: "療癒音樂",
      now_playing: "Now Playing",
      click_to_play: "點擊下方播放",
      tracks: [
        { title: "雨聲白噪音", category: "白噪音" },
        { title: "森林鳥鳴", category: "白噪音" },
        { title: "鋼琴獨奏 - 寧靜", category: "平緩風格" },
        { title: "大提琴 - 沉思", category: "平緩風格" },
        { title: "舒緩情緒 - α波", category: "舒緩情緒" }
      ]
    },
    ai: {
      title: "情緒樹洞",
      placeholder: "在這裡輸入你的心事...",
      thinking: "思考中🤔",
      error_connect: "(連接中斷) 抱歉，我剛才走神了。請檢查網絡或 API Key。",
      error_empty: "API 返回為空",
      greetings: {
        default: "你好，我是你的樹洞。今天過得怎麼樣？",
        sad: "感覺你今天好像不太開心。沒關係，這裡很安全，想跟我說說發生了什麼嗎？",
        happy: "感覺到你心情不錯！發生了什麼好事嗎？我很樂意聽你分享。"
      },
      system_prompt: "你是一位溫柔、耐心的傾聽者與陪伴者，名字叫「心靈導航」。請嚴格遵守以下原則：1. **語言適配**：請務必使用【{lang}】與用戶對話。2. **少建議，多傾聽**：不要急於給出解決方案。3. **共情與接納**：肯定用戶的情緒。4. **簡短溫暖**：回答盡量口語化。"
    }
  },
  'zh-CN': {
    langName: "简体中文",
    title_website: "心灵导航",
    common: {
      back: "返回",
      close: "关闭",
      loading: "加载中...",
      nav: { home: "主页", mindfulness: "静观", bubble: "泡泡", music: "音乐", ai: "AI辅导" }
    },
    home: {
      greeting: "你好，旅行者",
      mood_title: "心情指数",
      mood_labels: ["低落", "开心"],
      explore_title: "探索更多",
      quotes: {
        stormy: "允许雨水落下，就像允许眼泪流出。",
        cloudy: "云卷云舒，享受当下的宁静。",
        sunny: "阳光正好，尽情感受这份温暖吧。"
      },
      suggestions: {
        stormy: { text: "心里好像装着很多事？写下来然后捏爆它吧。", action: "去捏泡泡" },
        cloudy: { text: "平平淡淡也是一种福气。要试着放松一下吗？", action: "做个静观练习" },
        sunny: { text: "太棒了！要把这份好心情延续下去吗？", action: "听点欢快的音乐" }
      },
      features: {
        bubble: { title: "减压泡泡", subtitle: "捏爆烦恼 · 纾压音效" },
        mindfulness: { title: "静观", subtitle: "每日打卡 · 参考心牌" },
        music: { title: "音乐", subtitle: "白噪音 · 舒缓情绪" },
        ai: { title: "AI 辅导", subtitle: "情绪指引 · 聊天" }
      }
    },
    bubble: {
      title: '减压泡泡',
      placeholder: '每一行代表一个烦恼...\n例如：\n期末考试压力大\n和朋友吵架了\n天气不好心情差\n(按下 Enter 换行)',
      button_seal: '封印烦恼',
      instruction: '点击泡泡，击破烦恼！',
      reset: '再来一次',
      cleared: '烦恼已消散',
      sound_on: '请开启声音以获得最佳体验 🔊'
    },
    mindfulness: {
      title: "静观练习",
      streak: "连续 {n} 天",
      calendar_title: "今日心灵黄历",
      loading_huangli: "正在同步宇宙数据...",
      yi: "宜",
      ji: "忌",
      all_yi: "诸事皆宜",
      all_ji: "诸事不忌",
      quote_default_s: "相信自己。",
      quote_default_l: "每一天都是新的开始。",
      checkin_done: "今日已打卡",
      checkin_action: "完成今日静观",
      card_title: "每日心牌",
      card_change: "换一张",
      card_loading: "✨ 生成中...",
      card_connecting: "✨ 正在连接宇宙频率...",
      fallback_yi: ["静心", "阅读", "休息"],
      fallback_ji: ["焦虑", "争执"],
      fallback_quote_s: "心若向阳，无畏悲伤。",
      fallback_quote_l: "即使网络信号微弱，我们与内心的连接依然强大。",
      ai_explain_title: "心理学解读",
      ai_explain_loading: "✨ 正在转译传统智慧...",
      ai_explain_error: "暂时无法连接到宇宙数据库，请凭直觉感受这个词的含义。",
      ai_explain_btn: "收到了",
      ai_instruction: "点击上方的词语，获取 ✨心理学解读",
      ai_prompt: "生成 50 句关于“静观、自我关怀”的短句。使用语言：{lang}。每行一句，纯文本。",
      ai_explain_prompt: "你是一个现代心理疗愈师。用户给出了传统黄历中的词汇“{term}”。请先用普遍角度去解释。请用**心理学、静观或自我关怀**的角度再重新诠释它。例如“修饰垣墙”可以解释为“建立心理边界，保护自己的能量”。两个解释要简短温暖，合共50字以内。使用语言：{lang}。"
    },
    music: {
      title: "疗愈音乐",
      now_playing: "Now Playing",
      click_to_play: "点击下方播放",
      tracks: [
        { title: "雨声白噪音", category: "白噪音" },
        { title: "森林鸟鸣", category: "白噪音" },
        { title: "钢琴独奏 - 宁静", category: "平缓风格" },
        { title: "大提琴 - 沉思", category: "平缓风格" },
        { title: "舒缓情绪 - α波", category: "舒缓情绪" }
      ]
    },
    ai: {
      title: "情绪树洞",
      placeholder: "在这里输入你的心事...",
      thinking: "思考中🤔",
      error_connect: "(连接中断) 抱歉，我刚才走神了。请检查网络或 API Key。",
      error_empty: "API 返回为空",
      greetings: {
        default: "你好，我是你的树洞。今天过得怎么样？",
        sad: "感觉你今天好像不太开心。没关系，这里很安全，想跟我说说发生了什么吗？",
        happy: "感觉到你心情不错！发生了什么好事吗？我很乐意听你分享。"
      },
      system_prompt: "你是一位温柔、耐心的倾听者与陪伴者，名字叫「心灵导航」。请严格遵守以下原则：1. **语言适配**：请务必使用【{lang}】与用户对话。2. **少建议，多倾听**：不要急于给出解决方案。3. **共情与接纳**：肯定用户的情绪。4. **简短温暖**：回答尽量口语化。"
    }
  },
  'en': {
    langName: "English",
    title_website: "Heart Navigation",
    common: {
      back: "Back",
      close: "Close",
      loading: "Loading...",
      nav: { home: "Home", mindfulness: "Mindfulness", bubble: "Bubble", music: "Music", ai: "AI Chat" }
    },
    home: {
      greeting: "Hello, Traveler",
      mood_title: "Mood Index",
      mood_labels: ["Low", "Happy"],
      explore_title: "Explore More",
      quotes: {
        stormy: "Let the rain fall, just as you let tears flow.",
        cloudy: "Watch the clouds roll by, enjoy the peace of the moment.",
        sunny: "The sun is shining, soak up the warmth."
      },
      suggestions: {
        stormy: { text: "Mind full of thoughts? Write them down and pop them away.", action: "Pop Bubbles" },
        cloudy: { text: "Ordinary days are a blessing. Want to relax a bit?", action: "Mindfulness" },
        sunny: { text: "Awesome! Want to keep this good vibe going?", action: "Listen to Music" }
      },
      features: {
        bubble: { title: "Bubble Pop", subtitle: "Pop worries · Relaxing sounds" },
        mindfulness: { title: "Mindfulness", subtitle: "Daily check-in · Wisdom cards" },
        music: { title: "Music", subtitle: "White noise · Soothing" },
        ai: { title: "AI Chat", subtitle: "Emotional support · Chat" }
      }
    },
    bubble: {
      title: 'Bubble Pop',
      placeholder: 'One worry per line...\nExample:\nExams stress\nArgued with friend\nBad weather\n(Press Enter to separate)',
      button_seal: 'Seal Worries',
      instruction: 'Pop the bubbles!',
      reset: 'Start Over',
      cleared: 'Worries Released',
      sound_on: 'Turn on sound for best experience 🔊'
    },
    mindfulness: {
      title: "Mindfulness",
      streak: "{n} Day Streak",
      calendar_title: "Soul Almanac",
      loading_huangli: "Syncing with the universe...",
      yi: "Do",
      ji: "Avoid",
      all_yi: "Everything is good",
      all_ji: "Nothing to avoid",
      quote_default_s: "Believe in yourself.",
      quote_default_l: "Every day is a new beginning.",
      checkin_done: "Checked In",
      checkin_action: "Complete Check-in",
      card_title: "Daily Card",
      card_change: "New Card",
      card_loading: "✨ Generating...",
      card_connecting: "✨ Connecting to universe...",
      fallback_yi: ["Meditate", "Read", "Rest"],
      fallback_ji: ["Anxiety", "Conflict"],
      fallback_quote_s: "Keep your face to the sunshine.",
      fallback_quote_l: "Even if the signal is weak, our connection to self is strong.",
      ai_explain_title: "Psychological Insight",
      ai_explain_loading: "✨ Translating ancient wisdom...",
      ai_explain_error: "Cannot connect to the universe database right now.",
      ai_explain_btn: "Got it",
      ai_instruction: "Click the word above to get ✨Psychological Insight",
      ai_prompt: "Generate 50 short quotes about 'mindfulness, self-care'. Language: {lang}. One per line, plain text.",
      ai_explain_prompt: "You are a modern therapist. User provides a traditional almanac term '{term}'. First explain it generally. Then re-interpret it from a **psychology, mindfulness, or self-care** perspective. e.g., 'Repair walls' -> 'Build boundaries'. Keep it short and warm, under 50 words total. Language: {lang}."
    },
    music: {
      title: "Healing Music",
      now_playing: "Now Playing",
      click_to_play: "Click to play",
      tracks: [
        { title: "Rain Sounds", category: "White Noise" },
        { title: "Forest Birds", category: "White Noise" },
        { title: "Piano Solo - Peace", category: "Calm" },
        { title: "Cello - Reflection", category: "Calm" },
        { title: "Soothing - Alpha Waves", category: "Relaxation" }
      ]
    },
    ai: {
      title: "Emotional Tree Hole",
      placeholder: "Type your thoughts here...",
      thinking: "Thinking🤔",
      error_connect: "(Connection lost) Sorry, I zoned out. Check network or API Key.",
      error_empty: "API returned empty",
      greetings: {
        default: "Hello, I'm here to listen. How was your day?",
        sad: "You seem a bit down. It's safe here, want to talk about it?",
        happy: "You seem happy! Anything good happen? I'd love to hear."
      },
      system_prompt: "You are a gentle, patient listener named 'SoulNav'. Principles: 1. **Language**: Use {lang}. 2. **Listen more, advise less**. 3. **Empathy**: Validate feelings. 4. **Short & Warm**: Casual tone."
    }
  }
};

export default function SoulNavApp() {
  const [currentView, setCurrentView] = useState('home');
  const [moodScore, setMoodScore] = useState(5);
  const [lang, setLang] = useState('zh-TW');

  const t = LANG_DICT[lang];

  const getMoodTheme = (score) => {
    if (score <= 3) return 'stormy';
    if (score <= 7) return 'cloudy';
    return 'sunny';
  };

  const moodTheme = getMoodTheme(moodScore);
  const navigateTo = (view) => setCurrentView(view);

  const getBackgroundClass = () => {
    switch (moodTheme) {
      case 'stormy': return 'bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 text-white';
      case 'cloudy': return 'bg-gradient-to-b from-slate-200 via-blue-100 to-slate-300 text-slate-800';
      default: return 'bg-gradient-to-b from-orange-100 via-amber-100 to-yellow-100 text-slate-800';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ease-in-out ${getBackgroundClass()} font-sans overflow-hidden relative`}>
      <div className="max-w-md mx-auto h-screen flex flex-col bg-white/10 backdrop-blur-sm shadow-2xl relative transition-all duration-1000">

        <div className="p-4 flex justify-between items-center z-10">
          <button onClick={() => navigateTo('home')} className="font-bold text-lg tracking-widest opacity-80 transition-opacity">
            {t.title_website}
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(l => l === 'zh-TW' ? 'zh-CN' : l === 'zh-CN' ? 'en' : 'zh-TW')}
              className="text-xs font-bold border border-current px-2 py-0.5 rounded-full opacity-60 hover:opacity-100 transition-opacity"
            >
              {lang === 'zh-TW' ? '繁' : lang === 'zh-CN' ? '简' : 'EN'}
            </button>

            <div className="transition-all duration-1000 transform">
              {moodTheme === 'stormy' && <CloudRain size={20} className="animate-pulse opacity-80" />}
              {moodTheme === 'cloudy' && <Cloud size={20} className="opacity-80" />}
              {moodTheme === 'sunny' && <Sun size={20} className="animate-spin-slow opacity-80 text-orange-400" />}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {currentView === 'home' && (
            <HomeView
              moodScore={moodScore}
              setMoodScore={setMoodScore}
              onNavigate={navigateTo}
              moodTheme={moodTheme}
              t={t}
            />
          )}

          {currentView === 'mindfulness' && (
            <MindfulnessView onBack={() => navigateTo('home')} t={t} lang={lang} />
          )}

          {currentView === 'music' && (
            <MusicView onBack={() => navigateTo('home')} t={t} />
          )}

          {currentView === 'ai' && (
            <AIChatView onBack={() => navigateTo('home')} initialMood={moodScore} t={t} lang={lang} />
          )}

          {currentView === 'bubblepop' && (
            <BubblePopView onBack={() => navigateTo('home')} moodTheme={moodTheme} t={t} />
          )}
        </div>

        <div className={`p-4 backdrop-blur-md flex justify-around items-center rounded-t-2xl transition-colors duration-500 ${moodTheme === 'stormy' ? 'bg-black/20 text-white' : 'bg-white/40 text-slate-800'}`}>
          <NavIcon icon={Home} label={t.common.nav.home} active={currentView === 'home'} onClick={() => navigateTo('home')} theme={moodTheme} />
          <NavIcon icon={Wind} label={t.common.nav.mindfulness} active={currentView === 'mindfulness'} onClick={() => navigateTo('mindfulness')} theme={moodTheme} />
          <NavIcon icon={Grid3X3} label={t.common.nav.bubble} active={currentView === 'bubblepop'} onClick={() => navigateTo('bubblepop')} theme={moodTheme} />
          <NavIcon icon={Bot} label={t.common.nav.ai} active={currentView === 'ai'} onClick={() => navigateTo('ai')} theme={moodTheme} />
        </div>

      </div>
    </div>
  );
}

// --- 子视图 ---

function BubblePopView({ onBack, moodTheme, t }) {
  const [text, setText] = useState('');
  const [isSealed, setIsSealed] = useState(false);
  const [bubbles, setBubbles] = useState([]);

  // 初始化气泡
  useEffect(() => {
    if (isSealed) {
      // 过滤空行，确保只有有内容的行才生成文字气泡
      const userWorries = text.split('\n').map(line => line.trim()).filter(line => line !== '');

      // 设定最小气泡数，保证画面丰富度
      const minBubbles = 25;
      const totalBubbles = Math.max(minBubbles, userWorries.length + (5 - userWorries.length % 5));

      const newBubbles = Array.from({ length: totalBubbles }, (_, i) => ({
        id: i,
        popped: false,
        // 只有当索引小于烦恼条数时，才赋予文字
        text: i < userWorries.length ? userWorries[i] : null,
        scale: Math.random() * 0.05 + 0.98
      }));
      setBubbles(newBubbles);
    }
  }, [isSealed, text]); // 依赖项包含 text，确保封印时能读取到最新文本

  // Web Audio API 合成音效 (保持不变)
  const playPopSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';

      const now = ctx.currentTime;
      oscillator.frequency.setValueAtTime(600, now);
      oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.1);

      gainNode.gain.setValueAtTime(0.5, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

      oscillator.start(now);
      oscillator.stop(now + 0.1);
    } catch (e) {
      console.error("Audio synth error:", e);
    }
  };

  const handlePop = (id) => {
    playPopSound();
    if (navigator.vibrate) navigator.vibrate(30);

    setBubbles(prev => prev.map(b =>
      b.id === id ? { ...b, popped: true } : b
    ));
  };

  // 检查是否所有含有文字的气泡都被戳破了
  const allPopped = bubbles.filter(b => b.text).every(b => b.popped);

  return (
    <div className="space-y-4 animate-fade-in-up h-full flex flex-col">
      <div className="flex justify-between items-center mb-1">
        <Header title={t.bubble.title} onBack={onBack} />
      </div>

      {!isSealed ? (
        <div className="flex-1 flex flex-col gap-4">
          <div className={`flex-1 rounded-3xl p-6 backdrop-blur-md shadow-inner border border-white/20 transition-all ${moodTheme === 'stormy' ? 'bg-white/10 text-white' : 'bg-white/50 text-slate-800'}`}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.bubble.placeholder}
              className="w-full h-full bg-transparent border-none outline-none resize-none placeholder-current placeholder-opacity-40 text-lg leading-relaxed font-medium"
            />
          </div>
          <p className="text-xs text-center opacity-60 flex items-center justify-center gap-2">
            {t.bubble.sound_on}
          </p>
          <button
            onClick={() => { if (text.trim()) setIsSealed(true); }}
            disabled={!text.trim()}
            className={`w-full py-4 rounded-full font-bold text-lg shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2
              ${!text.trim()
                ? 'bg-slate-300 cursor-not-allowed opacity-50'
                : 'bg-teal-600 hover:bg-teal-700 text-white border-b-4 border-teal-800 active:border-b-0 active:translate-y-1'}`}
          >
            <Trash2 size={20} /> {t.bubble.button_seal}
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col relative h-full">
          <div className="text-center mb-3 animate-fade-in flex-shrink-0">
            <h3 className="font-bold text-xl">{allPopped ? t.bubble.cleared : t.bubble.instruction}</h3>
          </div>

          <div className="flex-1 bg-[#8FBFA5] rounded-xl border-4 border-[#7CA890] shadow-2xl overflow-y-auto p-4 custom-scrollbar relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:10px_10px] pointer-events-none"></div>

            <div className="grid grid-cols-5 gap-3 pb-8">
              {bubbles.map((bubble) => (
                <button
                  key={bubble.id}
                  onClick={() => !bubble.popped && handlePop(bubble.id)}
                  style={{ transform: `scale(${bubble.scale})` }}
                  className={`aspect-square relative rounded-full transition-all duration-100 outline-none select-none group
                    ${bubble.popped
                      ? 'cursor-default'
                      : 'cursor-pointer active:scale-90'}`}
                >
                  {/* 气泡本体背景 */}
                  <div className={`w-full h-full rounded-full transition-all duration-200 relative overflow-hidden
                    ${bubble.popped
                      ? 'bg-[#7CA890]/50 shadow-none scale-90'
                      : 'bg-gradient-to-br from-[#E0F2E9] via-[#A8D5C1] to-[#6B9C82] shadow-[2px_4px_6px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.7)]'
                    }`}
                  >
                    {!bubble.popped && (
                      <>
                        {/* 光影效果 - 设置 z-10 确保在底层 */}
                        <div className="absolute top-[10%] left-[10%] w-[35%] h-[35%] bg-gradient-to-br from-white to-transparent rounded-full opacity-90 blur-[1px] z-10"></div>
                        <div className="absolute bottom-[15%] right-[15%] w-[15%] h-[15%] bg-white rounded-full blur-[2px] opacity-40 z-10"></div>

                        {/* 文字层 - 设置 z-20 确保在光影之上，并添加 pointer-events-none */}
                        {bubble.text && (
                          <div className="absolute inset-0 flex items-center justify-center p-1 z-20 pointer-events-none">
                            <span className="text-[10px] leading-tight text-teal-900 font-bold break-all text-center drop-shadow-sm line-clamp-3">
                              {bubble.text}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* 破裂后的残影 */}
                  {bubble.popped && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-full h-full border-2 border-[#7CA890] rounded-full opacity-30"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-center flex-shrink-0 h-12">
            {allPopped && (
              <button
                onClick={() => { setIsSealed(false); setText(''); }}
                className="bg-white text-teal-700 px-8 py-2 rounded-full font-bold shadow-lg animate-bounce border border-teal-100 flex items-center gap-2"
              >
                <Sparkles size={16} /> {t.bubble.reset}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function HomeView({ moodScore, setMoodScore, onNavigate, moodTheme, t }) {

  const getSuggestion = () => {
    if (moodTheme === 'stormy') {
      return {
        ...t.home.suggestions.stormy,
        icon: Grid3X3,
        actionFn: () => onNavigate('bubblepop'),
        colorClass: "bg-rose-500/20 border-rose-500/30 text-rose-100"
      };
    } else if (moodTheme === 'cloudy') {
      return {
        ...t.home.suggestions.cloudy,
        icon: Wind,
        actionFn: () => onNavigate('mindfulness'),
        colorClass: "bg-teal-500/10 border-teal-500/20 text-teal-800"
      };
    } else {
      return {
        ...t.home.suggestions.sunny,
        icon: Music,
        actionFn: () => onNavigate('music'),
        colorClass: "bg-orange-500/10 border-orange-500/20 text-orange-800"
      };
    }
  };

  const suggestion = getSuggestion();

  return (
    <div className="space-y-6 animate-fade-in pb-4">
      <div className="mt-2 transition-all duration-1000">
        <h1 className="text-3xl font-bold mb-1">{t.home.greeting}</h1>
        <p className="opacity-70 text-sm">
          {moodTheme === 'stormy' ? t.home.quotes.stormy :
            moodTheme === 'cloudy' ? t.home.quotes.cloudy :
              t.home.quotes.sunny}
        </p>
      </div>

      {/* 心情滑块 */}
      <div className={`backdrop-blur-md p-6 rounded-3xl shadow-lg transition-all duration-500 border border-white/10 ${moodTheme === 'stormy' ? 'bg-white/10' : 'bg-white/50'}`}>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Heart className={`transition-colors duration-500 ${moodTheme === 'stormy' ? 'text-rose-300' : 'text-rose-500'}`} fill={moodTheme === 'sunny' ? "currentColor" : "none"} />
          {t.home.mood_title}
        </h2>

        <div className="flex justify-between items-center mb-6 px-4 h-12">
          <span className={`text-4xl transition-all duration-500 ease-out transform ${moodScore <= 3 ? 'scale-150 opacity-100 rotate-0 filter-none drop-shadow-md' : 'scale-75 opacity-40 grayscale blur-[1px]'}`}>
            😔
          </span>
          <span className={`text-4xl transition-all duration-500 ease-out transform ${moodScore > 3 && moodScore <= 7 ? 'scale-150 opacity-100 rotate-0 filter-none drop-shadow-md' : 'scale-75 opacity-40 grayscale blur-[1px]'}`}>
            😐
          </span>
          <span className={`text-4xl transition-all duration-500 ease-out transform ${moodScore > 7 ? 'scale-150 opacity-100 rotate-0 filter-none drop-shadow-md' : 'scale-75 opacity-40 grayscale blur-[1px]'}`}>
            😊
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="10"
          value={moodScore}
          onChange={(e) => setMoodScore(parseInt(e.target.value))}
          className={`w-full h-3 rounded-lg appearance-none cursor-pointer outline-none transition-all duration-500 ${moodTheme === 'stormy' ? 'bg-slate-600 accent-rose-400' :
            moodTheme === 'cloudy' ? 'bg-slate-300 accent-teal-600' :
              'bg-orange-200 accent-orange-500'
            }`}
        />
        <div className="flex justify-between text-xs font-mono opacity-50 mt-3 px-1">
          <span>{t.home.mood_labels[0]}</span>
          <span>{moodScore}/10</span>
          <span>{t.home.mood_labels[1]}</span>
        </div>
      </div>

      {/* 智能触发卡片 */}
      <div className={`p-5 rounded-2xl border transition-all duration-700 transform ${suggestion.colorClass} ${moodTheme === 'stormy' ? 'bg-opacity-20 border-opacity-20' : ''}`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full ${moodTheme === 'stormy' ? 'bg-white/10' : 'bg-white/50'}`}>
            <suggestion.icon size={24} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium mb-3 leading-relaxed opacity-90">
              {suggestion.text}
            </p>
            <button
              onClick={suggestion.actionFn}
              className={`text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-transform active:scale-95 ${moodTheme === 'stormy' ? 'bg-white/20 hover:bg-white/30 text-white' :
                'bg-white hover:bg-white/80 text-slate-700 shadow-sm'
                }`}
            >
              {suggestion.action} <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* 功能入口 */}
      <div className="grid grid-cols-1 gap-3 pt-2">
        <h3 className="text-sm font-bold opacity-50 px-1">{t.home.explore_title}</h3>
        <FeatureCard
          title={t.home.features.bubble.title}
          subtitle={t.home.features.bubble.subtitle}
          icon={Grid3X3}
          theme={moodTheme}
          baseColor="teal"
          onClick={() => onNavigate('bubblepop')}
        />
        <FeatureCard
          title={t.home.features.mindfulness.title}
          subtitle={t.home.features.mindfulness.subtitle}
          icon={Wind}
          theme={moodTheme}
          baseColor="emerald"
          onClick={() => onNavigate('mindfulness')}
        />
        <FeatureCard
          title={t.home.features.music.title}
          subtitle={t.home.features.music.subtitle}
          icon={Music}
          theme={moodTheme}
          baseColor="indigo"
          onClick={() => onNavigate('music')}
        />
        <FeatureCard
          title={t.home.features.ai.title}
          subtitle={t.home.features.ai.subtitle}
          icon={Bot}
          theme={moodTheme}
          baseColor="rose"
          onClick={() => onNavigate('ai')}
        />
      </div>
    </div>
  );
}

function MindfulnessView({ onBack, t }) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInDates, setCheckInDates] = useState([]);
  const [streak, setStreak] = useState(0);

  const [cardContent, setCardContent] = useState(t.mindfulness.card_connecting);
  const [dailyCards, setDailyCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoadingCards, setIsLoadingCards] = useState(false);

  const [huangli, setHuangli] = useState({
    yi: [],
    ji: [],
    quote_s: t.common.loading,
    quote_l: ""
  });
  const [isLoadingHuangli, setIsLoadingHuangli] = useState(false);

  const [selectedTerm, setSelectedTerm] = useState(null);
  const [termExplanation, setTermExplanation] = useState("");
  const [isExplaining, setIsExplaining] = useState(false);

  const getTodayString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const calculateStreak = (dates) => {
    if (!dates || dates.length === 0) return 0;
    const sortedDates = [...new Set(dates)]
      .map(d => new Date(d).setHours(0, 0, 0, 0))
      .sort((a, b) => b - a);
    const today = new Date().setHours(0, 0, 0, 0);
    const yesterday = today - 86400000;
    if (sortedDates[0] !== today && sortedDates[0] !== yesterday) return 0;
    let currentStreak = 1;
    let lastDate = sortedDates[0];
    for (let i = 1; i < sortedDates.length; i++) {
      if (lastDate - sortedDates[i] === 86400000) { currentStreak++; lastDate = sortedDates[i]; }
      else break;
    }
    return currentStreak;
  };

  useEffect(() => {
    const today = getTodayString();

    try {
      const storedDates = JSON.parse(localStorage.getItem('soul_nav_checkin_history') || '[]');
      setCheckInDates(storedDates);
      setStreak(calculateStreak(storedDates));
      if (storedDates.includes(today)) setIsCheckedIn(true);
    } catch (e) { console.error(e); }

    const cachedDate = localStorage.getItem('soul_nav_data_date');
    const cachedCards = JSON.parse(localStorage.getItem('soul_nav_daily_cards') || 'null');
    const cachedHuangli = JSON.parse(localStorage.getItem('soul_nav_daily_huangli_v3') || 'null');

    if (cachedDate === today && cachedCards && cachedHuangli) {
      setDailyCards(cachedCards);
      setCardContent(cachedCards[Math.floor(Math.random() * cachedCards.length)]);
      setHuangli(cachedHuangli);
      setTimeout(() => setIsFlipped(true), 100);
    } else {
      fetchAllDailyContent(today);
    }
  }, []);

  const fetchAllDailyContent = async (todayDate) => {
    setIsLoadingCards(true);
    setIsLoadingHuangli(true);
    setCardContent(t.mindfulness.card_connecting);
    const langName = t.langName;

    const fetchCards = fetch(API_CONFIG.HUANGLI_AI_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${API_CONFIG.HUANGLI_AI_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: API_CONFIG.HUANGLI_MODEL,
        messages: [{ role: "system", content: t.mindfulness.ai_prompt.replace('{lang}', langName) }],
        max_tokens: 2048, temperature: 0.8
      })
    });

    let huangliUrlTarget = API_CONFIG.HUANGLI_URL;
    if (API_CONFIG.HUANGLI_KEY) huangliUrlTarget += `?key=${API_CONFIG.HUANGLI_KEY}`;

    const fetchHuangliReal = fetch(huangliUrlTarget, { method: 'GET' });

    try {
      const [resCards, resHuangli] = await Promise.all([fetchCards, fetchHuangliReal]);

      const dataCards = await resCards.json();
      if (dataCards.choices) {
        const newCards = dataCards.choices[0].message.content.split('\n').map(s => s.trim()).filter(s => s.length > 0);
        setDailyCards(newCards);
        setCardContent(newCards[0]);
        localStorage.setItem('soul_nav_daily_cards', JSON.stringify(newCards));
      }

      const dataHuangli = await resHuangli.json();
      if (dataHuangli.code === 200 || dataHuangli.code === 201) {
        const hData = dataHuangli.data;

        const splitTerms = (str) => {
          if (!str) return [];
          return str.replace(/　/g, ' ').trim().split(/\s+/).filter(t => t);
        };

        const parsedHL = {
          yi: splitTerms(hData.YiDay),
          ji: splitTerms(hData.JiDay),
          quote_s: hData.WeiYu_s || t.mindfulness.quote_default_s,
          quote_l: hData.WeiYu_l || t.mindfulness.quote_default_l
        };

        setHuangli(parsedHL);
        localStorage.setItem('soul_nav_daily_huangli_v3', JSON.stringify(parsedHL));
      }

      localStorage.setItem('soul_nav_data_date', todayDate);
      setIsFlipped(true);

    } catch (error) {
      console.error("Fetch Error:", error);
      setHuangli({
        yi: t.mindfulness.fallback_yi,
        ji: t.mindfulness.fallback_ji,
        quote_s: t.mindfulness.fallback_quote_s,
        quote_l: t.mindfulness.fallback_quote_l
      });
    } finally {
      setIsLoadingCards(false);
      setIsLoadingHuangli(false);
    }
  };

  const handleExplainTerm = async (term) => {
    if (isExplaining) return;
    setSelectedTerm(term);
    setTermExplanation("");
    setIsExplaining(true);
    const langName = t.langName;

    try {
      const response = await fetch(API_CONFIG.HUANGLI_AI_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${API_CONFIG.HUANGLI_AI_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: API_CONFIG.HUANGLI_MODEL,
          messages: [{
            role: "system",
            content: t.mindfulness.ai_explain_prompt.replace('{term}', term).replace('{lang}', langName)
          }],
          max_tokens: 256, temperature: 0.3
        })
      });
      const data = await response.json();
      setTermExplanation(data.choices[0].message.content);
    } catch (error) {
      setTermExplanation(t.mindfulness.ai_explain_error);
    } finally {
      setIsExplaining(false);
    }
  };

  const handleCheckIn = () => {
    const today = getTodayString();
    if (!checkInDates.includes(today)) {
      const newHistory = [...checkInDates, today];
      setCheckInDates(newHistory);
      setIsCheckedIn(true);
      setStreak(calculateStreak(newHistory));
      localStorage.setItem('soul_nav_checkin_history', JSON.stringify(newHistory));
    }
  };

  const drawNewCard = () => {
    if (dailyCards.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCardContent(dailyCards[Math.floor(Math.random() * dailyCards.length)]);
      setIsFlipped(true);
    }, 300);
  };

  const renderCalendar = () => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const isChecked = checkInDates.includes(dateStr);
      const isToday = dateStr === getTodayString();
      days.push(
        <div key={i} className="flex items-center justify-center w-8 h-8 mb-1">
          <div className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium transition-all
            ${isChecked ? 'bg-emerald-500 text-white shadow-md' : isToday ? 'border border-emerald-500 text-emerald-600 font-bold' : 'text-slate-400 bg-slate-50'}`}>
            {i}
          </div>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="space-y-4 animate-fade-in-up h-full flex flex-col pb-4 relative">
      <div className="flex justify-between items-center z-10">
        <Header title={t.mindfulness.title} onBack={onBack} />
        <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
          <Flame size={14} fill="currentColor" />
          <span>{t.mindfulness.streak.replace('{n}', streak)}</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-3xl border border-orange-100 shadow-sm relative overflow-hidden flex-shrink-0 z-0">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-orange-800 pointer-events-none"><BookOpen size={64} /></div>

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-orange-200 text-orange-800 px-2 py-0.5 rounded">{t.mindfulness.calendar_title}</span>
            <span className="text-xs text-orange-400">{getTodayString()}</span>
          </div>
        </div>

        {isLoadingHuangli ? (
          <div className="h-24 flex items-center justify-center gap-2 text-xs text-orange-400 animate-pulse">
            <Sparkles size={14} /> {t.mindfulness.loading_huangli}
          </div>
        ) : (
          <div className="space-y-4 relative z-10">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 mt-1">{t.mindfulness.yi}</div>
                <div className="flex flex-wrap gap-2">
                  {huangli.yi.length > 0 ? huangli.yi.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleExplainTerm(item)}
                      className="px-2 py-1 bg-white/70 hover:bg-emerald-100 border border-orange-100/50 rounded-lg text-sm text-emerald-800 transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  )) : <span className="text-xs text-slate-400 py-1">{t.mindfulness.all_yi}</span>}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs shrink-0 mt-1">{t.mindfulness.ji}</div>
                <div className="flex flex-wrap gap-2">
                  {huangli.ji.length > 0 ? huangli.ji.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleExplainTerm(item)}
                      className="px-2 py-1 bg-white/70 hover:bg-rose-100 border border-orange-100/50 rounded-lg text-sm text-rose-800 transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  )) : <span className="text-xs text-slate-400 py-1">{t.mindfulness.all_ji}</span>}
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-orange-200/50"></div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={12} className="text-orange-400" />
                <span className="text-sm font-bold text-slate-800">{huangli.quote_s}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed pl-5">
                {huangli.quote_l}
              </p>
            </div>

            <div className="text-[10px] text-center text-orange-300 mt-1">
              💡 {t.mindfulness.ai_instruction}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white/70 p-4 rounded-3xl shadow-sm backdrop-blur-md border border-white/20 relative z-0">
        <div className="mb-4">
          <div className="grid grid-cols-7 text-center mb-2 opacity-50 text-[10px]">
            <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
        </div>
        <button
          onClick={handleCheckIn}
          disabled={isCheckedIn}
          className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${isCheckedIn ? 'bg-slate-100 text-slate-400 cursor-default' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg active:scale-95'
            }`}
        >
          {isCheckedIn ? <><CheckCircle size={18} /> {t.mindfulness.checkin_done}</> : t.mindfulness.checkin_action}
        </button>
      </div>

      <div className="flex-1 flex flex-col min-h-[180px] z-0">
        <div className="flex justify-between items-center mb-2 px-2">
          <h3 className="font-bold text-sm flex items-center gap-2 text-slate-700">
            <Sparkles size={14} className="text-teal-500" /> {t.mindfulness.card_title}
          </h3>
          <button onClick={drawNewCard} className="text-xs font-bold text-teal-600 hover:text-teal-800">{t.mindfulness.card_change}</button>
        </div>
        <div className={`flex-1 relative perspective-1000 w-full`}>
          <div className={`relative w-full h-full duration-700 preserve-3d transition-transform ${isFlipped ? 'rotate-y-0' : 'rotate-y-180'}`}>
            <div className="absolute w-full h-full bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-2xl shadow-lg backface-hidden flex items-center justify-center rotate-y-180">
              <Wind className="text-white opacity-40 animate-pulse" size={48} />
            </div>
            <div className="absolute w-full h-full bg-white/80 backdrop-blur rounded-2xl shadow-inner backface-hidden flex flex-col items-center justify-center p-6 text-center border-2 border-white">
              {isLoadingCards ? <span className="text-xs text-slate-400 animate-pulse">{t.mindfulness.card_loading}</span> : (
                <>
                  <Wind className="text-teal-500 mb-4 opacity-20" size={24} />
                  <p className="text-base font-medium leading-relaxed text-slate-700 font-serif line-clamp-4">"{cardContent}"</p>
                  <div className="mt-4 w-8 h-1 bg-teal-200 rounded-full"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTerm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedTerm(null)}>
          <div
            className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-sm relative animate-scale-in border border-emerald-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTerm(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-2 hover:bg-slate-200 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-2">
              <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">{t.mindfulness.ai_explain_title}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">{selectedTerm}</h3>

            {isExplaining ? (
              <div className="flex items-center gap-2 text-sm text-emerald-600 animate-pulse py-4 bg-emerald-50 rounded-xl p-4">
                <Bot size={18} /> {t.mindfulness.ai_explain_loading}
              </div>
            ) : (
              <div className="bg-emerald-50/50 p-5 rounded-xl text-base text-slate-700 leading-relaxed border border-emerald-100 shadow-inner">
                {termExplanation}
              </div>
            )}

            <button
              onClick={() => setSelectedTerm(null)}
              className="w-full mt-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200"
            >
              {t.mindfulness.ai_explain_btn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MusicView({ onBack, t }) {
  const [playingId, setPlayingId] = useState(null);
  const togglePlay = (id) => setPlayingId(playingId === id ? null : id);

  const tracks = MUSIC_TRACK_IDS.map((track, index) => ({
    ...track,
    ...t.music.tracks[index]
  }));

  return (
    <div className="space-y-6 animate-fade-in-up h-full flex flex-col">
      <Header title={t.music.title} onBack={onBack} />

      <div className="bg-indigo-900/20 backdrop-blur-md p-6 rounded-3xl flex items-center gap-4 border border-white/10">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-indigo-500 text-white shadow-lg ${playingId ? 'animate-pulse' : ''}`}>
          <Music size={24} />
        </div>
        <div>
          <div className="text-xs font-bold opacity-50 uppercase tracking-wider">{t.music.now_playing}</div>
          <div className="font-bold text-lg">{playingId ? tracks.find(t => t.id === playingId).title : t.music.click_to_play}</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pb-20">
        {tracks.map((track) => (
          <div
            key={track.id}
            onClick={() => togglePlay(track.id)}
            className={`p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all border ${playingId === track.id
              ? 'bg-white/90 shadow-md scale-[1.02] border-indigo-200'
              : 'bg-white/40 hover:bg-white/60 border-transparent'
              }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${playingId === track.id ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                {playingId === track.id ? <Pause size={12} /> : <Play size={12} />}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{track.title}</h4>
                <p className="text-xs text-slate-500">{track.category}</p>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-500">{track.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIChatView({ onBack, initialMood, t, lang }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let firstMsg = t.ai.greetings.default;
    if (initialMood <= 3) firstMsg = t.ai.greetings.sad;
    if (initialMood >= 8) firstMsg = t.ai.greetings.happy;

    setMessages([{ id: 1, sender: 'ai', text: firstMsg }]);
  }, [initialMood, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    const currentHistory = [...messages, userMsg];
    setMessages(currentHistory);
    setInput('');
    setIsTyping(true);

    try {
      const apiMessages = [
        { role: "system", content: t.ai.system_prompt.replace('{lang}', t.langName) },
        ...currentHistory.map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }))
      ];

      const response = await fetch(API_CONFIG.CHAT_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_CONFIG.CHAT_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: API_CONFIG.CHAT_MODEL,
          messages: apiMessages,
          stream: false,
          max_tokens: 1024,
          temperature: 0.7,
          top_p: 0.9
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        const messageObj = data.choices[0].message;
        let finalContent = messageObj.content || "";
        finalContent = finalContent.replace(/^\s+/, '').trimEnd();

        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'ai',
          text: finalContent
        }]);
      } else {
        throw new Error(t.ai.error_empty);
      }

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: t.ai.error_connect
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] animate-fade-in-up">
      <Header title={t.ai.title} onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-2 space-y-4 mb-4 rounded-2xl bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
              ? 'bg-rose-500 text-white rounded-br-none'
              : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'
              }`}>
              <span className="whitespace-pre-wrap font-sans">{msg.text}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white/80 p-3 rounded-2xl rounded-bl-none flex items-center gap-2 shadow-sm border border-slate-100">
              <span className="text-xs font-medium text-slate-400">{t.ai.thinking}</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white rounded-full shadow-[0_-4px_10px_rgba(0,0,0,0.05)] p-2 flex items-center gap-2 border border-slate-100">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t.ai.placeholder}
          disabled={isTyping}
          className="flex-1 bg-transparent px-4 py-2 outline-none text-slate-700 placeholder-slate-400"
        />
        <button
          onClick={handleSend}
          disabled={isTyping}
          className={`p-3 rounded-full transition-all transform active:scale-95 ${isTyping ? 'bg-slate-300' : 'bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-200'} text-white`}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

function NavIcon({ icon: Icon, label, active, onClick, theme }) {
  const activeColor = theme === 'stormy' ? 'text-white scale-110' : 'text-slate-800 scale-110';
  const inactiveColor = theme === 'stormy' ? 'text-slate-400 opacity-60' : 'text-slate-500 opacity-60';

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? activeColor : inactiveColor} hover:opacity-100`}
    >
      <Icon size={24} strokeWidth={active ? 2.5 : 2} />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

function FeatureCard({ title, subtitle, icon: Icon, theme, baseColor, onClick }) {
  let bgClass = "";
  let textClass = "";

  if (theme === 'stormy') {
    bgClass = "bg-white/10 hover:bg-white/20";
    textClass = "text-white";
  } else {
    bgClass = `bg-white/60 hover:bg-white/80`;
    textClass = "text-slate-800";
  }

  return (
    <button
      onClick={onClick}
      className={`w-full p-5 rounded-3xl flex items-center gap-4 transition-all hover:scale-[1.02] hover:shadow-lg text-left backdrop-blur-md shadow-sm border border-white/10 ${bgClass} ${textClass}`}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme === 'stormy' ? 'bg-white/20' : `bg-${baseColor}-100 text-${baseColor}-800`}`}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className={`text-xs mt-0.5 ${theme === 'stormy' ? 'text-slate-300' : 'text-slate-500'}`}>{subtitle}</p>
      </div>
      <div className="ml-auto opacity-30">
        <SkipForward size={20} />
      </div>
    </button>
  );
}

function Header({ title, onBack }) {
  return (
    <div className="flex items-center gap-4 mb-2">
      <button onClick={onBack} className="p-2 bg-white/30 rounded-full hover:bg-white/50 transition-colors">
        <ArrowLeft size={20} />
      </button>
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );
}