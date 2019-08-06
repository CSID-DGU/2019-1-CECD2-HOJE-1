# delete older files
Remove-Item -Recurse ./dist -Force

# windows exe pacakaging
electron-packager ./ myApp --platform=win32 --arch x64 --out dist --prune
# asar packaging
asar pack ./dist/myApp-win32-x64/resources/app ./dist/myApp-win32-x64/resources/app.asar
# delete source dir
Remove-Item -Recurse ./dist/myApp-win32-x64/resources/app -Force

# create installer
node installer.js
