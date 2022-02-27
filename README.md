This project use ReactNative, backend use nodejs crawl cline website then show to app.

![alt text](./readme_pic/demo1.jpg)
![alt text](./readme_pic/demo2.jpg)
![alt text](./readme_pic/demo3.jpg)
![alt text](./readme_pic/demo4.jpg)


# Step : 
### Create project
>$ react-native init <projectName>
### open android ide, open project android, add line below in android/local.properties
> sdk.dir=C\:\\Users\\jerry\\AppData\\Local\\Android\\sdk
### activate Andrdoi simulator by Android Studio AVD manager, then Run command below
>$ set ANDROID_HOME=c:/Users/jerry/AppData/Local/Android/Sdk //windows    
>$ xport ANDROID_HOME=~/Library/Android/sdk //Linux  
>$ npm install  
>$ npm install -g react-native-cli  
>$ cd android && ./gradlew clean && ./gradlew :app:bundleRelease
>$ react-native run-android  

## backend 
> $cd parser 
> $npm install  
> $node cralwerRNBackend.js   

install dependency packages: cheerio request phatom  
request 是用來訪問網站用的，它能模擬 Client 訪問網站，設定訪問時帶的 Header  
cheerio 像jquery一樣用來解析網頁的  
phantomjs 來抓取js渲染的網頁內容  
script 說明 : 
>$node ./cheerioSample.js  
>$node ./phatomSample.js  
>$node ./cralwerRNBackend.js

### renew  ssl  ( ssl for free)
1. Run web server on http port 80, file download and rename 'acme-challenge' then put in static/.well-known/acme-challenge
2. use ssl for free site to access :   http://hosenmassage.ddns.net/.well-known/acme-challenge/4rJx8sdBNGcEzkkUTbi9OpeV5Xz0v7nTASy__LQXQiQ 
3. download certificate :  ca_bundle.crt, certificate.crt, private.key. 
4. append  'ca_bundle.crt' content below certificate.crt 

ref : 
https://www.sslforfree.com/create?domains=hosenmassage.ddns.net


# Step to make your app online at google play store
(ref : https://facebook.github.io/react-native/docs/signed-apk-android)
1.  use java keytool to janerate 'my-upload-key.keystore'
$ keytool -genkeypair -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
2. put  android/app/my-upload-key.keystore
2. android/gradle.properties
    MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
    MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
    MYAPP_UPLOAD_STORE_PASSWORD=**********
    MYAPP_UPLOAD_KEY_PASSWORD=**********

3. android/app/build.gradle
    ...
    android {
        ...
        defaultConfig { ... }
        signingConfigs {
            release {
                if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                    storeFile file(MYAPP_UPLOAD_STORE_FILE)
                    storePassword MYAPP_UPLOAD_STORE_PASSWORD
                    keyAlias MYAPP_UPLOAD_KEY_ALIAS
                    keyPassword MYAPP_UPLOAD_KEY_PASSWORD
                }
            }
        }
        buildTypes {
            release {
                ...
                signingConfig signingConfigs.release
            }
        }
    }
    ...
4. command to generate aab(Android App Bundle, like apk )
file will be locate  android/app/build/outputs/bundle/release/app.aab
$ D:\workspace\HosenMobileRN\android> .\gradlew bundleRelease

5. test app 
$ react-native run-android --variant=release

6. command output apk file :
$ D:\workspace\HosenMobileRN\android> .\gradlew assembleRelease
file will locate in : 
 D:\workspace\HosenMobileRN\android\app\build\outputs\apk\release

PS : change app icon 
android\app\src\main\res


# macOS iOS simulator setup.
### requirement 
    Install VMware 15.5.1 
    macOS Unlocker V3.0 for VMware Workstation, (https://techsprobe.com/download-macos-unlocker-install-on-vmware-workstation/)
    macOS Mojave ISO [Geekrar].iso (https://techsprobe.com/download-macos-mojave-10-14-iso-virtual-machine-images/)

## Run app in macOS VM.
    # install  Xcode (from app store)
    # clone the react-natvive project
    # Install nodejs
    # cd <Project>
    # npm install 
    # npm audit fix
    # sudo npm install -g react-native-cli
    # sudo gem install cocoapods 
    # cd ./ios  && pod install
    # cd .. && react-native run-ios --simulator="iPhone 8"
    ** re-build solution:  $rm -rf ios/build/; kill $(lsof -t -i:8081); react-native run-ios

