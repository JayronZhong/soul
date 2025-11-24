import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Wind, 
  Music, 
  Bot, 
  Home, 
  ArrowLeft, 
  Calendar, 
  Sparkles, 
  Play, 
  Pause, 
  SkipForward, 
  Send, 
  CloudRain, 
  Sun, 
  Cloud,
  ArrowRight,
  Monitor,
  Smartphone,
  Globe
} from 'lucide-react';

// --- 多语言配置 ---

const TRANSLATIONS = {
  'zh-TW': {
    appName: "心靈導航",
    greeting: "你好，旅行者",
    moodQuestion: "今天的心靈天氣如何？",
    moodIndex: "心情指數",
    low: "低落",
    high: "開心",
    exploreMore: "探索更多",
    back: "返回",
    mindfulness: {
      title: "靜觀",
      subtitle: "每日打卡 · 參考心牌",
      checkInTitle: "每日正念打卡",
      checkInDesc: "花一分鐘，感受當下。",
      checkInBtn: "開始打卡",
      checkedInBtn: "今日已完成 ✅",
      cardTitle: "參考心牌",
      drawCard: "抽取新卡",
    },
    music: {
      title: "音樂",
      subtitle: "白噪音 · 舒緩情緒",
      nowPlaying: "正在播放",
      clickToPlay: "點擊列表開始播放",
      playing: "正在播放中...",
    },
    ai: {
      title: "AI 輔導",
      subtitle: "情緒指引 · 聊天",
      placeholder: "在這裡輸入你的想法...",
      send: "發送",
      initialMsg: [
        "你好，我是你的AI心情社工。今天感覺怎麼樣？", // Default
        "我注意到你心情不太好。沒關係，這裡只有我們，想說說發生什麼了嗎？", // Low
        "看起來你心情不錯！有什麼開心的事情想記錄下來嗎？" // High
      ],
      replies: {
        stress: "聽起來你現在壓力很大。現在的感受是完全正常的，試著深呼吸一下，我們在這裡陪著你。",
        thanks: "不客氣，隨時歡迎你回來。",
        default: "我明白了，能不能多跟我說說？"
      }
    },
    suggestions: {
      stormy: { text: "看來此刻有點艱難。沒關係，我們都在。", action: "和 AI 聊聊心事" },
      cloudy: { text: "平平淡淡也是一種福氣。要試着放鬆一下嗎？", action: "做個靜觀練習" },
      sunny: { text: "太棒了！要把這份好心情延續下去嗎？", action: "聽點歡快的音樂" }
    },
    home: "主頁",
    sidebar: {
      switchToMobile: "切換至手機視圖",
      switchToDesktop: "切換至電腦視圖"
    },
    weatherText: {
        stormy: '允許雨水落下，就像允許眼淚流出。',
        cloudy: '雲捲雲舒，享受當下的寧靜。',
        sunny: '陽光正好，盡情感受這份溫暖吧。'
    },
    dateLabel: "日期",
    modeLabel: "模式"
  },
  'zh-CN': {
    appName: "心灵导航",
    greeting: "你好，旅行者",
    moodQuestion: "今天的心灵天气如何？",
    moodIndex: "心情指数",
    low: "低落",
    high: "开心",
    exploreMore: "探索更多",
    back: "返回",
    mindfulness: {
      title: "静观",
      subtitle: "每日打卡 · 参考心牌",
      checkInTitle: "每日正念打卡",
      checkInDesc: "花一分钟，感受当下。",
      checkInBtn: "开始打卡",
      checkedInBtn: "今日已完成 ✅",
      cardTitle: "参考心牌",
      drawCard: "抽取新卡",
    },
    music: {
      title: "音乐",
      subtitle: "白噪音 · 舒缓情绪",
      nowPlaying: "正在播放",
      clickToPlay: "点击列表开始播放",
      playing: "正在播放中...",
    },
    ai: {
      title: "AI 辅导",
      subtitle: "情绪指引 · 聊天",
      placeholder: "在这里输入你的想法...",
      send: "发送",
      initialMsg: [
        "你好，我是你的AI心情社工。今天感觉怎么样？",
        "我注意到你心情不太好。没关系，这里只有我们，想说说发生什么了吗？",
        "看起来你心情不错！有什么开心的事情想记录下来吗？"
      ],
      replies: {
        stress: "听起来你现在压力很大。现在的感受是完全正常的，试着深呼吸一下，我们在这里陪着你。",
        thanks: "不客气，随时欢迎你回来。",
        default: "我明白了，能不能多跟我说说？"
      }
    },
    suggestions: {
      stormy: { text: "看来此刻有点艰难。没关系，我们都在。", action: "和 AI 聊聊心事" },
      cloudy: { text: "平平淡淡也是一种福气。要试着放松一下吗？", action: "做个静观练习" },
      sunny: { text: "太棒了！要把这份好心情延续下去吗？", action: "听点欢快的音乐" }
    },
    home: "主页",
    sidebar: {
      switchToMobile: "切换至手机视图",
      switchToDesktop: "切换至电脑视图"
    },
    weatherText: {
        stormy: '允许雨水落下，就像允许眼泪流出。',
        cloudy: '云卷云舒，享受当下的宁静。',
        sunny: '阳光正好，尽情感受这份温暖吧。'
    },
    dateLabel: "日期",
    modeLabel: "模式"
  },
  'en-US': {
    appName: "SoulNav",
    greeting: "Hello, Traveler",
    moodQuestion: "How is your mental weather?",
    moodIndex: "Mood Index",
    low: "Low",
    high: "High",
    exploreMore: "Explore More",
    back: "Back",
    mindfulness: {
      title: "Mindfulness",
      subtitle: "Check-in · Wisdom Cards",
      checkInTitle: "Daily Check-in",
      checkInDesc: "Take a minute, feel the moment.",
      checkInBtn: "Check In",
      checkedInBtn: "Completed ✅",
      cardTitle: "Wisdom Cards",
      drawCard: "Draw New Card",
    },
    music: {
      title: "Music",
      subtitle: "White Noise · Relaxing",
      nowPlaying: "Now Playing",
      clickToPlay: "Select a track to play",
      playing: "Playing...",
    },
    ai: {
      title: "AI Guide",
      subtitle: "Support · Chat",
      placeholder: "Type your thoughts...",
      send: "Send",
      initialMsg: [
        "Hi, I'm your AI emotional guide. How are you feeling today?",
        "I noticed you're feeling a bit down. It's okay, I'm here. Want to talk about it?",
        "Looks like you're in a good mood! Want to record what made you happy?"
      ],
      replies: {
        stress: "It sounds like you're under a lot of pressure. It's completely normal to feel this way. Try taking a deep breath.",
        thanks: "You're welcome. Come back anytime.",
        default: "I see. Can you tell me more?"
      }
    },
    suggestions: {
      stormy: { text: "It seems tough right now. We are here.", action: "Chat with AI" },
      cloudy: { text: "Peace is a blessing. Want to relax?", action: "Mindfulness Practice" },
      sunny: { text: "Awesome! Want to keep this vibe?", action: "Listen to Music" }
    },
    home: "Home",
    sidebar: {
      switchToMobile: "Switch to Mobile View",
      switchToDesktop: "Switch to Desktop View"
    },
    weatherText: {
        stormy: 'Allow the rain to fall, just as you allow tears to flow.',
        cloudy: 'Watch the clouds roll by and enjoy the peace of the moment.',
        sunny: 'The sun is shining, enjoy the warmth.'
    },
    dateLabel: "Date",
    modeLabel: "Mode"
  }
};

