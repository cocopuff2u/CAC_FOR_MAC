---
sidebar_position: 4
title: Jamf | Admin
---

# Jamf Certificate Import – Admin Guide

:::danger
<div align="center">

<img src="/img/page_construction.webp" alt="Example CAC Card" width="180" />

# 🚧 Page In Development 🚧

**This page is not yet complete and may be missing information.**

<em>
Want to help? Click <strong>Edit this Page</strong> at the bottom to contribute!
</em>

</div>
:::

This guide explains how to upload certificates into Jamf Pro and configure the necessary settings for deployment to managed Macs.

## 1. Prepare Your Certificate

- Obtain the certificate file (typically `.p12`, `.cer`, or `.pem`).
- If using a `.p12` file, ensure you have the password.

## 2. Upload Certificate to Jamf Pro

1. Log in to your Jamf Pro admin console.
2. Go to **Settings** (gear icon) > **Computer Management** > **Certificates**.
3. Click **New**.
4. Enter a display name for the certificate.
5. Click **Upload Certificate** and select your certificate file.
6. If prompted, enter the certificate password.
7. Click **Save**.

## 3. Create a Configuration Profile

1. In Jamf Pro, go to **Computers** > **Configuration Profiles**.
2. Click **New**.
3. Enter a name and description for the profile.
4. In the left sidebar, select **Certificates**.
5. Click **Configure**.
6. Click **Add** and select the certificate you uploaded.
7. (Optional) Add additional payloads as needed (e.g., Wi-Fi, VPN, SCEP).

## 4. Set Scope and Deployment

1. In the profile, go to the **Scope** tab.
2. Add target devices or groups (e.g., All Managed Clients, specific Smart Groups).
3. Review the profile settings.
4. Click **Save** and **Distribute**.

## 5. Verify Deployment

- On a managed Mac, open **Keychain Access** and confirm the certificate appears in the appropriate keychain (usually System or Login).
- Check that services relying on the certificate (Wi-Fi, VPN, etc.) function as expected.

---

**Tip:** For automated certificate renewal, consider using SCEP or AD CS integration in Jamf.

For more details, see the [Jamf Pro Documentation](https://docs.jamf.com/10.0.0/jamf-pro/administrator-guide/Certificates.html).


