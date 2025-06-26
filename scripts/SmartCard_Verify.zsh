#!/bin/bash
#set -x

##################################################################################
# Smart Card Enforcement Check Script
####################################################################################
# Usage:
# This script checks the status of smart card enforcement on a macOS system then
# outputs the results based on the specified OUTPUT_MODE.
# It verifies the following conditions:
# 1. The existence of a exempt local user and group. (optional)
# 2. The membership of the user in the exempt group. (optional)
# 3. The value in the plist matches the group name. (optional)
# 4. The presence of TrustedAuthorities if configured. (optional).
# 5. The value in the plist matches the group name. (optional)
# 6. The smart card pairing status.

###################################################################################

# Set to false to skip checking for the plist file and related values (default is true)
# Only needed for exempt users/groups and when using AltSecurityIdentities
CHECK_PLIST=true
# Set to true to check for TrustedAuthorities in the plist (default is false)
# only needed when using checkCertificateTrust when enforcing smartcard policy
TrustedAuthorities=true
# Note: It does not check the contents of TrustedAuthorities, just if it contains any entries.

# Set to false to skip checking for exempt user/group (default is true)
CHECK_EXEMPT_USER_GROUP=true
# The local user exempted from smart card enforcement
LOCAL_USER="jamfadmin"
# The local group Exempted from smart card enforcement
LOCAL_GROUP="EXEMPT_GROUP"
# Note: the plist file must contain the group name in the NotEnforcedGroup key to
# ensure the users apart of that group are exempt from smart card enforcement.

# Output mode configuration
# Perfect for use in Jamf Pro, Intune, or other management systems
# Choose how to output the results of the script
# Options: jamf, intune, file, echo
# - jamf: Outputs in Jamf Pro XML format
# - intune: Outputs in Intune JSON format
# - file: Outputs to a specified file
# - echo: Outputs to standard output
OUTPUT_MODE="jamf"

# If OUTPUT_MODE is set to file, specify the output file path
OUTPUT_FILE="/var/log/smartcard_enforcement_status.log"

##################################################################################
# Static variables
##################################################################################
# The path to the plist file that contains the smart card enforcement settings
PLIST_PATH="/private/etc/SmartcardLogin.plist"
# The key in the plist that contains the group name for smart card enforcement
PLIST_KEY="NotEnforcedGroup"

##################################################################################
failures=()

# 1-3. Check for exempt user/group if enabled
if [ "$CHECK_EXEMPT_USER_GROUP" = true ]; then
    # 1. Check if local user exists
    if ! id "$LOCAL_USER" &>/dev/null; then
        failures+=("User Not Found")
    fi

    # 2. Check if local group exists
    if ! dscl . -read /Groups/"$LOCAL_GROUP" &>/dev/null; then
        failures+=("Group Not Found")
    fi

    # 3. Check if user is a member of the group
    if ! dseditgroup -o checkmember -m "$LOCAL_USER" "$LOCAL_GROUP" | grep -q "yes"; then
        failures+=("User Not In Group")
    fi
fi

# 4-6. Check for plist and related values if enabled
if [ "$CHECK_PLIST" = true ]; then
    # 4. Check if plist file exists
    if [ ! -f "$PLIST_PATH" ]; then
        failures+=("Plist Not Found")
    fi

    # 5. Check TrustedAuthorities if enabled and plist exists
    if [ "$TrustedAuthorities" = true ] && [ -f "$PLIST_PATH" ]; then
        TA_OUTPUT=$(defaults read "${PLIST_PATH%.*}" "TrustedAuthorities" 2>/dev/null)
        TA_OUTPUT_CLEAN=$(echo "$TA_OUTPUT" | tr -d '[:space:]')
        if [ -z "$TA_OUTPUT" ] || [ "$TA_OUTPUT_CLEAN" = "()" ] || [ "$TA_OUTPUT_CLEAN" = '("")' ]; then
            failures+=("TrustedAuthorities Not Present")
        fi
    fi

    # 6. Check if plist value matches group name (only if plist exists)
    if [ -f "$PLIST_PATH" ]; then
        PLIST_VALUE=$(defaults read "${PLIST_PATH%.*}" "$PLIST_KEY" 2>/dev/null)
        if [ "$PLIST_VALUE" != "$LOCAL_GROUP" ]; then
            failures+=("Plist Value Does Not Match Group")
        fi
    fi
fi

##################################################################################
# SmartCard pairing check
##################################################################################

# Get the currently logged in user (excluding loginwindow)
currentUser=$(scutil <<< "show State:/Users/ConsoleUser" | awk -F': ' '/[[:space:]]+Name[[:space:]]:/ { if ( $2 != "loginwindow" ) { print $2 }}')

paired=false

# Check if /etc/SmartcardLogin.plist exists and contains the required formatString
if [ -f /etc/SmartcardLogin.plist ]; then
    formatString=$(plutil -extract "AttributeMapping.dsAttributeString" raw /etc/SmartcardLogin.plist 2>/dev/null)
    if [ "$formatString" = "dsAttrTypeStandard:AltSecurityIdentities" ]; then
        paired=true
    fi
fi

# If not paired by plist, check for tokenidentity in AuthenticationAuthority for current user
if [ "$paired" = false ] && [ -n "$currentUser" ]; then
    tokenCheck=$(dscl /Local/Default read /Users/"$currentUser" AuthenticationAuthority 2>/dev/null | grep -c tokenidentity)
    if [ "$tokenCheck" -gt 0 ]; then
        paired=true
    fi
fi

if [ "$paired" = false ]; then
    failures+=("SmartCard Not Paired")
fi

# Prepare output
if [ ${#failures[@]} -eq 0 ]; then
    status="Smart Card Enforcement Ready"
    result_failures=""
else
    status="Smart Card Enforcement Not Ready"
    result_failures=$(IFS=, ; echo "${failures[*]}")
fi

# Output for different modes
case "$OUTPUT_MODE" in
    jamf)
        if [ -z "$result_failures" ]; then
            echo "<result>$status</result>"
        else
            echo "<result>$status ($result_failures)</result>"
        fi
        ;;
    intune)
        if [ -z "$result_failures" ]; then
            echo "{\"status\": \"$status\"}"
        else
            echo "{\"status\": \"$status\", \"failures\": \"${result_failures//\"/\\\"}\"}"
        fi
        ;;
    file)
        if [ -z "$result_failures" ]; then
            echo "$status" > "$OUTPUT_FILE"
        else
            echo "$status ($result_failures)" > "$OUTPUT_FILE"
        fi
        ;;
    echo)
        if [ -z "$result_failures" ]; then
            echo "$status"
        else
            echo "$status ($result_failures)"
        fi
        ;;
    *)
        echo "<result>Invalid OUTPUT_MODE specified</result>"
        ;;
esac

