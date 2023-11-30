import { atom } from "recoil";
export const filesAtom = atom({
    key: 'filesAtom',
    default: [
        {'name': 'V-PERC 47.wav', 'pass': '/V-PERC 47.wav'},
        {'name': 'V-Glitch 10 150BPM.wav', 'pass': '/V-Glitch 10 150BPM.wav'},
        {'name': 'V-COLOR 04 A.wav', 'pass': '/V-COLOR 04 A.wav'},
        {'name': 'HH1_01.wav', 'pass': '/HH1_01.wav'},
        {'name': 'ABL2_Clap_01_FoleyClap.wav', 'pass': '/ABL2_Clap_01_FoleyClap.wav'},
    ]
})