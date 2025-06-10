---
sidebar_position: 1
sidebar: false
---

# Guide Introduction

This website offers scripts, guides, tools, and helpful links to assist you in setting up CACs, YubiKeys, or IC/ICC Cards for secure authentication on your devices. Whether you're working from a personal or professional device, you'll find resources tailored for both system administrators and end-users.

This guide focuses primarily on **macOS**, with some content applicable to Linux or Windows where noted.

## What are CACs, YubiKeys, IC/ICC Cards and Smart Cards?

**Smart Cards** is a general term for physical cards with embedded integrated circuits (chips) that can process data. On macOS, Apple refers to CACs, PIV cards, and similar devices (including YubiKeys in smart card mode) as "Smart Cards." These cards are used for secure authentication to computers, web resources, and applications, often providing two-factor authentication and cryptographic security.

A **Common Access Card (CAC)** is a smart card issued primarily by the U.S. Department of Defense and other government agencies. It is used for secure identification and authentication, enabling access to government computers, networks, and physical facilities. CACs contain embedded microchips that store certificates and cryptographic keys for secure login and digital signatures.

<p align="center">
  <img src="/img/example_cac.webp" alt="Example CAC Card" width="180" /><br/>
  <em>Example of a Common Access Card (CAC)</em>
</p>

A **YubiKey** is a hardware authentication device produced by Yubico. It supports multiple authentication protocols (such as FIDO2, U2F, PIV, and OTP) and can be used as a smart card for secure login, two-factor authentication, and cryptographic operations. Some government agencies allow YubiKeys to be used in place of traditional CACs or PIV cards for secure access.

<p align="center">
  <img src="/img/Example_yubikey.webp" alt="Example YubiKey" width="90" /><br/>
  <em>Example of a YubiKey</em>
</p>

**IC Cards** (Integrated Circuit Cards), also known as ICC Cards, are a broad category of smart cards used across many sectors—including government, banking, healthcare, and corporate environments. These cards store identity credentials, digital certificates, or cryptographic keys, enabling secure login, encryption, and access control.

Unlike CACs and YubiKeys, IC/ICC cards may not follow the DoD's strict standards but still conform to international protocols such as ISO/IEC 7816 or GlobalPlatform. They are widely used in enterprise badge systems, citizen ID cards, EMV banking cards, and secure building access.

> _Fun fact: All CACs are IC cards, but not all IC cards are CACs. IC/ICC is the broader technical classification._

## Who is this for?

This site is for government employees, contractors, IT administrators, and anyone who uses a CAC, Smart Card, YubiKey, or IC/ICC Card to securely access systems on macOS. If you're trying to get things working—or just make them work better—you’re in the right place.

## What problems does this site solve?

- **Fixing certificate errors and authentication issues**  
  Understand and resolve common problems with certificates and login failures.

- **Setting up CAC/Smart Card/YubiKey on macOS**  
  Step-by-step instructions to get you up and running.

- **Troubleshooting common problems**  
  Guides for diagnosing and resolving common macOS and hardware compatibility issues.

- **Providing up-to-date scripts and automation**  
  Use tested scripts to save time and reduce configuration errors.


## 🔗 Learn More & Vendor Links

---

### 🍎 Apple Smart Card & macOS Identity Integration

#### 📘 Core Deployment Guides

