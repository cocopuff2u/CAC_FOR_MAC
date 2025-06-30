---
sidebar_position: 8
title: SmartCard Settings
---
# SmartCard Settings

## **How to Manage Settings?**

### Plist Files

Plist files (Property List files) are configuration files used by macOS to store settings and properties for applications and system services. For example, the `com.apple.security.smartcard` plist file with the key `enforceSmartCard` set to `true` can enforce smart card usage for all users on the device when deployed at the system level. Plist files are typically stored in XML or binary format and are often modified directly by applications or system processes.

#### Generic Example: `com.apple.security.smartcard.plist`

Below is a generic example of a plist file for managing smart card settings:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>enforceSmartCard</key>
    <true/>
</dict>
</plist>
```

<details>
<summary>
  <strong>Detailed Line-by-Line Explanation of the `com.apple.security.smartcard.plist`</strong>  
  _(Click to expand for more details)_
</summary>

1. **`<?xml version="1.0" encoding="UTF-8"?>`**:  
   Specifies the XML version and character encoding used in the file. This ensures compatibility with XML parsers.

2. **`<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">`**:  
   Defines the document type as a Property List (plist) file and references Apple's DTD (Document Type Definition) for validation.

3. **`<plist version="1.0">`**:  
   Indicates the version of the plist format being used. Version `1.0` is standard for macOS plist files.

4. **`<dict>`**:  
   Opens a dictionary structure, which is used to store key-value pairs. A `<dict>` can contain multiple keys, each with its own value. The values can be of various types, such as `<string>`, `<array>`, or nested `<dict>` elements.  
   - **Impact on Deployment**: If a `<dict>` contains invalid or unsupported keys, the settings may fail to deploy or cause unexpected behavior. Always ensure the keys and values are correctly formatted and supported by the system.

5. **`<key>enforceSmartCard</key>`**:  
   Defines the key `enforceSmartCard`, which is used to enforce smart card usage for login and authentication.

6. **`<true/>`**:  
   Sets the value of the `enforceSmartCard` key to `true`, enabling the enforcement of smart card usage.

7. **`<array>`**:  
   Represents a list of values. Each value in the array is enclosed within `<string>` tags. Arrays are commonly used for settings that require multiple values, such as a list of allowed certificates or trusted authorities.  
   - **Impact on Deployment**: If the array contains invalid or duplicate values, the system may ignore the entire array or fail to apply the configuration.

8. **`<string>`**:  
   Represents a single text value. Strings are used for keys, identifiers, or individual values within arrays.  
   - **Impact on Deployment**: Ensure the string values are correctly formatted and match expected identifiers or paths. Incorrect strings can lead to deployment errors or misconfigurations.

9. **`</dict>`**:  
   Closes the dictionary structure.

10. **`</plist>`**:  
    Closes the plist file.

</details>

### MobileConfig Files

MobileConfig files are XML-based configuration profiles used by macOS to manage device settings and policies. These files allow administrators to bundle multiple plist files into a single profile, enabling centralized management of various configurations. MobileConfig files are what are deployed via Mobile Device Management (MDM) solutions to enforce system-wide or user-specific settings.

#### Key Features:
- **Combination of Multiple Plist Files**:
  MobileConfig files can include multiple plist files, each representing a specific configuration payload.

- **Centralized Management**:
  By bundling multiple plist files, administrators can efficiently deploy and enforce complex configurations across devices or users.

#### Good Example Use Case:
If you need to configure wireless network settings and deploy a wireless certificate, you can include both the wireless plist and the certificate plist in a single MobileConfig file. This approach ensures that all related settings are applied together and managed centrally.

As a macOS administrator, it is generally recommended to group related settings into a single deployment whenever possible, unless specific configurations need to be applied in a particular sequence. Keeping common settings together simplifies troubleshooting and maintains a structured deployment process.

#### Generic Example: SmartCard_Firewall_Enforcement.mobileconfig

