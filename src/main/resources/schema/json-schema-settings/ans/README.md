# Generate VS Code JSON schema settings

This script generates, for each ANS version, a JSON file that contains settings to add to VS Code global settings in order to benefit from auto-completion and JSON schema validation when working with ANS.

## Pre-requisites

* [`jq`](https://jqlang.github.io/jq/)

## Run locally

```bash
./src/main/resources/schema/json-schema-settings/ans/generate-settings.sh
```
