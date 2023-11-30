
import { filesAtom } from "@/context/filesAtom";
import Search from "@/ui/search";
import WaveTable from "@/ui/wave/table";
import WaveForm from "@/ui/wave/waveform";
import Image from 'next/image';
import { useRecoilValue } from "recoil";
export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      file?: string;
    };
  }) {
  
    const query = searchParams?.query || '';
    const file = searchParams?.file || '';
    const waveFiles = [
      {'name': 'V-PERC 47.wav', 'pass': '/V-PERC 47.wav'},
      {'name': 'V-Glitch 10 150BPM.wav', 'pass': '/V-Glitch 10 150BPM.wav'},
      {'name': 'V-COLOR 04 A.wav', 'pass': '/V-COLOR 04 A.wav'},
      {'name': 'HH1_01.wav', 'pass': '/HH1_01.wav'},
      {'name': 'ABL2_Clap_01_FoleyClap.wav', 'pass': '/ABL2_Clap_01_FoleyClap.wav'},
    ]
    if (file){
      waveFiles.push({'name': file, 'pass': file})
    }
    return(
        <div className="">
            <WaveTable query={query} waveFiles={waveFiles}/>
            
        </div>
        
    )
}