* **[Use a Smart Card on Mac](https://support.apple.com/guide/deployment/use-a-smart-card-on-mac-depc705651a9/web)**
  Information on using a Smart Card on a MacOS.

* **[Introduction to Smart Card Integration](https://support.apple.com/guide/deployment/intro-to-smart-card-integration-depd0b888248/1/web/1.0)**
  Overview of smart card capabilities and use cases in Apple environments.

* **[Supported Smart Card Functions on macOS](https://support.apple.com/guide/deployment/supported-smart-card-functions-on-mac-depc47f60521/1/web/1.0)**
  Detailed breakdown of PIV/CAC smart card operations supported across macOS versions.

#### 🔧 Configuration & MDM Settings

* **[Configure macOS for Smart Card–Only Authentication](https://support.apple.com/guide/deployment/configure-a-mac-smart-cardonly-authentication-depfce8de48b/1/web/1.0)**
  Guide to enforcing smart card-only login via system and MDM settings.

* **[Advanced Smart Card Options](https://support.apple.com/guide/deployment/advanced-smart-card-options-dep7b2ede1e3/1/web/1.0)**
  Explains keychain behaviors, cert mapping, certificate trust settings, and policy controls.

* **[Certificates Payload (MDM Settings)](https://support.apple.com/guide/deployment/certificates-payload-settings-dep91d2eb26/1/web/1.0)**
  How to deploy and manage certificate payloads via MDM.

* **[Smart Card Payload (MDM Settings)](https://support.apple.com/guide/deployment/smart-card-payload-settings-dep731e6a3c4/1/web/1.0)**
  Specific MDM payload options to configure smart card usage on supervised Apple devices.

---

### 🏛️ Government Resources

* **[CAC.mil – DoD Common Access Card Portal](https://www.cac.mil/)**
  Official Department of Defense (DoD) site for CAC information, software, and guidance. Managed by the Defense Manpower Data Center (DMDC).

* **[IDManagement.gov – FICAM Program](https://www.idmanagement.gov/)**
  Federal Identity, Credential, and Access Management (FICAM) hub, led by GSA. Provides policies, implementation tools, and the [Approved Products List (APL)](https://www.idmanagement.gov/fips201/) for PIV and smart card hardware/software.

* **[DoD Cyber Exchange](https://public.cyber.mil)**
  Central source for DoD cybersecurity tools and policies. Key pages include:

  * [PKI/PKE Tools](https://public.cyber.mil/pki-pke/)
    * Access Public Key Infrastructure (PKI) and Public Key Enabling (PKE) documentation, guides, and configuration tools for DoD environments.
  * [Purebred Derived Credentialing](https://cyber.mil/pki-pke/purebred/) _🔒 CAC login required_
    * Used to issue and manage secure derived credentials for mobile device authentication.

* **[NIST Computer Security Resource Center (CSRC)](https://csrc.nist.gov/)**
  Publishes federal standards for identity and access. Key documents:

  * [SP 800-63: Digital Identity Guidelines](https://pages.nist.gov/800-63-3/)
  * [SP 800-157: Derived PIV Credentials](https://csrc.nist.gov/publications/detail/sp/800-157/final)
  * [SP 800-73: PIV Card Interface](https://csrc.nist.gov/publications/detail/sp/800-73/4/final)
  * [SP 800-166: Token Binding](https://csrc.nist.gov/publications/detail/sp/800-166/final)

---

### 🛡️ YubiKey Resources

* **[Yubico Official Website](https://www.yubico.com/)**
  The manufacturer of YubiKey security keys supporting OTP, FIDO2, PIV, and Smart Card (CAC) standards.

* **[YubiKey for Federal Government](https://www.yubico.com/industries/federal/)**
  Solutions tailored for federal agencies, including FIPS-certified YubiKeys and PIV mode usage.

* **[YubiKey for State and Local Government](https://www.yubico.com/industries/state-local-government/)**
  YubiKey deployment guidance and solutions for state and local governments.

#### 📚 Additional YubiKey Resources & Tools

* [Yubico PIV Tool (GitHub)](https://github.com/Yubico/yubico-piv-tool) — Open-source tool for managing YubiKey PIV functionality
* [Phishing-Resistant MFA Deployment Best Practices (Federal)](https://www.yubico.com/resource/phishing-resistant-mfa-deployment-best-practices-federal/)
* [YubiKey Compatibility with macOS](https://www.yubico.com/works-with-yubikey/catalog/macos/)
* [YubiKey for macOS Login Guide](https://support.yubico.com/hc/en-us/articles/360016649059-YubiKey-for-macOS-login)
* [YubiKey Manager for macOS (Download)](https://www.yubico.com/support/download/yubikey-manager/)
