import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.headline}>
          Build a Resume <br />
          <span className={styles.gradientText}>That Gets Read.</span>
        </h1>
        <p className={styles.subheadline}>
          Create a professional, ATS-friendly resume in minutes with our AI-powered builder.
          Clean, effective, and designed for top-tier companies.
        </p>
        <div className={styles.ctaGroup}>
          <Link href="/builder" className={styles.primaryButton}>
            Start Building
          </Link>
          <Link href="/preview" className={styles.secondaryButton}>
            View Examples
          </Link>
        </div>
      </div>
    </main>
  );
}
