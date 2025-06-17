---
sidebar_position: 4
title: DoD | Admin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# DoD CAC Setup – Admin Guide

This guide provides step-by-step instructions for system administrators on enforcing Common Access Card (CAC) authentication on MDM-managed devices for DoD employees. Due to current Apple platform limitations, full CAC enforcement (including keychain access and system updates) is not yet possible. However, with the right configuration, you can achieve up to 90% CAC enforcement for most workflows.

**Important Recommendations:**
- **Deploy DoD Certificates First:** Before enforcing any smart card policies, ensure that DoD certificates are deployed to the device. Follow the [DoD Certificates Admin Guide](../certificate/DoD-Certificates-Admins) for details.
- **Establish a Smart Card Pairing Workflow:** Before enabling enforcement, set up a workflow for users to pair their smart card with their account. If enforcement is enabled without pairing, users will be locked out of their devices.

:::info[Recommended]
For maximum security and scalability, devices should be managed with a Mobile Device Management (MDM) system. The best practice for deploying DoD CAC enforcement is to use MDM to push a configuration profile (`.mobileconfig` file) with the required settings to your entire fleet.

If your organization does **not** use MDM, enforcing CAC is not recommended. In this case, refer to the DoD User Guide for alternative approaches.
:::

## **CAC Enforcement Workflow**

1. **Deploy DoD Certificates to Device:** Use MDM to push required DoD certificates.
2. **Guide Users Through Forced Pairing:** Require users to pair their smart card with their account before proceeding. This can be enforced via MDM or onboarding scripts.
3. **Verify Pairing Success:** Confirm that the smart card is correctly paired to the user account.
4. **(Optional) Exempt Admin Account or Unenforce for Troubleshooting:** Consider maintaining an exempt admin account or a workflow to temporarily disable enforcement for troubleshooting purposes.
5. **Enforce Smart Card Policies:** Once pairing is verified, enable CAC enforcement via MDM.
6. **Update PAM Configuration:** After smart card enforcement is enabled, update your PAM (Pluggable Authentication Modules) configuration files to support CAC authentication for additional system functions as needed.

## **Enforcing CAC**

### Step 1. Prior Requirements

- **Deploy DoD Certificates:** Deploy DoD Certificates to all devices by following the official guide: [DoD Certificates Installation Guide](../certificate/DoD-Certificates-Admins).
- **Establish CAC Pairing Workflow:** We recommend using the **Pair PIV ID** workflow. This method can be easily pushed to users, requires minimal user interaction, supports CAC swapping, and allows a user to pair multiple CACs. For more details, see the [DoD | User Guide](../smartcard/DoD-SmartCard-Users).
- **Verify CAC Pairing:** Ensure that CAC pairing is present for each user before enabling enforcement. You can use a script to check for pairing status, such as the example below:

```bash
#!/bin/zsh
# Check to see if SmartCard is user paired, and if the SmartcardLogin.plist exists
# and contains the required formatString for Kerberos

# Check for logged in user.
currentUser=$(scutil <<< "show State:/Users/ConsoleUser" | awk -F': ' '/[[:space:]]+Name[[:space:]]:/ { if ( $2 != "loginwindow" ) { print $2 }}')


# Check if the file /etc/SmartcardLogin.plist exists and contains the Kerberos formatString
if [[ -f /etc/SmartcardLogin.plist ]]; then
    formatString=$(plutil -extract "AttributeMapping.dsAttributeString" raw /etc/SmartcardLogin.plist 2>/dev/null)
    if [[ "$formatString" == "dsAttrTypeStandard:AltSecurityIdentities" ]]; then
        result="Paired"
    else
        result="NotPaired"
    fi
else
    # Check for pairing based on tokenidentity
    tokenCheck=$(dscl /Local/Default read /Users/"$currentUser" AuthenticationAuthority 2>/dev/null | grep -c tokenidentity)
    if [[ "$tokenCheck" -gt 0 ]]; then
        result="Paired"
    else
        result="NotPaired"
    fi
fi

# Output the result
echo "<result>$result</result>"

exit 0
```

