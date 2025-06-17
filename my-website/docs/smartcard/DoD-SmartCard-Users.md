--- 
sidebar_position: 3
title: DoD | User
---

# DoD CAC Setup – User Guide

This guide explains how to pair your DoD CAC with your local user account on a Mac. Pairing lets you use your CAC PIN for logging into your Mac, running `sudo` commands, and other authentication prompts. However, some functions—such as software updates and keychain access—will still require your local account or keychain password.

:::important
- Pairing your CAC only enables PIN-based login and authentication (including `sudo` and some system prompts) to your Mac user account.
- Pairing is **not required** to access DoD websites or applications.
- Accessing DoD websites and applications requires installing the DoD root and intermediate certificates.
- See the [DoD Certificates Guide](/docs/certificate/DoD-Certificates-Users) for details.
- Pairing alone does **not** grant access to DoD sites or apps.
- Administrator rights are required to pair or unpair a CAC.
:::

You can pair your DoD CAC to the local account using one of the following methods:

<h2>[**Pair PIV ID**](#pair-piv-id)<small>_(Preferred Method)_</small></h2>
This method pairs the PIV ID from the CAC to the `AltSecurityIdentities` attribute on the account.

**Benefits:**  
- Works seamlessly with multiple CACs or when switching CACs.  
- No need to re-pair unless transitioning between roles (e.g., contractor to civilian or vice versa), as the PIV ID typically remains unchanged for the same user across CACs.

**Downsides:**  
- May still function if the certificate expires <small>_(unverified)_</small>.  
- If the PIV ID changes (rare, but possible if you receive a new CAC for a new role), it will require an uninstall and reinstall.

<h2>[**Built-In Pairing**](#built-in-pairing)</h2>
This method uses Apple's built-in pairing functionality to link the certificates from the CAC to the local account.

**Benefits:**  
- Automatically prompts for authentication whenever the CAC is present.  
- Pairs with the certificates, so if they expire, the pairing will no longer work <small>_(unverified)_</small>.

**Downsides:**  
- Requires re-pairing if the CAC changes.  
- Supports only one CAC at a time.  
- It is recommended to clear all existing pairings before re-pairing.

Both methods achieve the same goal but differ in their suitability for long-term use or handling multiple CACs.

<small>
:::note
_This guide is designed for macOS Monterey and newer (typically the latest supported macOS versions). Older versions may require additional software or different steps. If you need a guide for an older version, please [submit a request on GitHub Discussions](https://github.com/cocopuff2u/cac-for-mac/discussions)._
:::
</small>

---

## **Pair PIV ID**

This method extracts the PIV ID from the CAC and assigns it to the local user account.

The automated script will:
- Verify that a CAC is present.
- Extract the PIV ID from the CAC and securely delete the extracted data locally.
- Create a mapping using the extracted PIV ID.
- Assign the mapping to the local user account.
- Attach the mapping to FileVault (ARM64 devices only).

### Step 1: Run automated script

Copy and paste the code below into your **Terminal**.  
It will prompt you for your local Mac password to proceed.  
**You must have administrator rights to run this script:**

```bash
sudo bash -c "$(curl -s https://raw.githubusercontent.com/cocopuff2u/MacOS_GOV_Scripts/main/Keychain_And_Certificates_Scripts/SmartCard_Mapping.sh)"
```

:::warning 
Anytime you run any scripts, it is recommended to review the code beforehand to verify it is not doing anything outside the described steps. You can inspect this one <a href="https://raw.githubusercontent.com/cocopuff2u/MacOS_GOV_Scripts/main/Keychain_And_Certificates_Scripts/SmartCard_Mapping.sh" target="_blank" rel="noopener noreferrer">here</a>
:::

**Example of the pairing:**  
<img src="/img/smartcard/smartcard_mapping.webp" alt="Import DoD Certs" width="600"/>

**Tip:** If you experience issues after pairing or unpairing, try rebooting your Mac to ensure changes take effect.

### Step 2: (Optional) Verify PIV ID Pairing

To confirm that the PIV ID has been successfully paired:

1. Remove your CAC from the reader and reinsert it.
2. Open the **Terminal** and enter the following command:

```bash
sudo -i
```

3. You should be prompted to enter your CAC PIN.  
   - If you are not prompted, try rebooting your system and repeating the steps above.
   - If you still are not prompted, check that your CAC is detected (see Troubleshooting below).

**Behavior After Pairing:**
- If the CAC is present during a reboot, the system will prompt you for your CAC PIN instead of your password.  
- Once the CAC is removed, the system will revert to requiring your local user password for authentication.

Once complete, your CAC will be paired with your local account for authentication.

### Uninstall: PIV ID Pairing

If you need to uninstall the PIV ID pairing, follow these steps:

1. **Download the script**  
   Download the same script used for pairing by running the following command in your **Terminal**:

   ```bash
   curl -o ~/Downloads/SmartCard_Mapping.sh https://raw.githubusercontent.com/cocopuff2u/MacOS_GOV_Scripts/main/Keychain_And_Certificates_Scripts/SmartCard_Mapping.sh
   ```

   :::warning 
    Anytime you run any scripts, it is recommended to review the code beforehand to verify it is not doing anything outside the described steps. You can inspect this one <a href="https://raw.githubusercontent.com/cocopuff2u/MacOS_GOV_Scripts/main/Keychain_And_Certificates_Scripts/SmartCard_Mapping.sh" target="_blank" rel="noopener noreferrer">here</a>
    :::

2. **Modify the script**  
   Navigate to your `Downloads` folder and open the downloaded script in a text editor (e.g., `nano` or `vim`). Locate the `UNINSTALL` variable and change its value from `false` to `true`.  
   Example using `nano`:

   ```bash
   cd ~/Downloads
   nano SmartCard_Mapping.sh
   ```

   Inside the script, find the following line:

   ```bash
    # Set to "true" to uninstall (Default is false)
    UNINSTALL=false
   ```

   Change it to:

   ```bash
    # Set to "true" to uninstall (Default is false)
    UNINSTALL=true
   ```

   **How to save and exit in `nano`:**
   - Press `CTRL + O` to save the changes.
   - Press `Enter` to confirm the file name.
   - Press `CTRL + X` to exit the editor.

3. **Run the script**  
   While still in the `Downloads` folder, execute the modified script to uninstall the PIV ID pairing:

   ```bash
   sudo bash SmartCard_Mapping.sh
   ```

4. **Verify uninstallation**  
   After running the script, remove and reinsert your CAC. The system should no longer prompt for your CAC PIN and will revert to using your local user password for authentication.
   - If you are still prompted for your CAC PIN, reboot your Mac and try again.

---

## **Built-In Pairing**

This method uses the Apple built-in pairing functions to tie the CAC to the local account.

### Step 1: Start Pairing

Insert your CAC into the reader.  
You should see a prompt in the upper right corner of your screen—click **Pair** to begin the process.

   **Prompt Image:**
   <img src="/img/smartcard/cac-pair-prompt.webp" alt="Example Pair Prompt" width="300"/>

> **Tip:** If you do not see the prompt, ensure your CAC is fully inserted and detected by the system (see Troubleshooting below).

If the prompt does not appear, you can manually launch the pairing dialog by running the following command in Terminal:

```bash
/usr/sbin/sc_auth pairing_ui -f
```

If the pairing prompt still does not appear after running the command:
- Ensure your CAC is not already paired, either through this method or the PIV ID Pairing method.
- Make sure your CAC is detected by the Mac (e.g., visible in Keychain Access or System Information). If the CAC is not recognized by the system, the pairing prompt will not appear.
- You can also try unpairing any existing pairing by running:

  ```bash
  /usr/sbin/sc_auth unpair
  ```

  :::warning
  Running `sc_auth unpair` will unpair **all** CACs from your account.
  :::

  Then try launching the pairing dialog again.

### Step 2: Complete Pairing

Follow the on-screen instructions:

1. After clicking **Pair** or forcing the prompt open with the command, you will be prompted to select which Certificate for PIV to pair. Keep an eye on the reader name to verify which PIV to pair if you have multiple CACs present.
   <img src="/img/smartcard/cac-select-prompt.webp" alt="Example Select Prompt" width="400"/>

2. Next, you will be asked to enter your Mac username and password.

   <img src="/img/smartcard/login-prompt.webp" alt="Example Login Prompt" width="200"/>

3. You will then be prompted for your CAC PIN.

   <img src="/img/smartcard/cac-pin-prompt.webp" alt="Example Login Prompt" width="200"/>

4. Finally, you will be asked for your keychain password.

   <img src="/img/smartcard/keychain-pair-prompt.webp" alt="Example Login Prompt" width="400"/>

Once complete, your CAC will be paired with your local account for authentication.

### Step 3: (Optional) Verify CAC Pairing

To confirm that the CAC ID has been successfully paired:

1. Remove your CAC from the reader and reinsert it.
2. Open the **Terminal** and enter the following command:

```bash
sudo -i
```

3. You should be prompted to enter your CAC PIN.  
   - If you are not prompted, try rebooting your system and repeating the steps above.
   - If you still are not prompted, check that your CAC is detected (see Troubleshooting below).

**Behavior After Pairing:**
- If the CAC is present during a reboot, the system will prompt you for your CAC PIN instead of your password.  
- Once the CAC is removed, the system will revert to requiring your local user password for authentication.

### Uninstall: Built-In Pairing

If you need to remove the built-in pairing from your account, run the following command in Terminal:

```bash
/usr/sbin/sc_auth unpair
```

:::warning
Running `sc_auth unpair` will unpair **all** CACs from your account.
:::

> **Tip:** After unpairing, reboot your Mac to ensure the changes take effect.

After unpairing, your Mac will revert to using your local user password for authentication.

---

## **Troubleshooting**

If you encounter issues with CAC pairing or authentication, try the following steps:

- **Verify the Mac detects your CAC:**  
  Open **System Information** (Apple menu > About This Mac > More Info > System Report) and check under the **SmartCards** section to confirm your CAC is detected as a connected device.

- **Check for certificates on the CAC:**  
  Open **System Information** (Apple menu > About This Mac > More Info > System Report) and check under the **SmartCards** section and look for your PIV ID.

- **Try a different CAC reader:**  
  Hardware issues with the reader can prevent proper detection. Test with another reader if available.

- **Unpair all CACs and start fresh:**  
  Run both uninstall steps for Pair PIV ID and Built-In Pairing to remove any existing pairings:
  ```bash
  /usr/sbin/sc_auth unpair
  ```

- **Reboot your Mac:**  
  Sometimes a simple restart can resolve detection or pairing issues.

- **Check for macOS updates:**  
  Go to **System Settings > General > Software Update** and install any available updates. Some CAC issues are resolved by updating macOS.

- **Try another CAC:**  
  If possible, test with a different CAC to rule out card-specific problems.

- **Check for security or privacy software:**  
  Some third-party security or privacy tools may interfere with smart card detection. Temporarily disable them if you suspect interference.

If problems persist after these steps, contact your IT support team or have your CAC evaluated for potential issues.

<small>
:::note[Feedback?]
_If you found an error, noticed something missing, or need additional help, please [submit feedback on GitHub](https://github.com/cocopuff2u/cac-for-mac/issues) or start a [GitHub discussion](https://github.com/cocopuff2u/cac-for-mac/discussions)._

_If you'd like to contribute improvements to this guide, feel free to submit a [pull request](https://github.com/cocopuff2u/cac-for-mac/pulls) or select `edit this page` below._
:::
</small>
