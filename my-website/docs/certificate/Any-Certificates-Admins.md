---
sidebar_position: 3
title: General | Admin
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Certificate Import – Admin Guide

This guide is for admins who need to deploy required certificates—such as those issued by a system administrator, IT department, or trusted authority—to managed Macs using MDM.

You will find two approaches for deploying certificates with MDM:

- [**Manual Method:**](#manual-method)  
  Best suited for deploying a large number of certificates at once. This method involves converting each certificate to base64 and combining them into a single plist or configuration profile file for deployment. The process can be scripted, enabling admins to efficiently create and deploy profiles containing many certificates.

- [**MDM Deployment:**](#mdm-gui-method)  
  Recommended when deploying a small number of certificates or when certificates are associated with specific configuration profiles (such as Wi-Fi or VPN settings). This approach uses the MDM's built-in GUI to upload and manage certificates and related settings.

Both methods achieve the same result—installing the necessary certificates—but differ in terms of scalability and automation.

---

## **Manual Method**

To manually deploy certificates you can create a configuration profile (plist file) containing the required certificates and install it on each device.

### Step 1: Acquire Required Certificates

- Download the necessary Root and Intermediate CA certificates that need to be trusted on your managed devices.
- These certificates are typically provided by your organization or the relevant certificate authority.
- Certificates are usually available in `.cer`, `.crt`, or `.pem` formats. Ensure you have all required files before proceeding.
- If you are unsure which certificates are needed, consult your IT/security team or refer to your organization's documentation.
- Store the downloaded certificates in a secure location for creating your plist

### Step 2: Convert Certificates to Base64

- Use the `base64` command to encode each certificate file (e.g., `.cer`, `.crt`, or `.pem`):
  ```
  base64 -i your-certificate.cer
  ```
- Copy the entire output (the encoded certificate data).

### Step 3: Build and Deploy the Plist (Configuration Profile)

- Create a new `.mobileconfig` or `.plist` file.
- For multiple certificates, add multiple `<dict>...</dict>` blocks inside the `<array>` of the `PayloadContent` section.
- Place the certificate payload(s) inside a standard Apple configuration profile structure. See [Apple's documentation](https://developer.apple.com/documentation/devicemanagement/certificateroot) for details.


<Tabs>
  <TabItem value="Path" label="Example Single Certificate" default>
```xml
<!-- Example: certificates.mobileconfig -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key> <!-- Array of certificate payloads -->
  <array>
    <dict>
      <key>AllowAllAppsAccess</key> <!-- (Optional) Allow all apps to access the certificate -->
      <true/>
      <key>KeyIsExtractable</key> <!-- (Optional) Allow private key extraction -->
      <true/>
      <key>PayloadCertificateFileName</key> <!-- Filename for the certificate -->
      <string>RootCA.cer</string>
      <key>PayloadContent</key> <!-- Base64-encoded certificate data -->
      <data>
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
      </data>
      <key>PayloadDescription</key> <!-- Description shown in profile UI -->
      <string>Installs Root CA</string>
      <key>PayloadDisplayName</key> <!-- Display name in profile UI -->
      <string>Root CA</string>
      <key>PayloadIdentifier</key> <!-- Unique identifier for this payload -->
      <string>com.example.certificate.rootca</string>
      <key>PayloadType</key> <!-- Type of payload (certificate) -->
      <string>com.apple.security.root</string>
      <key>PayloadUUID</key> <!-- Unique UUID for this payload -->
      <string>UUID-ROOT-CA-1234</string>
      <key>PayloadVersion</key> <!-- Payload version, always 1 -->
      <integer>1</integer>
    </dict>
  </array>
  <key>PayloadDisplayName</key> <!-- Profile display name -->
  <string>DoD Certificates</string>
  <key>PayloadIdentifier</key> <!-- Unique identifier for the profile -->
  <string>com.example.certificates.profile</string>
  <key>PayloadRemovalDisallowed</key> <!-- Allow removal of the profile -->
  <false/>
  <key>PayloadType</key> <!-- Profile type -->
  <string>Configuration</string>
  <key>PayloadUUID</key> <!-- Unique UUID for the profile -->
  <string>UUID-PROFILE-9999</string>
  <key>PayloadVersion</key> <!-- Profile version, always 1 -->
  <integer>1</integer>
</dict>
</plist>
```
  </TabItem>
  <TabItem value="Image" label="Example Multiple Certificate">
```xml
<!-- Example: certificates.mobileconfig -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key> <!-- Array of certificate payloads -->
  <array>
    <dict>
      <key>AllowAllAppsAccess</key> <!-- (Optional) Allow all apps to access the certificate -->
      <true/>
      <key>KeyIsExtractable</key> <!-- (Optional) Allow private key extraction -->
      <true/>
      <key>PayloadCertificateFileName</key> <!-- Filename for the certificate -->
      <string>RootCA.cer</string>
      <key>PayloadContent</key> <!-- Base64-encoded certificate data -->
      <data>
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
      </data>
      <key>PayloadDescription</key> <!-- Description shown in profile UI -->
      <string>Installs Root CA</string>
      <key>PayloadDisplayName</key> <!-- Display name in profile UI -->
      <string>Root CA</string>
      <key>PayloadIdentifier</key> <!-- Unique identifier for this payload -->
      <string>com.example.certificate.rootca</string>
      <key>PayloadType</key> <!-- Type of payload (certificate) -->
      <string>com.apple.security.root</string>
      <key>PayloadUUID</key> <!-- Unique UUID for this payload -->
      <string>UUID-ROOT-CA-1234</string>
      <key>PayloadVersion</key> <!-- Payload version, always 1 -->
      <integer>1</integer>
    </dict>
    <dict>
      <key>AllowAllAppsAccess</key> <!-- (Optional) Allow all apps to access the certificate -->
      <true/>
      <key>KeyIsExtractable</key> <!-- (Optional) Allow private key extraction -->
      <true/>
      <key>PayloadCertificateFileName</key> <!-- Filename for the certificate -->
      <string>IntermediateCA.cer</string>
      <key>PayloadContent</key> <!-- Base64-encoded certificate data -->
      <data>
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
      </data>
      <key>PayloadDescription</key> <!-- Description shown in profile UI -->
      <string>Installs Intermediate CA</string>
      <key>PayloadDisplayName</key> <!-- Display name in profile UI -->
      <string>Intermediate CA</string>
      <key>PayloadIdentifier</key> <!-- Unique identifier for this payload -->
      <string>com.example.certificate.intermediateca</string>
      <key>PayloadType</key> <!-- Type of payload (certificate) -->
      <string>com.apple.security.root</string>
      <key>PayloadUUID</key> <!-- Unique UUID for this payload -->
      <string>UUID-INTERMEDIATE-CA-5678</string>
      <key>PayloadVersion</key> <!-- Payload version, always 1 -->
      <integer>1</integer>
    </dict>
  </array>
  <key>PayloadDisplayName</key> <!-- Profile display name -->
  <string>DoD Certificates</string>
  <key>PayloadIdentifier</key> <!-- Unique identifier for the profile -->
  <string>com.example.certificates.profile</string>
  <key>PayloadRemovalDisallowed</key> <!-- Allow removal of the profile -->
  <false/>
  <key>PayloadType</key> <!-- Profile type -->
  <string>Configuration</string>
  <key>PayloadUUID</key> <!-- Unique UUID for the profile -->
  <string>UUID-PROFILE-9999</string>
  <key>PayloadVersion</key> <!-- Profile version, always 1 -->
  <integer>1</integer>
</dict>
</plist>
```
  </TabItem>
</Tabs>

:::note[TIP]
You can use tools like [ProfileCreator](https://github.com/ProfileCreator/ProfileCreator) to help build configuration profiles with embedded certificates.
:::

:::important[Example Automation]
While [this example script](https://github.com/cocopuff2u/MacOS_GOV_Scripts/blob/main/Keychain_And_Certificates_Scripts/Generate_DoD_Certs_Mobileconfig.py) is designed for a different use case, it demonstrates a complete workflow for downloading certificates and generating a `.mobileconfig` file ready for upload. You can adapt this approach to automate building your own configuration profiles containing all required certificates.
:::

### Step 4: Upload the Profile to MDM

- Upload the generated `.mobileconfig` or `.plist` file to your MDM solution, following your MDM provider's documentation for importing custom configuration profiles.
- For reference, here are guides for common MDM providers:
  - [Jamf Pro: Uploading Configuration Profiles](https://learn.jamf.com/en-US/bundle/technical-paper-integrating-ad-cs-current/page/Distributing_a_Certificate_Using_a_Configuration_Profile.html)
  - [Microsoft Intune: Add or create a device configuration profile](https://learn.microsoft.com/en-us/intune/intune-service/protect/certificates-trusted-root)
  - [VMware Workspace ONE: Add a Configuration Profile](https://docs.omnissa.com/bundle/workspace-one-access-deployment-with-UEM/page/AddCertificateTemplateinWorkspaceONEUEM.html)
  - [Kandji: Add and Deploy Configuration Profiles](https://support.kandji.io/kb/certificate-profile)

### Step 5: Assign and Deploy the Profile

- Assign the uploaded profile to the appropriate device groups or users in your MDM.
- Push the profile to all managed devices.

:::important
_If a certificate already exists on a device and you deploy it via MDM, the MDM-managed certificate will take control and override any local settings for that certificate. When you remove the certificate profile from MDM, the certificate will be completely removed from the device._
:::


### Step 6: Verify on Devices

- On a managed device, open **Keychain Access** and check the **System** keychain for the imported certificates.
- Ensure Root CAs are trusted (orange, "Always Trust") and Intermediates are present (blue).
- Test access to required resources.

**Visual Examples:**  
Below is a table showing what a properly trusted Root CA certificate and a failed trust setting look like in Keychain Access, as well as the color difference between Root and Intermediate CAs:

<div align="center">

| Good (Always Trust) Root CA | Failed Trust Root CA | Root CA (Orange) | Intermediate CA (Blue) |
|:--------------------------:|:-------------------:|:----------------:|:----------------------:|
| <img src="/img/certificate-guide-img/CertSmallRoot_UserTrust.webp" alt="Root CA Always Trust Example" width="25"/> | <img src="/img/certificate-guide-img/CertSmallRoot_Invalid.webp" alt="Root CA Not Trusted Example" width="25"/> | <img src="/img/certificate-guide-img/CertLargeRoot.webp" alt="Example Root CA certificate file" width="50"/> | <img src="/img/certificate-guide-img/CertLargeStd.webp" alt="Example Intermediate CA certificate file" width="50"/> |

</div>

---

## **MDM GUI Method**

### Step 1: Acquire Required Certificates

- Download the necessary Root and Intermediate CA certificates that need to be trusted on your managed devices.
- These certificates are typically provided by your organization or the relevant certificate authority.
- Certificates are usually available in `.cer`, `.crt`, or `.pem` formats. Ensure you have all required files before proceeding.
- If you are unsure which certificates are needed, consult your IT/security team or refer to your organization's documentation.
- Store the downloaded certificates in a secure location for uploading to your MDM.

### Step 2: Upload Certificates to MDM

- Take the certificate files and upload them into your MDM according to your MDM provider's documentation.
- Typically, you will create a new certificate payload or profile and add all required Root and Intermediate CA certificates.
- For reference, here are guides for common MDM providers:
  - [Jamf Pro: Uploading Configuration Profiles](https://learn.jamf.com/en-US/bundle/technical-paper-integrating-ad-cs-current/page/Distributing_a_Certificate_Using_a_Configuration_Profile.html)
  - [Microsoft Intune: Add or create a device configuration profile](https://learn.microsoft.com/en-us/intune/intune-service/protect/certificates-trusted-root)
  - [VMware Workspace ONE: Add a Configuration Profile](https://docs.omnissa.com/bundle/workspace-one-access-deployment-with-UEM/page/AddCertificateTemplateinWorkspaceONEUEM.html)
  - [Kandji: Add and Deploy Configuration Profiles](https://support.kandji.io/kb/certificate-profile)

### Step 3: Configure Configuration Settings (if available)

- Many MDMs allow you to configure trust settings for certificates. For Root CAs, set the trust level to "Always Trust" if your MDM supports it.
- When creating the certificate payload or profile, you may have the option to specify additional keys, such as:
  - `AllowAllAppsAccess` – allows all applications to access the certificate.
  - `KeyIsExtractable` – allows the private key to be exported or extracted (if applicable).
- The specific keys and settings available depend on the certificate payload type and your MDM platform. For detailed information on supported keys and configuration options, see:
  - [Apple ACMECertificate Payload Keys](https://developer.apple.com/documentation/devicemanagement/acmecertificate)
  - [Apple CertificateRoot Payload Keys](https://developer.apple.com/documentation/devicemanagement/certificateroot)
- Always consult your MDM provider's documentation for instructions on setting these options and configuring trust.
- After configuration, review the profile for accuracy before deploying.

### Step 4: Assign and Deploy the Profile

- Assign the uploaded profile to the appropriate device groups or users in your MDM.
- Push the profile to all managed devices.

:::important
_If a certificate already exists on a device and you deploy it via MDM, the MDM-managed certificate will take control and override any local settings for that certificate. When you remove the certificate profile from MDM, the certificate will be completely removed from the device._
:::


### Step 5: Verify on Devices

- On a managed device, open **Keychain Access** and check the **System** keychain for the imported certificates.
- Ensure Root CAs are trusted (orange, "Always Trust") and Intermediates are present (blue).
- Test access to required resources.

**Visual Examples:**  
Below is a table showing what a properly trusted Root CA certificate and a failed trust setting look like in Keychain Access, as well as the color difference between Root and Intermediate CAs:

<div align="center">

| Good (Always Trust) Root CA | Failed Trust Root CA | Root CA (Orange) | Intermediate CA (Blue) |
|:--------------------------:|:-------------------:|:----------------:|:----------------------:|
| <img src="/img/certificate-guide-img/CertSmallRoot_UserTrust.webp" alt="Root CA Always Trust Example" width="25"/> | <img src="/img/certificate-guide-img/CertSmallRoot_Invalid.webp" alt="Root CA Not Trusted Example" width="25"/> | <img src="/img/certificate-guide-img/CertLargeRoot.webp" alt="Example Root CA certificate file" width="50"/> | <img src="/img/certificate-guide-img/CertLargeStd.webp" alt="Example Intermediate CA certificate file" width="50"/> |

</div>

---

## **Troubleshooting Steps**

- **Certificates not appearing on devices:**  
  - Ensure the profile was assigned and pushed to the correct devices.
  - Check for errors in the MDM deployment logs.

- **Certificates not trusted:**  
  - Verify trust settings in the MDM profile.
  - Remove old/expired certificates from devices before deploying new ones.

- **Profile installation fails:**  
  - Check for conflicting profiles or existing certificates.
  - Ensure devices are enrolled and communicating with MDM.

- **Access to resources still fails:**  
  - Confirm certificates are in the **System** keychain and trusted.
  - Restart the device and test again.

<small>
:::note[Feedback?]
_If you found an error, noticed something missing, or need additional help, please [submit feedback on GitHub](https://github.com/cocopuff2u/CAC_FOR_MAC/issues) or start a [GitHub discussion](https://github.com/cocopuff2u/CAC_FOR_MAC/discussions)._

_If you'd like to contribute improvements to this guide, feel free to submit a [pull request](https://github.com/cocopuff2u/CAC_FOR_MAC/pulls) or select `edit this page` below._
:::
</small>

