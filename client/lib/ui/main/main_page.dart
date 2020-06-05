import 'package:client/core/bloc/main/bloc.dart';
import 'package:client/generated/l10n.dart';
import 'package:client/ui/home//home.dart';
import 'package:client/ui/home/more/more_widget.dart';
import 'package:client/core/widget/event_log_widget.dart';
import 'package:client/core/utils/event_log.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class MainPage extends StatelessWidget {
  final MainTabBloc _tabBloc = MainTabBloc();

  void _onSelectTab(int index) {
    MainTabItemType tabType = MainTabItemType.home;
    switch (index) {
      case 0:
        tabType = MainTabItemType.home;
        break;
      case 1:
        tabType = MainTabItemType.list;
        break;
      case 2:
        tabType = MainTabItemType.personal;
        break;
      case 3:
        tabType = MainTabItemType.more;
        break;
    }
    _tabBloc.add(MainTabEvent(tabType));
  }

  BottomNavigationBarItem _buildItem(IconData icon, String text, bool isSelected) {
    return BottomNavigationBarItem(
      icon: Icon(
        icon,
        color: isSelected ? Colors.orange : Colors.grey,
      ),
      title: Text(
        text,
        style: TextStyle(
          color: isSelected ? Colors.orange : Colors.grey,
        ),
      ),
    );
  }

  Widget _buildBody(MainTabItemType selectedTab) {
    switch (selectedTab) {
      case MainTabItemType.home:
        return MyHomePage();
      case MainTabItemType.list:
        return MyHomePage();
      case MainTabItemType.personal:
        return MyHomePage();
      case MainTabItemType.more:
        return MoreWidget();
    }
    return null;
  }

  Widget _buildBottomNavigationBar(BuildContext context, MainTabItemType selectedTab) {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      items: [
        _buildItem(Icons.drive_eta, S.of(context).main_tab_home, selectedTab == MainTabItemType.home),
        _buildItem(Icons.list, S.of(context).main_tab_list, selectedTab == MainTabItemType.list),
        _buildItem(Icons.account_circle, S.of(context).main_tab_personal, selectedTab == MainTabItemType.personal),
        _buildItem(Icons.dashboard, S.of(context).main_tab_more, selectedTab == MainTabItemType.more),
      ],
      onTap: _onSelectTab,
    );
  }

  @override
  Widget build(BuildContext context) {
    return EventLogWidget(
      screenName: EventConstants.EVENT_TAB_DOC,
      child: BlocBuilder<MainTabBloc, MainTabState>(
          bloc: _tabBloc,
          builder: (BuildContext context, MainTabState state) {
            return Scaffold(
              body: _buildBody(state.tab),
              bottomNavigationBar: _buildBottomNavigationBar(context, state.tab),
            );
          }),
    );
  }
}
