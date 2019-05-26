import 'package:client/bloc/locale/bloc.dart';
import 'package:client/bloc/main/main_tab/bloc.dart';
import 'package:client/config/application.dart';
import 'package:client/generated/i18n.dart';
import 'package:client/ui/main/more/more_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:client/ui/home/home.dart';

class MainScreen extends StatelessWidget {
  final MainTabBloc _tabBloc = MainTabBloc();

  void _onSelectTab(int index) {
    TabItemType tabType = TabItemType.home;
    switch (index) {
      case 0:
        tabType = TabItemType.home;
        break;
      case 1:
        tabType = TabItemType.list;
        break;
      case 2:
        tabType = TabItemType.personal;
        break;
      case 3:
        tabType = TabItemType.more;
        break;
    }
    _tabBloc.dispatch(MainTabEvent(tab: tabType));
  }

  BottomNavigationBarItem _buildItem(IconData icon, String text,
      bool isSelected) {
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

  Widget _buildBody(TabItemType selectedTab) {
    switch (selectedTab) {
      case TabItemType.home:
        return MyHomePage();
      case TabItemType.list:
        return MyHomePage();
      case TabItemType.personal:
        return MyHomePage();
      case TabItemType.more:
        return MoreWidget();
    }
    return null;
  }

  Widget _buildBottomNavigationBar(BuildContext context,
      TabItemType selectedTab) {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      items: [
        _buildItem(Icons.drive_eta, S
            .of(context)
            .main_tab_home,
            selectedTab == TabItemType.home),
        _buildItem(Icons.list, S
            .of(context)
            .main_tab_list,
            selectedTab == TabItemType.list),
        _buildItem(Icons.account_circle, S
            .of(context)
            .main_tab_personal,
            selectedTab == TabItemType.personal),
        _buildItem(Icons.dashboard, S
            .of(context)
            .main_tab_more,
            selectedTab == TabItemType.more),
      ],
      onTap: _onSelectTab,
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<MainTabEvent, MainTabState>(
      bloc: _tabBloc,
      builder: (BuildContext context, MainTabState state) {
        return Scaffold(
          body: _buildBody(state.tab),
          bottomNavigationBar: _buildBottomNavigationBar(context, state.tab),
        );
      },
    );
  }
}