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
  ArrowRight
} from 'lucide-react';

// --- 数据 ---

const WISDOM_CARDS = [
  "每一次深呼吸，都是一次新的开始。",
  "接纳当下的自己，无论好坏。",
  "情绪就像云朵，会来也会走。",
  "你比你想象的更坚强。",
  "给自己一点时间，慢慢来。",
  "今天的平静是你给自己最好的礼物。"
];

const MUSIC_TRACKS = [
  { id: 1, title: "雨声白噪音", category: "白噪音", duration: "15:00" },
  { id: 2, title: "森林鸟鸣", category: "白噪音", duration: "10:00" },
  { id: 3, title: "钢琴独奏 - 宁静", category: "平缓风格", duration: "04:30" },
  { id: 4, title: "大提琴 - 沉思", category: "平缓风格", duration: "05:15" },
  { id: 5, title: "舒缓情绪 - α波", category: "舒缓情绪", duration: "20:00" },
];

// --- 主应用组件 ---

export default function SoulNavApp() {
  const [currentView, setCurrentView] = useState('home'); 
  const [moodScore, setMoodScore] = useState(5); 
  
  // 1-3: stormy (心情差), 4-7: cloudy (平静), 8-10: sunny (开心)
  const getMoodTheme = (score) => {
    if (score <= 3) return 'stormy';
    if (score <= 7) return 'cloudy';
    return 'sunny';
  };

  const moodTheme = getMoodTheme(moodScore);

  const navigateTo = (view) => setCurrentView(view);

  // 动态背景样式
  const getBackgroundClass = () => {
    switch(moodTheme) {
      case 'stormy': 
        return 'bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 text-white';
      case 'cloudy': 
        return 'bg-gradient-to-b from-slate-200 via-blue-100 to-slate-300 text-slate-800';
      default: 
        return 'bg-gradient-to-b from-orange-100 via-amber-100 to-yellow-100 text-slate-800'; 
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ease-in-out ${getBackgroundClass()} font-sans overflow-hidden relative`}>
      {/* 模拟手机容器 */}
      <div className="max-w-md mx-auto h-screen flex flex-col bg-white/10 backdrop-blur-sm shadow-2xl relative transition-all duration-1000">
        
        {/* 顶部栏 */}
        <div className="p-4 flex justify-between items-center z-10">
          <button onClick={() => navigateTo('home')} className="font-bold text-lg tracking-widest opacity-80 transition-opacity">
            心灵导航
          </button>
          
          <div className="transition-all duration-1000 transform">
             {moodTheme === 'stormy' && <CloudRain size={20} className="animate-pulse opacity-80" />}
             {moodTheme === 'cloudy' && <Cloud size={20} className="opacity-80" />}
             {moodTheme === 'sunny' && <Sun size={20} className="animate-spin-slow opacity-80 text-orange-400" />}
          </div>
        </div>

        {/* 主视图区域 */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative p-4 scroll-smooth">
          
          {currentView === 'home' && (
            <HomeView 
              moodScore={moodScore} 
              setMoodScore={setMoodScore} 
              onNavigate={navigateTo} 
              moodTheme={moodTheme}
            />
          )}

          {currentView === 'mindfulness' && (
            <MindfulnessView onBack={() => navigateTo('home')} />
          )}

          {currentView === 'music' && (
            <MusicView onBack={() => navigateTo('home')} />
          )}

          {currentView === 'ai' && (
            <AIChatView onBack={() => navigateTo('home')} initialMood={moodScore} />
          )}

        </div>

        {/* 底部导航 */}
        <div className={`p-4 backdrop-blur-md flex justify-around items-center rounded-t-2xl transition-colors duration-500 ${moodTheme === 'stormy' ? 'bg-black/20 text-white' : 'bg-white/40 text-slate-800'}`}>
          <NavIcon icon={Home} label="主页" active={currentView === 'home'} onClick={() => navigateTo('home')} theme={moodTheme} />
          <NavIcon icon={Wind} label="静观" active={currentView === 'mindfulness'} onClick={() => navigateTo('mindfulness')} theme={moodTheme} />
          <NavIcon icon={Music} label="音乐" active={currentView === 'music'} onClick={() => navigateTo('music')} theme={moodTheme} />
          <NavIcon icon={Bot} label="AI辅导" active={currentView === 'ai'} onClick={() => navigateTo('ai')} theme={moodTheme} />
        </div>

      </div>
    </div>
  );
}

// --- 子视图 ---

function HomeView({ moodScore, setMoodScore, onNavigate, moodTheme }) {
  
  // 智能建议逻辑
  const getSuggestion = () => {
    if (moodTheme === 'stormy') {
      return {
        text: "看来此刻有点艰难。没关系，我们都在。",
        actionText: "和 AI 聊聊心事",
        action: () => onNavigate('ai'),
        icon: Bot,
        colorClass: "bg-rose-500/20 border-rose-500/30 text-rose-100"
      };
    } else if (moodTheme === 'cloudy') {
      return {
        text: "平平淡淡也是一种福气。要试着放松一下吗？",
        actionText: "做个静观练习",
        action: () => onNavigate('mindfulness'),
        icon: Wind,
        colorClass: "bg-teal-500/10 border-teal-500/20 text-teal-800"
      };
    } else {
      return {
        text: "太棒了！要把这份好心情延续下去吗？",
        actionText: "听点欢快的音乐",
        action: () => onNavigate('music'),
        icon: Music,
        colorClass: "bg-orange-500/10 border-orange-500/20 text-orange-800"
      };
    }
  };

  const suggestion = getSuggestion();

  return (
    <div className="space-y-6 animate-fade-in pb-4">
      <div className="mt-2 transition-all duration-1000">
        <h1 className="text-3xl font-bold mb-1">你好，旅行者</h1>
        <p className="opacity-70 text-sm">
          {moodTheme === 'stormy' ? '允许雨水落下，就像允许眼泪流出。' : 
           moodTheme === 'cloudy' ? '云卷云舒，享受当下的宁静。' : 
           '阳光正好，尽情感受这份温暖吧。'}
        </p>
      </div>

      {/* 心情滑块 */}
      <div className={`backdrop-blur-md p-6 rounded-3xl shadow-lg transition-all duration-500 border border-white/10 ${moodTheme === 'stormy' ? 'bg-white/10' : 'bg-white/50'}`}>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Heart className={`transition-colors duration-500 ${moodTheme === 'stormy' ? 'text-rose-300' : 'text-rose-500'}`} fill={moodTheme === 'sunny' ? "currentColor" : "none"} /> 
          心情指数
        </h2>
        
        {/* Update: 恢复了原生 Emoji，并增加了平滑过渡逻辑。
            active: scale-150 (放大), opacity-100, filter-none
            inactive: scale-75 (缩小), opacity-40, blur-[1px] (轻微模糊), grayscale (灰度)
        */}
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
          className={`w-full h-3 rounded-lg appearance-none cursor-pointer outline-none transition-all duration-500 ${
            moodTheme === 'stormy' ? 'bg-slate-600 accent-rose-400' : 
            moodTheme === 'cloudy' ? 'bg-slate-300 accent-teal-600' : 
            'bg-orange-200 accent-orange-500'
          }`}
        />
        <div className="flex justify-between text-xs font-mono opacity-50 mt-3 px-1">
          <span>低落</span>
          <span>{moodScore}/10</span>
          <span>开心</span>
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
              onClick={suggestion.action}
              className={`text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-transform active:scale-95 ${
                moodTheme === 'stormy' ? 'bg-white/20 hover:bg-white/30 text-white' : 
                'bg-white hover:bg-white/80 text-slate-700 shadow-sm'
              }`}
            >
              {suggestion.actionText} <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* 功能入口 */}
      <div className="grid grid-cols-1 gap-3 pt-2">
        <h3 className="text-sm font-bold opacity-50 px-1">探索更多</h3>
        <FeatureCard 
          title="静观" 
          subtitle="每日打卡 · 参考心牌" 
          icon={Wind} 
          theme={moodTheme}
          baseColor="emerald"
          onClick={() => onNavigate('mindfulness')} 
        />
        <FeatureCard 
          title="音乐" 
          subtitle="白噪音 · 舒缓情绪" 
          icon={Music} 
          theme={moodTheme}
          baseColor="indigo"
          onClick={() => onNavigate('music')} 
        />
        <FeatureCard 
          title="AI 辅导" 
          subtitle="情绪指引 · 聊天" 
          icon={Bot} 
          theme={moodTheme}
          baseColor="rose"
          onClick={() => onNavigate('ai')} 
        />
      </div>
    </div>
  );
}

function MindfulnessView({ onBack }) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [cardContent, setCardContent] = useState(WISDOM_CARDS[0]);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCheckIn = () => setIsCheckedIn(true);

  const drawNewCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const random = WISDOM_CARDS[Math.floor(Math.random() * WISDOM_CARDS.length)];
      setCardContent(random);
      setIsFlipped(true);
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsFlipped(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Header title="静观练习" onBack={onBack} />

      <div className="bg-white/60 p-6 rounded-3xl text-center shadow-sm backdrop-blur-md">
        <div className="mb-4 flex justify-center text-teal-600">
          <Calendar size={48} />
        </div>
        <h3 className="text-lg font-bold mb-2 text-slate-800">每日正念打卡</h3>
        <p className="text-sm text-slate-600 mb-4">花一分钟，感受当下。</p>
        <button 
          onClick={handleCheckIn}
          disabled={isCheckedIn}
          className={`px-8 py-3 rounded-full font-bold transition-all ${isCheckedIn ? 'bg-slate-200 text-slate-400' : 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg hover:shadow-xl'}`}
        >
          {isCheckedIn ? '今日已完成 ✅' : '开始打卡'}
        </button>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2 px-2">
          <h3 className="font-bold text-lg flex items-center gap-2"><Sparkles size={18} /> 参考心牌</h3>
          <button onClick={drawNewCard} className="text-sm font-semibold underline opacity-70">抽取新卡</button>
        </div>
        
        <div className={`aspect-[3/4] perspective-1000`}>
           <div className={`relative w-full h-full duration-700 preserve-3d transition-transform ${isFlipped ? 'rotate-y-0' : 'rotate-y-180'}`}>
              <div className="absolute w-full h-full bg-gradient-to-tr from-teal-500 to-emerald-300 rounded-3xl shadow-xl backface-hidden flex items-center justify-center rotate-y-180">
                  <Wind className="text-white opacity-50" size={64} />
              </div>
              <div className="absolute w-full h-full bg-white/90 backdrop-blur rounded-3xl shadow-xl backface-hidden flex flex-col items-center justify-center p-8 text-center border-2 border-white">
                  <Wind className="text-teal-500 mb-6 opacity-50" size={32} />
                  <p className="text-xl font-medium leading-relaxed text-slate-700">"{cardContent}"</p>
                  <div className="mt-8 w-12 h-1 bg-teal-200 rounded-full"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function MusicView({ onBack }) {
  const [playingId, setPlayingId] = useState(null);
  const togglePlay = (id) => setPlayingId(playingId === id ? null : id);

  return (
    <div className="space-y-6 animate-fade-in-up h-full flex flex-col">
      <Header title="疗愈音乐" onBack={onBack} />
      
      <div className="bg-indigo-900/20 backdrop-blur-md p-6 rounded-3xl flex items-center gap-4 border border-white/10">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-indigo-500 text-white shadow-lg ${playingId ? 'animate-pulse' : ''}`}>
           <Music size={24} />
        </div>
        <div>
           <div className="text-xs font-bold opacity-50 uppercase tracking-wider">Now Playing</div>
           <div className="font-bold text-lg">{playingId ? MUSIC_TRACKS.find(t => t.id === playingId).title : "点击下方播放"}</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pb-20">
        {MUSIC_TRACKS.map((track) => (
          <div 
            key={track.id} 
            onClick={() => togglePlay(track.id)}
            className={`p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all border ${
              playingId === track.id 
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

function AIChatView({ onBack, initialMood }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let firstMsg = "你好，我是你的AI心情社工。今天感觉怎么样？";
    if (initialMood <= 3) firstMsg = "我注意到你心情不太好。没关系，这里只有我们，想说说发生什么了吗？";
    if (initialMood >= 8) firstMsg = "看起来你心情不错！有什么开心的事情想记录下来吗？";
    
    setMessages([{ id: 1, sender: 'ai', text: firstMsg }]);
  }, [initialMood]);

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
      let replyText = "我明白了，能不能多跟我说说？";
      if (input.includes("累") || input.includes("难受")) {
        replyText = "听起来你现在压力很大。现在的感受是完全正常的，试着深呼吸一下，我们在这里陪着你。";
      } else if (input.includes("谢谢")) {
         replyText = "不客气，随时欢迎你回来。";
      }
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: replyText }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] animate-fade-in-up">
      <Header title="情绪指引" onBack={onBack} />
      
      <div className="flex-1 overflow-y-auto p-2 space-y-4 mb-4 rounded-2xl bg-black/5">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-rose-500 text-white rounded-br-none' 
                : 'bg-white shadow-sm text-slate-700 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/50 p-3 rounded-2xl rounded-bl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white rounded-full shadow-lg p-2 flex items-center gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="在这里输入..."
          className="flex-1 bg-transparent px-4 py-2 outline-none text-slate-700 placeholder-slate-400"
        />
        <button 
          onClick={handleSend}
          className="p-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

// --- 通用小组件 ---

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