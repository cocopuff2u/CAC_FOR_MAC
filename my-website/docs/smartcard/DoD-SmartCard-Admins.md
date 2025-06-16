---
sidebar_position: 4
title: DoD | Admin
---

# DoD CAC Setup – Admin Guide

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

This guide provides step-by-step instructions for system administrators on enforcing Common Access Card (CAC) authentication on MDM-managed devices for DoD employees. Due to current Apple platform limitations, full CAC enforcement (including keychain access and system updates) is not yet possible. However, with the right configuration, you can achieve up to 90% CAC enforcement for most workflows.

**Important Recommendations:**
- **Deploy DoD Certificates First:** Before enforcing any smart card policies, ensure that DoD certificates are deployed to the device. Follow the [DoD Certificates Admin Guide](docs/certificate/DoD-Certificates-Admins) for details.
- **Establish a Smart Card Pairing Workflow:** Before enabling enforcement, set up a workflow for users to pair their smart card with their account. If enforcement is enabled without pairing, users will be locked out of their devices.

## Recommended Admin Workflow

1. **Deploy DoD Certificates to Device:** Use MDM to push required DoD certificates.
2. **Guide Users Through Forced Pairing:** Require users to pair their smart card with their account before proceeding. This can be enforced via MDM or onboarding scripts.
3. **Verify Pairing Success:** Confirm that the smart card is correctly paired to the user account.
4. **Enforce Smart Card Policies:** Once pairing is verified, enable CAC enforcement via MDM.
5. **(Optional) Exempt Admin Account or Unenforce for Troubleshooting:** Consider maintaining an exempt admin account or a workflow to temporarily disable enforcement for troubleshooting purposes.
6. **Monitor & Support:** Provide ongoing support and monitor compliance.

## Enforcing CAC 

### Step 1. 

<small>
:::note[Feedback?]
_If you found an error, noticed something missing, or need additional help, please [submit feedback on GitHub](https://github.com/cocopuff2u/cac-for-mac/issues) or start a [GitHub discussion](https://github.com/cocopuff2u/cac-for-mac/discussions)._

_If you'd like to contribute improvements to this guide, feel free to submit a [pull request](https://github.com/cocopuff2u/cac-for-mac/pulls) or select `edit this page` below._
:::
</small>