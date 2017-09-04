import rx = require('reactxp');
import React = require('react');

export class BasePopup {
    private id: string;
    private isDisplayed = false;

    getIsDisplayed() {
        return this.isDisplayed;
    }
    private onDismiss = (popupOptions: rx.Types.PopupOptions) => {
        this.isDisplayed = false;
        popupOptions.onDismiss && popupOptions.onDismiss();
    }
    display(popupOptions: rx.Types.PopupOptions) {
        // let popupOptions: rx.Types.PopupOptions = {
        //     getAnchor: () => {
        //         return this.refs['myButton'];
        //     },
        //     renderPopup: (anchorPosition: rx.Types.PopupPosition, anchorOffset: number,
        //             popupWidth: number, popupHeight: number) => {
        //         return this._renderPopupView(anchorPosition,
        //             anchorOffset, popupWidth, popupHeight);
        //     },
        //     positionPriorities: ['right', 'left', 'bottom', 'top'],
        //     onDismiss: () => {
        //         this.isDisplayed = false;
        //     }
        // };
        rx.Popup.show(popupOptions, this.id, 500);
        this.isDisplayed = true;
    }

    dismiss() {
        rx.Popup.dismiss(this.id);
    }

    dismissAll() {
        rx.Popup.dismissAll();
    }
}
