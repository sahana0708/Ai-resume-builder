'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ResumeData, initialResumeState } from '../types/resume';

export type TemplateType = 'classic' | 'modern' | 'minimal';
export type ThemeColor = '#38bdf8' | '#3b82f6' | '#8b5cf6' | '#ec4899' | '#10b981'; // Default tailwind colors mapped to names later if needed, or use hex. 
// Actually, the prompt specified HSL values. Let's use those.
// Teal: hsl(168, 60%, 40%)
// Navy: hsl(220, 60%, 35%)
// Burgundy: hsl(345, 60%, 35%)
// Forest: hsl(150, 50%, 30%)
// Charcoal: hsl(0, 0%, 25%)

export const THEME_COLORS = [
    { name: 'Teal', value: 'hsl(168, 60%, 40%)' },
    { name: 'Navy', value: 'hsl(220, 60%, 35%)' },
    { name: 'Burgundy', value: 'hsl(345, 60%, 35%)' },
    { name: 'Forest', value: 'hsl(150, 50%, 30%)' },
    { name: 'Charcoal', value: 'hsl(0, 0%, 25%)' },
];

export interface ValidationResult {
    score: number;
    suggestions: string[];
    improvements: string[]; // Top 3 specific improvements
}

interface ResumeContextType {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
    selectedTemplate: TemplateType;
    setSelectedTemplate: (template: TemplateType) => void;
    selectedTheme: string;
    setSelectedTheme: (theme: string) => void;
    updateSection: (section: keyof ResumeData, data: any) => void;
    loadSampleData: () => void;
    validation: ValidationResult;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
    const [resumeData, setResumeData] = useState<ResumeData>(initialResumeState);
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('classic');
    const [selectedTheme, setSelectedTheme] = useState<string>(THEME_COLORS[0].value);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('resumeBuilderData');
        const savedTemplate = localStorage.getItem('resumeBuilderTemplate');
        const savedTheme = localStorage.getItem('resumeBuilderTheme');

        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);

                // Migration: Skills array -> object
                if (Array.isArray(parsed.skills)) {
                    parsed.skills = {
                        technical: parsed.skills,
                        soft: [],
                        tools: []
                    };
                }

                // Migration: Technologies string -> array
                if (parsed.projects) {
                    parsed.projects = parsed.projects.map((p: any) => ({
                        ...p,
                        technologies: Array.isArray(p.technologies)
                            ? p.technologies
                            : (p.technologies ? p.technologies.split(',').map((t: string) => t.trim()) : [])
                    }));
                }

                setResumeData(parsed);
            } catch (e) {
                console.error('Failed to parse resume data', e);
            }
        }

        if (savedTemplate) {
            setSelectedTemplate(savedTemplate as TemplateType);
        }

        if (savedTheme) {
            setSelectedTheme(savedTheme);
        }

        setIsLoaded(true);
    }, []);

    // Autosave to local storage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
            localStorage.setItem('resumeBuilderTemplate', selectedTemplate);
            localStorage.setItem('resumeBuilderTheme', selectedTheme);
        }
    }, [resumeData, selectedTemplate, selectedTheme, isLoaded]);

    const updateSection = (section: keyof ResumeData, data: any) => {
        setResumeData(prev => ({ ...prev, [section]: data }));
    };

    const calculateATSScore = (data: ResumeData): ValidationResult => {
        let score = 0;
        const suggestions: string[] = [];
        const improvements: string[] = [];

        // 1. Contact Info (+30 total)
        if (data.personalInfo.fullName) score += 10;
        else suggestions.push("Add your full name (+10)");

        if (data.personalInfo.email) score += 10;
        else suggestions.push("Add email address (+10)");

        if (data.personalInfo.phone) score += 5;
        else suggestions.push("Add phone number (+5)");

        if (data.personalInfo.linkedin) score += 5;
        else suggestions.push("Add LinkedIn profile (+5)");

        // GitHub is nice but optional for non-devs, but per prompt +5
        if (data.personalInfo.github) score += 5;
        else suggestions.push("Add GitHub profile (+5)");

        // 2. Summary (+20 total)
        const summary = data.summary || '';
        if (summary.length > 50) {
            score += 10;
        } else {
            suggestions.push("Expand summary to > 50 chars (+10)");
            improvements.push("Write a longer professional summary to describe your value.");
        }

        const ACTION_VERBS = [
            'built', 'developed', 'designed', 'implemented', 'led', 'improved',
            'created', 'optimized', 'automated', 'managed', 'engineered', 'architected',
            'launched', 'scaled', 'reduced', 'increased', 'generated', 'initiated'
        ];

        const hasActionVerbs = ACTION_VERBS.some(verb => summary.toLowerCase().includes(verb));
        if (hasActionVerbs) {
            score += 10;
        } else {
            suggestions.push("Use strong action verbs in summary (+10)");
            improvements.push(`Include action verbs in your summary (e.g., ${ACTION_VERBS.slice(0, 3).join(', ')}).`);
        }

        // 3. Experience (+15)
        if (data.experience && data.experience.length >= 1) {
            // Check for bullets/content in description
            const hasContent = data.experience.some(exp => exp.description && exp.description.length > 10);
            if (hasContent) {
                score += 15;
            } else {
                suggestions.push("Add details to experience entries (+15)");
                improvements.push("Flesh out your experience descriptions with bullet points.");
            }
        } else {
            suggestions.push("Add at least 1 work experience (+15)");
            improvements.push("Add your work experience.");
        }

        // 4. Education (+10)
        if (data.education && data.education.length >= 1) {
            score += 10;
        } else {
            suggestions.push("Add education details (+10)");
            improvements.push("List your educational background.");
        }

        // 5. Skills (+10)
        const totalSkills = (data.skills.technical?.length || 0) +
            (data.skills.soft?.length || 0) +
            (data.skills.tools?.length || 0);

        if (totalSkills >= 5) {
            score += 10;
        } else {
            suggestions.push("Add at least 5 skills (+10)");
            improvements.push("Add more skills to reach at least 5.");
        }

        // 6. Projects (+10)
        if (data.projects && data.projects.length >= 1) {
            score += 10;
        } else {
            suggestions.push("Add at least 1 project (+10)");
            improvements.push("Showcase a project you've worked on.");
        }

        return {
            score: Math.min(100, score),
            suggestions,
            improvements: improvements.slice(0, 3)
        };
    };

    const validation = calculateATSScore(resumeData);

    const loadSampleData = () => {
        setResumeData({
            personalInfo: {
                fullName: 'Alex Johnson',
                email: 'alex.j@example.com',
                phone: '+1 (555) 123-4567',
                location: 'San Francisco, CA',
                linkedin: 'linkedin.com/in/alexj',
                github: 'github.com/alexj',
            },
            summary: 'Full Stack Developer with 3 years of experience building scalable web applications. Passionate about clean code and user-centric design. Successfully deployed 15+ projects to production environments.',
            education: [
                {
                    id: '1',
                    institution: 'Tech University',
                    degree: 'B.S. Computer Science',
                    startDate: '2018',
                    endDate: '2022',
                    gpa: '3.8',
                }
            ],
            experience: [
                {
                    id: '1',
                    company: 'Innovate Corp',
                    role: 'Software Engineer',
                    startDate: '2022',
                    endDate: 'Present',
                    description: 'Developed and maintained core features for the main product dashboard using React and Node.js. Improved API response time by 40%. Collaborated with a team of 5 developers.',
                }
            ],
            projects: [
                {
                    id: '1',
                    title: 'E-commerce Platform',
                    technologies: ['Next.js', 'Stripe', 'Tailwind'],
                    description: 'Built a fully functional e-commerce site with cart, checkout, and admin panel. Handled 10k monthly visitors.',
                    link: 'github.com/alexj/shop',
                },
                {
                    id: '2',
                    title: 'Task Manager',
                    technologies: ['React', 'Firebase'],
                    description: 'Real-time task management app with drag and drop interface.',
                }
            ],
            skills: {
                technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Python', 'Go'],
                soft: ['Team Leadership', 'Startups', 'Communication'],
                tools: ['Docker', 'AWS', 'Git']
            },
        });
    };

    return (
        <ResumeContext.Provider value={{
            resumeData,
            setResumeData,
            selectedTemplate,
            setSelectedTemplate,
            selectedTheme,
            setSelectedTheme,
            updateSection,
            loadSampleData,
            validation
        }}>
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
}
