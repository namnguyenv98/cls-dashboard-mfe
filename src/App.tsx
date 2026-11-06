import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  GitFork,
  Users,
  BarChart3,
  Award,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Building2,
  Download,
  Mail,
  ShieldCheck,
  MoreVertical,
  PlayCircle,
  UserPlus,
  ExternalLink,
  BookMarked,
  X
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// --- MOCK DATA FOR CORPORATE LEARNING SYSTEM ---
const INITIAL_STATS = {
  totalEmployees: 1240,
  activeLearners: 982,
  avgCompletionRate: 78.4,
  learningHoursThisMonth: 3420,
  certificatesIssued: 450
};

const DEPT_PROGRESS_DATA = [
  { name: 'Kỹ thuật & IT', completion: 88, learners: 310 },
  { name: 'Kinh doanh & Sales', completion: 72, learners: 240 },
  { name: 'Marketing', completion: 65, learners: 150 },
  { name: 'Nhân sự (HR)', completion: 94, learners: 80 },
  { name: 'Tài chính - Kế toán', completion: 81, learners: 110 },
  { name: 'Vận hành (Operations)', completion: 69, learners: 210 }
];

const MONTHLY_HOURS_DATA = [
  { month: 'T1', hours: 2100, goal: 2000 },
  { month: 'T2', hours: 2400, goal: 2200 },
  { month: 'T3', hours: 2800, goal: 2500 },
  { month: 'T4', hours: 3100, goal: 2800 },
  { month: 'T5', hours: 3420, goal: 3000 },
  { month: 'T6 (Dự kiến)', hours: 3800, goal: 3200 }
];

const INITIAL_COURSES = [
  {
    id: 'course-1',
    code: 'SEC-101',
    title: 'An toàn Thông tin & Bảo mật Dữ liệu Doanh nghiệp 2026',
    category: 'Tuân thủ & An ninh',
    department: 'Toàn công ty',
    duration: '4 Giờ',
    enrolledCount: 1120,
    completionRate: 92,
    status: 'Bắt buộc',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'course-2',
    code: 'LDR-302',
    title: 'Kỹ năng Quản trị & Lãnh đạo Cấp Trung',
    category: 'Phát triển Kỹ năng',
    department: 'Ban Quản lý',
    duration: '12 Giờ',
    enrolledCount: 85,
    completionRate: 74,
    status: 'Khuyến khích',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'course-3',
    code: 'DEV-204',
    title: 'Kiến trúc Microservices & DevOps Thực chiến',
    category: 'Chuyên môn Kỹ thuật',
    department: 'Kỹ thuật & IT',
    duration: '24 Giờ',
    enrolledCount: 140,
    completionRate: 81,
    status: 'Chuyên ngành',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'course-4',
    code: 'SAL-102',
    title: 'Quy trình Chốt Hợp đồng & Bán hàng B2B Cao cấp',
    category: 'Kinh doanh',
    department: 'Kinh doanh & Sales',
    duration: '8 Giờ',
    enrolledCount: 210,
    completionRate: 68,
    status: 'Nghiệp vụ',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80'
  }
];

const INITIAL_PATHS = [
  {
    id: 'path-1',
    title: 'Lộ trình Onboarding Nhân viên Mới (30 Ngày)',
    description: 'Bao gồm Văn hóa doanh nghiệp, An toàn bảo mật, Quy trình làm việc & Phần mềm nội bộ.',
    courseCount: 5,
    totalDuration: '18 Giờ',
    assignedDepts: ['Tất cả phòng ban'],
    assignedCount: 450,
    completionPercent: 85
  },
  {
    id: 'path-2',
    title: 'Lộ trình Chuyên viên Frontend React & Cloud',
    description: 'Trang bị kiến thức từ ReactJS nâng cao, TypeScript đến CI/CD Deployment trên Open edX.',
    courseCount: 6,
    totalDuration: '45 Giờ',
    assignedDepts: ['Kỹ thuật & IT'],
    assignedCount: 120,
    completionPercent: 62
  },
  {
    id: 'path-3',
    title: 'Lộ trình Chuyên viên Sales B2B Xuất sắc',
    description: 'Từ kỹ năng giao tiếp, đàm phán, quản trị CRM đến kỹ thuật chốt hợp đồng lớn.',
    courseCount: 4,
    totalDuration: '22 Giờ',
    assignedDepts: ['Kinh doanh & Sales'],
    assignedCount: 180,
    completionPercent: 74
  }
];

