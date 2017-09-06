
import rx = require('reactxp');
import React = require('react');

import { ToastMessage } from '../component/widget/ToastView';

let _keyCount = 0;

export let _showToastEvent = new rx.Types.SubscribableEvent<(message: ToastMessage) => void>();

export function showToastMessage(message: ToastMessage): void {
    const isForeground = rx.App.getActivationState() === rx.Types.AppActivationState.Active;
    if (message && isForeground) {
        _showToastEvent.fire(message);
    }
}

export function showToast(textMessage: string): void {
    showToastMessage({ key: 'key' + _keyCount++, textMessage });
}

