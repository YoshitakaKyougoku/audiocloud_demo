import WaveCanvas from "@/ui/wave/wavecanvas";
import Image from "next/image"
export default function Page() {
    return(
        <>
            <Image src={'/waveform-sample1.png'} width={200} height={200} alt="image"/>
            <WaveCanvas audio_name={'/V-PERC 47.wav'}/>
        </>
    )
}