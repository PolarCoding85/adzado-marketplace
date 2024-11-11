export default function PrivacyPage() {
  return (
    <div className='container py-16 max-w-4xl'>
      <div className='space-y-8'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-bold tracking-tight'>Privacy Policy</h1>
          <p className='text-lg text-muted-foreground'>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className='prose prose-gray dark:prose-invert max-w-none'>
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy explains how Adzado ("we," "us," or "our")
            collects, uses, and protects your personal information when you use
            our platform.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <ul>
            <li>Account information (name, email, phone number)</li>
            <li>Business information</li>
            <li>Payment information</li>
            <li>Usage data and analytics</li>
            <li>Communication records</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Process transactions</li>
            <li>Communicate with you</li>
            <li>Ensure platform security</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. Information Sharing</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>Platform users (as necessary for transactions)</li>
            <li>Service providers</li>
            <li>Legal authorities (when required)</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your
            information, including:
          </p>
          <ul>
            <li>Encryption of sensitive data</li>
            <li>Regular security assessments</li>
            <li>Access controls</li>
            <li>Secure data storage</li>
          </ul>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability</li>
          </ul>

          <h2>7. Cookies and Tracking</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul>
            <li>Improve user experience</li>
            <li>Analyze platform usage</li>
            <li>Personalize content</li>
            <li>Remember preferences</li>
          </ul>

          <h2>8. International Data Transfers</h2>
          <p>
            We may transfer your data internationally, ensuring appropriate
            safeguards are in place to protect your information.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Our platform is not intended for children under 13. We do not
            knowingly collect information from children under 13.
          </p>

          <h2>10. Changes to Privacy Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify you
            of significant changes through the platform or via email.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            For privacy-related questions or concerns, contact us at
            privacy@adzado.com.
          </p>

          <h2>12. Legal Basis for Processing</h2>
          <p>We process your information based on:</p>
          <ul>
            <li>Contract performance</li>
            <li>Legal obligations</li>
            <li>Legitimate interests</li>
            <li>Your consent</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
