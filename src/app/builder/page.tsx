'use client';

import { useResume } from '@/context/ResumeContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './builder.module.css';
import ResumeEditor from '@/components/builder/ResumeEditor';
import ResumePreview from '@/components/builder/ResumePreview';
import PreviewToolbar from '@/components/builder/PreviewToolbar';

export default function BuilderPage() {
    const { resumeData, loadSampleData, selectedTemplate, selectedTheme } = useResume();
    const pathname = usePathname();

    return (
        <div className={styles.container}>
            {/* Top Nav */}
            <nav className={styles.nav}>
                <div className={styles.navLogo}>AI Resume Builder</div>

                {/* Template Selector Removed - moved to PreviewToolbar */}

                <div className={styles.navLinks}>
                    <Link href="/builder" className={pathname === '/builder' ? styles.navLinkActive : styles.navLink}>Builder</Link>
                    <Link href="/preview" className={pathname === '/preview' ? styles.navLinkActive : styles.navLink}>Preview</Link>
                    <Link href="/proof" className={pathname === '/proof' ? styles.navLinkActive : styles.navLink}>Proof</Link>
                </div>
                <div>
                    <button onClick={loadSampleData} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', border: '1px solid var(--border)', borderRadius: '4px', background: 'transparent', color: 'var(--foreground)' }}>
                        Load Sample Data
                    </button>
                </div>
            </nav>

            <main className={styles.main}>
                {/* Left: Editor */}
                <ResumeEditor />

                {/* Right: Live Preview */}
                <div className={styles.previewPanel}>
                    <PreviewToolbar />
                    <div className={styles.document} id="resume-preview">
                        <ResumePreview data={resumeData} template={selectedTemplate} themeColor={selectedTheme} />
                    </div>
                </div>
            </main>
        </div>
    );
}
