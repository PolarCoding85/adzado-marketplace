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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DollarSign,
  Calendar,
  CreditCard,
  Plus,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  Banknote,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface PaymentMethod {
  id: string
  type: "bank" | "paypal"
  name: string
  last4?: string
  isDefault: boolean
}

interface Payout {
  id: string
  amount: number
  date: string
  status: "pending" | "processing" | "completed" | "failed"
  method: string
  reference: string
}

interface Earning {
  id: string
  date: string
  advertiser: string
  offer: string
  leads: number
  amount: number
  status: "pending" | "approved" | "rejected"
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "bank",
    name: "Chase Bank",
    last4: "4567",
    isDefault: true,
  },
  {
    id: "2",
    type: "paypal",
    name: "PayPal",
    isDefault: false,
  },
]

const payouts: Payout[] = [
  {
    id: "PO-001",
    amount: 2500.0,
    date: "2024-02-15",
    status: "completed",
    method: "Bank Transfer",
    reference: "REF123456",
  },
  {
    id: "PO-002",
    amount: 1800.0,
    date: "2024-02-01",
    status: "completed",
    method: "Bank Transfer",
    reference: "REF123457",
  },
]

const earnings: Earning[] = [
  {
    id: "E-001",
    date: "2024-02-15",
    advertiser: "InsureCo",
    offer: "Home Insurance Leads",
    leads: 25,
    amount: 875.0,
    status: "approved",
  },
  {
    id: "E-002",
    date: "2024-02-14",
    advertiser: "SafeGuard Insurance",
    offer: "Auto Insurance Leads",
    leads: 18,
    amount: 630.0,
    status: "pending",
  },
]

function AddPaymentMethodDialog() {
  const [methodType, setMethodType] = useState<"bank" | "paypal">("bank")

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Payment Method</DialogTitle>
        <DialogDescription>
          Add a new payment method to receive your earnings
        </DialogDescription>
      </DialogHeader>
      <div className='space-y-4 py-4'>
        <div className='space-y-2'>
          <Label>Payment Method Type</Label>
          <Select
            value={methodType}
            onValueChange={(value) => setMethodType(value as "bank" | "paypal")}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='bank'>Bank Account</SelectItem>
              <SelectItem value='paypal'>PayPal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {methodType === "bank" ? (
          <>
            <div className='space-y-2'>
              <Label>Bank Name</Label>
              <Input placeholder='Enter bank name' />
            </div>
            <div className='space-y-2'>
              <Label>Account Number</Label>
              <Input placeholder='Enter account number' />
            </div>
            <div className='space-y-2'>
              <Label>Routing Number</Label>
              <Input placeholder='Enter routing number' />
            </div>
          </>
        ) : (
          <div className='space-y-2'>
            <Label>PayPal Email</Label>
            <Input type='email' placeholder='Enter PayPal email' />
          </div>
        )}

        <Button className='w-full'>Add Payment Method</Button>
      </div>
    </DialogContent>
  )
}

export default function PayoutsPage() {
  const [pendingBalance, setPendingBalance] = useState(1505.0)
  const [availableBalance, setAvailableBalance] = useState(3500.0)
  const [nextPayout, setNextPayout] = useState("2024-03-01")

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Payouts</h1>
        <p className='text-muted-foreground'>
          Manage your earnings and payment methods
        </p>
      </div>

      {/* Quick Stats */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Available Balance</span>
          </div>
          <p className='text-2xl font-bold mt-2'>
            ${availableBalance.toFixed(2)}
          </p>
          <p className='text-sm text-muted-foreground'>Ready for withdrawal</p>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Pending Balance</span>
          </div>
          <p className='text-2xl font-bold mt-2'>
            ${pendingBalance.toFixed(2)}
          </p>
          <p className='text-sm text-muted-foreground'>
            Processing period: 7 days
          </p>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <Calendar className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Next Payout</span>
          </div>
          <p className='text-2xl font-bold mt-2'>{nextPayout}</p>
          <p className='text-sm text-muted-foreground'>
            Estimated: ${availableBalance.toFixed(2)}
          </p>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card>
        <div className='p-6 flex items-center justify-between'>
          <div>
            <h2 className='text-lg font-semibold'>Payment Methods</h2>
            <p className='text-sm text-muted-foreground'>
              Manage your payout methods
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
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentMethods.map((method) => (
              <TableRow key={method.id}>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    {method.type === "bank" ? (
                      <Banknote className='h-4 w-4' />
                    ) : (
                      <CreditCard className='h-4 w-4' />
                    )}
                    <span>{method.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {method.last4 ? `****${method.last4}` : ""}
                  {method.isDefault && (
                    <Badge variant='secondary' className='ml-2'>
                      Default
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant='default'>Verified</Badge>
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

      {/* Recent Earnings */}
      <Card>
        <div className='p-6'>
          <h2 className='text-lg font-semibold'>Recent Earnings</h2>
          <p className='text-sm text-muted-foreground'>
            Your latest earnings from offers
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Advertiser</TableHead>
              <TableHead>Offer</TableHead>
              <TableHead className='text-right'>Leads</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {earnings.map((earning) => (
              <TableRow key={earning.id}>
                <TableCell>{earning.date}</TableCell>
                <TableCell>{earning.advertiser}</TableCell>
                <TableCell>{earning.offer}</TableCell>
                <TableCell className='text-right'>{earning.leads}</TableCell>
                <TableCell className='text-right'>
                  ${earning.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      earning.status === "approved"
                        ? "default"
                        : earning.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {earning.status.charAt(0).toUpperCase() +
                      earning.status.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Payout History */}
      <Card>
        <div className='p-6'>
          <h2 className='text-lg font-semibold'>Payout History</h2>
          <p className='text-sm text-muted-foreground'>
            View your past payouts and their status
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payouts.map((payout) => (
              <TableRow key={payout.id}>
                <TableCell>{payout.date}</TableCell>
                <TableCell>${payout.amount.toFixed(2)}</TableCell>
                <TableCell>{payout.method}</TableCell>
                <TableCell>{payout.reference}</TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    {payout.status === "completed" ? (
                      <CheckCircle className='h-4 w-4 text-green-500' />
                    ) : payout.status === "processing" ? (
                      <Clock className='h-4 w-4 text-yellow-500' />
                    ) : (
                      <AlertCircle className='h-4 w-4 text-red-500' />
                    )}
                    <span className='capitalize'>{payout.status}</span>
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
    </div>
  )
}