This example demonstrates how to enforce smart card usage using the `enforceSmartCard` key and enable the firewall using the `EnableFirewall` key within one MobileConfig file.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <!-- Payload for enforcing smart card usage -->
        <dict>
            <key>PayloadDisplayName</key>
            <string>SmartCard Enforcement</string>
            <key>PayloadIdentifier</key>
            <string>com.cac-for-mac.smartcard.enforcement</string>
            <key>PayloadType</key>
            <string>com.apple.security.smartcard</string>
            <key>PayloadUUID</key>
            <string>6A2F1B3C-9D4E-4A1B-8C2F-1234567890AB</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>enforceSmartCard</key>
            <true/>
        </dict>
        <!-- Payload for enabling the firewall -->
        <dict>
            <key>PayloadDisplayName</key>
            <string>Firewall Enforcement</string>
            <key>PayloadIdentifier</key>
            <string>com.cac-for-mac.firewall.enforcement</string>
            <key>PayloadType</key>
            <string>com.apple.security.firewall</string>
            <key>PayloadUUID</key>
            <string>7B3C2D4E-5F6A-8B9C-0D1E-ABCDEF123456</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>EnableFirewall</key>
            <true/>
        </dict>
    </array>
    <key>PayloadDescription</key>
    <string>Settings for enforcing smart card usage and enabling the firewall</string>
    <key>PayloadDisplayName</key>
    <string>SmartCard and Firewall Enforcement Profile</string>
    <key>PayloadEnabled</key>
    <true/>
    <key>PayloadIdentifier</key>
    <string>com.cac-for-mac.smartcard-firewall.profile</string>
    <key>PayloadOrganization</key>
    <string>Your Organization</string>
    <key>PayloadRemovalDisallowed</key>
    <true/>
    <key>PayloadScope</key>
    <string>System</string>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>1B2C3D4E-5F6A-7B8C-9D0E-ABCDEF123456</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>
```

<details>
<summary>
  <strong>Detailed Line-by-Line Explanation of the `SmartCard_Firewall_Enforcement.mobileconfig`</strong>  
  _(Click to expand for more details)_
</summary>
#### Explanation of Each Line:
1. **`<?xml version="1.0" encoding="UTF-8"?>`**:  
   Specifies the XML version and character encoding used in the file. This ensures compatibility with XML parsers.

2. **`<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">`**:  
   Defines the document type as a Property List (plist) file and references Apple's DTD (Document Type Definition) for validation.

3. **`<plist version="1.0">`**:  
   Indicates the version of the plist format being used. Version `1.0` is standard for macOS plist files.

4. **`<dict>`**:  
   Opens a dictionary structure, which is used to store key-value pairs. This is the root dictionary for the MobileConfig file.

5. **`<key>PayloadContent</key>`**:  
   Defines the key `PayloadContent`, which contains an array of payload dictionaries. Each payload represents a specific configuration.

6. **`<array>`**:  
   Represents a list of payload dictionaries. Each dictionary within the array defines a specific configuration, such as enforcing smart card usage or enabling the firewall.

7. **Payload for SmartCard Enforcement:  
   - **`<key>PayloadDisplayName</key>`**: Specifies the display name for the payload, shown in the Profiles UI.  
   - **`<key>PayloadIdentifier</key>`**: A unique identifier for the payload.  
   - **`<key>PayloadType</key>`**: Specifies the type of payload (`com.apple.security.smartcard` for smart card enforcement).  
   - **`<key>PayloadUUID</key>`**: A unique UUID for the payload.  
   - **`<key>PayloadVersion</key>`**: Specifies the version of the payload.  
   - **`<key>enforceSmartCard</key>`**: Enables enforcement of smart card usage for login and authentication.

8. **Payload for Firewall Enforcement:  
   - **`<key>PayloadDisplayName</key>`**: Specifies the display name for the payload, shown in the Profiles UI.  
   - **`<key>PayloadIdentifier</key>`**: A unique identifier for the payload.  
   - **`<key>PayloadType</key>`**: Specifies the type of payload (`com.apple.security.firewall` for firewall settings).  
   - **`<key>PayloadUUID</key>`**: A unique UUID for the payload.  
   - **`<key>PayloadVersion</key>`**: Specifies the version of the payload.  
   - **`<key>EnableFirewall</key>`**: Enables the macOS firewall to protect the system.

