class TicketContext {
  constructor(state) {
    this.state = state;
    this.transitionTo(state);
  }

  // permette di passare a una nuova istanza di TicketStatus
  transitionTo(state) {
    //console.log(state);
    this.state = state;
    this.state.setContext(this);
  }

  // permette di eseguire action in base all'istanza di TicketStatus
  print(action) {
    this.state.printNext(action);
  }

  action(action) {
    this.state.handleAction(action);
  }
}

module.exports = {
  TicketContext,
};
