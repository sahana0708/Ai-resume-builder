'use client';

import { useResume } from '@/context/ResumeContext';
import styles from '../builder/builder.module.css';
import Link from 'next/link';
import ResumePreview from '@/components/builder/ResumePreview';
import ScoreMeter from '@/components/builder/ScoreMeter';
import { useState, useEffect } from 'react';

export default function PreviewPage() {
    const { resumeData, selectedTemplate, selectedTheme } = useResume();
    const [showWarning, setShowWarning] = useState(false);
    const [missingFields, setMissingFields] = useState<string[]>([]);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        const missing = [];
        if (!resumeData.personalInfo.fullName) missing.push("Full Name");
        if ((!resumeData.experience || resumeData.experience.length === 0) && (!resumeData.projects || resumeData.projects.length === 0)) {
            missing.push("Experience or Projects");
        }

        if (missing.length > 0) {
            setMissingFields(missing);
            setShowWarning(true);
        } else {
            setShowWarning(false);
        }
    }, [resumeData]);

    const handleCopyText = () => {
        const { personalInfo, summary, experience, projects, education, skills } = resumeData;

        const allSkills = [
            ...(skills.technical || []),
            ...(skills.soft || []),
            ...(skills.tools || [])
        ];

        const lines = [
            personalInfo.fullName.toUpperCase(),
            [personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(" | "),
            [personalInfo.linkedin, personalInfo.github].filter(Boolean).join(" | "),
            "",
            summary ? `SUMMARY\n${summary}\n` : "",
            experience.length > 0 ? "EXPERIENCE" : "",
            ...experience.map(e => `${e.company} - ${e.role}\n${e.startDate} - ${e.endDate}\n${e.description}\n`),
            "",
            projects.length > 0 ? "PROJECTS" : "",
            ...projects.map(p => `${p.title} (${(Array.isArray(p.technologies) ? p.technologies : []).join(', ')})\n${p.description}\n${p.link ? `Link: ${p.link}` : ""}\n`),
            "",
            education.length > 0 ? "EDUCATION" : "",
            ...education.map(e => `${e.institution}\n${e.degree}\n${e.startDate} - ${e.endDate}\n`),
            "",
            allSkills.length > 0 ? `SKILLS\n${allSkills.join(", ")}` : ""
        ].filter(line => line !== "");

        const plainText = lines.join("\n").replace(/\n\n+/g, "\n\n").trim();

        navigator.clipboard.writeText(plainText).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    return (
        <div style={{ background: '#525659', minHeight: '100vh', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Validation Warning */}
            {showWarning && (
                <div className="no-print" style={{
                    background: '#fff3cd', color: '#856404',
                    padding: '1rem', borderRadius: '4px', marginBottom: '1rem',
                    maxWidth: '210mm', width: '100%', border: '1px solid #ffeeba',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <div>
                        <strong>Wait! Your resume might be incomplete.</strong>
                        <div style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>Missing: {missingFields.join(", ")}</div>
                    </div>
                    <button onClick={() => setShowWarning(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#856404' }}>&times;</button>
                </div>
            )}

            {/* Nav / Controls */}
            <nav className="no-print" style={{ width: '100%', maxWidth: '210mm', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                <Link href="/builder" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>← Back to Builder</Link>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={handleCopyText}
                        style={{
                            background: 'transparent', color: 'white', border: '1px solid white',
                            padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                        }}
                    >
                        {copySuccess ? "Copied!" : "Copy as Text"}
                    </button>

                    <button
                        onClick={() => window.print()}
                        style={{
                            background: 'white', color: 'black', border: 'none',
                            padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                        }}
                    >
                        Print / Save PDF
                    </button>
                </div>
            </nav>

            {/* Resume Document */}
            <div className={styles.document} style={{ transform: 'scale(1)', transformOrigin: 'top center' }}>
                <ResumePreview data={resumeData} template={selectedTemplate} themeColor={selectedTheme ? selectedTheme : '#38bdf8'} />
            </div>

            {/* Floating ATS Score */}
            <div className={`${styles.floatingScore} no-print`}>
                <ScoreMeter />
            </div>

        </div>
    );
}
