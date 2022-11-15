/**
 * 1. Keep overview over the state
 * 2. Expose methods for interacting with the state
 * 3. render our application when the state changes
 * @param initialState
 * @returns
 */
const stateManager = (initialState) => {


    let state = initialState;
    const listeners = [];

    /** stateUpdater()
     * 1. Keep overview over the state
     * @param updater
     */
    const updater = (updater) => {
        if (typeof updater === 'function') {
            state = updater(state);
        } else {
            state = { ...state, ...updater };
        }
        fireListeners();
    }

    /** registerListeners()
     * 2. Expose methods for interacting with the state
     * @param listenerFunc
     */
    const registerListeners = (listenerFunc) => {
        listeners.push(listenerFunc);

    }

    /** fireListeners()
     * 3. Rerender our application when the state changes and passing the new state
     */
    const fireListeners = () => {
        listeners.forEach((listener) => {
            listener(state);
            console.log(state);
        })
    }

    return [state, updater, registerListeners];
}

export default stateManager;

