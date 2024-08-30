# afm-library
Apps For Mankind Library



# Clean 
npx tsc --noEmit


# Update 
git add .
git commit -m ""
git push
chnage version
npm publish



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
6. 
2. npm install --save-dev @babel/cli @babel/core @babel/preset-env
3. Update package file & Babel file
4. npm run build
5. npm login --scope=@NAMESPACE --auth-type=legacy --registry=https://npm.pkg.github.com
6. Enter Git hub info with token key in notes or github
7. create .npmrc file
8. npm publish
9. If fail - update billing information in github and increate limit to $30
10. In new project : 
    1. login - npm login --scope=@NAMESPACE --auth-type=legacy --registry=https://npm.pkg.github.com
    2. npm i @dhuntleypro/afm-expo-components