9. **`<key>PayloadDescription</key>`**:  
   Provides a description of the overall profile.

10. **`<key>PayloadDisplayName</key>`**:  
    Specifies the display name for the overall profile.

11. **`<key>PayloadEnabled</key>`**:  
    Indicates whether the profile is enabled.

12. **`<key>PayloadIdentifier</key>`**:  
    A unique identifier for the overall profile.

13. **`<key>PayloadOrganization</key>`**:  
    Specifies the organization name associated with the profile.

14. **`<key>PayloadRemovalDisallowed</key>`**:  
    Prevents the removal of the profile if set to `true`.

15. **`<key>PayloadScope</key>`**:  
    Specifies the scope of the profile (`System` applies to all users).

16. **`<key>PayloadType</key>`**:  
    Specifies the type of the overall profile (`Configuration`).

17. **`<key>PayloadUUID</key>`**:  
    A unique UUID for the overall profile.

18. **`<key>PayloadVersion</key>`**:  
    Specifies the version of the overall profile.

19. **`</dict>`**:  
    Closes the root dictionary structure.

20. **`</plist>`**:  
    Closes the plist file.

</details>

### PAM Configuration Files

PAM (Pluggable Authentication Modules) are used to define authentication policies for various services on macOS. These configuration files live in `/etc/pam.d/` and control how authentication, account access, password changes, and session setup are handled.

Each file corresponds to a specific service (e.g., `sudo`, `login`, `screensaver`) and defines the stack of modules used for authentication and related tasks. This allows administrators to customize how users authenticate, including smartcard use, biometrics, and fallback to username/password.

#### Example: `/etc/pam.d/sudo`

This example shows how to configure `sudo` to support smartcard authentication, with fallback to password:

```bash
# sudo: auth account password session
auth        sufficient    pam_smartcard.so
auth        required      pam_opendirectory.so
auth        required      pam_deny.so
account     required      pam_permit.so
password    required      pam_deny.so
session     required      pam_permit.so
```

<details>
<summary>
  <strong>Detailed Line-by-Line Explanation of Modules and Flags</strong>  
  _(Click to expand for more details)_
</summary>

Each PAM rule consists of four parts:

```bash
<module-type> <control-flag> <module-name> [options]
```

Let’s break down the key control flags used in this example:

#### ✅ `required`

* **Meaning:** This module *must* succeed for the overall result to be successful.
* **Behavior:** Even if it fails, PAM continues processing other modules in that category. However, **if any `required` module fails, authentication will ultimately fail**.
* **Use case:** Essential authentication steps that cannot be skipped.

> Example:
> `auth required pam_opendirectory.so`
> → macOS will require a valid local or network password unless a preceding `sufficient` module succeeds.

#### ✅ `sufficient`

* **Meaning:** If this module succeeds, PAM considers this category complete and skips any remaining modules in that stack—**as long as no earlier `required` modules have already failed**.
* **Behavior:**

  * If it **succeeds** → no need to evaluate further modules.
  * If it **fails** → continue to the next module.
* **Use case:** Optional or preferred authentication methods, like smartcard or biometrics.

> Example:
> `auth sufficient pam_smartcard.so`
> → If the smartcard is present and valid, the user can authenticate without a password.

Great question! Here's a continuation of the PAM control flag explanations, now including `optional` (and a bonus explanation of `requisite`, which you may also encounter):

#### ⚙️ `optional`

* **Meaning:** The success or failure of this module **does not affect** the overall result of the stack.
* **Behavior:**

  * Whether it succeeds or fails, PAM moves on and ignores its outcome for access control.
  * Useful for modules that provide *supplementary functionality*, like logging, environment setup, or informational messages.
* **Use case:** Enhancing the user session, not enforcing security.

> Example:
> `session optional pam_krb5.so`
> → May try to obtain a Kerberos ticket for the session, but failure doesn’t prevent login.

#### 🚫 `requisite`

* **Meaning:** Like `required`, but with a critical difference:

  * If this module **fails**, **authentication immediately stops and fails**, without checking any further modules in that stack.
