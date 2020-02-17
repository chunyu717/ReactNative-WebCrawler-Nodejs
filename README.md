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

# 輸出 apk 檔案
$ D:\workspace\HosenMobileRN\android> .\gradlew assembleRelease

  - 檔案會在
 D:\workspace\HosenMobileRN\android\app\build\outputs\apk\release

# PS : 更改 app 的 icon 
android\app\src\main\res



iOS step
------------------------------------------------------
# requirement 
using vmware 15.5.1, 
macOS Unlocker V3.0 for VMware Workstation,  
macOS Mojave ISO [Geekrar].iso
instann nodejs

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

Manually Verify Domain (HTTP Server)
If you do not have your FTP information then follow the following steps to verify domain ownership manually. The server will need to be on port 80 if HTTP (or port 80 open and forwarding to 443 if HTTPS). If your web server is not listening on port 80 then you will need to temporarily listen on port 80 or forward port 80 to the port for the web server.

1. Get domain verification files by clicking the button below
2. Upload domain verification files to domain (Need help?)
3. Download your free ssl certificate

    Retry Manual Verification


Upload Verification Files
1. Download the following verification files by clicking on each link below
    Download File #1
2. Create a folder in your domain named ".well-known" if it does not already exist. If you use Windows you may have to add a dot at the end of the folder name in order to create a folder with a dot at the beginning.
3. Create another folder in your domain under ".well-known" named "acme-challenge" if it does not already exist
4. Upload the downloaded files to the "acme-challenge" folder
5. Verify successful upload by visiting the following links in your browser
    http://hosenmassage.ddns.net/.well-known/acme-challenge/4rJx8sdBNGcEzkkUTbi9OpeV5Xz0v7nTASy__LQXQiQ
6. If the files do not show random alphanumeric characters or shows an error then recheck that you are uploading in the correct place. Also try viewing the page source (Right-click then click "view page source") of the above links to make sure nothing else shows up but the verification file contents. If you use IIS then you may have to change your server config so that files without an extension (or the wildcard MIME type) serves as text/plain. Contact your host if you are unsure.
7. Click Download SSL Certificate below.
    Download SSL Certificate
