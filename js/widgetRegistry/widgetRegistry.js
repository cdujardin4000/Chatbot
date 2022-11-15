import { getObject, scrollIntoView } from "../util.js";

class WidgetRegistry {
    constructor(setStateFunc, actionProvider) {
        this.setState = setStateFunc;
        this.actionProvider = actionProvider;
    }

    addWidget = (
        { widgetName, widgetFunc, mapStateToProps, props },
    ) => {
        console.log('ADDING WIDGET', widgetName);
        let name = widgetName;
        console.log('ADDING WIDGET', name);
        this[widgetName] = {
            widget: widgetFunc,
            props,
            mapStateToProps,
        };
    };

    getWidget = (widgetName, state) => {
        const widgetObject = this[widgetName];

        if (!widgetObject) return;

        let props = {
            scrollIntoView,
            ...getObject(widgetObject.props),
            ...this.mapStateToProps(widgetObject.mapStateToProps, state),
            setState: this.setState,
            actionProvider: this.actionProvider
        };

        return widgetObject.widget(props);

    };

    mapStateToProps = (props, state) => {
        if (!props) return;

        return props.reduce((acc, prop) => {

            acc[prop] = state[prop];
            return acc;
        }, {});
    };

}

export default WidgetRegistry;