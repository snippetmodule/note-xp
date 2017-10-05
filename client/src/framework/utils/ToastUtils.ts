
import rx = require('reactxp');
import React = require('react');

import { IToastMessage } from '../component/widget/ToastView';

let _keyCount = 0;

export let _showToastEvent = new rx.Types.SubscribableEvent<(message: IToastMessage) => void>();

export function showToastMessage(message: IToastMessage): void {
    const isForeground = rx.App.getActivationState() === rx.Types.AppActivationState.Active;
    if (message && isForeground) {
        _showToastEvent.fire(message);
    }
}

export function showToast(textMessage: string): void {
    showToastMessage({ key: 'key' + _keyCount++, textMessage });
}
