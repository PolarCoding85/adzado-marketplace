import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignInPage() {
  return (
    <div className='container flex h-screen w-screen flex-col items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Welcome back
          </h1>
          <p className='text-sm text-muted-foreground'>
            Enter your email to sign in to your account
          </p>
        </div>
        <div className='grid gap-6'>
          <form>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  placeholder='name@example.com'
                  type='email'
                  autoCapitalize='none'
                  autoComplete='email'
                  autoCorrect='off'
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  placeholder='Enter your password'
                  type='password'
                />
              </div>
              <Button>Sign In</Button>
            </div>
          </form>
        </div>
        <p className='px-8 text-center text-sm text-muted-foreground'>
          <Link
            href='/forgot-password'
            className='hover:text-brand underline underline-offset-4'
          >
            Forgot your password?
          </Link>
        </p>
        <p className='px-8 text-center text-sm text-muted-foreground'>
          Don&apos;t have an account?{" "}
          <Link
            href='/publisher-onboarding'
            className='hover:text-brand underline underline-offset-4'
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
