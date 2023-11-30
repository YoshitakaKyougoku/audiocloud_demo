'use client'
import { useEffect, useRef } from 'react';
import  WaveSurfer from "wavesurfer.js";

export default function WaveForm(props: { selected: boolean; audio_name: string }) { 
  // WaveSurfer 
  const waveAudioRef = useRef({} as WaveSurfer);
  const audioContainerRef = useRef({} as HTMLElement);
  const escapedSelector = props["audio_name"].replace(/([ !"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~])/g, "_") + props.selected;
  useEffect(() => {
    const audioElement = document.querySelector(
        `#waveform_${escapedSelector}`
    ) as HTMLElement;
    audioContainerRef.current = audioElement;
    const waveform = WaveSurfer.create({
      container: audioElement,
      waveColor: "#0569ff",
      progressColor: "#0353cc",
      width: 400,
      height:80
      
    });
    const pathToFile = '/' + props['audio_name'];
    //console.log(pathToFile)
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
  };

  return (
    <>
    
     <div className='' id={`waveform_${escapedSelector}`} onClick={handleClick}>
        
     </div>
    </>
  );
};
