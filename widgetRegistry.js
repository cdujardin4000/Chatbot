import { getObject } from "util.js";

class WidgetRegistry {
    constructor (setStateFunc, actionProvider) {
        this.setState = setStateFunc;
        this.actionProvider = actionProvider;
    }

    addWidget = ({ widgetName, widgetFunc, mapStateToProps, /**props**/}) => {
        console.log('Adding widgert', widgetName);
        this[widgetName] = {
            widget : widgetFunc,
            props,
            mapStateToProps,
        }
        const widgetObject = this[widgetName];

        if(!widgetObject) return;

        let props = {
            ...getObject(widgetObject.props),
            ...this.mapStateToProps(widgetObject, mapStateProps, state),
            setState : this.setState,
            actionProvider : this.actionProvider,
        }
        return widgetObject.widget(props);
    }

    mapStateToProps = (props, state) => {
        if(!props) return;

        return props.reduce((acc, prop) => {
            console.log(state[prop], prop);
            acc[prop] = state[prop];
            return acc;
        }, {});
    }
}

export default widgetRegistry;