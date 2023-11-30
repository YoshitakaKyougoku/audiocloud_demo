'use server';

import { lusitana } from '@/ui/fonts';
import Search from "@/ui/search";
import styles from '@/ui/wave/table.module.css';
import FootNav from './footnav';
import WaveList from './wavelist';

type File = {
  name: string;
  pass: string;
};
export default async function WaveTable({
  query,
  waveFiles
}: {
  query: string;
  waveFiles: File[]
}){
  /** 
   const files = [
     {'name': 'V-PERC 47.wav', 'pass': '/V-PERC 47.wav'},
     {'name': 'V-Glitch 10 150BPM.wav', 'pass': '/V-Glitch 10 150BPM.wav'},
     {'name': 'V-COLOR 04 A.wav', 'pass': '/V-COLOR 04 A.wav'},
     {'name': 'HH1_01.wav', 'pass': '/HH1_01.wav'},
     {'name': 'ABL2_Clap_01_FoleyClap.wav', 'pass': '/ABL2_Clap_01_FoleyClap.wav'},
     /**{'name': 'VOLTA_rim_03.wav', 'pass': '/VOLTA_rim_03.wav'},
      {'name': 'PMSH3_Atmosphere_Loop_140_D#_01.wav', 'pass': '/PMSH3_Atmosphere_Loop_140_D#_01.wav'},
      {'name': 'PMSH3_Atmosphere_D#_01.wav', 'pass': '/PMSH3_Atmosphere_D#_01.wav'},
      {'name': 'VOLTA_color_A#_02.wav', 'pass': '/VOLTA_color_A#_02.wav'},
      {'name': 'V-BASS 07 F#.wav', 'pass': '/V-BASS 07 F#.wav'},*/
    //]
    
   const files = waveFiles
   //files.push({'name': 'VOLTA_rim_03.wav', 'pass': '/VOLTA_rim_03.wav'})
  
  const searchFiles = async (query:string) => {
    if (query){
      const filteredFiles = files.filter(file => file.name.includes(query));
      return filteredFiles
    }else {
      const filteredFiles = files
      return filteredFiles
  }
  }
  return(
    <>
        <div >
          <Search placeholder="Search wave files..." />
        </div>
        <div className={`${lusitana.className} ${styles.tablecol}`}>
          <p>waveform</p>
          <p>description</p>
          <p>memo</p>
          
        </div>

        <div className={`${styles.container} `}>
        
        { (await searchFiles(query)).map((file) => {
            return (
              <>
            <WaveList key={file.name} name={file.name} pass={file.pass}/>
              </>
            )
        })}
        
        </div>
        <FootNav />
    </>
)
}