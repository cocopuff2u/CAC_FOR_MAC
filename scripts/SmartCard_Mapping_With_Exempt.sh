#!/bin/bash

####################################################################################################
#
# Title: DoD Smartcard Mapping with Exempt User and Group Management
#
# Purpose:
#   Streamlines the process of mapping a PIV smartcard to the current user, manages the inclusion of all
#   DoD Certificate Authorities in SmartcardLogin.plist, and automates the creation of users and groups
#   for smartcard enforcement exemptions. Also provides comprehensive uninstall options for complete
#   cleanup of all related configurations.
#
# https://github.com/cocopuff2u
#
####################################################################################################
#
#   History
#
#  1.0 6/24/25 - Original
#
#  1.1 6/25/25 - Added hidden to the group so users cannot see it in the GUI
#
####################################################################################################
####################################################################################################
#
# Configuration Variables
#
####################################################################################################

# Set to "true" to uninstall all (Default is false)
# Will uninstall plist, remove AltSecurityIdentities from user account, and remove group
# The created user will not be removed, but the group will be removed if it exists
UNINSTALL=false

# Creates a User if it does not exist (Default is false)
# Its advised to push this from the MDM solution to ensure the user is created and managed
# The user will be created as a hidden user with home folder /var/USERNAME
CREATE_USER=false
# The username to create if CREATE_USER is true
USERNAME="jamfadmin"

# Creates a Group if it does not exist (Default is true)
# This group will be used to exempt users from Smartcard enforcement
CREATE_GROUP=true
# The group name for the plist and the group to exempt users from Smartcard enforcement
GROUPNAME="EXEMPT_GROUP"
# Add Existing/Created User to the group (default is true)
EXEMPT_GROUP_USER=true

# Other users to exempt from Smartcard enforcement to be added to the group
# This will add the users to the group specified in GROUPNAME
# Example: OTHER_EXEMPT_USERS=("user1" "user2")
OTHER_EXEMPT_USERS=()

# Set to "true" to include DoD Trusted Authorities in SmartcardLogin.plist (Default is true)
# This will grab the latest DoD Trusted Authorities and add them to the SmartcardLogin.plist
# The DoD Ceritificates should be deployed to the sfystem via a profile or manually and ensured they
# are trusted by the system for this to function properly.
INCLUDE_TRUSTED_AUTHORITIES=true

# Set to "true" to enable test mode does not run commands, "false" to run normally (Default is false)
TEST_MODE=false

# Set to "true" to enable logging to /var/log, "false" to disable (Default is true)
ENABLE_LOGGING=true

# Set to "false" to use SwiftDialog for dialogs instead of OSAScript (Default is true)
# Its recommended to use swiftDialog for better user experience
USE_OSASCRIPT=true

####################################################################################################
#
# Logging Variables
#
####################################################################################################
# Script Name, Location, and Version
Script_Name="CAC_Smartcard_Mapping"
LOG_FILE="/var/log/CAC_Smartcard_Mapping.log"
Script_Version="1.0"

####################################################################################################
# Logging Functions
####################################################################################################

# Create log file only if logging is enabled
if [[ "$ENABLE_LOGGING" == "true" ]]; then
    touch "$LOG_FILE"
fi

# Logging function
log_message() {
    local warning_type="$1"; shift
    local timestamp=$(date '+%Y-%m-%d %I:%M %p')
    local message="[$Script_Name][$Script_Version][$timestamp] [$warning_type] - $1"

    echo "$message"

    if [[ "$ENABLE_LOGGING" == "true" ]]; then
        echo "$message" >> "$LOG_FILE"
    fi
}
####################################################################################################
# Safe Execution Function
# This function executes commands if TEST_MODE is false, otherwise it logs the command only
####################################################################################################

safe_exec() {
    local cmd="$*"

    if [ "$TEST_MODE" = true ]; then
        log_message TEST_MODE_ENABLED "SKIPPING CMD: $cmd"
    else
        log_message "INFO" "Executing command: $cmd"
        eval "$cmd"
    fi
}

