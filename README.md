# 建立專案 HosenMobileRN
$ react-native init HosenMobileRN

# 新增 android/local.properties
sdk.dir=C\:\\Users\\jerry\\AppData\\Local\\Android\\sdk

# 運行以下指令前必須先啟動 Android Studio 的 AVD manager ， 啟動 Andrdoi 模擬器 
$ react-native run-android

# 打包上架的 app (https://facebook.github.io/react-native/docs/signed-apk-android)
1. 用java keytool 產生 my-upload-key.keystore
$ keytool -genkeypair -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

  放置於 android/app/my-upload-key.keystore
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
4. 以下指令產生 aab(Android App Bundle, like apk 檔案會在 android/app/build/outputs/bundle/release/app.aab
$ D:\workspace\HosenMobileRN\android> .\gradlew bundleRelease

5. 測試 $ react-native run-android --variant=release

6. 輸出 apk 檔案
$ D:\workspace\HosenMobileRN\android> .\gradlew assembleRelease
  - 檔案會在
 D:\workspace\HosenMobileRN\android\app\build\outputs\apk\release

# PS : 更改 app 的 icon 
android\app\src\main\res


macOS iOS simulator setup.
------------------------------------------------------
# requirement 
    Install VMware 15.5.1 
    macOS Unlocker V3.0 for VMware Workstation, (https://techsprobe.com/download-macos-unlocker-install-on-vmware-workstation/)
    macOS Mojave ISO [Geekrar].iso (https://techsprobe.com/download-macos-mojave-10-14-iso-virtual-machine-images/)

# Run app in macOS VM.
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


更新 ssl 步驟 ( ssl for free)
------------------------------------------------------
1. 跑起來 web server on http port 80, 把下載的 file rename acme-challenge 放在 static/.well-known/acme-challenge
2. 透過官方存取  http://hosenmassage.ddns.net/.well-known/acme-challenge/4rJx8sdBNGcEzkkUTbi9OpeV5Xz0v7nTASy__LQXQiQ 
3. 下載憑證 ca_bundle.crt, certificate.crt, private.key. 
4. 以此專案來說 要把 ca_bundle.crt 的內容 append 到 certificate.crt 下面. 

官方描述步驟如下 : 
https://www.sslforfree.com/create?domains=hosenmassage.ddns.net
