# afm-library
Apps For Mankind Library
- dev branch is the main branch and cahanges will only refect here
- library can not use axios



# Start simulater for testing
- the app folder is for testing and not included in the buildso you can create compoents hear and open the simulater 

npm run ios 

or 

npm start -- --clear



# Error Checker 
npx tsc --noEmit


# Update 
git add .
git commit -m ""
git push
chnage version
npm publish


# stand alonre 
npm install -g eas-cli
eas build -p ios

npm eas build



# Adding to a new project
1. add .npmrc file to new project ( install will not work without it )
2. npm install @dhuntleypro/afm-library
3. 



# Create
1. Git - create repo (No README - add after -- step 4 will not work)
2. git clone <repo-name>
3. Open in VS
4. Run - npx create-expo-app@latest . -t
    1. Navigation (Typescript) - 
    2. no need to run yet
5. create src folder in source
    1. add : app | components | constants -- to src
    2. fix all the broken links missing /src/  in the app folder
        1. app
        2. theme
        3. compoennts 
6. Confirm running - npm run ios 
7. Creating Git Package
    1. npm install --save-dev rollup @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-babel @rollup/plugin-json
    npm install --save-dev @rollup/plugin-typescript

    2. Update package file
    3. npm run build
    4. npm login --scope=@NAMESPACE --auth-type=legacy --registry=https://npm.pkg.github.com
        1. Enter Git hub info with token key in notes or github


npm install --save-dev @babel/cli @babel/core @babel/preset-env
7. create .npmrc file
8. npm publish
9. If fail - update billing information in github and increate limit to $30
10. In new project : 
    1. login - npm login --scope=@NAMESPACE --auth-type=legacy --registry=https://npm.pkg.github.com
    2. npm i @dhuntleypro/afm-expo-components




# Remove watcher error --
watchman watch-del '/Users/huntley/Desktop/Production/Projects/ecom-expo-project' ; watchman watch-project '/Users/huntley/Desktop/Production/Projects/ecom-expo-project'

Creare file : .watchmanconfig
{
  "ignore_dirs": ["node_modules", "build"]
}

Increase limit 
ulimit -n 8192
