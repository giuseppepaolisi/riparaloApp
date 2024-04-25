class TicketContext {
    constructor(state) {
        this.state = state;
        this.transitionTo(state);
    }

    transitionTo(state) {
        console.log(state);
        this.state = state;
        this.state.setContext(this)
    }
    action(action) {
        this.state.handleAction(action);
    }
}

module.exports = {
    TicketContext,
}