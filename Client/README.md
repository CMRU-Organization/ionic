Ionic 4 Start Theme (v1.0.0)
==========
**Ionic 4 start theme** experiencing the best of new features about this new and definitive release: Angular 7 + Ionic 4 final. 

* Angular 7
* @ionic/angular 4.0.0
* Ionic Native 5
* Ionic 4 Components/API Samples
* 6 Page Samples (8 with modals)
* 2 Page modals
* 2 Components

<img src="https://github.com/ionictheme/ionic4-start-theme/blob/master/src/assets/img/Ionic4_Start_Theme-preview01.png" width="128" align="left"><img src="https://github.com/ionictheme/ionic4-start-theme/blob/master/src/assets/img/Ionic4_Start_Theme-preview02.png" width="128" align="left"><img src="https://github.com/ionictheme/ionic4-start-theme/blob/master/src/assets/img/Ionic4_Start_Theme-preview03.png" width="128" align="left"><img src="https://github.com/ionictheme/ionic4-start-theme/blob/master/src/assets/img/Ionic4_Start_Theme-preview04.png" width="128" align="left"><img src="https://github.com/ionictheme/ionic4-start-theme/blob/master/src/assets/img/Ionic4_Start_Theme-preview05.png" width="128" align="left"><img src="https://github.com/ionictheme/ionic4-start-theme/blob/master/src/assets/img/Ionic4_Start_Theme-preview06.png" width="128" align="left">

<br><br><br><br><br><br><br>

---

Requirements
------------

* Node 8.13+
* Npm 6+
* Ionic CLI 4.5

Installing
------------

```
$ npm install
$ ionic serve -l
```

More about here: [Ionic 4 Start Theme (ionictheme.com)](https://ionictheme.com/ionic4-start-theme-free)

___

## Know Ionic 3 Start Theme

* [Ionic 3 Start Theme (Github)](https://github.com/ionictheme/ionic3-start-theme)

## Know Our paid themes

* [foodIonic 2 - Ionic 4 Restaurant and Food Order Theme](https://ionictheme.com/foodionic2-ionic4-restaurant-food-order-theme)
* [ionBooking 2 - Ionic 4 Hotel Booking Theme](https://ionictheme.com/ionbooking2-ionic4-hotel-booking-theme)
* [ionBooking - Ionic 3 Hotel Booking Theme](https://ionictheme.com/ionbooking-ionic3-hotel-booking-theme)
* [ionBooking Lite - Ionic 3 Hotel Booking Theme](https://ionictheme.com/ionbooking-lite-ionic3-hotel-booking-theme)
* [ionProperty - Ionic 3 Real Estate Properties Theme](https://ionictheme.com/ionproperty-ionic3-realestate-properties-theme)
* [foodIonic - Ionic 3 Restaurant and Food Order Theme](https://ionictheme.com/foodionic-ionic3-restaurant-food-order-theme)
* [tripIonic - Ionic 3 flights cruises trains booking theme](https://ionictheme.com/tripionic-ionic3-flights-cruises-trains-booking-theme)
* [fireIonic - Ionic 3 Firebase Starter Kit](https://ionictheme.com/fireionic-ionic3-firebase-starter-kit)
* [Travel Bundle - Ionic 3 ionBooking and tripIonic Themes](https://ionictheme.com/travelbundle-ionic3-themes)


## Visit our official channels:

**Website:**
[https://ionictheme.com](https://ionictheme.com)
<br>
**Twitter:**
[https://twitter.com/ionictheme](https://twitter.com/ionictheme)
<br>
**Facebook Page:**
[https://www.facebook.com/ionicthemecom](https://www.facebook.com/ionicthemecom)



***run cordova browser ********
ionic cordova run browser
https://forum.ionicframework.com/t/uncaught-in-promise-cordova-not-available-problem-why/122171




***build apk ***

https://forum.ionicframework.com/t/build-done-but-could-not-see-apk-why/120603/2
You will not see your APK File unless you build it with Cordova Android not with Ionic Serve.

If you didnt add your Android Platform please do:

ionic cordova platform add android
after that you have to do this for a debug release:

ionic cordova build android
or this for a production release:

ionic cordova build android --prod --release
After that you will find your APK file in this path:

platforms\android\build\outputs\apk

Please Note that it will take time depend on your envrioment.
So wait until it says it is finished.
It will also tell you the location of your APK file at the end.

****
check require
Run ionic cordova requirements please.

install before
android studio first then set path

ANDROID_HOME
C:\Users\vit\AppData\Local\Android\Sdk

if require check failed for JDK 1.8 or greater
https://www.oracle.com/java/technologies/javase-jdk8-downloads.html

You should set it with C:\Program Files\Java\jdk1.8.0_12.
\bin is not required.

https://nextflow.in.th/2017/solve-error-could-not-find-an-installed-version-of-gradle-either-in-android-studio-thai/

if error
No installed build tools found. Install the Android build tools version 19.1.0 or higher

****