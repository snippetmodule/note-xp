
import rx = require('reactxp');
import React = require('react');

const ID = 'toast';

export type ToastOption = {
    getAnchor: () => React.Component<any, any>;
    content?: string;
    render?: (anchorPosition: rx.Types.PopupPosition, anchorOffset: number,
        popupWidth: number, popupHeight: number) => JSX.Element;
}
let autoDismissTimeout: number = 0;
export let show = (option: ToastOption) => {
    if (!option.content && !option.render) {
        return;
    }
    if (autoDismissTimeout > 0) {
        window.clearTimeout(autoDismissTimeout);
        autoDismissTimeout = 0;
    }
    if (option.content) {
        option.render = (anchorPosition: rx.Types.PopupPosition, anchorOffset: number,
            popupWidth: number, popupHeight: number): JSX.Element => {
            return rx.createElement(rx.Text, null, option.content);
        }
    }
    let popupOptions: rx.Types.PopupOptions = {
        getAnchor: option.getAnchor,
        renderPopup: option.render,
        positionPriorities: ['bottom'],
    };
    rx.Popup.dismiss(ID);
    rx.Popup.show(popupOptions, ID, 500);
    autoDismissTimeout = window.setTimeout(() => {
        dismiss();
    }, 1500)
    // rx.Popup.autoDismiss(ID, 1500);
}
export let dismiss = () => {
    rx.Popup.dismiss(ID);
}