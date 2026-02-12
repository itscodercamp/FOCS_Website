import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export interface Client {
  name: string;
  logoPlaceholder?: string; // Text fallback
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
}