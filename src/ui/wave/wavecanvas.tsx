

import { useEffect } from 'react';

export default function WaveCanvas(props: { audio_name: string }) { 
  console.log(props["audio_name"])
  const wavePass = '/' + props.audio_name
  useEffect(() => {
    const request = new XMLHttpRequest();
    request.open("GET", wavePass, true);
    request.responseType = "arraybuffer";

    if (request) {
      request.onload = (e) => {
        const audioData = request.response;
        const audioContext = new AudioContext();
        
        audioContext.decodeAudioData(audioData).then((audioBuffer) => {
          const pcmData = audioBuffer.getChannelData(0);

          const canvas = document.getElementById("waveform") as HTMLCanvasElement;
          const canvasContext = canvas.getContext("2d")!;
          canvasContext.strokeStyle = 'white'
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
    return () => {

    };
  }, []); 

 
  
  
  
    
  
 
  return (
    <>
     <canvas id="waveform" width="400" height="85" ></canvas>
    </>
  );
};
