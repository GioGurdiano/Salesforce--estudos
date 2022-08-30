# SFRA Training Base Repo
=================


# Requirements
------------

1. NodeJS version 8.x.x (to install and manage NodeJS see https://github.com/coreybutler/nvm-windows for Windows or https://github.com/creationix/nvm for MacOS/Linux)
2. Yarn (install it globally with `npm install --global yarn`)


# Getting Started
---------------

1. Clone this repository to your local machine and follow instructions here to configure it properly: 
https://learninghub.osf.digital/mod/page/view.php?id=1792
3. Run `yarn install` to install all of the local dependancies
4. Run `yarn run webpack:dev` to start watching for file changes and compile JS and SCSS files when that happens
5. Run `yarn run lint` to run all the code linters or run:
    * `yarn run lint:js-server` to run only the server side JS linter
    * `yarn run lint:js-client` to run only the client side JS linter
    * `yarn run lint:scss` to run only the SCSS linter

5. Create dw.json file in the root of the project:
{
    "hostname": "your-sandbox-hostname.demandware.net",
    "username": "yourlogin",
    "password": "yourpwd",
    "code-version": "version_to_upload_to"
}

# Uploading your code
Install the Prophet extension into Visual Studio Code. It requires a valid dw.json file at the root that is configured for the sandbox to upload.

# Debugging
Create a launch.json file inside of a hidden directory named .vscode:
```
{
    "configurations": [
        {
            "type": "prophet",
            "request": "launch",
            "name": "SFRA Debugger",
            "hostname": "your-sandbox-hostname.demandware.net",
            "username": "yourlogin",
            "password": "yourpwd",
            "codeversion": "version_to_upload_to",
            "cartridgeroot": "full_path_to_local_folder",
            "workspaceroot": "${workspaceRoot}"
        }
    ]
 }
```
 

# Recommended tools
-----------------

Visual Studio Code is recommended to be used along with the following plugins:

1. [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode) - To help you detect and fix quality issues as you write code. Like a spell checker, SonarLint squiggles flaws so they can be fixed before committing code.
2. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - To help you easily format and prettify your code (make sure you set `"prettier.tabWidth": 4` before you start using it)
3. [Document This](https://marketplace.visualstudio.com/items?itemName=joelday.docthis) - To help you with writing JSDoc for your code
    * CMD + Shift + P -> Format Document
    * Select the text you want to Prettify and CMD + Shift + P -> Format Selection
4. [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) - To help you autocomplete paths and filenames
5. [vscode-icons](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons) - To make your VSC explorer a bit nicer


Submitting a pull request
-------------------------

1. Create a feature branch from the develop branch (`feature/TASK-NR`)
2. Make sure all your comits have proper commit message (`[TASK-NR] Commit description`)
2. When creating your pull request make sure it has:
    * A proper title (use the following naming convention `[TASK-NR] Pull request title`)
    * A brief description of what the pull request does
    * (optional) Screen shots
3. Your code should pass the automation process:
    * Lint your code: `yarn run lint` should run withouth errors
    * Build your code: `yarn run webpack:dev` should run withouth errors

# Why the code structure here is different from the official one at https://github.com/SalesforceCommerceCloud
1. Our cartridges structure make it easier to work with webpack
2. Our cartridges structure is easier to organize and makes more sense for SG developers
3. Github structure forces that each dev clones code in exactly the same way, same structure, same folders or it might break webpack
4. Github structure is prone to dependency inconsistencies since each cartridge has its own repo and package.json