// --- 数据生成函数 (根据语言) ---

const getWisdomCards = (lang) => {
  if (lang === 'en-US') {
    return [
      "Every deep breath is a new beginning.",
      "Accept yourself in this moment.",
      "Emotions are like clouds, they come and go.",
      "You are stronger than you think.",
      "Give yourself time, take it slow.",
      "Peace is the best gift you can give yourself."
    ];
  }
  // Default to zh-TW / zh-CN (simplification can be done via regex if needed, but here we reuse TW for simplicity or separate if strictly needed)
  if (lang === 'zh-CN') {
     return [
      "每一次深呼吸，都是一次新的开始。",
      "接纳当下的自己，无论好坏。",
      "情绪就像云朵，会来也会走。",
      "你比你想象的更坚强。",
      "给自己一点时间，慢慢来。",
      "今天的平静是你给自己最好的礼物。"
    ];
  }
  return [
    "每一次深呼吸，都是一次新的開始。",
    "接納當下的自己，無論好壞。",
    "情緒就像雲朵，會來也會走。",
    "你比你想像的更堅強。",
    "給自己一點時間，慢慢來。",
    "今天的平靜是你給自己最好的禮物。"
  ];
};

const getMusicTracks = (lang) => {
  const isEn = lang === 'en-US';
  const isCn = lang === 'zh-CN';
  
  const t = (tw, cn, en) => {
      if (isEn) return en;
      if (isCn) return cn;
      return tw;
  };

  return [
    { id: 1, title: t("雨聲白噪音", "雨声白噪音", "Rain White Noise"), category: t("白噪音", "白噪音", "White Noise"), duration: "15:00" },
    { id: 2, title: t("森林鳥鳴", "森林鸟鸣", "Forest Birds"), category: t("白噪音", "白噪音", "White Noise"), duration: "10:00" },
    { id: 3, title: t("鋼琴獨奏 - 寧靜", "钢琴独奏 - 宁静", "Piano Solo - Calm"), category: t("平緩風格", "平缓风格", "Gentle Style"), duration: "04:30" },
    { id: 4, title: t("大提琴 - 沉思", "大提琴 - 沉思", "Cello - Reflection"), category: t("平緩風格", "平缓风格", "Gentle Style"), duration: "05:15" },
    { id: 5, title: t("舒緩情緒 - α波", "舒缓情绪 - α波", "Alpha Waves"), category: t("舒緩情緒", "舒缓情绪", "Soothing"), duration: "20:00" },
  ];
};

