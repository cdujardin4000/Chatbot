import renderChat from '/js/chat.js';
import {
    createChatBotMessage,
    createClientMessage,
    getWidgets,
    scrollIntoView,
    validateProps,
} from '/js/util.js';

import { createErrorMessage } from '/js/errorMessage.js';
import stateManager from '/js/state/state.js';
import WidgetRegistry from "./widgetRegistry/widgetRegistry.js";

let current;

// here is where everything happen
/**
 * renderChatBot
 * @param ROOT
 * @param CONFIG
 * @param messageParser
 * @param actionProvider
 */
const renderChatBot = (
    ROOT,
    CONFIG,
    messageParser,
    actionProvider,
) => {

    if (!CONFIG || !messageParser || !actionProvider) {
        return renderErrorMessage(
            ROOT,
            'I think you forgot to feed me with some props. Did you remember to pass a config, a messageparser and a actionprovider?'
        );
    }

    const propsErrors = validateProps(CONFIG, messageParser);

    if(propsErrors.length){
        const errorMessage = propsErrors.reduce((prev, cur) => {
            prev += cur;
            return prev;
        }, '');

        return renderErrorMessage(
            ROOT,
            errorMessage,
        );
    }

    // welcome message
    let initialState = {
        messages: [...CONFIG.initialMessages],
        ...CONFIG.state,
    }
    const [state, updater, registerListeners] = stateManager(initialState);


    const actionProviderInstance = new actionProvider(
        createChatBotMessage,
        updater,
        createClientMessage
    );
    const messageParserInstance = new messageParser(actionProviderInstance);

    const widgetRegistry = new WidgetRegistry(updater, actionProviderInstance);
    const widgets = getWidgets(CONFIG);

    widgets.forEach(
        (widget) => widgetRegistry.addWidget(widget)
    );

    registerListeners(
        (newState) => render(
            ROOT,
            newState,
            messageParserInstance,
            CONFIG,
            updater,
            widgetRegistry
        )
    );

    render(
        ROOT,
        state,
        messageParserInstance,
        CONFIG,
        updater,
        widgetRegistry
    );
};

/**
 * renderErrorMessage
 * @param ROOT
 * @param message
 */
const renderErrorMessage = (ROOT, message) => {
    if (current) {
        ROOT.removeChild(current);
    }

    const errorMessage = createErrorMessage(message);
    ROOT.append(errorMessage);
}

/**
 *
 * @param ROOT
 * @param state
 * @param messageParserInstance
 * @param CONFIG
 * @param updater
 * @param widgetRegistry
 */
const render = (
    ROOT,
    state,
    messageParserInstance,
    CONFIG,
    updater,
    widgetRegistry
) => {
    // Remove Bot if he exists
    if (current) {
        ROOT.removeChild(current);
    }

    const CHAT = renderChat(
        CONFIG,
        state,
        messageParserInstance,
        updater,
        widgetRegistry
    );
    current = CHAT;
    // Attach the bot to the HTML
    ROOT.append(CHAT);

    const INPUTFIELD = document.querySelector('.chat-input');
    INPUTFIELD.focus();
    scrollIntoView();
}


window.chabot = { renderChatBot, createChatBotMessage, createClientMessage }


