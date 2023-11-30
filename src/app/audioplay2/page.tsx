'use client'
import { useEffect, useRef } from 'react';
import  WaveSurfer from "wavesurfer.js";
import WaveTable from '@/ui/wave/table';
import FootNav from '@/ui/wave/footnav';

export default function Page() { 
  /** 
  // WaveSurfer hook
  const waveAudioRef = useRef({} as WaveSurfer);
  const audioContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    waveAudioRef.current = WaveSurfer.create({
      // Type 'WaveSurfer' is not assignable to type 'string | HTMLElement'.
      container: audioContainerRef.current,
    });
    waveAudioRef.current.load("assets/test.wav");
  }, []);

  
  const handleClick = (ev: any) => {
    if (!waveAudioRef.current.isPlaying()) {
      waveAudioRef.current.play();
      return;
    }
    waveAudioRef.current.pause();
  };
  */
  useEffect(() => {
    const request = new XMLHttpRequest();
    request.open("GET", "V-PERC 47.wav", true);
    request.responseType = "arraybuffer";

    if (request) {
      request.onload = (e) => {
        const audioData = request.response;
        const audioContext = new AudioContext();
        
        audioContext.decodeAudioData(audioData).then((audioBuffer) => {
          const pcmData = audioBuffer.getChannelData(0);

          const canvas = document.getElementById("waveform") as HTMLCanvasElement;
          const canvasContext = canvas.getContext("2d")!;
          canvasContext.clearRect(0, 0, canvas.width, canvas.height);
          canvasContext.beginPath();

          for (let i = 0; i < pcmData.length; i++) {
            const sample = pcmData[i];
            const x = (i / pcmData.length) * canvas.width;
            const y = (sample + 1) * (canvas.height / 2);

            if (i === 0) {
              canvasContext.moveTo(x, y);
            } else {
              canvasContext.lineTo(x, y);
            }
          }

          canvasContext.stroke();
        });
      };

      request.send();
    } else {
      console.error('XMLHttpRequestが作成できませんでした');
    }

    // クリーンアップ
    return () => {
      // クリーンアップの処理があればここに記述
    };
  }, []); // 依存リストを空にしてマウント時のみ実行

 
  
  
  
    
  
 
  return (
    <>
    {/** 
     <div ref={audioContainerRef} onClick={handleClick}></div>
     */}
     
     <canvas id="waveform" width="400" height="200"></canvas>
    </>
  );
};
