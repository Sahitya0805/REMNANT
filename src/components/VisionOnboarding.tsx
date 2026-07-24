import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight } from 'lucide-react';

interface VisionOnboardingProps {
  onComplete: () => void;
}

export const VisionOnboarding: React.FC<VisionOnboardingProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'orb' | 'phone' | 'otp' | 'interview' | 'neural'>('orb');
  const [orbText, setOrbText] = useState('');
  const [phoneDigits, setPhoneDigits] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [neuralProgress, setNeuralProgress] = useState(0);

  useEffect(() => {
    if (stage === 'orb') {
      const fullText = "R E M N A N T\nEvery purchase leaves a remnant.";
      let currentIdx = 0;
      const interval = setInterval(() => {
        setOrbText(fullText.slice(0, currentIdx));
        currentIdx++;
        if (currentIdx > fullText.length) {
          clearInterval(interval);
        }
      }, 70);
      return () => clearInterval(interval);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'neural') {
      const interval = setInterval(() => {
        setNeuralProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
            setTimeout(() => {
              onComplete();
            }, 1200);
            return 100;
          }
          return prev + 5;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [stage, onComplete]);

  const questions = [
    {
      question: "What food feels like home?",
      subtitle: "Select your baseline craving",
      options: [
        { label: "Hot Spicy Tonkotsu Ramen 🍜", planetColor: "from-[#FF6A00] to-[#FF8A00]" },
        { label: "Filter Coffee & Benne Dosa 🧈", planetColor: "from-[#FF8A00] to-amber-600" },
        { label: "Meghana Chicken Biryani 🍗", planetColor: "from-red-600 to-[#FF6A00]" },
        { label: "Avocado Smoothie Bowl 🥗", planetColor: "from-emerald-500 to-teal-600" }
      ]
    },
    {
      question: "Who do you usually eat with?",
      subtitle: "Shapes companion nodes",
      options: [
        { label: "Late-Night Solo Sprints 🌙", planetColor: "from-[#FF6A00] to-purple-600" },
        { label: "College Roommates & Friends 🍕", planetColor: "from-[#FF8A00] to-rose-600" },
        { label: "Family Milestones & Birthdays ❤️", planetColor: "from-rose-600 to-[#FF6A00]" },
        { label: "Teammates at Hackathons 💻", planetColor: "from-cyan-500 to-[#FF6A00]" }
      ]
    }
  ];

  const handleSelectOption = (_optionLabel: string) => {
    if (activeQuestionIdx < questions.length - 1) {
      setActiveQuestionIdx(activeQuestionIdx + 1);
    } else {
      setStage('neural');
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) return;
    const newOtp = [...otpDigits];
    newOtp[index] = val;
    setOtpDigits(newOtp);

    if (newOtp.every(d => d !== '')) {
      setTimeout(() => {
        setStage('interview');
      }, 400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] text-white flex flex-col items-center justify-center p-6 overflow-hidden font-mono">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6A00]/10 rounded-full blur-[140px] pointer-events-none" />

      <button
        onClick={onComplete}
        className="absolute top-6 right-6 z-20 text-xs font-semibold px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-[#8E8E8E] hover:text-white border border-white/10 transition-all"
      >
        SKIP INTRO
      </button>

      {stage === 'orb' && (
        <div className="flex flex-col items-center text-center space-y-8 max-w-lg z-10">
          
          <div 
            onClick={() => setStage('phone')}
            className="relative cursor-pointer group"
          >
            <div className="w-24 h-24 rounded-full bg-[#FF6A00] p-1 animate-pulse shadow-[0_0_80px_rgba(255,106,0,0.7)] group-hover:scale-110 transition-transform">
              <div className="w-full h-full bg-[#050505] rounded-full flex items-center justify-center">
                <span className="text-3xl text-[#FF6A00]">●</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 h-20">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight whitespace-pre-line leading-relaxed text-[#F8F8F8] font-logo">
              {orbText}
            </h1>
            <p className="text-xs text-[#8E8E8E]">The memories behind every order.</p>
          </div>

          <button
            onClick={() => setStage('phone')}
            className="px-8 py-3.5 bg-[#FF6A00] hover:bg-[#FF8A00] text-black font-extrabold font-mono text-sm rounded-2xl shadow-[0_0_25px_rgba(255,106,0,0.5)] flex items-center gap-2 transition-all hover:scale-105"
          >
            <span>ENTER REMNANT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {stage === 'phone' && (
        <div className="flex flex-col items-center text-center space-y-6 max-w-md w-full z-10 font-mono">
          <div className="space-y-1">
            <div className="text-xs uppercase font-extrabold tracking-widest text-[#FF6A00]">REMNANT AUTHENTICATION</div>
            <h2 className="text-2xl font-extrabold text-white">Enter Mobile Number</h2>
          </div>

          <div className="w-full bg-[#0D0D0D] border border-white/10 rounded-2xl p-4 flex items-center justify-center gap-2 text-xl font-mono tracking-widest text-[#FF6A00] shadow-xl min-h-[64px]">
            <span>+91</span>
            <span className="text-white font-extrabold">{phoneDigits || '__________'}</span>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '➔'].map((key) => (
              <button
                key={key}
                onClick={() => {
                  if (key === 'C') setPhoneDigits('');
                  else if (key === '➔') {
                    if (phoneDigits.length >= 10) setStage('otp');
                  } else {
                    if (phoneDigits.length < 10) setPhoneDigits(prev => prev + key);
                  }
                }}
                className="py-3.5 bg-white/5 hover:bg-[#FF6A00]/20 text-white font-bold text-lg rounded-xl border border-white/10 hover:border-[#FF6A00]/40 transition-all hover:scale-105 active:scale-95"
              >
                {key}
              </button>
            ))}
          </div>

          <button
            onClick={() => setStage('otp')}
            disabled={phoneDigits.length < 10}
            className="w-full py-3.5 bg-[#FF6A00] hover:bg-[#FF8A00] text-black font-extrabold text-sm rounded-xl transition-all disabled:opacity-40"
          >
            SEND OTP
          </button>
        </div>
      )}

      {stage === 'otp' && (
        <div className="flex flex-col items-center text-center space-y-6 max-w-md w-full z-10 font-mono">
          <div className="space-y-1">
            <div className="text-xs uppercase font-extrabold tracking-widest text-[#FF6A00]">SECURITY HANDSHAKE</div>
            <h2 className="text-2xl font-extrabold text-white">Confirm Identity</h2>
            <p className="text-xs text-[#8E8E8E]">Sent to +91 {phoneDigits || '9876543210'}</p>
          </div>

          <div className="flex items-center gap-2">
            {otpDigits.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                className={`w-12 h-14 bg-[#0D0D0D] border text-center text-xl font-extrabold text-white rounded-xl outline-none transition-all ${
                  digit ? 'border-[#FF6A00] bg-[#FF6A00]/20 shadow-[0_0_20px_rgba(255,106,0,0.4)] scale-105' : 'border-white/10 focus:border-[#FF6A00]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setStage('interview')}
            className="w-full py-3.5 bg-[#FF6A00] hover:bg-[#FF8A00] text-black font-extrabold text-sm rounded-xl transition-all"
          >
            VERIFY & SYNC
          </button>
        </div>
      )}

      {stage === 'interview' && (
        <div className="flex flex-col items-center text-center space-y-8 max-w-xl z-10 font-mono">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-[#FF6A00] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>QUESTION {activeQuestionIdx + 1} OF {questions.length}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              {questions[activeQuestionIdx].question}
            </h2>
            <p className="text-xs text-[#8E8E8E]">{questions[activeQuestionIdx].subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {questions[activeQuestionIdx].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt.label)}
                className="group relative p-5 rounded-2xl bg-[#0D0D0D] hover:bg-white/5 border border-white/10 hover:border-[#FF6A00]/40 transition-all text-left space-y-2 hover:scale-105 shadow-xl overflow-hidden"
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${opt.planetColor} shadow-md group-hover:scale-110 transition-transform`} />
                <div className="font-bold text-sm text-white group-hover:text-[#FF6A00]">{opt.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {stage === 'neural' && (
        <div className="flex flex-col items-center text-center space-y-6 max-w-md z-10 font-mono">
          <div className="w-20 h-20 rounded-full bg-[#FF6A00]/20 border border-[#FF6A00]/40 flex items-center justify-center text-[#FF6A00] animate-spin">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-white uppercase">Syncing Memories...</h2>
            <p className="text-xs text-[#8E8E8E]">Particles becoming stars. Building your memory universe.</p>
          </div>

          <div className="w-full bg-[#0D0D0D] h-3 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-[#FF6A00] rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(255,106,0,0.6)]"
              style={{ width: `${neuralProgress}%` }}
            />
          </div>

          <div className="text-xs font-mono text-[#FF6A00] font-bold">
            {neuralProgress}% REMNANTS SYNCED
          </div>
        </div>
      )}

    </div>
  );
};
