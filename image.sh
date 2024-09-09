#!/bin/bash

# Hard-coded input and output folders
INPUT_FOLDER="./photos"
OUTPUT_FOLDER="./assets"

# Check if input folder exists
if [ ! -d "$INPUT_FOLDER" ]; then
  echo "Input folder does not exist!"
  exit 1
fi

# Create the output folder if it doesn't exist
if [ ! -d "$OUTPUT_FOLDER" ]; then
  mkdir -p "$OUTPUT_FOLDER"
fi

# Loop through all image files in the input folder
for img in "$INPUT_FOLDER"/*.{jpg,jpeg,png}; do
  # Check if the file exists
  if [ -f "$img" ]; then
    # Get the base filename without the folder path
    filename=$(basename "$img")
    
    # Resize the image to 50% of its original size and save it to the output folder
    convert "$img" -resize 50% "$OUTPUT_FOLDER/$filename"
    
    echo "Resized $filename and saved to $OUTPUT_FOLDER"
  fi
done

echo "Image resizing completed."
