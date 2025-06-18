---
sidebar_position: 1
---
# Smart Card Introduction

## **What is a Smart Card?**

A **smart card** is a secure physical card embedded with an integrated circuit (chip) that can store and process data. On macOS, Apple refers to CACs, PIV cards, and similar devices (including YubiKeys in smart card mode) as "Smart Cards." These cards are used for secure authentication to computers, web resources, and applications, often providing two-factor authentication and cryptographic security.

Smart cards contain both **digital** and **physical** information:
- **Physical:** Printed details such as your name, photo, and ID number.
- **Digital:** The chip securely stores digital certificates, cryptographic keys, and sometimes biometric data.

A key feature is the storage of **digital certificates**. When you insert your smart card into a reader and attempt to access a system:
- The system requests authentication.
- The smart card presents a digital certificate stored on the chip.
- The system checks this certificate against a trusted local or public certificate authority (CA).
- If the certificate is valid and trusted, access is granted.

Most smart cards require you to enter a **PIN** or passcode before the card will perform cryptographic operations, protecting your credentials even if the card is lost or stolen.

---

## **Why Do People Use Smart Cards?**

Smart cards are widely used because they provide a secure and convenient way to authenticate identity, protect sensitive data, and enable secure access to systems and facilities. Key reasons for using smart cards include:

- **Strong Security:**  
  Smart cards store cryptographic keys and certificates securely on the chip, making it difficult for attackers to extract sensitive information. The private keys never leave the card, reducing the risk of compromise.

- **Multi-Factor Authentication:**  
  They enable two-factor authentication by requiring both the physical card and a PIN or passcode, greatly increasing security compared to passwords alone.

- **Convenience:**  
  A single smart card can be used for multiple purposes—such as logging into computers, signing documents, encrypting emails, and accessing buildings—reducing the need for multiple credentials.

- **Regulatory Compliance:**  
  Many organizations and government agencies require smart cards to meet security standards and regulatory requirements for identity verification and data protection.

- **Non-Repudiation:**  
  Digital signatures created with smart cards provide proof that a specific person performed an action, such as signing a document, which is important for legal and audit purposes.

- **Portability:**  
  Users can carry their credentials securely with them and use them across different devices and locations.

These benefits make smart cards a trusted solution for secure authentication and access in government, enterprise, healthcare, banking, and many other sectors.

---

## **Types of Smart Cards**

### Common Access Card (CAC)

A **Common Access Card (CAC)** is a smart card issued primarily by the U.S. Department of Defense and other government agencies. It is used for secure identification and authentication, enabling access to government computers, networks, and physical facilities. CACs contain embedded microchips that store certificates and cryptographic keys for secure login and digital signatures.

<p align="center">
  <img src="/img/smartcard/example_cac_id.webp" alt="Example CAC Card" width="180" /><br/>
  <em>Example of a Common Access Card (CAC)</em>
</p>

### YubiKey

A **YubiKey** is a hardware authentication device produced by Yubico. It supports multiple authentication protocols (such as FIDO2, U2F, PIV, and OTP) and can be used as a smart card for secure login, two-factor authentication, and cryptographic operations. Some government agencies allow YubiKeys to be used in place of traditional CACs or PIV cards for secure access.

<p align="center">
  <img src="/img/smartcard/example_yubikey.webp" alt="Example YubiKey" width="90" /><br/>
  <em>Example of a YubiKey</em>
</p>

### IC/ICC Cards

**IC Cards** (Integrated Circuit Cards), also known as ICC Cards, are a broad category of smart cards used across many sectors—including government, banking, healthcare, and corporate environments. These cards store identity credentials, digital certificates, or cryptographic keys, enabling secure login, encryption, and access control.

Unlike CACs and YubiKeys, IC/ICC cards may not follow the DoD's strict standards but still conform to international protocols such as ISO/IEC 7816 or GlobalPlatform. They are widely used in enterprise badge systems, citizen ID cards, EMV banking cards, and secure building access.

<p align="center">
  <img src="/img/smartcard/example_card.webp" alt="Example IC Card" width="180" /><br/>
  <em>Example of an IC Card</em>
</p>

:::note[Fun Fact]
_All CACs are IC cards, but not all IC cards are CACs. IC/ICC is the broader technical classification._
:::
___
## **Types of Certificates on a Smart Card**

Smart cards typically store several types of digital certificates, each serving a specific purpose for authentication, encryption, and digital signatures. The most common types include:

- **Authentication Certificate:**  
  Used to verify your identity when logging into computers, networks, or secure websites. This certificate allows the system to confirm that you are the authorized cardholder.

- **Digital Signature Certificate:**  
  Enables you to digitally sign documents or emails, providing proof of origin and ensuring the integrity of the signed content. This is often used for signing official documents or secure email communication.

- **Encryption Certificate:**  
  Used to encrypt and decrypt sensitive data, such as emails or files. This ensures that only the intended recipient (with the corresponding private key on their smart card) can access the protected information.

- **Key Management Certificate (optional):**  
  Some smart cards may include additional certificates for key management, such as key exchange or recovery operations, depending on organizational requirements.

Each certificate is issued by a trusted Certificate Authority (CA) and is securely stored on the smart card's chip. The private keys associated with these certificates never leave the card, providing strong security for cryptographic operations.


:::note[**Looking for more details on certificates?**]
_See the [Certificate Introduction](/docs/certificate/Certificate-Introduction) for a deeper dive into how certificates work, their types, and how they are used with smart cards._
:::

<small>
:::note[Feedback?]
_If you found an error, noticed something missing, or need additional help, please [submit feedback on GitHub](https://github.com/cocopuff2u/CAC_FOR_MAC/issues) or start a [GitHub discussion](https://github.com/cocopuff2u/CAC_FOR_MAC/discussions)._

_If you'd like to contribute improvements to this guide, feel free to submit a [pull request](https://github.com/cocopuff2u/CAC_FOR_MAC/pulls) or select `edit this page` below._
:::
</small>