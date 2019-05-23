import 'package:flutter/material.dart';

class CustomAppBar extends AppBar {
  CustomAppBar({
    Widget leading,
    String title,
    PreferredSize bottom,
  }) : super(
          leading: leading,
          title: Text(title),
          elevation: 1.0,
          bottom: bottom,
        );
}