* **Behavior:**

  * Immediate failure on a single failed check.
  * Useful for hard-stopping access early (e.g., failed biometric or PIN check).
* **Use case:** Security-critical checks that shouldn't continue if failed.

> Example:
> `auth requisite pam_touchid.so`
> → If Touch ID fails or is unavailable, no fallback is allowed — access is denied right away.

#### Flag Summary

| Flag         | Must Succeed? | Stops on Success?               | Fails Immediately? | Notes                                          |
| ------------ | ------------- | ------------------------------- | ------------------ | ---------------------------------------------- |
| `required`   | ✅ Yes         | ❌ No                            | ❌ No               | All `required` must pass                       |
| `sufficient` | ❌ No          | ✅ Yes (if no previous failures) | ❌ No               | Short-circuits if succeeds                     |
| `optional`   | ❌ No          | ❌ No                            | ❌ No               | Ignored unless it's the only one in a category |
| `requisite`  | ✅ Yes         | ❌ No                            | ✅ Yes              | Immediate failure on error                     |

</details>

---

## **Setting Deployment Levels?**

`.Mobileconfig` or `.Plist` files can be deployed at various levels using MDM or scripts. The deployment level determines whether the settings can be overridden by the user, system, or both.

### Enforced System-Level Deployment
   Plist files deployed via MDM at the system level are stored in `/Library/Managed Preferences/`. These settings apply to all users on the device and enforce system-wide policies. Users cannot remove or override these settings when deployed via MDM.

### Non-Enforced System-Level Deployment
   Plist files deployed via scripts at the system level are stored in `/Library/Preferences/`. These settings apply to all users on the device but can be overridden by users or the system.

### Enforced User-Level Deployment
   Plist files deployed at the user level via MDM apply only to specific users. These settings are enforced for MDM-enabled users and cannot be removed or overridden by the user.

### Non-Enforced User-Level Deployment
   Plist files deployed at the user level are stored in `/Users/<username>/Library/Preferences/`. These settings apply only to the specific user and can be overridden by the user.

#### Notes on Deployment:
- For most `com.apple.*.plist` files, system-level deployment is recommended to ensure consistent enforcement across all users on the device.
- Some application-specific `.plist` files may not be stored in these locations and could be vendor-specific. In such cases, a script is typically required to create and deploy the `.plist` file.
- Files stored outside these locations generally cannot be managed/enforced by MDM.
- Be cautious when deploying plist files that enforce strict policies, as they can cause device or functionality lockouts. Always test configurations thoroughly before deploying them to a fleet.

---

## **SmartCard specific plist files?**

Smartcard policies require several plist files, each serving specific purposes and containing unique keys.

There are various plist files needed for Smartcard Policiies, each one has various keys or purposes.

### SmartcardLogin.plist

**Location:**  
`/private/etc/SmartcardLogin.plist`

This file controls system-wide smart card login policies. It enforces global settings related to smart card authentication and can be used to define certificate trust, exemptions, and advanced configurations. This must be deployed via script.

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
  _(Click to expand for more details)_
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
- Format the fingerprints as comma-delimited string values without spaces for consistency and compatibility.

#### Example:
```xml
<key>TrustedAuthorities</key>
<array>
    <string>AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90</string>
    <string>12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF</string>
</array>
```

</details>

- **NotEnforcedGroup**:  
  A string specifying the group exempt from smart card authentication policies. Members of this group can bypass smart card requirements.

#### Additional Notes:
- Ensure ownership is set to `root` and permissions are set to `world read` after editing this file to maintain system security.
- This file is critical for enforcing system-wide smart card policies and should be configured carefully to balance security and usability.
- The deployment method of the SmartCard may influence how this file behaves during the login process.


### com.apple.security.smartcard.plist

**Locations:**  
- `/Library/Managed Preferences/com.apple.security.smartcard.plist`  
- `/Library/Preferences/com.apple.security.smartcard.plist`

This file enforces smart card policies on the device and applies various rules for managing smart card functionality on macOS.

