import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, TrendingUp, DollarSign, Calendar, CheckCircle, Clock, AlertCircle, Video, Camera, FileText, ChevronRight, Download, Edit, Bell, ChevronDown, Activity } from 'lucide-react';

const InfluencerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateFilter, setDateFilter] = useState('all');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [activeContentTab, setActiveContentTab] = useState('all');
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');
  const [activeFinanceTab, setActiveFinanceTab] = useState('dashboard');
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Color palette
  const colors = {
    primary: '#032f6e',
    secondary: '#9dcde3',
    accentBlue: '#6bb6ff',
    accentLight: '#a8d1ff',
    accentMedium: '#7db3dc',
    bgColor: '#f8fafb',
    textDark: '#2c3e50',
    textLight: '#7f8c8d',
    white: '#ffffff',
    borderLight: '#e9ecef',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107'
  };

  // Mock data - Full data
  const profileData = {
    name: "Ayşe Yılmaz",
    code: "EstenoveAY100",
    email: "ayse@influencer.com",
    phone: "+90 555 123 4567",
    platforms: ["Instagram", "YouTube", "TikTok"],
    commissionType: "percentage",
    commissionRate: "10%",
    joinDate: "15 Ocak 2024",
    avatar: "https://via.placeholder.com/150",
    socialMedia: {
      instagram: {
        username: "@ayse.yilmaz",
        url: "https://instagram.com/ayse.yilmaz",
        followers: 45200,
        verified: true
      },
      youtube: {
        username: "Ayşe Yılmaz",
        url: "https://youtube.com/@ayseyilmaz",
        followers: 12800,
        verified: false
      },
      tiktok: {
        username: "@ayseyilmaz",
        url: "https://tiktok.com/@ayseyilmaz",
        followers: 28500,
        verified: true
      },
      twitter: {
        username: "@ayse_yilmaz",
        url: "https://twitter.com/ayse_yilmaz",
        followers: 8200,
        verified: false
      }
    }
  };

  // Full stats data
  const allTimeStats = {
    totalLeads: 156,
    totalEarnings: 45600,
    pendingPayments: 8400,
    operations: 89
  };

  // Monthly data for filtering
  const monthlyData = {
    'june2025': {
      totalLeads: 24,
      totalEarnings: 13500,
      pendingPayments: 13500,
      operations: 15
    },
    'july2025': {
      totalLeads: 18,
      totalEarnings: 8400,
      pendingPayments: 8400,
      operations: 11
    },
    'may2025': {
      totalLeads: 22,
      totalEarnings: 11400,
      pendingPayments: 0,
      operations: 14
    }
  };

  // Lead stages data - updated with new names
  const allLeadsByStage = [
    { stage: 'New', count: 45, value: 67500 },
    { stage: 'First Contact', count: 32, value: 48000 },
    { stage: 'Waiting for Info', count: 28, value: 42000 },
    { stage: 'Offer Sent', count: 20, value: 30000 },
    { stage: 'Deposit Process', count: 25, value: 37500 },
    { stage: 'Operation Planning', count: 26, value: 39000 }
  ];

  const juneLeadsByStage = [
    { stage: 'New', count: 8, value: 12000 },
    { stage: 'First Contact', count: 5, value: 7500 },
    { stage: 'Waiting for Info', count: 4, value: 6000 },
    { stage: 'Offer Sent', count: 3, value: 4500 },
    { stage: 'Deposit Process', count: 4, value: 6000 },
    { stage: 'Operation Planning', count: 3, value: 4500 }
  ];

  // Scheduled Operations data
  const allScheduledOperations = [
    { dealId: '22008098308', name: 'Clinton Moresco', operationDate: '05/09/2025', operationType: 'FUE' },
    { dealId: '22008098309', name: 'Sarah Johnson', operationDate: '12/09/2025', operationType: 'DHI' },
    { dealId: '22008098310', name: 'Michael Brown', operationDate: '18/09/2025', operationType: 'Sapphire' },
    { dealId: '22008098311', name: 'Emma Wilson', operationDate: '22/09/2025', operationType: 'FUE' },
    { dealId: '22008098312', name: 'David Miller', operationDate: '28/09/2025', operationType: 'DHI' }
  ];

  const juneScheduledOperations = [
    { dealId: '22008098301', name: 'Ahmet Yılmaz', operationDate: '08/06/2025', operationType: 'FUE' },
    { dealId: '22008098302', name: 'Mehmet Demir', operationDate: '15/06/2025', operationType: 'Sapphire' },
    { dealId: '22008098303', name: 'Fatma Kaya', operationDate: '22/06/2025', operationType: 'DHI' }
  ];

  // Admin Mock Data
  const adminStats = {
    totalInfluencers: 247,
    activeInfluencers: 189,
    pendingApprovals: 12,
    totalLeads: 3840,
    totalOperations: 1247,
    totalRevenue: 892300,
    totalCommissions: 284500,
    pendingPayments: 47200,
    monthlyGrowth: 18.5
  };

  // Admin filtered data based on date filter
  const adminMonthlyData = {
    'june2025': {
      totalLeads: 892,
      totalOperations: 245,
      totalRevenue: 247800,
      totalCommissions: 84200,
      pendingPayments: 47200
    },
    'july2025': {
      totalLeads: 624,
      totalOperations: 178,
      totalRevenue: 189400,
      totalCommissions: 58400,
      pendingPayments: 32800
    },
    'may2025': {
      totalLeads: 768,
      totalOperations: 201,
      totalRevenue: 218900,
      totalCommissions: 69800,
      pendingPayments: 0
    }
  };

  // Admin leads by stage data
  const adminAllLeadsByStage = [
    { stage: 'New', count: 1245, value: 1867500 },
    { stage: 'First Contact', count: 892, value: 1338000 },
    { stage: 'Waiting for Info', count: 678, value: 1017000 },
    { stage: 'Offer Sent', count: 524, value: 786000 },
    { stage: 'Deposit Process', count: 389, value: 583500 },
    { stage: 'Operation Planning', count: 312, value: 468000 }
  ];

  const adminJuneLeadsByStage = [
    { stage: 'New', count: 285, value: 427500 },
    { stage: 'First Contact', count: 198, value: 297000 },
    { stage: 'Waiting for Info', count: 156, value: 234000 },
    { stage: 'Offer Sent', count: 124, value: 186000 },
    { stage: 'Deposit Process', count: 89, value: 133500 },
    { stage: 'Operation Planning', count: 76, value: 114000 }
  ];

  const topInfluencers = [
    { 
      name: 'Ayşe Yılmaz', 
      code: 'EstenoveAY100', 
      leads: 156, 
      operations: 89, 
      totalRevenue: 180000, 
      earnings: 45600, 
      status: 'active', 
      platforms: ['Instagram', 'YouTube'],
      email: 'ayse@influencer.com',
      phone: '+90 555 123 4567',
      joinDate: '15 Ocak 2024',
      avatar: 'https://via.placeholder.com/150',
      detailStats: {
        totalLeads: 156,
        totalEarnings: 45600,
        pendingPayments: 8400,
        operations: 89
      },
      monthlyEarnings: [
        { month: 'Oca', earnings: 5500, status: 'Ödendi' },
        { month: 'Şub', earnings: 7200, status: 'Ödendi' },
        { month: 'Mar', earnings: 6800, status: 'Ödendi' },
        { month: 'Nis', earnings: 9200, status: 'Ödendi' },
        { month: 'May', earnings: 8400, status: 'Ödendi' },
        { month: 'Haz', earnings: 8500, status: 'Bekliyor' }
      ],
      leadsByStage: [
        { stage: 'New', count: 25, value: 37500 },
        { stage: 'First Contact', count: 18, value: 27000 },
        { stage: 'Waiting for Info', count: 15, value: 22500 },
        { stage: 'Offer Sent', count: 12, value: 18000 },
        { stage: 'Deposit Process', count: 14, value: 21000 },
        { stage: 'Operation Planning', count: 16, value: 24000 }
      ]
    },
    { 
      name: 'Mehmet Demir', 
      code: 'EstenoveMD85', 
      leads: 142, 
      operations: 78, 
      totalRevenue: 155600, 
      earnings: 38900, 
      status: 'active', 
      platforms: ['TikTok', 'YouTube'],
      email: 'mehmet@influencer.com',
      phone: '+90 555 987 6543',
      joinDate: '22 Ocak 2024',
      avatar: 'https://via.placeholder.com/150',
      detailStats: {
        totalLeads: 142,
        totalEarnings: 38900,
        pendingPayments: 6200,
        operations: 78
      },
      monthlyEarnings: [
        { month: 'Oca', earnings: 4800, status: 'Ödendi' },
        { month: 'Şub', earnings: 6400, status: 'Ödendi' },
        { month: 'Mar', earnings: 5900, status: 'Ödendi' },
        { month: 'Nis', earnings: 8100, status: 'Ödendi' },
        { month: 'May', earnings: 7500, status: 'Ödendi' },
        { month: 'Haz', earnings: 6200, status: 'Bekliyor' }
      ],
      leadsByStage: [
        { stage: 'New', count: 22, value: 33000 },
        { stage: 'First Contact', count: 16, value: 24000 },
        { stage: 'Waiting for Info', count: 13, value: 19500 },
        { stage: 'Offer Sent', count: 10, value: 15000 },
        { stage: 'Deposit Process', count: 12, value: 18000 },
        { stage: 'Operation Planning', count: 14, value: 21000 }
      ]
    },
    { 
      name: 'Sarah Johnson', 
      code: 'EstenoveSJ92', 
      leads: 128, 
      operations: 71, 
      totalRevenue: 140800, 
      earnings: 35200, 
      status: 'active', 
      platforms: ['Instagram', 'TikTok'],
      email: 'sarah@influencer.com',
      phone: '+1 555 123 4567',
      joinDate: '28 Ocak 2024',
      avatar: 'https://via.placeholder.com/150',
      detailStats: {
        totalLeads: 128,
        totalEarnings: 35200,
        pendingPayments: 5800,
        operations: 71
      },
      monthlyEarnings: [
        { month: 'Oca', earnings: 4200, status: 'Ödendi' },
        { month: 'Şub', earnings: 5800, status: 'Ödendi' },
        { month: 'Mar', earnings: 5200, status: 'Ödendi' },
        { month: 'Nis', earnings: 7400, status: 'Ödendi' },
        { month: 'May', earnings: 6000, status: 'Ödendi' },
        { month: 'Haz', earnings: 5800, status: 'Bekliyor' }
      ],
      leadsByStage: [
        { stage: 'New', count: 20, value: 30000 },
        { stage: 'First Contact', count: 14, value: 21000 },
        { stage: 'Waiting for Info', count: 11, value: 16500 },
        { stage: 'Offer Sent', count: 8, value: 12000 },
        { stage: 'Deposit Process', count: 10, value: 15000 },
        { stage: 'Operation Planning', count: 12, value: 18000 }
      ]
    },
    { 
      name: 'Emma Wilson', 
      code: 'EstenoveEW77', 
      leads: 115, 
      operations: 64, 
      totalRevenue: 127200, 
      earnings: 31800, 
      status: 'active', 
      platforms: ['YouTube'],
      email: 'emma@influencer.com',
      phone: '+44 555 123 4567',
      joinDate: '05 Şubat 2024',
      avatar: 'https://via.placeholder.com/150',
      detailStats: {
        totalLeads: 115,
        totalEarnings: 31800,
        pendingPayments: 5400,
        operations: 64
      },
      monthlyEarnings: [
        { month: 'Oca', earnings: 3800, status: 'Ödendi' },
        { month: 'Şub', earnings: 5200, status: 'Ödendi' },
        { month: 'Mar', earnings: 4900, status: 'Ödendi' },
        { month: 'Nis', earnings: 6800, status: 'Ödendi' },
        { month: 'May', earnings: 5700, status: 'Ödendi' },
        { month: 'Haz', earnings: 5400, status: 'Bekliyor' }
      ],
      leadsByStage: [
        { stage: 'New', count: 18, value: 27000 },
        { stage: 'First Contact', count: 13, value: 19500 },
        { stage: 'Waiting for Info', count: 10, value: 15000 },
        { stage: 'Offer Sent', count: 7, value: 10500 },
        { stage: 'Deposit Process', count: 9, value: 13500 },
        { stage: 'Operation Planning', count: 11, value: 16500 }
      ]
    },
    { 
      name: 'David Miller', 
      code: 'EstenoveDM63', 
      leads: 98, 
      operations: 52, 
      totalRevenue: 113600, 
      earnings: 28400, 
      status: 'active', 
      platforms: ['Instagram'],
      email: 'david@influencer.com',
      phone: '+1 555 987 6543',
      joinDate: '12 Şubat 2024',
      avatar: 'https://via.placeholder.com/150',
      detailStats: {
        totalLeads: 98,
        totalEarnings: 28400,
        pendingPayments: 4200,
        operations: 52
      },
      monthlyEarnings: [
        { month: 'Oca', earnings: 3200, status: 'Ödendi' },
        { month: 'Şub', earnings: 4600, status: 'Ödendi' },
        { month: 'Mar', earnings: 4100, status: 'Ödendi' },
        { month: 'Nis', earnings: 5800, status: 'Ödendi' },
        { month: 'May', earnings: 4500, status: 'Ödendi' },
        { month: 'Haz', earnings: 4200, status: 'Bekliyor' }
      ],
      leadsByStage: [
        { stage: 'New', count: 15, value: 22500 },
        { stage: 'First Contact', count: 11, value: 16500 },
        { stage: 'Waiting for Info', count: 8, value: 12000 },
        { stage: 'Offer Sent', count: 6, value: 9000 },
        { stage: 'Deposit Process', count: 7, value: 10500 },
        { stage: 'Operation Planning', count: 9, value: 13500 }
      ]
    }
  ];

  const promoCodesData = [
    { code: 'EstenoveAY100', influencer: 'Ayşe Yılmaz', uses: 156, conversions: 89, totalRevenue: 180000, totalCommissions: 45600, status: 'active', created: '15 Oca 2024' },
    { code: 'EstenoveMD85', influencer: 'Mehmet Demir', uses: 142, conversions: 78, totalRevenue: 155600, totalCommissions: 38900, status: 'active', created: '22 Oca 2024' },
    { code: 'EstenoveSJ92', influencer: 'Sarah Johnson', uses: 128, conversions: 71, totalRevenue: 140800, totalCommissions: 35200, status: 'active', created: '28 Oca 2024' },
    { code: 'EstenoveEW77', influencer: 'Emma Wilson', uses: 115, conversions: 64, totalRevenue: 127200, totalCommissions: 31800, status: 'active', created: '05 Şub 2024' },
    { code: 'EstenoveDM63', influencer: 'David Miller', uses: 98, conversions: 52, totalRevenue: 113600, totalCommissions: 28400, status: 'active', created: '12 Şub 2024' },
    { code: 'EstenoveFK44', influencer: 'Fatma Kaya', uses: 85, conversions: 45, totalRevenue: 88400, totalCommissions: 22100, status: 'paused', created: '18 Şub 2024' },
    { code: 'EstenoveAK22', influencer: 'Ali Korkmaz', uses: 76, conversions: 38, totalRevenue: 75600, totalCommissions: 18900, status: 'active', created: '25 Şub 2024' }
  ];

  const pendingPayments = [
    { influencer: 'Ayşe Yılmaz', amount: 8400, period: 'Temmuz 2025', leads: 18, status: 'pending' },
    { influencer: 'Mehmet Demir', amount: 7200, period: 'Temmuz 2025', leads: 16, status: 'pending' },
    { influencer: 'Sarah Johnson', amount: 6800, period: 'Temmuz 2025', leads: 14, status: 'pending' },
    { influencer: 'Emma Wilson', amount: 5900, period: 'Temmuz 2025', leads: 12, status: 'pending' },
    { influencer: 'David Miller', amount: 4800, period: 'Temmuz 2025', leads: 10, status: 'pending' }
  ];

  const platformDistribution = [
    { platform: 'Instagram', count: 156, percentage: 63.2 },
    { platform: 'YouTube', count: 98, percentage: 39.7 },
    { platform: 'TikTok', count: 89, percentage: 36.0 },
    { platform: 'Twitter', count: 34, percentage: 13.8 }
  ];

  // Finance Panel Mock Data
  const financeStats = {
    approvedPayments: 47200,
    pendingTransfers: 32800,
    completedToday: 18500,
    monthlyBudget: 125000,
    totalProcessed: 284500,
    failedPayments: 2400,
    avgProcessingTime: '2.3',
    activePaymentMethods: 4
  };

  const approvedPayments = [
    { 
      id: 'PAY-001', 
      influencer: 'Ayşe Yılmaz', 
      amount: 8400, 
      currency: 'EUR',
      period: 'Temmuz 2025', 
      approvedBy: 'Admin User',
      approvedDate: '2025-07-15',
      dueDate: '2025-07-20',
      status: 'approved',
      paymentMethod: 'bank_transfer',
      bankAccount: 'TR33 0006 1005 1978 6457 8413 26',
      leads: 18,
      priority: 'normal'
    },
    { 
      id: 'PAY-002', 
      influencer: 'Mehmet Demir', 
      amount: 7200, 
      currency: 'EUR',
      period: 'Temmuz 2025', 
      approvedBy: 'Admin User',
      approvedDate: '2025-07-15',
      dueDate: '2025-07-22',
      status: 'processing',
      paymentMethod: 'wire_transfer',
      bankAccount: 'TR64 0004 6006 8876 5432 1098 76',
      leads: 16,
      priority: 'high'
    },
    { 
      id: 'PAY-003', 
      influencer: 'Sarah Johnson', 
      amount: 6800, 
      currency: 'EUR',
      period: 'Temmuz 2025', 
      approvedBy: 'Admin User',
      approvedDate: '2025-07-14',
      dueDate: '2025-07-19',
      status: 'approved',
      paymentMethod: 'paypal',
      bankAccount: 'sarah.johnson@paypal.com',
      leads: 14,
      priority: 'urgent'
    },
    { 
      id: 'PAY-004', 
      influencer: 'Emma Wilson', 
      amount: 5900, 
      currency: 'EUR',
      period: 'Temmuz 2025', 
      approvedBy: 'Admin User',
      approvedDate: '2025-07-16',
      dueDate: '2025-07-25',
      status: 'scheduled',
      paymentMethod: 'bank_transfer',
      bankAccount: 'GB29 NWBK 6016 1331 9268 19',
      leads: 12,
      priority: 'normal'
    },
    { 
      id: 'PAY-005', 
      influencer: 'David Miller', 
      amount: 4800, 
      currency: 'EUR',
      period: 'Temmuz 2025', 
      approvedBy: 'Admin User',
      approvedDate: '2025-07-16',
      dueDate: '2025-07-23',
      status: 'failed',
      paymentMethod: 'wire_transfer',
      bankAccount: 'US64 BOFA 0123 4567 8901 2345',
      leads: 10,
      priority: 'normal',
      failureReason: 'Invalid account number'
    }
  ];

  const paymentHistory = [
    { id: 'PAY-H-001', influencer: 'Fatma Kaya', amount: 6200, date: '2025-07-10', status: 'completed', method: 'bank_transfer' },
    { id: 'PAY-H-002', influencer: 'Ali Korkmaz', amount: 4500, date: '2025-07-09', status: 'completed', method: 'paypal' },
    { id: 'PAY-H-003', influencer: 'Zeynep Öz', amount: 7800, date: '2025-07-08', status: 'completed', method: 'wire_transfer' },
    { id: 'PAY-H-004', influencer: 'Burak Yıldız', amount: 5400, date: '2025-07-07', status: 'failed', method: 'bank_transfer' },
    { id: 'PAY-H-005', influencer: 'Selin Kaya', amount: 9200, date: '2025-07-06', status: 'completed', method: 'bank_transfer' }
  ];

  const bankAccounts = [
    { 
      id: 'BA-001', 
      name: 'Estenove Main Account', 
      bank: 'Türkiye İş Bankası', 
      iban: 'TR33 0006 4000 0011 2345 6789 01',
      balance: 285000,
      currency: 'EUR',
      status: 'active',
      type: 'business'
    },
    { 
      id: 'BA-002', 
      name: 'International Payments', 
      bank: 'HSBC Turkey', 
      iban: 'TR64 0012 3000 0000 1234 5678 90',
      balance: 145000,
      currency: 'USD',
      status: 'active',
      type: 'business'
    },
    { 
      id: 'BA-003', 
      name: 'EU Payments Account', 
      bank: 'Deutsche Bank', 
      iban: 'DE89 3704 0044 0532 0130 00',
      balance: 95000,
      currency: 'EUR',
      status: 'active',
      type: 'international'
    }
  ];

  const cashFlow = [
    { month: 'Oca', income: 185000, expenses: 45000, netFlow: 140000 },
    { month: 'Şub', income: 198000, expenses: 52000, netFlow: 146000 },
    { month: 'Mar', income: 175000, expenses: 48000, netFlow: 127000 },
    { month: 'Nis', income: 205000, expenses: 58000, netFlow: 147000 },
    { month: 'May', income: 192000, expenses: 54000, netFlow: 138000 },
    { month: 'Haz', income: 218000, expenses: 61000, netFlow: 157000 },
    { month: 'Tem', income: 195000, expenses: 47000, netFlow: 148000 }
  ];

  // State for filtered data
  const [statsData, setStatsData] = useState(allTimeStats);
  const [leadsByStage, setLeadsByStage] = useState(allLeadsByStage);
  const [scheduledOperations, setScheduledOperations] = useState(allScheduledOperations);
  const [adminStatsData, setAdminStatsData] = useState(adminStats);
  const [adminLeadsByStage, setAdminLeadsByStage] = useState(adminAllLeadsByStage);

  // Date filter options
  const dateFilterOptions = [
    { value: 'all', label: 'Tüm Zamanlar' },
    { value: 'june2025', label: 'Haziran 2025' },
    { value: 'july2025', label: 'Temmuz 2025' },
    { value: 'may2025', label: 'Mayıs 2025' },
    { value: 'last30days', label: 'Son 30 Gün' },
    { value: 'last90days', label: 'Son 90 Gün' }
  ];

  // Update data based on filter
  useEffect(() => {
    if (dateFilter === 'all') {
      setStatsData(allTimeStats);
      setLeadsByStage(allLeadsByStage);
      setScheduledOperations(allScheduledOperations);
      setAdminStatsData(adminStats);
      setAdminLeadsByStage(adminAllLeadsByStage);
    } else if (dateFilter === 'june2025') {
      setStatsData(monthlyData.june2025);
      setLeadsByStage(juneLeadsByStage);
      setScheduledOperations(juneScheduledOperations);
      setAdminStatsData({ ...adminStats, ...adminMonthlyData.june2025 });
      setAdminLeadsByStage(adminJuneLeadsByStage);
    } else if (dateFilter === 'july2025') {
      setStatsData(monthlyData.july2025);
      setLeadsByStage(juneLeadsByStage.map(item => ({ ...item, count: Math.floor(item.count * 0.75) })));
      setScheduledOperations(allScheduledOperations.slice(0, 3));
      setAdminStatsData({ ...adminStats, ...adminMonthlyData.july2025 });
      setAdminLeadsByStage(adminJuneLeadsByStage.map(item => ({ ...item, count: Math.floor(item.count * 0.7) })));
    } else if (dateFilter === 'may2025') {
      setStatsData(monthlyData.may2025);
      setLeadsByStage(juneLeadsByStage.map(item => ({ ...item, count: Math.floor(item.count * 0.9) })));
      setScheduledOperations(allScheduledOperations.slice(1, 4));
      setAdminStatsData({ ...adminStats, ...adminMonthlyData.may2025 });
      setAdminLeadsByStage(adminJuneLeadsByStage.map(item => ({ ...item, count: Math.floor(item.count * 0.85) })));
    }
  }, [dateFilter]);

  // Monthly earnings (filter independent)
  const monthlyEarnings = [
    { month: 'Oca', earnings: 8500, status: 'Ödendi' },
    { month: 'Şub', earnings: 12300, status: 'Ödendi' },
    { month: 'Mar', earnings: 9800, status: 'Ödendi' },
    { month: 'Nis', earnings: 15200, status: 'Ödendi' },
    { month: 'May', earnings: 11400, status: 'Ödendi' },
    { month: 'Haz', earnings: 13500, status: 'Bekliyor' },
    { month: 'Tem', earnings: 8400, status: 'İşlemde' }
  ];

  // Content tasks by category
  const contentTasksByCategory = {
    all: [
      // Reviews
      { id: 1, type: 'reddit', title: 'Reddit - Deneyim Paylaşımı', dueDate: '26 Tem 2025', status: 'pending', earning: 150, category: 'reviews' },
      { id: 2, type: 'google', title: 'Google Review - 5 Yıldız', dueDate: '28 Tem 2025', status: 'completed', earning: 100, category: 'reviews' },
      { id: 3, type: 'trustpilot', title: 'Trustpilot - Detaylı İnceleme', dueDate: '30 Tem 2025', status: 'pending', earning: 120, category: 'reviews' },
      { id: 4, type: 'reddit', title: 'Reddit AMA - Soru Cevap', dueDate: '02 Ağu 2025', status: 'pending', earning: 200, category: 'reviews' },
      // YouTube
      { id: 5, type: 'youtube', title: 'Deneyim Videosu - Operasyon Öncesi', dueDate: '25 Tem 2025', status: 'completed', earning: 300, category: 'youtube' },
      { id: 6, type: 'youtube', title: 'Sonuç Videosu - 3 Ay Sonra', dueDate: '15 Ağu 2025', status: 'pending', earning: 400, category: 'youtube' },
      // Instagram
      { id: 7, type: 'instagram', title: 'Klinik Tanıtım Postu', dueDate: '20 Tem 2025', status: 'completed', earning: 100, category: 'instagram' },
      { id: 8, type: 'instagram', title: 'Hasta Hikayeleri - Reels', dueDate: '22 Tem 2025', status: 'pending', earning: 150, category: 'instagram' },
      { id: 9, type: 'instagram', title: 'Before/After Karşılaştırma', dueDate: '28 Tem 2025', status: 'pending', earning: 200, category: 'instagram' },
      { id: 10, type: 'instagram', title: 'Story Serisi - Tedavi Süreci', dueDate: '30 Tem 2025', status: 'completed', earning: 80, category: 'instagram' },
      // TikTok
      { id: 11, type: 'tiktok', title: 'Tedavi Süreci Videosu', dueDate: '18 Tem 2025', status: 'completed', earning: 200, category: 'tiktok' },
      { id: 12, type: 'tiktok', title: 'Klinik Turu - Short Video', dueDate: '23 Tem 2025', status: 'completed', earning: 200, category: 'tiktok' },
      { id: 13, type: 'tiktok', title: 'Q&A - Sıkça Sorulan Sorular', dueDate: '01 Ağu 2025', status: 'pending', earning: 180, category: 'tiktok' },
      // Success Stories
      { id: 14, type: 'story', title: 'Başarı Hikayem - Detaylı Anlatım', dueDate: '05 Ağu 2025', status: 'pending', earning: 350, category: 'stories' },
      { id: 15, type: 'story', title: 'Fotoğraflı Günlük - 30 Gün', dueDate: '10 Ağu 2025', status: 'pending', earning: 250, category: 'stories' },
      // Blog
      { id: 16, type: 'blog', title: 'Sağlık Turizmi Deneyimim', dueDate: '30 Tem 2025', status: 'pending', earning: 300, category: 'blog' },
      { id: 17, type: 'blog', title: 'Türkiye\'de Tedavi Rehberi', dueDate: '08 Ağu 2025', status: 'completed', earning: 280, category: 'blog' },
      { id: 18, type: 'blog', title: 'Maliyet Karşılaştırması', dueDate: '12 Ağu 2025', status: 'pending', earning: 250, category: 'blog' }
    ],
    reviews: [
      { id: 1, type: 'reddit', title: 'Reddit - Deneyim Paylaşımı', dueDate: '26 Tem 2025', status: 'pending', earning: 150, platform: 'Reddit' },
      { id: 2, type: 'google', title: 'Google Review - 5 Yıldız', dueDate: '28 Tem 2025', status: 'completed', earning: 100, platform: 'Google' },
      { id: 3, type: 'trustpilot', title: 'Trustpilot - Detaylı İnceleme', dueDate: '30 Tem 2025', status: 'pending', earning: 120, platform: 'Trustpilot' },
      { id: 4, type: 'reddit', title: 'Reddit AMA - Soru Cevap', dueDate: '02 Ağu 2025', status: 'pending', earning: 200, platform: 'Reddit' }
    ],
    youtube: [
      { id: 1, type: 'youtube', title: 'Deneyim Videosu - Operasyon Öncesi', dueDate: '25 Tem 2025', status: 'completed', earning: 300 },
      { id: 2, type: 'youtube', title: 'Sonuç Videosu - 3 Ay Sonra', dueDate: '15 Ağu 2025', status: 'pending', earning: 400 }
    ],
    instagram: [
      { id: 1, type: 'instagram', title: 'Klinik Tanıtım Postu', dueDate: '20 Tem 2025', status: 'completed', earning: 100 },
      { id: 2, type: 'instagram', title: 'Hasta Hikayeleri - Reels', dueDate: '22 Tem 2025', status: 'pending', earning: 150 },
      { id: 3, type: 'instagram', title: 'Before/After Karşılaştırma', dueDate: '28 Tem 2025', status: 'pending', earning: 200 },
      { id: 4, type: 'instagram', title: 'Story Serisi - Tedavi Süreci', dueDate: '30 Tem 2025', status: 'completed', earning: 80 }
    ],
    tiktok: [
      { id: 1, type: 'tiktok', title: 'Tedavi Süreci Videosu', dueDate: '18 Tem 2025', status: 'completed', earning: 200 },
      { id: 2, type: 'tiktok', title: 'Klinik Turu - Short Video', dueDate: '23 Tem 2025', status: 'completed', earning: 200 },
      { id: 3, type: 'tiktok', title: 'Q&A - Sıkça Sorulan Sorular', dueDate: '01 Ağu 2025', status: 'pending', earning: 180 }
    ],
    stories: [
      { id: 1, type: 'story', title: 'Başarı Hikayem - Detaylı Anlatım', dueDate: '05 Ağu 2025', status: 'pending', earning: 350 },
      { id: 2, type: 'story', title: 'Fotoğraflı Günlük - 30 Gün', dueDate: '10 Ağu 2025', status: 'pending', earning: 250 }
    ],
    blog: [
      { id: 1, type: 'blog', title: 'Sağlık Turizmi Deneyimim', dueDate: '30 Tem 2025', status: 'pending', earning: 300 },
      { id: 2, type: 'blog', title: 'Türkiye\'de Tedavi Rehberi', dueDate: '08 Ağu 2025', status: 'completed', earning: 280 },
      { id: 3, type: 'blog', title: 'Maliyet Karşılaştırması', dueDate: '12 Ağu 2025', status: 'pending', earning: 250 }
    ]
  };

  const contentTasks = contentTasksByCategory[activeContentTab] || contentTasksByCategory.all;

  const CHART_COLORS = [colors.primary, colors.accentBlue, colors.accentMedium, colors.secondary, colors.accentLight, '#94a3b8'];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Ödendi': return 'text-green-600 bg-green-50';
      case 'Bekliyor': return 'text-yellow-600 bg-yellow-50';
      case 'İşlemde': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getContentIcon = (type) => {
    switch(type) {
      case 'youtube': return <Video className="w-5 h-5 text-red-500" />;
      case 'instagram': return <Camera className="w-5 h-5 text-pink-500" />;
      case 'tiktok': return <Video className="w-5 h-5 text-black" />;
      case 'facebook': return <FileText className="w-5 h-5" style={{color: colors.primary}} />;
      case 'reddit': return <FileText className="w-5 h-5 text-orange-500" />;
      case 'google': return <FileText className="w-5 h-5 text-green-600" />;
      case 'trustpilot': return <FileText className="w-5 h-5 text-teal-600" />;
      case 'blog': return <FileText className="w-5 h-5" style={{color: colors.accentBlue}} />;
      case 'story': return <FileText className="w-5 h-5" style={{color: '#8b5cf6'}} />;
      default: return <FileText className="w-5 h-5" style={{color: colors.textLight}} />;
    }
  };

  const getSocialMediaIcon = (platform) => {
    switch(platform) {
      case 'instagram': return <Camera className="w-5 h-5 text-pink-500" />;
      case 'youtube': return <Video className="w-5 h-5 text-red-500" />;
      case 'tiktok': return <Video className="w-5 h-5 text-black" />;
      case 'twitter': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'facebook': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'linkedin': return <FileText className="w-5 h-5 text-blue-700" />;
      default: return <FileText className="w-5 h-5" style={{color: colors.textLight}} />;
    }
  };

  const formatFollowerCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  const handleInfluencerClick = (influencer) => {
    setSelectedInfluencer(influencer);
    setActiveTab('overview');
  };

  const handleBackToAdmin = () => {
    setSelectedInfluencer(null);
    setActiveTab('admin');
  };

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'processing': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'approved': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'scheduled': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPaymentStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Tamamlandı';
      case 'processing': return 'İşleniyor';
      case 'approved': return 'Onaylandı';
      case 'scheduled': return 'Planlandı';
      case 'failed': return 'Başarısız';
      default: return 'Bilinmiyor';
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch(method) {
      case 'bank_transfer': return '🏦';
      case 'wire_transfer': return '💸';
      case 'paypal': return '💳';
      case 'crypto': return '₿';
      default: return '💰';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'normal': return 'text-gray-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const handlePaymentSelect = (paymentId) => {
    setSelectedPayments(prev => 
      prev.includes(paymentId) 
        ? prev.filter(id => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const formatCurrency = (amount, currency = 'EUR') => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // Get current data based on selected influencer or default profile
  const currentProfileData = selectedInfluencer || profileData;
  const currentStatsData = selectedInfluencer ? selectedInfluencer.detailStats : statsData;
  const currentMonthlyEarnings = selectedInfluencer ? selectedInfluencer.monthlyEarnings : monthlyEarnings;
  const currentLeadsByStage = selectedInfluencer ? selectedInfluencer.leadsByStage : leadsByStage;

  // Calculate content earnings
  const allContentTasks = contentTasksByCategory.all;
  const completedTasks = allContentTasks.filter(t => t.status === 'completed');
  const totalPotentialEarning = allContentTasks.reduce((sum, task) => sum + task.earning, 0);
  const earnedAmount = completedTasks.reduce((sum, task) => sum + task.earning, 0);
  const completionPercentage = (completedTasks.length / allContentTasks.length) * 100;

  // Calculate category completion stats
  const categoryStats = {
    reviews: {
      total: contentTasksByCategory.reviews.length,
      completed: contentTasksByCategory.reviews.filter(t => t.status === 'completed').length
    },
    youtube: {
      total: contentTasksByCategory.youtube.length,
      completed: contentTasksByCategory.youtube.filter(t => t.status === 'completed').length
    },
    instagram: {
      total: contentTasksByCategory.instagram.length,
      completed: contentTasksByCategory.instagram.filter(t => t.status === 'completed').length
    },
    tiktok: {
      total: contentTasksByCategory.tiktok.length,
      completed: contentTasksByCategory.tiktok.filter(t => t.status === 'completed').length
    },
    stories: {
      total: contentTasksByCategory.stories.length,
      completed: contentTasksByCategory.stories.filter(t => t.status === 'completed').length
    },
    blog: {
      total: contentTasksByCategory.blog.length,
      completed: contentTasksByCategory.blog.filter(t => t.status === 'completed').length
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bgColor }}>
      {/* Header */}
      <header className="shadow-lg" style={{ backgroundColor: colors.white, borderBottom: `1px solid ${colors.borderLight}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              {selectedInfluencer && (
                <button 
                  onClick={handleBackToAdmin}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-2"
                  style={{ color: colors.textLight }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
              )}
              <div className="relative">
                <img 
                  src={currentProfileData.avatar} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full ring-4"
                  style={{ '--tw-ring-color': colors.accentLight }}
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2" 
                  style={{ backgroundColor: colors.success, borderColor: colors.white }}></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: colors.textDark }}>
                  {selectedInfluencer ? `${selectedInfluencer.name} - Detay Görünümü` : `Hoşgeldin, ${currentProfileData.name}`}
                </h1>
                <p className="text-sm" style={{ color: colors.textLight }}>
                  Promo Kod: <span className="font-mono font-semibold" style={{ color: colors.primary }}>{currentProfileData.code}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:opacity-80 transition-opacity" style={{ color: colors.textLight }}>
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full" style={{ backgroundColor: colors.danger }}></span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all transform hover:scale-105"
                style={{ backgroundColor: colors.primary, color: colors.white }}>
                <Edit className="w-4 h-4" />
                <span>Profili Düzenle</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="shadow-sm" style={{ backgroundColor: colors.white }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {(selectedInfluencer ? ['overview', 'payments', 'content', 'profile'] : ['overview', 'payments', 'content', 'admin', 'finance', 'profile']).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all`}
                style={{
                  borderColor: activeTab === tab ? colors.primary : 'transparent',
                  color: activeTab === tab ? colors.primary : colors.textLight
                }}
              >
                {tab === 'overview' && 'Genel Bakış'}
                {tab === 'payments' && 'Ödemeler'}
                {tab === 'content' && 'İçerik Takibi'}
                {tab === 'admin' && 'Admin Paneli'}
                {tab === 'finance' && 'Finans Paneli'}
                {tab === 'profile' && 'Profil'}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Date Filter */}
            <div className="flex justify-end">
              <div className="relative">
                <button
                  onClick={() => setShowDateDropdown(!showDateDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  style={{ border: `1px solid ${colors.borderLight}` }}
                >
                  <Calendar className="w-4 h-4" style={{ color: colors.textLight }} />
                  <span style={{ color: colors.textDark }}>
                    {dateFilterOptions.find(opt => opt.value === dateFilter)?.label}
                  </span>
                  <ChevronDown className="w-4 h-4" style={{ color: colors.textLight }} />
                </button>
                
                {showDateDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
                    style={{ border: `1px solid ${colors.borderLight}` }}>
                    {dateFilterOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setDateFilter(option.value);
                          setShowDateDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                        style={{ 
                          color: dateFilter === option.value ? colors.primary : colors.textDark,
                          backgroundColor: dateFilter === option.value ? colors.secondary + '20' : 'transparent'
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow" 
                style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: colors.secondary }}>
                    <User className="w-6 h-6" style={{ color: colors.primary }} />
                  </div>
                  <span className="text-xs font-medium" style={{ color: colors.textLight }}>Toplam</span>
                </div>
                <h3 className="text-2xl font-bold" style={{ color: colors.textDark }}>{currentStatsData.totalLeads}</h3>
                <p className="text-sm mt-1" style={{ color: colors.textLight }}>Toplam Lead</p>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" style={{ color: colors.success }} />
                  <span className="font-medium" style={{ color: colors.success }}>+12%</span>
                  <span className="ml-1" style={{ color: colors.textLight }}>geçen aya göre</span>
                </div>
              </div>

              <div className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow" 
                style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: colors.accentLight }}>
                    <DollarSign className="w-6 h-6" style={{ color: colors.primary }} />
                  </div>
                  <span className="text-xs font-medium" style={{ color: colors.textLight }}>Kazanç</span>
                </div>
                <h3 className="text-2xl font-bold" style={{ color: colors.textDark }}>€{currentStatsData.totalEarnings.toLocaleString()}</h3>
                <p className="text-sm mt-1" style={{ color: colors.textLight }}>Toplam Kazanç</p>
                <div className="mt-4 flex items-center text-sm">
                  <span className="font-medium" style={{ color: colors.warning }}>€{currentStatsData.pendingPayments.toLocaleString()}</span>
                  <span className="ml-1" style={{ color: colors.textLight }}>bekliyor</span>
                </div>
              </div>

              <div className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow" 
                style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: colors.accentMedium + '30' }}>
                    <Activity className="w-6 h-6" style={{ color: colors.primary }} />
                  </div>
                  <span className="text-xs font-medium" style={{ color: colors.textLight }}>Operasyon</span>
                </div>
                <h3 className="text-2xl font-bold" style={{ color: colors.textDark }}>{currentStatsData.operations}</h3>
                <p className="text-sm mt-1" style={{ color: colors.textLight }}>Operasyon Sayısı</p>
                <div className="mt-4 flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 mr-1" style={{ color: colors.success }} />
                  <span className="font-medium" style={{ color: colors.success }}>Tamamlandı</span>
                </div>
              </div>

              <div className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow" 
                style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-purple-100">
                    <FileText className="w-6 h-6" style={{ color: '#8b5cf6' }} />
                  </div>
                  <span className="text-xs font-medium" style={{ color: colors.textLight }}>İçerik</span>
                </div>
                <h3 className="text-2xl font-bold" style={{ color: colors.textDark }}>€3,860</h3>
                <p className="text-sm mt-1" style={{ color: colors.textLight }}>İçerik Kazancı</p>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: colors.textLight }}>{completedTasks.length}/{allContentTasks.length} tamamlandı</span>
                    <span className="font-medium" style={{ color: '#8b5cf6' }}>€{earnedAmount.toLocaleString()} kazanıldı</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="h-2 rounded-full" 
                      style={{
                        width: `${completionPercentage}%`,
                        background: 'linear-gradient(to right, #8b5cf6, #a78bfa)'
                      }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Earnings Chart - Filter Independent */}
              <div className="rounded-2xl shadow-lg p-6" 
                style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold" style={{ color: colors.textDark }}>Aylık Kazanç Trendi</h2>
                  <button style={{ color: colors.textLight }} className="hover:opacity-70">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={currentMonthlyEarnings}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.borderLight} />
                    <XAxis dataKey="month" stroke={colors.textLight} fontSize={12} />
                    <YAxis stroke={colors.textLight} fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: colors.white, 
                        border: `1px solid ${colors.borderLight}`,
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="earnings" 
                      stroke={colors.primary} 
                      strokeWidth={3}
                      dot={{ fill: colors.primary, r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Leads by Stage - Filter Dependent */}
              <div className="rounded-2xl shadow-lg p-6" 
                style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold" style={{ color: colors.textDark }}>Lead Durumları</h2>
                  <span className="text-sm" style={{ color: colors.textLight }}>
                    {dateFilterOptions.find(opt => opt.value === dateFilter)?.label}
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={currentLeadsByStage}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ stage, count }) => `${stage}: ${count}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {currentLeadsByStage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Scheduled Operations Table */}
            <div className="rounded-2xl shadow-lg" 
              style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
              <div className="p-6" style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                <h3 className="text-lg font-semibold" style={{ color: colors.textDark }}>Operations Scheduled This Month</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                        style={{ color: colors.textLight }}>DEAL ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                        style={{ color: colors.textLight }}>CONTACT</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                        style={{ color: colors.textLight }}>OPERATION DATE</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                        style={{ color: colors.textLight }}>OPERATION TYPE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ '--tw-divide-color': colors.borderLight }}>
                    {scheduledOperations.map((operation, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" 
                          style={{ color: colors.textDark }}>
                          {operation.dealId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" 
                          style={{ color: colors.textDark }}>
                          {operation.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" 
                          style={{ color: colors.textDark }}>
                          {operation.operationDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" 
                          style={{ color: colors.primary }}>
                          {operation.operationType}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity - Filter Independent */}
            <div className="rounded-2xl shadow-lg p-6" 
              style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
              <h2 className="text-lg font-semibold mb-6" style={{ color: colors.textDark }}>Son Aktiviteler</h2>
              <div className="space-y-4">
                {[
                  { type: 'lead', text: 'Yeni lead geldi: Mehmet K.', time: '2 saat önce', icon: User },
                  { type: 'payment', text: '€2,300 ödeme onaylandı', time: '5 saat önce', icon: DollarSign },
                  { type: 'content', text: 'YouTube videosu yayınlandı', time: '1 gün önce', icon: Video },
                  { type: 'lead', text: 'Lead operasyon aşamasına geçti', time: '2 gün önce', icon: CheckCircle }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg transition-colors hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg`} style={{
                        backgroundColor: activity.type === 'lead' ? colors.secondary :
                                       activity.type === 'payment' ? '#e8f5e9' :
                                       colors.accentLight
                      }}>
                        <activity.icon className="w-5 h-5" style={{
                          color: activity.type === 'lead' ? colors.primary :
                                activity.type === 'payment' ? colors.success :
                                colors.accentBlue
                        }} />
                      </div>
                      <span style={{ color: colors.textDark }}>{activity.text}</span>
                    </div>
                    <span className="text-sm" style={{ color: colors.textLight }}>{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="rounded-2xl shadow-lg p-8 text-white"
              style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accentBlue} 100%)` }}>
              <h2 className="text-2xl font-bold mb-6">Ödeme Özeti</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm opacity-80">Toplam Kazanç</p>
                  <p className="text-3xl font-bold mt-1">€{allTimeStats.totalEarnings.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Ödenen</p>
                  <p className="text-3xl font-bold mt-1">€{(allTimeStats.totalEarnings - allTimeStats.pendingPayments).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Bekleyen</p>
                  <p className="text-3xl font-bold mt-1">€{allTimeStats.pendingPayments.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Monthly Payments Table */}
            <div className="rounded-2xl shadow-lg" 
              style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
              <div className="p-6" style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                <h3 className="text-lg font-semibold" style={{ color: colors.textDark }}>Aylık Ödemeler</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                        style={{ color: colors.textLight }}>Ay</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                        style={{ color: colors.textLight }}>Kazanç</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                        style={{ color: colors.textLight }}>Durum</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                        style={{ color: colors.textLight }}>İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ '--tw-divide-color': colors.borderLight }}>
                    {monthlyEarnings.map((month, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" 
                          style={{ color: colors.textDark }}>
                          {month.month} 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold" 
                          style={{ color: colors.textDark }}>
                          €{month.earnings.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(month.status)}`}>
                            {month.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="font-medium hover:opacity-80" style={{ color: colors.primary }}>
                            Detaylar <ChevronRight className="inline w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Content Earnings Summary */}
            <div className="rounded-2xl shadow-lg p-8 text-white"
              style={{ background: `linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)` }}>
              <h2 className="text-2xl font-bold mb-6">İçerik Kazanç Özeti</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <p className="text-sm opacity-80">Potansiyel Kazanç</p>
                  <p className="text-3xl font-bold mt-1">€{totalPotentialEarning.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Kazanılan</p>
                  <p className="text-3xl font-bold mt-1">€{earnedAmount.toLocaleString()}</p>
                  <p className="text-sm opacity-80 mt-1">{completedTasks.length} görev tamamlandı</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Bekleyen</p>
                  <p className="text-3xl font-bold mt-1">€{(totalPotentialEarning - earnedAmount).toLocaleString()}</p>
                  <p className="text-sm opacity-80 mt-1">{allContentTasks.length - completedTasks.length} görev kaldı</p>
                </div>
              </div>
              
              {/* Task Completion Summary */}
              <div className="border-t border-white border-opacity-20 pt-6">
                <h3 className="text-lg font-semibold mb-4 opacity-90">Görev Tamamlanma Durumu</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="text-center">
                    <p className="text-sm opacity-80">Toplam</p>
                    <p className="text-xl font-bold">{allContentTasks.length}/{completedTasks.length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm opacity-80">Reviews</p>
                    <p className="text-xl font-bold">{categoryStats.reviews.total}/{categoryStats.reviews.completed}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm opacity-80">YouTube</p>
                    <p className="text-xl font-bold">{categoryStats.youtube.total}/{categoryStats.youtube.completed}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm opacity-80">Instagram</p>
                    <p className="text-xl font-bold">{categoryStats.instagram.total}/{categoryStats.instagram.completed}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm opacity-80">TikTok</p>
                    <p className="text-xl font-bold">{categoryStats.tiktok.total}/{categoryStats.tiktok.completed}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm opacity-80">Success Stories</p>
                    <p className="text-xl font-bold">{categoryStats.stories.total}/{categoryStats.stories.completed}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Category Tabs */}
            <div className="bg-white rounded-2xl shadow-lg" style={{ border: `1px solid ${colors.borderLight}` }}>
              <div className="border-b" style={{ borderColor: colors.borderLight }}>
                <nav className="flex space-x-8 px-6">
                  {[
                    { key: 'all', label: 'Tümü' },
                    { key: 'reviews', label: 'Reviews' },
                    { key: 'youtube', label: 'YouTube' },
                    { key: 'instagram', label: 'Instagram' },
                    { key: 'tiktok', label: 'TikTok' },
                    { key: 'stories', label: 'Success Stories' },
                    { key: 'blog', label: 'Blog' }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveContentTab(tab.key)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-all`}
                      style={{
                        borderColor: activeContentTab === tab.key ? '#8b5cf6' : 'transparent',
                        color: activeContentTab === tab.key ? '#8b5cf6' : colors.textLight
                      }}
                    >
                      {tab.label}
                      <span className="ml-2 text-xs px-2 py-1 rounded-full"
                        style={{ 
                          backgroundColor: activeContentTab === tab.key ? '#8b5cf6' + '20' : colors.borderLight,
                          color: activeContentTab === tab.key ? '#8b5cf6' : colors.textLight
                        }}>
                        {contentTasksByCategory[tab.key]?.length || 0}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Content Tasks List */}
              <div className="divide-y" style={{ '--tw-divide-color': colors.borderLight }}>
                {contentTasks.map((task) => (
                  <div key={`${task.category}-${task.id}`} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getContentIcon(task.type)}
                        <div className="flex-1">
                          <h4 className="text-sm font-medium" style={{ color: colors.textDark }}>{task.title}</h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <p className="text-sm" style={{ color: colors.textLight }}>Son Teslim: {task.dueDate}</p>
                            {task.platform && (
                              <span className="text-xs px-2 py-1 rounded-full"
                                style={{ 
                                  backgroundColor: colors.secondary + '40',
                                  color: colors.primary
                                }}>
                                {task.platform}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold" style={{ color: '#8b5cf6' }}>€{task.earning}</span>
                        {task.status === 'completed' ? (
                          <div className="flex items-center space-x-2">
                            <span className="flex items-center" style={{ color: colors.success }}>
                              <CheckCircle className="w-5 h-5 mr-1" />
                              Tamamlandı
                            </span>
                            <button className="text-sm underline" style={{ color: colors.primary }}>
                              Görüntüle
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="flex items-center" style={{ color: colors.warning }}>
                              <Clock className="w-5 h-5 mr-1" />
                              Bekliyor
                            </span>
                            {activeContentTab === 'reviews' ? (
                              <div className="flex space-x-2">
                                <button className="px-3 py-2 text-white rounded-lg transition-colors text-sm font-medium"
                                  style={{ backgroundColor: colors.primary }}>
                                  Link Ekle
                                </button>
                                <button className="px-3 py-2 border rounded-lg transition-colors text-sm font-medium"
                                  style={{ borderColor: colors.primary, color: colors.primary }}>
                                  Görsel Yükle
                                </button>
                              </div>
                            ) : (
                              <button className="px-4 py-2 text-white rounded-lg transition-colors text-sm font-medium"
                                style={{ backgroundColor: colors.primary }}>
                                Yükle
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {contentTasks.length === 0 && (
                  <div className="p-12 text-center">
                    <p style={{ color: colors.textLight }}>Bu kategoride henüz görev bulunmuyor.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Motivational Message */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border"
              style={{ borderColor: colors.borderLight }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: colors.textDark }}>
                    Harika gidiyorsun! 🎉
                  </h3>
                  <p className="mt-1" style={{ color: colors.textLight }}>
                    {completedTasks.length > 0 
                      ? `${completedTasks.length} görevi tamamladın ve €${earnedAmount.toLocaleString()} kazandın. Devam et!`
                      : 'İlk görevini tamamlayarak kazanmaya başla!'}
                  </p>
                </div>
                <div className="text-4xl">
                  {completionPercentage >= 75 ? '🏆' : completionPercentage >= 50 ? '💪' : '🚀'}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admin' && !selectedInfluencer && (
          <div className="space-y-6">
            {/* Admin Sub Navigation */}
            <div className="bg-white rounded-2xl shadow-lg" style={{ border: `1px solid ${colors.borderLight}` }}>
              <div className="border-b" style={{ borderColor: colors.borderLight }}>
                <nav className="flex space-x-8 px-6">
                  {[
                    { key: 'dashboard', label: 'Genel Bakış' },
                    { key: 'influencers', label: 'Influencer Yönetimi' },
                    { key: 'promocodes', label: 'Promo Kodları' },
                    { key: 'payments', label: 'Ödeme Yönetimi' }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveAdminTab(tab.key)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-all`}
                      style={{
                        borderColor: activeAdminTab === tab.key ? colors.primary : 'transparent',
                        color: activeAdminTab === tab.key ? colors.primary : colors.textLight
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Admin Dashboard */}
            {activeAdminTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Date Filter */}
                <div className="flex justify-end">
                  <div className="relative">
                    <button
                      onClick={() => setShowDateDropdown(!showDateDropdown)}
                      className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                      style={{ border: `1px solid ${colors.borderLight}` }}
                    >
                      <Calendar className="w-4 h-4" style={{ color: colors.textLight }} />
                      <span style={{ color: colors.textDark }}>
                        {dateFilterOptions.find(opt => opt.value === dateFilter)?.label}
                      </span>
                      <ChevronDown className="w-4 h-4" style={{ color: colors.textLight }} />
                    </button>
                    
                    {showDateDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
                        style={{ border: `1px solid ${colors.borderLight}` }}>
                        {dateFilterOptions.map(option => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setDateFilter(option.value);
                              setShowDateDropdown(false);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                            style={{ 
                              color: dateFilter === option.value ? colors.primary : colors.textDark,
                              backgroundColor: dateFilter === option.value ? colors.secondary + '20' : 'transparent'
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Admin Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  <div className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow" 
                    style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: colors.secondary }}>
                        <User className="w-6 h-6" style={{ color: colors.primary }} />
                      </div>
                      <span className="text-xs font-medium" style={{ color: colors.textLight }}>Toplam</span>
                    </div>
                    <h3 className="text-2xl font-bold" style={{ color: colors.textDark }}>{adminStatsData.totalInfluencers}</h3>
                    <p className="text-sm mt-1" style={{ color: colors.textLight }}>Toplam Influencer</p>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="font-medium" style={{ color: colors.success }}>{adminStatsData.activeInfluencers} aktif</span>
                    </div>
                  </div>

                  <div className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow" 
                    style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: colors.accentLight }}>
                        <TrendingUp className="w-6 h-6" style={{ color: colors.primary }} />
                      </div>
                      <span className="text-xs font-medium" style={{ color: colors.textLight }}>Leadler</span>
                    </div>
                    <h3 className="text-2xl font-bold" style={{ color: colors.textDark }}>{adminStatsData.totalLeads.toLocaleString()}</h3>
                    <p className="text-sm mt-1" style={{ color: colors.textLight }}>Toplam Lead</p>
                    <div className="mt-4 flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" style={{ color: colors.success }} />
                      <span className="font-medium" style={{ color: colors.success }}>+{adminStatsData.monthlyGrowth}%</span>
                      <span className="ml-1" style={{ color: colors.textLight }}>bu ay</span>
                    </div>
                  </div>

                  <div className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow" 
                    style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: colors.accentMedium + '30' }}>
                        <Activity className="w-6 h-6" style={{ color: colors.primary }} />
                      </div>
                      <span className="text-xs font-medium" style={{ color: colors.textLight }}>Operasyon</span>
                    </div>
                    <h3 className="text-2xl font-bold" style={{ color: colors.textDark }}>{adminStatsData.totalOperations.toLocaleString()}</h3>
                    <p className="text-sm mt-1" style={{ color: colors.textLight }}>Toplam Operasyon</p>
                    <div className="mt-4 flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-1" style={{ color: colors.success }} />
                      <span className="font-medium" style={{ color: colors.success }}>Tamamlandı</span>
                    </div>
                  </div>

                  <div className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow" 
                    style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg bg-blue-100">
                        <DollarSign className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-xs font-medium" style={{ color: colors.textLight }}>Gelir</span>
                    </div>
                    <h3 className="text-2xl font-bold" style={{ color: colors.textDark }}>€{adminStatsData.totalRevenue.toLocaleString()}</h3>
                    <p className="text-sm mt-1" style={{ color: colors.textLight }}>Toplam Gelir</p>
                    <div className="mt-4 flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" style={{ color: colors.success }} />
                      <span className="font-medium" style={{ color: colors.success }}>+24%</span>
                      <span className="ml-1" style={{ color: colors.textLight }}>bu ay</span>
                    </div>
                  </div>

                  <div className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow" 
                    style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: '#e8f5e9' }}>
                        <DollarSign className="w-6 h-6" style={{ color: colors.success }} />
                      </div>
                      <span className="text-xs font-medium" style={{ color: colors.textLight }}>Komisyon</span>
                    </div>
                    <h3 className="text-2xl font-bold" style={{ color: colors.textDark }}>€{adminStatsData.totalCommissions.toLocaleString()}</h3>
                    <p className="text-sm mt-1" style={{ color: colors.textLight }}>Toplam Komisyon</p>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="font-medium" style={{ color: colors.warning }}>€{adminStatsData.pendingPayments.toLocaleString()}</span>
                      <span className="ml-1" style={{ color: colors.textLight }}>bekliyor</span>
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Top Performers */}
                  <div className="rounded-2xl shadow-lg" 
                    style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                    <div className="p-6" style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                      <h3 className="text-lg font-semibold" style={{ color: colors.textDark }}>En İyi Performans</h3>
                    </div>
                    <div className="divide-y" style={{ '--tw-divide-color': colors.borderLight }}>
                      {topInfluencers.map((influencer, index) => (
                        <div key={index} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => handleInfluencerClick(influencer)}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                style={{ backgroundColor: colors.primary }}>
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium" style={{ color: colors.textDark }}>{influencer.name}</p>
                                <p className="text-sm" style={{ color: colors.textLight }}>{influencer.code}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold" style={{ color: colors.textDark }}>€{influencer.earnings.toLocaleString()}</p>
                              <p className="text-sm" style={{ color: colors.textLight }}>{influencer.leads} leads</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Admin Lead Stages - Filter Dependent */}
                  <div className="rounded-2xl shadow-lg p-6" 
                    style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold" style={{ color: colors.textDark }}>Lead Durumları</h2>
                      <span className="text-sm" style={{ color: colors.textLight }}>
                        {dateFilterOptions.find(opt => opt.value === dateFilter)?.label}
                      </span>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={adminLeadsByStage}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ stage, count }) => `${stage}: ${count}`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {adminLeadsByStage.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Platform Distribution */}
                <div className="rounded-2xl shadow-lg p-6" 
                  style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                  <h3 className="text-lg font-semibold mb-6" style={{ color: colors.textDark }}>Platform Dağılımı</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {platformDistribution.map((platform, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border"
                        style={{ borderColor: colors.borderLight }}>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] + '20' }}>
                            {platform.platform === 'Instagram' && <Camera className="w-5 h-5 text-pink-500" />}
                            {platform.platform === 'YouTube' && <Video className="w-5 h-5 text-red-500" />}
                            {platform.platform === 'TikTok' && <Video className="w-5 h-5 text-black" />}
                            {platform.platform === 'Twitter' && <FileText className="w-5 h-5 text-blue-500" />}
                          </div>
                          <div>
                            <p className="font-medium" style={{ color: colors.textDark }}>{platform.platform}</p>
                            <p className="text-sm" style={{ color: colors.textLight }}>{platform.count} influencer</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold" style={{ color: colors.textDark }}>{platform.percentage}%</p>
                          <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                            <div className="h-2 rounded-full" 
                              style={{
                                width: `${platform.percentage}%`,
                                backgroundColor: CHART_COLORS[index % CHART_COLORS.length]
                              }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Promo Codes Management */}
            {activeAdminTab === 'promocodes' && (
              <div className="space-y-6">
                {/* Promo Codes Header */}
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold" style={{ color: colors.textDark }}>Promo Kodları Yönetimi</h2>
                  <button className="px-4 py-2 text-white rounded-lg transition-all transform hover:scale-105 font-medium"
                    style={{ backgroundColor: colors.primary }}>
                    Yeni Kod Oluştur
                  </button>
                </div>

                {/* Promo Codes Table */}
                <div className="rounded-2xl shadow-lg" 
                  style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Promo Kod</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Influencer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Kullanım</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Dönüşüm</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Toplam Gelir</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Toplam Kazanç</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Durum</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>İşlem</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ '--tw-divide-color': colors.borderLight }}>
                        {promoCodesData.map((code, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="font-mono font-medium" style={{ color: colors.primary }}>
                                  {code.code}
                                </span>
                                <button className="ml-2 text-gray-400 hover:text-gray-600">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" 
                              style={{ color: colors.textDark }}>
                              <button 
                                onClick={() => handleInfluencerClick(topInfluencers.find(inf => inf.code === code.code))}
                                className="hover:underline font-medium"
                                style={{ color: colors.primary }}
                              >
                                {code.influencer}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm" 
                              style={{ color: colors.textDark }}>
                              {code.uses}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm" 
                              style={{ color: colors.textDark }}>
                              {code.conversions}
                              <span className="text-xs ml-1" style={{ color: colors.textLight }}>
                                ({((code.conversions / code.uses) * 100).toFixed(1)}%)
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold" 
                              style={{ color: colors.textDark }}>
                              €{code.totalRevenue.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold" 
                              style={{ color: colors.success }}>
                              €{code.totalCommissions.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                code.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {code.status === 'active' ? 'Aktif' : 'Durduruldu'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex space-x-2">
                                <button className="font-medium hover:opacity-80" style={{ color: colors.primary }}>
                                  Düzenle
                                </button>
                                <button className="font-medium hover:opacity-80 text-red-600">
                                  {code.status === 'active' ? 'Durdur' : 'Aktifleştir'}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Management */}
            {activeAdminTab === 'payments' && (
              <div className="space-y-6">
                {/* Payment Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="rounded-2xl shadow-lg p-6" 
                    style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: colors.textDark }}>Bekleyen Ödemeler</h3>
                    <p className="text-3xl font-bold" style={{ color: colors.warning }}>€{adminStatsData.pendingPayments.toLocaleString()}</p>
                    <p className="text-sm mt-1" style={{ color: colors.textLight }}>5 influencer için</p>
                  </div>
                  <div className="rounded-2xl shadow-lg p-6" 
                    style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: colors.textDark }}>Bu Ay Ödenen</h3>
                    <p className="text-3xl font-bold" style={{ color: colors.success }}>€{(adminStatsData.totalCommissions - adminStatsData.pendingPayments).toLocaleString()}</p>
                    <p className="text-sm mt-1" style={{ color: colors.textLight }}>42 influencer için</p>
                  </div>
                  <div className="rounded-2xl shadow-lg p-6" 
                    style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: colors.textDark }}>Toplam Gelir</h3>
                    <p className="text-3xl font-bold text-blue-600">€{adminStatsData.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm mt-1" style={{ color: colors.textLight }}>Tüm zamanlar</p>
                  </div>
                  <div className="rounded-2xl shadow-lg p-6" 
                    style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: colors.textDark }}>Toplam Komisyon</h3>
                    <p className="text-3xl font-bold" style={{ color: colors.primary }}>€{adminStatsData.totalCommissions.toLocaleString()}</p>
                    <p className="text-sm mt-1" style={{ color: colors.textLight }}>Tüm zamanlar</p>
                  </div>
                </div>

                {/* Pending Payments Table */}
                <div className="rounded-2xl shadow-lg" 
                  style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                  <div className="p-6" style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold" style={{ color: colors.textDark }}>Bekleyen Ödemeler</h3>
                      <button className="px-4 py-2 text-white rounded-lg transition-all font-medium"
                        style={{ backgroundColor: colors.success }}>
                        Tümünü Onayla
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Influencer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Tutar</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Dönem</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Lead Sayısı</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Durum</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>İşlem</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ '--tw-divide-color': colors.borderLight }}>
                        {pendingPayments.map((payment, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" 
                              style={{ color: colors.textDark }}>
                              <button 
                                onClick={() => handleInfluencerClick(topInfluencers.find(inf => inf.name === payment.influencer))}
                                className="hover:underline font-medium"
                                style={{ color: colors.primary }}
                              >
                                {payment.influencer}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold" 
                              style={{ color: colors.textDark }}>
                              €{payment.amount.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm" 
                              style={{ color: colors.textDark }}>
                              {payment.period}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm" 
                              style={{ color: colors.textDark }}>
                              {payment.leads}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Bekliyor
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex space-x-2">
                                <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs">
                                  Onayla
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs"
                                  style={{ color: colors.textDark }}>
                                  Detaylar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Influencer Management */}
            {activeAdminTab === 'influencers' && (
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <input 
                      type="text" 
                      placeholder="Influencer ara..." 
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: colors.borderLight }}
                    />
                    <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ borderColor: colors.borderLight }}>
                      <option>Tüm Durumlar</option>
                      <option>Aktif</option>
                      <option>Pasif</option>
                      <option>Bekliyor</option>
                    </select>
                  </div>
                  <button className="px-4 py-2 text-white rounded-lg transition-all transform hover:scale-105 font-medium"
                    style={{ backgroundColor: colors.primary }}>
                    Yeni Influencer Ekle
                  </button>
                </div>

                {/* Influencers Table */}
                <div className="rounded-2xl shadow-lg" 
                  style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Influencer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Promo Kod</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Platformlar</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Leadler</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Toplam Operasyon</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Toplam Gelir</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Kazanç</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>Durum</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                            style={{ color: colors.textLight }}>İşlem</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ '--tw-divide-color': colors.borderLight }}>
                        {topInfluencers.map((influencer, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                  style={{ backgroundColor: colors.primary }}>
                                  {influencer.name.charAt(0)}
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium" style={{ color: colors.textDark }}>
                                    {influencer.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="font-mono text-sm" style={{ color: colors.primary }}>
                                {influencer.code}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex space-x-1">
                                {influencer.platforms.map((platform, pIndex) => (
                                  <span key={pIndex} className="px-2 py-1 text-xs rounded-full"
                                    style={{ backgroundColor: colors.secondary, color: colors.primary }}>
                                    {platform}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm" 
                              style={{ color: colors.textDark }}>
                              {influencer.leads}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm" 
                              style={{ color: colors.textDark }}>
                              {influencer.operations}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold" 
                              style={{ color: colors.textDark }}>
                              €{influencer.totalRevenue.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold" 
                              style={{ color: colors.success }}>
                              €{influencer.earnings.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Aktif
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => handleInfluencerClick(influencer)}
                                  className="font-medium hover:opacity-80" 
                                  style={{ color: colors.primary }}
                                >
                                  Detaylar
                                </button>
                                <button className="font-medium hover:opacity-80" style={{ color: colors.textLight }}>
                                  Düzenle
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'finance' && !selectedInfluencer && (
          <div className="space-y-6">
            {/* Finance Sub Navigation */}
            <div className="bg-white rounded-2xl shadow-lg" style={{ border: `1px solid ${colors.borderLight}` }}>
              <div className="border-b" style={{ borderColor: colors.borderLight }}>
                <nav className="flex space-x-8 px-6">
                  {[
                    { key: 'dashboard', label: 'Finans Özeti', icon: '📊' },
                    { key: 'payments', label: 'Ödeme İşlemleri', icon: '💸' },
                    { key: 'accounts', label: 'Banka Hesapları', icon: '🏦' },
                    { key: 'reports', label: 'Raporlar', icon: '📈' },
                    { key: 'cashflow', label: 'Nakit Akışı', icon: '💰' }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveFinanceTab(tab.key)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-all flex items-center space-x-2`}
                      style={{
                        borderColor: activeFinanceTab === tab.key ? '#10b981' : 'transparent',
                        color: activeFinanceTab === tab.key ? '#10b981' : colors.textLight
                      }}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Finance Dashboard */}
            {activeFinanceTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Finance Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow bg-gradient-to-br from-green-50 to-green-100" 
                    style={{ border: `1px solid #d1fae5` }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg bg-green-500">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-medium text-green-600">Onaylandı</span>
                    </div>
                    <h3 className="text-2xl font-bold text-green-800">€{financeStats.approvedPayments.toLocaleString()}</h3>
                    <p className="text-sm mt-1 text-green-600">Ödeme Bekleyen</p>
                    <div className="mt-4 flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                      <span className="font-medium text-green-600">5 ödeme</span>
                    </div>
                  </div>

                  <div className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-blue-100" 
                    style={{ border: `1px solid #dbeafe` }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg bg-blue-500">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-medium text-blue-600">İşleniyor</span>
                    </div>
                    <h3 className="text-2xl font-bold text-blue-800">€{financeStats.pendingTransfers.toLocaleString()}</h3>
                    <p className="text-sm mt-1 text-blue-600">Aktif İşlemler</p>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="font-medium text-blue-600">{financeStats.avgProcessingTime} gün</span>
                      <span className="ml-1 text-blue-600">ort. süre</span>
                    </div>
                  </div>

                  <div className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-50 to-purple-100" 
                    style={{ border: `1px solid #e9d5ff` }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg bg-purple-500">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-medium text-purple-600">Bugün</span>
                    </div>
                    <h3 className="text-2xl font-bold text-purple-800">€{financeStats.completedToday.toLocaleString()}</h3>
                    <p className="text-sm mt-1 text-purple-600">Tamamlanan</p>
                    <div className="mt-4 flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 mr-1 text-purple-600" />
                      <span className="font-medium text-purple-600">+15%</span>
                      <span className="ml-1 text-purple-600">dünden fazla</span>
                    </div>
                  </div>

                  <div className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow bg-gradient-to-br from-red-50 to-red-100" 
                    style={{ border: `1px solid #fecaca` }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg bg-red-500">
                        <AlertCircle className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-medium text-red-600">Başarısız</span>
                    </div>
                    <h3 className="text-2xl font-bold text-red-800">€{financeStats.failedPayments.toLocaleString()}</h3>
                    <p className="text-sm mt-1 text-red-600">Hatalı Ödemeler</p>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="font-medium text-red-600">1 ödeme</span>
                      <span className="ml-1 text-red-600">tekrar denenmeli</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-6" style={{ border: `1px solid ${colors.borderLight}` }}>
                  <h3 className="text-lg font-semibold mb-6 text-gray-800">Hızlı İşlemler</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <button className="p-6 rounded-xl border-2 border-dashed border-green-300 hover:border-green-400 hover:bg-green-50 transition-all group">
                      <div className="text-center">
                        <div className="text-3xl mb-2">💸</div>
                        <h4 className="font-semibold text-gray-800 group-hover:text-green-600">Toplu Ödeme</h4>
                        <p className="text-sm text-gray-600">Seçili ödemeleri işle</p>
                      </div>
                    </button>
                    <button className="p-6 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-all group">
                      <div className="text-center">
                        <div className="text-3xl mb-2">📊</div>
                        <h4 className="font-semibold text-gray-800 group-hover:text-blue-600">Rapor Oluştur</h4>
                        <p className="text-sm text-gray-600">Aylık finansal rapor</p>
                      </div>
                    </button>
                    <button className="p-6 rounded-xl border-2 border-dashed border-purple-300 hover:border-purple-400 hover:bg-purple-50 transition-all group">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🏦</div>
                        <h4 className="font-semibold text-gray-800 group-hover:text-purple-600">Hesap Bakiyesi</h4>
                        <p className="text-sm text-gray-600">Banka hesaplarını görüntüle</p>
                      </div>
                    </button>
                    <button className="p-6 rounded-xl border-2 border-dashed border-orange-300 hover:border-orange-400 hover:bg-orange-50 transition-all group">
                      <div className="text-center">
                        <div className="text-3xl mb-2">📈</div>
                        <h4 className="font-semibold text-gray-800 group-hover:text-orange-600">Nakit Akışı</h4>
                        <p className="text-sm text-gray-600">Gelir-gider analizi</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-2xl shadow-lg" style={{ border: `1px solid ${colors.borderLight}` }}>
                  <div className="p-6 border-b" style={{ borderColor: colors.borderLight }}>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-800">Son İşlemler</h3>
                      <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                        Tümünü Görüntüle →
                      </button>
                    </div>
                  </div>
                  <div className="divide-y" style={{ '--tw-divide-color': colors.borderLight }}>
                    {paymentHistory.slice(0, 5).map((payment, index) => (
                      <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="text-2xl">{getPaymentMethodIcon(payment.method)}</div>
                            <div>
                              <p className="font-medium text-gray-800">{payment.influencer}</p>
                              <p className="text-sm text-gray-600">{payment.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">{formatCurrency(payment.amount)}</p>
                            <span className={`px-2 py-1 text-xs rounded-full border ${getPaymentStatusColor(payment.status)}`}>
                              {getPaymentStatusText(payment.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Payment Processing */}
            {activeFinanceTab === 'payments' && (
              <div className="space-y-6">
                {/* Batch Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-6" style={{ border: `1px solid ${colors.borderLight}` }}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Ödeme İşlemleri</h3>
                    <div className="flex space-x-3">
                      {selectedPayments.length > 0 && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                          <span>💸</span>
                          <span>Seçilenleri İşle ({selectedPayments.length})</span>
                        </button>
                      )}
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Filtreleri Temizle
                      </button>
                    </div>
                  </div>

                  {/* Payment Status Filters */}
                  <div className="flex space-x-2 mb-6">
                    {[
                      { key: 'all', label: 'Tümü', count: approvedPayments.length },
                      { key: 'approved', label: 'Onaylandı', count: approvedPayments.filter(p => p.status === 'approved').length },
                      { key: 'processing', label: 'İşleniyor', count: approvedPayments.filter(p => p.status === 'processing').length },
                      { key: 'scheduled', label: 'Planlandı', count: approvedPayments.filter(p => p.status === 'scheduled').length },
                      { key: 'failed', label: 'Başarısız', count: approvedPayments.filter(p => p.status === 'failed').length }
                    ].map((filter) => (
                      <button
                        key={filter.key}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
                        style={{
                          backgroundColor: filter.key === 'all' ? '#10b981' : 'white',
                          color: filter.key === 'all' ? 'white' : '#6b7280',
                          borderColor: filter.key === 'all' ? '#10b981' : '#d1d5db'
                        }}
                      >
                        {filter.label} ({filter.count})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payments Table */}
                <div className="bg-white rounded-2xl shadow-lg" style={{ border: `1px solid ${colors.borderLight}` }}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{ borderBottom: `1px solid ${colors.borderLight}` }}>
                          <th className="px-6 py-3 text-left">
                            <input 
                              type="checkbox" 
                              className="rounded border-gray-300"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedPayments(approvedPayments.map(p => p.id));
                                } else {
                                  setSelectedPayments([]);
                                }
                              }}
                            />
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Ödeme ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Influencer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Tutar
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Durum
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Öncelik
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Son Tarih
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Yöntem
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            İşlemler
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ '--tw-divide-color': colors.borderLight }}>
                        {approvedPayments.map((payment, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <input 
                                type="checkbox" 
                                className="rounded border-gray-300"
                                checked={selectedPayments.includes(payment.id)}
                                onChange={() => handlePaymentSelect(payment.id)}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="font-mono text-sm text-gray-800">{payment.id}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-sm mr-3">
                                  {payment.influencer.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800">{payment.influencer}</p>
                                  <p className="text-sm text-gray-600">{payment.period}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="font-semibold text-gray-800">{formatCurrency(payment.amount, payment.currency)}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getPaymentStatusColor(payment.status)}`}>
                                {getPaymentStatusText(payment.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`font-medium ${getPriorityColor(payment.priority)}`}>
                                {payment.priority === 'urgent' ? '🔴 Acil' : 
                                 payment.priority === 'high' ? '🟡 Yüksek' : 
                                 payment.priority === 'normal' ? '🟢 Normal' : '🔵 Düşük'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {payment.dueDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{getPaymentMethodIcon(payment.paymentMethod)}</span>
                                <span className="text-sm text-gray-600">
                                  {payment.paymentMethod === 'bank_transfer' ? 'Banka' :
                                   payment.paymentMethod === 'wire_transfer' ? 'Havale' :
                                   payment.paymentMethod === 'paypal' ? 'PayPal' : 'Diğer'}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex space-x-2">
                                {payment.status === 'approved' && (
                                  <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs">
                                    İşle
                                  </button>
                                )}
                                {payment.status === 'failed' && (
                                  <button className="px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-xs">
                                    Tekrar Dene
                                  </button>
                                )}
                                <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs text-gray-700">
                                  Detaylar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Bank Accounts */}
            {activeFinanceTab === 'accounts' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Banka Hesapları</h2>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                    <span>+</span>
                    <span>Yeni Hesap Ekle</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {bankAccounts.map((account, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-800">{account.name}</h3>
                          <p className="text-sm text-gray-600">{account.bank}</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {account.status === 'active' ? 'Aktif' : 'Pasif'}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-500">IBAN</label>
                          <p className="font-mono text-sm text-gray-800">{account.iban}</p>
                        </div>
                        
                        <div>
                          <label className="text-xs text-gray-500">Bakiye</label>
                          <p className="text-2xl font-bold text-gray-800">
                            {formatCurrency(account.balance, account.currency)}
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {account.type === 'business' ? 'İş Hesabı' : 'Uluslararası'}
                          </span>
                          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                            Detaylar →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reports */}
            {activeFinanceTab === 'reports' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Finansal Raporlar</h2>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Yeni Rapor Oluştur
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'Aylık Komisyon Raporu', description: 'Influencer komisyonları detayı', date: '2025-07-15', type: 'monthly' },
                    { title: 'Ödeme Geçmişi', description: 'Tüm ödemelerin detaylı listesi', date: '2025-07-14', type: 'history' },
                    { title: 'Nakit Akış Analizi', description: 'Gelir-gider trend analizi', date: '2025-07-13', type: 'cashflow' },
                    { title: 'Banka Mutabakatı', description: 'Hesap bakiyeleri karşılaştırması', date: '2025-07-12', type: 'reconciliation' },
                    { title: 'Vergi Raporu', description: 'Gelir vergisi beyanı için özet', date: '2025-07-10', type: 'tax' },
                    { title: 'Maliyet Analizi', description: 'Komisyon maliyetleri analizi', date: '2025-07-08', type: 'cost' }
                  ].map((report, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-2xl">
                          {report.type === 'monthly' ? '📊' : 
                           report.type === 'history' ? '📋' :
                           report.type === 'cashflow' ? '💰' :
                           report.type === 'reconciliation' ? '🏦' :
                           report.type === 'tax' ? '📄' : '📈'}
                        </div>
                        <span className="text-xs text-gray-500">{report.date}</span>
                      </div>
                      
                      <h3 className="font-semibold text-gray-800 mb-2">{report.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                      
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm">
                          İndir
                        </button>
                        <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700">
                          Görüntüle
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cash Flow */}
            {activeFinanceTab === 'cashflow' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Nakit Akışı Yönetimi</h2>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Bu Ay
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Tahmin Yap
                    </button>
                  </div>
                </div>

                {/* Cash Flow Chart */}
                <div className="bg-white rounded-2xl shadow-lg p-6" style={{ border: `1px solid ${colors.borderLight}` }}>
                  <h3 className="text-lg font-semibold mb-6 text-gray-800">Aylık Nakit Akışı</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={cashFlow}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="income" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ fill: '#10b981', r: 5 }}
                        name="Gelir"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="expenses" 
                        stroke="#ef4444" 
                        strokeWidth={3}
                        dot={{ fill: '#ef4444', r: 5 }}
                        name="Gider"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="netFlow" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', r: 5 }}
                        name="Net Akış"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Cash Flow Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg p-6 border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl">💰</div>
                      <span className="text-xs font-medium text-green-600">Bu Ay</span>
                    </div>
                    <h3 className="text-2xl font-bold text-green-800">€195,000</h3>
                    <p className="text-sm text-green-600">Toplam Gelir</p>
                    <div className="mt-4 flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                      <span className="font-medium text-green-600">+8.5%</span>
                      <span className="ml-1 text-green-600">geçen aya göre</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-lg p-6 border border-red-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl">💸</div>
                      <span className="text-xs font-medium text-red-600">Bu Ay</span>
                    </div>
                    <h3 className="text-2xl font-bold text-red-800">€47,000</h3>
                    <p className="text-sm text-red-600">Toplam Gider</p>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="font-medium text-red-600">%24.1</span>
                      <span className="ml-1 text-red-600">gelir oranı</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-6 border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl">📈</div>
                      <span className="text-xs font-medium text-blue-600">Net</span>
                    </div>
                    <h3 className="text-2xl font-bold text-blue-800">€148,000</h3>
                    <p className="text-sm text-blue-600">Net Kar</p>
                    <div className="mt-4 flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 mr-1 text-blue-600" />
                      <span className="font-medium text-blue-600">%75.9</span>
                      <span className="ml-1 text-blue-600">kar marjı</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Basic Profile Information */}
            <div className="rounded-2xl shadow-lg" 
              style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
              <div className="p-8">
                <div className="flex items-center space-x-6 mb-8">
                  <img 
                    src={currentProfileData.avatar} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full ring-4"
                    style={{ '--tw-ring-color': colors.accentLight }}
                  />
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: colors.textDark }}>{currentProfileData.name}</h2>
                    <p style={{ color: colors.textLight }}>Influencer</p>
                    <p className="text-sm mt-1" style={{ color: colors.textLight }}>Kayıt Tarihi: {currentProfileData.joinDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.textDark }}>E-posta</label>
                    <p style={{ color: colors.textDark }}>{currentProfileData.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.textDark }}>Telefon</label>
                    <p style={{ color: colors.textDark }}>{currentProfileData.phone}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.textDark }}>Promo Kod</label>
                    <p className="font-mono font-semibold" style={{ color: colors.primary }}>{currentProfileData.code}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.textDark }}>Komisyon</label>
                    <p style={{ color: colors.textDark }}>{currentProfileData.commissionRate || profileData.commissionRate} ({(currentProfileData.commissionType || profileData.commissionType) === 'percentage' ? 'Yüzde' : 'Sabit'})</p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.textDark }}>Aktif Platformlar</label>
                    <div className="flex flex-wrap gap-2">
                      {currentProfileData.platforms.map((platform) => (
                        <span key={platform} className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{ backgroundColor: colors.secondary, color: colors.primary }}>
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8" style={{ borderTop: `1px solid ${colors.borderLight}` }}>
                  <button className="w-full md:w-auto px-6 py-3 text-white rounded-lg transition-all transform hover:scale-105 font-medium"
                    style={{ backgroundColor: colors.primary }}>
                    Profili Güncelle
                  </button>
                </div>
              </div>
            </div>

            {/* Social Media Accounts */}
            {!selectedInfluencer && (
              <div className="rounded-2xl shadow-lg" 
                style={{ backgroundColor: colors.white, border: `1px solid ${colors.borderLight}` }}>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: colors.textDark }}>Sosyal Medya Hesapları</h3>
                      <p className="text-sm mt-1" style={{ color: colors.textLight }}>Sosyal medya hesaplarınızı yönetin ve güncel tutun</p>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 border-2 border-dashed rounded-lg transition-all hover:bg-gray-50"
                      style={{ borderColor: colors.borderLight, color: colors.textLight }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Hesap Ekle</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentProfileData.socialMedia && Object.entries(currentProfileData.socialMedia).map(([platform, data]) => (
                      <div key={platform} className="p-6 rounded-xl border-2 hover:shadow-md transition-all"
                        style={{ borderColor: colors.borderLight }}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            {getSocialMediaIcon(platform)}
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold capitalize" style={{ color: colors.textDark }}>
                                  {platform}
                                </span>
                                {data.verified && (
                                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <p className="text-sm" style={{ color: colors.textLight }}>
                                {formatFollowerCount(data.followers)} takipçi
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              style={{ color: colors.textLight }}>
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              style={{ color: colors.textLight }}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium mb-1" style={{ color: colors.textLight }}>
                              Kullanıcı Adı
                            </label>
                            <p className="text-sm font-mono" style={{ color: colors.textDark }}>
                              {data.username}
                            </p>
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium mb-1" style={{ color: colors.textLight }}>
                              Profil Linki
                            </label>
                            <a href={data.url} target="_blank" rel="noopener noreferrer" 
                              className="text-sm hover:underline" 
                              style={{ color: colors.primary }}>
                              {data.url}
                            </a>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2"
                            style={{ borderTop: `1px solid ${colors.borderLight}` }}>
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              <span className="text-xs" style={{ color: colors.textLight }}>Aktif</span>
                            </div>
                            <span className="text-xs px-2 py-1 rounded-full font-medium"
                              style={{ 
                                backgroundColor: colors.secondary + '40',
                                color: colors.primary
                              }}>
                              {formatFollowerCount(data.followers)} takipçi
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Account Section */}
                  <div className="mt-8 pt-8" style={{ borderTop: `1px solid ${colors.borderLight}` }}>
                    <h4 className="text-lg font-semibold mb-4" style={{ color: colors.textDark }}>
                      Yeni Hesap Ekle
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {['Instagram', 'YouTube', 'TikTok', 'Twitter', 'Facebook', 'LinkedIn'].map((platform) => (
                        <button key={platform} 
                          className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed hover:bg-gray-50 transition-all"
                          style={{ borderColor: colors.borderLight }}>
                          {getSocialMediaIcon(platform.toLowerCase())}
                          <span className="text-xs mt-2" style={{ color: colors.textLight }}>
                            {platform}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default InfluencerDashboard;