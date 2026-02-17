'use client';

import { useState, useEffect } from 'react';
import styles from '../layout.module.css';

export default function ProofPage() {
    const [lovableLink, setLovableLink] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [deployLink, setDeployLink] = useState('');

    // Steps Status
    const [scannedSteps, setScannedSteps] = useState<boolean[]>(new Array(8).fill(false));

    // Checklist Status
    const checklistItems = [
        "All form sections save to localStorage",
        "Live preview updates in real-time",
        "Template switching preserves data",
        "Color theme persists after refresh",
        "ATS score calculates correctly",
        "Score updates live on edit",
        "Export buttons work (copy/download)",
        "Empty states handled gracefully",
        "Mobile responsive layout works",
        "No console errors on any page"
    ];
    const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(10).fill(false));

    const [isShipped, setIsShipped] = useState(false);

    useEffect(() => {
        // scan local storage for steps 1-8
        const steps = [];
        for (let i = 1; i <= 8; i++) {
            const artifact = localStorage.getItem(`rb_step_${i}_artifact`);
            steps.push(!!artifact);
        }
        setScannedSteps(steps);

        // Load saved links
        const savedSubmission = localStorage.getItem('rb_final_submission');
        if (savedSubmission) {
            const { lovable, github, deploy } = JSON.parse(savedSubmission);
            setLovableLink(lovable || '');
            setGithubLink(github || '');
            setDeployLink(deploy || '');
        }
    }, []);

    useEffect(() => {
        // Check for Shipped Status
        const allStepsDone = scannedSteps.every(s => s);
        const allChecklistDone = checkedItems.every(c => c);
        const allLinksProvided = lovableLink.length > 0 && githubLink.length > 0 && deployLink.length > 0;

        if (allStepsDone && allChecklistDone && allLinksProvided) {
            setIsShipped(true);
            localStorage.setItem('rb_project_status', 'shipped');
            // Save submission details
            localStorage.setItem('rb_final_submission', JSON.stringify({
                lovable: lovableLink,
                github: githubLink,
                deploy: deployLink
            }));
            // Trigger storage event for layout to catch
            window.dispatchEvent(new Event('storage'));
        } else {
            setIsShipped(false);
            localStorage.removeItem('rb_project_status');
            window.dispatchEvent(new Event('storage'));
        }
    }, [scannedSteps, checkedItems, lovableLink, githubLink, deployLink]);

    const handleCheck = (index: number) => {
        const newChecked = [...checkedItems];
        newChecked[index] = !newChecked[index];
        setCheckedItems(newChecked);
    };

    const handleCopy = () => {
        const text = `
------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${lovableLink}
GitHub Repository: ${githubLink}
Live Deployment: ${deployLink}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------`.trim();
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Ready to Ship?</h1>

            {/* A) Step Completion Overview */}
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--muted-foreground)' }}>Development Steps</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                    {scannedSteps.map((isDone, i) => (
                        <div key={i} style={{
                            padding: '0.75rem',
                            border: `1px solid ${isDone ? 'var(--success-green)' : 'var(--border)'}`,
                            borderRadius: 'var(--radius)',
                            background: isDone ? 'rgba(34, 197, 94, 0.1)' : 'var(--secondary)',
                            color: isDone ? 'var(--success-green)' : 'var(--muted-foreground)',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            {isDone ? '✓' : '○'} Step {i + 1}
                        </div>
                    ))}
                </div>
            </div>

            {/* B) Artifact Collection */}
            <div style={{ background: 'var(--card)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Submission Details</h2>

                    <div>
                        <label className={styles.label} style={{ display: 'block', marginBottom: '0.5rem' }}>Lovable Project Link</label>
                        <input
                            className={styles.input}
                            style={{ width: '100%', padding: '0.75rem', background: 'var(--input)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', color: 'var(--foreground)', marginBottom: '1rem' }}
                            placeholder="https://lovable.dev/..."
                            value={lovableLink}
                            onChange={(e) => setLovableLink(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className={styles.label} style={{ display: 'block', marginBottom: '0.5rem' }}>GitHub Repository Link</label>
                        <input
                            className={styles.input}
                            style={{ width: '100%', padding: '0.75rem', background: 'var(--input)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', color: 'var(--foreground)', marginBottom: '1rem' }}
                            placeholder="https://github.com/..."
                            value={githubLink}
                            onChange={(e) => setGithubLink(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className={styles.label} style={{ display: 'block', marginBottom: '0.5rem' }}>Deployment Link</label>
                        <input
                            className={styles.input}
                            style={{ width: '100%', padding: '0.75rem', background: 'var(--input)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', color: 'var(--foreground)', marginBottom: '1rem' }}
                            placeholder="https://vercel.app/..."
                            value={deployLink}
                            onChange={(e) => setDeployLink(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Checklist */}
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--muted-foreground)' }}>Final Verification Checklist</h3>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                    {checklistItems.map((item, i) => (
                        <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', background: 'var(--secondary)', borderRadius: 'var(--radius)' }}>
                            <input
                                type="checkbox"
                                checked={checkedItems[i]}
                                onChange={() => handleCheck(i)}
                                style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--primary)' }}
                            />
                            <span style={{ fontSize: '0.9rem', color: checkedItems[i] ? 'var(--foreground)' : 'var(--muted-foreground)' }}>{item}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* 4) Completion Confirmation */}
            {isShipped ? (
                <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid var(--success-green)', borderRadius: 'var(--radius)' }}>
                    <h2 style={{ color: 'var(--success-green)', marginBottom: '1rem' }}>Project 3 Shipped Successfully.</h2>
                    <button
                        onClick={handleCopy}
                        style={{
                            background: 'var(--foreground)',
                            color: 'var(--background)',
                            padding: '1rem 2rem',
                            borderRadius: 'var(--radius)',
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Copy Final Submission
                    </button>
                </div>
            ) : (
                <div style={{ textAlign: 'center', color: 'var(--muted-foreground)', fontStyle: 'italic' }}>
                    Complete all steps, fill all links, and check all boxes to ship.
                </div>
            )}
        </div>
    );
}
