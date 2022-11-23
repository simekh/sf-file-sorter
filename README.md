# sf-file-sorter

**This is build entirely as a hobby project to help with my own work. I, the creator, takes no responsibility for anything that might or might not happen as a result of using this beautiful piece of code.**

## Introduction
A plugin build for Salesforce sfdx-projects created to create folders and move Salesforce .cls and -cls-meta-xml files.

The crawler will iterate all files and lines located in "force-app/main/default/Classes/" and look a comment  the keyword "//\__directory__/yourDesiredPath/[withOptional/Subfolders/]". If found, it will move the .cls and .cls-meta.xml file to the specified destination and continue.

## Prerequisites
You need to add the comment "//\_\_directory__/yourDesiredPath/[withOptional/Subfolders/]" to all of our Salesforce classes that you desire to be sorted on your local machine.

## How to Use
Run the script by running "npx sf-file-sorter" in the root of our sfdx project. 
