'use client'

import styles from '@/ui/wave/wavelist.module.css'
import { useRecoilState } from 'recoil'
import { selectedFileState } from "@/context/selectedFileState"
import WaveForm from "./waveform"
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image'

interface WaveListProps {
    name: string;
    pass: string;
    //handleWaveListClickState: any
  }
  
  const WaveList: React.FC<WaveListProps> = props => {
    const [selectedFile, setSelectedFile] = useRecoilState(selectedFileState);
    
    const handleClick = () => {
        setSelectedFile(props.name)
    }
    return (
        <>
        <button
            key={props.name}
            className={`${selectedFile === props.name ? styles.selected : styles.table}`}
            onClick= {handleClick}
        >{/** 
            <Image src={props.pass} width={300} height={0} className="m-4" alt={props.name} />
            */}
             <WaveForm selected={false} audio_name={props.name}/>
             {/** 
             <WaveCanvas audio_name={props.name} />*/}
            <div className={styles.box}>

            <div className={styles.key}>
                <p className={styles.name}>{props.name}</p>
                <div className='flex'>

                <div className={styles.tags}>
                    <div className={styles.tag}>kick</div>
                    <div className={styles.tag}>snare</div>
                </div>
                    <div className='flex align-center'>
                        <Image src='/image/kkrn_icon_user_1.png' alt='user' height={30} width={30}/>
                        <p>YoshitakaKyougoku</p>
                    </div>
                </div>
            </div>
            <div className={styles.memo}>
                <p>ファイルの説明ファイルの説明ファイルの説明ファイルの説明ファイルの説明ファイルの説明ファイルの説明ファイルの説明ファイルの説明</p>
            </div>
            </div>
        </button>
            
        
        </>
        
    );
  };
  
  export default WaveList;