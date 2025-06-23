#!/bin/bash

####################################################################################################
#
# # Generate SmartCard .mobileconfig for macOS
#
# Purpose: CLI interface to generate a SmartCard .mobileconfig file for macOS.
#
# https://github.com/cocopuff2u
#
####################################################################################################
#
#   History
#
#  1.0 6/23/25 - Original
#
####################################################################################################

SCRIPT_VERSION="1.0"
LAST_UPDATED="$(date +%Y-%m-%d)"

# Print script header

echo "=================================================="
echo "        SmartCard Mobileconfig Builder v$SCRIPT_VERSION"
echo "=================================================="
echo
echo "Welcome to the SmartCard .mobileconfig Builder!"
echo "This tool helps you create a custom SmartCard configuration profile for macOS."
echo
echo "You'll be guided step-by-step, with clear explanations and recommended defaults."
echo
echo "For more info, visit: https://cacformac.com"
echo

# Sudo/root check
if [[ $EUID -ne 0 ]]; then
    echo "[WARNING] This script is not running as root (sudo)."
    echo "Without root privileges, the generated .mobileconfig can only be saved to your user directory."
    echo "To install system-wide, please re-run this script with 'sudo'."
    echo
fi

# Function to prompt for a Yes/No value, with a default
prompt_bool() {
    local prompt="(Enter Yes or No. Default Value: $1): "
    local default="$1"
    local var
    while true; do
        read -r -p "$prompt" var
        if [[ -z "$var" ]]; then
            var="$default"
        fi
        local var_lc=$(echo "$var" | tr '[:upper:]' '[:lower:]')
        case "$var_lc" in
            y|yes)
                echo true
                return
                ;;
            n|no)
                echo false
                return
                ;;
            *)
                echo "Invalid input. Please enter y, yes, n, or no." 1>&2
                ;;
        esac
    done
}

# Function to prompt for an integer value from a set of allowed values
# $1: prompt message, $2: default, $3: allowed values (space separated)
default_int() {
    local prompt_msg="$1"
    local default="$2"
    local allowed="$3"
    local var
    while true; do
        read -r -p "$prompt_msg Default Value: $default): " var
        if [[ -z "$var" ]]; then
            var="$default"
        fi
        for allowed_val in $allowed; do
            if [[ "$var" == "$allowed_val" ]]; then
                echo "$var"
                return
            fi
        done
        echo "Invalid input. Allowed: $allowed" 1>&2
    done
}

pattern="--------------------------------------------------"

# Prompt for allowSmartCard policy

echo "$pattern"
echo "==============================="
echo " Policy: allowSmartCard"
echo "==============================="
echo "Description:"
echo "  Should SmartCard be allowed for logins and authorizations?"
echo "Options:"
echo "  [Yes]  (true)  - Enable SmartCard for logins, authorizations, and screen saver unlocking."
echo "  [No]   (false) - Disable SmartCard for these, but still allow for signing emails and web access."
echo "Note: A restart is required for changes to take effect."
echo
allowSmartCard=$(prompt_bool Yes)
echo "$pattern"

# Prompt for checkCertificateTrust policy

echo "==============================="
echo " Policy: checkCertificateTrust"
echo "==============================="
echo "Description:"
echo "  Select the level of certificate trust check to enforce:"
echo "Options:"
echo "  [0] Off         - No certificate trust check."
echo "  [1] Standard    - Validity check only (no revocation checks)."
echo "  [2] Soft Revoc. - Validity check plus soft revocation: valid unless explicitly rejected by CRL/OCSP. Unavailable or unreachable CRL/OCSP allows this check to succeed."
echo "  [3] Hard Revoc. - Validity check plus hard revocation: invalid unless CRL/OCSP explicitly says 'This certificate is OK.' Most secure."
echo
checkCertificateTrust=$(default_int "(Enter Value of 0, 1, 2, 3." 0 "0 1 2 3")
echo "$pattern"

# Prompt for enforceSmartCard policy

echo "==============================="
echo " Policy: enforceSmartCard"
echo "==============================="
echo "Description:"
echo "  Should users be required to log in or authenticate only with a SmartCard?"
echo "Options:"
echo "  [Yes]  (true)  - Only SmartCard authentication is allowed."
echo "  [No]   (false) - Other authentication methods are allowed. (macOS 10.13.2+)"
echo "Default: false"
echo
enforceSmartCard=$(prompt_bool No)
echo "$pattern"

# Prompt for oneCardPerUser policy

echo "==============================="
echo " Policy: oneCardPerUser"
echo "==============================="
echo "Description:"
echo "  Should each user be limited to pairing with only one SmartCard?"
echo "Options:"
echo "  [Yes]  (true)  - Only one SmartCard can be paired per user (existing pairings still work)."
echo "  [No]   (false) - Multiple SmartCards can be paired per user."
echo "Default: false"
echo
oneCardPerUser=$(prompt_bool No)
echo "$pattern"

# Prompt for tokenRemovalAction policy

echo "==============================="
echo " Policy: tokenRemovalAction"
echo "==============================="
echo "Description:"
echo "  What should happen when a SmartCard is removed?"
echo "Options:"
echo "  [0] No action      - No action when SmartCard is removed."
echo "  [1] Screen Saver   - Enable screen saver when SmartCard is removed. (macOS 10.13.4+)"
echo "Default: 0"
echo
tokenRemovalAction=$(default_int "Enter Value of 0 or 1." 0 "0 1")
echo "$pattern"

