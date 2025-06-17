---
sidebar_position: 9
title: Tools & Apps
---

# Useful Scripts, Apps, and Tools for Certificates on Mac

---

## **Applications**

### Keychain Access (built-in)  
  *The default macOS application for managing certificates, keys, and passwords.*  

### Apple Configurator 2  
  *Deploy certificates and configuration profiles to multiple Macs or iOS devices.*  
  [Download from Mac App Store](https://apps.apple.com/us/app/apple-configurator/id1037126344)  

### Certificate Request  
  Certificate Request is a powerful utility for the Mac that allows you to request and install digital certificates directly from Active Directory. This utility automatically discovers all the required information from Active Directory, once you have obtained a kerberos ticket; then, requesting a digital certificate can be as simple as clicking a single button. The digital certificate can be used for configuring wireless, Mail, VPN, and many other services on macOS that require certificates issued by Active Directory. <br/>
  [Download from Two Canoes](https://twocanoes.com/products/mac/certificate-request/)

### Google Chrome  
  *A popular web browser that uses the macOS system keychain for certificate management. You can view and manage certificates via Chrome's settings: Settings > Privacy and Security > Security > Manage Certificates. Chrome itself does not have a built-in certificate manager; it relies on the operating system's certificate store on macOS. On Windows, Chrome uses the Windows certificate store. On macOS, certificate management is handled through Keychain Access.*

### Firefox Certificate Manager  
  *Firefox uses its own certificate store, separate from the macOS system keychain. You can manage, import, or remove certificates via Preferences > Privacy & Security > Certificates. This is important for troubleshooting certificate issues specific to Firefox or when testing certificate deployments in different browsers.*  

---

## **Open Source Projects**

### ProfileCreator ![](https://img.shields.io/github/stars/ProfileCreator/ProfileCreator?style=social)  

  *Create configuration profiles, including certificate payloads.*  
  [https://github.com/ProfileCreator/ProfileCreator](https://github.com/ProfileCreator/ProfileCreator)  

### Certifi ![](https://img.shields.io/github/stars/certifi/python-certifi?style=social)  

  *Python package with a curated collection of Root Certificates for validating SSL certificates.*  
  [https://github.com/certifi/python-certifi](https://github.com/certifi/python-certifi)  

### (User) Cocopuff2u ![](https://img.shields.io/github/stars/cocopuff2u/MacOS_GOV_Scripts?style=social)  

  *Python script by cocopuff2u to convert DoD certificates into a mobileconfig profile for easy deployment on macOS.*  
  [https://github.com/cocopuff2u/MacOS_GOV_Scripts/blob/main/Keychain_And_Certificates_Scripts/Generate_DoD_Certs_Mobileconfig.py](https://github.com/cocopuff2u/MacOS_GOV_Scripts/blob/main/Keychain_And_Certificates_Scripts/Generate_DoD_Certs_Mobileconfig.py) <br/>
  *Bash script to dump all the existing certificates for an admin*
  [https://github.com/cocopuff2u/MacOS_GOV_Scripts/blob/main/Keychain_And_Certificates_Scripts/Keychain_Certificate_Dumper.sh](https://github.com/cocopuff2u/MacOS_GOV_Scripts/blob/main/Keychain_And_Certificates_Scripts/Keychain_Certificate_Dumper.sh) <br/>
  *Bash script to import DoD certificates to the system keychain for users or admins*
  [https://github.com/cocopuff2u/MacOS_GOV_Scripts/blob/main/Keychain_And_Certificates_Scripts/Import_DoD_Certs.sh](https://github.com/cocopuff2u/MacOS_GOV_Scripts/blob/main/Keychain_And_Certificates_Scripts/Import_DoD_Certs.sh) <br/><br/>

### (User) brodjieski ![](https://img.shields.io/github/stars/brodjieski/macos?style=social)  

  *Python script by brodjieski to convert DoD certificates into a mobileconfig profile for easy deployment on macOS.*  
  [https://github.com/brodjieski/macos/blob/main/dod_certs_mobileconfig/dod_certs_to_mobileconfig.py](https://github.com/brodjieski/macos/blob/main/dod_certs_mobileconfig/dod_certs_to_mobileconfig.py) <br/>
  *This script is used to take certificate bundles (.p7b) and build a configuration profile (.mobileconfig) that can be used in Jamf Pro or any other MDM to distribute certificates*
  [https://github.com/brodjieski/macos/blob/main/p7b_to_mobileconfig/p7b_to_mobileconfig.py](https://github.com/brodjieski/macos/blob/main/p7b_to_mobileconfig/p7b_to_mobileconfig.py)

:::important
_If you know of other great open source projects or useful scripts related to certificate management on macOS, please share them here!_
:::

---

## **Commands & Scripts**

### The `security` Command-Line Tool  
The `security` command is a powerful, built-in macOS CLI utility for managing keychains, certificates, identities, and smart cards. It is used for scripting certificate imports/exports, querying keychains, and automating certificate-related workflows.

#### Common `security` Commands

- **List All Keychains**  
  Shows all keychains available to the current user.
  ```bash
  security list-keychains
  ```

- **List Certificates in a Keychain**  
  Lists all certificates in a specified keychain (e.g., System or login).
  ```bash
  security find-certificate -a -p /Library/Keychains/System.keychain
  ```

- **Import a Certificate into a Keychain**  
  Imports a certificate into a specified keychain.
  ```bash
  sudo security import /path/to/certificate.cer -k /Library/Keychains/System.keychain
  ```

- **Add a Trusted Root Certificate**  
  Adds a certificate as a trusted root to the System Keychain.
  ```bash
  sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain /path/to/certificate.cer
  ```

- **Export a Certificate from a Keychain**  
  Exports a certificate from a keychain to a file.
  ```bash
  security export -k ~/Library/Keychains/login.keychain-db -t certs -f pemseq -o exported-certs.pem
  ```

- **Delete a Certificate from a Keychain**  
  Deletes a certificate by its SHA-1 hash.
  ```bash
  security delete-certificate -Z <SHA-1 hash> /Library/Keychains/System.keychain
  ```


:::note[Tips]
 _The `security` command has many more options. Run `man security` or `security -h` in Terminal for the full documentation.
:::

### Smart Card Certificates

- **List Connected Smart Cards**  
  Shows all smart cards currently connected to the system.
  ```bash
  security list-smartcards
  ```

- **List Certificates on a Smart Card**  
  Exports certificates on the smartcard to a folder
  ```bash
  /usr/bin/security export-smartcard -e "/PATH/TO/FOLDER"
  ```

### OpenSSL

- **View Certificate Details**  
  Displays the contents of a certificate in human-readable form.
  ```bash
  openssl x509 -in certificate.cer -text -noout
  ```

- **Convert Certificate Formats**  
  Convert a DER (.cer) certificate to PEM format.
  ```bash
  openssl x509 -in certificate.cer -inform der -out certificate.pem -outform pem
  ```

- **Verify a Certificate Chain**  
  Checks if a certificate is trusted by a given CA bundle.
  ```bash
  openssl verify -CAfile ca-bundle.crt certificate.cer
  ```


<small>
:::note[Feedback?]
_If you found an error, noticed something missing, or need additional help, please [submit feedback on GitHub](https://github.com/cocopuff2u/cac-for-mac/issues) or start a [GitHub discussion](https://github.com/cocopuff2u/cac-for-mac/discussions)._

_If you'd like to contribute improvements to this guide, feel free to submit a [pull request](https://github.com/cocopuff2u/cac-for-mac/pulls) or select `edit this page` below._
:::
</small>