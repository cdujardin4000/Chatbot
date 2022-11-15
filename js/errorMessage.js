import { createBotChatMessage } from "./chat.js";

export const createErrorMessage = (message) => {
    const CONTAINER = document.createElement('div');
    CONTAINER.className = 'chat-bot-kit-error';

    const HEADER = document.createElement('h1');
    HEADER.textContent = 'Oops something is missing';

    const INNER = document.createElement('div');
    INNER.className = 'chat-bot-kit-error-container';

    const messageObject = {
        message,
        loading : false,
        id : 1,
    }

    const botMessage = createBotChatMessage(messageObject);

    INNER.append(botMessage);

    const LINK = document.createElement('a');
    LINK.href = 'https://fredrikoseberg.github.io/react-chatbot-kit-docs/';
    LINK.rel= 'noopener norefferer';
    LINK.target = '_blank';
    LINK.className = 'chat-bot-kit-error-docs';
    LINK.textContent = 'View the docs';

    CONTAINER.append(HEADER);
    CONTAINER.append(INNER);
    CONTAINER.append(LINK);

    return CONTAINER;
}