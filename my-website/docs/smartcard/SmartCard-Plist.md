---
sidebar_position: 8
title: Manage Settings
---
# Manage Settings

:::warning[Page Development]
<div align="center">

<img src="/img/page_construction.webp" alt="Example CAC Card" width="180" />

# 🚧 Page In Development 🚧

**This page is not yet complete and may be missing information.**

<em>
Want to help? Click <strong>Edit this Page</strong> at the bottom to contribute!
</em>

</div>
:::


## **Understanding How to Manage Settings**

### **Plist Files**

Plist files (Property List files) are configuration files used by macOS to store settings and properties for applications and system services. They are commonly used for managing preferences and system configurations. Plist files can be found in XML or binary format and are often modified directly by applications or system processes.

#### Restrictive Behavior of Certain Plist Files

Some plist files, particularly those related to security and authentication, can enforce strict policies that lock users out of certain functions entirely. For example:

1. **System-Level Restrictions**:  
   Plist files like `/private/etc/SmartcardLogin.plist` can enforce mandatory smart card authentication for all users. If a smart card is not available or fails authentication, the user may be completely locked out of the system.

2. **User-Level Restrictions**:  
   Plist files such as `/Users/<username>/Library/Preferences/com.apple.security.tokenlogin.plist` can override user-specific settings to disable login without a smart card. This ensures compliance with organizational security policies but may prevent access if the smart card is unavailable.

These restrictions are typically implemented to enhance security in environments where strict authentication policies are required, such as government or enterprise systems. Administrators must carefully configure these plist files to balance security with usability.

### **MobileConfig Files**

MobileConfig files are XML-based configuration profiles used by macOS to manage device settings and policies. These files are typically deployed by Mobile Device Management (MDM) solutions to enforce system-wide or user-specific configurations. MobileConfig files interact with plist files to apply settings such as smart card authentication, network configurations, and security policies.

#### How MobileConfig Files Work

MobileConfig files can manage multiple plist files by including configuration payloads for each plist file. Each payload defines settings for a specific service or application, allowing administrators to manage multiple configurations in one file.

#### Example Structure:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <!-- Payload for com.apple.smartcard.plist -->
        <dict>
            <key>PayloadType</key>
            <string>com.apple.smartcard</string>
            <key>RequireSmartCard</key>
            <true/>
        </dict>
        <!-- Payload for com.apple.security.tokenlogin.plist -->
        <dict>
            <key>PayloadType</key>
            <string>com.apple.security.tokenlogin</string>
            <key>LastUsedSmartCard</key>
            <string>SmartCardID123</string>
        </dict>
    </array>
</dict>
</plist>
```

#### Key Points:
- **PayloadContent**: Contains an array of configurations, each representing a plist file.
- **PayloadType**: Specifies the plist file being configured (e.g., `com.apple.smartcard`, `com.apple.security.tokenlogin`).
- **Centralized Management**: Administrators can manage multiple plist files in one MobileConfig file for efficient deployment.

#### Limitations on Managed Plist File Locations

MobileConfig files can only manage plist files in specific system-defined locations:

1. **System-Level Plist Files**:  
   Located in directories like `/Library/Managed Preferences/` or `/private/etc/`. These files apply settings globally across all users on the device.

2. **User-Level Plist Files**:  
   Located in directories like `/Users/<username>/Library/Preferences/`. These files store settings for individual users. MobileConfig files can target specific users or user groups to apply personalized configurations.

macOS restricts MobileConfig files to these locations to ensure system security and integrity. Administrators must ensure plist files are in supported directories for management.

### **Configuration Profiles**

Configuration profiles are structured XML files (often with a `.mobileconfig` extension) that define settings and policies for macOS and iOS devices. These profiles are used to automate device configuration without requiring manual intervention. They are commonly used in enterprise environments to enforce security policies, network settings, and application preferences.

#### Key Features:
- **Centralized Management**: Enables administrators to manage multiple devices remotely using MDM solutions.
- **Automated Configuration**: Applies settings such as Wi-Fi configurations, VPN setups, and smart card authentication policies automatically.
- **Security Enforcement**: Ensures compliance with organizational security standards by enforcing password policies, certificate trust, and device restrictions.
- **Integration with Plist Files**: Configuration profiles modify or create plist files on the device to apply the defined settings.

#### Example Use Case:
A configuration profile might enforce smart card authentication by updating the `com.apple.smartcard.plist` file to require smart card login for all users. This ensures that the organization's security policies are consistently applied across all managed devices.

#### How MobileConfig Files Work with MDM:
- **Deployment**: MobileConfig files are pushed to devices by an MDM server, allowing administrators to remotely configure and enforce policies.
- **Integration with Plist Files**: MobileConfig files often modify or create plist files on the device to apply the desired settings. For example, a MobileConfig file might enforce smart card login by updating the `com.apple.smartcard.plist` file.
- **Centralized Management**: Administrators can use MobileConfig files to manage multiple devices simultaneously, ensuring consistent policies across an organization.

### **How MobileConfig and Plist Files Work Together**

MobileConfig files act as a higher-level configuration tool that interacts with plist files to apply settings on macOS devices. When a MobileConfig file is deployed via MDM, it can directly modify plist files or create new ones to enforce specific policies. Here’s how they work together:

1. **Policy Definition**:  
   The MobileConfig file defines the desired settings, such as requiring smart card authentication or specifying allowed certificates.

2. **Plist Modification**:  
   Upon deployment, the MobileConfig file updates the corresponding plist files (e.g., `com.apple.smartcard.plist`) on the device to reflect the defined policies.

3. **System Behavior**:  
   The plist files, now updated with the new settings, are read by the system services to enforce the policies defined in the MobileConfig file.

4. **Dynamic Updates**:  
   If the MobileConfig file is updated or removed by the MDM server, the associated plist files are modified accordingly, ensuring the device remains in sync with the organization's policies.

By combining MobileConfig files for centralized management and plist files for local configuration, administrators can efficiently enforce and manage device settings across multiple macOS systems.

## What types of plist files?

For smart card login and management on macOS, the following plist files are commonly involved:

- **System-level configuration:**  
  `/private/etc/SmartcardLogin.plist`
- **Managed preferences (often set by MDM):**  
  `com.apple.smartcard.plist` (typically in `/Library/Managed Preferences/`)
- **User-level preferences:**  
  `/Users/keatscm/Library/Preferences/com.apple.security.tokenlogin.plist`

## Details on what each one does?

### **/private/etc/SmartcardLogin.plist**

This file controls system-wide smart card login policies. It enforces global settings related to smart card authentication and can be used to define certificate trust, exemptions, and advanced configurations.

#### Example Code:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>AttributeMapping</key>
    <dict>
        <key>dsAttributeString</key>
        <string>dsAttrTypeStandard:AltSecurityIdentities</string>
        <key>fields</key>
        <array>
            <string>NT Principal Name</string>
        </array>
        <key>formatString</key>
        <string>Kerberos:$1</string>
    </dict>
    <key>TrustedAuthorities</key>
    <array>
        <string>SHA256_HASH_OF_CERTDOMAIN_1</string>
        <string>SHA256_HASH_OF_CERTDOMAIN_2</string>
    </array>
    <key>NotEnforcedGroup</key>
    <string>EXEMPT_GROUP</string>
</dict>
</plist>
```

