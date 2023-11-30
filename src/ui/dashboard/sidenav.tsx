'use client'

import Link from 'next/link';
import { lusitana } from '@/ui/fonts';
import clsx from 'clsx';
import styles from '@/ui/dashboard/sidenav.module.css'
import { HomeIcon, UsersIcon, QueueListIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { Dashboard } from '@mui/icons-material';
export default function SideNav() {
  const pathname = usePathname();
  const links = [
    {name: 'dashboard', href: '/dashboard', icon: QueueListIcon},
    {name: 'member', href: '/dashboard/member', icon: UsersIcon},
    {name: 'wave', href: '/dashboard/wave', icon: MusicalNoteIcon},
  ]
  return (
    <div className={`${lusitana.className} ${styles.layout} h-full`}>
      <div className={styles.links}>
        <Link
          href="/"
        >
          <div>
            <HomeIcon className={styles.homelink}
            />
          </div>
        </Link>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
        <Link 
        key = {link.name}
          href= {link.href}
        >
          <div>
            <LinkIcon className={clsx(
              styles.icon,
              {
                [styles.linked]: pathname === link.href,
              }
            )}/>
          </div>
        </Link>
          
        )
      })}
        
      </div>
    </div>
    
  );
}
