"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  User,
  Lock,
  Bell,
  Link as LinkIcon,
  Shield,
  Smartphone,
  Mail,
  Github,
  Linkedin,
  Facebook,
  AlertTriangle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export default function SettingsPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState({
    security: true,
    updates: true,
    offers: true,
    reports: true,
  })

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Settings</h1>
        <p className='text-muted-foreground'>
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue='account' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='account'>
            <User className='h-4 w-4 mr-2' />
            Account
          </TabsTrigger>
          <TabsTrigger value='security'>
            <Lock className='h-4 w-4 mr-2' />
            Security
          </TabsTrigger>
          <TabsTrigger value='notifications'>
            <Bell className='h-4 w-4 mr-2' />
            Notifications
          </TabsTrigger>
          <TabsTrigger value='connections'>
            <LinkIcon className='h-4 w-4 mr-2' />
            Connected Accounts
          </TabsTrigger>
        </TabsList>

        <TabsContent value='account'>
          <Card className='p-6'>
            <div className='space-y-6'>
              <div>
                <h3 className='text-lg font-semibold'>Personal Information</h3>
                <p className='text-sm text-muted-foreground'>
                  Update your personal details
                </p>
              </div>

              <div className='space-y-4'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='firstName'>First Name</Label>
                    <Input id='firstName' placeholder='John' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='lastName'>Last Name</Label>
                    <Input id='lastName' placeholder='Doe' />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email'>Email Address</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='john@example.com'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='phone'>Phone Number</Label>
                  <Input
                    id='phone'
                    type='tel'
                    placeholder='+1 (555) 000-0000'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='timezone'>Timezone</Label>
                  <Select defaultValue='UTC'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select timezone' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='UTC'>UTC</SelectItem>
                      <SelectItem value='EST'>Eastern Time</SelectItem>
                      <SelectItem value='CST'>Central Time</SelectItem>
                      <SelectItem value='MST'>Mountain Time</SelectItem>
                      <SelectItem value='PST'>Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='flex justify-end'>
                <Button>Save Changes</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value='security'>
          <div className='space-y-4'>
            <Card className='p-6'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label className='text-base'>
                      Two-Factor Authentication
                    </Label>
                    <p className='text-sm text-muted-foreground'>
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>

                {twoFactorEnabled && (
                  <div className='space-y-4 border-t pt-4'>
                    <div className='flex items-start gap-4'>
                      <div className='rounded-full bg-primary/10 p-2'>
                        <Smartphone className='h-4 w-4 text-primary' />
                      </div>
                      <div className='space-y-1'>
                        <p className='font-medium'>Authenticator App</p>
                        <p className='text-sm text-muted-foreground'>
                          Use an authenticator app to generate one-time codes
                        </p>
                        <Button variant='outline' size='sm'>
                          Set up
                        </Button>
                      </div>
                    </div>

                    <div className='flex items-start gap-4'>
                      <div className='rounded-full bg-primary/10 p-2'>
                        <Mail className='h-4 w-4 text-primary' />
                      </div>
                      <div className='space-y-1'>
                        <p className='font-medium'>Email Authentication</p>
                        <p className='text-sm text-muted-foreground'>
                          Receive codes via email
                        </p>
                        <Button variant='outline' size='sm'>
                          Set up
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card className='p-6'>
              <div className='space-y-4'>
                <div>
                  <h3 className='text-lg font-semibold'>Password</h3>
                  <p className='text-sm text-muted-foreground'>
                    Change your password
                  </p>
                </div>

                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label>Current Password</Label>
                    <Input type='password' />
                  </div>
                  <div className='space-y-2'>
                    <Label>New Password</Label>
                    <Input type='password' />
                  </div>
                  <div className='space-y-2'>
                    <Label>Confirm New Password</Label>
                    <Input type='password' />
                  </div>
                </div>

                <div className='flex justify-end'>
                  <Button>Update Password</Button>
                </div>
              </div>
            </Card>

            <Card className='p-6'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='text-lg font-semibold'>Active Sessions</h3>
                    <p className='text-sm text-muted-foreground'>
                      Manage your active sessions
                    </p>
                  </div>
                  <Button variant='outline'>Sign out all devices</Button>
                </div>

                <div className='space-y-4'>
                  <div className='flex items-start justify-between'>
                    <div className='space-y-1'>
                      <p className='font-medium'>Chrome on MacOS</p>
                      <p className='text-sm text-muted-foreground'>
                        Last active: 2 minutes ago
                      </p>
                      <Badge variant='secondary'>Current Session</Badge>
                    </div>
                    <Button variant='ghost' size='sm'>
                      Sign out
                    </Button>
                  </div>

                  <div className='flex items-start justify-between'>
                    <div className='space-y-1'>
                      <p className='font-medium'>Safari on iPhone</p>
                      <p className='text-sm text-muted-foreground'>
                        Last active: 2 hours ago
                      </p>
                    </div>
                    <Button variant='ghost' size='sm'>
                      Sign out
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='notifications'>
          <Card className='p-6'>
            <div className='space-y-6'>
              <div>
                <h3 className='text-lg font-semibold'>Email Notifications</h3>
                <p className='text-sm text-muted-foreground'>
                  Choose what updates you want to receive
                </p>
              </div>

              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label className='text-base'>Security Alerts</Label>
                    <p className='text-sm text-muted-foreground'>
                      Receive alerts about security updates and unusual activity
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications.security}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({
                        ...emailNotifications,
                        security: checked,
                      })
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label className='text-base'>Product Updates</Label>
                    <p className='text-sm text-muted-foreground'>
                      News about product and feature updates
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications.updates}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({
                        ...emailNotifications,
                        updates: checked,
                      })
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label className='text-base'>Offer Updates</Label>
                    <p className='text-sm text-muted-foreground'>
                      Notifications about new offers and opportunities
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications.offers}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({
                        ...emailNotifications,
                        offers: checked,
                      })
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label className='text-base'>Reports & Analytics</Label>
                    <p className='text-sm text-muted-foreground'>
                      Weekly reports and performance analytics
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications.reports}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({
                        ...emailNotifications,
                        reports: checked,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value='connections'>
          <Card className='p-6'>
            <div className='space-y-6'>
              <div>
                <h3 className='text-lg font-semibold'>Connected Accounts</h3>
                <p className='text-sm text-muted-foreground'>
                  Manage your connected accounts and services
                </p>
              </div>

              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <div className='rounded-full bg-primary/10 p-2'>
                      <Github className='h-6 w-6' />
                    </div>
                    <div>
                      <p className='font-medium'>GitHub</p>
                      <p className='text-sm text-muted-foreground'>
                        Connect your GitHub account
                      </p>
                    </div>
                  </div>
                  <Button variant='outline'>Connect</Button>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <div className='rounded-full bg-primary/10 p-2'>
                      <Linkedin className='h-6 w-6' />
                    </div>
                    <div>
                      <p className='font-medium'>LinkedIn</p>
                      <p className='text-sm text-muted-foreground'>
                        Connect your LinkedIn account
                      </p>
                    </div>
                  </div>
                  <Button variant='outline'>Connect</Button>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <div className='rounded-full bg-primary/10 p-2'>
                      <Facebook className='h-6 w-6' />
                    </div>
                    <div>
                      <p className='font-medium'>Facebook</p>
                      <p className='text-sm text-muted-foreground'>
                        Connect your Facebook account
                      </p>
                    </div>
                  </div>
                  <Button variant='outline'>Connect</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
