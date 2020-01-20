# 建立專案 HosenMobileRN
react-native init HosenMobileRN

# 新增 android/local.properties
sdk.dir=C\:\\Users\\jerry\\AppData\\Local\\Android\\sdk

# 運行以下指令前必須先啟動 Android Studio 的 AVD manager ， 啟動 Andrdoi 模擬器 
$react-native run-android

# 打包上架的 app (https://facebook.github.io/react-native/docs/signed-apk-android)
1. 用java keytool 產生 my-upload-key.keystore
$ keytool -genkeypair -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

2. 放置於 android/app/my-upload-key.keystore
3. android/gradle.properties
    MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
    MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
    MYAPP_UPLOAD_STORE_PASSWORD=**********
    MYAPP_UPLOAD_KEY_PASSWORD=**********

4. android/app/build.gradle
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
5. 以下指令產生 aab(Android App Bundle, like apk 檔案會在 android/app/build/outputs/bundle/release/app.aab
$ android/gradlew bundleRelease

6. 測試 $ react-native run-android --variant=release

# 輸出 apk 檔案
$ android/gradlew assembleRelease

# 檔案會在
 android\app\build\outputs\apk\release

# PS : 更改 app 的 icon 
android\app\src\main\res