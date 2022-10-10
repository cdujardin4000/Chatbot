

/** //Based on react-chatbot => transposed to  vanilla js-chatbot.
 * CONFIG: example
 * const botName = "DocsBot";
 *
 * const config = {
 *   botName: botName,
 *   lang: "no",
 *   customStyles: {
 *     botMessageBox: {
 *       backgroundColor: "#376B7E",
 *     },
 *     chatButton: {
 *       backgroundColor: "#5ccc9d",
 *     },
 *   },
 *   initialMessages: [
 *     createChatBotMessage(
 *       `Hi I'm ${botName}. I’m here to help you explain how I work.`
 *     ),
 *     createChatBotMessage(
 *       "Here's a quick overview over what I need to function. ask me about the different parts to dive deeper.",
 *       {
 *         withAvatar: false,
 *         delay: 500,
 *         widget: "overview",
 *       }
 *     ),
 *   ],
 *   state: {
 *     gist: "",
 *   },
 *   customComponents: {},
 *   widgets: [
 *     {
 *       widgetName: "overview",
 *       widgetFunc: (props) => <Overview {...props} />,
 *       mapStateToProps: ["gist"],
 *     },
 *     {
 *       widgetName: "messageParser",
 *       widgetFunc: (props) => <MessageParser {...props} />,
 *       mapStateToProps: ["gist"],
 *     },
 *     {
 *       widgetName: "actionProviderDocs",
 *       widgetFunc: (props) => <ActionProviderDocs {...props} />,
 *       mapStateToProps: ["gist"],
 *     },
 *   ],
 * };
 *
 * export default config;
 *
 *
 */


/**
 * WIDGETS :To use your own components in the chatbot, first you need to define it in the "widget" section of the config file:
 * widgetName: The name to which you will refer to the widget when you call createChatBotMessage
 * widgetFunc: A function which returns the component you want to render. It needs to take in props and spread
 * the props out over the given component: (props) => <Component {...props} />
 * props: An array of props you want to pass to the component
 * mapStateToProps: An list of properties from configuration state property that you want this component to receive as props.
 *
 * You will then be able to use the widget when you send a response with createChatBotMessage:
 * createChatBotMessage("Ok, one moment", {
 *   widget: "overview"
 * })
 */

/**
 * ACTIONPROVIDERS :
 * You have to write your own actionprovider. It will contain functions that you want to call in response to a user input. The actionprovider
 * is given to the messageparser so you can use any methods you provide here inside the messageparser.
 *
 * The bots response is controlled by the createChatBotMessage function that is given to the actionprovider:
 * createChatBotMessage("Thanks, I'll see what I can find", {
 *   widget: "rentalCarResults",
 *   withAvatar: true,
 *   delay: 500
 * })
 */

/**
 * MESSAGEPARSER :
 * You have to write your own messageparser. The beauty of this is that you have full control over how you want to parse messages from the user.
 * You can make it as complex or simple as you want. The simplest version is to check for keywords with javascript .includes()
 *
 * Once you pass the messageparser to the chatbot, it will initialize it with the actionprovider you provided, so that you can determine which action after
 * you have parsed the message.
 */

// inside renderChatBot

const widgetRegistry = new widgetRegistry(updater, actionProviderInstance);
const widgets = getWidgets(config);
widgets.forEach((widget) => widgetRegistry.addWidget(widget));

registerListeners((newState) =>
    render(
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
        messageProvider,
        CONFIG,
        updater,
        widgetRegistry
    );


const render = (
    ROOT,
    state,
    messageParserInstance,
    CONFIG,
    updater,
    widgetRegistry) => {
        if (current) {
            ROOT.removeChild(current);
        }

        const CHAT = renderChat(
            CONFIG,
            state,
            messageParserInstance,
            CONFIG,
            updater,
            widgetRegistry
        );
    current = CHAT;
    ROOT.appendChild(CHAT);
}
window.vanillaChatBot = { renderChatBot, createChatBotMessage };