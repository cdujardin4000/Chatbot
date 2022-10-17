import { createClientMessage } from "/js/util.js";
const DEF_LOADING = 1250;
/**
 * renderChat() -> Builder: here can we call all the functions to create a conversation.
 * @param CONFIG
 * @param state
 * @param messageParserInstance
 * @param updater
 * @param widgetRegistry
 * @returns {HTMLDivElement}
 */


const renderChat = (
    CONFIG,
    state,
    messageParserInstance,
    updater,
    widgetRegistry
) => {
    const OUTER = document.createElement('div');
    OUTER.className = 'chat-container';
    console.log(state);
    const INNER = document.createElement('div');
    INNER.className = 'inner-container';

    INNER.append(createHeader(CONFIG));
    INNER.append(createMessageContainer(state.messages, widgetRegistry, state, updater));
    INNER.append(createForm(messageParserInstance, updater));

    OUTER.append(INNER);
    return OUTER;
}

/**
 * createHeader() -> Create HTMLHeaderElement HEADER
 * @param CONFIG
 * @returns {HTMLElement}
 */
const createHeader = (CONFIG) => {
    const HEADER = document.createElement('header');
    HEADER.innerHTML = `<h1>conversation with ${CONFIG.botName}</h1>`;
    HEADER.className = 'chat-header';
    return HEADER;
}

/**
 * createMessageContainer() -> Create HTMLDivElement DIV USED BY BOTH USER AND BOT
 * @param messages
 * @param state
 * @param updater
 * @param widgetRegistry
 * @returns {HTMLDivElement}
 */
const createMessageContainer = (messages, widgetRegistry, state, updater) => {
    const CONTAINER = document.createElement('div');
    CONTAINER.className = 'chat-message-container';

    messages.forEach(mes => {
        const { message, type } = mes

        if(type === 'bot') {
            const botMessage = createBotChatMessage(mes, widgetRegistry, state, updater);
            CONTAINER.append(botMessage)
        } else {
            const userMessage = createUserChatMessage(message);
            CONTAINER.append(userMessage)
        }
    })

    return CONTAINER;
}
/**
 * createForm() -> Create HTMLFormElement FORM USED BY BOTH USER AND BOT
 * @param messageParserInstance
 * @param updater
 * @returns {HTMLDivElement}
 */
const createForm = (messageParserInstance, updater) => {
    console.log(messageParserInstance);
    const CONTAINER = document.createElement('div');
    CONTAINER.className = 'chat-input-container';

    const FORM = document.createElement('form');
    FORM.className = 'chat-input-form';

    const INPUT = document.createElement('input');
    INPUT.placeholder = 'Posez votre question ici';
    INPUT.className = 'chat-input';

    const BTN = document.createElement('button');
    BTN.className = 'chat-btn-send';

    FORM.onsubmit  = (e) => {
        e.preventDefault();
        const { value } = INPUT;
        const message = createClientMessage(value);
        updater((state) => {
            return { ...state, messages: [...state.messages, message] }
        })
        messageParserInstance.parse(value);
        INPUT.value = '';
    }


    const IMG = document.createElement('img');
    IMG.src = './assets/icons/send.svg';
    IMG.alt = 'send-paper-plane';
    IMG.className = 'chat-btn-send-icon';

    BTN.append(IMG);
    FORM.append(INPUT);
    FORM.append(BTN);
    CONTAINER.append(FORM);

    return CONTAINER;
}

/**
 * createUserChatMessage() -> Create HTMLDivElement USED BY USER AND CONTAINS MESSAGE AND USER ICON
 * @param message
 * @returns {HTMLDivElement}
 */
const createUserChatMessage = (message) => {
    const CONTAINER = document.createElement('div');
    CONTAINER.className = 'user-chat-message-container';

    const AVATARCONTAINER = document.createElement('div');
    AVATARCONTAINER.className = 'user-avatar-container';

    const IMG = document.createElement('img');
    IMG.src = './assets/icons/user.svg';
    IMG.alt = 'user-avatar-icon';
    IMG.className = 'chat-btn-send-icon';


    const MESSAGECONTAINER = document.createElement('div');
    MESSAGECONTAINER.className = 'user-chat-message';

    MESSAGECONTAINER.textContent = message;

    const ARROW = document.createElement('div');
    ARROW.className = 'user-chat-message-arrow';

    MESSAGECONTAINER.append(ARROW);
    AVATARCONTAINER.append(IMG);
    CONTAINER.append(MESSAGECONTAINER);
    CONTAINER.append(AVATARCONTAINER);

    return CONTAINER;
}


const createLoader = () =>  {

    const CONTAINER = document.createElement('div');
    CONTAINER.classList.add("chatbot-loader-container");

    CONTAINER.innerHTML =
        `<svg
        id="dots"
        width="50px"
        height="21px"
        viewBox="0 0 132 58"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
            <g stroke="none" fill="none">
                <g id="chatbot-loader" fill="#fff">
                    <circle id="chatbot-loader-dot1" cx="25" cy="30" r="13"></circle>
                    <circle id="chatbot-loader-dot2" cx="65" cy="30" r="13"></circle>
                    <circle id="chatbot-loader-dot3" cx="105" cy="30" r="13"></circle>
                </g>
            </g>
        </svg>`;

    return CONTAINER;
}

/**
 * createBotChatMessage() -> Create HTMLDivElement  USED BY BOT AND USER
 * @param mes
 * @param widgetRegistry
 * @param state
 * @param updater
 * @returns {HTMLDivElement}
 */
const createBotChatMessage = (mes, widgetRegistry, state, updater) => {

    const { message, widget, loading, id } = mes

    const OUTER = document.createElement('div');


    const CONTAINER = document.createElement('div');
    CONTAINER.className = 'chat-bot-message-container';

    const AVATARCONTAINER = document.createElement('div');
    AVATARCONTAINER.className = 'chat-bot-avatar-container';

    const P = document.createElement('p');
    P.innerHTML = 'L';
    P.className = 'chat-bot-avatar-letter';

    AVATARCONTAINER.append(P);
    const MESSAGECONTAINER = document.createElement('div');
    MESSAGECONTAINER.className = 'chat-bot-message';

    if(loading) {
        const LOADER = createLoader();
        MESSAGECONTAINER.append(LOADER);
        // change the state
        setTimeout(() => {
            updater((state) => {
                //find the message that we want to change state
                const newMessage = state.messages.find(mes => mes.id === id);
                // update the state
                newMessage.loading = false;

                return state;
            })
        }, DEF_LOADING);
    } else {
        MESSAGECONTAINER.textContent = message;
    }

    const ARROW = document.createElement('div');
    ARROW.className = 'chat-bot-message-arrow';

    MESSAGECONTAINER.append(ARROW);

    CONTAINER.append(AVATARCONTAINER);
    CONTAINER.append(MESSAGECONTAINER);

    OUTER.append(CONTAINER);

    const WIDGETCONTAINER = document.createElement('div');


    if(widget) {

        const widgetMarkup = widgetRegistry.getWidget(widget, state);
        WIDGETCONTAINER.append(widgetMarkup);
    }

    OUTER.append(WIDGETCONTAINER);

    return OUTER;
}

export default renderChat;