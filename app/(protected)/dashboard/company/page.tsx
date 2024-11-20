"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Building,
  Users,
  Settings,
  MoreVertical,
  Plus,
  Mail,
  UserPlus,
  Crown,
  Shield,
  User,
  Upload,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface TeamMember {
  id: string
  name: string
  email: string
  role: "owner" | "admin" | "member"
  status: "active" | "pending" | "inactive"
  joinedDate: string
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    role: "owner",
    status: "active",
    joinedDate: "2024-01-01",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "admin",
    status: "active",
    joinedDate: "2024-01-15",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@example.com",
    role: "member",
    status: "pending",
    joinedDate: "2024-02-01",
  },
]

function InviteTeamDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Invite Team Member</DialogTitle>
      </DialogHeader>
      <div className='space-y-4 py-4'>
        <div className='space-y-2'>
          <Label>Email Address</Label>
          <Input type='email' placeholder='colleague@company.com' />
        </div>
        <div className='space-y-2'>
          <Label>Role</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Select role' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='admin'>Admin</SelectItem>
              <SelectItem value='member'>Member</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label>Message (Optional)</Label>
          <Textarea
            placeholder='Add a personal message to your invitation...'
            className='min-h-[100px]'
          />
        </div>
        <Button className='w-full'>
          <Mail className='mr-2 h-4 w-4' />
          Send Invitation
        </Button>
      </div>
    </DialogContent>
  )
}

export default function CompanyPage() {
  const [companyDetails, setCompanyDetails] = useState({
    name: "Acme Insurance Co.",
    website: "https://acme-insurance.com",
    size: "51-200",
    industry: "Insurance",
    description: "Leading provider of insurance solutions.",
    address: "123 Business Ave, Suite 100",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "United States",
  })

  const getRoleBadge = (role: TeamMember["role"]) => {
    switch (role) {
      case "owner":
        return (
          <Badge variant='default' className='bg-purple-500'>
            <Crown className='mr-1 h-3 w-3' />
            Owner
          </Badge>
        )
      case "admin":
        return (
          <Badge variant='default' className='bg-blue-500'>
            <Shield className='mr-1 h-3 w-3' />
            Admin
          </Badge>
        )
      default:
        return (
          <Badge variant='secondary'>
            <User className='mr-1 h-3 w-3' />
            Member
          </Badge>
        )
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Company Settings
          </h1>
          <p className='text-muted-foreground'>
            Manage your company profile and team members
          </p>
        </div>
      </div>

      <Tabs defaultValue='profile' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='profile'>
            <Building className='h-4 w-4 mr-2' />
            Company Profile
          </TabsTrigger>
          <TabsTrigger value='team'>
            <Users className='h-4 w-4 mr-2' />
            Team Members
          </TabsTrigger>
          <TabsTrigger value='branding'>
            <Settings className='h-4 w-4 mr-2' />
            Branding
          </TabsTrigger>
        </TabsList>

        <TabsContent value='profile'>
          <Card className='p-6'>
            <form className='space-y-6'>
              <div className='grid gap-6 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label>Company Name</Label>
                  <Input
                    value={companyDetails.name}
                    onChange={(e) =>
                      setCompanyDetails({
                        ...companyDetails,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Website</Label>
                  <Input
                    type='url'
                    value={companyDetails.website}
                    onChange={(e) =>
                      setCompanyDetails({
                        ...companyDetails,
                        website: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Company Size</Label>
                  <Select
                    value={companyDetails.size}
                    onValueChange={(value) =>
                      setCompanyDetails({ ...companyDetails, size: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='1-10'>1-10 employees</SelectItem>
                      <SelectItem value='11-50'>11-50 employees</SelectItem>
                      <SelectItem value='51-200'>51-200 employees</SelectItem>
                      <SelectItem value='201-500'>201-500 employees</SelectItem>
                      <SelectItem value='500+'>500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label>Industry</Label>
                  <Input
                    value={companyDetails.industry}
                    onChange={(e) =>
                      setCompanyDetails({
                        ...companyDetails,
                        industry: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label>Company Description</Label>
                <Textarea
                  value={companyDetails.description}
                  onChange={(e) =>
                    setCompanyDetails({
                      ...companyDetails,
                      description: e.target.value,
                    })
                  }
                  className='min-h-[100px]'
                />
              </div>

              <div className='grid gap-6 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label>Street Address</Label>
                  <Input
                    value={companyDetails.address}
                    onChange={(e) =>
                      setCompanyDetails({
                        ...companyDetails,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label>City</Label>
                  <Input
                    value={companyDetails.city}
                    onChange={(e) =>
                      setCompanyDetails({
                        ...companyDetails,
                        city: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label>State/Province</Label>
                  <Input
                    value={companyDetails.state}
                    onChange={(e) =>
                      setCompanyDetails({
                        ...companyDetails,
                        state: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label>ZIP/Postal Code</Label>
                  <Input
                    value={companyDetails.zip}
                    onChange={(e) =>
                      setCompanyDetails({
                        ...companyDetails,
                        zip: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className='flex justify-end'>
                <Button>Save Changes</Button>
              </div>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value='team'>
          <Card>
            <div className='p-6 flex justify-between items-center'>
              <div>
                <h3 className='text-lg font-semibold'>Team Members</h3>
                <p className='text-sm text-muted-foreground'>
                  Manage your team and their access levels
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className='mr-2 h-4 w-4' />
                    Invite Member
                  </Button>
                </DialogTrigger>
                <InviteTeamDialog />
              </Dialog>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div>
                        <p className='font-medium'>{member.name}</p>
                        <p className='text-sm text-muted-foreground'>
                          {member.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(member.role)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          member.status === "active"
                            ? "default"
                            : member.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {member.status.charAt(0).toUpperCase() +
                          member.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{member.joinedDate}</TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <MoreVertical className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem>View Activity</DropdownMenuItem>
                          <DropdownMenuItem>Change Role</DropdownMenuItem>
                          <DropdownMenuItem className='text-destructive'>
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value='branding'>
          <Card className='p-6'>
            <div className='space-y-6'>
              <div>
                <h3 className='text-lg font-semibold mb-4'>Brand Assets</h3>
                <div className='grid gap-6 md:grid-cols-2'>
                  <div className='space-y-4'>
                    <Label>Company Logo</Label>
                    <div className='border-2 border-dashed rounded-lg p-6 text-center'>
                      <Button variant='outline'>
                        <Upload className='mr-2 h-4 w-4' />
                        Upload Logo
                      </Button>
                      <p className='text-sm text-muted-foreground mt-2'>
                        Recommended size: 200x200px
                      </p>
                    </div>
                  </div>
                  <div className='space-y-4'>
                    <Label>Brand Colors</Label>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label>Primary Color</Label>
                        <Input type='color' className='h-10' />
                      </div>
                      <div className='space-y-2'>
                        <Label>Secondary Color</Label>
                        <Input type='color' className='h-10' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Display Preferences</h3>
                <div className='grid gap-6 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label>Company Display Name</Label>
                    <Input placeholder='How your company appears to publishers' />
                  </div>
                  <div className='space-y-2'>
                    <Label>Tagline</Label>
                    <Input placeholder='A short description of your company' />
                  </div>
                </div>
              </div>

              <div className='flex justify-end'>
                <Button>Save Branding</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
