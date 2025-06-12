import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Translate from '@docusaurus/Translate';
import React, {useEffect, useState} from 'react';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HeroBannerBg() {
  return (
    <>
      <div className={styles.heroBannerBg}></div>
      <div className={clsx(styles.heroBannerBg, styles.heroBannerBg2)}></div>
      <div className={clsx(styles.heroBannerBg, styles.heroBannerBg3)}></div>
    </>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [animate, setAnimate] = useState(false);
  const [blink, setBlink] = useState(false);
  const [solid, setSolid] = useState(false);
  const [usbAnimate, setUsbAnimate] = useState(false);
  const [usbBlink, setUsbBlink] = useState(false);
  const [usbSolid, setUsbSolid] = useState(false);
  const [yubiLightVisible, setYubiLightVisible] = useState(false);
  const [yubiLightSolid, setYubiLightSolid] = useState(false);
  const [showCAC, setShowCAC] = useState(true);
  const [cacFadeOut, setCacFadeOut] = useState(false);
  const [yubiFadeOut, setYubiFadeOut] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [cardFadeOut, setCardFadeOut] = useState(false);
  const [cardAnimate, setCardAnimate] = useState(false);
  const [cardBlink, setCardBlink] = useState(false);
  const [cardSolid, setCardSolid] = useState(false);

  useEffect(() => {
    let timeouts = [];
    let isMounted = true;

    function clearAll() {
      timeouts.forEach(clearTimeout);
      timeouts = [];
    }

    function cacCycle() {
      clearAll();
      if (!isMounted) return;
      setShowCAC(true);
      setCacFadeOut(false);
      setYubiFadeOut(false);
      setShowCard(false);
      setCardFadeOut(false);
      setAnimate(false);
      setUsbAnimate(false);
      setYubiLightVisible(false);
      setYubiLightSolid(false);
      setBlink(false);
      setSolid(false);
      setCardAnimate(false);
      setCardBlink(false);
      setCardSolid(false);
      timeouts.push(setTimeout(() => {
        if (!isMounted) return;
        setAnimate(true);
        setUsbAnimate(true);
        timeouts.push(setTimeout(() => isMounted && setBlink(true), 1000));
        timeouts.push(setTimeout(() => {
          if (!isMounted) return;
          setBlink(false);
          setSolid(true);
        }, 4000));
        timeouts.push(setTimeout(() => isMounted && setYubiLightVisible(true), 1000));
        timeouts.push(setTimeout(() => isMounted && setYubiLightSolid(true), 4000));
        timeouts.push(setTimeout(() => {
          if (!isMounted) return;
          setAnimate(false);
          setUsbAnimate(false);
          setBlink(false);
          setSolid(false);
          setYubiLightVisible(false);
          setYubiLightSolid(false);
          setTimeout(() => {
            if (!isMounted) return;
            setCacFadeOut(true);
            setTimeout(() => {
              if (!isMounted) return;
              setShowCAC(false);
              yubikeyCycle();
            }, 500);
          }, 10);
        }, 6000));
      }, 400));
    }

    function yubikeyCycle() {
      clearAll();
      if (!isMounted) return;
      setYubiFadeOut(false);
      setAnimate(false);
      setUsbAnimate(false);
      setYubiLightVisible(false);
      setYubiLightSolid(false);
      setBlink(false);
      setSolid(false);
      setShowCard(false);
      setCardFadeOut(false);
      setCardAnimate(false);
      setCardBlink(false);
      setCardSolid(false);
      timeouts.push(setTimeout(() => {
        if (!isMounted) return;
        setAnimate(true);
        setUsbAnimate(true);
        timeouts.push(setTimeout(() => isMounted && setYubiLightVisible(true), 600));
        timeouts.push(setTimeout(() => isMounted && setYubiLightSolid(true), 3200));
        timeouts.push(setTimeout(() => {
          if (!isMounted) return;
          setYubiLightVisible(false);
          setYubiLightSolid(false);
          setBlink(false);
          setSolid(false);
          setAnimate(false);
          setUsbAnimate(false);
          setTimeout(() => {
            if (!isMounted) return;
            setYubiFadeOut(true);
            setTimeout(() => {
              if (!isMounted) return;
              setShowCard(true);
              cardCycle();
            }, 300);
          }, 500);
        }, 4800));
      }, 300));
    }

    function cardCycle() {
      clearAll();
      if (!isMounted) return;
      setShowCard(true);
      setCardFadeOut(false);
      setCardAnimate(false);
      setCardBlink(false);
      setCardSolid(false);
      setShowCAC(false);
      setCacFadeOut(false);
      setAnimate(false);
      setBlink(false);
      setSolid(false);
      setUsbAnimate(false);
      setYubiLightVisible(false);
      setYubiLightSolid(false);
      timeouts.push(setTimeout(() => {
        if (!isMounted) return;
        setCardAnimate(true);
        timeouts.push(setTimeout(() => isMounted && setCardBlink(true), 1000));
        timeouts.push(setTimeout(() => {
          if (!isMounted) return;
          setCardBlink(false);
          setCardSolid(true);
        }, 4000));
        timeouts.push(setTimeout(() => {
          if (!isMounted) return;
          setCardAnimate(false);
          setCardBlink(false);
          setCardSolid(false);
          setTimeout(() => {
            if (!isMounted) return;
            setCardFadeOut(true);
            setTimeout(() => {
              if (!isMounted) return;
              setShowCard(false);
              cacCycle();
            }, 500);
          }, 10);
        }, 6000));
      }, 400));
    }

    cacCycle();

    return () => {
      isMounted = false;
      clearAll();
    };
  }, []);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <HeroBannerBg />
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttonsRow}>
          <div className={styles.buttons} style={{display: 'flex', gap: '1rem'}}>
            <Link
              className={`button button--secondary button--lg ${styles.certificateButton}`}
              to="/docs/intro">
              Certificate Guide
            </Link>
            <Link
              className={`button button--primary button--lg ${styles.cacButton}`}
              to="/docs/cac-tutorial">
              CAC Guide
            </Link>
          </div>
        </div>
        <div style={{position: 'relative', display: 'inline-block'}}>
          {/* Always render all three, toggle visibility with CSS */}
          <div
            className={clsx(
              styles.exampleCACImgWrapper,
              !showCAC && styles.hidden,
              cacFadeOut && styles.fadeOut
            )}
          >
            <img
              src="/img/Example_CAC.webp"
              alt="Example CAC"
              className={
                clsx(
                  styles.exampleCACImgAbsolute,
                  animate && styles.exampleCACImgDown
                )
              }
            />
            <div
              className={clsx(
                styles.clamshellWithLight,
                animate && styles.clamshellWithLightUp,
                blink && styles.clamshellWithLightBlink,
                solid && styles.clamshellWithLightSolid
              )}
            >
              <div className={styles.clamshellLight}></div>
            </div>
          </div>
          {/* New: Example Card Animation */}
          <div
            className={clsx(
              styles.exampleCACImgWrapper,
              !showCard && styles.hidden,
              cardFadeOut && styles.fadeOut
            )}
          >
            <img
              src="/img/Example_Card.webp"
              alt="Example Card"
              className={
                clsx(
                  styles.exampleCACImgAbsolute,
                  cardAnimate && styles.exampleCACImgDown
                )
              }
            />
            <div
              className={clsx(
                styles.clamshellWithLight,
                cardAnimate && styles.clamshellWithLightUp,
                cardBlink && styles.clamshellWithLightBlink,
                cardSolid && styles.clamshellWithLightSolid
              )}
            >
              <div className={styles.clamshellLight}></div>
            </div>
          </div>
          <span
            className={clsx(
              styles.exampleYubiKeyWrapper,
              animate && styles.exampleYubiKeyDown,
              showCAC && styles.hidden,
              showCard && styles.hidden,
              !animate && yubiFadeOut && styles.fadeOut
            )}
            style={{position: 'relative', display: 'inline-block'}}
          >
            <img
              src="/img/Example_YubiKey.webp"
              alt="Example YubiKey"
              className={clsx(
                styles.exampleCACImgAbsolute,
                styles.noShadow
              )}
            />
            {/* Blinking light in a hole at the top of the YubiKey */}
            <span className={clsx(
              styles.yubiKeyLight,
              yubiLightVisible && styles.yubiKeyLightVisible,
              !yubiLightSolid && yubiLightVisible && styles.yubiKeyLightBlink,
              yubiLightSolid && styles.yubiKeyLightSolid
            )}>
              <span className={styles.yubiKeyLightInner}></span>
            </span>
            <div
              className={clsx(
                styles.usb,
                usbAnimate && styles.usbUp
              )}
            >
              <div className={styles.usbPortRect}>
                <span className={styles.usbGold1}></span>
                <span className={styles.usbGold2}></span>
              </div>
            </div>
          </span>
          <span className={styles.usbPort}></span>
          <div className={styles.cacReaderLight}></div>
        </div>
        <div style={{textAlign: 'center', marginTop: 24, fontWeight: 'bold'}}>
          Support this project
        </div>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 8}}>
          <div
            className={styles.indexCtasGitHubButtonWrapper}
            style={{display: 'flex', justifyContent: 'center', width: 'fit-content', marginLeft: '24px'}}
          >
            <iframe
              className={styles.indexCtasGitHubButton}
              src="https://ghbtns.com/github-btn.html?user=cocopuff2u&amp;repo=MOFA&amp;type=star&amp;count=true&amp;size=large"
              width={160}
              height={30}
              title="GitHub Stars"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
