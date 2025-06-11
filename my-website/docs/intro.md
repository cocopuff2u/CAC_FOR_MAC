---
sidebar_position: 1
sidebar: false
---

# Guide Introduction

This website offers scripts, guides, tools, and helpful links to assist you in setting up CACs, YubiKeys, or IC/ICC Cards for secure authentication on your devices. Whether you're working from a personal or professional device, you'll find resources tailored for both system administrators and end-users.

This guide focuses primarily on **macOS**, with some content applicable to Linux or Windows where noted.

## Who is this for?

This site is for government employees, contractors, IT administrators, and anyone who uses a CAC, Smart Card, YubiKey, or IC/ICC Card to securely access systems on macOS. If you're trying to get things working—or just make them work better—you’re in the right place.

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

## What are Certificates?

Certificates are digital documents used to prove identity and establish trust between devices, users, and services. They use cryptographic keys to enable secure communication and authentication. Certificates are a core part of how smart cards, IC Cards, CACs, and YubiKeys work for secure login and access.

There are several types of certificates involved in authentication:

- **Root CA Certificate**: The top-level certificate in a trust chain, issued by a Certificate Authority (CA) that is trusted by your device or organization. Root CAs can be public (pre-installed on your device) or private (installed by your organization for internal use).
- **Public CA Certificate**: Issued by widely trusted third-party organizations (such as DigiCert, GlobalSign, etc.), these certificates are used to secure public websites and services. Devices and browsers trust these by default.
- **User Certificate**: Issued to an individual user and stored on a smart card or security key. This certificate proves your identity when logging in or accessing secure resources. The private key for this certificate never leaves your smart card or device.

These certificates work together in a chain of trust, allowing your device to verify that a certificate presented by a smart card or website is valid and trusted.

## What problems does this site solve?

This site is designed to help you get smart cards, CACs, and YubiKeys working smoothly in your environment—whether you’re an end-user or a system administrator, and whether you’re working on a personal device or managing a professional fleet. Here’s how:

- **Providing clear information and guidance**  
  Learn the concepts, requirements, and best practices for using smart cards and certificates on macOS.

- **Offering practical commands, scripts, and tools**  
  Access ready-to-use commands and automation scripts to simplify setup, troubleshooting, and ongoing management.

- **Solving certificate errors and authentication issues**  
  Understand and resolve common problems with certificates, login failures, and device compatibility.

- **Step-by-step setup instructions**  
  Follow detailed guides to configure CACs, Smart Cards, and YubiKeys for your specific needs.

- **Troubleshooting for all roles**  
  Find targeted troubleshooting advice for both end-users and IT/system administrators.

- **Keeping you up-to-date**  
  Stay current with tested solutions and the latest recommendations for secure authentication.

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
