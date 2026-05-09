/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, ChevronRight, CheckCircle2, Volume2, Camera, Info } from 'lucide-react';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import * as drawingUtils from '@mediapipe/drawing_utils';

export const WorkoutPlayer = ({ onExit }: { onExit: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isDone, setIsDone] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [formFeedback, setFormFeedback] = useState("Align your body with the camera");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const exercises = [
    { name: "Deep Squats", reps: "15 Reps", tip: "Keep your chest up and weight on your heels." },
    { name: "Diamond Push-ups", reps: "12 Reps", tip: "Keep your elbows close to your body." },
    { name: "Lunges", reps: "20 Reps", tip: "Maintain a 90-degree angle with both knees." }
  ];

  useEffect(() => {
    let interval: any;
    if (isPlaying && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      if (currentExerciseIdx < exercises.length - 1) {
        setCurrentExerciseIdx(prev => prev + 1);
        setTimer(30);
      } else {
        setIsDone(true);
        setIsPlaying(false);
      }
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer, currentExerciseIdx]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        initMediaPipe();
      }
    } catch (err) {
      console.error("Camera error:", err);
      setFormFeedback("Camera access denied");
    }
  };

  const initMediaPipe = () => {
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults((results) => {
      if (!canvasRef.current) return;
      const canvasCtx = canvasRef.current.getContext('2d');
      if (!canvasCtx) return;

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Draw landmarks
      if (results.poseLandmarks) {
        drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
          color: '#CCFF00',
          lineWidth: 2
        });
        drawingUtils.drawLandmarks(canvasCtx, results.poseLandmarks, {
           color: '#CCFF00',
           lineWidth: 1,
           radius: 2
        });

        // Basic Form Logic Mock
        const knee = results.poseLandmarks[26]; // Left knee
        const hip = results.poseLandmarks[24]; // Left hip
        if (knee && hip && knee.y < hip.y + 0.1) {
           setFormFeedback("Go deeper! Squat lower.");
        } else {
           setFormFeedback("Perfect form! Keep going.");
        }
      }
      canvasCtx.restore();
    });

    if (videoRef.current) {
        const sendFrames = async () => {
            if (videoRef.current) {
                await pose.send({image: videoRef.current});
                requestAnimationFrame(sendFrames);
            }
        };
        sendFrames();
    }
  };

  if (isDone) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-center items-center justify-center p-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-24 h-24 bg-neon-lime/10 rounded-full flex items-center justify-center mx-auto text-neon-lime border border-neon-lime/50">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-display font-extrabold italic uppercase tracking-tighter">Protocol Complete</h2>
          <p className="text-white/40 font-medium">You crushed it! 542 calories burned.</p>
          <button 
            onClick={onExit}
            className="w-full bg-neon-lime text-black py-4 rounded-2xl font-black uppercase tracking-widest shadow-[0_0_30px_rgba(204,255,0,0.3)]"
          >
            Sync Session
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col">
      {/* Header */}
      <div className="p-6 flex justify-between items-center bg-gradient-to-b from-black to-transparent">
        <button onClick={onExit} className="p-2 bg-white/10 rounded-full">
          <X size={24} />
        </button>
        <div className="text-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Exercise {currentExerciseIdx + 1} of {exercises.length}</p>
          <h3 className="font-bold text-lg">{exercises[currentExerciseIdx].name}</h3>
        </div>
        <button className="p-2 bg-white/10 rounded-full">
          <Volume2 size={24} />
        </button>
      </div>

      {/* Main Player Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {!cameraActive ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 p-8">
            <div className="w-full aspect-video bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60" 
                alt="Demo"
                className="w-full h-full object-cover opacity-20 grayscale"
              />
              <div className="absolute inset-0 flex flex-center items-center justify-center">
                 <div className="glass p-6 rounded-[24px] text-center space-y-4 max-w-xs border-white/20">
                    <Camera size={40} className="mx-auto text-neon-lime" />
                    <h4 className="font-bold tracking-tight italic uppercase">AI Form Scan</h4>
                    <p className="text-[10px] text-white/40 font-bold uppercase leading-relaxed">Real-time depth analysis active</p>
                    <button 
                      onClick={startCamera}
                      className="w-full py-3 bg-neon-lime text-black rounded-xl font-black text-sm uppercase tracking-widest"
                    >
                      Initialize Cam
                    </button>
                 </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 relative bg-dark-surface overflow-hidden">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover -scale-x-100"
            />
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 w-full h-full -scale-x-100 z-10"
              width={640}
              height={480}
            />
            
            {/* Form HUD */}
            <div className="absolute top-4 left-4 z-20">
               <div className="glass rounded-xl p-3 flex items-center gap-3 border-l-4 border-l-neon-lime">
                  <div className="w-2 h-2 rounded-full bg-neon-lime animate-pulse"></div>
                  <p className="text-sm font-bold tracking-tight uppercase italic">{formFeedback}</p>
               </div>
            </div>

            <div className="absolute bottom-4 right-4 z-20">
               <div className="glass rounded-2xl p-4 text-center">
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Form Depth</p>
                  <p className="text-3xl font-display font-black text-neon-lime italic">A+</p>
               </div>
            </div>
          </div>
        )}

        {/* Coach Tip Overlay */}
        <div className="p-6">
           <div className="glass-dark border-neon-cyan/20 rounded-2xl p-4 flex gap-4 items-center">
              <div className="p-2 bg-neon-cyan/10 rounded-lg text-neon-cyan">
                <Info size={20} />
              </div>
              <p className="text-sm font-medium text-gray-300">
                {exercises[currentExerciseIdx].tip}
              </p>
           </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-8 bg-black">
        <div className="flex justify-between items-center mb-8">
           <div className="text-center">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Remaining</p>
              <p className="text-5xl font-display font-extrabold tracking-tighter">0:{timer < 10 ? `0${timer}` : timer}</p>
           </div>
           <button 
             onClick={() => setIsPlaying(!isPlaying)}
             className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center shadow-xl transition-transform active:scale-90"
           >
             {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
           </button>
           <div className="text-center">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Target</p>
              <p className="text-2xl font-display font-extrabold">{exercises[currentExerciseIdx].reps}</p>
           </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
           <motion.div 
             className="h-full bg-neon-cyan" 
             initial={{ width: '0%' }}
             animate={{ width: `${(30 - timer) / 30 * 100}%` }}
             transition={{ duration: 0.3 }}
           />
        </div>
      </div>
    </div>
  );
};