// --- 辅助函数：设备检测 ---
const getInitialDeviceMode = () => {
  if (typeof window === 'undefined') return 'mobile';
  
  const ua = navigator.userAgent;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isWideScreen = window.innerWidth >= 1024; // Tailwind lg breakpoint

  return (!isMobileUA && isWideScreen) ? 'desktop' : 'mobile';
};

// --- 通用小组件 ---

function NavIcon({ icon: Icon, label, active, onClick, theme, mode = 'mobile' }) {
  const activeColor = theme === 'stormy' ? 'text-white' : 'text-slate-800';
  const inactiveColor = theme === 'stormy' ? 'text-slate-400 opacity-60' : 'text-slate-500 opacity-60';

  if (mode === 'desktop') {
    return (
      <button 
        onClick={onClick} 
        className={`flex items-center gap-4 px-6 py-4 w-full transition-all duration-300 rounded-xl ${active ? 'bg-white/20 ' + activeColor : inactiveColor + ' hover:bg-white/10'}`}
      >
        <Icon size={24} strokeWidth={active ? 2.5 : 2} />
        <span className="text-base font-bold tracking-wide">{label}</span>
      </button>
    );
  }

  // Mobile styling
  return (
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? activeColor + ' scale-110' : inactiveColor} hover:opacity-100`}
    >
      <Icon size={24} strokeWidth={active ? 2.5 : 2} />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

function FeatureCard({ title, subtitle, icon: Icon, theme, baseColor, onClick, mode = 'mobile' }) {
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
        <h3 className={`font-bold ${mode === 'desktop' ? 'text-xl' : 'text-lg'}`}>{title}</h3>
        <p className={`mt-0.5 ${theme === 'stormy' ? 'text-slate-300' : 'text-slate-500'} ${mode === 'desktop' ? 'text-sm' : 'text-xs'}`}>{subtitle}</p>
      </div>
      <div className="ml-auto opacity-30">
        <SkipForward size={20} />
      </div>
    </button>
  );
}

function Header({ title, onBack, showBack = true, language, setLanguage, texts }) {
  // 简单的语言循环: zh-TW -> zh-CN -> en-US -> zh-TW
  const toggleLanguage = () => {
    if (language === 'zh-TW') setLanguage('zh-CN');
    else if (language === 'zh-CN') setLanguage('en-US');
    else setLanguage('zh-TW');
  };

  const getLangLabel = () => {
    if (language === 'zh-TW') return '繁';
    if (language === 'zh-CN') return '简';
    return 'EN';
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {showBack && (
          <button onClick={onBack} className="p-2 bg-white/30 rounded-full hover:bg-white/50 transition-colors">
            <ArrowLeft size={20} />
          </button>
        )}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      
      {/* 语言切换按钮 */}
      <button 
        onClick={toggleLanguage}
        className="flex items-center gap-1 px-3 py-1.5 bg-white/20 rounded-full text-xs font-bold hover:bg-white/30 transition-colors"
      >
        <Globe size={14} />
        {getLangLabel()}
      </button>
    </div>
  );
}

// --- 视图组件 ---

function HomeView({ moodScore, setMoodScore, onNavigate, moodTheme, mode, language, texts }) {
  const getSuggestion = () => {
    let suggestionData;
    if (moodTheme === 'stormy') suggestionData = texts.suggestions.stormy;
    else if (moodTheme === 'cloudy') suggestionData = texts.suggestions.cloudy;
    else suggestionData = texts.suggestions.sunny;

    // Map icons and paths based on theme
    let icon = Music;
    let navTarget = 'music';
    let colorClass = "bg-orange-500/10 border-orange-500/20 text-orange-800";

    if (moodTheme === 'stormy') {
      icon = Bot;
      navTarget = 'ai';
      colorClass = "bg-rose-500/20 border-rose-500/30 text-rose-100";
    } else if (moodTheme === 'cloudy') {
      icon = Wind;
      navTarget = 'mindfulness';
      colorClass = "bg-teal-500/10 border-teal-500/20 text-teal-800";
    }

    return {
      text: suggestionData.text,
      actionText: suggestionData.action,
      action: () => onNavigate(navTarget),
      icon,
      colorClass
    };
  };

  const suggestion = getSuggestion();

  return (
    <div className={`space-y-6 animate-fade-in pb-4 ${mode === 'desktop' ? 'max-w-5xl mx-auto w-full' : ''}`}>
      <div className="mt-2 transition-all duration-1000">
        <h1 className={`font-bold mb-1 ${mode === 'desktop' ? 'text-5xl' : 'text-3xl'}`}>{texts.greeting}</h1>
        <p className={`opacity-70 ${mode === 'desktop' ? 'text-lg' : 'text-sm'}`}>
          {moodTheme === 'stormy' ? texts.weatherText.stormy : 
           moodTheme === 'cloudy' ? texts.weatherText.cloudy : 
           texts.weatherText.sunny}
        </p>
      </div>

      {/* 电脑版布局：Grid */}
      <div className={`${mode === 'desktop' ? 'grid grid-cols-12 gap-8' : 'flex flex-col gap-6'}`}>
        
        {/* 左侧/上方：心情控制 */}
        <div className={`${mode === 'desktop' ? 'col-span-7 space-y-8' : 'space-y-6'}`}>
          {/* 心情滑块 */}
          <div className={`backdrop-blur-md p-6 rounded-3xl shadow-lg transition-all duration-500 border border-white/10 ${moodTheme === 'stormy' ? 'bg-white/10' : 'bg-white/50'}`}>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Heart className={`transition-colors duration-500 ${moodTheme === 'stormy' ? 'text-rose-300' : 'text-rose-500'}`} fill={moodTheme === 'sunny' ? "currentColor" : "none"} /> 
              {texts.moodIndex}
            </h2>
            
            <div className="flex justify-between items-center mb-6 px-4 h-16">
               <span className={`text-4xl transition-all duration-500 ease-out transform ${moodScore <= 3 ? 'scale-150 opacity-100 rotate-0 filter-none drop-shadow-md' : 'scale-75 opacity-40 grayscale blur-[1px]'}`}>😔</span>
               <span className={`text-4xl transition-all duration-500 ease-out transform ${moodScore > 3 && moodScore <= 7 ? 'scale-150 opacity-100 rotate-0 filter-none drop-shadow-md' : 'scale-75 opacity-40 grayscale blur-[1px]'}`}>😐</span>
               <span className={`text-4xl transition-all duration-500 ease-out transform ${moodScore > 7 ? 'scale-150 opacity-100 rotate-0 filter-none drop-shadow-md' : 'scale-75 opacity-40 grayscale blur-[1px]'}`}>😊</span>
            </div>

            <input 
              type="range" 
              min="1" 
              max="10" 
              value={moodScore} 
              onChange={(e) => setMoodScore(parseInt(e.target.value))}
              className={`w-full h-3 rounded-lg appearance-none cursor-pointer outline-none transition-all duration-500 ${
                moodTheme === 'stormy' ? 'bg-slate-600 accent-rose-400' : 
                moodTheme === 'cloudy' ? 'bg-slate-300 accent-teal-600' : 
                'bg-orange-200 accent-orange-500'
              }`}
            />
            <div className="flex justify-between text-xs font-mono opacity-50 mt-3 px-1">
              <span>{texts.low}</span>
              <span>{moodScore}/10</span>
              <span>{texts.high}</span>
            </div>
          </div>

           {/* 智能触发卡片 */}
          <div className={`p-6 rounded-2xl border transition-all duration-700 transform ${suggestion.colorClass} ${moodTheme === 'stormy' ? 'bg-opacity-20 border-opacity-20' : ''}`}>
            <div className="flex items-center gap-6">
              <div className={`p-4 rounded-full ${moodTheme === 'stormy' ? 'bg-white/10' : 'bg-white/50'}`}>
                <suggestion.icon size={32} />
              </div>
              <div className="flex-1">
                <p className="text-lg font-medium mb-2 leading-relaxed opacity-90">
                  {suggestion.text}
                </p>
                <button 
                  onClick={suggestion.action}
                  className={`text-sm font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-transform active:scale-95 ${
                    moodTheme === 'stormy' ? 'bg-white/20 hover:bg-white/30 text-white' : 
                    'bg-white hover:bg-white/80 text-slate-700 shadow-sm'
                  }`}
                >
                  {suggestion.actionText} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧/下方：功能入口 */}
        <div className={`${mode === 'desktop' ? 'col-span-5 grid grid-cols-1 gap-4' : 'grid grid-cols-1 gap-3 pt-2'}`}>
          <h3 className={`font-bold opacity-50 px-1 ${mode === 'desktop' ? 'text-lg hidden' : 'text-sm'}`}>{texts.exploreMore}</h3>
          <FeatureCard 
            title={texts.mindfulness.title} 
            subtitle={texts.mindfulness.subtitle} 
            icon={Wind} 
            theme={moodTheme}
            baseColor="emerald"
            onClick={() => onNavigate('mindfulness')} 
            mode={mode}
          />
          <FeatureCard 
            title={texts.music.title} 
            subtitle={texts.music.subtitle}
            icon={Music} 
            theme={moodTheme}
            baseColor="indigo"
            onClick={() => onNavigate('music')} 
            mode={mode}
          />
          <FeatureCard 
            title={texts.ai.title} 
            subtitle={texts.ai.subtitle}
            icon={Bot} 
            theme={moodTheme}
            baseColor="rose"
            onClick={() => onNavigate('ai')} 
            mode={mode}
          />
        </div>

      </div>
    </div>
  );
}

function MindfulnessView({ onBack, mode, language, texts }) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const cards = getWisdomCards(language);
  const [cardContent, setCardContent] = useState(cards[0]);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCheckIn = () => setIsCheckedIn(true);

  const drawNewCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const random = cards[Math.floor(Math.random() * cards.length)];
      setCardContent(random);
      setIsFlipped(true);
    }, 300);
  };

  useEffect(() => {
    // Refresh card content when language changes if we haven't flipped yet or just reset
    setCardContent(cards[Math.floor(Math.random() * cards.length)]);
    const timer = setTimeout(() => setIsFlipped(true), 100);
    return () => clearTimeout(timer);
  }, [language]);

  return (
    <div className={`space-y-6 animate-fade-in-up ${mode === 'desktop' ? 'max-w-5xl mx-auto w-full' : ''}`}>
      {/* 传递 header props 以支持在子页面切换语言 */}
      <Header title={texts.mindfulness.title} onBack={onBack} showBack={mode === 'mobile'} />

      <div className={`${mode === 'desktop' ? 'grid grid-cols-2 gap-8 items-start' : 'flex flex-col gap-6'}`}>
        
        {/* 打卡区 */}
        <div className="bg-white/60 p-8 rounded-3xl text-center shadow-sm backdrop-blur-md flex flex-col items-center justify-center h-full min-h-[300px]">
          <div className="mb-6 flex justify-center text-teal-600">
            <Calendar size={64} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-slate-800">{texts.mindfulness.checkInTitle}</h3>
          <p className="text-base text-slate-600 mb-8">{texts.mindfulness.checkInDesc}</p>
          <button 
            onClick={handleCheckIn}
            disabled={isCheckedIn}
            className={`px-10 py-4 rounded-full font-bold text-lg transition-all ${isCheckedIn ? 'bg-slate-200 text-slate-400' : 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg hover:shadow-xl'}`}
          >
            {isCheckedIn ? texts.mindfulness.checkedInBtn : texts.mindfulness.checkInBtn}
          </button>
        </div>

        {/* 卡片区 */}
        <div>
          <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="font-bold text-xl flex items-center gap-2"><Sparkles size={20} /> {texts.mindfulness.cardTitle}</h3>
            <button onClick={drawNewCard} className="text-base font-semibold underline opacity-70 hover:opacity-100">{texts.mindfulness.drawCard}</button>
          </div>
          
          <div className={`aspect-[3/4] perspective-1000 w-full max-w-md mx-auto`}>
             <div className={`relative w-full h-full duration-700 preserve-3d transition-transform ${isFlipped ? 'rotate-y-0' : 'rotate-y-180'}`}>
                <div className="absolute w-full h-full bg-gradient-to-tr from-teal-500 to-emerald-300 rounded-3xl shadow-xl backface-hidden flex items-center justify-center rotate-y-180">
                    <Wind className="text-white opacity-50" size={80} />
                </div>
                <div className="absolute w-full h-full bg-white/90 backdrop-blur rounded-3xl shadow-xl backface-hidden flex flex-col items-center justify-center p-10 text-center border-4 border-white">
                    <Wind className="text-teal-500 mb-8 opacity-50" size={48} />
                    <p className="text-2xl font-medium leading-relaxed text-slate-700">"{cardContent}"</p>
                    <div className="mt-10 w-16 h-1.5 bg-teal-200 rounded-full"></div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function MusicView({ onBack, mode, language, texts }) {
  const [playingId, setPlayingId] = useState(null);
  const togglePlay = (id) => setPlayingId(playingId === id ? null : id);
  const tracks = getMusicTracks(language);

  return (
    <div className={`space-y-6 animate-fade-in-up h-full flex flex-col ${mode === 'desktop' ? 'max-w-5xl mx-auto w-full' : ''}`}>
      <Header title={texts.music.title} onBack={onBack} showBack={mode === 'mobile'} />
      
      {/* 当前播放 */}
      <div className="bg-indigo-900/20 backdrop-blur-md p-8 rounded-3xl flex items-center gap-6 border border-white/10 shadow-lg">
        <div className={`w-24 h-24 rounded-2xl flex items-center justify-center bg-indigo-500 text-white shadow-lg ${playingId ? 'animate-pulse' : ''}`}>
           <Music size={40} />
        </div>
        <div>
           <div className="text-sm font-bold opacity-50 uppercase tracking-wider mb-1">{texts.music.nowPlaying}</div>
           <div className="font-bold text-2xl">
             {playingId ? tracks.find(t => t.id === playingId).title : texts.music.clickToPlay}
           </div>
           {playingId && <div className="mt-2 text-sm opacity-70 flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div> {texts.music.playing}</div>}
        </div>
      </div>

      {/* 播放列表 */}
      <div className={`flex-1 overflow-y-auto pb-20 ${mode === 'desktop' ? 'grid grid-cols-2 gap-4 content-start' : 'space-y-3'}`}>
        {tracks.map((track) => (
          <div 
            key={track.id} 
            onClick={() => togglePlay(track.id)}
            className={`p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all border group ${
              playingId === track.id 
                ? 'bg-white/90 shadow-md scale-[1.02] border-indigo-200' 
                : 'bg-white/40 hover:bg-white/60 border-transparent hover:shadow-sm'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${playingId === track.id ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-500 group-hover:bg-white'}`}>
                {playingId === track.id ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-lg">{track.title}</h4>
                <p className="text-sm text-slate-500">{track.category}</p>
              </div>
            </div>
            <span className="text-sm font-mono text-slate-500 opacity-70">{track.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIChatView({ onBack, initialMood, mode, texts, language }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // 初始化消息
  useEffect(() => {
    let firstMsg = texts.ai.initialMsg[0]; // Default
    if (initialMood <= 3) firstMsg = texts.ai.initialMsg[1]; // Low
    if (initialMood >= 8) firstMsg = texts.ai.initialMsg[2]; // High
    
    setMessages([{ id: 1, sender: 'ai', text: firstMsg }]);
  }, [initialMood, language]); // Re-run if language changes to translate initial message

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = texts.ai.replies.default;
      const lowerInput = userMsg.text.toLowerCase();
      
      // 简单的关键词匹配 (支持中英文)
      if (lowerInput.includes("累") || lowerInput.includes("難受") || lowerInput.includes("难受") || lowerInput.includes("tired") || lowerInput.includes("sad")) {
        replyText = texts.ai.replies.stress;
      } else if (lowerInput.includes("謝謝") || lowerInput.includes("谢谢") || lowerInput.includes("thank")) {
         replyText = texts.ai.replies.thanks;
      }
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: replyText }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={`flex flex-col animate-fade-in-up ${mode === 'desktop' ? 'h-[calc(100vh-120px)] max-w-4xl mx-auto w-full' : 'h-[calc(100vh-180px)]'}`}>
      <Header title={texts.ai.title} onBack={onBack} showBack={mode === 'mobile'} />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6 mb-4 rounded-3xl bg-black/5 shadow-inner">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-base leading-relaxed shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-rose-500 text-white rounded-br-none' 
                : 'bg-white text-slate-700 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/50 p-4 rounded-2xl rounded-bl-none flex gap-1.5">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white rounded-full shadow-xl p-2 flex items-center gap-3 border border-slate-100">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={texts.ai.placeholder}
          className="flex-1 bg-transparent px-6 py-3 outline-none text-slate-700 placeholder-slate-400 text-lg"
        />
        <button 
          onClick={handleSend}
          className="p-4 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-all transform hover:scale-105 shadow-md"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

// --- 主应用容器 (包含布局逻辑) ---

export default function SoulNavApp() {
  const [currentView, setCurrentView] = useState('home'); 
  const [moodScore, setMoodScore] = useState(5); 
  const [viewMode, setViewMode] = useState('mobile');
  
  // 新增：语言状态，默认为繁体中文 (zh-TW)
  const [language, setLanguage] = useState('zh-TW');

  // 获取当前语言的文本包
  const texts = TRANSLATIONS[language];

  useEffect(() => {
    const initialMode = getInitialDeviceMode();
    setViewMode(initialMode);
    
    // 简单的窗口大小监听
    const handleResize = () => {
       // logic kept simple
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'mobile' ? 'desktop' : 'mobile');
  };
  
  const getMoodTheme = (score) => {
    if (score <= 3) return 'stormy';
    if (score <= 7) return 'cloudy';
    return 'sunny';
  };

  const moodTheme = getMoodTheme(moodScore);
  const navigateTo = (view) => setCurrentView(view);

  const getBackgroundClass = () => {
    switch(moodTheme) {
      case 'stormy': 
        return 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white';
      case 'cloudy': 
        return 'bg-gradient-to-br from-slate-200 via-blue-100 to-slate-300 text-slate-800';
      default: 
        return 'bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 text-slate-800'; 
    }
  };

  // --- 语言切换逻辑 (共享给所有子视图) ---
  const sharedProps = {
    moodScore, setMoodScore, 
    onNavigate: navigateTo, 
    moodTheme, 
    mode: viewMode,
    language, setLanguage, texts
  };

  // 渲染视图组件
  const ViewComponent = () => {
    switch(currentView) {
      case 'home': return <HomeView {...sharedProps} />;
      case 'mindfulness': return <MindfulnessView onBack={() => navigateTo('home')} {...sharedProps} />;
      case 'music': return <MusicView onBack={() => navigateTo('home')} {...sharedProps} />;
      case 'ai': return <AIChatView onBack={() => navigateTo('home')} initialMood={moodScore} {...sharedProps} />;
      default: return null;
    }
  };

  // 简单的语言切换按钮 (用于桌面侧边栏或手机顶部)
  const LanguageToggleBtn = ({ isMobile }) => (
    <button 
      onClick={() => {
        if (language === 'zh-TW') setLanguage('zh-CN');
        else if (language === 'zh-CN') setLanguage('en-US');
        else setLanguage('zh-TW');
      }}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-xs transition-colors ${
        isMobile ? 'bg-white/20' : 'bg-black/20 hover:bg-black/30 text-white/80'
      }`}
    >
      <Globe size={14} />
      {language === 'zh-TW' ? '繁' : language === 'zh-CN' ? '简' : 'EN'}
    </button>
  );

  // 1. 桌面端布局
  if (viewMode === 'desktop') {
    return (
      <div className={`min-h-screen flex transition-colors duration-1000 ease-in-out ${getBackgroundClass()} font-sans overflow-hidden`}>
        
        {/* 侧边栏 */}
        <div className="w-72 bg-white/10 backdrop-blur-xl border-r border-white/10 p-8 flex flex-col gap-8 shadow-2xl z-20">
          <div className="flex items-center gap-3 mb-4">
             <div className={`p-2 rounded-lg ${moodTheme === 'stormy' ? 'bg-white/20' : 'bg-white/60'}`}>
               {moodTheme === 'stormy' && <CloudRain size={24} />}
               {moodTheme === 'cloudy' && <Cloud size={24} />}
               {moodTheme === 'sunny' && <Sun size={24} className="text-orange-500" />}
             </div>
             <h1 className="text-2xl font-bold tracking-wider">{texts.appName}</h1>
          </div>

          <div className="space-y-2 flex-1">
             <NavIcon icon={Home} label={texts.home} active={currentView === 'home'} onClick={() => navigateTo('home')} theme={moodTheme} mode="desktop" />
             <NavIcon icon={Wind} label={texts.mindfulness.title} active={currentView === 'mindfulness'} onClick={() => navigateTo('mindfulness')} theme={moodTheme} mode="desktop" />
             <NavIcon icon={Music} label={texts.music.title} active={currentView === 'music'} onClick={() => navigateTo('music')} theme={moodTheme} mode="desktop" />
             <NavIcon icon={Bot} label={texts.ai.title} active={currentView === 'ai'} onClick={() => navigateTo('ai')} theme={moodTheme} mode="desktop" />
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            {/* 桌面端语言切换 */}
            <div className="flex justify-between items-center px-2">
              <span className="text-xs opacity-60">Language</span>
              <LanguageToggleBtn isMobile={false} />
            </div>

            <button 
              onClick={toggleViewMode}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/20 hover:bg-black/30 text-white/80 transition-all w-full text-sm"
            >
              <Smartphone size={18} />
              {texts.sidebar.switchToMobile}
            </button>
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
           <header className="p-8 flex justify-end items-center">
              <span className="text-sm font-medium opacity-60 font-mono">
                {new Date().toLocaleDateString()} · {viewMode.toUpperCase()}
              </span>
           </header>

           <main className="flex-1 overflow-y-auto px-12 pb-12">
              <ViewComponent />
           </main>
        </div>
      </div>
    );
  }

  // 2. 移动端布局
  return (
    <div className={`min-h-screen transition-colors duration-1000 ease-in-out ${getBackgroundClass()} font-sans overflow-hidden relative flex items-center justify-center bg-gray-900`}>
      
      <div className="absolute top-6 right-6 z-50 hidden md:block">
         <button 
            onClick={toggleViewMode}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/10 transition-all"
         >
            <Monitor size={16} /> {texts.mobile.switchToDesktop}
         </button>
      </div>

      <div className="w-full max-w-md h-[100vh] md:h-[90vh] md:rounded-[3rem] md:border-8 md:border-gray-800 flex flex-col bg-white/10 backdrop-blur-sm shadow-2xl relative transition-all duration-1000 overflow-hidden">
        
        {/* 顶部栏 */}
        <div className="p-4 flex justify-between items-center z-10 md:mt-2">
          {/* 手机端语言切换放在左侧或者标题旁 */}
          <LanguageToggleBtn isMobile={true} />

          <button onClick={() => navigateTo('home')} className="font-bold text-lg tracking-widest opacity-80 transition-opacity">
            {texts.appName}
          </button>
          <div className="transition-all duration-1000 transform">
             {moodTheme === 'stormy' && <CloudRain size={20} className="animate-pulse opacity-80" />}
             {moodTheme === 'cloudy' && <Cloud size={20} className="opacity-80" />}
             {moodTheme === 'sunny' && <Sun size={20} className="animate-spin-slow opacity-80 text-orange-400" />}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden relative p-4 scroll-smooth no-scrollbar">
          <ViewComponent />
        </div>

        <div className={`p-4 backdrop-blur-md flex justify-around items-center md:rounded-b-[2.5rem] transition-colors duration-500 ${moodTheme === 'stormy' ? 'bg-black/20 text-white' : 'bg-white/40 text-slate-800'}`}>
          <NavIcon icon={Home} label={texts.home} active={currentView === 'home'} onClick={() => navigateTo('home')} theme={moodTheme} />
          <NavIcon icon={Wind} label={texts.mindfulness.title} active={currentView === 'mindfulness'} onClick={() => navigateTo('mindfulness')} theme={moodTheme} />
          <NavIcon icon={Music} label={texts.music.title} active={currentView === 'music'} onClick={() => navigateTo('music')} theme={moodTheme} />
          <NavIcon icon={Bot} label={texts.ai.title} active={currentView === 'ai'} onClick={() => navigateTo('ai')} theme={moodTheme} />
        </div>

      </div>
    </div>
  );
}
