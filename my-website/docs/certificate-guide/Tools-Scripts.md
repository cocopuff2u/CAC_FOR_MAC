---
sidebar_position: 9
title: Tools & Scripts
---

# Useful Scripts, Apps, and Tools for Certificates on Mac

Below is a list of recommended tools and utilities for managing, importing, and troubleshooting certificates on macOS:

### **Scripts**

- **DoD Certificate Import Script**  
  [Import_DoD_Certs.sh](https://raw.githubusercontent.com/cocopuff2u/MacOS_GOV_Scripts/main/Keychain_And_Certificates_Scripts/Import_DoD_Certs.sh)  
  Automates downloading and importing DoD certificates into the System Keychain.

- **Custom Bulk Import Script**  
  Write your own Bash or Python script using the `security` CLI to automate importing multiple certificates:
  ```bash
  sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain /path/to/certificate.cer
  ```

### **Apps**

- **Keychain Access** (built-in)  
  The default macOS application for managing certificates, keys, and passwords.

- **Terminal** (built-in)  
  Use the `security` command-line tool for advanced certificate management.

- **Apple Configurator 2**  
  Useful for deploying certificates and profiles to multiple Macs or iOS devices.  
  [Download from Mac App Store](https://apps.apple.com/us/app/apple-configurator/id1037126344)

- **ProfileCreator**  
  Open-source app for creating configuration profiles, including certificate payloads.  
  [https://github.com/ProfileCreator/ProfileCreator](https://github.com/ProfileCreator/ProfileCreator)

### **Tools & Utilities**

- **OpenSSL**  
  Command-line tool for viewing, converting, and troubleshooting certificate files.
  ```bash
  openssl x509 -in certificate.cer -text -noout
  ```

- **Certifi**  
  Python package with a curated collection of Root Certificates for validating the trustworthiness of SSL certificates.

- **Charles Proxy**  
  Useful for inspecting SSL certificates and troubleshooting HTTPS connections.  
  [https://www.charlesproxy.com/](https://www.charlesproxy.com/)

- **Firefox Certificate Manager**  
  Firefox uses its own certificate store. Manage certificates via Preferences > Privacy & Security > Certificates.

---

> **Tip:** Always review and understand any script before running it, especially those that modify your system keychains or trust settings.

---
