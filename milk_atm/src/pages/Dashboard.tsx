import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    PieChart,
    Calendar,
    Droplets,
    TrendingUp,
    Users,
    CreditCard,
} from "lucide-react"
import {
    Area,
    BarChart,
    AreaChart,
    Bar,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { Link } from "react-router-dom";
import { fetchDashboard } from "../services/api";
import type { dashboardInterface } from "../types";

const dailySalesData = [
    { time: "6AM", liters: 120 },
    { time: "9AM", liters: 240 },
    { time: "12PM", liters: 180 },
    { time: "3PM", liters: 300 },
    { time: "6PM", liters: 220 },
    { time: "9PM", liters: 100 },
]

const monthlySalesData = [
    { month: "Jan", liters: 3200 },
    { month: "Feb", liters: 2800 },
    { month: "Mar", liters: 3500 },
    { month: "Apr", liters: 3800 },
    { month: "May", liters: 4200 },
    { month: "Jun", liters: 3900 },
    { month: "Jul", liters: 4100 },
    { month: "Aug", liters: 4500 },
    { month: "Sep", liters: 4300 },
    { month: "Oct", liters: 4000 },
    { month: "Nov", liters: 3700 },
    { month: "Dec", liters: 3900 },
]

const dailyPaymentData = [
    { name: "Online", value: 65 },
    { name: "Cash", value: 35 },
]

const monthlyPaymentData = [
    { month: "Jan", online: 1800, cash: 1400 },
    { month: "Feb", online: 1600, cash: 1200 },
    { month: "Mar", online: 2100, cash: 1400 },
    { month: "Apr", online: 2400, cash: 1400 },
    { month: "May", online: 2700, cash: 1500 },
    { month: "Jun", online: 2500, cash: 1400 },
    { month: "Jul", online: 2800, cash: 1300 },
    { month: "Aug", online: 3000, cash: 1500 },
    { month: "Sep", online: 2900, cash: 1400 },
    { month: "Oct", online: 2600, cash: 1400 },
    { month: "Nov", online: 2300, cash: 1400 },
    { month: "Dec", online: 2500, cash: 1400 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const Dashboard: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState("today")
    const [dashboard, setDashboard] = useState<dashboardInterface>({
        today_totals: {
            total_price: 0,
            total_quantity: 0
        },
        week_totals: {
            total_price: 0,
            total_quantity: 0
        },
        monthly_totals: {
            total_price: 0,
            total_quantity: 0
        },
        yearly_totals: {
            total_price: 0,
            total_quantity: 0
        },
        total_customer: 0
    })
    const totalSalesToday = dailySalesData.reduce((sum, item) => sum + item.liters, 0)
    const totalSalesMonth = monthlySalesData[new Date().getMonth()].liters
    const totalOnlinePaymentToday = dailyPaymentData[0].value
    useEffect(() => {
        fetchDashboard().then(res => {
            console.log(">Res", res)
            setDashboard(res)
        })
    }, [])
    return (
        <div className="container-fluid p-4">
            <div className="row mb-4">
                <div className="col-10">
                    <h1 className="display-5 fw-bold">Dairy Sales Dashboard</h1>
                    <p className="text-muted">Monitor your milk sales and payment statistics</p>
                </div>
                <div className="col-2 float-end">
                    <Link className="btn btn-primary" to='/sales/sale'><FontAwesomeIcon icon={['fas', 'plus']} /> Add New Sale</Link>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="row g-4 mb-4">
                {[
                    {
                        icon: <Droplets className="text-primary" size={24} />,
                        bg: "primary",
                        label: "Today's Sales",
                        value: `${dashboard.today_totals.total_quantity} L`,
                        change: "+12.5%",
                    },
                    {
                        icon: <Calendar className="text-success" size={24} />,
                        bg: "success",
                        label: "Monthly Sales",
                        value: `${dashboard.monthly_totals.total_quantity} L`,
                        change: "+8.3%",
                    },
                    {
                        icon: <CreditCard className="text-info" size={24} />,
                        bg: "info",
                        label: "Online Payments",
                        value: `${totalOnlinePaymentToday}%`,
                        change: "+5.2%",
                    },
                    {
                        icon: <Users className="text-warning" size={24} />,
                        bg: "warning",
                        label: "Active Customers",
                        value: `${dashboard.total_customer}`,
                        change: "+3.1%",
                    },
                ].map((card, i) => (
                    <div key={i} className="col-md-6 col-lg-3">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                    <div className={`bg-${card.bg} bg-opacity-10 p-3 rounded-3 me-3`}>
                                        {card.icon}
                                    </div>
                                    <div>
                                        <h6 className="text-muted mb-1">{card.label}</h6>
                                        <h3 className="mb-0">{card.value}</h3>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <TrendingUp size={18} className="text-success me-1" />
                                    <span className="text-success">{card.change}</span>
                                    <span className="text-muted ms-2">from previous</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Period Selector */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="btn-group" role="group">
                                {["today", "week", "month", "year"].map((period) => (
                                    <button
                                        key={period}
                                        type="button"
                                        className={`btn ${selectedPeriod === period ? "btn-primary" : "btn-outline-primary"
                                            }`}
                                        onClick={() => setSelectedPeriod(period)}
                                    >
                                        {period === "today"
                                            ? "Today"
                                            : period === "week"
                                                ? "This Week"
                                                : period === "month"
                                                    ? "This Month"
                                                    : "This Year"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Charts */}
            <div className="row g-4 mb-4">
                {/* Daily Sales Area Chart */}
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white border-0">
                            <h5 className="mb-0">Today's Milk Sales</h5>
                        </div>
                        <div className="card-body">
                            <div style={{ width: "100%", height: 300 }}>
                                <ResponsiveContainer>
                                    <AreaChart data={dailySalesData}>
                                        <defs>
                                            <linearGradient id="colorLiters" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#0d6efd" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="time" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Area
                                            type="monotone"
                                            dataKey="liters"
                                            stroke="#0d6efd"
                                            fillOpacity={1}
                                            fill="url(#colorLiters)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Monthly Sales Bar Chart */}
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white border-0">
                            <h5 className="mb-0">Monthly Milk Sales</h5>
                        </div>
                        <div className="card-body">
                            <div style={{ width: "100%", height: 300 }}>
                                <ResponsiveContainer>
                                    <BarChart data={monthlySalesData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="liters" fill="#198754" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Payment Charts */}
            <div className="row g-4">
                {/* Daily Payments Pie */}
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white border-0">
                            <h5 className="mb-0">Today's Payment Methods</h5>
                        </div>
                        <div className="card-body">
                            <div style={{ width: "100%", height: 300 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={dailyPaymentData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                            labelLine={false}
                                            label={({ name, percent }) =>
                                                `${name}: ${(percent * 100).toFixed(0)}%`
                                            }
                                        >
                                            {dailyPaymentData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Monthly Payments Bar */}
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white border-0">
                            <h5 className="mb-0">Monthly Payment Methods</h5>
                        </div>
                        <div className="card-body">
                            <div style={{ width: "100%", height: 300 }}>
                                <ResponsiveContainer>
                                    <BarChart data={monthlyPaymentData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="online" name="Online" fill="#0d6efd" />
                                        <Bar dataKey="cash" name="Cash" fill="#198754" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
