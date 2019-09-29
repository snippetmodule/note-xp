import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class CachedImage extends StatelessWidget {
  final double width;
  final double height;
  final EdgeInsetsGeometry margin;
  final EdgeInsetsGeometry padding;
  final Color borderColor;
  final double borderWidth;
  final String backgroundImage;
  final double radius;

  final String url;
  final String placeHolder;

  CachedImage(
    this.url,
    this.placeHolder, {
    this.width = double.infinity,
    this.height = double.infinity,
    this.margin,
    this.padding,
    this.borderColor,
    this.borderWidth = 1.0,
    this.backgroundImage,
    this.radius = 2.0,
  }) : super();

  @override
  Widget build(BuildContext context) {
//    Decoration decoration;
//    if(backgroundImage != null && backgroundImage.isNotEmpty){
//      decoration = DecorationImage(
////                      image: AssetImage(backgroundImage),
////                      fit: BoxFit.cover,
////                    )
//    }
    return Container(
      height: height,
      width: width,
      margin: margin,
      padding: padding,
      decoration: BoxDecoration(
        border: borderColor == null
            ? null
            : Border.all(
                color: borderColor,
                width: borderWidth,
                style: BorderStyle.solid,
              ),
        borderRadius: BorderRadius.circular(radius),
        image: backgroundImage == null || backgroundImage.isEmpty
            ? null
            : DecorationImage(
                image: AssetImage(backgroundImage),
                fit: BoxFit.cover,
              ),
      ),
      child: ClipRRect(
          borderRadius: BorderRadius.circular(radius),
          child: url == null || url.isEmpty
              ? Image(image: AssetImage(placeHolder))
              : CachedNetworkImage(
                  imageUrl: url,
                  fit: BoxFit.cover,
                  placeholder: (context, url) => placeHolder == null ? null : Image(image: AssetImage(placeHolder)),
                )),
    );
  }
}