####################################################################################################
# Validate / install swiftDialog
####################################################################################################

function dialogInstall() {
    dialogURL=$(curl -L --silent --fail "https://api.github.com/repos/swiftDialog/swiftDialog/releases/latest" | awk -F '"' "/browser_download_url/ && /pkg\"/ { print \$4; exit }")
    expectedDialogTeamID="PWA5E9TQ59"
    log_message "INFO" "Installing swiftDialog...."
    workDirectory=$( /usr/bin/basename "$0" )
    tempDirectory=$( /usr/bin/mktemp -d "/private/tmp/$workDirectory.XXXXXX" )
    /usr/bin/curl --location --silent "$dialogURL" -o "$tempDirectory/Dialog.pkg"
    teamID=$(/usr/sbin/spctl -a -vv -t install "$tempDirectory/Dialog.pkg" 2>&1 | awk '/origin=/ {print $NF }' | tr -d '()')
    if [[ "$expectedDialogTeamID" == "$teamID" ]]; then
        /usr/sbin/installer -pkg "$tempDirectory/Dialog.pkg" -target /
        sleep 2
        dialogVersion=$( /usr/local/bin/dialog --version )
        log_message "INFO" "swiftDialog version ${dialogVersion} installed; proceeding...."
    else
        osascript -e 'display dialog "Please advise your Support Representative of the following error:\r\r• Dialog Team ID verification failed\r\r" with title "Dialog Missing: Error" buttons {"Close"} with icon caution' & exit 0
    fi
    /bin/rm -Rf "$tempDirectory"
}

function dialogCheck() {
    if [[ "$USE_OSASCRIPT" == "true" ]]; then
        log_message "INFO" "OSASCRIPT mode enabled, skipping swiftDialog check."
        return
    fi
    if [ ! -e "/Library/Application Support/Dialog/Dialog.app" ]; then
        log_message "INFO" "swiftDialog not found. Installing...."
        dialogInstall
    else
        dialogVersion=$(/usr/local/bin/dialog --version)
        if [[ "${dialogVersion}" < "${swiftDialogMinimumRequiredVersion}" ]]; then
            log_message "WARN" "swiftDialog version ${dialogVersion} found but swiftDialog ${swiftDialogMinimumRequiredVersion} or newer is required; updating...."
            dialogInstall
        else
            log_message "INFO" "swiftDialog version ${dialogVersion} found; proceeding...."
        fi
    fi
}

dialogCheck


####################################################################################################
# CAC Pairing & Plist Creation
####################################################################################################


log_message "INFO" "Script started"

# Smartcard Attribute Mapping for Local Accounts

# Check for logged in user.
currentUser="$( echo "show State:/Users/ConsoleUser" | scutil | awk '/Name :/ && ! /loginwindow/ { print $3 }' )"
log_message "INFO" "Current user: $currentUser"

DIALOG_PATH="/usr/local/bin/dialog"

# Architecture and user info
arch=$(arch)
AUID="$( echo "show State:/Users/ConsoleUser" | scutil | awk '/Name :/ && ! /loginwindow/ { print $3 }' )"
AUID_UID=$(id -u $AUID 2>/dev/null)
currentUser="$AUID"

# Check for pairing
checkForPaired (){
    log_message "INFO" "Checking for existing smartcard pairing"
    tokenCheck=$(/usr/bin/dscl . read /Users/"$AUID" AuthenticationAuthority | grep -c tokenidentity)
    if [[ "$tokenCheck" -gt 0 ]]; then
        log_message "INFO" "Unpairing smartcard from $AUID"
        safe_exec /usr/sbin/sc_auth unpair -u "$AUID"
        log_message "SUCCESS" "Smartcard unpaired successfully"
    else
        log_message "INFO" "No existing smartcard pairing found"
    fi
}

