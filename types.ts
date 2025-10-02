export enum ColorMode {
    Dark = 'dark',
    Light = 'light',
}

export enum Theme {
    Blue = 'theme-blue',
    Green = 'theme-green',
    Purple = 'theme-purple',
    Yellow = 'theme-yellow',
    White = 'theme-white',
}

export enum TextColor {
    Default = 'text-default',
    Subtle = 'text-subtle',
}

export interface BusinessProfile {
    name: string;
    address: string;
    logo: string;
}

export interface ServiceTemplate {
    id: number;
    name: string;
    totalAmount: number;
    serviceType: string;
    agentCost?: number;
}

export interface ScheduledReport {
    id: number;
    reportType: 'profit-loss' | 'client-wise' | 'agent-wise' | 'due-collection';
    frequency: 'weekly' | 'monthly';
    nextRunDate: string; // ISO String
    recipientEmail?: string; 
}

export interface Settings {
    businessProfile: BusinessProfile;
    currency: string;
    customStatuses: string[];
    theme: Theme;
    colorMode: ColorMode;
    textColor: TextColor;
    backgroundId: string;
    customServiceTypes: string[];
    customAgentNames: string[];
    customAgentStatuses: string[];
    serviceTemplates: ServiceTemplate[];
    scheduledReports?: ScheduledReport[];
}

export interface Payment {
    amount: number;
    date: string; // YYYY-MM-DD
}

export interface Transaction {
    id: number;
    clientId: number;
    totalAmount: number;
    workStatus: string;
    submissionDate: string; // YYYY-MM-DD
    deliveryDate: string; // YYYY-MM-DD
    notes: string;
    payments: Payment[];
    activityLog: string[];
    serviceType?: string;
    agentName?: string;
    agentCost?: number;
    agentStatus?: string;
    lastReminded?: string; // ISO String for the date
}

export interface CommunicationLog {
    id: number;
    date: string; // ISO String
    medium: 'Phone' | 'Message' | 'In-person';
    notes: string;
}

export interface SpecialDate {
    id: number;
    title: string;
    date: string; // YYYY-MM-DD
}

export interface Client {
    id: number;
    name: string;
    phone: string;
    createdAt: string; // ISO String
    communicationLogs: CommunicationLog[];
    notes?: string;
    specialDates?: SpecialDate[];
}

export interface Notification {
    id: string;
    message: string;
    type: 'delivery' | 'due' | 'info';
    timestamp: string; // ISO String
    isRead: boolean;
    relatedId: number;
}

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string; // ISO string
}

export interface User {
    id: number;
    name: string;
    avatar: string;
    pin: string;
    role: 'admin' | 'manager' | 'staff' | 'guest';
    settings: Settings;
    clients: Client[];
    transactions: Transaction[];
    notifications: Notification[];
    todos: Todo[];
}

export type Page = 'dashboard' | 'transactions' | 'clients' | 'client-ledger' | 'final-calc' | 'reporting' | 'settings' | 'payment-reminder';

export interface Background {
    id: string;
    url: string;
    thumbnailUrl: string;
    type: ColorMode;
    alt: string;
}