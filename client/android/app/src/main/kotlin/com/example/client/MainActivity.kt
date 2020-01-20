package com.example.client

import androidx.annotation.NonNull;
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugins.GeneratedPluginRegistrant
import com.crashlytics.android.Crashlytics
import io.fabric.sdk.android.Fabric

class MainActivity: FlutterActivity() {
    override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
 Fabric.with(this, Crashlytics())
        GeneratedPluginRegistrant.registerWith(flutterEngine);
    }
}
