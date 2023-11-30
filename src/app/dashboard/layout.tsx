'use client'

import SideNav from "@/ui/dashboard/sidenav";
import Header from "@/ui/dashboard/header";
import styles from '@/ui/dashboard/dashboardLayout.module.css'
import { RecoilRoot } from "recoil";
import WaveForm from "@/ui/wave/waveform";

export default function Layout({ children }: { children: React.ReactNode}){
    return (
        <>
        <div className={styles.layout}>
            <div className={styles.header}>
                
            </div>
                <div className={styles.sidenav}>
                    <SideNav />
                    
                </div>
                
                <div className={styles.children}>
                    <RecoilRoot>
                    {children}
                    </RecoilRoot>
                </div>
                
            </div>
        
        </>
        
    );
}