#### Key and Value Details:
- **AttributeMapping**:  
  A dictionary that maps smart card attributes to directory service attributes.  
  - **dsAttributeString**: Specifies the directory service attribute to map (e.g., `dsAttrTypeStandard:AltSecurityIdentities`).  
  - **fields**: An array of fields to extract from the smart card (e.g., `NT Principal Name`).  
  - **formatString**: Defines the format for mapping (e.g., `Kerberos:$1`).

- **TrustedAuthorities**:  
  An array of SHA-256 fingerprints of Certificate Authorities used for trust evaluation of smart card certificates. This enables certificate pinning, ensuring only certificates issued by trusted authorities are accepted.  
  - **Note**: Ignored if `checkCertificateTrust` is set to `0`.


<details>
<summary>
  <strong>How to Retrieve SHA-256 Fingerprints of a Certificate</strong>  
  _(Click to expand)_
</summary>

To retrieve the SHA-256 fingerprint of a certificate, use the following command in the terminal:

```bash
openssl x509 -in <certificate_file.pem> -noout -fingerprint -sha256
```

Replace `<certificate_file.pem>` with the path to the certificate file.

#### Example Output:
```
SHA256 Fingerprint=AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90
```

#### Important Notes:
- Use the fingerprint of the **root** or **intermediate** certificate for certificate pinning. These certificates are part of the trust chain and ensure proper validation of smart card certificates.
- Ensure the SHA-256 fingerprints are added to the `TrustedAuthorities` array in the plist file for proper trust evaluation.
</details>

- **NotEnforcedGroup**:  
  A string specifying the group exempt from smart card authentication policies. Members of this group can bypass smart card requirements.

#### Additional Notes:
- Ensure ownership is set to `root` and permissions are set to `world read` after editing this file to maintain system security.
- This file is critical for enforcing system-wide smart card policies and should be configured carefully to balance security and usability.

---

### **com.apple.smartcard.plist (Managed Preferences)**

This file is used by organizations (often via MDM solutions) to manage smart card settings across multiple machines or users. It allows administrators to enforce policies like requiring smart cards for login, controlling certificate trust, and other organization-wide settings.

#### Example Code:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>RequireSmartCard</key>
    <true/>
    <key>AllowedCertificates</key>
    <array>
        <string>Certificate1</string>
        <string>Certificate2</string>
    </array>
</dict>
</plist>
```

#### Key and Value Details:
- **RequireSmartCard**:  
  A boolean value (`true` or `false`) that specifies whether smart card login is required for all managed users.
- **AllowedCertificates**:  
  An array of strings listing the certificates that are allowed for authentication.

---

### **/Users/keatscm/Library/Preferences/com.apple.security.tokenlogin.plist**

This file stores user-specific settings for smart card login. It contains preferences and state related to the user's smart card authentication, such as the last used card or user-specific overrides.

#### Example Code:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>LastUsedSmartCard</key>
    <string>SmartCardID123</string>
    <key>OverrideSettings</key>
    <dict>
        <key>AllowLoginWithoutCard</key>
        <false/>
    </dict>
</dict>
</plist>
```

#### Key and Value Details:
- **LastUsedSmartCard**:  
  A string value representing the ID of the last smart card used by the user.
- **OverrideSettings**:  
  A dictionary containing user-specific overrides.  
  - **AllowLoginWithoutCard**: A boolean value (`true` or `false`) that specifies whether the user can log in without a smart card.