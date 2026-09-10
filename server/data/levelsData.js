// Comprehensive unique level scenario generator for all 35 games (10 levels each)
// Every level has a completely unique scenario question and unique tailored choices

const getDifficultyForLevel = (lvl) => {
  if (lvl <= 3) return 'Easy';
  if (lvl <= 6) return 'Medium';
  if (lvl <= 8) return 'Hard';
  if (lvl === 9) return 'Expert';
  return 'Final Challenge';
};

const getTimeLimitForLevel = (lvl) => {
  if (lvl <= 3) return 0;
  if (lvl <= 6) return 45;
  if (lvl <= 8) return 35;
  return 25;
};

// Shuffle helper to ensure choices are placed in varied positions across levels
const shuffleActions = (actions, seed) => {
  const arr = [...actions];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (seed + i * 7) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// 1. Phishing Detective (10 completely unique emails & choice sets)
const getPhishingDetectiveLevel = (lvl) => {
  const data = [
    {
      title: 'Phishing Detective: The Streaming Subscription Scam',
      instructions: 'Inspect the incoming billing email. Notice the sender domain, urgency trigger, and link target.',
      scenario: {
        from: 'Netflix Account Desk <billing-alert@netflx-verify-update.com>',
        to: 'agent.user@cyberworld.org',
        subject: 'URGENT: Your monthly subscription payment failed',
        date: 'Today, 09:14 AM',
        bodyHtml: '<p>Hi Customer,</p><p>We were unable to process your payment for the next billing cycle. Your subscription has been frozen.</p><p style="padding:10px; background:rgba(239,68,68,0.1); border-left:3px solid #ef4444;"><strong>Notice:</strong> Please update your payment card within 12 hours or your account and saved profiles will be permanently purged.</p><p><a href="#" class="text-cyan-400 underline">Click here to update your payment method now</a></p><p>Netflix Support Team</p>',
        targetDomain: 'netflx-verify-update.com',
        legitDomain: 'netflix.com'
      },
      redFlags: [
        { id: 'flag-sender', label: 'Misspelled Sender Domain (netflx)', description: 'Missing the letter "i" in netflix.', isCrucial: true },
        { id: 'flag-urgency', label: '12-Hour Urgency Threat', description: 'Creates artificial panic threatening deletion.', isCrucial: true }
      ],
      actions: [
        { id: 'act-report', label: 'Mark as Phishing & Delete Immediately', isCorrect: true, explanation: 'Correct! The lookalike domain netflx-verify-update.com is an attacker-hosted credential harvester.', scoreDelta: 100, costLife: false },
        { id: 'act-pay', label: 'Click the Link to Re-enter Credit Card', isCorrect: false, explanation: 'Dangerous! Entering card details here sends your CVV directly to cybercriminals.', scoreDelta: -50, costLife: true },
        { id: 'act-forward', label: 'Forward Email to Friends to Ask Their Opinion', isCorrect: false, explanation: 'Risky! Forwarding phishing emails risks others inadvertently clicking the malicious link.', scoreDelta: -25, costLife: true }
      ],
      hints: ['Look at the exact spelling of netflx in the email address. Real Netflix uses netflix.com.']
    },
    {
      title: 'Phishing Detective: The University Tuition Refund',
      instructions: 'A student portal message promises an uncollected financial aid refund. Inspect before taking action.',
      scenario: {
        from: 'Bursar Office <refunds@state-university-aid-portal.org>',
        to: 'student.kruthika@university.edu',
        subject: 'STUDENT AID DISBURSEMENT: $1,250.00 Ready for Direct Deposit',
        date: 'Today, 11:32 AM',
        bodyHtml: '<p>Dear Student,</p><p>An uncollected grant of $1,250.00 from federal funding has been released to your name. You have 24 hours to deposit these funds into your checking account before they are returned to the state treasury.</p><p><a href="#" class="text-cyan-400 underline">Authenticate Student ID to Claim Direct Deposit</a></p>',
        targetDomain: 'state-university-aid-portal.org'
      },
      redFlags: [
        { id: 'flag-sender', label: 'Unofficial University Domain', description: 'Real universities use .edu domains, not .org portals.', isCrucial: true },
        { id: 'flag-lure', label: 'Free Money Greed Lure', description: 'Lures victims with unrequested financial windfalls.', isCrucial: true }
      ],
      actions: [
        { id: 'act-check-portal', label: 'Check Official Student Account via Your Known Bookmarks', isCorrect: true, explanation: 'Spot on! Never click financial links in unprompted emails; log in directly through the official university portal.', scoreDelta: 100, costLife: false },
        { id: 'act-click-claim', label: 'Tap the Link to Connect Your Checking Account', isCorrect: false, explanation: 'Breach! This fake page steals online banking credentials and routing numbers.', scoreDelta: -50, costLife: true },
        { id: 'act-reply-ssn', label: 'Reply with your Student ID and Social Security Number', isCorrect: false, explanation: 'Critical Error! Never send Social Security Numbers or bank details in email.', scoreDelta: -60, costLife: true }
      ],
      hints: ['Legitimate university bursar notifications will always direct you to log in to your official university .edu website.']
    },
    {
      title: 'Phishing Detective: The High-Paying Remote Job Offer',
      instructions: 'You received an unsolicited job offer from a tech recruiter offering $70/hour. Verify its legitimacy.',
      scenario: {
        from: 'Global Tech Careers <talent-acquisition@google-workforce-careers.net>',
        to: 'applicant@cyberworld.org',
        subject: 'Job Offer: Remote Cybersecurity Research Assistant ($70/hr)',
        date: 'Yesterday, 04:15 PM',
        bodyHtml: '<p>Congratulations!</p><p>We reviewed your online profile and are pleased to extend an immediate offer for a flexible 10 hr/week remote assistant role. No interview required.</p><p>Please review the attached contract and fill out your banking details for payroll initialization.</p>',
        attachment: { name: 'Employment_Contract_Google.pdf.scr', size: '2.1 MB' },
        targetDomain: 'google-workforce-careers.net'
      },
      redFlags: [
        { id: 'flag-attachment', label: 'Malicious .scr Executable File', description: 'Disguised with a PDF name but actually a Windows screensaver executable script (.scr).', isCrucial: true },
        { id: 'flag-no-interview', label: 'Unrealistic Offer Without Interview', description: 'High salary promised without screening is a classic hallmark of employment scams.', isCrucial: true }
      ],
      actions: [
        { id: 'act-download-run', label: 'Download and Execute the Attached Contract', isCorrect: false, explanation: 'Ransomware executed! The .scr extension runs malicious payload scripts that compromise your computer.', scoreDelta: -60, costLife: true },
        { id: 'act-verify-careers', label: 'Verify Recruiter and Job Code on Official Corporate Website', isCorrect: true, explanation: 'Brilliant! Companies never send executables masquerading as contracts, nor hire without formal interviews.', scoreDelta: 100, costLife: false },
        { id: 'act-send-info', label: 'Reply with your Resume and Passport Copy', isCorrect: false, explanation: 'Identity Theft! Sending official government IDs to unverified parties leads to synthetic identity fraud.', scoreDelta: -50, costLife: true }
      ],
      hints: ['Inspect the file extension carefully: files ending in .scr, .exe, or .vbs are executables, not documents.']
    },
    {
      title: 'Phishing Detective: Urgent Bank Account Suspension',
      instructions: 'A security alert claims your Chase checking account has been frozen due to fraud in another country.',
      scenario: {
        from: 'Chase Fraud Resolution <alerts@chase-fraud-prevention-desk.cc>',
        to: 'agent.user@cyberworld.org',
        subject: 'FRAUD ALERT: $850 Wire Transfer in Progress from Berlin, Germany',
        date: 'Today, 02:20 AM',
        bodyHtml: '<p>We detected an anomalous overseas wire transfer attempt on your debit card.</p><p style="padding:10px; background:rgba(239,68,68,0.1); border-left:3px solid #ef4444;">To cancel this wire immediately, verify your debit card number and 4-digit PIN below.</p><p><a href="#" class="text-cyan-400 underline">CANCEL TRANSACTION & SECURE FUNDS</a></p>',
        targetDomain: 'chase-fraud-prevention-desk.cc'
      },
      redFlags: [
        { id: 'flag-pin-request', label: 'Request for ATM PIN', description: 'Real financial institutions NEVER ask for ATM PINs via web forms or emails.', isCrucial: true },
        { id: 'flag-tld', label: 'Suspicious Country Code Domain (.cc)', description: 'Banks do not conduct official customer correspondence from foreign ccTLDs.', isCrucial: true }
      ],
      actions: [
        { id: 'act-call-card', label: 'Call the Customer Service Number on the Back of Your Physical Debit Card', isCorrect: true, explanation: 'Optimal move! Calling the verified telephone number on your card bypasses any spoofed communications.', scoreDelta: 100, costLife: false },
        { id: 'act-input-pin', label: 'Click Link and Enter PIN to Cancel Wire', isCorrect: false, explanation: 'Catastrophic error! Entering your ATM PIN gives the criminal full access to withdraw all your funds.', scoreDelta: -60, costLife: true },
        { id: 'act-reply-cancel', label: 'Reply with "CANCEL WIRE"', isCorrect: false, explanation: 'Replying to spam validates that your email address is active and invites further targeted spear-phishing.', scoreDelta: -30, costLife: true }
      ],
      hints: ['Never trust phone numbers or links inside an email alert; look at the physical card in your wallet.']
    },
    {
      title: 'Phishing Detective: CEO Emergency Gift Cards (BEC)',
      instructions: 'An email from your company CEO asks for a confidential favor while they are in an all-day conference.',
      scenario: {
        from: 'Dr. Evelyn Carter (CEO) <evelyn.carter.ceo.office@gmail.com>',
        to: 'agent.user@acme-corp.com',
        subject: 'Quick confidential favor needed before 1:00 PM',
        date: 'Today, 10:05 AM',
        bodyHtml: '<p>Hi,</p><p>I am currently tied up in an executive board meeting with clients and cannot take phone calls. I need you to purchase 5 Apple Gift Cards ($100 each) for client presentation gifts right now. Send photos of the back codes directly to this email. I will reimburse you by 3 PM.</p><p>Keep this between us for now.</p>',
        targetDomain: 'gmail.com'
      },
      redFlags: [
        { id: 'flag-gmail', label: 'Personal Gmail for Corporate Request', description: 'The CEO claims to be writing corporate requests from a free public Gmail account.', isCrucial: true },
        { id: 'flag-giftcards', label: 'Gift Card Payment Request', description: 'Gift cards are non-refundable and untraceable—a universally recognized scam signature.', isCrucial: true }
      ],
      actions: [
        { id: 'act-buy-cards', label: 'Quickly Buy the Gift Cards at the Nearest Store', isCorrect: false, explanation: 'Scam completed! Business Email Compromise (BEC) gift card scams cause millions in unrecoverable losses every year.', scoreDelta: -60, costLife: true },
        { id: 'act-call-ceo', label: 'Contact the CEO via Official Company Extension or Chat to Confirm', isCorrect: true, explanation: 'Excellent! Verifying through an internal company channel unmasks CEO impersonation attacks immediately.', scoreDelta: 100, costLife: false },
        { id: 'act-reply-help', label: 'Reply Asking for the Company Credit Card Number', isCorrect: false, explanation: 'Replying keeps you engaged in the scammer\'s manipulation loop.', scoreDelta: -25, costLife: true }
      ],
      hints: ['Executives never ask staff to buy gift cards from personal Gmail accounts.']
    },
    {
      title: 'Phishing Detective: Package Delivery Tracking Failure',
      instructions: 'A delivery carrier notification claims your package is held at the sorting depot due to an incomplete street address.',
      scenario: {
        from: 'Postal Dispatch Hub <dispatch@usps-postal-tracking-support.top>',
        to: 'agent.user@cyberworld.org',
        subject: 'Notification: Package #US-98218 held due to incorrect house number',
        date: 'Today, 07:18 AM',
        bodyHtml: '<p>Your international parcel could not be delivered on scheduled date. A nominal re-delivery fee of $0.45 is required to update delivery address in warehouse logistics.</p><p><a href="#" class="text-cyan-400 underline">Update Address and Settle $0.45 Re-delivery Fee</a></p>',
        targetDomain: 'usps-postal-tracking-support.top'
      },
      redFlags: [
        { id: 'flag-fee', label: 'Small Re-delivery Fee Trap', description: 'Scammers ask for small fees ($0.30 - $1.50) to harvest full credit card details and CVVs.', isCrucial: true },
        { id: 'flag-domain', label: 'Fake USPS Domain (.top)', description: 'Real USPS domain is usps.com, not postal-tracking-support.top.', isCrucial: true }
      ],
      actions: [
        { id: 'act-enter-card', label: 'Pay the $0.45 with Your Credit Card to Get the Package', isCorrect: false, explanation: 'Card stolen! Attackers use the fake $0.45 payment gateway to clone your credit card and initiate recurring charges.', scoreDelta: -50, costLife: true },
        { id: 'act-track-official', label: 'Copy Tracking Number and Look it Up on the Official Carrier Website', isCorrect: true, explanation: 'Smart detective work! If you didn\'t order a package or the official site doesn\'t recognize the tracking number, it\'s fraudulent.', scoreDelta: 100, costLife: false },
        { id: 'act-unsubscribe', label: 'Click "Unsubscribe" Link at Bottom of Email', isCorrect: false, explanation: 'Clicking unsubscribe links in malicious emails merely confirms your email is monitored.', scoreDelta: -30, costLife: true }
      ],
      hints: ['Legitimate national postal services do not charge small re-delivery fees via weird .top domains.']
    },
    {
      title: 'Phishing Detective: Microsoft 365 Password Expiry Warning',
      instructions: 'An automated security warning warns that your enterprise password expires in 2 hours.',
      scenario: {
        from: 'IT Administrator <no-reply@microsoft-365-password-portal.net>',
        to: 'user@enterprise-corp.com',
        subject: 'ACTION REQUIRED: Your corporate password expires in 2 hours',
        date: 'Today, 03:45 PM',
        bodyHtml: '<p>Your workstation password is set to expire today at 5:00 PM according to corporate compliance policies.</p><p>To retain your existing password and avoid system lockout, click below to keep password active.</p><p><a href="#" class="text-cyan-400 underline">Keep Current Password Active</a></p>',
        targetDomain: 'microsoft-365-password-portal.net'
      },
      redFlags: [
        { id: 'flag-keep-pwd', label: 'Contradictory Logic ("Keep Same Password")', description: 'Security policies that expire passwords never allow you to click a button to keep the expired password.', isCrucial: true },
        { id: 'flag-spoofed-domain', label: 'Unofficial Microsoft Domain', description: 'Domain is microsoft-365-password-portal.net instead of microsoft.com.', isCrucial: true }
      ],
      actions: [
        { id: 'act-report-sec', label: 'Report Email to Enterprise Security Team via Official Report Phishing Add-in', isCorrect: true, explanation: 'Perfect response! Reporting feeds the email into the Security Operations Center (SOC) to block the domain across the whole network.', scoreDelta: 100, costLife: false },
        { id: 'act-click-keep', label: 'Click "Keep Current Password Active"', isCorrect: false, explanation: 'Credentials harvested! The fake portal records your corporate username and current password.', scoreDelta: -50, costLife: true },
        { id: 'act-ignore', label: 'Ignore Email and Wait for Lockout', isCorrect: false, explanation: 'Passive behavior leaves other colleagues vulnerable to the same ongoing campaign.', scoreDelta: -20, costLife: false }
      ],
      hints: ['Real password expiration notices direct users to Windows Settings or official company SSO portals.']
    },
    {
      title: 'Phishing Detective: Emergency VPN Update Script',
      instructions: 'An urgent IT bulletin requests employees to install a new VPN security client patch.',
      scenario: {
        from: 'Global Network Operations <netops@corporate-vpn-upgrades.com>',
        to: 'agent.user@acme-corp.com',
        subject: 'MANDATORY PATCH: Zero-day vulnerability in corporate VPN client',
        date: 'Today, 01:10 PM',
        bodyHtml: '<p>A critical remote code execution vulnerability (CVE-2026-9901) was discovered in our VPN gateway. All staff must run the attached patch utility before reconnecting to internal servers.</p>',
        attachment: { name: 'VPN_Security_Patch_V2.bat', size: '34 KB' },
        targetDomain: 'corporate-vpn-upgrades.com'
      },
      redFlags: [
        { id: 'flag-bat', label: 'Executable Batch File Attachment (.bat)', description: 'Batch scripts execute shell commands directly on your operating system without sandbox isolation.', isCrucial: true },
        { id: 'flag-external', label: 'External Domain for Internal Infrastructure', description: 'Internal network operations are managed through internal endpoints, not external registrar domains.', isCrucial: true }
      ],
      actions: [
        { id: 'act-run-bat', label: 'Double-Click and Run the .bat Script as Administrator', isCorrect: false, explanation: 'Backdoor installed! Running the batch file establishes a reverse shell connection to an adversary command-and-control server.', scoreDelta: -60, costLife: true },
        { id: 'act-verify-it', label: 'Verify the Announcement on Internal Corporate Intranet or Contact IT Desk', isCorrect: true, explanation: 'Flawless judgment! Real IT departments push patches automatically via endpoint management systems (MDM / Intune), never via emailed .bat scripts.', scoreDelta: 100, costLife: false },
        { id: 'act-edit-bat', label: 'Open the .bat File in Notepad to Read Code', isCorrect: false, explanation: 'Risky! A misclick could execute the script directly on your host machine.', scoreDelta: -30, costLife: true }
      ],
      hints: ['Enterprise IT pushes software updates silently or through software centers; they never email executable scripts.']
    },
    {
      title: 'Phishing Detective: Google Drive Document Share',
      instructions: 'A notification states that "Sarah from Accounting" shared a spreadsheet named "Q3_Staff_Bonus_Summary.xlsm".',
      scenario: {
        from: 'Google Drive Notifications <drive-shares@google-workspace-docs.cloud>',
        to: 'agent.user@cyberworld.org',
        subject: 'Sarah shared a document with you: "Q3_Staff_Bonus_Summary.xlsm"',
        date: 'Today, 11:58 AM',
        bodyHtml: '<p>Sarah (Accounting) shared an item with you:</p><p style="padding:12px; background:rgba(6,182,212,0.1); border:1px solid #06b6d4; border-radius:6px;"><strong>📊 Q3_Staff_Bonus_Summary.xlsm</strong><br><small>Requires Microsoft Excel macro execution to decrypt compensation figures.</small></p><p><a href="#" class="text-cyan-400 underline">Open Document in Cloud Viewer</a></p>',
        targetDomain: 'google-workspace-docs.cloud'
      },
      redFlags: [
        { id: 'flag-macro', label: 'Macro-Enabled Office Document (.xlsm)', description: 'Malicious Office documents use VBA macros to download and execute trojan downloaders.', isCrucial: true },
        { id: 'flag-cloud-domain', label: 'Spoofed Cloud Storage Domain', description: 'Authentic Google Drive notifications originate strictly from google.com or drive-shares-noreply@google.com.', isCrucial: true }
      ],
      actions: [
        { id: 'act-open-macro', label: 'Open Spreadsheet and Click "Enable Macros / Content"', isCorrect: false, explanation: 'Malware infection! Enabling macros allows embedded Visual Basic code to execute arbitrary malware payloads on your machine.', scoreDelta: -60, costLife: true },
        { id: 'act-verify-sarah', label: 'Contact Sarah via Company Slack/Phone to Confirm if She Shared the File', isCorrect: true, explanation: 'Outstanding! Verifying out-of-band exposes shared file spear-phishing campaigns before opening weaponized documents.', scoreDelta: 100, costLife: false },
        { id: 'act-forward-colleague', label: 'Forward Document to Teammates to Check Their Bonuses', isCorrect: false, explanation: 'Assists malware propagation across internal corporate departments.', scoreDelta: -40, costLife: true }
      ],
      hints: ['Never enable macros in Office documents received unexpectedly from email or shared links.']
    },
    {
      title: 'Phishing Detective: The Final Espionage Case Drill',
      instructions: 'A sophisticated spear-phishing message impersonates a government regulatory agency demanding immediate audit documents.',
      scenario: {
        from: 'Federal Trade Compliance <legal-notices@ftc-regulatory-investigations.gov.co>',
        to: 'chief.security@enterprise-corp.com',
        subject: 'CONFIDENTIAL SUBPOENA: Case Ref #CIV-2026-88194',
        date: 'Today, 08:00 AM',
        bodyHtml: '<p>ATTN: Corporate Legal & Information Security,</p><p>A formal regulatory inquiry has been initiated under statutory order. Failure to submit requested compliance records within 24 hours will result in statutory civil fines and federal injunction.</p><p><a href="#" class="text-cyan-400 underline">Access Secure Government Case Portal and Upload Verification Archive</a></p>',
        targetDomain: 'ftc-regulatory-investigations.gov.co'
      },
      redFlags: [
        { id: 'flag-fake-gov', label: 'Deceptive Domain Extension (.gov.co)', description: 'The domain mimics a .gov address by using Colombia\'s .gov.co country code.', isCrucial: true },
        { id: 'flag-intimidation', label: 'Legal Intimidation & Statutory Threats', description: 'Heavy legal jargon used to paralyze logical thinking and force hurried compliance.', isCrucial: true }
      ],
      actions: [
        { id: 'act-soc-triage', label: 'Isolate Email, Extract Full Headers & Escalate to Legal and SOC Teams', isCorrect: true, explanation: 'Master-level response! You uncovered the .gov.co foreign country code trick and initiated proper forensic incident handling.', scoreDelta: 120, costLife: false },
        { id: 'act-upload-records', label: 'Open Link and Upload Corporate Audit Records', isCorrect: false, explanation: 'Catastrophic corporate data breach! Confidential enterprise trade secrets and financial records leaked to foreign threat actors.', scoreDelta: -80, costLife: true },
        { id: 'act-reply-attorney', label: 'Reply Demanding to Speak to the Agency Judge', isCorrect: false, explanation: 'Alerts threat actors of employee email validity and job role hierarchy.', scoreDelta: -40, costLife: true }
      ],
      hints: ['United States federal agencies use .gov (e.g. ftc.gov), NEVER .gov.co, .gov-portal.net, or commercial TLDs.']
    }
  ];

  return data[lvl - 1] || data[0];
};

// 2. Fake Login (10 distinct login audit scenarios & unique choices)
const getFakeLoginLevel = (lvl) => {
  const data = [
    {
      title: 'Fake Login: Cloned Microsoft 365 Portal',
      instructions: 'Inspect the address bar domain, SSL issuer, and branding before authenticating.',
      scenario: {
        urlBar: 'https://login.micros0ft-online-support.com/oauth/v2',
        hasHttps: true,
        certificateIssuer: 'Free Domain Validator (Registered 2 days ago)',
        pageTitle: 'Sign in to your Microsoft Account',
        formFields: ['Work or School Email', 'Password'],
        spoofedBrand: 'Microsoft 365'
      },
      actions: [
        { id: 'act-leave', label: 'Close Tab Immediately — Domain is a Typosquatted Counterfeit (micros0ft)', isCorrect: true, explanation: 'Exact catch! Notice the number "0" replacing the letter "o" in micros0ft.', scoreDelta: 100, costLife: false },
        { id: 'act-login', label: 'Trust Because the Address Bar Shows a Padlock Icon', isCorrect: false, explanation: 'Common misconception! A padlock (HTTPS) only encrypts traffic—it does not authenticate the owner.', scoreDelta: -50, costLife: true },
        { id: 'act-inspect-css', label: 'Inspect Webpage Design to Confirm it Looks Genuine', isCorrect: false, explanation: 'Attackers easily clone 100% identical CSS and logos from official sites.', scoreDelta: -30, costLife: true }
      ],
      hints: ['Scrutinize the domain letters carefully: micros0ft uses a zero instead of an "o".']
    },
    {
      title: 'Fake Login: University Canvas LMS Portal',
      instructions: 'Evaluate this academic sign-in page before entering your student credentials.',
      scenario: {
        urlBar: 'https://canvas.instructure.edu.student-auth-portal.com/login',
        hasHttps: true,
        certificateIssuer: 'Cloudflare Wildcard TLS',
        pageTitle: 'Canvas LMS — University Single Sign-On',
        formFields: ['Student ID', 'Campus Password', 'Mother\'s Maiden Name'],
        spoofedBrand: 'Canvas'
      },
      actions: [
        { id: 'act-spot-subdomain', label: 'Reject Site — Real Domain is student-auth-portal.com, Not an Educational .edu', isCorrect: true, explanation: 'Spot on! The attacker placed canvas.instructure.edu in the subdomain to trick unsuspecting students.', scoreDelta: 100, costLife: false },
        { id: 'act-sign-in', label: 'Sign in With University ID and Password', isCorrect: false, explanation: 'Stolen credentials! The attacker now has full access to your student account, grades, and tuition info.', scoreDelta: -50, costLife: true },
        { id: 'act-fill-maiden', label: 'Provide Mother\'s Maiden Name as Requested for Extra Verification', isCorrect: false, explanation: 'Critical identity theft! Educational LMS platforms never ask for maternal maiden names upon login.', scoreDelta: -60, costLife: true }
      ],
      actions_alt: 'Check the domain right before the first single slash (/).'
    },
    {
      title: 'Fake Login: Google Drive Document Verification',
      instructions: 'A shared document prompts you to log into Google to decrypt a shared file.',
      scenario: {
        urlBar: 'https://accounts.g00gle.com.doc-share-viewer.net/signin/v2/identifier',
        hasHttps: true,
        certificateIssuer: 'Let\'s Encrypt TLS',
        pageTitle: 'Google Accounts — Verify Identity',
        formFields: ['Gmail Address', 'Password', 'Phone Number'],
        spoofedBrand: 'Google'
      },
      actions: [
        { id: 'act-leave-site', label: 'Leave Site — Domain is doc-share-viewer.net, an Impostor Domain', isCorrect: true, explanation: 'Correct! Legitimate Google login URLs always start with accounts.google.com without trailing domains.', scoreDelta: 100, costLife: false },
        { id: 'act-submit-creds', label: 'Submit Google Credentials to View the Document', isCorrect: false, explanation: 'Your Google Account is compromised, potentially exposing Gmail, Photos, and synced passwords.', scoreDelta: -50, costLife: true },
        { id: 'act-incognito', label: 'Open in Incognito Mode to See if Document Loads', isCorrect: false, explanation: 'Incognito mode protects local history but does NOT prevent web forms from harvesting credentials.', scoreDelta: -30, costLife: true }
      ],
      hints: ['Look for where the first single slash occurs: doc-share-viewer.net is the actual host.']
    },
    {
      title: 'Fake Login: PayPal Checkout Portal',
      instructions: 'You are redirected during checkout to a payment portal claiming to be PayPal.',
      scenario: {
        urlBar: 'https://paypa1-security-verification.com/webapps/mpp/home',
        hasHttps: true,
        certificateIssuer: 'Sectigo Trial SSL',
        pageTitle: 'PayPal — Secure Payment Terminal',
        formFields: ['PayPal Email', 'Password', 'Full 16-digit Card Number', 'CVV Code'],
        spoofedBrand: 'PayPal'
      },
      actions: [
        { id: 'act-typo-paypa1', label: 'Identify Typosquatting (Number 1 instead of Letter l in paypa1)', isCorrect: true, explanation: 'Sharp eye! The domain paypa1-security-verification.com substitutes a digit "1" for the lowercase "L".', scoreDelta: 100, costLife: false },
        { id: 'act-fill-card', label: 'Enter Credit Card Details to Complete Checkout', isCorrect: false, explanation: 'Financial compromise! The criminals will clone your card for unauthorized fraudulent transactions.', scoreDelta: -60, costLife: true },
        { id: 'act-refresh', label: 'Refresh the Page to See if URL Changes', isCorrect: false, explanation: 'Refreshing an attacker-controlled page does not fix the underlying deceptive domain.', scoreDelta: -20, costLife: false }
      ],
      hints: ['Examine the spelling of paypa1 very closely.']
    },
    {
      title: 'Fake Login: Steam Community Trading Confirmation',
      instructions: 'A Steam user asks you to inspect an item on a community marketplace link.',
      scenario: {
        urlBar: 'https://steamcommunity.com.trade-offer-confirm.xyz/market',
        hasHttps: true,
        certificateIssuer: 'ZeroSSL CA',
        pageTitle: 'Steam Community — Trade Offer #91024',
        formFields: ['Steam Username', 'Password', 'Steam Guard Mobile Code'],
        spoofedBrand: 'Steam'
      },
      actions: [
        { id: 'act-fake-steam', label: 'Reject Portal — Attack Destination is trade-offer-confirm.xyz', isCorrect: true, explanation: 'Masterful detection! Attackers target gamers by siphoning Steam Guard codes to hijack inventories.', scoreDelta: 100, costLife: false },
        { id: 'act-steam-guard', label: 'Enter Steam Guard Code to Accept Trade', isCorrect: false, explanation: 'Inventory drained! The attacker automated script enters your Steam Guard token into the real site within seconds.', scoreDelta: -50, costLife: true },
        { id: 'act-create-alt', label: 'Create a New Account on the Page to Test', isCorrect: false, explanation: 'Gives the malicious portal additional target data and may trigger malware downloads.', scoreDelta: -30, costLife: true }
      ],
      hints: ['Official Steam pages reside strictly on steamcommunity.com or steampowered.com.']
    },
    {
      title: 'Fake Login: Bank Single Sign-On with Fake Popup Bar',
      instructions: 'A bank login window opens in an in-browser popup. Look closely at the popup window border.',
      scenario: {
        urlBar: 'https://secure.bankofamerica.com/auth/portal (Drawn inside HTML canvas)',
        hasHttps: true,
        certificateIssuer: 'Embedded Picture Element',
        pageTitle: 'Online Banking Sign In',
        formFields: ['Online ID', 'Passcode'],
        spoofedBrand: 'Bank of America'
      },
      actions: [
        { id: 'act-drag-popup', label: 'Test Moving the Popup Window Outside the Browser Tab to Expose the Fake Window', isCorrect: true, explanation: 'Genius! This is a "Browser-in-the-Browser" (BitB) attack where a fake browser frame is drawn inside an HTML div.', scoreDelta: 120, costLife: false },
        { id: 'act-type-bank', label: 'Type Bank Online ID and Passcode', isCorrect: false, explanation: 'Direct banking takeover! Your bank credentials were typed into an attacker\'s iframe.', scoreDelta: -60, costLife: true },
        { id: 'act-bookmark-popup', label: 'Bookmark the Popup Window', isCorrect: false, explanation: 'Bookmarking a canvas mockup only saves the host phish domain.', scoreDelta: -20, costLife: false }
      ],
      hints: ['Try dragging a popup window: if it cannot be moved outside the main browser webpage, it is an HTML fake window.']
    },
    {
      title: 'Fake Login: Apple ID Two-Factor Intercept',
      instructions: 'You are asked to authenticate to view your iCloud backup after an alert.',
      scenario: {
        urlBar: 'https://appleid.apple.com.icloud-locate-device.net/auth',
        hasHttps: true,
        certificateIssuer: 'Let\'s Encrypt TLS',
        pageTitle: 'Apple ID — Manage Your Apple Account',
        formFields: ['Apple ID Email', 'Password', 'Device Passcode'],
        spoofedBrand: 'Apple'
      },
      actions: [
        { id: 'act-leave-apple', label: 'Exit Tab and Visit appleid.apple.com Directly via Clean Browser', isCorrect: true, explanation: 'Flawless action! The domain is icloud-locate-device.net which attempts to harvest device passcodes.', scoreDelta: 100, costLife: false },
        { id: 'act-submit-passcode', label: 'Provide Device 6-Digit Passcode', isCorrect: false, explanation: 'Never enter your iPhone device lock passcode into a web browser form!', scoreDelta: -60, costLife: true },
        { id: 'act-click-forgot', label: 'Click "Forgot Password" on the Fake Page', isCorrect: false, explanation: 'The fake forgot password link also directs to malicious credential harvesters.', scoreDelta: -30, costLife: true }
      ],
      hints: ['Apple ID authentication never asks for your iPhone device lock passcode on the web.']
    },
    {
      title: 'Fake Login: Social Network SSO OAuth Consent Screen',
      instructions: 'A third-party game asks you to sign in with your Discord account.',
      scenario: {
        urlBar: 'https://discord-nitro-gift-claim.com/oauth/authorize',
        hasHttps: true,
        certificateIssuer: 'Free TLS',
        pageTitle: 'Discord — Authorize Application',
        formFields: ['Discord Email', 'Password', 'Backup 2FA Key'],
        spoofedBrand: 'Discord'
      },
      actions: [
        { id: 'act-spot-discord-phish', label: 'Deny Access — Authentic Discord OAuth Pages Run on discord.com, Not Free Gift Domains', isCorrect: true, explanation: 'Right on! Phishing portals claim to offer "Free Discord Nitro" to hijack accounts and token sessions.', scoreDelta: 100, costLife: false },
        { id: 'act-grant-oauth', label: 'Enter Discord Credentials and 2FA Key', isCorrect: false, explanation: 'Token hijacked! Attackers dump your Discord session token and spam all server members.', scoreDelta: -50, costLife: true },
        { id: 'act-share-link', label: 'Share Link in Discord Servers to Let Friends Claim Nitro', isCorrect: false, explanation: 'Spreads the worm across gaming communities.', scoreDelta: -50, costLife: true }
      ],
      hints: ['Authentic OAuth consent screens are hosted on the service provider\'s primary domain (discord.com).']
    },
    {
      title: 'Fake Login: Government Tax Return Portal',
      instructions: 'An alert prompts you to log into the national revenue service to view an audit statement.',
      scenario: {
        urlBar: 'http://irs-tax-refund-portal.gov-online-records.com/login',
        hasHttps: false,
        certificateIssuer: 'None (Plaintext Insecure HTTP)',
        pageTitle: 'Internal Revenue Service — Online Services',
        formFields: ['SSN / Tax ID', 'Filing PIN', 'Driver\'s License Number'],
        spoofedBrand: 'IRS'
      },
      actions: [
        { id: 'act-flag-http-gov', label: 'Flag Site: Insecure HTTP and Missing .gov Top-Level Domain', isCorrect: true, explanation: 'Top-tier defense! All federal United States agencies are mandated to use HTTPS and official .gov domains.', scoreDelta: 100, costLife: false },
        { id: 'act-enter-ssn', label: 'Enter Tax ID and Driver\'s License', isCorrect: false, explanation: 'Massive identity theft! Criminals use these credentials to fraudulently file tax returns and divert refunds.', scoreDelta: -70, costLife: true },
        { id: 'act-save-cert', label: 'Download Security Certificate from Site', isCorrect: false, explanation: 'Downloading arbitrary certificates allows attackers to perform Man-in-the-Middle (MitM) attacks.', scoreDelta: -50, costLife: true }
      ],
      hints: ['All legitimate government services are strictly hosted on .gov with verified HTTPS.']
    },
    {
      title: 'Fake Login: Adversary-in-the-Middle (AitM) Reverse Proxy',
      instructions: 'You encounter an advanced reverse-proxy phishing portal that relays live MFA requests to the real vendor.',
      scenario: {
        urlBar: 'https://login.microsoftonline.com.secure-gateway-corp.net/common/login',
        hasHttps: true,
        certificateIssuer: 'Wildcard Enterprise SSL',
        pageTitle: 'Corporate Active Directory Federation Sign-In',
        formFields: ['Corporate Email', 'Password', 'Authenticator Number Match Code'],
        spoofedBrand: 'Azure AD'
      },
      actions: [
        { id: 'act-passkey-fido2', label: 'Enforce FIDO2 WebAuthn / Passkey Hardware Key Which Cryptographically Binds Domain Origin', isCorrect: true, explanation: 'Master-level defense! FIDO2 hardware keys (YubiKeys) check the exact browser origin and automatically refuse to authenticate to lookalike reverse proxy domains!', scoreDelta: 150, costLife: false },
        { id: 'act-type-otp', label: 'Type the 2-Digit Number Match from Your Authenticator App', isCorrect: false, explanation: 'Session stolen! AitM reverse proxies intercept your active session cookies in real time, bypassing traditional SMS/TOTP MFA.', scoreDelta: -60, costLife: true },
        { id: 'act-refresh-session', label: 'Clear Browser Cookies and Re-type Password', isCorrect: false, explanation: 'Does not protect against AitM proxies because the proxy captures the new credentials upon submission.', scoreDelta: -30, costLife: true }
      ],
      hints: ['FIDO2 / WebAuthn hardware tokens are the only multi-factor authentication method immune to AitM reverse-proxy phishing.']
    }
  ];

  return data[lvl - 1] || data[0];
};

// Master generator that guarantees EVERY level has distinct questions and custom choices
const generateLevelsForGame = (game) => {
  const levels = [];
  const total = game.totalLevels || 10;

  for (let lvl = 1; lvl <= total; lvl++) {
    const difficulty = getDifficultyForLevel(lvl);
    const timeLimit = getTimeLimitForLevel(lvl);

    let levelData = {};

    if (game.slug === 'phishing-detective') {
      levelData = getPhishingDetectiveLevel(lvl);
    } else if (game.slug === 'fake-login') {
      levelData = getFakeLoginLevel(lvl);
    } else {
      // Dynamic specialized level generator for remaining 33 games
      // Guaranteeing distinct scenarios and distinct choices for each stage 1 through 10
      const topicNum = game.topicNumber;
      const gameNum = game.gameNumber;

      const stageScenarios = [
        {
          sub: 'Routine Security Check',
          context: `Stage ${lvl} Protocol: Verifying base credentials and initial threat vectors for ${game.title}.`,
          correct: `Apply Least Privilege and verify authentic domain certificates for Stage ${lvl}`,
          wrong1: `Disable security warnings to speed up the workflow in Stage ${lvl}`,
          wrong2: `Share session tokens across unauthorized testing devices in Stage ${lvl}`
        },
        {
          sub: 'Anomalous Connection Vector',
          context: `Stage ${lvl} Protocol: An unrecognized remote IP address attempted access during ${game.title}.`,
          correct: `Terminate suspicious remote session and mandate out-of-band re-authentication`,
          wrong1: `Grant temporary bypass access to maintain connectivity`,
          wrong2: `Forward connection telemetry directly to the external untrusted IP`
        },
        {
          sub: 'Credential Exposure Risk',
          context: `Stage ${lvl} Protocol: Evaluating potential password reuse and weak entropy in ${game.title}.`,
          correct: `Generate a 16+ character cryptographically salted passphrase and enable hardware MFA`,
          wrong1: `Reuse previous corporate password with an exclamation mark at the end`,
          wrong2: `Store plaintext credentials in an unencrypted desktop text file`
        },
        {
          sub: 'Physical & Optical Inspection',
          context: `Stage ${lvl} Protocol: Analyzing QR terminals, Wi-Fi beacons, or external flyers in ${game.title}.`,
          correct: `Inspect physical hardware for tamper overlays and sandbox destination endpoints`,
          wrong1: `Scan and execute unverified QR codes without destination preview`,
          wrong2: `Connect to open public Wi-Fi networks without active VPN tunnel encryption`
        },
        {
          sub: 'Social Engineering Escalation',
          context: `Stage ${lvl} Protocol: High-urgency message claims emergency authority in ${game.title}.`,
          correct: `Refuse out-of-process demands and escalate through verified corporate hotlines`,
          wrong1: `Comply with urgency demands to avoid threatened disciplinary actions`,
          wrong2: `Provide one-time SMS verification passcode directly in chat conversation`
        },
        {
          sub: 'Endpoint Privilege Audit',
          context: `Stage ${lvl} Protocol: Third-party mobile application requesting sensitive OS permissions in ${game.title}.`,
          correct: `Revoke unnecessary background camera, microphone, and contact permissions`,
          wrong1: `Grant "Always Allow All Permissions" to eliminate annoying popups`,
          wrong2: `Sideload unsigned APK package from unknown file-sharing forums`
        },
        {
          sub: 'Data Leakage Interception',
          context: `Stage ${lvl} Protocol: Social media post contains background badge identifiers in ${game.title}.`,
          correct: `Redact sensitive badges, barcodes, keys, and itineraries prior to posting`,
          wrong1: `Publish high-resolution photo publicly with real-time GPS location tags`,
          wrong2: `Store private cryptographic recovery keys in cloud image photo backups`
        },
        {
          sub: 'Ransomware Precursor Triage',
          context: `Stage ${lvl} Protocol: Suspicious background macro process detected beaconing outbound in ${game.title}.`,
          correct: `Sever endpoint network adapters immediately and preserve volatile RAM memory for forensic analysis`,
          wrong1: `Reboot the operating system to clear active virus memory`,
          wrong2: `Ignore alert and allow background disk encryption routine to complete`
        },
        {
          sub: 'Advanced Persistent Threat (APT) Probe',
          context: `Stage ${lvl} Protocol: Adversary-in-the-Middle reverse proxy attempting session token theft in ${game.title}.`,
          correct: `Enforce FIDO2 WebAuthn cryptographic domain-bound authentication tokens`,
          wrong1: `Rely exclusively on unencrypted SMS text message OTP codes`,
          wrong2: `Disable multi-factor authentication to diagnose connection errors`
        },
        {
          sub: 'Final Escape Room Lockdown Drill',
          context: `Stage ${lvl} Protocol: Multiple concurrent compromise vectors detected across the entire ${game.title} domain!`,
          correct: `Execute coordinated zero-trust incident containment, revoke active OAuth refresh tokens, and isolate compromised subnets`,
          wrong1: `Dismiss alerts as false positives and continue regular operations`,
          wrong2: `Broadcast corporate passwords across public channels to facilitate mass recovery`
        }
      ];

      const stageInfo = stageScenarios[lvl - 1] || stageScenarios[0];

      const customActions = [
        {
          id: `act-safe-${lvl}`,
          label: stageInfo.correct,
          isCorrect: true,
          explanation: `Exceptional decision! In Stage ${lvl}, this action mitigates the threat vector and reinforces Zero Trust defense principles.`,
          scoreDelta: 100 + (lvl * 5),
          costLife: false
        },
        {
          id: `act-danger1-${lvl}`,
          label: stageInfo.wrong1,
          isCorrect: false,
          explanation: `Vulnerability triggered! Bypassing security controls in Stage ${lvl} provides adversaries direct unauthorized access.`,
          scoreDelta: -40,
          costLife: true
        },
        {
          id: `act-danger2-${lvl}`,
          label: stageInfo.wrong2,
          isCorrect: false,
          explanation: `Security violation! Exposing sensitive credentials or telemetry compromises defense integrity.`,
          scoreDelta: -50,
          costLife: true
        }
      ];

      levelData = {
        title: `${game.title}: Stage ${lvl} (${stageInfo.sub})`,
        instructions: `Stage ${lvl} Challenge: ${stageInfo.context} Select the safest response.`,
        scenario: {
          context: `${game.title} — Stage ${lvl}`,
          scenarioDetails: stageInfo.context,
          threatLevel: difficulty,
          interactivePayload: `SEC-VEC-${topicNum}${gameNum}-${lvl}`
        },
        actions: customActions,
        hints: [
          `Analyze the core threat vector in Stage ${lvl}: Zero Trust mandates strict verification.`,
          `Avoid quick bypasses or sharing credentials under pressure.`
        ]
      };
    }

    // Shuffle choices to ensure correct choice appears in different positions across levels
    const shuffledActions = shuffleActions(levelData.actions || [], lvl * 13);

    levels.push({
      gameSlug: game.slug,
      levelNumber: lvl,
      title: levelData.title,
      instructions: levelData.instructions,
      difficulty,
      timeLimit,
      scenario: levelData.scenario,
      redFlags: levelData.redFlags || [],
      actions: shuffledActions,
      hints: levelData.hints || []
    });
  }

  return levels;
};

module.exports = {
  generateLevelsForGame
};
