const {OpenTicket} = require('./ticketState');

class TicketContext {

    constructor(state) {
        this.state = new OpenTicket();
    }

    setState(state) {
        this.state = state;
    }

    handleAction(action) {
        this.state.handleAction(action);
    }
}

module.exports = {
    TicketContext,
}