# Prompt the user to insert card, once inserted prompt will go away.
prompt (){
    log_message "INFO" "Checking for inserted smartcard"
    if [[ $( security list-smartcards 2>/dev/null | grep -c com.apple.pivtoken ) -ge 1 ]]; then
        log_message "INFO" "Smartcard already inserted"
        return 0
    fi

    log_message "INFO" "Displaying smartcard insertion prompt"
    if [[ "$USE_OSASCRIPT" == "true" ]]; then
        prompt_message="Please insert CAC before proceeding"
        while true; do
            button=$(osascript -e "display dialog \"$prompt_message\" with title \"Smartcard Mapping\" buttons {\"Cancel\", \"Proceed\"} default button \"Proceed\" with icon caution" 2>&1)
            if [[ $? -ne 0 ]] || [[ "$button" == *"Cancel"* ]]; then
                log_message "WARN" "User cancelled smartcard prompt - exiting script"
                exit 0
            fi
            if [[ $( security list-smartcards 2>/dev/null | grep -c com.apple.pivtoken ) -ge 1 ]]; then
                break
            fi
            prompt_message="CAC not detected, please insert CAC"
        done
    else
        "$DIALOG_PATH" \
            --title "Smartcard Mapping" \
            --messagealignment center \
            --message "Please insert your smartcard to begin." \
            --hideicon \
            --button1text "Cancel" \
            --buttonstyle center \
            --progress 0 \
            --small \
            --ontop \
            --moveable \
            --height 200 \
            --commandfile /var/tmp/dialog.log \
            --position center 2> /dev/null &
        DIALOG_PID=$!
        while [[ $( security list-smartcards 2>/dev/null | grep -c com.apple.pivtoken ) -lt 1 ]]; do 
            if ! kill -0 $DIALOG_PID 2>/dev/null; then
                log_message "WARN" "Dialog window closed by user - exiting script"
                exit 0
            fi
            sleep 1
        done
        /bin/echo "quit:" >> /var/tmp/dialog.log
    fi
    log_message "SUCCESS" "Smartcard detected"
}

getUPN(){
    log_message "INFO" "Beginning UPN extraction process"
    # Create temporary directory to export certs:
    tmpdir=$(/usr/bin/mktemp -d)
    log_message "INFO" "Created temporary directory: $tmpdir"
    
    # Export certs on smartcard to temporary directory:
    /usr/bin/security export-smartcard -e "$tmpdir"
    log_message "INFO" "Certificates exported to temporary directory: $tmpdir"
    
    # Get path to Certificate for PIV Authentication:
    piv_path=$(ls "$tmpdir" | /usr/bin/grep '^Certificate For PIV')
    log_message "INFO" "PIV certificate path: $tmpdir/$piv_path"
    
    # Get User Principle Name from Certificate for PIV Authentication:
    UPN="$(/usr/bin/openssl asn1parse -i -dump -in "$tmpdir/$piv_path" -strparse $(/usr/bin/openssl asn1parse -i -dump -in "$tmpdir/$piv_path"  | /usr/bin/awk -F ':' '/X509v3 Subject Alternative Name/ {getline; print $1}') | /usr/bin/awk -F ':' '/UTF8STRING/{print $4}')"
    log_message "INFO" "Retrieved UPN: $UPN"
    
    # Clean up the temporary directory
    /bin/rm -rf $tmpdir
    log_message "INFO" "Cleaned up temporary directory: $tmpdir"
}