#### Example Code:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>UserPairing</key>
	<true/>
	<key>allowSmartCard</key>
	<true/>
	<key>checkCertificateTrust</key>
	<integer>0</integer>
	<key>enforceSmartCard</key>
	<false/>
	<key>oneCardPerUser</key>
	<false/>
	<key>tokenRemovalAction</key>
	<integer>1</integer>
</dict>
</plist>
```

#### Key and Value Details:

- **UserPairing**:  
  A boolean value (`true` or `false`) that specifies whether smart card pairing with user accounts is enabled.

- **allowSmartCard**:  
  A boolean value (`true` or `false`) that specifies whether smart card usage is allowed.

- **checkCertificateTrust**:  
  An integer value that determines the level of certificate trust validation:  
  - `0`: Turns off certificate trust check.
  - `1`: Turns on certificate trust check. A standard validity check is performed but doesn’t include additional revocation checks.
  - `2`: Turns on certificate trust check. A soft revocation check is also performed. Until the certificate is explicitly rejected by CRL/OCSP, it’s considered valid. This setting means that unavailable or unreachable CRL/OCSP allow this check to succeed.
  - `3`: Turns on certificate trust check. A hard revocation check is also performed. Unless CRL/OCSP explicitly says “This certificate is OK,” it’s considered invalid. This option is the most secure.

>**Note:** Ensure the `TrustedAuthorities` key in the `SmartCardLogin.plist` is properly configured before deployment.

- **enforceSmartCard**:  
  A boolean value (`true` or `false`) that enforces smart card usage for login and authentication.

- **oneCardPerUser**:  
  A boolean value (`true` or `false`) that specifies whether only one smart card can be paired per user.

- **tokenRemovalAction**:  
  An integer value that specifies the action to take when a smart card is removed:  
  - `0`: No action.  
  - `1`: Lock the screen.  

### com.apple.security.tokenlogin.plist

**Location:**  
`/Users/<username>/Library/Preferences/com.apple.security.tokenlogin.plist`

This preference file, located in the user's library, manages the association between smart cards and the macOS keychain. It is automatically generated by the operating system and contains mappings that facilitate secure authentication.

#### Example Code:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>DUMMY_KEY_1234567890ABCDEF</key>
    <data>
    DUMMY_DATA_PLACEHOLDER
    </data>
</dict>
</plist>
```

**Note:**  
This file may occasionally become corrupted or out of sync due to system issues. If this happens, the file can be safely deleted, as it will be regenerated by macOS when needed.

---

## **SmartCard specific PAM files?**

Smart card authentication on macOS requires configuring multiple PAM (Pluggable Authentication Module) files. These files govern how users authenticate for various actions—such as logging in, using `sudo`, or switching users with `su`.

Each file must be carefully adjusted to support smart card-based authentication while preserving fallback options and system integrity. These must be deployed via script.

### /etc/pam.d/sudo

Defines authentication rules for the `sudo` command, which grants elevated privileges:

```bash
# sudo: auth account password session
auth        sufficient    pam_smartcard.so
auth        required      pam_opendirectory.so
auth        required      pam_deny.so
account     required      pam_permit.so
password    required      pam_deny.so
session     required      pam_permit.so
```

**Module Notes:**

- `pam_smartcard.so`: Enables authentication using a smart card. If a valid smart card is present, authentication succeeds at this step.
- `pam_opendirectory.so`: Authenticates users against macOS Open Directory (local or network accounts).
- `pam_deny.so`: Explicitly denies authentication if reached (i.e., if previous modules failed).
- `pam_permit.so`: Always permits access for account or session management; used to allow the process to continue.
- `pam_deny.so` (password): Disables password authentication for `sudo`, enforcing smart card or directory-based authentication only.
- `pam_permit.so` (session): Always permits session setup if authentication succeeded.

<details>
<summary>
  <strong>Detailed Line-by-Line Explanation of Modules and Flags</strong>  
  _(Click to expand for more details)_
</summary>

Each PAM rule consists of four parts:

```bash
<module-type> <control-flag> <module-name> [options]
```

Let’s break down the key control flags used in this example:

#### ✅ `required`

