'use client';

import { useResume } from '@/context/ResumeContext';
import styles from './ScoreMeter.module.css';

export default function ScoreMeter() {
    const { validation } = useResume();
    const { score, suggestions } = validation;

    // Determine color based on score
    let color = '#ef4444'; // Red
    let label = 'Needs Work';
    if (score > 40) {
        color = '#f59e0b'; // Amber
        label = 'Getting There';
    }
    if (score > 70) {
        color = '#10b981'; // Green
        label = 'Strong Resume';
    }

    // Circular Progress Math
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                    {/* Background Circle */}
                    <svg width="100" height="100" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="8"
                        />
                        {/* Progress Circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            fill="none"
                            stroke={color}
                            strokeWidth="8"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"
                            style={{ transition: 'stroke-dashoffset 0.5s ease-out, stroke 0.3s' }}
                        />
                    </svg>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#374151', lineHeight: 1 }}>{score}</span>
                        <span style={{ fontSize: '0.7rem', color: '#6b7280', textTransform: 'uppercase' }}>/ 100</span>
                    </div>
                </div>
                <div style={{ marginTop: '0.5rem', fontWeight: 600, color: color, fontSize: '0.9rem' }}>
                    {label}
                </div>
            </div>

            {suggestions.length > 0 && (
                <div className={styles.suggestions}>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#4b5563', textTransform: 'uppercase' }}>Improvements</h4>
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className={styles.suggestion}>
                            <span className={styles.icon}>⚡</span>
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
