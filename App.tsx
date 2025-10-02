
import React, { useState, useEffect, useMemo, useRef } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { DEFAULT_SETTINGS } from './constants';
import { Settings, Transaction, Client, Notification, User, Theme, Page, Todo } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './components/DashboardPage';
import TransactionPage from './components/TransactionPage';
import ClientPage from './components/ClientPage';
import FinalCalcPage from './components/FinalCalcPage';
import SettingsPage from './components/SettingsPage';
import { BACKGROUNDS } from './backgrounds';
import ClientLedgerPage from './components/ClientLedgerPage';
import { ToastProvider } from './contexts/ToastContext';
import { useToast } from './hooks/useToast';
import UserSwitchScreen from './components/UserSwitchScreen';
import PinInputModal from './components/PinInputModal';
import UserEditModal from './components/UserEditModal';
import GuestPage from './components/GuestPage';
import ReportingPage from './components/ReportingPage';
import PaymentReminderPage from './components/PaymentReminderPage';


const initialClients: Client[] = [
    { id: 1, name: 'Md Zafar Ullah', phone: '01630941965', createdAt: '2025-08-15T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 2, name: 'Kamrul Hasan', phone: '01580800173', createdAt: '2025-08-14T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 3, name: 'Takia Akter', phone: '01870872066', createdAt: '2025-08-16T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 4, name: 'Razia Akter', phone: '01822226505', createdAt: '2025-08-17T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 5, name: 'Md Shaon Ali', phone: '01822226505', createdAt: '2025-08-17T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 6, name: 'Mst Ayesha Akter', phone: '01344625231', createdAt: '2025-08-17T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 7, name: 'Jannatul Mawa Arisha Mojumder', phone: '01720127293', createdAt: '2025-08-18T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 8, name: 'Parvin Akter Khusi', phone: '01717939680', createdAt: '2025-08-19T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 9, name: 'Md Zahirul Islam', phone: '01717939680', createdAt: '2025-08-19T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 10, name: 'Zaheen Hossain Mashfy', phone: '01985468004', createdAt: '2025-08-19T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 11, name: 'Mohammad ALi Niyaz', phone: '01870872066', createdAt: '2025-08-26T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 12, name: 'Sadia Akter', phone: '01318090472', createdAt: '2025-08-26T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 13, name: 'Rabeya Bushri', phone: '01986813818', createdAt: '2025-08-26T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 14, name: 'Abdullah Al Bukhari', phone: '01822226505', createdAt: '2025-08-27T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 15, name: 'Sumaiya Saifa', phone: '01822226505', createdAt: '2025-08-27T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 16, name: 'Sanjida Siraj', phone: 'Akash Vai Know', createdAt: '2025-08-27T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 17, name: 'Kazi Saima', phone: 'Akash Vai Know', createdAt: '2025-08-27T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 18, name: 'Suklal Ray', phone: 'Akash Vai Know', createdAt: '2025-09-05T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 19, name: 'Rahel Rana', phone: 'Akash Vai Know', createdAt: '2025-09-05T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 20, name: 'Jannatul Mawa Tasnim', phone: 'Akash Vai Know', createdAt: '2025-09-05T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 21, name: 'Arish Ahmed Chowdhury', phone: 'Akash Vai Know', createdAt: '2025-09-05T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 22, name: 'Joysree Rani Das', phone: 'Akاش Vai Know', createdAt: '2025-09-05T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 23, name: 'Sharif Ahamed', phone: '01710824527', createdAt: '2025-09-09T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 24, name: 'Shiuli Rani Gosh', phone: '01913636175', createdAt: '2025-09-09T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 25, name: 'Sayd Tarik Reehman (Turag Vai)', phone: '01991660450', createdAt: '2025-09-16T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 26, name: 'Akanto Gosh', phone: '01913636175', createdAt: '2025-09-18T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 27, name: 'Md Humayun Kabir Dhali', phone: '01984772126', createdAt: '2025-09-20T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 28, name: 'Tanvir Rashid Shuvo', phone: '01686367665', createdAt: '2025-09-20T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 29, name: 'Asif Mostofa (Jitu)', phone: '01827619303', createdAt: '2025-09-21T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 30, name: 'Methu Golam Hayder', phone: '01538386794', createdAt: '2025-09-24T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 31, name: 'Masuma Akter Shilpy (Shingara Shah', phone: '01643552666', createdAt: '2025-09-25T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 32, name: 'Jebu Akhter', phone: '01676501141', createdAt: '2025-09-24T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
    { id: 33, name: 'Md Rubel Hossain', phone: '01676501191', createdAt: '2025-09-24T00:00:00.000Z', communicationLogs: [], notes: '', specialDates: [] },
];

const initialTransactions: Transaction[] = [
    { id: 1, clientId: 1, totalAmount: 1200, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-08-15', deliveryDate: '2025-08-26', notes: '-', payments: [{ amount: 1200, date: '2025-08-15' }], activityLog: [], agentName: 'Said Vai', agentCost: 600, agentStatus: 'কাজ সম্পন্ন' },
    { id: 2, clientId: 2, totalAmount: 3000, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-08-14', deliveryDate: '2025-08-26', notes: 'সম্পূর্ণ টাকা পরিশোধ', payments: [{ amount: 3000, date: '2025-08-14' }], activityLog: [], agentName: 'Said Vai', agentCost: 1000, agentStatus: 'কাজ সম্পন্ন' },
    { id: 3, clientId: 3, totalAmount: 2000, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-08-16', deliveryDate: '2025-08-26', notes: 'সম্পূর্ণ টাকা পরিশোধ', payments: [{ amount: 2000, date: '2025-08-16' }], activityLog: [], agentName: 'Said Vai', agentCost: 1000, agentStatus: 'কাজ সম্পন্ন' },
    { id: 4, clientId: 4, totalAmount: 1200, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-08-17', deliveryDate: '2025-08-27', notes: '', payments: [{ amount: 1200, date: '2025-08-17' }], activityLog: [], agentName: 'Akash Vai', agentCost: 0, agentStatus: 'কাজ সম্পন্ন' },
    { id: 5, clientId: 5, totalAmount: 1200, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-08-17', deliveryDate: '2025-08-27', notes: '', payments: [{ amount: 1200, date: '2025-08-17' }], activityLog: [], agentName: 'Akash Vai', agentCost: 0, agentStatus: 'কাজ সম্পন্ন' },
    { id: 6, clientId: 6, totalAmount: 2000, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-08-17', deliveryDate: '2025-08-27', notes: 'Duplicate Possible (বিকাশে টাকা দিয়েছে) কাজের জন্য প্রস্তুত', payments: [{ amount: 2000, date: '2025-08-17' }], activityLog: [], agentName: 'Said Vai', agentCost: 1000, agentStatus: 'কাজ সম্পন্ন' },
    { id: 7, clientId: 7, totalAmount: 1200, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-08-18', deliveryDate: '2025-08-28', notes: 'সম্পূর্ণ টাকা পরিশোধ', payments: [{ amount: 1200, date: '2025-08-18' }], activityLog: [], agentName: 'Said Vai', agentCost: 600, agentStatus: 'কাজ সম্পন্ন' },
    { id: 8, clientId: 8, totalAmount: 1200, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-08-19', deliveryDate: '2025-08-31', notes: 'সম্পূর্ণ টাকা পরিশোধ', payments: [{ amount: 1200, date: '2025-08-19' }], activityLog: [], agentName: 'Said Vai', agentCost: 600, agentStatus: 'কাজ সম্পন্ন' },
    { id: 9, clientId: 9, totalAmount: 1200, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-08-19', deliveryDate: '2025-08-31', notes: 'সম্পূর্ণ টাকা পরিশোধ', payments: [{ amount: 1200, date: '2025-08-19' }], activityLog: [], agentName: 'Said Vai', agentCost: 600, agentStatus: 'কাজ সম্পন্ন' },
    { id: 10, clientId: 10, totalAmount: 1200, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-08-19', deliveryDate: '2025-08-31', notes: 'সম্পূর্ণ টাকা পরিশোধ', payments: [{ amount: 1200, date: '2025-08-19' }], activityLog: [], agentName: 'Said Vai', agentCost: 600, agentStatus: 'কাজ সম্পন্ন' },
    { id: 11, clientId: 11, totalAmount: 1200, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-08-26', deliveryDate: '2025-09-07', notes: 'সম্পূর্ণ টাকা পরিশোধ', payments: [{ amount: 1200, date: '2025-08-26' }], activityLog: [], agentName: 'Said Vai', agentCost: 600, agentStatus: 'কাজ সম্পন্ন' },
    { id: 12, clientId: 12, totalAmount: 1200, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-08-26', deliveryDate: '2025-09-07', notes: 'Duplicate Possible কাজ চলমান', payments: [{ amount: 1200, date: '2025-08-26' }], activityLog: [], agentName: 'Said Vai', agentCost: 600, agentStatus: 'কাজ সম্পন্ন' },
    { id: 13, clientId: 13, totalAmount: 1200, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-08-26', deliveryDate: '2025-09-07', notes: 'সম্পূর্ণ টাকা পরিশোধ', payments: [{ amount: 1200, date: '2025-08-26' }], activityLog: [], agentName: 'Said Vai', agentCost: 600, agentStatus: 'কাজ সম্পন্ন' },
    { id: 14, clientId: 14, totalAmount: 1200, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-08-27', deliveryDate: '2025-09-08', notes: 'সম্পূর্ণ টাকা পরিশোধ', payments: [{ amount: 1200, date: '2025-08-27' }], activityLog: [], agentName: 'Said Vai', agentCost: 600, agentStatus: 'কাজ সম্পন্ন' },
    { id: 15, clientId: 15, totalAmount: 1200, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-08-27', deliveryDate: '2025-09-08', notes: 'সম্পূর্ণ টাকা পরিশোধ', payments: [{ amount: 1200, date: '2025-08-27' }], activityLog: [], agentName: 'Self', agentCost: 0, agentStatus: 'কাজ সম্পন্ন' },
    { id: 16, clientId: 16, totalAmount: 0, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-08-27', deliveryDate: '2025-09-08', notes: 'My Desk- Need village Chairman Certificate or Utility Bill Paper', payments: [], activityLog: [], agentName: 'Self', agentCost: 0, agentStatus: 'কাজ সম্পন্ন' },
    { id: 17, clientId: 17, totalAmount: 1000, workStatus: 'প্রসেসিং চলছে', submissionDate: '2025-08-27', deliveryDate: '2025-09-08', notes: '', payments: [{ amount: 2000, date: '2025-08-27' }], activityLog: [], agentName: 'Akash Vai', agentCost: 0, agentStatus: 'প্রসেসিং চলছে' },
    { id: 18, clientId: 18, totalAmount: 0, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-09-05', deliveryDate: '2025-09-16', notes: 'Duplicate Soho Taka Sayed Vai Payment', payments: [], activityLog: [], agentName: 'Said Vai', agentCost: 1100, agentStatus: 'কাজ সম্পন্ন' },
    { id: 19, clientId: 19, totalAmount: 0, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-09-05', deliveryDate: '2025-09-16', notes: 'Duplicate Soho Taka Sayed Vai Payment', payments: [], activityLog: [], agentName: 'Said Vai', agentCost: 1100, agentStatus: 'কাজ সম্পন্ন' },
    { id: 20, clientId: 20, totalAmount: 0, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-09-05', deliveryDate: '2025-09-16', notes: '', payments: [], activityLog: [], agentName: 'Akash Vai', agentCost: 0, agentStatus: 'কাজ সম্পন্ন' },
    { id: 21, clientId: 21, totalAmount: 2000, workStatus: 'ডেলিভারির জন্য প্রস্তুত', submissionDate: '2025-09-05', deliveryDate: '2025-09-16', notes: '', payments: [{ amount: 2000, date: '2025-09-05' }], activityLog: [], agentName: 'Akash Vai', agentCost: 0, agentStatus: 'কাজ সম্পন্ন' },
    { id: 22, clientId: 22, totalAmount: 0, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-09-05', deliveryDate: '2025-09-16', notes: '', payments: [], activityLog: [], agentName: 'Akash Vai', agentCost: 0, agentStatus: 'কাজ সম্পন্ন' },
    { id: 23, clientId: 23, totalAmount: 1200, workStatus: 'প্রসেসিং চলছে', submissionDate: '2025-09-09', deliveryDate: '2025-09-21', notes: '', payments: [{ amount: 1200, date: '2025-09-09' }], activityLog: [], agentName: 'Said Vai', agentCost: 600, agentStatus: 'প্রসেসিং চলছে' },
    { id: 24, clientId: 24, totalAmount: 1200, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-09-09', deliveryDate: '2025-09-21', notes: '', payments: [{ amount: 1200, date: '2025-09-09' }], activityLog: [], agentName: 'Said Vai', agentCost: 600, agentStatus: 'সাইদ ভাইয়ের কাছে পেন্ডিং' },
    { id: 25, clientId: 25, totalAmount: 2000, workStatus: 'ডেলিভারি সম্পন্ন', submissionDate: '2025-09-16', deliveryDate: '2025-09-28', notes: '', payments: [{ amount: 2000, date: '2025-09-16' }], activityLog: [], agentName: 'Said Vai', agentCost: 600, agentStatus: 'কাজ সম্পন্ন' },
    { id: 26, clientId: 26, totalAmount: 1000, workStatus: 'প্রসেসিং চলছে', submissionDate: '2025-09-18', deliveryDate: '2025-09-30', notes: '', payments: [{ amount: 1200, date: '2025-09-18' }], activityLog: [], agentName: 'Said Vai', agentCost: 600, agentStatus: 'প্রসেসিং চলছে' },
    { id: 27, clientId: 27, totalAmount: 2200, workStatus: 'প্রসেসিং চলছে', submissionDate: '2025-09-20', deliveryDate: '2025-09-30', notes: '', payments: [{ amount: 2200, date: '2025-09-20' }], activityLog: [], agentName: 'Said Vai', agentCost: 800, agentStatus: 'প্রসেসিং চলছে' },
    { id: 28, clientId: 28, totalAmount: 2000, workStatus: 'প্রসেসিং চলছে', submissionDate: '2025-09-20', deliveryDate: '2025-09-30', notes: 'Correction File', payments: [{ amount: 2000, date: '2025-09-20' }], activityLog: [], agentName: 'Said Vai', agentCost: 1100, agentStatus: 'প্রসেসিং চলছে' },
    { id: 29, clientId: 29, totalAmount: 0, workStatus: 'প্রসেসিং চলছে', submissionDate: '2025-09-21', deliveryDate: '2025-10-01', notes: '', payments: [], activityLog: [], agentName: 'Akash Vai', agentCost: 600, agentStatus: 'প্রসেসিং চলছে' },
    { id: 30, clientId: 30, totalAmount: 3000, workStatus: 'প্রসেসিং চলছে', submissionDate: '2025-09-24', deliveryDate: '2025-10-06', notes: 'Possible Duplicate,', payments: [{ amount: 3000, date: '2025-09-24' }], activityLog: [], agentName: 'Said Vai', agentCost: 1200, agentStatus: 'প্রসেসিং চলছে' },
    { id: 31, clientId: 31, totalAmount: 2000, workStatus: 'প্রসেসিং চলছে', submissionDate: '2025-09-25', deliveryDate: '2025-10-07', notes: '', payments: [{ amount: 2000, date: '2025-09-25' }], activityLog: [], agentName: 'Said Vai', agentCost: 1000, agentStatus: 'প্রসেসিং চলছে' },
    { id: 32, clientId: 32, totalAmount: 0, workStatus: 'প্রসেসিং চলছে', submissionDate: '2025-09-24', deliveryDate: '2025-10-06', notes: '', payments: [], activityLog: [], agentName: 'Akash Vai', agentCost: 600, agentStatus: 'প্রসেসিং চলছে' },
    { id: 33, clientId: 33, totalAmount: 0, workStatus: 'প্রসেসিং চলছে', submissionDate: '2025-09-24', deliveryDate: '2025-10-06', notes: '', payments: [], activityLog: [], agentName: 'Akash Vai', agentCost: 600, agentStatus: 'প্রসেসিং চলছে' },
];


const MOCK_USERS: User[] = [
    {
        id: 1,
        name: 'রিয়াদ ভাই',
        avatar: 'https://picsum.photos/seed/riyad/200',
        pin: '00000',
        role: 'admin',
        settings: DEFAULT_SETTINGS,
        clients: initialClients,
        transactions: initialTransactions,
        notifications: [],
        todos: []
    },
    {
        id: 2,
        name: 'আকাশ আহমেদ',
        avatar: 'https://picsum.photos/seed/akash/200',
        pin: '00000',
        role: 'staff',
        settings: { ...DEFAULT_SETTINGS, theme: Theme.Green, businessProfile: { name: 'স্টাফ অ্যাকাউন্ট', address: 'চট্টগ্রাম, বাংলাদেশ', logo: '' } },
        clients: [],
        transactions: [],
        notifications: [],
        todos: []
    },
    {
        id: 3,
        name: 'সাদিয়া ইসলাম',
        avatar: 'https://picsum.photos/seed/sadia/200',
        pin: '00000',
        role: 'manager',
        settings: { ...DEFAULT_SETTINGS, theme: Theme.Yellow, businessProfile: { name: 'ম্যানেজার অ্যাকাউন্ট', address: 'ঢাকা, বাংলাদেশ', logo: '' } },
        clients: [],
        transactions: [],
        notifications: [],
        todos: []
    },
     {
        id: 4,
        name: 'অতিথি',
        avatar: 'https://picsum.photos/seed/guest/200',
        pin: '00000',
        role: 'guest',
        settings: DEFAULT_SETTINGS,
        clients: [],
        transactions: [],
        notifications: [],
        todos: []
    }
];

const AppContent: React.FC = () => {
    const [users, setUsers] = useLocalStorage<User[]>('hisab-khata-users', MOCK_USERS);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const [selectedUserForPin, setSelectedUserForPin] = useState<User | null>(null);
    const [isUserEditModalOpen, setIsUserEditModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const [activePage, setActivePage] = useState<Page>('dashboard');
    const [activeClientId, setActiveClientId] = useState<number | null>(null);
    const { showToast } = useToast();

    // The single source of truth for the current user's complete data.
    const currentUserData = useMemo(() => {
        if (!currentUser) return null;
        return users.find(u => u.id === currentUser.id);
    }, [currentUser, users]);

    // Derive working state directly from the source of truth.
    // Provide defaults for when no user is logged in.
    const transactions = currentUserData?.transactions ?? [];
    const clients = currentUserData?.clients ?? [];
    const settings = currentUserData?.settings ?? DEFAULT_SETTINGS;
    const notifications = currentUserData?.notifications ?? [];
    const todos = currentUserData?.todos ?? [];

    // --- State Updaters ---
    // These functions update the master 'users' state, ensuring a unidirectional data flow.
    const setTransactions = (value: React.SetStateAction<Transaction[]>) => {
        if (!currentUser) return;
        setUsers(prevUsers =>
            prevUsers.map(u => {
                if (u.id === currentUser.id) {
                    const newTransactions = typeof value === 'function' ? value(u.transactions) : value;
                    return { ...u, transactions: newTransactions };
                }
                return u;
            })
        );
    };

    const setClients = (value: React.SetStateAction<Client[]>) => {
        if (!currentUser) return;
        setUsers(prevUsers =>
            prevUsers.map(u => {
                if (u.id === currentUser.id) {
                    const newClients = typeof value === 'function' ? value(u.clients) : value;
                    return { ...u, clients: newClients };
                }
                return u;
            })
        );
    };
    
    const setSettings = (value: React.SetStateAction<Settings>) => {
        if (!currentUser) return;
        setUsers(prevUsers =>
            prevUsers.map(u => {
                if (u.id === currentUser.id) {
                    const newSettings = typeof value === 'function' ? value(u.settings) : value;
                    return { ...u, settings: newSettings };
                }
                return u;
            })
        );
    };

    const setNotifications = (value: React.SetStateAction<Notification[]>) => {
        if (!currentUser) return;
        setUsers(prevUsers =>
            prevUsers.map(u => {
                if (u.id === currentUser.id) {
                    const newNotifications = typeof value === 'function' ? value(u.notifications) : value;
                    return { ...u, notifications: newNotifications };
                }
                return u;
            })
        );
    };
    
    const setTodos = (value: React.SetStateAction<Todo[]>) => {
        if (!currentUser) return;
        setUsers(prevUsers =>
            prevUsers.map(u => {
                if (u.id === currentUser.id) {
                    const newTodos = typeof value === 'function' ? value(u.todos) : value;
                    return { ...u, todos: newTodos };
                }
                return u;
            })
        );
    };

    const handleUserSelect = (user: User) => {
        setSelectedUserForPin(user);
        setIsPinModalOpen(true);
    };

    const handlePinSuccess = () => {
        setCurrentUser(selectedUserForPin);
        setIsPinModalOpen(false);
        setActivePage('dashboard'); // Reset to dashboard on login
        showToast(`স্বাগতম, ${selectedUserForPin?.name}!`, 'success');
    };
    
    const handleLogout = () => {
        setCurrentUser(null);
        setSelectedUserForPin(null);
    }
    
    const handleEditProfile = () => {
        setUserToEdit(currentUser);
        setIsUserEditModalOpen(true);
    };

    const handleUserSave = (userToSave: User | (Omit<User, 'id'|'settings'|'clients'|'transactions'|'notifications'| 'todos'> & { id?: undefined | number })) => {
        if ('id' in userToSave && userToSave.id && users.some(u => u.id === userToSave.id)) {
            // Update existing user
            const updatedUser = userToSave as User;
            const updatedUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
            setUsers(updatedUsers);
            if(currentUser?.id === updatedUser.id) {
                setCurrentUser(updatedUser);
            }
            showToast('ব্যবহারকারীর তথ্য হালনাগাদ করা হয়েছে।', 'success');
        } else {
            // Add new user
            const newUser: User = {
                id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
                name: userToSave.name,
                avatar: userToSave.avatar,
                pin: (userToSave as any).pin,
                role: (userToSave as any).role,
                settings: DEFAULT_SETTINGS,
                clients: [],
                transactions: [],
                notifications: [],
                todos: [],
            };
            setUsers(prev => [...prev, newUser]);
            showToast('নতুন ব্যবহারকারী যোগ করা হয়েছে।', 'success');
        }
        setIsUserEditModalOpen(false);
    }

    const handleUserDelete = (userId: number) => {
        if (userId === currentUser?.id) {
            showToast('আপনি নিজেকে মুছে ফেলতে পারবেন না।', 'error');
            return;
        }
        setUsers(users.filter(u => u.id !== userId));
        showToast('ব্যবহারকারীকে মুছে ফেলা হয়েছে।', 'success');
    }
    
    const handleRestoreData = (restoredUsers: User[]) => {
        setUsers(restoredUsers);
        // Important: Log out the current user to prevent state inconsistencies.
        // The user will be presented with the user selection screen from the restored data.
        setCurrentUser(null);
        setSelectedUserForPin(null);
        showToast('ডেটা সফলভাবে রিস্টোর করা হয়েছে। অনুগ্রহ করে আবার লগইন করুন।', 'success');
    };

    const handleBackup = () => {
        try {
            const dataStr = JSON.stringify(users, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `pro-hisab-khata-backup-${new Date().toISOString().split('T')[0]}.json`;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            showToast('ডেটা ব্যাকআপ সফলভাবে ডাউনলোড হয়েছে।', 'success');
        // FIX: Added curly braces to the catch block to fix syntax error and subsequent scope issues.
        } catch (error) {
            console.error('Backup failed:', error);
            showToast('ব্যাকআপ নিতে সমস্যা হয়েছে।', 'error');
        }
    };


    // --- Data Migrations ---
    useEffect(() => {
        let wasMigrated = false;
        const migratedUsers = users.map(user => {
            let userNeedsMigration = false;
            
            const migratedClients = (user.clients || []).map(client => {
                const clientNeedsUpdate = client.communicationLogs === undefined || client.notes === undefined || client.specialDates === undefined;
                if (clientNeedsUpdate) {
                    userNeedsMigration = true;
                    return {
                        ...client,
                        communicationLogs: client.communicationLogs || [],
                        notes: client.notes || '',
                        specialDates: client.specialDates || []
                    };
                }
                return client;
            });

            const settingsNeedsUpdate = user.settings && (user.settings.serviceTemplates === undefined || user.settings.scheduledReports === undefined);
            if (settingsNeedsUpdate) {
                userNeedsMigration = true;
            }

            if (userNeedsMigration) {
                wasMigrated = true;
                return {
                    ...user,
                    clients: migratedClients,
                    settings: user.settings ? {
                        ...user.settings,
                        serviceTemplates: user.settings.serviceTemplates || [],
                        scheduledReports: user.settings.scheduledReports || [],
                    } : DEFAULT_SETTINGS
                };
            }
            return user;
        });

        if (wasMigrated) {
            console.log("Running data migrations for users...");
            setUsers(migratedUsers);
        }
    }, [users, setUsers]);

    // --- Notification Checking Logic ---
    // This ref holds the latest data needed for notification checks, preventing dependency loops.
    const notificationDataRef = useRef({ transactions, notifications, setNotifications, showToast, settings, setSettings });
    useEffect(() => {
        notificationDataRef.current = { transactions, notifications, setNotifications, showToast, settings, setSettings };
    });

    useEffect(() => {
        if (currentUser && currentUser.role !== 'guest') {
            const runPeriodicChecks = () => {
                const {
                    transactions: currentTransactions,
                    notifications: currentNotifications,
                    setNotifications: currentSetNotifications,
                    showToast: currentShowToast,
                    settings: currentSettings,
                    setSettings: currentSetSettings,
                } = notificationDataRef.current;

                const newNotifications: Notification[] = [];
                const now = new Date();

                // 1. Check for due dates and payments
                currentTransactions.forEach(tx => {
                    const deliveryDate = new Date(tx.deliveryDate);
                    const daysUntilDelivery = (deliveryDate.getTime() - now.getTime()) / (1000 * 3600 * 24);

                    if (daysUntilDelivery > 0 && daysUntilDelivery <= 2) {
                        const notificationId = `delivery-${tx.id}`;
                        if (!currentNotifications.find(n => n.id === notificationId)) {
                            newNotifications.push({ id: notificationId, message: `ট্রানজ্যাকশন #${tx.id} এর ডেলিভারি ২ দিনের মধ্যে।`, type: 'delivery', timestamp: now.toISOString(), isRead: false, relatedId: tx.id });
                        }
                    }

                    const paid = tx.payments.reduce((sum, p) => sum + p.amount, 0);
                    if ((tx.totalAmount - paid) > 0 && (tx.workStatus.includes('সম্পন্ন') || tx.workStatus.includes('ডেলিভারি'))) {
                        const notificationId = `due-${tx.id}`;
                        if (!currentNotifications.find(n => n.id === notificationId)) {
                            newNotifications.push({ id: notificationId, message: `ট্রানজ্যাকশন #${tx.id} এর টাকা বকেয়া আছে।`, type: 'due', timestamp: now.toISOString(), isRead: false, relatedId: tx.id });
                        }
                    }
                });
                
                // 2. Check for scheduled reports
                const scheduledReports = currentSettings.scheduledReports || [];
                let reportsUpdated = false;
                const updatedScheduledReports = scheduledReports.map(report => {
                    if (new Date(report.nextRunDate) <= now) {
                        reportsUpdated = true;
                        const reportTypeMap = { 'profit-loss': 'লাভ-লোকসান', 'client-wise': 'ক্লায়েন্ট অনুযায়ী', 'agent-wise': 'এজেন্ট অনুযায়ী', 'due-collection': 'বকেয়া সংগ্রহ' };
                        const frequencyMap = { 'weekly': 'সাপ্তাহিক', 'monthly': 'মাসিক' };
                        const notificationId = `report-${report.id}-${now.getTime()}`;
                        newNotifications.push({
                            id: notificationId,
                            message: `আপনার ${frequencyMap[report.frequency]} ${reportTypeMap[report.reportType]} রিপোর্ট প্রস্তুত।`,
                            type: 'info',
                            timestamp: now.toISOString(),
                            isRead: false,
                            relatedId: report.id,
                        });

                        const newNextRunDate = new Date();
                        if (report.frequency === 'weekly') newNextRunDate.setDate(newNextRunDate.getDate() + 7);
                        else newNextRunDate.setMonth(newNextRunDate.getMonth() + 1);
                        
                        return { ...report, nextRunDate: newNextRunDate.toISOString() };
                    }
                    return report;
                });

                if (reportsUpdated) {
                    currentSetSettings(prev => ({ ...prev, scheduledReports: updatedScheduledReports }));
                }

                if (newNotifications.length > 0) {
                    currentSetNotifications(prev => [...prev, ...newNotifications]);
                    currentShowToast(`${newNotifications.length} টি নতুন নোটিফিকেশন`, 'info');
                }
            };
            
            const handle = setTimeout(runPeriodicChecks, 1000); // Check shortly after login
            const interval = setInterval(runPeriodicChecks, 60 * 60 * 1000); // Check every hour
            return () => {
                clearTimeout(handle);
                clearInterval(interval);
            };
        }
    }, [currentUser]); // This effect ONLY re-runs on user login/logout, preventing loops.


    const renderPage = () => {
        const isStaff = currentUser?.role === 'staff';

        switch (activePage) {
            case 'dashboard':
                return <DashboardPage transactions={transactions} clients={clients} settings={settings} todos={todos} setTodos={setTodos} />;
            case 'transactions':
                return <TransactionPage transactions={transactions} clients={clients} setTransactions={setTransactions} settings={settings} setClients={setClients} readOnly={isStaff} />;
            case 'clients':
                return <ClientPage clients={clients} setClients={setClients} onClientSelect={(id) => { setActiveClientId(id); setActivePage('client-ledger'); }} transactions={transactions} readOnly={isStaff} />;
            case 'client-ledger':
                return activeClientId ? <ClientLedgerPage clientId={activeClientId} clients={clients} setClients={setClients} transactions={transactions} settings={settings} onBack={() => { setActivePage('clients'); setActiveClientId(null); }} /> : null;
            case 'final-calc':
                return <FinalCalcPage transactions={transactions} settings={settings} />;
            case 'reporting':
                return <ReportingPage transactions={transactions} clients={clients} settings={settings} setSettings={setSettings} />;
            case 'payment-reminder':
                return <PaymentReminderPage transactions={transactions} clients={clients} setTransactions={setTransactions} settings={settings} />;
            case 'settings':
                return <SettingsPage 
                    settings={settings} 
                    setSettings={setSettings} 
                    onLogout={handleLogout} 
                    onEditProfile={handleEditProfile}
                    currentUser={currentUser!}
                    users={users}
                    onUserSave={handleUserSave}
                    onUserDelete={handleUserDelete}
                    onRestore={handleRestoreData}
                    onBackup={handleBackup}
                />;
            default:
                return <DashboardPage transactions={transactions} clients={clients} settings={settings} todos={todos} setTodos={setTodos} />;
        }
    };

    const background = BACKGROUNDS.find(bg => bg.id === settings.backgroundId) || BACKGROUNDS[0];

    if (!currentUser) {
        return (
            <>
                <UserSwitchScreen users={users} onUserSelect={handleUserSelect} />
                {isPinModalOpen && selectedUserForPin && (
                    <PinInputModal 
                        user={selectedUserForPin} 
                        onSuccess={handlePinSuccess}
                        onClose={() => setIsPinModalOpen(false)}
                    />
                )}
            </>
        )
    }
    
    const getThemeForRole = (role: User['role']) => {
        switch (role) {
            case 'manager': return Theme.Yellow;
            case 'staff': return Theme.Green;
            case 'guest': return Theme.Blue;
            case 'admin':
            default:
                return settings.theme; // Admin uses their saved theme
        }
    };
    const themeClass = getThemeForRole(currentUser.role);

    if (currentUser.role === 'guest') {
         return (
            <div className="dark theme-blue text-default">
                {/* A custom, immersive container for the guest page, separate from the main app's look and feel. */}
                <GuestPage onLogout={handleLogout} />
            </div>
        );
    }

    return (
        <div className={`${settings.colorMode} ${themeClass} ${settings.textColor}`}>
            <div className="fixed inset-0 bg-cover bg-center transition-all duration-500" style={{ backgroundImage: `url(${background.url})` }}></div>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>

            <div className="relative min-h-screen flex">
                <Sidebar activePage={activePage} setActivePage={setActivePage} user={currentUser} />
                <div className="flex-1 flex flex-col w-0">
                    <Header 
                        settings={settings} 
                        notifications={notifications} 
                        setNotifications={setNotifications} 
                        user={currentUser} 
                        onLogout={handleLogout}
                        setActivePage={setActivePage}
                        onEditProfile={handleEditProfile}
                        onBackup={handleBackup}
                    />
                    <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                        {renderPage()}
                    </main>
                </div>
            </div>
             {isUserEditModalOpen && (
                <UserEditModal
                    isOpen={isUserEditModalOpen}
                    user={userToEdit}
                    onClose={() => setIsUserEditModalOpen(false)}
                    onSave={handleUserSave}
                    currentUserRole={currentUser.role}
                />
            )}
        </div>
    );
};


const App: React.FC = () => {
    return (
        <ToastProvider>
            <AppContent />
        </ToastProvider>
    );
}

export default App;