// add widgetRegistry as params of renderChat()
// something
// add widgetRegistry and state as param of createMessageContainer()*2 and into createChatBotMessage
// const OUTERCONTAINER = document.createElement('div');
// OUTERCONTAINER.style.display('flex');
// OUTERCONTAINER.style.flexDirection('column');
//after CONTAINER.append(MESSAGECONTAINER) add
// OUTERCONTAINER.append(CONTAINER);
// const WIDGETCONTAINER = document.createElement('div');
// if(widget)  {
//      const widgetMarkup = widgetRegistry.getWidget(widget, state);
//      WIDGETCONTAINER.append(widgetMarkup);
//  }
// OUTERCONTAINER.append(WIDGETCONTAINER)
// change message by mes in the functions
// in createChatBotMessage() =>  add
// const { message } = mes