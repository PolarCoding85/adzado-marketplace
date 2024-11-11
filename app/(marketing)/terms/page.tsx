export default function TermsPage() {
  return (
    <div className='container py-16 max-w-4xl'>
      <div className='space-y-8'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-bold tracking-tight'>
            Terms of Service
          </h1>
          <p className='text-lg text-muted-foreground'>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className='prose prose-gray dark:prose-invert max-w-none'>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Adzado platform (&quot;Platform&quot;),
            you agree to be bound by these Terms of Service (&quot;Terms&quot;).
            If you do not agree to these Terms, do not use the Platform.
          </p>

          <h2>2. Platform Description</h2>
          <p>
            Adzado provides a marketplace connecting advertisers with media
            buyers for lead generation purposes. The Platform facilitates the
            buying and selling of leads, subject to quality standards and
            compliance requirements.
          </p>

          <h2>3. User Registration</h2>
          <p>To use the Platform, you must:</p>
          <ul>
            <li>Be at least 18 years old</li>
            <li>Complete the registration process</li>
            <li>Provide accurate and complete information</li>
            <li>Maintain and update your information</li>
          </ul>

          <h2>4. User Obligations</h2>
          <p>Users agree to:</p>
          <ul>
            <li>Comply with all applicable laws and regulations</li>
            <li>Maintain accurate records</li>
            <li>Protect account credentials</li>
            <li>Report unauthorized access</li>
          </ul>

          <h2>5. Lead Quality Standards</h2>
          <p>All leads must meet our quality standards:</p>
          <ul>
            <li>Accurate and current information</li>
            <li>Obtained through compliant methods</li>
            <li>Proper consent obtained</li>
            <li>No fraudulent or manipulated data</li>
          </ul>

          <h2>6. Payment Terms</h2>
          <p>Payment terms include:</p>
          <ul>
            <li>Fees as specified in offer terms</li>
            <li>Payment processing through approved methods</li>
            <li>Net payment terms as agreed</li>
            <li>Currency and processing fees</li>
          </ul>

          <h2>7. Intellectual Property</h2>
          <p>
            All Platform content and technology are protected by intellectual
            property rights. Users may not copy, modify, or distribute Platform
            content without permission.
          </p>

          <h2>8. Privacy and Data Protection</h2>
          <p>
            Users must comply with privacy laws and our Privacy Policy regarding
            the collection, use, and protection of personal data.
          </p>

          <h2>9. Termination</h2>
          <p>
            We reserve the right to suspend or terminate access to the Platform
            for violations of these Terms or any applicable laws.
          </p>

          <h2>10. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Adzado shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. Continued use of the Platform
            constitutes acceptance of modified Terms.
          </p>

          <h2>12. Contact Information</h2>
          <p>
            For questions about these Terms, contact us at legal@adzado.com.
          </p>
        </div>
      </div>
    </div>
  )
}
