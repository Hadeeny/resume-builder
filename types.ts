export type Info = {
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  phone?: number;
  linkedin?: string;
  website?: string;
  github?: string;
};

export type ExperienceType = {
  id?: number;
  title?: string;
  city?: string;
  company?: string;
  description?: string;
  from?: string;
  to?: string;
};

export type SkillType = {
  skill: string;
  level: string;
  id: number;
};
export type eduType = {
  id: number;
  specialization: string;
  school: string;
  from: string;
  to: string;
  description: string;
};

export type TemplateSlug = {
  params: { tempId: number };
};

export type TemplateProps = {
  personalInfo: Info;
  experience: ExperienceType[];
  skill: SkillType[];
  education: eduType[];
  summary: string;
  refs: any;
};

export type ResumePreviewProps = {
  id: number;
  personalInfo?: Info;
};

export type FormSteps = {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  id: number;
};
