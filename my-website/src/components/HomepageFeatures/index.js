import clsx from 'clsx';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Step 1',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
Download the latest DoD Certificate Authority Certificates from the official
      </>
    ),
  },
  {
    title: 'Step 2',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
Connect your CAC reader to your computer and insert your CAC. Docusaurus
      </>
    ),
  },
  {
    title: 'Step 3',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
Access the CAC required website or application.
      </>
    ),
  },
];

const FeatureList2 = [
  {
    title: 'Step 1',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Deploy the DoD Certificate Authority Certificates to your users' machines using your preferred management tool.
      </>
    ),
  },
  {
    title: 'Step 2',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Setup a way to pair the CAC with the user's computer, ensuring that the reader is recognized by the system.
      </>
    ),
  },
  {
    title: 'Step 3',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Test the deployment by accessing a CAC-required website or application to ensure everything works smoothly.
      </>
    ),
  },
];


function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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
          <p style={{fontStyle: 'italic'}}>
            *Always verify the script before running it, especially if you are downloading it from a third-party source. You can view the script <a href="https://raw.githubusercontent.com/cocopuff2u/MacOS_GOV_Scripts/main/Keychain_And_Certificates_Scripts/Import_DoD_Certs.sh" target="_blank" rel="noopener noreferrer">here</a>.
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
