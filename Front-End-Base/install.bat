@ delete older files
del dist /F

@ windows exe pacakaging
electron-packager ./ myApp --platform=win32 --arch x64 --out dist --prune
@ asar packaging
asar pack ./dist/myApp-win32-x64/resources/app ./dist/myApp-win32-x64/resources/app.asar
@ delete source dir
del./dist/myApp-win32-x64/resources/app /F

@ create installer
node installer.js
