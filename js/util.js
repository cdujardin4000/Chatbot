/**
 * uniqueIdGenerator = () => Create a unique id for each message
 * @returns {function(): number}
 */
export const uniqueIdGenerator = () => {
    let num = 1;
    return () => {
        return (num += 1);
    };
};

const uniqueId = uniqueIdGenerator();


/**
 * botMessage = (message) => check if the message is bot and return true if it is
 * @param message
 * @returns {boolean}
 */
export const botMessage = (message) => {
    return message.type === "bot";

};

/**
 * createChatMessage = (message, type) => create a message container
 * @param message
 * @param type
 * @returns {{id: number, message, type}}
 */
export const createChatMessage = (message, type) => {
    return {
        message: message,
        type: type,
        id: uniqueId(),
    };
};

/**
 * createChatBotMessage = (message, options) => create a bot message
 * @param message
 * @param options
 * @returns {*&{id: number, message, type, loading: boolean}}
 */
export const createChatBotMessage = (message, options) => {
    return {
        ...createChatMessage(message, "bot"),
        ...options,
        loading: true,
    };
};

/**
 * createClientMessage = (message) => create a client message
 * @param message
 * @returns {{id: number, message, type}}
 */
export const createClientMessage = (message) => {
    return createChatMessage(message, "user");
};

/**
 *
 * @param func
 * @param args
 * @returns {*}
 */
export const callIfExists = (func, ...args) => {
    if (func) {
        return func(...args);
    }
};

/**
 * check if props is an object and return object if not
 * @param object
 * @returns {{}|*}
 */
export const getObject = (object) => {
    if (typeof object === "object") return object;
    return {};
};

/**
 * get the widgets in the config and return them in an array
 * @param config
 * @returns {[{mapStateToProps: [string], widgetName: string, widgetFunc: function(*): HTMLDivElement, props: {}}]|*|*[]}
 */
export const getWidgets = (config) => {
    if (config.widgets) {
        return config.widgets;
    }
    return [];
};

/**
 *  to see the last messages if the conversation is long
 */
export const scrollIntoView = () => {
    const chatContainer = document.querySelector(
        ".chat-message-container"
    );

    chatContainer.scrollTop = chatContainer.scrollHeight;
};

/**
 * validateProps = (config, MessageParser) -> check config and parser and return an error if needed
 * @param config
 * @param MessageParser
 * @returns {*[]}
 */
export const validateProps = (config, MessageParser) => {
    const errors = [];
    if (!config.initialMessages) {
        errors.push(
            "Config must contain property 'initialMessages', and it expects it to be an array of chatbotmessages."
        );
    }

    const messageParser = new MessageParser();
    if (!messageParser["parse"]) {
        errors.push(
            "Messageparser must implement the method 'parse', please add this method to your object. The signature is parse(message: string)."
        );
    }


    return errors;
};