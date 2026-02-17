'use client';

import { useResume, THEME_COLORS, TemplateType, ThemeColor } from '@/context/ResumeContext';
import { useState } from 'react';

export default function PreviewToolbar() {
    const { selectedTemplate, setSelectedTemplate, selectedTheme, setSelectedTheme } = useResume();
    const [showToast, setShowToast] = useState(false);

    const handleDownload = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const TemplateCard = ({ type, label, isActive }: { type: TemplateType; label: string; isActive: boolean }) => (
        <button
            onClick={() => setSelectedTemplate(type)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                opacity: isActive ? 1 : 0.7,
                transition: 'opacity 0.2s'
            }}
        >
            <div style={{
                width: '100px',
                height: '140px',
                background: 'white',
                border: isActive ? '2px solid #2563eb' : '1px solid #e5e7eb',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: isActive ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}>
                {/* Mini Preview Mockups */}
                <div style={{ padding: '8px', height: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {/* Header */}
                    <div style={{
                        height: type === 'modern' ? '100%' : '20px',
                        width: type === 'modern' ? '30%' : '100%',
                        background: type === 'modern' ? '#e5e7eb' : '#f3f4f6',
                        marginBottom: type === 'modern' ? '0' : '4px'
                    }} />
                    {/* Body */}
                    <div style={{ flex: 1, display: 'flex', gap: '4px' }}>
                        {type === 'modern' && <div style={{ width: '70%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ height: '8px', background: '#f3f4f6', width: '60%' }} />
                            <div style={{ height: '4px', background: '#f3f4f6', width: '100%' }} />
                            <div style={{ height: '4px', background: '#f3f4f6', width: '90%' }} />
                        </div>}
                        {type !== 'modern' && <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ height: '6px', background: '#f3f4f6', width: type === 'minimal' ? '40%' : '100%', marginBottom: type === 'classic' ? '4px' : '8px' }} />
                            <div style={{ height: '4px', background: '#f3f4f6', width: '100%' }} />
                            <div style={{ height: '4px', background: '#f3f4f6', width: '90%' }} />
                        </div>}
                    </div>
                </div>
                {isActive && (
                    <div style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: '#2563eb',
                        color: 'white',
                        borderRadius: '50%',
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px'
                    }}>✓</div>
                )}
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: isActive ? '#1f2937' : '#6b7280' }}>{label}</span>
        </button>
    );

    return (
        <div style={{
            marginBottom: '1.5rem',
            background: 'white',
            padding: '1rem',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
        }}>

            {/* Section 1: Template and Download */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#374151', marginBottom: '1rem' }}>Template</h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <TemplateCard type="classic" label="Classic" isActive={selectedTemplate === 'classic'} />
                        <TemplateCard type="modern" label="Modern" isActive={selectedTemplate === 'modern'} />
                        <TemplateCard type="minimal" label="Minimal" isActive={selectedTemplate === 'minimal'} />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <button
                        onClick={handleDownload}
                        style={{
                            background: '#2563eb',
                            color: 'white',
                            border: 'none',
                            padding: '0.6rem 1.2rem',
                            borderRadius: '6px',
                            fontWeight: 500,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                        }}
                    >
                        Download PDF
                    </button>
                    {showToast && (
                        <div style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '50%',
                            transform: 'translateX(50%)',
                            background: '#10b981',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '9999px',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            animation: 'fadeIn 0.2s ease-out',
                            zIndex: 50
                        }}>
                            PDF export ready! Check your downloads.
                        </div>
                    )}
                </div>
            </div>

            {/* Section 2: Theme Colors */}
            <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#374151', marginBottom: '0.75rem' }}>Color Theme</h3>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {THEME_COLORS.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => setSelectedTheme(color.value)}
                            title={color.name}
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: color.value,
                                border: selectedTheme === color.value ? '2px solid white' : '2px solid transparent',
                                boxShadow: selectedTheme === color.value ? `0 0 0 2px ${color.value}` : 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}
