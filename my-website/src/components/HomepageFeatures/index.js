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
        Download the latest DoD Certificate Authority Certificates from the official source to ensure secure access.
      </>
    ),
    adminDescription: (
      <>
        Deploy the latest DoD Certificate Authority Certificates to user devices using your preferred device management solution.
      </>
    ),
  },
  {
    title: 'Step 2',
    Img: require('@site/static/img/cac_inserted.webp').default,
    imgType: 'img',
    userDescription: (
      <>
        Connect your CAC reader to your Mac and insert your card. Ensure the system detects it properly.
      </>
    ),
    adminDescription: (
      <>
        Set up CAC integration by ensuring the reader is properly recognized by the operating system and paired with the user's account if necessary.
      </>
    ),
  },
  {
    title: 'Step 3',
    Img: require('@site/static/img/access_approved.webp').default,
    imgType: 'img',
    userDescription: (
      <>
        Visit the desired CAC-enabled website or application to confirm access is working.
      </>
    ),
    adminDescription: (
      <>
        Validate the setup by having users access a CAC-protected resource to confirm functionality.
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
<ul>
    <strong>CAC (Common Access Card):</strong> Issued by the U.S. Department of Defense or Government Agencies for secure identification and access. <br></br>
    <strong>YubiKey (PIV Mode):</strong> A hardware token that emulates a smart card, widely used for secure login and two-factor authentication.<br></br>
    <strong>ICC/IC Cards:</strong> Standard smart cards used in various industries for secure access and identity verification.
</ul>


        </div>
        {/* Add info above the feature list */}
<div style={{ textAlign: 'center', marginBottom: 32 }}>
  <h2>Need DoD Certificates on Your Mac—Fast?</h2>
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
            <h2>User Steps</h2>
            <p>
              These steps are designed to help users quickly set up their CAC on their personal macOS.
              {' '}
              <a href="/docs/cac-tutorial" target="_blank" rel="noopener noreferrer">
                View User Guide
              </a>
            </p>
          </div>
        </div>
        <FeatureSteps type="user" />
        {/* Gap before Admin Steps */}
        <div style={{height: 56}} />
        <div className={styles.adminStepsBg}>
          <div style={{textAlign: 'center', margin: '48px 0 32px 0'}}>
            <h2>Admin Steps</h2>
            <p>
              These steps are designed to help administrators quickly deploy CAC support for their users.
              {' '}
              <a href="/docs/admin-guide" target="_blank" rel="noopener noreferrer">
                View Admin Guide
              </a>
            </p>
          </div>
        </div>
        <FeatureSteps type="admin" />
      </div>
    </section>
  );
}
