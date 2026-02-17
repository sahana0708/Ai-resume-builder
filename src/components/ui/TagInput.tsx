import React, { useState } from 'react';

interface TagInputProps {
    placeholder?: string;
    tags: string[];
    onAdd: (tag: string) => void;
    onRemove: (tag: string) => void;
}

export default function TagInput({ placeholder, tags, onAdd, onRemove }: TagInputProps) {
    const [input, setInput] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const trimmed = input.trim();
            if (trimmed && !tags.includes(trimmed)) {
                onAdd(trimmed);
                setInput('');
            }
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: tags.length > 0 ? '0.5rem' : '0' }}>
                {tags.map(tag => (
                    <span key={tag} style={{
                        background: 'var(--secondary)',
                        color: 'var(--foreground)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        {tag}
                        <button
                            onClick={() => onRemove(tag)}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                color: 'var(--muted-foreground)',
                                cursor: 'pointer',
                                padding: 0,
                                fontSize: '1.1rem',
                                lineHeight: 0.8
                            }}
                        >×</button>
                    </span>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder || "Type and press Enter..."}
                style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'var(--input)',
                    border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                    borderRadius: 'var(--radius)',
                }}
            />
        </div>
    );
}
