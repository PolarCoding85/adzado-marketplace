"use client"

import { Card } from "@/components/ui/card"
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Bell,
} from "lucide-react"
import { motion } from "framer-motion"

interface StatCardProps {
  title: string
  value: string
  change?: string
  icon: React.ReactNode
  loading?: boolean
}

function StatCard({ title, value, change, icon, loading }: StatCardProps) {
  return (
    <Card className='p-6'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <p className='text-sm text-muted-foreground'>{title}</p>
          {loading ? (
            <div className='h-7 w-24 animate-pulse rounded-md bg-muted' />
          ) : (
            <p className='text-2xl font-bold'>{value}</p>
          )}
          {change && (
            <p
              className={`text-xs ${
                change.startsWith("+")
                  ? "text-green-500"
                  : change.startsWith("-")
                  ? "text-red-500"
                  : "text-muted-foreground"
              }`}
            >
              {change} from last month
            </p>
          )}
        </div>
        <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center'>
          {icon}
        </div>
      </div>
    </Card>
  )
}

function PublisherDashboard() {
  return (
    <div className='space-y-8'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total Earnings'
          value='$12,345'
          change='+12.5%'
          icon={<DollarSign className='h-6 w-6 text-primary' />}
        />
        <StatCard
          title='Active Offers'
          value='24'
          change='+3'
          icon={<Target className='h-6 w-6 text-primary' />}
        />
        <StatCard
          title='Conversion Rate'
          value='3.2%'
          change='+0.8%'
          icon={<TrendingUp className='h-6 w-6 text-primary' />}
        />
        <StatCard
          title='Total Leads'
          value='1,234'
          change='+18.2%'
          icon={<Users className='h-6 w-6 text-primary' />}
        />
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Card className='p-6'>
          <h3 className='font-semibold mb-4'>Recent Activity</h3>
          {/* Add recent activity list component */}
        </Card>
        <Card className='p-6'>
          <h3 className='font-semibold mb-4'>Top Performing Offers</h3>
          {/* Add top offers component */}
        </Card>
      </div>
    </div>
  )
}

function AdvertiserDashboard() {
  return (
    <div className='space-y-8'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total Spend'
          value='$45,678'
          change='+8.3%'
          icon={<DollarSign className='h-6 w-6 text-primary' />}
        />
        <StatCard
          title='Active Campaigns'
          value='12'
          change='+2'
          icon={<BarChart3 className='h-6 w-6 text-primary' />}
        />
        <StatCard
          title='Total Leads'
          value='567'
          change='+24.5%'
          icon={<Users className='h-6 w-6 text-primary' />}
        />
        <StatCard
          title='Cost per Lead'
          value='$82'
          change='-5.2%'
          icon={<TrendingUp className='h-6 w-6 text-primary' />}
        />
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Card className='p-6'>
          <h3 className='font-semibold mb-4'>Campaign Performance</h3>
          {/* Add campaign performance chart component */}
        </Card>
        <Card className='p-6'>
          <h3 className='font-semibold mb-4'>Recent Leads</h3>
          {/* Add recent leads component */}
        </Card>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const role = "publisher"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='space-y-6'
    >
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
          <p className='text-muted-foreground'>
            Welcome back! Here's what's happening with your account.
          </p>
        </div>
        <button className='relative'>
          <Bell className='h-6 w-6 text-muted-foreground' />
          <span className='absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center'>
            3
          </span>
        </button>
      </div>

      {role === "publisher" ? <PublisherDashboard /> : <AdvertiserDashboard />}
    </motion.div>
  )
}