createAltSecId (){
    log_message "INFO" "Checking existing AltSecurityIdentities"
    altSecCheck=$(/usr/bin/dscl . -read /Users/"$AUID" AltSecurityIdentities 2>/dev/null | sed -n 's/.*Kerberos:\([^ ]*\).*/\1/p')
    log_message "INFO" "Current AltSecurityIdentities value: $altSecCheck"
    if [[ "$UPN" = "" ]]; then
        log_message "ERROR" "No UPN found for $AUID"
        if [[ "$USE_OSASCRIPT" == "true" ]]; then
            osascript -e 'display dialog "No UPN found on smartcard" with title "Smartcard Mapping" buttons {"Quit"} default button "Quit" with icon caution'
        else
            "$DIALOG_PATH" \
                --title "Smartcard Mapping" \
                --messagealignment center \
                --message "No UPN found on smartcard" \
                --hideicon \
                --small \
                --ontop \
                --moveable \
                --buttonstyle center \
                --height 200 \
                --button1text "Quit" 2> /dev/null
        fi
    elif [[ "$altSecCheck" = "$UPN" ]]; then
        log_message "INFO" "AltSecurityIdentities already set to $UPN for $AUID"
        if [[ "$USE_OSASCRIPT" == "true" ]]; then
            osascript -e "display dialog \"Smartcard mapping was already set to $UPN\" with title \"Smartcard Mapping\" buttons {\"Quit\"} default button \"Quit\" with icon note" &
        else
            "$DIALOG_PATH" \
                --title "Smartcard Mapping" \
                --messagealignment center \
                --message "Smartcard mapping was already set to <br>$UPN" \
                --hideicon \
                --ontop \
                --moveable \
                --small \
                --buttonstyle center \
                --height 200 \
                --button1text "Quit" 2> /dev/null &
        fi
    else
        log_message "INFO" "Adding $UPN to AltSecurityIdentities for $AUID"
        safe_exec /usr/bin/dscl . -append /Users/"$AUID" AltSecurityIdentities Kerberos:"$UPN"
        log_message "SUCCESS" "Successfully added $UPN to AltSecurityIdentities for $AUID"
        if [[ "$USE_OSASCRIPT" == "true" ]]; then
            osascript -e "display dialog \"Successfully added $UPN to $AUID\" with title \"Smartcard Mapping\" buttons {\"Quit\"} default button \"Quit\" with icon note" &
        else
            "$DIALOG_PATH" \
                --title "Smartcard Mapping" \
                --messagealignment center \
                --message "Successfully added $UPN to $AUID" \
                --hideicon \
                --ontop \
                --moveable \
                --small \
                --buttonstyle center \
                --height 200 \
                --button1text "Quit" 2> /dev/null &
        fi
    fi
}