* **Meaning:** This module *must* succeed for the overall result to be successful.
* **Behavior:** Even if it fails, PAM continues processing other modules in that category. However, **if any `required` module fails, authentication will ultimately fail**.
* **Use case:** Essential authentication steps that cannot be skipped.

> Example:
> `auth required pam_opendirectory.so`
> → macOS will require a valid local or network password unless a preceding `sufficient` module succeeds.

#### ✅ `sufficient`

* **Meaning:** If this module succeeds, PAM considers this category complete and skips any remaining modules in that stack—**as long as no earlier `required` modules have already failed**.
* **Behavior:**

  * If it **succeeds** → no need to evaluate further modules.
  * If it **fails** → continue to the next module.
* **Use case:** Optional or preferred authentication methods, like smartcard or biometrics.

> Example:
> `auth sufficient pam_smartcard.so`
> → If the smartcard is present and valid, the user can authenticate without a password.

Great question! Here's a continuation of the PAM control flag explanations, now including `optional` (and a bonus explanation of `requisite`, which you may also encounter):

#### ⚙️ `optional`

* **Meaning:** The success or failure of this module **does not affect** the overall result of the stack.
* **Behavior:**

  * Whether it succeeds or fails, PAM moves on and ignores its outcome for access control.
  * Useful for modules that provide *supplementary functionality*, like logging, environment setup, or informational messages.
* **Use case:** Enhancing the user session, not enforcing security.

> Example:
> `session optional pam_krb5.so`
> → May try to obtain a Kerberos ticket for the session, but failure doesn’t prevent login.

#### 🚫 `requisite`

* **Meaning:** Like `required`, but with a critical difference:

  * If this module **fails**, **authentication immediately stops and fails**, without checking any further modules in that stack.
* **Behavior:**

  * Immediate failure on a single failed check.
  * Useful for hard-stopping access early (e.g., failed biometric or PIN check).
* **Use case:** Security-critical checks that shouldn't continue if failed.

> Example:
> `auth requisite pam_touchid.so`
> → If Touch ID fails or is unavailable, no fallback is allowed — access is denied right away.

#### Flag Summary

| Flag         | Must Succeed? | Stops on Success?               | Fails Immediately? | Notes                                          |
| ------------ | ------------- | ------------------------------- | ------------------ | ---------------------------------------------- |
| `required`   | ✅ Yes         | ❌ No                            | ❌ No               | All `required` must pass                       |
| `sufficient` | ❌ No          | ✅ Yes (if no previous failures) | ❌ No               | Short-circuits if succeeds                     |
| `optional`   | ❌ No          | ❌ No                            | ❌ No               | Ignored unless it's the only one in a category |
| `requisite`  | ✅ Yes         | ❌ No                            | ✅ Yes              | Immediate failure on error                     |

</details>

**Notes:**

* Set restrictive file permissions (e.g., `chmod 444` or `chmod 644`) and ensure ownership is `root:wheel`.
* Always back up the file before making changes.
* Test in a non-critical environment to prevent user lockouts.
* macOS updates may overwrite changes—verify after upgrades.
* Third-party tools may introduce additional PAM modules or modify behavior.

### /etc/pam.d/login

Handles local login authentication, both console and graphical (loginwindow):

```bash
# login: auth account password session
auth        sufficient    pam_smartcard.so
auth        optional      pam_krb5.so use_kcminit
auth        optional      pam_ntlm.so try_first_pass
auth        optional      pam_mount.so try_first_pass
auth        required      pam_opendirectory.so try_first_pass
auth        required      pam_deny.so
account     required      pam_nologin.so
account     required      pam_opendirectory.so
password    required      pam_opendirectory.so
session     required      pam_launchd.so
session     required      pam_uwtmp.so
session     optional      pam_mount.so
```

**Module Notes:**

- `pam_krb5.so`: Supports Kerberos authentication.
- `pam_ntlm.so`: Supports NTLM authentication (legacy).
- `pam_mount.so`: Mounts user-specific volumes at login.
- `pam_nologin.so`: Blocks login if `/etc/nologin` exists.
- `pam_launchd.so`: Starts the user session.
- `pam_uwtmp.so`: Updates user login logs.

