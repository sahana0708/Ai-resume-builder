'use client';

import { ResumeData } from '@/types/resume';

interface ResumePreviewProps {
    data: ResumeData;
    template: 'classic' | 'modern' | 'minimal';
    themeColor: string;
}

export default function ResumePreview({ data, template, themeColor }: ResumePreviewProps) {

    // Helper to flatten skills for classic view or if needed
    const allSkills = [
        ...(data.skills.technical || []),
        ...(data.skills.soft || []),
        ...(data.skills.tools || [])
    ];

    if (template === 'modern') {
        return (
            <div className="document modern" style={{ fontFamily: 'Inter, sans-serif', color: '#111827', lineHeight: '1.5' }}>
                <header style={{ borderBottom: `2px solid ${themeColor}`, paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                    <h1 style={{ margin: 0, fontSize: '2.25rem', fontWeight: 800, color: themeColor }}>{data.personalInfo.fullName || 'YOUR NAME'}</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.75rem', fontSize: '0.9rem', color: '#4b5563' }}>
                        {data.personalInfo.email && <span>📧 {data.personalInfo.email}</span>}
                        {data.personalInfo.phone && <span>📱 {data.personalInfo.phone}</span>}
                        {data.personalInfo.location && <span>📍 {data.personalInfo.location}</span>}
                        {data.personalInfo.linkedin && <span style={{ color: '#2563eb' }}>🔗 LinkedIn</span>}
                        {data.personalInfo.github && <span style={{ color: '#2563eb' }}>💻 GitHub</span>}
                    </div>
                </header>

                {data.summary && (
                    <section style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', color: '#4b5563', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Professional Summary</h3>
                        <p style={{ margin: 0, color: '#374151' }}>{data.summary}</p>
                    </section>
                )}

                {data.experience.length > 0 && (
                    <section style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', color: '#4b5563', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Experience</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {data.experience.map(exp => (
                                <div key={exp.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{exp.company}</h4>
                                        <span style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: 500 }}>{exp.startDate} – {exp.endDate}</span>
                                    </div>
                                    <div style={{ color: '#2563eb', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{exp.role}</div>
                                    <p style={{ margin: 0, whiteSpace: 'pre-line', fontSize: '0.95rem' }}>{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.projects.length > 0 && (
                    <section style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', color: '#4b5563', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Key Projects</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {data.projects.map(proj => (
                                <div key={proj.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{proj.title}</h4>
                                        {proj.link && <span style={{ fontSize: '0.85rem', color: '#2563eb' }}>{proj.link}</span>}
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                                        {(Array.isArray(proj.technologies) ? proj.technologies : []).map((tech, i) => (
                                            <span key={i} style={{ fontSize: '0.75rem', background: '#f3f4f6', padding: '0 0.5rem', borderRadius: '4px', color: '#4b5563' }}>{tech}</span>
                                        ))}
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.95rem' }}>{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {data.education.length > 0 && (
                        <section>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', color: '#4b5563', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Education</h3>
                            {data.education.map(edu => (
                                <div key={edu.id} style={{ marginBottom: '0.75rem' }}>
                                    <div style={{ fontWeight: 700 }}>{edu.institution}</div>
                                    <div>{edu.degree}</div>
                                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>{edu.startDate} – {edu.endDate}</div>
                                </div>
                            ))}
                        </section>
                    )}

                    {allSkills.length > 0 && (
                        <section>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', color: '#4b5563', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Technical Skills</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {allSkills.map((skill, i) => (
                                    <span key={i} style={{ background: '#eff6ff', color: '#1e40af', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 500 }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        );
    }

    if (template === 'minimal') {
        return (
            <div className="document minimal" style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#000', lineHeight: '1.4' }}>
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: 300, letterSpacing: '-0.02em' }}>{data.personalInfo.fullName || 'YOUR NAME'}</h1>
                    <div style={{ fontSize: '0.9rem', color: '#666', display: 'flex', gap: '1.5rem' }}>
                        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                        {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem' }}>
                        {data.personalInfo.linkedin && <span style={{ marginRight: '1.5rem' }}>{data.personalInfo.linkedin}</span>}
                        {data.personalInfo.github && <span>{data.personalInfo.github}</span>}
                    </div>
                </header>

                {data.summary && (
                    <section style={{ marginBottom: '2rem' }}>
                        <p style={{ margin: 0, fontSize: '1rem', maxWidth: '80ch' }}>{data.summary}</p>
                    </section>
                )}

                {data.experience.length > 0 && (
                    <section style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', color: '#888' }}>Experience</h3>
                        {data.experience.map(exp => (
                            <div key={exp.id} style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <div style={{ fontWeight: 600 }}>{exp.company}</div>
                                    <div style={{ fontSize: '0.9rem', color: '#666' }}>{exp.startDate} – {exp.endDate}</div>
                                </div>
                                <div style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>{exp.role}</div>
                                <p style={{ margin: 0, fontSize: '0.95rem' }}>{exp.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {data.projects.length > 0 && (
                    <section style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', color: '#888' }}>Projects</h3>
                        {data.projects.map(proj => (
                            <div key={proj.id} style={{ marginBottom: '1rem' }}>
                                <div style={{ fontWeight: 600 }}>{proj.title} {proj.link && <span style={{ fontWeight: 400, color: '#666' }}>— {proj.link}</span>}</div>
                                <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>{proj.technologies}</div>
                                <p style={{ margin: 0, fontSize: '0.95rem' }}>{proj.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                    {data.education.length > 0 && (
                        <section>
                            <h3 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', color: '#888' }}>Education</h3>
                            {data.education.map(edu => (
                                <div key={edu.id} style={{ marginBottom: '0.5rem' }}>
                                    <div style={{ fontWeight: 600 }}>{edu.institution}</div>
                                    <div style={{ fontSize: '0.9rem' }}>{edu.degree}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#666' }}>{edu.startDate} – {edu.endDate}</div>
                                </div>
                            ))}
                        </section>
                    )}

                    {allSkills.length > 0 && (
                        <section>
                            <h3 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', color: '#888' }}>Skills</h3>
                            <p style={{ margin: 0, fontSize: '0.95rem' }}>{allSkills.join(' • ')}</p>
                        </section>
                    )}
                </div>
            </div>
        );
    }

    // Classic (Default)
    return (
        <div className="document classic" style={{ fontFamily: 'Times New Roman, serif', color: '#000', lineHeight: '1.2' }}>
            <header style={{ borderBottom: '1px solid #000', paddingBottom: '10px', marginBottom: '15px' }}>
                <h1 style={{ margin: 0, textTransform: 'uppercase', fontSize: '18pt' }}>{data.personalInfo.fullName || 'YOUR NAME'}</h1>
                <div style={{ fontSize: '10pt', marginTop: '5px' }}>
                    {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}
                </div>
                <div style={{ fontSize: '10pt', marginTop: '5px' }}>
                    {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                    {data.personalInfo.linkedin && data.personalInfo.github && <span> | </span>}
                    {data.personalInfo.github && <span>{data.personalInfo.github}</span>}
                </div>
            </header>

            {data.summary && (
                <section style={{ marginBottom: '15px' }}>
                    <h3 style={{ borderBottom: '1px solid #000', fontSize: '11pt', textTransform: 'uppercase', margin: '0 0 5px 0' }}>Professional Summary</h3>
                    <p style={{ margin: 0, fontSize: '10pt' }}>{data.summary}</p>
                </section>
            )}

            {data.experience.length > 0 && (
                <section style={{ marginBottom: '15px' }}>
                    <h3 style={{ borderBottom: '1px solid #000', fontSize: '11pt', textTransform: 'uppercase', margin: '0 0 5px 0' }}>Experience</h3>
                    {data.experience.map(exp => (
                        <div key={exp.id} style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '10pt' }}>
                                <span>{exp.company}</span>
                                <span>{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <div style={{ fontStyle: 'italic', fontSize: '10pt' }}>{exp.role}</div>
                            <p style={{ margin: 0, fontSize: '10pt' }}>{exp.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {data.projects.length > 0 && (
                <section style={{ marginBottom: '15px' }}>
                    <h3 style={{ borderBottom: '1px solid #000', fontSize: '11pt', textTransform: 'uppercase', margin: '0 0 5px 0' }}>Projects</h3>
                    {data.projects.map(proj => (
                        <div key={proj.id} style={{ marginBottom: '10px' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '10pt' }}>{proj.title} <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>— {proj.technologies}</span></div>
                            <p style={{ margin: 0, fontSize: '10pt' }}>{proj.description}</p>
                            {proj.link && <div style={{ fontSize: '9pt', color: '#666' }}>{proj.link}</div>}
                        </div>
                    ))}
                </section>
            )}

            {data.education.length > 0 && (
                <section style={{ marginBottom: '15px' }}>
                    <h3 style={{ borderBottom: '1px solid #000', fontSize: '11pt', textTransform: 'uppercase', margin: '0 0 5px 0' }}>Education</h3>
                    {data.education.map(edu => (
                        <div key={edu.id} style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '10pt' }}>
                                <span>{edu.institution}</span>
                                <span>{edu.startDate} - {edu.endDate}</span>
                            </div>
                            <div style={{ fontSize: '10pt' }}>{edu.degree} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}</div>
                        </div>
                    ))}
                </section>
            )}

            {allSkills.length > 0 && (
                <section style={{ marginBottom: '15px' }}>
                    <h3 style={{ borderBottom: '1px solid #000', fontSize: '11pt', textTransform: 'uppercase', margin: '0 0 5px 0' }}>Skills</h3>
                    <p style={{ margin: 0, fontSize: '10pt' }}>{allSkills.join(', ')}</p>
                </section>
            )}
        </div>
    );
}
