export interface ResumeData {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        linkedin?: string;
        github?: string;
        portfolio?: string;
    };
    summary: string;
    education: Array<{
        id: string;
        institution: string;
        degree: string;
        startDate: string;
        endDate: string;
        gpa?: string;
    }>;
    experience: Array<{
        id: string;
        company: string;
        role: string;
        startDate: string;
        endDate: string;
        description: string; // detailed bullet points
    }>;
    projects: Array<{
        id: string;
        title: string;
        technologies: string[]; // Changed from string to string[]
        link?: string;
        description: string;
    }>;
    skills: {
        technical: string[];
        soft: string[];
        tools: string[];
    };
}

export const initialResumeState: ResumeData = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
    },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: {
        technical: [],
        soft: [],
        tools: [],
    },
};