createMapping (){
    log_message "INFO" "Setting up SmartcardLogin.plist"
    if [ -f /etc/SmartcardLogin.plist ]; then
        log_message "INFO" "SmartcardLogin.plist already exists"
        log_message "INFO" "Removing SmartcardLogin.plist to update file"
        safe_exec rm -f /etc/SmartcardLogin.plist
        log_message "SUCCESS" "Removed existing SmartcardLogin.plist"
    fi

    trusted_authorities_entries=()
    if [[ "$INCLUDE_TRUSTED_AUTHORITIES" == "true" ]]; then
        log_message "INFO" "Downloading latest DoD Trusted Authorities list for SmartcardLogin.plist"
        TMPDIR=$(mktemp -d)
        ZIPURL="https://dl.dod.cyber.mil/wp-content/uploads/pki-pke/zip/unclass-dod_approved_external_pkis_trust_chains.zip"
        ZIPFILE="$TMPDIR/unclass-dod_approved_external_pkis_trust_chains.zip"
        curl -L --silent "$ZIPURL" -o "$ZIPFILE"
        unzip -q "$ZIPFILE" -d "$TMPDIR"
        base_dir=$(find "$TMPDIR" -maxdepth 1 -type d -name 'DoD_Approved_External_PKIs_Trust_Chains*' | head -n 1)
        cert_dir1="$base_dir/_DoD/Intermediate_and_Issuing_CA_Certs"
        cert_dir2="$base_dir/_DoD/Trust_Anchors_Self-Signed"
        fingerprints=()
        find "$cert_dir1" -type f -name '*.cer' -print0 > "$TMPDIR/certs1.list"
        find "$cert_dir2" -type f -name '*.cer' -print0 > "$TMPDIR/certs2.list"
        cat "$TMPDIR/certs1.list" "$TMPDIR/certs2.list" > "$TMPDIR/allcerts.list"
        log_message "INFO" "compiling list of sha256 certificate authorites from $ZIPURL"
        while IFS= read -r -d '' cert; do
            fp=$(openssl x509 -in "$cert" -noout -fingerprint -sha256 2>/dev/null)
            if [[ -z "$fp" ]]; then
                fp=$(openssl x509 -in "$cert" -inform der -noout -fingerprint -sha256 2>/dev/null)
            fi
            fp=$(echo "$fp" | sed 's/^.*Fingerprint=//' | tr -d ':' | tr -d '[:space:]' | tr '[:lower:]' '[:upper:]')
            if [[ -n "$fp" ]]; then
                trusted_authorities_entries+=("        <string>$fp</string>")
            fi
        done < "$TMPDIR/allcerts.list"
        rm -rf "$TMPDIR"
        log_message "INFO" "DoD Trusted Authorities compilied for SmartcardLogin.plist"
    else
        log_message "INFO" "INCLUDE_TRUSTED_AUTHORITIES is set to false, skipping DoD Trusted Authorities"
        trusted_authorities_entries=("        <string></string>")
    fi

    log_message "INFO" "Creating /etc/SmartcardLogin.plist"
    if [ "$TEST_MODE" = true ]; then
        log_message TEST_MODE_ENABLED "- SKIPPING CMD: /bin/cat > /etc/SmartcardLogin.plist <<EOF"
    else
        /bin/cat > "/etc/SmartcardLogin.plist" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
     <key>AttributeMapping</key>
     <dict>
          <key>fields</key>
          <array>
               <string>NT Principal Name</string>
          </array>
          <key>formatString</key>
          <string>Kerberos:\$1</string>
          <key>dsAttributeString</key>
          <string>dsAttrTypeStandard:AltSecurityIdentities</string>
     </dict>
     <key>TrustedAuthorities</key>
     <array>
$(printf "%s\n" "${trusted_authorities_entries[@]}")
     </array>
     <key>NotEnforcedGroup</key>
     <string>${GROUPNAME}</string>
</dict>
</plist>
EOF
    fi
    log_message "SUCCESS" "SmartcardLogin.plist created successfully"
}

uninstall() {
    log_message "INFO" "Starting uninstallation process"
    
    # Remove AltSecurityIdentities
    if /usr/bin/dscl . -read /Users/"$AUID" AltSecurityIdentities &>/dev/null; then
        log_message "INFO" "Removing AltSecurityIdentities for $AUID"
        safe_exec /usr/bin/dscl . -delete /Users/"$AUID" AltSecurityIdentities
        log_message "SUCCESS" "AltSecurityIdentities removed successfully"
    else
        log_message "INFO" "No AltSecurityIdentities found for $AUID"
    fi
    
    # Remove SmartcardLogin.plist
    if [ -f /etc/SmartcardLogin.plist ]; then
        log_message "INFO" "Removing SmartcardLogin.plist"
        safe_exec rm -f /etc/SmartcardLogin.plist
        log_message "SUCCESS" "SmartcardLogin.plist removed successfully"
    else
        log_message "INFO" "SmartcardLogin.plist not found"
    fi

    # Remove group if it exists
    if dscl . -read /Groups/$GROUPNAME &>/dev/null; then
        log_message "INFO" "Removing group $GROUPNAME"
        safe_exec dscl . -delete /Groups/$GROUPNAME
        log_message "SUCCESS" "Group $GROUPNAME removed successfully"
    else
        log_message "INFO" "Group $GROUPNAME not found"
    fi

    if [[ "$USE_OSASCRIPT" == "true" ]]; then
        osascript -e "display dialog \"Smartcard mapping has been removed for $AUID\" with title \"Smartcard Mapping\" buttons {\"Quit\"} default button \"Quit\" with icon note" &
    else
        "$DIALOG_PATH" \
            --title "Smartcard Mapping" \
            --messagealignment center \
            --message "Smartcard mapping has been removed for $AUID" \
            --hideicon \
            --ontop \
            --moveable \
            --small \
            --buttonstyle center \
            --height 200 \
            --button1text "Quit" 2> /dev/null &
    fi
    
    log_message "SUCCESS" "Uninstallation completed"
    exit 0
}