<details>
<summary>
  <strong>Detailed Line-by-Line Explanation of Modules and Flags</strong>  
  _(Click to expand for more details)_
</summary>

Each PAM rule consists of four parts:

```bash
<module-type> <control-flag> <module-name> [options]
```

Let’s break down the key control flags used in this example:

#### ✅ `required`

* **Meaning:** This module *must* succeed for the overall result to be successful.
* **Behavior:** Even if it fails, PAM continues processing other modules in that category. However, **if any `required` module fails, authentication will ultimately fail**.
* **Use case:** Essential authentication steps that cannot be skipped.

> Example:
> `auth required pam_opendirectory.so`
> → macOS will require a valid local or network password unless a preceding `sufficient` module succeeds.

#### ✅ `sufficient`

* **Meaning:** If this module succeeds, PAM considers this category complete and skips any remaining modules in that stack—**as long as no earlier `required` modules have already failed**.
* **Behavior:**

  * If it **succeeds** → no need to evaluate further modules.
  * If it **fails** → continue to the next module.
* **Use case:** Optional or preferred authentication methods, like smartcard or biometrics.

> Example:
> `auth sufficient pam_smartcard.so`
> → If the smartcard is present and valid, the user can authenticate without a password.

Great question! Here's a continuation of the PAM control flag explanations, now including `optional` (and a bonus explanation of `requisite`, which you may also encounter):

#### ⚙️ `optional`

* **Meaning:** The success or failure of this module **does not affect** the overall result of the stack.
* **Behavior:**

  * Whether it succeeds or fails, PAM moves on and ignores its outcome for access control.
  * Useful for modules that provide *supplementary functionality*, like logging, environment setup, or informational messages.
* **Use case:** Enhancing the user session, not enforcing security.

> Example:
> `session optional pam_krb5.so`
> → May try to obtain a Kerberos ticket for the session, but failure doesn’t prevent login.

#### 🚫 `requisite`

* **Meaning:** Like `required`, but with a critical difference:

  * If this module **fails**, **authentication immediately stops and fails**, without checking any further modules in that stack.
* **Behavior:**

  * Immediate failure on a single failed check.
  * Useful for hard-stopping access early (e.g., failed biometric or PIN check).
* **Use case:** Security-critical checks that shouldn't continue if failed.

> Example:
> `auth requisite pam_touchid.so`
> → If Touch ID fails or is unavailable, no fallback is allowed — access is denied right away.

#### Flag Summary

| Flag         | Must Succeed? | Stops on Success?               | Fails Immediately? | Notes                                          |
| ------------ | ------------- | ------------------------------- | ------------------ | ---------------------------------------------- |
| `required`   | ✅ Yes         | ❌ No                            | ❌ No               | All `required` must pass                       |
| `sufficient` | ❌ No          | ✅ Yes (if no previous failures) | ❌ No               | Short-circuits if succeeds                     |
| `optional`   | ❌ No          | ❌ No                            | ❌ No               | Ignored unless it's the only one in a category |
| `requisite`  | ✅ Yes         | ❌ No                            | ✅ Yes              | Immediate failure on error                     |

</details>

**Notes:**

* Set restrictive file permissions (e.g., `chmod 444` or `chmod 644`) and ensure ownership is `root:wheel`.
* Always back up the file before making changes.
* Test in a non-critical environment to prevent user lockouts.
* macOS updates may overwrite changes—verify after upgrades.
* Third-party tools may introduce additional PAM modules or modify behavior.

### /etc/pam.d/su

Defines policies for using the `su` command to switch users:

```bash
# su: auth account password session
auth        sufficient    pam_smartcard.so
auth        required      pam_rootok.so
auth        required      pam_group.so no_warn group=admin,wheel ruser root_only fail_safe
account     required      pam_permit.so
account     required      pam_opendirectory.so no_check_shell
password    required      pam_opendirectory.so
session     required      pam_launchd.so
```

**Module Notes:**

