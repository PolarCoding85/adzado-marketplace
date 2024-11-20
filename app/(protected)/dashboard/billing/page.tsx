"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  CreditCard,
  Plus,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Wallet,
  Receipt,
  ArrowUpRight,
  Building,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface PaymentMethod {
  id: string
  type: "card" | "bank"
  last4: string
  expiryDate?: string
  isDefault: boolean
  brand?: string
  bankName?: string
}

interface Invoice {
  id: string
  date: string
  amount: number
  status: "paid" | "pending" | "failed"
  description: string
}

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  status: "completed" | "pending" | "failed"
  type: "charge" | "refund"
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "card",
    last4: "4242",
    expiryDate: "12/24",
    isDefault: true,
    brand: "Visa",
  },
  {
    id: "2",
    type: "bank",
    last4: "1234",
    isDefault: false,
    bankName: "Chase",
  },
]

const invoices: Invoice[] = [
  {
    id: "INV-001",
    date: "2024-02-15",
    amount: 2500.0,
    status: "paid",
    description: "February 2024 Lead Generation Services",
  },
  {
    id: "INV-002",
    date: "2024-01-15",
    amount: 2200.0,
    status: "paid",
    description: "January 2024 Lead Generation Services",
  },
]

const transactions: Transaction[] = [
  {
    id: "TRX-001",
    date: "2024-02-15",
    description: "Auto-charge for February services",
    amount: 2500.0,
    status: "completed",
    type: "charge",
  },
  {
    id: "TRX-002",
    date: "2024-02-10",
    description: "Refund for invalid leads",
    amount: 150.0,
    status: "completed",
    type: "refund",
  },
]

function AddPaymentMethodDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Payment Method</DialogTitle>
        <DialogDescription>
          Add a new credit card or bank account for billing
        </DialogDescription>
      </DialogHeader>
      <div className='space-y-4 py-4'>
        <div className='space-y-2'>
          <Label>Card Number</Label>
          <Input placeholder='4242 4242 4242 4242' />
        </div>
        <div className='grid grid-cols-3 gap-4'>
          <div className='space-y-2'>
            <Label>Expiry Month</Label>
            <Input placeholder='MM' />
          </div>
          <div className='space-y-2'>
            <Label>Expiry Year</Label>
            <Input placeholder='YY' />
          </div>
          <div className='space-y-2'>
            <Label>CVC</Label>
            <Input placeholder='123' />
          </div>
        </div>
        <Button className='w-full'>Add Payment Method</Button>
      </div>
    </DialogContent>
  )
}

export default function BillingPage() {
  const [currentBalance, setCurrentBalance] = useState(3500.0)
  const [monthlySpend, setMonthlySpend] = useState(2500.0)

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>
          Billing & Payments
        </h1>
        <p className='text-muted-foreground'>
          Manage your payment methods and view billing history
        </p>
      </div>

      {/* Quick Stats */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <Wallet className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Current Balance</span>
          </div>
          <p className='text-2xl font-bold mt-2'>
            ${currentBalance.toFixed(2)}
          </p>
          <p className='text-sm text-muted-foreground'>Available for leads</p>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Monthly Spend</span>
          </div>
          <p className='text-2xl font-bold mt-2'>${monthlySpend.toFixed(2)}</p>
          <p className='text-sm text-muted-foreground'>Current billing cycle</p>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <Receipt className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Next Invoice</span>
          </div>
          <p className='text-2xl font-bold mt-2'>Mar 1, 2024</p>
          <p className='text-sm text-muted-foreground'>Estimated: $2,500.00</p>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card>
        <div className='p-6 flex items-center justify-between'>
          <div>
            <h2 className='text-lg font-semibold'>Payment Methods</h2>
            <p className='text-sm text-muted-foreground'>
              Manage your payment methods for automatic billing
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className='mr-2 h-4 w-4' />
                Add Payment Method
              </Button>
            </DialogTrigger>
            <AddPaymentMethodDialog />
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment Method</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentMethods.map((method) => (
              <TableRow key={method.id}>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    {method.type === "card" ? (
                      <CreditCard className='h-4 w-4' />
                    ) : (
                      <Building className='h-4 w-4' />
                    )}
                    <span>
                      {method.type === "card"
                        ? `${method.brand} ****${method.last4}`
                        : `${method.bankName} ****${method.last4}`}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {method.isDefault && (
                    <Badge variant='secondary'>Default</Badge>
                  )}
                </TableCell>
                <TableCell>{method.expiryDate || "N/A"}</TableCell>
                <TableCell>
                  <Badge variant='default'>Active</Badge>
                </TableCell>
                <TableCell className='text-right'>
                  <Button variant='ghost' size='sm'>
                    Edit
                  </Button>
                  {!method.isDefault && (
                    <Button variant='ghost' size='sm'>
                      Make Default
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <div className='p-6'>
          <h2 className='text-lg font-semibold'>Recent Transactions</h2>
          <p className='text-sm text-muted-foreground'>
            View your recent billing activity
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Receipt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <span
                    className={
                      transaction.type === "refund" ? "text-red-500" : ""
                    }
                  >
                    {transaction.type === "refund" ? "-" : ""}$
                    {transaction.amount.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    {transaction.status === "completed" ? (
                      <CheckCircle className='h-4 w-4 text-green-500' />
                    ) : transaction.status === "pending" ? (
                      <Clock className='h-4 w-4 text-yellow-500' />
                    ) : (
                      <AlertCircle className='h-4 w-4 text-red-500' />
                    )}
                    <span className='capitalize'>{transaction.status}</span>
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  <Button variant='ghost' size='sm'>
                    <Download className='h-4 w-4' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Invoices */}
      <Card>
        <div className='p-6'>
          <h2 className='text-lg font-semibold'>Billing History</h2>
          <p className='text-sm text-muted-foreground'>
            Download past invoices and billing statements
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className='font-medium'>{invoice.id}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      invoice.status === "paid"
                        ? "default"
                        : invoice.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {invoice.status.charAt(0).toUpperCase() +
                      invoice.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className='text-right'>
                  <Button variant='ghost' size='sm'>
                    <Download className='mr-2 h-4 w-4' />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
