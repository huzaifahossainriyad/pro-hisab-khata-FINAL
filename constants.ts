import { Settings, Theme, TextColor, ColorMode } from './types';

export const DEFAULT_SETTINGS: Settings = {
    businessProfile: {
        name: 'প্রো হিসাব খাতা রিয়াদ ভাই',
        address: 'ঢাকা, বাংলাদেশ',
        logo: '',
    },
    currency: '৳',
    customStatuses: ['পেন্ডিং', 'প্রসেসিং চলছে', 'কাজ সম্পন্ন', 'ডেলিভারির জন্য প্রস্তুত', 'ডেলিভারি সম্পন্ন'],
    theme: Theme.Blue,
    colorMode: ColorMode.Dark,
    textColor: TextColor.Default,
    backgroundId: 'dark-1',
    // Defaults based on the user's Google Sheet
    customServiceTypes: ['BIRTH (CORRECTION)', 'New Application', 'Other'],
    customAgentNames: ['Akash Vai', 'Said Vai', 'Self'],
    customAgentStatuses: ['কাজ সম্পন্ন', 'সাইদ ভাইয়ের কাছে পেন্ডিং', 'ডেলিভারি সম্পন্ন', 'টাকা পরিশোধ'],
    serviceTemplates: [],
    scheduledReports: [],
};