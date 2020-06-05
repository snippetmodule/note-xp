import 'package:client/generated/l10n.dart';
import 'package:flutter/material.dart';

class FatalErrorWidget extends StatelessWidget {
  final FlutterErrorDetails details;
  final bool showStacktrace;
  final String customTitle;
  final String customDescription;

  const FatalErrorWidget(
      {Key key,
        this.details,
        this.showStacktrace,
        this.customTitle,
        this.customDescription})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    var title = S.of(context)?.fatalErrTitle;
    if (customTitle != null) {
      title = customTitle;
    }

    var description = S.of(context)?.fatalErrDes;
    if (showStacktrace) {
      description += S.of(context)?.fatalErrHint;
    }

    if (customDescription != null) {
      description = customDescription;
    }

    return Scaffold(
        body: Container(
            margin: EdgeInsets.all(20),
            child: Center(
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.announcement,
                        color: Colors.red,
                        size: 40,
                      ),
                      Text(
                        title,
                        style: TextStyle(color: Colors.black, fontSize: 25),
                        textAlign: TextAlign.center,
                      ),
                      Padding(
                        padding: EdgeInsets.only(top: 10),
                      ),
                      Text(
                        description,
                        textAlign: TextAlign.center,
                      ),
                      Padding(
                        padding: EdgeInsets.only(top: 10),
                      ),
                      _getStackTraceWidget()
                    ]))));
  }

  Widget _getStackTraceWidget() {
    if (showStacktrace) {
      List<String> stackTrace = details.stack.toString().split("\n");
      return SizedBox(
        height: 200.0,
        child: ListView.builder(
          padding: EdgeInsets.all(8.0),
          itemCount: stackTrace.length,
          itemBuilder: (BuildContext context, int index) {
            String line = stackTrace[index];
            if (line?.isNotEmpty == true) {
              return Text(line);
            } else {
              return SizedBox();
            }
          },
        ),
      );
    } else {
      return Container();
    }
  }
}