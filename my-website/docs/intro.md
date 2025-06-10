---
sidebar_position: 1
sidebar: false
---
# Guide Introduction

**This website is designed to provide scripts, guides, links, and tools to help you get your CAC, Smart Card, or YubiKey working for authentication on your devices.**

## What are CACs, YubiKeys, and Smart Cards?

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

**Smart Cards** is a general term for physical cards with embedded integrated circuits (chips) that can process data. On macOS, Apple refers to CACs, PIV cards, and similar devices (including YubiKeys in smart card mode) as "Smart Cards." These cards are used for secure authentication to computers, web resources, and applications, often providing two-factor authentication and cryptographic security.

## Who is this for?

This site is designed for government employees, contractors, IT administrators, and anyone who needs to use a CAC, Smart Card, or YubiKey for secure authentication on macOS. If you're having trouble getting things to work, you're in the right place.

## What problems does this site solve?

- Fixing certificate errors and authentication issues
- Setting up CAC/Smart Card/YubiKey on macOS
- Troubleshooting common problems
- Providing up-to-date scripts and automation

## Quick Start

- Follow the homepage instructions to quickly install DoD certificates.
- See the User and Admin guides for step-by-step setup.

## Supported Platforms

- macOS (latest versions)
- Some guides and scripts may also help with Windows and Linux

## Security Notice

Always verify scripts before running them. Follow your agency’s security policies and keep your system updated.

## Troubleshooting & FAQ

See the [Troubleshooting](./troubleshooting.md) and [FAQ](./faq.md) pages for solutions to common issues.

## Community & Support

- [GitHub Issues](https://github.com/cocopuff2u/MacOS_GOV_Scripts/issues)
- [Contact](mailto:your-email@example.com) for help or suggestions

## Contributing

Contributions are welcome! Submit scripts, guides, or corrections via GitHub.

## Changelog / Updates

See the [Changelog](./changelog.md) for recent updates and new features.

## Learn More & Vendor Links

- **CAC & PIV Information**
  - [U.S. Department of Defense CAC Portal](https://www.cac.mil/)
  - [GSA PIV Program](https://www.idmanagement.gov/piv/)
- **YubiKey**
  - [Yubico (YubiKey)](https://www.yubico.com/)
  - [YubiKey for Government](https://www.yubico.com/solutions/government/)
- **Other Smart Card Vendors**
  - [Thales (Gemalto)](https://www.thalesgroup.com/en/markets/digital-identity-and-security/government/information-protection/smart-cards)
  - [Identiv](https://www.identiv.com/products/smart-card-readers/)
  - [HID Global](https://www.hidglobal.com/products/cards-and-credentials/smart-cards)
- **Apple Smart Card Support**
  - [Apple Platform Deployment: Smart Cards](https://support.apple.com/guide/deployment/smart-card-authentication-depca5d87151/web)
