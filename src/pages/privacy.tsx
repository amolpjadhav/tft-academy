import Head from "next/head";
import PageShell from "@/components/layout/PageShell";

const LAST_UPDATED = "March 28, 2025";

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy — TFT School</title>
        <meta
          name="description"
          content="TFT School privacy policy. Learn how we collect, use, and protect your information."
        />
      </Head>
      <PageShell title="Privacy Policy" subtitle={`Last updated: ${LAST_UPDATED}`}>
        <article className="max-w-2xl mx-auto space-y-6">

          <div className="bg-bg-surface rounded-2xl border border-white/8 p-6">
            <p className="text-text-secondary text-sm leading-relaxed">
              TFT School ("we", "us", or "our") operates the website <strong className="text-text-primary">tftschool.com</strong> (the "Site"). This page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our Site and the choices you have associated with that data.
            </p>
          </div>

          {[
            {
              title: "Information We Collect",
              body: (
                <div className="space-y-3 text-text-secondary text-sm leading-relaxed">
                  <p>
                    TFT School does not require you to create an account or provide any personal information to use the site. We do not collect your name, email address, or any personally identifiable information unless you voluntarily contact us.
                  </p>
                  <p>
                    Like most websites, our hosting infrastructure may automatically collect certain non-personally identifiable information, including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-text-muted">
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Referring/exit pages</li>
                    <li>Date and time of visit</li>
                    <li>Pages viewed on the Site</li>
                  </ul>
                  <p>
                    This information is used in aggregate form to understand how visitors use the Site and to improve the user experience. It is not linked to any personally identifiable information.
                  </p>
                </div>
              ),
            },
            {
              title: "Cookies",
              body: (
                <div className="space-y-3 text-text-secondary text-sm leading-relaxed">
                  <p>
                    TFT School uses cookies and similar tracking technologies to improve your experience on the Site. Cookies are small data files placed on your device.
                  </p>
                  <p>
                    We use cookies for the following purposes:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-text-muted">
                    <li><strong className="text-text-secondary">Analytics cookies</strong> — to understand how visitors interact with the Site</li>
                    <li><strong className="text-text-secondary">Advertising cookies</strong> — to serve relevant advertisements through Google AdSense</li>
                    <li><strong className="text-text-secondary">Preference cookies</strong> — to remember settings you have selected</li>
                  </ul>
                  <p>
                    You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of the Site may not function correctly.
                  </p>
                </div>
              ),
            },
            {
              title: "Google AdSense & Third-Party Advertising",
              body: (
                <div className="space-y-3 text-text-secondary text-sm leading-relaxed">
                  <p>
                    TFT School uses <strong className="text-text-primary">Google AdSense</strong> to display advertisements. Google AdSense is a service provided by Google LLC that uses cookies to serve ads based on your prior visits to this site and other sites on the internet.
                  </p>
                  <p>
                    Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our Site and/or other sites on the Internet. You may opt out of personalized advertising by visiting{" "}
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-gold underline hover:text-accent-gold-light"
                    >
                      Google Ads Settings
                    </a>.
                  </p>
                  <p>
                    For more information on how Google uses data from sites that use its advertising services, please see{" "}
                    <a
                      href="https://policies.google.com/technologies/partner-sites"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-gold underline hover:text-accent-gold-light"
                    >
                      Google's Privacy &amp; Terms
                    </a>.
                  </p>
                </div>
              ),
            },
            {
              title: "How We Use Your Information",
              body: (
                <div className="space-y-3 text-text-secondary text-sm leading-relaxed">
                  <p>The information we collect is used to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-text-muted">
                    <li>Operate and maintain the Site</li>
                    <li>Understand and analyze how you use the Site</li>
                    <li>Develop new features and improve the Site</li>
                    <li>Display relevant advertisements through Google AdSense</li>
                    <li>Respond to your comments or questions when you contact us</li>
                  </ul>
                  <p>
                    We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties (such as Google) who assist us in operating our Site, as long as those parties agree to keep this information confidential.
                  </p>
                </div>
              ),
            },
            {
              title: "Children's Privacy",
              body: (
                <p className="text-text-secondary text-sm leading-relaxed">
                  TFT School is intended for a general audience and does not knowingly collect personally identifiable information from children under the age of 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at{" "}
                  <a href="mailto:clickfixdev8@gmail.com" className="text-accent-gold underline hover:text-accent-gold-light">
                    clickfixdev8@gmail.com
                  </a>{" "}
                  and we will take steps to remove that information.
                </p>
              ),
            },
            {
              title: "Links to Other Sites",
              body: (
                <p className="text-text-secondary text-sm leading-relaxed">
                  Our Site may contain links to third-party websites. These linked sites have separate and independent privacy policies. We have no responsibility or liability for the content and activities of these linked sites and encourage you to review their privacy policies.
                </p>
              ),
            },
            {
              title: "Data Retention",
              body: (
                <p className="text-text-secondary text-sm leading-relaxed">
                  TFT School does not store personal data on its servers. Any analytics data collected by third-party services (such as Google Analytics or Google AdSense) is retained in accordance with those services' own data retention policies.
                </p>
              ),
            },
            {
              title: "Your Rights",
              body: (
                <div className="space-y-3 text-text-secondary text-sm leading-relaxed">
                  <p>Depending on your location, you may have the right to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-text-muted">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to or restrict processing of your data</li>
                    <li>Opt out of targeted advertising (via Google Ads Settings)</li>
                  </ul>
                  <p>
                    To exercise any of these rights, please contact us at{" "}
                    <a href="mailto:clickfixdev8@gmail.com" className="text-accent-gold underline hover:text-accent-gold-light">
                      clickfixdev8@gmail.com
                    </a>.
                  </p>
                </div>
              ),
            },
            {
              title: "Changes to This Privacy Policy",
              body: (
                <p className="text-text-secondary text-sm leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by updating the "Last updated" date at the top of this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              ),
            },
            {
              title: "Contact Us",
              body: (
                <p className="text-text-secondary text-sm leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:clickfixdev8@gmail.com" className="text-accent-gold underline hover:text-accent-gold-light">
                    clickfixdev8@gmail.com
                  </a>
                  . TFT School is an independent fan project and is not affiliated with Riot Games.
                </p>
              ),
            },
          ].map(({ title, body }) => (
            <section key={title} className="bg-bg-surface rounded-2xl border border-white/8 p-6">
              <h2 className="font-heading text-lg text-accent-gold tracking-wide mb-3">{title}</h2>
              {body}
            </section>
          ))}

        </article>
      </PageShell>
    </>
  );
}
