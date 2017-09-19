import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');
import models = require('../modles');
import utils = require('../utils');

export = class DetailComp extends React.Component<models.Json.ArticleDetail, null>{
    render() {
        return (
            <ReactNative.Text>
                {'sucess'}
            </ReactNative.Text>
        );
    }
};