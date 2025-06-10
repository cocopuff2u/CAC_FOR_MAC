import clsx from 'clsx';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Step 1',
    Img: require('@site/static/img/certificates.webp').default,
    imgType: 'img',
    description: (
      <>
        Download the latest DoD Certificate Authority Certificates from the official source to ensure secure access.
      </>
    ),
  },
  {
    title: 'Step 2',
    Img: require('@site/static/img/cac_inserted.webp').default,
    imgType: 'img',
    description: (
      <>
        Connect your CAC reader to your Mac and insert your card. Ensure the system detects it properly.
      </>
    ),
  },
  {
    title: 'Step 3',
    Img: require('@site/static/img/access_approved.webp').default,
    imgType: 'img',
    description: (
      <>
        Visit the desired CAC-enabled website or application to confirm access is working.
      </>
    ),
  },
];

const FeatureList2 = [
  {
    title: 'Step 1',
    Img: require('@site/static/img/certificates.webp').default,
    imgType: 'img',
    description: (
      <>
        Deploy the latest DoD Certificate Authority Certificates to user devices using your preferred device management solution.
      </>
    ),
  },
  {
    title: 'Step 2',
    Img: require('@site/static/img/systemadmin.webp').default,
    imgType: 'img',
    description: (
      <>
        Set up CAC integration by ensuring the reader is properly recognized by the operating system and paired with the user's account if necessary.
      </>
    ),
  },
  {
    title: 'Step 3',
    Img: require('@site/static/img/Access_approved_guy.webp').default,
    imgType: 'img',
    description: (
      <>
        Validate the setup by having users access a CAC-protected resource to confirm functionality.
      </>
    ),
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

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        {/* Add info above the feature list */}
        <div style={{textAlign: 'center', marginBottom: 32}}>
          <h2>Want To Quickly Download DoD Certifcates?</h2>
          <p>
            Just copy and paste the command below into your terminal to download and install the latest DoD Certificate Authority Certificates.
          </p>
          <CodeBlock language="bash">
            sudo bash -c "$(curl -s https://raw.githubusercontent.com/cocopuff2u/MacOS_GOV_Scripts/main/Keychain_And_Certificates_Scripts/Import_DoD_Certs.sh)"
          </CodeBlock>
                              <p style={{fontStyle: 'italic', fontSize: '0.9rem', marginTop: '-10px'}}>
            *Always verify scripts before running them, especially if you are downloading it from a third-party source. You can view the script <a href="https://raw.githubusercontent.com/cocopuff2u/MacOS_GOV_Scripts/main/Keychain_And_Certificates_Scripts/Import_DoD_Certs.sh" target="_blank" rel="noopener noreferrer">here</a>.
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
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
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
        <div className="row">
          {FeatureList2.map((props, idx) => (
            <Feature key={`extra-${idx}`} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
