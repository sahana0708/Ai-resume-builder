'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './layout.module.css';

const STEPS = [
    { id: '01-problem', label: 'Problem Statement' },
    { id: '02-market', label: 'Market Research' },
    { id: '03-architecture', label: 'Architecture' },
    { id: '04-hld', label: 'High Level Design' },
    { id: '05-lld', label: 'Low Level Design' },
    { id: '06-build', label: 'Build Phase' },
    { id: '07-test', label: 'Testing' },
    { id: '08-ship', label: 'Shipping' },
    { id: 'proof', label: 'Proof of Work' }
];

export default function PremiumLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const currentSegment = pathname.split('/').pop() || '';
    const currentStepIndex = STEPS.findIndex(step => step.id === currentSegment);
    const currentStep = STEPS[currentStepIndex];

    const isProof = currentSegment === 'proof';
    const stepNumber = isProof ? 9 : currentStepIndex + 1;
    const artifactKey = `rb_step_${stepNumber}_artifact`;

    const [artifact, setArtifact] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [isShipped, setIsShipped] = useState(false);

    // Load artifact status on step change
    useEffect(() => {
        // Check global shipped status
        const checkShipped = () => {
            const status = localStorage.getItem('rb_project_status');
            setIsShipped(status === 'shipped');
        };

        checkShipped();
        // Listen for storage events (triggered by ProofPage)
        window.addEventListener('storage', checkShipped);

        if (isProof) return () => window.removeEventListener('storage', checkShipped);

        setLoading(true);
        const saved = localStorage.getItem(artifactKey);
        setArtifact(saved);
        setLoading(false);

        return () => window.removeEventListener('storage', checkShipped);
    }, [stepNumber, artifactKey, isProof]);

    const handleSimulateUpload = () => {
        const mockArtifact = `Artifact for step ${stepNumber} generated at ${new Date().toISOString()}`;
        localStorage.setItem(artifactKey, mockArtifact);
        setArtifact(mockArtifact);
    };

    const handleNext = () => {
        const nextStep = STEPS[currentStepIndex + 1];
        if (nextStep) {
            router.push(`/rb/${nextStep.id}`);
        }
    };

    const handlePrev = () => {
        const prevStep = STEPS[currentStepIndex - 1];
        if (prevStep) {
            router.push(`/rb/${prevStep.id}`);
        }
    };

    return (
        <div className={styles.container}>
            {/* Top Bar */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>AI Resume Builder</div>
                <div className={styles.headerCenter}>
                    Project 3 — {isProof ? 'Final Submission' : `Step ${stepNumber} of 8`}
                </div>
                <div className={styles.headerRight}>
                    <div
                        className={styles.statusBadge}
                        style={{
                            background: isShipped ? 'var(--success-green)' : (artifact ? 'var(--success-green)' : 'var(--secondary)'),
                            color: isShipped || artifact ? '#fff' : 'var(--secondary-foreground)'
                        }}
                    >
                        {isShipped ? 'Shipped' : (isProof ? 'In Progress' : (artifact ? 'Completed' : 'In Progress'))}
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className={styles.main}>
                {isProof ? (
                    <div className={styles.proofContainer}>{children}</div>
                ) : (
                    <>
                        <div className={styles.workspace}>
                            {children}
                        </div>

                        {/* Build Panel (30%) */}
                        <aside className={styles.buildPanel}>
                            <div className={styles.panelTitle}>Build Assistant</div>

                            <textarea
                                className={styles.textarea}
                                placeholder="Paste this into Lovable..."
                                readOnly
                                value={`Context for Step ${stepNumber}: ${currentStep?.label || ''}\n\nTask: Generate functionality matching the requirements for this step.`}
                            />

                            <div className={styles.buttonGroup}>
                                <button
                                    className={styles.secondaryButton}
                                    onClick={() => navigator.clipboard.writeText(`Context for Step ${stepNumber}: ${currentStep?.label || ''}`)}
                                >
                                    Copy
                                </button>
                                <button
                                    className={styles.primaryButton}
                                    onClick={() => window.open('https://lovable.dev', '_blank')}
                                >
                                    Build in Lovable ↗
                                </button>
                            </div>

                            <div style={{ marginTop: 'auto' }}>
                                <div className={styles.panelTitle} style={{ marginBottom: '0.5rem' }}>Status</div>

                                {artifact ? (
                                    <div style={{ padding: '1rem', background: 'var(--success-green)', opacity: 0.1, borderRadius: 'var(--radius)', color: 'var(--foreground)', textAlign: 'center' }}>
                                        Artifact Uploaded
                                    </div>
                                ) : (
                                    <div
                                        onClick={handleSimulateUpload}
                                        style={{
                                            padding: '1rem',
                                            background: 'var(--input)',
                                            borderRadius: 'var(--radius)',
                                            border: '1px dashed var(--muted-foreground)',
                                            textAlign: 'center',
                                            fontSize: '0.8rem',
                                            color: 'var(--muted-foreground)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Drag & Drop Screenshot or Click to Upload (Simulate)
                                    </div>
                                )}
                            </div>
                        </aside>
                    </>
                )}
            </main>

            {/* Footer */}
            <footer className={styles.footer}>
                <div style={{ color: 'var(--muted-foreground)', fontSize: '0.8rem' }}>
                    KodNest Premium Build System
                </div>
                {!isProof && (
                    <div className={styles.buttonGroup}>
                        <button
                            className={styles.secondaryButton}
                            onClick={handlePrev}
                            disabled={currentStepIndex === 0}
                            style={{ opacity: currentStepIndex === 0 ? 0.5 : 1 }}
                        >
                            Previous
                        </button>
                        <button
                            className={styles.primaryButton}
                            onClick={handleNext}
                            disabled={!artifact}
                            style={{
                                opacity: !artifact ? 0.5 : 1,
                                cursor: !artifact ? 'not-allowed' : 'pointer',
                                background: !artifact ? 'var(--secondary)' : 'var(--foreground)',
                                color: !artifact ? 'var(--muted-foreground)' : 'var(--background)'
                            }}
                        >
                            Next Step
                        </button>
                    </div>
                )}
            </footer>
        </div>
    );
}