# Prompt for UserPairing policy

echo "==============================="
echo " Policy: UserPairing"
echo "==============================="
echo "Description:"
echo "  Should users be allowed to pair new SmartCards?"
echo "Options:"
echo "  [Yes]  (true)  - Users can pair new SmartCards."
echo "  [No]   (false) - Users cannot pair new SmartCards (existing pairings still work)."
echo "Default: true"
echo
UserPairing=$(prompt_bool Yes)
echo "$pattern"

# Print summary of user selections
echo "==============================="
echo "Summary of your selections:"
echo "==============================="
echo "  allowSmartCard:        $allowSmartCard"
echo "  checkCertificateTrust: $checkCertificateTrust"
echo "  enforceSmartCard:      $enforceSmartCard"
echo "  oneCardPerUser:        $oneCardPerUser"
echo "  tokenRemovalAction:    $tokenRemovalAction"
echo "  UserPairing:           $UserPairing"
echo

# Ask user for output location
outfile_default="$HOME/Downloads/SmartCard.mobileconfig"
filename="SmartCard.mobileconfig"

# Restrict output location if not running as root
if [[ $EUID -ne 0 ]]; then
    echo "Default output file location: $outfile_default"
    read -r -p "Are you okay with the default output location? (Y/n): " use_default
    use_default_lc=$(echo "$use_default" | tr '[:upper:]' '[:lower:]')
    if [[ "$use_default_lc" == "n" || "$use_default_lc" == "no" ]]; then
        while true; do
            echo
            echo "You can only choose between:"
            echo "  1) $HOME/Downloads"
            echo "  2) $HOME/Desktop"
            read -r -p "Enter 1 for Downloads or 2 for Desktop: " choice
            if [[ "$choice" == "1" ]]; then
                outdir="$HOME/Downloads"
                break
            elif [[ "$choice" == "2" ]]; then
                outdir="$HOME/Desktop"
                break
            else
                echo "Invalid choice. Please enter 1 or 2."
            fi
        done
        outfile="$outdir/$filename"
    else
        outfile="$outfile_default"
    fi
else
    echo "Default output file location: $outfile_default"
    read -r -p "Are you okay with the default output location? (Y/n): " use_default
    use_default_lc=$(echo "$use_default" | tr '[:upper:]' '[:lower:]')
    if [[ "$use_default_lc" == "n" || "$use_default_lc" == "no" ]]; then
        example_path="$HOME/Desktop"
        while true; do
            echo
            echo "For example, you could use: \"$example_path\" (the file will be named $filename)"
            read -r -p "Enter desired output directory path: " outdir
            if [[ -z "$outdir" ]]; then
                outdir="$HOME/Downloads"
            fi
            # Remove trailing slash if present (except for root '/')
            if [[ "$outdir" != "/" ]]; then
                outdir="${outdir%/}"
            fi
            if [[ "$outdir" == "/" ]]; then
                echo
                echo "=================================================="
                echo "You cannot use the root directory (/)!"
                echo "Please choose another directory."
                echo "=================================================="
                echo
                continue
            fi
            if [[ -d "$outdir" ]]; then
                outfile="$outdir/$filename"
                break
            else
                echo "That directory does not exist. Please enter a valid directory path."
            fi
        done
    else
        outfile="$outfile_default"
    fi
fi

# Generate UUIDs for the payload and profile
payload_uuid=$(uuidgen)
profile_uuid=$(uuidgen)

# Write the .mobileconfig file using the user's selections
cat > "$outfile" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>UserPairing</key>
            <$([[ "$UserPairing" == "true" ]] && echo true || echo false)/>
            <key>allowSmartCard</key>
            <$([[ "$allowSmartCard" == "true" ]] && echo true || echo false)/>
            <key>checkCertificateTrust</key>
            <integer>${checkCertificateTrust}</integer>
            <key>oneCardPerUser</key>
            <$([[ "$oneCardPerUser" == "true" ]] && echo true || echo false)/>
            <key>tokenRemovalAction</key>
            <integer>${tokenRemovalAction}</integer>
            <key>enforceSmartCard</key>
            <$([[ "$enforceSmartCard" == "true" ]] && echo true || echo false)/>
            <key>PayloadIdentifier</key>
            <string>com.cacformac.security.smartcard.payload.$payload_uuid</string>
            <key>PayloadType</key>
            <string>com.apple.security.smartcard</string>
            <key>PayloadUUID</key>
            <string>$payload_uuid</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
        </dict>
    </array>
    <key>PayloadDescription</key>
    <string>Generated from https://cacformac.com

This configuration profile was generated using a bash script.

Last Updated: $LAST_UPDATED
Script Version: $SCRIPT_VERSION</string>
    <key>PayloadDisplayName</key>
    <string>SmartCard Policy</string>
    <key>PayloadIdentifier</key>
    <string>com.cacformac.security.smartcard.profile.$profile_uuid</string>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>$profile_uuid</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>
EOF

# Notify user of completion
echo
echo "=================================================="
echo "Your SmartCard .mobileconfig has been created!"
echo "You can now import it into your MDM system."
echo
echo "mobileconfig written to $outfile"
echo "=================================================="
