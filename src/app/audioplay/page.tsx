
import WaveForm from '@/ui/wave/waveform';
import { useEffect, useRef } from 'react';
import  WaveSurfer from "wavesurfer.js";

export default function Page() { 
  /** 
  // WaveSurfer hook
  const waveAudioRef = useRef({} as WaveSurfer);
  const audioContainerRef = useRef({} as HTMLElement);

  useEffect(() => {
    const audioElement = document.querySelector(
      '#waveform'
    ) as HTMLElement;
    audioContainerRef.current = audioElement;
    const waveform = WaveSurfer.create({
      container: audioElement,
      waveColor: "#0569ff",
      progressColor: "#0353cc",
      normalize: true
    });
    const pathToFile = 'V-PERC 47.wav';
    waveform.load(pathToFile);
    waveAudioRef.current = waveform;
    return () => {
      waveform.destroy();
    }
  });
  const handleClick = (ev: any) => {
    if (!waveAudioRef.current.isPlaying()) {
      waveAudioRef.current.play();
      return;
    }
    waveAudioRef.current.pause();
  };*/
  return (
    <>
    {/** 
    <p>hello</p>
     <div id='waveform' onClick={handleClick}>
     </div>*/}
     <div className='flex'>
     <WaveForm  index={'1'} audio_name='V-Glitch 10 150BPM.wav'/>
     <p>hello</p>
     </div>
    </>
  );
};
