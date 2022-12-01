# sf-file-sorter

**This is build entirely as a hobby project to help with my own work. I, the creator, takes no responsibility for anything that might or might not happen as a result of using this beautiful piece of code.**

## Introduction

A plugin built for Salesforce sfdx-projects that moves Salesforce .cls and -cls-meta-xml files in to predefined folders.

## Prerequisites

You need to add .sf-file-sorter/config.json to your project root folder and populate the config with a mapping of the relative paths of files you want to move and the corresponding relative destination. The config files is expected to have a key with name "destination-by-source-file-path" with an array of objects as value. The array takes objects where the key is the source file relative path and the value is the destination relative directory.

_Example Config.json_

```json
{
  "destination-by-source-file-path": [
    { "force-app/main/default/classes/AccountService.cls": "force-app/main/default/classes/Services" },
    { "force-app/main/default/classes/AccountServiceImpl.cls": "force-app/main/default/classes/Services" },
    { "force-app/main/default/classes/AccountsSelector.cls": "force-app/main/default/classes/Selectors" },
    { "force-app/main/default/classes/Accounts": "force-app/main/default/classes/Domains" }
  ]
}
```

## How to Use

Run the script by running "npx sf-file-sorter" in the root of our sfdx project.
