import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');

export class MenuComp extends fm.component.NavComp<{}, null> {
    render() {
        return (
            <fm.component.widget.EmptyView state="loading" />
        );
    }
}