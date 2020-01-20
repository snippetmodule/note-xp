import 'dart:async';

import 'package:flutter/material.dart';

const MAX_COUNT = 0x7fffffff;

///
/// Item的点击事件
///
typedef void OnBannerItemClick<T>(int position);

///
/// 自定义ViewPager的每个页面显示
///
typedef Widget CustomBuild<T>(int position);

class BannerWidget<T> extends StatefulWidget {
  final double height;
  final List<T> datas;
  final int duration;
  final double pointRadius;
  final Color selectedColor;
  final Color unSelectedColor;
  final bool isHorizontal;
  final bool isShowCircleDot;

  final OnBannerItemClick bannerPress;
  final CustomBuild build;

  BannerWidget(this.height, this.datas,
      {Key key,
      this.duration = 5000,
      this.pointRadius = 3.0,
      this.selectedColor = Colors.grey,
      this.unSelectedColor = Colors.white,
      this.bannerPress,
      this.isHorizontal = true,
      this.isShowCircleDot = true,
      @required this.build})
      : super(key: key);

  @override
  BannerState createState() {
    return BannerState();
  }
}

class BannerState extends State<BannerWidget> {
  Timer timer;
  int selectedIndex = 0;
  PageController controller;

  @override
  void initState() {
    double current = widget.datas.isNotEmpty ? (MAX_COUNT / 2) - ((MAX_COUNT / 2) % widget.datas.length) : 0.0;
    controller = PageController(initialPage: current.toInt());
    _initPageAutoScroll();
    super.initState();
  }

  _initPageAutoScroll() {
    start();
  }

  @override
  void didUpdateWidget(BannerWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
  }

  start() {
    stop();
    timer = Timer.periodic(Duration(milliseconds: widget.duration), (timer) {
      if (widget.datas.isNotEmpty && controller != null && controller.page != null) {
        controller.animateToPage(controller.page.toInt() + 1, duration: Duration(milliseconds: 300), curve: Curves.linear);
      }
    });
  }

  stop() {
    timer?.cancel();
    timer = null;
  }

  @override
  void dispose() {
    stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: widget.height,
      child: Stack(
        children: <Widget>[
          getViewPager(),
          widget.isShowCircleDot
              ? Align(
                  alignment: Alignment.bottomCenter,
                  child: Container(
                    padding: EdgeInsets.all(6.0),
                    child: getBannerTextInfoWidget(),
                  ),
                )
              : Container(),
        ],
      ),
    );
  }

  Widget getViewPager() {
    return PageView.builder(
      physics: widget.isShowCircleDot ? null : NeverScrollableScrollPhysics(),
      itemCount: widget.datas.isNotEmpty ? MAX_COUNT : 0,
      controller: controller,
      scrollDirection: widget.isHorizontal ? Axis.horizontal : Axis.vertical,
      onPageChanged: onPageChanged,
      itemBuilder: (context, index) {
        return InkWell(
            onTap: () {
              if (widget.bannerPress != null) widget.bannerPress(selectedIndex % widget.datas.length);
            },
            child: widget.build(index % widget.datas.length));
      },
    );
  }

  Widget getBannerTextInfoWidget() {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: circle(),
    );
  }

  List<Widget> circle() {
    List<Widget> circle = [];
    for (var i = 0; i < widget.datas.length; i++) {
      circle.add(Container(
        margin: EdgeInsets.all(4.0),
        width: widget.pointRadius * 2,
        height: widget.pointRadius * 2,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: selectedIndex == i ? widget.selectedColor : widget.unSelectedColor,
        ),
      ));
    }
    return circle;
  }

  onPageChanged(int index) {
    selectedIndex = index % widget.datas.length;
    setState(() {});
  }
}
