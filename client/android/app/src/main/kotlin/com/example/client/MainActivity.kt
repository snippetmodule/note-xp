package com.example.client

import android.os.Bundle

import io.flutter.app.FlutterActivity
import io.flutter.plugins.GeneratedPluginRegistrant
import com.crashlytics.android.Crashlytics
import io.fabric.sdk.android.Fabric

class MainActivity: FlutterActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    Fabric.with(this, Crashlytics())
    GeneratedPluginRegistrant.registerWith(this)
  }
}
