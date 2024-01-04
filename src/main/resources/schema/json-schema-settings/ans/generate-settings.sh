#!/bin/bash

ANS_SCHEMA_DIRECTORY="src/main/resources/schema/ans"
OUTPUT_JSON_SCHEMA_SETTINGS_DIRECTORY="src/main/resources/schema/json-schema-settings/ans"


for ANS_SCHEMA_VERSION_DIRECTORY in "$ANS_SCHEMA_DIRECTORY"/*; do
  if [ -d "$ANS_SCHEMA_VERSION_DIRECTORY" ]; then
    ANS_SCHEMA_VERSION=$(basename "$ANS_SCHEMA_VERSION_DIRECTORY")
    find $ANS_SCHEMA_VERSION_DIRECTORY -maxdepth 1 -type f -name "*.json" ! -name "*operation.json" -print0 | sort -z | xargs -r0 \
        jq -c -n \
            --arg ans_schema_version "$ANS_SCHEMA_VERSION" \
            --arg ans_schema_version_directory "$ANS_SCHEMA_VERSION_DIRECTORY" '[
                inputs |
                    {
                        fileMatch: [
                            input_filename | sub(".json"; "-fixture*.json") | sub($ans_schema_version_directory; "tests/fixtures/schema/" + $ans_schema_version),
                            input_filename | sub($ans_schema_version_directory + "/"; "**.")
                        ],
                        url: .id
                    }
            ]' | sort -z | jq . > $OUTPUT_JSON_SCHEMA_SETTINGS_DIRECTORY/$ANS_SCHEMA_VERSION.json
  fi
done