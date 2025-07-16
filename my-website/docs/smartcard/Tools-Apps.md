---
sidebar_position: 9
title: Tools & Apps
---
# Useful Apps and Tools for Smart Cards on Mac

---

## **Applications**

### Keychain Access (built-in)  
  *The default macOS application for viewing and interacting with smart cards and their identities. Used to check if a smart card is recognized by the system and to view available identities.*

### Smart Card Services (built-in)  
  *macOS includes built-in support for many smart card readers and cards. No additional drivers are needed for most modern readers, but check your manufacturer's website for updates if you encounter issues.*

### Smart Card Utility
  *Smart Card Utility is a powerful app for managing and using smart cards on macOS. With a modern, intuitive interface, Smart Card Utility shows the certificates on PIV smart card slots. See all the attributes of the certificates and easily export them for reference on other systems.* <br/>
[Download from Mac App Store](https://twocanoes.com/products/mac/smart-card-utility/)

### Secure Remote Access
  *Secure Remote Access is a macOS application for accessing remote Macs securely using PIV compatible smart cards. Plug in a PIV compatible smart card to your Mac, then connect to a remote Mac using screen sharing. All authentication on the remote Mac is done over the network back to the local smart card.* <br/>
[Download from Two Canoes](https://twocanoes.com/products/mac/secure-remote-access/)

### Yubikey Manager
  *Use the YubiKey Manager to configure FIDO2, OTP and PIV functionality on your YubiKey on MacOS. The tool works with any currently supported YubiKey. You can also use the tool to check the type and firmware of a YubiKey. In addition, you can use the extended settings to specify other features, such as to configure 3-second long touch.*<br/>
[Download from Yubico.com](https://www.yubico.com/support/download/yubikey-manager/)

### Apple Configurator 2  
  *Useful for deploying configuration profiles that enable or configure smart card support on multiple Macs.*  
  [Download from Mac App Store](https://apps.apple.com/us/app/apple-configurator/id1037126344)  

---

## **Open Source Projects**

### (User) Boberito - SC_Menu

  *Simple smartcard menu item, to view certificates and information about the smart card*<br/>
  [https://github.com/boberito/sc_menu](https://github.com/boberito/sc_menu)  ![](https://img.shields.io/github/stars/boberito/sc_menu?style=social)

  ### (User) Kenh - keychain-pkcs11

  *This is a library designed to bridge the gap between the Apple Security Framework and applications which support using a PKCS#11 interface to access cryptographic hardware.*<br/>
  [https://github.com/kenh/keychain-pkcs11](https://github.com/kenh/keychain-pkcs11) ![](https://img.shields.io/github/stars/kenh/keychain-pkcs11?style=social)

  ### (User) Golbiga - macOS_Smartcard

  *Collection of scripts and profiles for macOS management of Smartcards.* <br/>
  [https://github.com/golbiga/macOS_Smartcard](https://github.com/golbiga/macOS_Smartcard) ![](https://img.shields.io/github/stars/golbiga/macOS_Smartcard?style=social)

:::important
_If you know of other great open source projects or useful scripts related to certificate management on macOS, please share them here!_
:::

---

## **Commands & Scripts**

### The `security` Command-Line Tool  
The `security` command is a built-in macOS CLI utility that can interact with smart cards.

#### Common `security` Commands for Smart Cards

- **List Connected Smart Cards**  
  Shows all smart cards currently connected to the system.
  ```bash
  security list-smartcards
  ```

- **Export Certificates from a Smart Card**  
  Exports certificates from the smart card to a folder.
  ```bash
  /usr/bin/security export-smartcard -e "/PATH/TO/FOLDER"
  ```

<small>
:::note[Feedback?]
_If you found an error, noticed something missing, or need additional help, please [submit feedback on GitHub](https://github.com/cocopuff2u/CAC_FOR_MAC/issues) or start a [GitHub discussion](https://github.com/cocopuff2u/CAC_FOR_MAC/discussions)._

_If you'd like to contribute improvements to this guide, feel free to submit a [pull request](https://github.com/cocopuff2u/CAC_FOR_MAC/pulls) or select `edit this page` below._
:::
</small>