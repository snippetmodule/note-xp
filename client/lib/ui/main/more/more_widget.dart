import 'package:client/ui/widget/custom_app_bar.dart';
import 'package:flutter/material.dart';
import 'package:client/generated/i18n.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:client/bloc/auth/bloc.dart';
import './logined_widget.dart';
import './unlogin_widget.dart';
import 'package:client/ui/widget/event_log_widget.dart';
import 'package:client/utils/event_log.dart';

class MoreWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return EventLogWidget(
        screenName: EventConstants.EVENT_TAB_MORE,
        child: Scaffold(
          appBar: CustomAppBar(title: S.of(context).main_tab_more),
          body: BlocBuilder<AuthEvent, AuthState>(
              bloc: BlocProvider.of<AuthBloc>(context),
              builder: (BuildContext context, AuthState state) {
                if (state is InitAuthState) {
                  return Container();
                }
                if (state is LoginedAuthState) {
                  return LoginedWidget();
                }
                if (state is UnLoginAuthState) {
                  return UnloginWidget();
                }
              }),
        ));
  }
}