### Step 2. Create a Smart Card Enforcement Profile

To enforce CAC authentication, configure the `com.apple.security.smartcard` policy on managed devices. This is typically accomplished by deploying either a configuration profile (`.mobileconfig`) or a property list (`.plist`) through your MDM solution. Below are example configurations with detailed explanations for each value—adjust these settings as needed for your environment.

See [Apple SmartCard Payload Documentation](https://developer.apple.com/documentation/devicemanagement/smartcard) and [Advanced Smart Card Options](https://support.apple.com/guide/deployment/advanced-smart-card-options-dep7b2ede1e3/web) for more details on each key.

<Tabs>
  <TabItem value="mobileconfig" label="Example .mobileconfig" default>

```xml
<!-- Example: Smart Card Enforcement.mobileconfig -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <!-- PayloadDescription: Optional description for this payload -->
      <key>PayloadDescription</key>
      <string></string>
      <!-- PayloadDisplayName: Name shown in Profiles UI -->
      <key>PayloadDisplayName</key>
      <string>SmartCard</string>
      <!-- PayloadEnabled: Whether this payload is enabled -->
      <key>PayloadEnabled</key>
      <true/>
      <!-- PayloadIdentifier: Unique identifier for this payload -->
      <key>PayloadIdentifier</key>
      <string>com.cac-for-mac.smartcard.enforcement</string>
      <!-- PayloadType: Must be com.apple.security.smartcard for smart card enforcement -->
      <key>PayloadType</key>
      <string>com.apple.security.smartcard</string>
      <!-- PayloadUUID: Unique UUID for this payload -->
      <key>PayloadUUID</key>
      <string>6A2F1B3C-9D4E-4A1B-8C2F-1234567890AB</string>
      <!-- PayloadVersion: Version number for this payload -->
      <key>PayloadVersion</key>
      <integer>1</integer>
      <!-- 
        UserPairing (boolean): 
        If false, users don’t get the pairing dialog, although existing pairings still work.
        Default: true
      -->
      <key>UserPairing</key>
      <false/>
      <!-- 
        allowSmartCard (boolean): 
        If false, disables the SmartCard for logins, authorizations, and screen saver unlocking. 
        Still allowed for other functions, such as signing emails and accessing the web. 
        Restart required for changes. 
        Default: true
      -->
      <key>allowSmartCard</key>
      <true/>
      <!-- 
        checkCertificateTrust (integer): 
        Configures the certificate trust check.
        0: Off
        1: Standard validity check (no revocation)
        2: Soft revocation check (default: valid unless explicitly revoked)
        3: Hard revocation check (default: invalid unless explicitly OK)
        Default: 0
      -->
      <key>checkCertificateTrust</key>
      <integer>2</integer>
      <!-- 
        oneCardPerUser (boolean): 
        If true, a user can pair with only one SmartCard, although existing pairings are allowed if already set up.
        Default: false
      -->
      <key>oneCardPerUser</key>
      <false/>
      <!-- 
        enforceSmartCard (boolean): 
        If true, a user can only log in or authenticate with a SmartCard.
        Available in macOS 10.13.2 and later.
        Default: false
      -->
      <key>enforceSmartCard</key>
      <true/>
      <!-- 
        allowUnmappedUsers (integer): 
        1 = allow users not mapped to a smart card, 0 = disallow
      -->
      <key>allowUnmappedUsers</key>
      <integer>1</integer>
      <!-- 
        tokenRemovalAction (integer): 
        If 1, the system enables the screen saver when the SmartCard is removed.
        Available in macOS 10.13.4 and later.
        Default: 0
        Possible Values: 0, 1
      -->
      <!-- <key>tokenRemovalAction</key>
      <integer>1</integer> -->
    </dict>
  </array>
  <!-- PayloadDescription: Description for the overall profile -->
  <key>PayloadDescription</key>
  <string>Settings for Smartcard Enforcement</string>
  <!-- PayloadDisplayName: Name for the overall profile -->
  <key>PayloadDisplayName</key>
  <string>Smartcard Enforcement</string>
  <!-- PayloadEnabled: Whether the profile is enabled -->
  <key>PayloadEnabled</key>
  <true/>
  <!-- PayloadIdentifier: Unique identifier for the profile -->
  <key>PayloadIdentifier</key>
  <string>com.cac-for-mac.smartcard.profile.1B2C3D4E-5F6A-7B8C-9D0E-ABCDEF123456</string>
  <!-- PayloadOrganization: Organization name -->
  <key>PayloadOrganization</key>
  <string>Your Organization</string>
  <!-- PayloadRemovalDisallowed: If true, prevents removal of the profile -->
  <key>PayloadRemovalDisallowed</key>
  <true/>
  <!-- PayloadScope: System = applies to all users -->
  <key>PayloadScope</key>
  <string>System</string>
  <!-- PayloadType: Configuration profile type -->
  <key>PayloadType</key>
  <string>Configuration</string>
  <!-- PayloadUUID: Unique UUID for the profile -->
  <key>PayloadUUID</key>
  <string>1B2C3D4E-5F6A-7B8C-9D0E-ABCDEF123456</string>
  <!-- PayloadVersion: Version number for the profile -->
  <key>PayloadVersion</key>
  <integer>1</integer>
</dict>
</plist>
```
  </TabItem>
  <TabItem value="plist" label="Example .plist">

```xml
<!-- Example: /Library/Preferences/com.apple.security.smartcard.plist -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <!-- 
    UserPairing (boolean): 
    If false, users don’t get the pairing dialog, although existing pairings still work.
    Default: true
  -->
  <key>UserPairing</key>
  <false/>
  <!-- 
    allowSmartCard (boolean): 
    If false, disables the SmartCard for logins, authorizations, and screen saver unlocking. 
    Still allowed for other functions, such as signing emails and accessing the web. 
    Restart required for changes. 
    Default: true
  -->
  <key>allowSmartCard</key>
  <true/>
  <!-- 
    checkCertificateTrust (integer): 
    Configures the certificate trust check.
    0: Off
    1: Standard validity check (no revocation)
    2: Soft revocation check (default: valid unless explicitly revoked)
    3: Hard revocation check (default: invalid unless explicitly OK)
    Default: 0
  -->
  <key>checkCertificateTrust</key>
  <integer>2</integer>
  <!-- 
    oneCardPerUser (boolean): 
    If true, a user can pair with only one SmartCard, although existing pairings are allowed if already set up.
    Default: false
  -->
  <key>oneCardPerUser</key>
  <false/>
  <!-- 
    enforceSmartCard (boolean): 
    If true, a user can only log in or authenticate with a SmartCard.
    Available in macOS 10.13.2 and later.
    Default: false
  -->
  <key>enforceSmartCard</key>
  <true/>
  <!-- 
    allowUnmappedUsers (integer): 
    1 = allow users not mapped to a smart card, 0 = disallow
  -->
  <key>allowUnmappedUsers</key>
  <integer>1</integer>
  <!-- 
    tokenRemovalAction (integer): 
    If 1, the system enables the screen saver when the SmartCard is removed.
    Available in macOS 10.13.4 and later.
    Default: 0
    Possible Values: 0, 1
  -->
  <!-- <key>tokenRemovalAction</key>
  <integer>1</integer> -->
</dict>
</plist>
```
  </TabItem>
</Tabs>

### Step 3. Update PAM Configuration

To enable CAC authentication for system functions such as `sudo`, `login`, and `su`, you must update the relevant PAM (Pluggable Authentication Modules) configuration files. Below are two scripts: one that enables CAC authentication (recommended for CAC-enforced environments), and the default configuration for reference.

:::warning
Modifying PAM configuration files can impact authentication and potentially prevent logins or sudo access if misconfigured. Test these changes thoroughly on a small group of devices before deploying to your entire fleet.
:::

<Tabs>
  <TabItem value="cac-pam" label="CAC-Enabled PAM (Recommended)" default>

```bash
#!/bin/bash
# This script configures PAM to support CAC authentication for sudo, login, and su.

# Write a new sudo PAM file to require CAC (pam_smartcard.so) for sudo access.
cat > /etc/pam.d/sudo << SUDO_END
# sudo: auth account password session
auth        sufficient    pam_smartcard.so      # Allow CAC authentication
auth        required      pam_opendirectory.so  # Fallback to local directory
auth        required      pam_deny.so           # Deny if above fail
account     required      pam_permit.so
password    required      pam_deny.so
session     required      pam_permit.so
SUDO_END

chmod 444 /etc/pam.d/sudo
chown root:wheel /etc/pam.d/sudo

# Write a new login PAM file to support CAC and other authentication methods.
cat > /etc/pam.d/login << LOGIN_END
# login: auth account password session
auth        sufficient    pam_smartcard.so      # Allow CAC authentication
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
LOGIN_END

chmod 644 /etc/pam.d/login
chown root:wheel /etc/pam.d/login

# Write a new su PAM file to require CAC for su access.
cat > /etc/pam.d/su << SU_END
# su: auth account password session
auth        sufficient    pam_smartcard.so      # Allow CAC authentication
auth        required      pam_rootok.so
auth        required      pam_group.so no_warn group=admin,wheel ruser root_only fail_safe
account     required      pam_permit.so
account     required      pam_opendirectory.so no_check_shell
password    required      pam_opendirectory.so
session     required      pam_launchd.so
SU_END

chmod 644 /etc/pam.d/su
chown root:wheel /etc/pam.d/su
```
  </TabItem>
  <TabItem value="default-pam" label="Default PAM (macOS)">

```bash
#!/bin/bash
# This script restores the default macOS PAM configuration for sudo, login, and su.

# Default sudo PAM file (no CAC)
cat > /etc/pam.d/sudo << SUDO_END
# sudo: auth account password session
auth       sufficient     pam_smartcard.so
auth       required       pam_opendirectory.so
account    required       pam_permit.so
password   required       pam_deny.so
session    required       pam_permit.so
SUDO_END

chmod 444 /etc/pam.d/sudo
chown root:wheel /etc/pam.d/sudo

# Default login PAM file
cat > /etc/pam.d/login << LOGIN_END
# login: auth account password session
auth       optional       pam_krb5.so use_kcminit
auth       optional       pam_ntlm.so try_first_pass
auth       optional       pam_mount.so try_first_pass
auth       required       pam_opendirectory.so try_first_pass
account    required       pam_nologin.so
account    required       pam_opendirectory.so
password   required       pam_opendirectory.so
session    required       pam_launchd.so
session    required       pam_uwtmp.so
session    optional       pam_mount.so
LOGIN_END

chmod 644 /etc/pam.d/login
chown root:wheel /etc/pam.d/login

# Default su PAM file
cat > /etc/pam.d/su << SU_END
# su: auth account session
auth       sufficient     pam_rootok.so
auth       required       pam_opendirectory.so
account    required       pam_group.so no_warn group=admin,wheel ruser root_only fail_safe
account    required       pam_opendirectory.so no_check_shell
password   required       pam_opendirectory.so
session    required       pam_launchd.so
SU_END

chmod 644 /etc/pam.d/su
chown root:wheel /etc/pam.d/su
```
  </TabItem>
</Tabs>

**What does this script do?**

- **sudo**: Adds `pam_smartcard.so` as sufficient, allowing CAC authentication for sudo. If CAC is not present, falls back to local directory authentication.
- **login**: Adds `pam_smartcard.so` as sufficient, enabling CAC authentication at login. Other modules (Kerberos, NTLM, etc.) remain optional or required as fallback.
- **su**: Adds `pam_smartcard.so` as sufficient, allowing CAC authentication for switching users (su). Other checks (root, group, etc.) remain enforced.
- **Permissions**: Sets correct permissions and ownership for each PAM file to ensure system security.

### Step 4. Upload Smart Card Configuration Files

To deploy CAC enforcement, upload the `.mobileconfig`, `.plist`, and any related scripts to your MDM solution. It is also recommended to upload uninstall scripts and ensure exempt accounts are set up.

Below are guides for uploading configuration profiles and scripts with popular MDMs:

- [Jamf Pro: Uploading and Deploying Configuration Profiles](https://learn.jamf.com/en-US/bundle/jamf-pro-documentation-current/page/Computer_Configuration_Profiles.html#ariaid-title5)
- [Jamf Pro: Deploying Scripts](https://learn.jamf.com/en-US/bundle/jamf-pro-documentation-current/page/Scripts.html)
- [Kandji: Uploading Custom Profiles](https://support.kandji.io/kb/custom-profiles-overview)
- [Kandji: Custom Scripts](https://support.kandji.io/kb/custom-scripts-overview)
- [Intune: Add or Create Configuration Profiles](https://learn.microsoft.com/en-us/intune/intune-service/configuration/custom-settings-macos)
- [Intune: Deploy Scripts](https://learn.microsoft.com/en-us/intune/intune-service/apps/macos-shell-scripts)


### Step 5. Enforce Smart Card Policies

:::warning
Before enforcing smart card policies, ensure every user has a CAC paired with their account **or** that you have an [exempt admin account available](#how-to-exempt-a-user-from-cac-enforcement). Failing to do so may result in being locked out of the device.
:::

- Assign the smart card enforcement profile (`.mobileconfig` or `.plist`) to the appropriate device groups or users in your MDM.
- Deploy the profile to all targeted devices.


Thoroughly test this configuration on a small set of devices before expanding deployment to your entire fleet. Confirm that CAC enforcement is working as intended and that users can access their accounts without issue.

Once you have validated successful CAC enforcement and user access, you can safely deploy the PAM configuration script (see Step 3) to enable CAC authentication for additional system functions such as `sudo`, `login`, and `su`.


### Step 6. Verify Functionality

After deploying the smart card enforcement profile and updating PAM configuration, thoroughly verify that CAC authentication is functioning as intended across all targeted system functions.

- Test login, sudo, and su operations with a CAC on several devices.
- Confirm that users without a paired CAC or those not in the exempt group are unable to authenticate.
- Ensure that exempt admin/service accounts can still access the system as intended.
- Check for any unexpected lockouts or authentication issues and resolve them before proceeding with a wider deployment.

If any issues are detected, use your exempt account to regain access and adjust your configuration or policies as needed.

:::important 
If you are required to comply with DISA STIGs or other local security policies, you may need to further adjust certain settings or smart card enforcement options to meet those requirements. Review your organization's compliance documentation and test accordingly.
:::

### Step 7. Test, Test, Test

Smart card enforcement—especially when combined with compliance requirements—demands extensive testing. Some authentication functions or workflows may not work as expected depending on your complete setup, including:

- The method used for CAC pairing
- The deployment and trust of DoD certificates
- The specific compliance benchmarks or security policies (e.g., DISA STIGs) you must meet

Test all critical user and admin workflows, including login, sudo, su, and any other authentication-dependent processes. Validate that your configuration meets both operational and compliance requirements before deploying at scale.

## **How to Exempt a User from CAC Enforcement**

If you used the CAC PIV ID pairing workflow, the dedicated group called `EXEMPT_GROUP` should already exist on your system. If it does not exist (for example, if you did not use the pairing workflow), you will need to create `/private/etc/SmartcardLogin.plist` and configure it according to [Apple's documentation](https://support.apple.com/guide/deployment/configure-a-mac-smart-cardonly-authentication-depfce8de48b/web).

:::important
_Exempting users from CAC enforcement should be reserved for admin or service accounts only, to provide a backup option in case of lockout or for troubleshooting. For regular local users, it is more secure to remove the enforcement policy via MDM rather than adding them to the exempt group. This approach maintains a strong security posture and minimizes unnecessary exceptions._

**Security Note:**  
_Admin or service accounts in the exempt group should have additional protections, such as a disabled ("dead") password, a password that is rotated frequently, or other controls to ensure the account cannot be easily used for regular logins. You may also consider setting these accounts as standard (non-admin) users unless elevated privileges are absolutely required. These measures reduce the risk of these accounts being exploited as a bypass._
:::

To exempt a user from CAC enforcement, add them to the `EXEMPT_GROUP`. The script below checks for the existence of the group, creates it if necessary, and adds the specified user.

```bash
#!/bin/bash
# Exempt a user from CAC enforcement by adding them to the EXEMPT_GROUP

EXEMPT_USER="username_here"   # <-- Set this to the username you want to exempt
EXEMPT_GROUP="EXEMPT_GROUP"

# Check if the group exists, create if it does not
if ! dscl . -read /Groups/"$EXEMPT_GROUP" &>/dev/null; then
    sudo dscl . -create /Groups/"$EXEMPT_GROUP"
    sudo dscl . -create /Groups/"$EXEMPT_GROUP" RealName "CAC Exempt Users"
    sudo dscl . -create /Groups/"$EXEMPT_GROUP" passwd "*"
    sudo dscl . -create /Groups/"$EXEMPT_GROUP" gid "600"
fi

# Add the user to the group
sudo dseditgroup -o edit -a "$EXEMPT_USER" -t user "$EXEMPT_GROUP"
```

- Set the `EXEMPT_USER` variable at the top of the script to the username you wish to exempt.
- This script will ensure the group exists and add the user to it.

## **Uninstall PAM Configuration**

To revert the PAM configuration to the macOS defaults (removing CAC enforcement for `sudo`, `login`, and `su`), use the following script:

```bash
#!/bin/bash
# This script restores the default macOS PAM configuration for sudo, login, and su.

# Default sudo PAM file (no CAC)
cat > /etc/pam.d/sudo << SUDO_END
# sudo: auth account password session
auth       sufficient     pam_smartcard.so
auth       required       pam_opendirectory.so
account    required       pam_permit.so
password   required       pam_deny.so
session    required       pam_permit.so
SUDO_END

chmod 444 /etc/pam.d/sudo
chown root:wheel /etc/pam.d/sudo

# Default login PAM file
cat > /etc/pam.d/login << LOGIN_END
# login: auth account password session
auth       optional       pam_krb5.so use_kcminit
auth       optional       pam_ntlm.so try_first_pass
auth       optional       pam_mount.so try_first_pass
auth       required       pam_opendirectory.so try_first_pass
account    required       pam_nologin.so
account    required       pam_opendirectory.so
password   required       pam_opendirectory.so
session    required       pam_launchd.so
session    required       pam_uwtmp.so
session    optional       pam_mount.so
LOGIN_END

chmod 644 /etc/pam.d/login
chown root:wheel /etc/pam.d/login

# Default su PAM file
cat > /etc/pam.d/su << SU_END
# su: auth account session
auth       sufficient     pam_rootok.so
auth       required       pam_opendirectory.so
account    required       pam_group.so no_warn group=admin,wheel ruser root_only fail_safe
account    required       pam_opendirectory.so no_check_shell
password   required       pam_opendirectory.so
session    required       pam_launchd.so
SU_END

chmod 644 /etc/pam.d/su
chown root:wheel /etc/pam.d/su
```

This will restore the default PAM configuration for the main authentication functions.

<small>
:::note[Feedback?]
_If you found an error, noticed something missing, or need additional help, please [submit feedback on GitHub](https://github.com/cocopuff2u/cac-for-mac/issues) or start a [GitHub discussion](https://github.com/cocopuff2u/cac-for-mac/discussions)._

_If you'd like to contribute improvements to this guide, feel free to submit a [pull request](https://github.com/cocopuff2u/cac-for-mac/pulls) or select `edit this page` below._
:::
</small>