enableFileVault () {
    log_message "INFO" "Enabling FileVault for $AUID"
    user_uuid=$(dscl . -read /Users/$AUID GeneratedUID 2>/dev/null | awk '{print $2}')
    log_message "INFO" "User UUID for $AUID: $user_uuid"
    if [[ -z "$user_uuid" ]]; then
        log_message "ERROR" "Could not retrieve UUID for $AUID"
        return 1
    fi

    # Check if user is already a FileVault enabled user
    if fdesetup list | grep -q "$user_uuid"; then
        log_message "INFO" "FileVault is already enabled for $AUID (UUID: $user_uuid)"
    else
        log_message "INFO" "User $AUID is not currently a FileVault enabled user"
    fi

    hash=$(sc_auth identities | awk '/PIV/ {print $1}')
    log_message "INFO" "sc_auth hash for $AUID: $hash"
    if [[ -n "$hash" && -n "$AUID_UID" ]]; then
        # Only proceed if ;amidentity;$hash is not already present
        if ! dscl . -read /Users/$AUID AuthenticationAuthority 2>/dev/null | grep -q ";amidentity;$hash"; then
            log_message "INFO" "Enabling FileVault with sc_auth for $AUID"
            launchctl asuser $AUID_UID sudo -u $AUID sc_auth filevault -o enable -u $AUID -h $hash
            log_message "SUCCESS" "FileVault enabled for $AUID with hash $hash"
            dscl . -append /Users/$AUID AuthenticationAuthority ";amidentity;$hash"
            log_message "SUCCESS" "Appended ;amidentity;$hash to AuthenticationAuthority for $AUID"
            diskutil apfs updatePreboot / >/dev/null 2>&1
            log_message "SUCCESS" "Updated APFS preboot for $AUID"
            log_message "SUCCESS" "FileVault enabled for $AUID"
        else
            log_message "INFO" "AuthenticationAuthority already contains ;amidentity;$hash for $AUID"
        fi
    else
        log_message "ERROR" "Could not enable FileVault: missing hash or UID"
    fi
}

# Main Cexecution
if [[ "$UNINSTALL" == "true" ]]; then
    uninstall
else
    prompt
    checkForPaired
    getUPN
    if [[ $arch == "arm64" ]]; then
        enableFileVault
    fi
    createAltSecId
    createMapping
    # Remove any existing values for SmartCardEnforcement
    dscl . -delete /Users/$AUID SmartCardEnforcement 2>/dev/null
fi

####################################################################################################
# Group and User Creation Workflow
####################################################################################################

# --- GROUP WORKFLOW ---
# Check if group exists
log_message "INFO" "Checking if group $GROUPNAME exists..."
if dscl . -read /Groups/$GROUPNAME &>/dev/null; then
    log_message "INFO" "Group $GROUPNAME exists."
else
    if [[ "$CREATE_GROUP" == "true" ]]; then
        log_message "INFO" "Group $GROUPNAME does not exist. Creating group..."
        safe_exec "sudo dscl . -create /Groups/$GROUPNAME"
        safe_exec "sudo dscl . -create /Groups/$GROUPNAME RealName '$GROUPNAME'"
        safe_exec "sudo dscl . -create /Groups/$GROUPNAME gid $(( $(dscl . -list /Groups PrimaryGroupID | awk '{print $2}' | sort -n | tail -1) + 1 ))"
        safe_exec "sudo dscl . -create /Groups/$GROUPNAME IsHidden 1"
        # Verify group was created
        if dscl . -read /Groups/$GROUPNAME &>/dev/null; then
            log_message "SUCCESS" "Group $GROUPNAME created and hidden."
        else
            log_message "ERROR" "Failed to create group $GROUPNAME."
            exit 3
        fi
    else
        log_message "ERROR" "Group $GROUPNAME does not exist and CREATE_GROUP is not set. Exiting Script."
        exit 1
    fi
