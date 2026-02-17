'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProofPage() {
    const [lovableLink, setLovableLink] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [deployLink, setDeployLink] = useState('');

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        background: '#27272a',
        border: '1px solid #3f3f46',
        borderRadius: '0.5rem',
        color: '#fafafa',
        marginBottom: '1rem',
        fontSize: '0.9rem'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.5rem',
        color: '#a1a1aa',
        fontSize: '0.85rem',
        fontWeight: '500'
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', color: '#fafafa', minHeight: '100vh', background: '#09090b' }}>
            <nav style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <Link href="/" style={{ color: '#a1a1aa' }}>Home</Link>
                <span style={{ color: '#3f3f46' }}>/</span>
                <Link href="/builder" style={{ color: '#a1a1aa' }}>Builder</Link>
                <span style={{ color: '#3f3f46' }}>/</span>
                <span style={{ color: '#fafafa' }}>Proof</span>
            </nav>

            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Ready to Ship?</h1>

            <div style={{ background: '#18181b', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #27272a' }}>

                <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Submission Details</h2>

                    <div>
                        <label style={labelStyle}>Lovable Project Link</label>
                        <input
                            style={inputStyle}
                            placeholder="https://lovable.dev/..."
                            value={lovableLink}
                            onChange={(e) => setLovableLink(e.target.value)}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>GitHub Repository Link</label>
                        <input
                            style={inputStyle}
                            placeholder="https://github.com/..."
                            value={githubLink}
                            onChange={(e) => setGithubLink(e.target.value)}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Deployment Link</label>
                        <input
                            style={inputStyle}
                            placeholder="https://vercel.app/..."
                            value={deployLink}
                            onChange={(e) => setDeployLink(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    style={{
                        background: '#fafafa',
                        color: '#18181b',
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    Copy Final Submission
                </button>
            </div>
        </div>
    );
}
