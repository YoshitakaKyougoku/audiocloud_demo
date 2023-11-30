import { lusitana } from '@/ui/fonts';
import styles from '@/ui/home.module.css'
import Link from 'next/link';

export default function Home() {
return(
  <>
    <p
      className={`${lusitana.className} ${styles.title} `}
    ><strong>Welcome to AUDIO CLOUD</strong> {' '}
    <Link href="/dashboard" className={styles.link}>
      Go to Dashboard
    </Link>
  </p>
  </>
)
}