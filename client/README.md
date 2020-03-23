# History

## packages upgrade
    # only update pubspec.lock
    flutter packages upgrade
    # can update pubspec.yaml
    flutter update-packages --force-upgrade
    
    
## run android
    #run
    flutter devices | egrep 'android' | tail -n +1 | awk -F • '{print $2}' | xargs -I X flutter run -d X
    
    
## run ios
    #ios
    open -a Simulator
    #run
    flutter devices | egrep 'ios' | tail -n +1 | awk -F • '{print $2}' | xargs -I X flutter run -d X
    
    # if err
    flutter clean
    cd ios
    pod deintegrate
    pod install
    
## run web
    # web config
    flutter channel beta
    flutter upgrade
    flutter config --enable-web
    # flutter create client
    # run
    flutter devices | egrep 'chrome' | tail -n +1 | awk -F • '{print $2}' | xargs -I X flutter run -d X

 
## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://flutter.dev/docs/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://flutter.dev/docs/cookbook)

For help getting started with Flutter, view our
[online documentation](https://flutter.dev/docs), which offers tutorials,
samples, guidance on mobile development, and a full API reference.
