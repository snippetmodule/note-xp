import rx = require('reactxp');
import React = require('react');

export default abstract class MountedComponent<P extends React.Props<any>, S extends Object> extends React.Component<P, S>{
    private _isMounted = false;

    componentWillMount(): void {
        this._isMounted = true;
    }
    // Subclasses may override, but _MUST_ call super.
    componentWillUnmount(): void {
        this._isMounted = false;
    }
    isComponentMounted(): boolean {
        return this._isMounted;
    }
}