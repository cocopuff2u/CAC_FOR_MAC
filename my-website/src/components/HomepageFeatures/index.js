import clsx from 'clsx';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Step 1',
    Img: require('@site/static/img/certificates.webp').default,
    imgType: 'img',
    userDescription: (
      <>
        Download the latest certificate authority files from your organization's official source to ensure your Mac can trust secure resources.
      </>
    ),
    adminDescription: (
      <>
        Distribute the latest certificate authority files to all managed devices using your preferred deployment or device management solution.
      </>
    ),
  },
  {
    title: 'Step 2',
    Img: require('@site/static/img/cac_inserted.webp').default,
    imgType: 'img',
    userDescription: (
      <>
        Connect your smart card reader to your Mac and insert your card. Confirm that your Mac recognizes the reader and card before proceeding.
      </>
    ),
    adminDescription: (
      <>
        Ensure smart card readers are properly connected and recognized by macOS, and verify that user accounts are configured for smart card authentication as needed.
      </>
    ),
    adminImg: require('@site/static/img/cac_setup.webp').default,
  },
  {
    title: 'Step 3',
    Img: require('@site/static/img/access_approved.webp').default,
    imgType: 'img',
    userDescription: (
      <>
        Access a smart card-protected website or application to verify that your setup is working and you have the required access.
      </>
    ),
    adminDescription: (
      <>
        Have users test access to a smart card-protected resource to confirm successful deployment and functionality across devices.
      </>
    ),
    adminImg: require('@site/static/img/Access_approved_guy.webp').default,
  },
];

// Support both SVG React components and PNG/WEBP images
function Feature({Img, imgType, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      {/* Gap above the image */}
      <div style={{height: 24}} />
      <div className="text--center">
        {imgType === 'svg' ? (
          <Img className={styles.featureSvg} role="img" />
        ) : (
          <img src={Img} className={styles.featureSvg} alt={title} />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

// New component to render steps for either user or admin
function FeatureSteps({ type }) {
  return (
    <div className="row">
      {FeatureList.map((props, idx) => {
        // For admin, use alternate image for step 3 if provided
        const Img = type === 'admin' && props.adminImg ? props.adminImg : props.Img;
        const description = type === 'admin' ? props.adminDescription : props.userDescription;
        return (
          <Feature
            key={type + '-' + idx}
            Img={Img}
            imgType={props.imgType}
            title={props.title}
            description={description}
          />
        );
      })}
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        {/* Intro section about CAC, YubiKey, and Smart Cards */}
        <div style={{textAlign: 'center', marginBottom: 40}}>
<h2>What Is a Smart Card?</h2>
<p>
  A <strong>smart card</strong> is a physical device—like a chip card or USB key—with a secure microchip used for login, authentication, and encryption. macOS refers to these as “Smart Cards” and supports them for secure login and access control.
</p>

<h3>Common Types</h3>
<div style={{ textAlign: 'center', margin: '0 auto', marginBottom: '16px' }}>
  <div>
    <strong>CAC (Common Access Card):</strong> Issued by the U.S. Department of Defense or Government Agencies for secure identification and access.
  </div>
  <div>
    <strong>YubiKey (PIV Mode):</strong> A hardware token that emulates a smart card, widely used for secure login and two-factor authentication.
  </div>
  <div>
    <strong>ICC/IC Cards:</strong> Standard smart cards used in various industries for secure access and identity verification.
  </div>
</div>


        </div>
        {/* Add info above the feature list */}
<div style={{ textAlign: 'center', marginBottom: 32 }}>
  <h2>Are you a DoD employee that needs DoD Certificates fast?</h2>
    <p style={{ fontSize: '0.9rem', marginTop: '-10px' }}>
    If you're a government employee or contractor, you can quickly install the latest DoD Certificate Authority (CA) certificates by running the command below in your terminal.
  </p>

  <CodeBlock language="bash">
    sudo bash -c "$(curl -s https://raw.githubusercontent.com/cocopuff2u/MacOS_GOV_Scripts/main/Keychain_And_Certificates_Scripts/Import_DoD_Certs.sh)"
  </CodeBlock>

  <p style={{ fontStyle: 'italic', fontSize: '0.9rem', marginTop: '-10px' }}>
    *Always review scripts before running them. You can inspect this one <a href="https://raw.githubusercontent.com/cocopuff2u/MacOS_GOV_Scripts/main/Keychain_And_Certificates_Scripts/Import_DoD_Certs.sh" target="_blank" rel="noopener noreferrer">here</a>.
  </p>
</div>

        {/* Gap before User Steps */}
        <div style={{height: 40}} />
        <div className={styles.userStepsBg}>
          <div style={{textAlign: 'center', margin: '32px 0 24px 0'}}>
            <h2>User Guides</h2>
            <p>
              These guides are designed to help users quickly set up their certificates & smart card (CAC, PIV, or similar) on their personal macOS.
              <br />
              <a href="/docs/certificate/Any-Certificates-Users" target="_blank" rel="noopener noreferrer">
                General Cert Guide
              </a>
              {' | '}
              <a href="/docs/certificate/DoD-Certificates-Users" target="_blank" rel="noopener noreferrer">
                DoD Cert Guide
              </a>
              {' | '}
              <a href="/docs/certificate/Tools-Apps" target="_blank" rel="noopener noreferrer">
                Certificate Tools & Apps
              </a>

              <br/>
              <a href="/docs/smartcard/Any-SmartCard-Users" target="_blank" rel="noopener noreferrer">
                General Smart Card Guide
              </a>
              {' | '}
              <a href="/docs/smartcard/DoD-SmartCard-Users" target="_blank" rel="noopener noreferrer">
                DoD CAC Guide
              </a>
              {' | '}
              <a href="/docs/smartcard/Tools-Apps" target="_blank" rel="noopener noreferrer">
                Smart Card Tools & Apps
              </a>
            </p>
          </div>
        </div>
        <FeatureSteps type="user" />
        {/* Gap before Admin Steps */}
        <div style={{height: 56}} />
        <div className={styles.adminStepsBg}>
          <div style={{textAlign: 'center', margin: '48px 0 32px 0'}}>
            <h2>Admin Guides</h2>
            <p>
              These guides are designed to help administrators quickly deploy certificates & smart card (CAC, PIV, or similar) support for their users.
              <br />
              <a href="/docs/certificate/Any-Certificates-Admins" target="_blank" rel="noopener noreferrer">
                General Cert Guide
              </a>
              {' | '}
              <a href="/docs/certificate/DoD-Certificates-Admins" target="_blank" rel="noopener noreferrer">
                DoD Cert Guide
              </a>
              {' | '}
              <a href="/docs/certificate/Tools-Scripts" target="_blank" rel="noopener noreferrer">
                Certificate Tools & Apps
              </a>
              <br/>


              <a href="/docs/smartcard/Any-SmartCard-Admins" target="_blank" rel="noopener noreferrer">
                General Smart Card Guide
              </a>
              {' | '}
              <a href="/docs/smartcard/DoD-SmartCard-Admins" target="_blank" rel="noopener noreferrer">
                DoD CAC Guide
              </a>
              {' | '}
              <a href="/docs/smartcard/Tools-Scripts" target="_blank" rel="noopener noreferrer">
                Smart Card Tools & Apps
              </a>
            </p>
          </div>
        </div>
        <FeatureSteps type="admin" />
      </div>
    </section>
  );
}