- `pam_rootok.so`: Allows root to use `su` without a password.
- `pam_group.so`: Restricts `su` to specified groups (e.g., `admin`, `wheel`).
- `pam_opendirectory.so`: Performs authentication and shell validation.

<details>
<summary>
  <strong>Detailed Line-by-Line Explanation of Modules and Flags</strong>  
  _(Click to expand for more details)_
</summary>

Each PAM rule consists of four parts:

```bash
<module-type> <control-flag> <module-name> [options]
```

Let’s break down the key control flags used in this example:

#### ✅ `required`

* **Meaning:** This module *must* succeed for the overall result to be successful.
* **Behavior:** Even if it fails, PAM continues processing other modules in that category. However, **if any `required` module fails, authentication will ultimately fail**.
* **Use case:** Essential authentication steps that cannot be skipped.

> Example:
> `auth required pam_opendirectory.so`
> → macOS will require a valid local or network password unless a preceding `sufficient` module succeeds.

#### ✅ `sufficient`

* **Meaning:** If this module succeeds, PAM considers this category complete and skips any remaining modules in that stack—**as long as no earlier `required` modules have already failed**.
* **Behavior:**

  * If it **succeeds** → no need to evaluate further modules.
  * If it **fails** → continue to the next module.
* **Use case:** Optional or preferred authentication methods, like smartcard or biometrics.

> Example:
> `auth sufficient pam_smartcard.so`
> → If the smartcard is present and valid, the user can authenticate without a password.

Great question! Here's a continuation of the PAM control flag explanations, now including `optional` (and a bonus explanation of `requisite`, which you may also encounter):

#### ⚙️ `optional`

* **Meaning:** The success or failure of this module **does not affect** the overall result of the stack.
* **Behavior:**

  * Whether it succeeds or fails, PAM moves on and ignores its outcome for access control.
  * Useful for modules that provide *supplementary functionality*, like logging, environment setup, or informational messages.
* **Use case:** Enhancing the user session, not enforcing security.

> Example:
> `session optional pam_krb5.so`
> → May try to obtain a Kerberos ticket for the session, but failure doesn’t prevent login.

#### 🚫 `requisite`

* **Meaning:** Like `required`, but with a critical difference:

  * If this module **fails**, **authentication immediately stops and fails**, without checking any further modules in that stack.
* **Behavior:**

  * Immediate failure on a single failed check.
  * Useful for hard-stopping access early (e.g., failed biometric or PIN check).
* **Use case:** Security-critical checks that shouldn't continue if failed.

> Example:
> `auth requisite pam_touchid.so`
> → If Touch ID fails or is unavailable, no fallback is allowed — access is denied right away.

#### Flag Summary

| Flag         | Must Succeed? | Stops on Success?               | Fails Immediately? | Notes                                          |
| ------------ | ------------- | ------------------------------- | ------------------ | ---------------------------------------------- |
| `required`   | ✅ Yes         | ❌ No                            | ❌ No               | All `required` must pass                       |
| `sufficient` | ❌ No          | ✅ Yes (if no previous failures) | ❌ No               | Short-circuits if succeeds                     |
| `optional`   | ❌ No          | ❌ No                            | ❌ No               | Ignored unless it's the only one in a category |
| `requisite`  | ✅ Yes         | ❌ No                            | ✅ Yes              | Immediate failure on error                     |

</details>

**Notes:**

* Set restrictive file permissions (e.g., `chmod 444` or `chmod 644`) and ensure ownership is `root:wheel`.
* Always back up the file before making changes.
* Test in a non-critical environment to prevent user lockouts.
* macOS updates may overwrite changes—verify after upgrades.
* Third-party tools may introduce additional PAM modules or modify behavior.

<small>
:::note[Feedback?]
_If you found an error, noticed something missing, or need additional help, please [submit feedback on GitHub](https://github.com/cocopuff2u/CAC_FOR_MAC/issues) or start a [GitHub discussion](https://github.com/cocopuff2u/CAC_FOR_MAC/discussions)._

_If you'd like to contribute improvements to this guide, feel free to submit a [pull request](https://github.com/cocopuff2u/CAC_FOR_MAC/pulls) or select `edit this page` below._
:::
</small>