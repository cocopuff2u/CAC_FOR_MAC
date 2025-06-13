#!/bin/bash

# Directory containing PNG files (can be "." for current dir)
INPUT_DIR="/Users/keatscm/Desktop/Visual Studio Scripts/CAC_FOR_MAC/my-website/static/img/smartcard"
# Output directory (optional - same as input if left empty)
OUTPUT_DIR="$INPUT_DIR"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Loop through all .png files in the input directory
for png_file in "$INPUT_DIR"/*.png; do
    # Skip if no files match
    [ -e "$png_file" ] || continue

    # Get filename without extension
    base_name=$(basename "$png_file" .png)

    # Set output filename
    output_file="$OUTPUT_DIR/$base_name.webp"

    # Convert using ImageMagick
    convert "$png_file" "$output_file"

    echo "Converted: $png_file -> $output_file"
done
