'use client'

import { lusitana } from '@/ui/fonts';
import style from '@/ui/wave/footnav.module.css'
import { StopIcon, PlayIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import FileUploader from "./upload";
import FileDownloader from './downloard';
import { useRecoilValue } from "recoil";
import { selectedFileState } from '@/context/selectedFileState';

import WaveForm from './waveform';

const FootNav = () => {
  const [samples, setSamples] = useState<File[]>([])
  const selectedFile = useRecoilValue(selectedFileState)
  

  const play = () => {
    console.log('click')
  }
  console.log(samples)
  return (
    <div className={`${lusitana.className} ${style.container}`}>
          <button onClick={play}>
          <PlayIcon className={style.icon} />
          </button>
          <button >
          <StopIcon className={style.icon}/> 
          </button>
          <button >
          <ArrowPathRoundedSquareIcon className={style.icon}/>
          </button>
        
        <FileDownloader />
          <div className={style.waveform}>
            {/** <p>{imageNameSelect(selectedFile)}</p>*/}
              <WaveForm selected={true}audio_name={selectedFile}/>
          </div>
          <FileUploader samples={samples} setSamples={setSamples} />
      </div>
    
  );
};
export default FootNav;