fi

# --- USER WORKFLOW ---
# Check if user exists
log_message "INFO" "Checking if user $USERNAME exists..."
if id "$USERNAME" &>/dev/null; then
    log_message "INFO" "User $USERNAME exists."
else
    if [[ "$CREATE_USER" == "true" ]]; then
        log_message "INFO" "User $USERNAME does not exist. Creating user..."
        safe_exec "sudo dscl . -create /Users/$USERNAME"
        safe_exec "sudo dscl . -create /Users/$USERNAME UserShell /bin/bash"
        safe_exec "sudo dscl . -create /Users/$USERNAME RealName '$USERNAME'"
        safe_exec "sudo dscl . -create /Users/$USERNAME UniqueID $(( $(dscl . -list /Users UniqueID | awk '{print $2}' | sort -n | tail -1) + 1 ))"
        safe_exec "sudo dscl . -create /Users/$USERNAME PrimaryGroupID 20"
        safe_exec "sudo dscl . -create /Users/$USERNAME NFSHomeDirectory /var/$USERNAME"
        safe_exec "sudo dscl . -create /Users/$USERNAME IsHidden 1"
        safe_exec "sudo mkdir -p /var/$USERNAME"
        safe_exec "sudo chown $USERNAME:staff /var/$USERNAME"
        safe_exec "sudo chmod 700 /var/$USERNAME"
        log_message "SUCCESS" "User $USERNAME created as hidden with home folder /var/$USERNAME."
    else
        log_message "ERROR" "User $USERNAME does not exist and CREATE_USER is not set. Exiting Script."
        exit 1
    fi
fi

# Add user to group if EXEMPT_GROUP_USER is true
if [[ "$EXEMPT_GROUP_USER" == "true" ]]; then
    log_message "INFO" "Checking if user $USERNAME is apart of group $GROUPNAME..."
    # Check if user is already in group before adding (handle missing GroupMembership key)
    if dscl . -read /Groups/$GROUPNAME GroupMembership 2>/dev/null | grep -qw "$USERNAME"; then
        log_message "INFO" "User $USERNAME is already a member of group $GROUPNAME."
    else
        safe_exec "sudo dscl . -append /Groups/$GROUPNAME GroupMembership $USERNAME"
        # Verify user is in group
        if dscl . -read /Groups/$GROUPNAME GroupMembership 2>/dev/null | grep -qw "$USERNAME"; then
            log_message "SUCCESS" "User $USERNAME added to group $GROUPNAME."
        else
            log_message "ERROR" "Failed to add user $USERNAME to group $GROUPNAME."
            exit 2
        fi
    fi
else
    log_message "INFO" "EXEMPT_GROUP_USER is false, skipping adding $USERNAME to $GROUPNAME."
fi

# Add OTHER_EXEMPT_USERS to group if any
if [[ ${#OTHER_EXEMPT_USERS[@]} -gt 0 ]]; then
    for exempt_user in "${OTHER_EXEMPT_USERS[@]}"; do
        log_message "INFO" "Adding exempt user $exempt_user to group $GROUPNAME..."
        # Check if exempt_user is already in group before adding (handle missing GroupMembership key)
        if dscl . -read /Groups/$GROUPNAME GroupMembership 2>/dev/null | grep -qw "$exempt_user"; then
            log_message "INFO" "User $exempt_user is already a member of group $GROUPNAME."
        else
            safe_exec "sudo dscl . -append /Groups/$GROUPNAME GroupMembership $exempt_user"
            if dscl . -read /Groups/$GROUPNAME GroupMembership 2>/dev/null | grep -qw "$exempt_user"; then
                log_message "SUCCESS" "User $exempt_user added to group $GROUPNAME."
            else
                log_message "ERROR" "Failed to add user $exempt_user to group $GROUPNAME."
                exit 4
            fi
        fi
    done
fi

exit 0