const INITIAL_EMPLOYEES = [
  {
    id: 'EMP-001',
    name: 'Nguyễn Văn An',
    email: 'an.nguyen@corp.com',
    department: 'Kỹ thuật & IT',
    role: 'Senior Developer',
    assignedPath: 'Lộ trình Chuyên viên Frontend React & Cloud',
    completedCourses: 4,
    totalCourses: 5,
    progress: 80,
    status: 'Đang học',
    lastActive: '10 phút trước'
  },
  {
    id: 'EMP-002',
    name: 'Trần Thị Mai',
    email: 'mai.tran@corp.com',
    department: 'Kinh doanh & Sales',
    role: 'Sales Executive',
    assignedPath: 'Lộ trình Chuyên viên Sales B2B Xuất sắc',
    completedCourses: 4,
    totalCourses: 4,
    progress: 100,
    status: 'Hoàn thành',
    lastActive: '2 giờ trước'
  },
  {
    id: 'EMP-003',
    name: 'Lê Hoàng Nam',
    email: 'nam.le@corp.com',
    department: 'Marketing',
    role: 'Content Lead',
    assignedPath: 'Lộ trình Onboarding Nhân viên Mới (30 Ngày)',
    completedCourses: 2,
    totalCourses: 5,
    progress: 40,
    status: 'Chậm tiến độ',
    lastActive: '3 ngày trước'
  },
  {
    id: 'EMP-004',
    name: 'Phạm Minh Phương',
    email: 'phuong.pham@corp.com',
    department: 'Nhân sự (HR)',
    role: 'HR Business Partner',
    assignedPath: 'Lộ trình Onboarding Nhân viên Mới (30 Ngày)',
    completedCourses: 5,
    totalCourses: 5,
    progress: 100,
    status: 'Hoàn thành',
    lastActive: 'Hôm qua'
  },
  {
    id: 'EMP-005',
    name: 'Đỗ Quang Huy',
    email: 'huy.do@corp.com',
    department: 'Kỹ thuật & IT',
    role: 'DevOps Engineer',
    assignedPath: 'Lộ trình Chuyên viên Frontend React & Cloud',
    completedCourses: 3,
    totalCourses: 6,
    progress: 50,
    status: 'Đang học',
    lastActive: '5 giờ trước'
  }
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBranch, setSelectedBranch] = useState('Tập đoàn Công nghệ ACME');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data states
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [courses] = useState(INITIAL_COURSES);
  const [paths] = useState(INITIAL_PATHS);

  // Modal State
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedEmployeeForAssign, setSelectedEmployeeForAssign] = useState(null);
  const [selectedAssignmentPath, setSelectedAssignmentPath] = useState('');

  // Department filter
  const [deptFilter, setDeptFilter] = useState('Tất cả');

  // Filtered employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = deptFilter === 'Tất cả' || emp.department === deptFilter;
      return matchesSearch && matchesDept;
    });
  }, [employees, searchQuery, deptFilter]);

  // Handle Course Assignment
  const handleOpenAssignModal = (emp) => {
    setSelectedEmployeeForAssign(emp);
    setSelectedAssignmentPath(emp.assignedPath || paths[0].title);
    setIsAssignModalOpen(true);
  };

  const handleConfirmAssignment = () => {
    if (!selectedEmployeeForAssign) return;
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === selectedEmployeeForAssign.id
          ? {
              ...emp,
              assignedPath: selectedAssignmentPath,
              progress: 0,
              completedCourses: 0,
              status: 'Đang học'
            }
          : emp
      )
    );
    setIsAssignModalOpen(false);
  };

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="flex h-screen overflow-hidden">
        
        {/* ================= SIDEBAR NAVIGATION ================= */}
        <aside className={`w-64 flex-shrink-0 flex flex-col border-r transition-colors ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'}`}>
          {/* Logo Brand */}
          <div className="p-5 border-b flex items-center gap-3 border-slate-200 dark:border-slate-700">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
              CLS
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight tracking-wide text-blue-600 dark:text-blue-400">Open edX CLS</h1>
              <span className="text-xs text-slate-400 font-medium">Enterprise Learning</span>
            </div>
          </div>

          {/* Branch / Org Switcher */}
          <div className="p-3 border-b border-slate-100 dark:border-slate-700/60">
            <div className="relative">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className={`w-full text-xs font-medium py-2 px-3 rounded-lg border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <option>Tập đoàn Công nghệ ACME</option>
                <option>Chi nhánh Chi nhánh Hà Nội</option>
                <option>Chi nhánh TP. Hồ Chí Minh</option>
                <option>Khối R&D & Sáng tạo</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-2.5 pointer-events-none text-slate-400" />
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            <div className="px-3 pt-2 pb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Chức năng chính
            </div>

            <NavItem
              icon={<LayoutDashboard className="w-4 h-4" />}
              label="Tổng quan (Dashboard)"
              active={activeTab === 'dashboard'}
              onClick={() => setActiveTab('dashboard')}
              darkMode={darkMode}
            />
            <NavItem
              icon={<BookOpen className="w-4 h-4" />}
              label="Kho khóa học"
              badge={courses.length}
              active={activeTab === 'courses'}
              onClick={() => setActiveTab('courses')}
              darkMode={darkMode}
            />
            <NavItem
              icon={<GitFork className="w-4 h-4" />}
              label="Lộ trình đào tạo"
              badge={paths.length}
              active={activeTab === 'paths'}
              onClick={() => setActiveTab('paths')}
              darkMode={darkMode}
            />
            <NavItem
              icon={<Users className="w-4 h-4" />}
              label="Nhân sự & Phòng ban"
              active={activeTab === 'employees'}
              onClick={() => setActiveTab('employees')}
              darkMode={darkMode}
            />

            <div className="px-3 pt-4 pb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Báo cáo & Chứng nhận
            </div>

            <NavItem
              icon={<BarChart3 className="w-4 h-4" />}
              label="Báo cáo & Bảng điểm"
              active={activeTab === 'reports'}
              onClick={() => setActiveTab('reports')}
              darkMode={darkMode}
            />
            <NavItem
              icon={<Award className="w-4 h-4" />}
              label="Chứng chỉ Doanh nghiệp"
              active={activeTab === 'certificates'}
              onClick={() => setActiveTab('certificates')}
              darkMode={darkMode}
            />
          </nav>

          {/* User Profile Footer */}
          <div className={`p-3 border-t flex items-center justify-between ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'}`}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                HR
              </div>
              <div className="text-xs">
                <p className="font-semibold text-slate-800 dark:text-slate-200 leading-tight">Quản trị viên HR</p>
                <p className="text-[10px] text-slate-400">admin@company.com</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-1.5 rounded-lg border transition-colors ${
                darkMode ? 'bg-slate-700 border-slate-600 text-amber-400 hover:bg-slate-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              title="Thao tác sáng / tối"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </aside>

        {/* ================= MAIN CONTENT AREA ================= */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          
          {/* Top Bar Header */}
          <header className={`h-16 flex-shrink-0 flex items-center justify-between px-6 border-b ${
            darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'
          }`}>
            {/* Search Input */}
            <div className="relative w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm khóa học, nhân viên, lộ trình..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full text-xs pl-9 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-slate-900 border-slate-700 text-slate-200 placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-700 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Quick Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Open edX Studio & LMS Connected
              </div>

              <button className={`relative p-2 rounded-lg border text-slate-500 hover:text-slate-700 ${
                darkMode ? 'border-slate-700 hover:bg-slate-700 text-slate-300' : 'border-slate-200 hover:bg-slate-100'
              }`}>
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-sm">
                <Plus className="w-4 h-4" />
                Gán lộ trình mới
              </button>
            </div>
          </header>

          {/* Main Scrollable Dashboard Content */}
          <main className="flex-1 overflow-y-auto p-6">
            
            {/* TAB 1: DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                
                {/* Metric Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    title="Tổng Nhân sự Đào tạo"
                    value={INITIAL_STATS.totalEmployees}
                    subText={`Đang hoạt động: ${INITIAL_STATS.activeLearners}`}
                    icon={<Users className="w-5 h-5 text-blue-600" />}
                    trend="+12% so với tháng trước"
                    darkMode={darkMode}
                  />
                  <StatCard
                    title="Tỷ lệ Hoàn thành Trung bình"
                    value={`${INITIAL_STATS.avgCompletionRate}%`}
                    subText="Mục tiêu KPI doanh nghiệp: 75%"
                    icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    trend="Vượt mục tiêu 3.4%"
                    darkMode={darkMode}
                  />
                  <StatCard
                    title="Giờ học Tháng này"
                    value={`${INITIAL_STATS.learningHoursThisMonth}h`}
                    subText="Trung bình 3.4h / nhân viên"
                    icon={<Clock className="w-5 h-5 text-indigo-600" />}
                    trend="+18% giờ học trực tuyến"
                    darkMode={darkMode}
                  />
                  <StatCard
                    title="Chứng chỉ Cấp trong Tháng"
                    value={INITIAL_STATS.certificatesIssued}
                    subText="Bao gồm cả Tuân thủ & Chuyên môn"
                    icon={<Award className="w-5 h-5 text-amber-600" />}
                    trend="32 chứng chỉ An toàn Bắt buộc"
                    darkMode={darkMode}
                  />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Chart 1: Completion rate by Department */}
                  <div className={`lg:col-span-2 p-5 rounded-xl border shadow-sm ${
                    darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          Tỷ lệ Hoàn thành Đào tạo theo Phòng ban (%)
                        </h3>
                        <p className="text-xs text-slate-400">Đo lường tiến độ học tập thực tế của từng bộ phận</p>
                      </div>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-md">
                        Cập nhật hôm nay
                      </span>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={DEPT_PROGRESS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#334155' : '#e2e8f0'} />
                          <XAxis dataKey="name" tick={{ fontSize: 11, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                          <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: darkMode ? '#0f172a' : '#ffffff',
                              borderColor: darkMode ? '#334155' : '#cbd5e1',
                              borderRadius: '8px',
                              fontSize: '12px'
                            }}
                          />
                          <Bar dataKey="completion" fill="#2563eb" radius={[4, 4, 0, 0]} name="Tỷ lệ hoàn thành (%)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Chart 2: Monthly Hours Trend */}
                  <div className={`p-5 rounded-xl border shadow-sm ${
                    darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                  }`}>
                    <div className="mb-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        Xu hướng Giờ học (Thực tế vs Mục tiêu)
                      </h3>
                      <p className="text-xs text-slate-400">Thống kê tổng số giờ tích lũy</p>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={MONTHLY_HOURS_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#334155' : '#e2e8f0'} />
                          <XAxis dataKey="month" tick={{ fontSize: 11, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                          <YAxis tick={{ fontSize: 11, fill: darkMode ? '#94a3b8' : '#64748b' }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: darkMode ? '#0f172a' : '#ffffff',
                              borderColor: darkMode ? '#334155' : '#cbd5e1',
                              borderRadius: '8px',
                              fontSize: '12px'
                            }}
                          />
                          <Area type="monotone" dataKey="hours" stroke="#10b981" fillOpacity={1} fill="url(#colorHours)" name="Giờ thực tế" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Section: Top Learning Paths & Active Courses */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Learning Paths Preview */}
                  <div className={`p-5 rounded-xl border shadow-sm ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Lộ trình Đào tạo Tiêu điểm</h3>
                      <button onClick={() => setActiveTab('paths')} className="text-xs text-blue-600 hover:underline font-semibold">
                        Xem tất cả ({paths.length})
                      </button>
                    </div>
                    <div className="space-y-3">
                      {paths.map((p) => (
                        <div key={p.id} className={`p-3.5 rounded-lg border transition-all ${
                          darkMode ? 'bg-slate-900/60 border-slate-700 hover:border-slate-600' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}>
                          <div className="flex items-center justify-between mb-1.5">
                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{p.title}</h4>
                            <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                              {p.assignedCount} Nhân sự
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mb-2">{p.description}</p>
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span>{p.courseCount} Khóa học • {p.totalDuration}</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{p.completionPercent}% Đã xong</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${p.completionPercent}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Compliance & Urgent Courses */}
                  <div className={`p-5 rounded-xl border shadow-sm ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Khóa học Bắt buộc & Tuân thủ</h3>
                      <button onClick={() => setActiveTab('courses')} className="text-xs text-blue-600 hover:underline font-semibold">
                        Quản lý kho bài giảng
                      </button>
                    </div>
                    <div className="space-y-3">
                      {courses.map((c) => (
                        <div key={c.id} className={`flex items-center gap-3 p-3 rounded-lg border ${
                          darkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                        }`}>
                          <img src={c.image} alt={c.title} className="w-14 h-14 rounded-md object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 rounded">
                                {c.code}
                              </span>
                              <span className="text-[11px] font-medium text-slate-400">{c.category}</span>
                            </div>
                            <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{c.title}</h4>
                            <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-1">
                              <span>Học viên: {c.enrolledCount}</span>
                              <span className="text-blue-600 font-medium">Tỷ lệ: {c.completionRate}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: COURSE CATALOG */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Kho Khóa học Doanh nghiệp</h2>
                    <p className="text-xs text-slate-400">Được đồng bộ trực tiếp từ Open edX Studio CMS</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg">
                      <Filter className="w-3.5 h-3.5" /> Bộ lọc
                    </button>
                    <a
                      href="http://local.openedx.io"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Mở Open edX LMS
                    </a>
                  </div>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div key={course.id} className={`rounded-xl border overflow-hidden shadow-sm flex flex-col ${
                      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                    }`}>
                      <div className="relative h-36">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                          {course.code}
                        </div>
                        <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          {course.status}
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">{course.category}</span>
                          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1 line-clamp-2">{course.title}</h3>
                          <p className="text-xs text-slate-400 mt-2">Dành cho: <span className="font-semibold">{course.department}</span></p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.enrolledCount} Học viên</span>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-slate-400">Tỷ lệ hoàn thành:</span>
                              <span className="font-bold text-emerald-600">{course.completionRate}%</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${course.completionRate}%` }}></div>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center gap-2">
                            <button className="flex-1 py-1.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
                              Xem chi tiết
                            </button>
                            <button className="p-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                              <BookMarked className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: LEARNING PATHS */}
            {activeTab === 'paths' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Lộ trình Đào tạo (Learning Paths)</h2>
                    <p className="text-xs text-slate-400">Chuỗi khóa học chuẩn hóa cho từng vị trí và phòng ban</p>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus className="w-4 h-4" /> Tạo Lộ trình Mới
                  </button>
                </div>

                <div className="space-y-4">
                  {paths.map((path) => (
                    <div key={path.id} className={`p-5 rounded-xl border shadow-sm ${
                      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                    }`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 rounded">
                              Lộ trình Chuẩn
                            </span>
                            <span className="text-xs text-slate-400">{path.courseCount} Bài học bắt buộc</span>
                          </div>
                          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">{path.title}</h3>
                          <p className="text-xs text-slate-500 mt-1">{path.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-xs text-slate-400">Đã gán cho</p>
                            <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{path.assignedCount} Nhân sự</p>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedAssignmentPath(path.title);
                              setIsAssignModalOpen(true);
                            }}
                            className="text-xs font-semibold px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            Gán hàng loạt
                          </button>
                        </div>
                      </div>

                      <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-slate-400">Thời lượng thiết kế:</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-200 ml-2">{path.totalDuration}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Áp dụng cho:</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-200 ml-2">{path.assignedDepts.join(', ')}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Tỷ lệ hoàn thành chung:</span>
                          <span className="font-bold text-emerald-600 ml-2">{path.completionPercent}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: EMPLOYEE MANAGEMENT TABLE */}
            {activeTab === 'employees' && (
              <div className="space-y-6">
                {/* Table Header Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Quản lý Học tập Nhân sự</h2>
                    <p className="text-xs text-slate-400">Theo dõi tiến độ, phân gán khóa học và nhắc nhở học tập</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Dept Filter */}
                    <select
                      value={deptFilter}
                      onChange={(e) => setDeptFilter(e.target.value)}
                      className={`text-xs font-medium py-2 px-3 rounded-lg border ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <option value="Tất cả">Tất cả Phòng ban</option>
                      <option value="Kỹ thuật & IT">Kỹ thuật & IT</option>
                      <option value="Kinh doanh & Sales">Kinh doanh & Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Nhân sự (HR)">Nhân sự (HR)</option>
                    </select>

                    <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg">
                      <Download className="w-3.5 h-3.5" /> Xuất Excel
                    </button>
                  </div>
                </div>

                {/* Employees Table */}
                <div className={`rounded-xl border overflow-hidden shadow-sm ${
                  darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                }`}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className={`border-b font-semibold ${
                          darkMode ? 'bg-slate-900/50 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}>
                          <th className="p-3.5">Mã & Nhân sự</th>
                          <th className="p-3.5">Phòng ban / Chức danh</th>
                          <th className="p-3.5">Lộ trình được gán</th>
                          <th className="p-3.5">Tiến độ</th>
                          <th className="p-3.5">Trạng thái</th>
                          <th className="p-3.5">Hoạt động</th>
                          <th className="p-3.5 text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                        {filteredEmployees.map((emp) => (
                          <tr key={emp.id} className={`hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors`}>
                            <td className="p-3.5">
                              <div>
                                <p className="font-bold text-slate-800 dark:text-slate-100">{emp.name}</p>
                                <p className="text-[10px] text-slate-400">{emp.email}</p>
                              </div>
                            </td>
                            <td className="p-3.5">
                              <p className="font-medium text-slate-700 dark:text-slate-300">{emp.department}</p>
                              <p className="text-[10px] text-slate-400">{emp.role}</p>
                            </td>
                            <td className="p-3.5 max-w-xs truncate font-medium text-slate-600 dark:text-slate-300">
                              {emp.assignedPath}
                            </td>
                            <td className="p-3.5">
                              <div className="w-32">
                                <div className="flex justify-between text-[10px] mb-1">
                                  <span className="font-bold text-slate-700 dark:text-slate-300">{emp.progress}%</span>
                                  <span className="text-slate-400">{emp.completedCourses}/{emp.totalCourses} Bài</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      emp.progress === 100
                                        ? 'bg-emerald-500'
                                        : emp.progress < 50
                                        ? 'bg-amber-500'
                                        : 'bg-blue-600'
                                    }`}
                                    style={{ width: `${emp.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  emp.status === 'Hoàn thành'
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                    : emp.status === 'Chậm tiến độ'
                                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                                }`}
                              >
                                {emp.status === 'Hoàn thành' && <CheckCircle2 className="w-3 h-3" />}
                                {emp.status === 'Chậm tiến độ' && <AlertCircle className="w-3 h-3" />}
                                {emp.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-slate-400 text-[11px]">
                              {emp.lastActive}
                            </td>
                            <td className="p-3.5 text-right">
                              <button
                                onClick={() => handleOpenAssignModal(emp)}
                                className="text-xs font-semibold px-2.5 py-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100"
                              >
                                Phân gán
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

            {/* TAB 5: REPORTS & ANALYTICS */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Báo cáo & Bảng điểm Tổng hợp</h2>
                    <p className="text-xs text-slate-400">Kết nối trực tiếp Open edX Analytics Engine & Metabase</p>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                    <Download className="w-4 h-4" /> Xuất Báo cáo PDF/CSV
                  </button>
                </div>

                <div className={`p-6 rounded-xl border shadow-sm ${
                  darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                }`}>
                  <h3 className="text-sm font-bold mb-4 text-slate-800 dark:text-slate-100">Báo cáo Tuân thủ Đào tạo Định kỳ</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                      <p className="text-xs text-slate-500">Đã hoàn thành đúng hạn</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">92.4%</p>
                    </div>
                    <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                      <p className="text-xs text-slate-500">Gần đến hạn gia hạn</p>
                      <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">45 Nhân sự</p>
                    </div>
                    <div className="p-4 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                      <p className="text-xs text-slate-500">Quá hạn tuân thủ</p>
                      <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">12 Nhân sự</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    * Báo cáo tuân thủ được đồng bộ tự động lúc 00:00 hàng ngày thông qua Celery Background Worker của Open edX.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 6: CERTIFICATES */}
            {activeTab === 'certificates' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Quản lý Chứng chỉ Doanh nghiệp</h2>
                  <p className="text-xs text-slate-400">Tự động cấp phát chứng chỉ số có mã QR xác thực</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`p-5 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Phôi Chứng chỉ Chuẩn ACME 2026</h3>
                        <p className="text-xs text-slate-400">Áp dụng cho toàn bộ khóa học Chuyên môn</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">
                      Tích hợp chữ ký số ban giám đốc, tự động chèn Tên nhân viên, Tên khóa học và Ngày hoàn thành.
                    </p>
                    <button className="text-xs font-semibold px-3 py-1.5 bg-blue-600 text-white rounded-lg">
                      Chỉnh sửa Phôi (Certificate Generator)
                    </button>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* ================= ASSIGNMENT MODAL ================= */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-xl border p-6 shadow-xl ${
            darkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-base font-bold">Gán Lộ trình Đào tạo Mới</h3>
              <button onClick={() => setIsAssignModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              {selectedEmployeeForAssign && (
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-slate-500">Nhân sự chọn:</p>
                  <p className="text-sm font-bold text-blue-700 dark:text-blue-300">{selectedEmployeeForAssign.name}</p>
                  <p className="text-xs text-slate-400">{selectedEmployeeForAssign.department} • {selectedEmployeeForAssign.role}</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Chọn Lộ trình Đào tạo:
                </label>
                <select
                  value={selectedAssignmentPath}
                  onChange={(e) => setSelectedAssignmentPath(e.target.value)}
                  className={`w-full text-xs font-medium py-2 px-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {paths.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title} ({p.courseCount} bài học)
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs">
                ⚠️ Việc gán lộ trình mới sẽ tự động đăng ký (Enroll) nhân viên vào toàn bộ các khóa học thuộc lộ trình này trên Open edX.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmAssignment}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Xác nhận Gán
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// --- SUB-COMPONENTS ---
function NavItem({ icon, label, badge, active, onClick, darkMode }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
        active
          ? 'bg-blue-600 text-white font-bold shadow-sm'
          : darkMode
          ? 'text-slate-300 hover:bg-slate-700/60 hover:text-white'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <div className="flex items-center gap-2.5">
        {icon}
        <span>{label}</span>
      </div>
      {badge !== undefined && (
        <span
          className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
            active ? 'bg-white text-blue-600' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function StatCard({ title, value, subText, icon, trend, darkMode }) {
  return (
    <div
      className={`p-4 rounded-xl border shadow-sm flex flex-col justify-between ${
        darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">{title}</span>
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700">{icon}</div>
      </div>
      <div className="mt-2">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</h3>
        <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">{trend}</p>
      </div>
      <p className="text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-700/60 mt-3 pt-2">
        {subText}
      </p>
    </div>
  );
}