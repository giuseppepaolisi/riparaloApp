const Ticket = require('../../../models/ticket');
const { ADMIN, TECHNICIAN, PARTNER } = require('../../../conf/role');
const { updateState } = require('../ticket');
const {
    APERTO,
    ACCETTATO,
    RITIRATO,
    IN_LAVORAZIONE,
    ATTESA_CONFERMA_PREVENTIVO,
    PREVENTIVO_ACCETTATO,
    PREVENTIVO_RIFIUTATO,
    COMPLETATO,
    ANNULLATO,
    ATTESA_RICAMBIO,
    IN_CONSEGNA_COMPLETATO,
    IN_CONSEGNA_ANNULLATO,
    IN_CONSEGNA_RIFIUTATO,
  } = require('../../../conf/state');
// jest --runInBand ./controllers/ticketStatusController
// devo fare il mock di req, mongoose Ticket.fidById, ticket.save()

// mock del model
jest.mock('../../../models/ticket', () => ({
    findById: jest.fn(),
    save: jest.fn(),
}));

// TEST updateState 
describe('TEST updateState', () => {
    let mockReq, mockRes, mockNext;

    let ticket;     

    beforeEach(() => {
        mockReq = {
            user: {
                role: TECHNICIAN,
                email: 'tecnico1@gamil.com',
            },
            body: {
                id: '123456',
                newstate: '',
                descrizione_tecnica: '',
                prezzo: 0,
            },
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
        ticket = {
            _id: "123456",
            id_partner: "123456",
            telefono_partner: "1234567890",
            ragione_sociale: "Chris SRL",
            partita_iva: "asd",
            codiceUnivoco: "123456",
            pec: "pec@pec.it",
            cap: "84084",
            via: "largo",
            provincia: "SA",
            nome_cliente: "Mario",
            cognome_cliente: "Rossi",
            telefono_cliente: "1234567890",
            marca: "Samsung",
            modello: "Galaxy S10",
            descrizione_problema: "Il dispositivo non si accende",
            stato: "Accettato",
            storico_stato: [
                {
                    stato: "Aperto",
                    data: "2024-04-26T07:26:53.043Z"
                }
            ],
            servizi: [
                {
                    servizio: "Sostituzione batteria",
                    prezzo: 50
                },
                {
                    servizio: "Riparazione schermo",
                    prezzo: 150
                }
            ],
            prezzo_stimato: 200,
            save: jest.fn().mockImplementation(function() {
                return Promise.resolve(this); // Simula il salvataggio e ritorna il ticket modificato
            }),
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    // SUCCESSO
    // Cambio stato da Aperto ad Accettato
    it('SUCCESS - Cambio stato da Aperto ad Accettato', async () => {
        mockReq.body.newstate = ACCETTATO;
        ticket.stato = APERTO;
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(mockRes.status).not.toHaveBeenCalledWith(400);
        expect(mockRes.status).not.toHaveBeenCalledWith(404);
        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(ticket.save).toHaveBeenCalled();
        expect(ticket.stato).toEqual(ACCETTATO);
        // Verifica che storico_stato contenga un oggetto con stato 'Accettato'
        const hasNewStateInHistory = ticket.storico_stato.some(hist => hist.stato === ACCETTATO);
        expect(hasNewStateInHistory).toBeTruthy();

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })

    // SUCCESSO
    // Cambio stato da Accettato a Ritirato
    it('SUCCESS - Cambio stato da Accettato a Ritirato', async () => {
        mockReq.body.newstate = RITIRATO;
        ticket.stato = ACCETTATO;
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(mockRes.status).not.toHaveBeenCalledWith(400);
        expect(mockRes.status).not.toHaveBeenCalledWith(404);
        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(ticket.save).toHaveBeenCalled();
        expect(ticket.stato).toEqual(RITIRATO);
        // Verifica che storico_stato contenga un oggetto con stato 'Accettato'
        const hasNewStateInHistory = ticket.storico_stato.some(hist => hist.stato === RITIRATO);
        expect(hasNewStateInHistory).toBeTruthy();

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })

    // SUCCESSO
    // Cambio stato da Ritirato a In lavorazione
    it('SUCCESS - Cambio stato da Ritirato a In lavorazione', async () => {
        mockReq.body.newstate = IN_LAVORAZIONE;
        ticket.stato = RITIRATO;
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(mockRes.status).not.toHaveBeenCalledWith(400);
        expect(mockRes.status).not.toHaveBeenCalledWith(404);
        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(ticket.save).toHaveBeenCalled();
        expect(ticket.stato).toEqual(IN_LAVORAZIONE);
        // Verifica che storico_stato contenga un oggetto con stato 'Accettato'
        const hasNewStateInHistory = ticket.storico_stato.some(hist => hist.stato === IN_LAVORAZIONE);
        expect(hasNewStateInHistory).toBeTruthy();

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })

    // SUCCESSO
    // Cambio stato da Accettato a In lavorazione
    it('SUCCESS - Cambio stato da Accettato a In lavorazione', async () => {
        mockReq.body.newstate = IN_LAVORAZIONE;
        ticket.stato = ACCETTATO;
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(mockRes.status).not.toHaveBeenCalledWith(400);
        expect(mockRes.status).not.toHaveBeenCalledWith(404);
        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(ticket.save).toHaveBeenCalled();
        expect(ticket.stato).toEqual(IN_LAVORAZIONE);
        // Verifica che storico_stato contenga un oggetto con stato 'Accettato'
        const hasNewStateInHistory = ticket.storico_stato.some(hist => hist.stato === IN_LAVORAZIONE);
        expect(hasNewStateInHistory).toBeTruthy();

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })

    // SUCCESSO
    // Cambio stato da In lavorazione a Attesa conferma preventivo e inserimento prezzo corretto
    it('SUCCESS - Cambio stato da In lavorazione a Attesa conferma preventivo con nuovo prezzo', async () => {
        mockReq.body.newstate = ATTESA_CONFERMA_PREVENTIVO;
        mockReq.body.prezzo = 250; 
        ticket.stato = IN_LAVORAZIONE;
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(mockRes.status).not.toHaveBeenCalledWith(400);
        expect(mockRes.status).not.toHaveBeenCalledWith(404);
        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(ticket.save).toHaveBeenCalled();
        expect(ticket.stato).toEqual(ATTESA_CONFERMA_PREVENTIVO);
        expect(ticket.prezzo).toEqual(250);
        // Verifica che storico_stato contenga un oggetto con stato 'Accettato'
        const hasNewStateInHistory = ticket.storico_stato.some(hist => hist.stato === ATTESA_CONFERMA_PREVENTIVO);
        expect(hasNewStateInHistory).toBeTruthy();

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })

    // SUCCESSO
    // Cambio stato da In lavorazione a Attesa conferma preventivo senza prezzo
    it('SUCCESS - Cambio stato da In lavorazione a Attesa conferma preventivo senza nuovo prezzo', async () => {
        mockReq.body.newstate = ATTESA_CONFERMA_PREVENTIVO;
        ticket.stato = IN_LAVORAZIONE;
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(mockRes.status).not.toHaveBeenCalledWith(400);
        expect(mockRes.status).not.toHaveBeenCalledWith(404);
        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(ticket.save).toHaveBeenCalled();
        expect(ticket.stato).toEqual(ATTESA_CONFERMA_PREVENTIVO);
        expect(ticket.prezzo).toEqual(200);
        // Verifica che storico_stato contenga un oggetto con stato 'Accettato'
        const hasNewStateInHistory = ticket.storico_stato.some(hist => hist.stato === ATTESA_CONFERMA_PREVENTIVO);
        expect(hasNewStateInHistory).toBeTruthy();

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })

    /*
    // ERRORE
    // Cambio stato da In lavorazione a Attesa conferma preventivo e prezzo errato
    it('ERRORE - Cambio stato da In lavorazione a Attesa conferma preventivo con prezzo errato', async () => {
        mockReq.body.newstate = ATTESA_CONFERMA_PREVENTIVO;
        ticket.stato = IN_LAVORAZIONE;
        mockReq.body.prezzo = '250'; 
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(mockRes.status).toHaveBeenCalledWith(400);
        //expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })*/

    // SUCCESSO
    // Cambio stato da Attesa conferma preventivo a Preventivo accettato
    it('SUCCESS - Cambio stato da Attesa conferma preventivo a Preventivo accettato', async () => {
        mockReq.body.newstate = PREVENTIVO_ACCETTATO;
        mockReq.user.role = PARTNER;
        ticket.stato = ATTESA_CONFERMA_PREVENTIVO;
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(mockRes.status).not.toHaveBeenCalledWith(400);
        expect(mockRes.status).not.toHaveBeenCalledWith(404);
        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(ticket.save).toHaveBeenCalled();
        expect(ticket.stato).toEqual(PREVENTIVO_ACCETTATO);
        // Verifica che storico_stato contenga un oggetto con stato 'Accettato'
        const hasNewStateInHistory = ticket.storico_stato.some(hist => hist.stato === PREVENTIVO_ACCETTATO);
        expect(hasNewStateInHistory).toBeTruthy();

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })

    // SUCCESSO
    // Cambio stato da Preventivo accettato a Completato con descrizione tecnica
    it('SUCCESS - Cambio stato da Preventivo accettato a Completato con descrizione tecnica', async () => {
        mockReq.body.newstate = COMPLETATO;
        const descrizione = 'schermo rotto e sostituito'
        mockReq.body.descrizione_tecnica = descrizione;
        ticket.stato = PREVENTIVO_ACCETTATO;
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(mockRes.status).not.toHaveBeenCalledWith(400);
        expect(mockRes.status).not.toHaveBeenCalledWith(404);
        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(ticket.save).toHaveBeenCalled();
        expect(ticket.stato).toEqual(COMPLETATO);
        expect(ticket.descrizione_tecnica).toEqual(descrizione);
        // Verifica che storico_stato contenga un oggetto con stato 'Accettato'
        const hasNewStateInHistory = ticket.storico_stato.some(hist => hist.stato === COMPLETATO);
        expect(hasNewStateInHistory).toBeTruthy();

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })

    // SUCCESSO
    // Cambio stato da Preventivo accettato a Completato senza descrizione tecnica
    it('SUCCESS - Cambio stato da Preventivo accettato a Completato senza descrizione tecnica', async () => {
        mockReq.body.newstate = COMPLETATO;
        ticket.stato = PREVENTIVO_ACCETTATO;
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(mockRes.status).not.toHaveBeenCalledWith(400);
        expect(mockRes.status).not.toHaveBeenCalledWith(404);
        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(ticket.save).toHaveBeenCalled();
        expect(ticket.stato).toEqual(COMPLETATO);
        expect(ticket.descrizione_tecnica).toEqual(undefined);
        // Verifica che storico_stato contenga un oggetto con stato 'Accettato'
        const hasNewStateInHistory = ticket.storico_stato.some(hist => hist.stato === COMPLETATO);
        expect(hasNewStateInHistory).toBeTruthy();

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })

    // SUCCESSO
    // Cambio stato da Preventivo accettato a Attesa ricambio
    it('SUCCESS - Cambio stato da Preventivo accettato a Attesa ricambio', async () => {
        mockReq.body.newstate = ATTESA_RICAMBIO;
        ticket.stato = PREVENTIVO_ACCETTATO;
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(mockRes.status).not.toHaveBeenCalledWith(400);
        expect(mockRes.status).not.toHaveBeenCalledWith(404);
        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(ticket.save).toHaveBeenCalled();
        expect(ticket.stato).toEqual(ATTESA_RICAMBIO);
        // Verifica che storico_stato contenga un oggetto con stato 'Accettato'
        const hasNewStateInHistory = ticket.storico_stato.some(hist => hist.stato === ATTESA_RICAMBIO);
        expect(hasNewStateInHistory).toBeTruthy();

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })

    // SUCCESSO
    // Cambio stato da Attesa ricambio a Completato
    it('SUCCESS - Cambio stato da Attesa ricambio a Completato', async () => {
        mockReq.body.newstate = COMPLETATO;
        ticket.stato = ATTESA_RICAMBIO;
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(mockRes.status).not.toHaveBeenCalledWith(400);
        expect(mockRes.status).not.toHaveBeenCalledWith(404);
        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(ticket.save).toHaveBeenCalled();
        expect(ticket.stato).toEqual(COMPLETATO);
        // Verifica che storico_stato contenga un oggetto con stato 'Accettato'
        const hasNewStateInHistory = ticket.storico_stato.some(hist => hist.stato === COMPLETATO);
        expect(hasNewStateInHistory).toBeTruthy();

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })

    // SUCCESSO
    // Cambio stato da Completato a In consegna - Coletato
    it('SUCCESS - Cambio stato da Completato a In consegna - Coletato', async () => {
        mockReq.body.newstate = IN_CONSEGNA_COMPLETATO;
        ticket.stato = COMPLETATO;
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(mockRes.status).not.toHaveBeenCalledWith(400);
        expect(mockRes.status).not.toHaveBeenCalledWith(404);
        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(ticket.save).toHaveBeenCalled();
        expect(ticket.stato).toEqual(IN_CONSEGNA_COMPLETATO);
        // Verifica che storico_stato contenga un oggetto con stato 'Accettato'
        const hasNewStateInHistory = ticket.storico_stato.some(hist => hist.stato === IN_CONSEGNA_COMPLETATO);
        expect(hasNewStateInHistory).toBeTruthy();

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })
/*
    // SUCCESSO
    // Cambio stato da Attesa conferma preventivo a Preventivo rifiutato
    it('SUCCESS - Cambio stato da Attesa conferma preventivo a Preventivo rifiutato', async () => {
        mockReq.body.newstate = PREVENTIVO_RIFIUTATO;
        ticket.stato = ATTESA_CONFERMA_PREVENTIVO;
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(mockRes.status).not.toHaveBeenCalledWith(400);
        expect(mockRes.status).not.toHaveBeenCalledWith(404);
        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(ticket.save).toHaveBeenCalled();
        expect(ticket.stato).toEqual(PREVENTIVO_RIFIUTATO);
        // Verifica che storico_stato contenga un oggetto con stato 'Accettato'
        const hasNewStateInHistory = ticket.storico_stato.some(hist => hist.stato === PREVENTIVO_RIFIUTATO);
        expect(hasNewStateInHistory).toBeTruthy();

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })
*/
    // SUCCESSO
    // Cambio stato da Preventivo rifiutato a In consegna rifiutato
    it('SUCCESS - Cambio stato da Preventivo rifiutato a In consegna rifiutato', async () => {
        mockReq.body.newstate = IN_CONSEGNA_RIFIUTATO;
        ticket.stato = PREVENTIVO_RIFIUTATO;
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(mockRes.status).not.toHaveBeenCalledWith(400);
        expect(mockRes.status).not.toHaveBeenCalledWith(404);
        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(ticket.save).toHaveBeenCalled();
        expect(ticket.stato).toEqual(IN_CONSEGNA_RIFIUTATO);
        // Verifica che storico_stato contenga un oggetto con stato 'Accettato'
        const hasNewStateInHistory = ticket.storico_stato.some(hist => hist.stato === IN_CONSEGNA_RIFIUTATO);
        expect(hasNewStateInHistory).toBeTruthy();

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })
/*
     // SUCCESSO
    // Cambio stato da Preventivo accettato a Annullato
    it('SUCCESS - Cambio stato da Preventivo accettato a Annullato', async () => {
        mockReq.body.newstate = ANNULLATO;
        ticket.stato = PREVENTIVO_ACCETTATO;
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(mockRes.status).not.toHaveBeenCalledWith(400);
        expect(mockRes.status).not.toHaveBeenCalledWith(404);
        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(ticket.save).toHaveBeenCalled();
        expect(ticket.stato).toEqual(ANNULLATO);
        // Verifica che storico_stato contenga un oggetto con stato 'Accettato'
        const hasNewStateInHistory = ticket.storico_stato.some(hist => hist.stato === ANNULLATO);
        expect(hasNewStateInHistory).toBeTruthy();

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })

    */
    // SUCCESSO
    // Cambio stato da In Lavorazione a Annullato
    it('SUCCESS - Cambio stato da In Lavorazione a Annullato', async () => {
        mockReq.body.newstate = ANNULLATO;
        ticket.stato = IN_LAVORAZIONE;
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(mockRes.status).not.toHaveBeenCalledWith(400);
        expect(mockRes.status).not.toHaveBeenCalledWith(404);
        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(ticket.save).toHaveBeenCalled();
        expect(ticket.stato).toEqual(ANNULLATO);
        // Verifica che storico_stato contenga un oggetto con stato 'Accettato'
        const hasNewStateInHistory = ticket.storico_stato.some(hist => hist.stato === ANNULLATO);
        expect(hasNewStateInHistory).toBeTruthy();

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })

    // SUCCESSO
    // Cambio stato da Annullato a In consegna - Annullato
    it('SUCCESS - Cambio stato da Annullato a In consegna - Annullato', async () => {
        mockReq.body.newstate = IN_CONSEGNA_ANNULLATO;
        ticket.stato = ANNULLATO;
        Ticket.findById.mockResolvedValue(ticket);
        ticket.save.mockResolvedValueOnce(ticket);

        await updateState(mockReq, mockRes, mockNext);

        expect(mockRes.status).not.toHaveBeenCalledWith(400);
        expect(mockRes.status).not.toHaveBeenCalledWith(404);
        expect(Ticket.findById).toHaveBeenCalledWith({ _id: '123456'});
        expect(ticket.save).toHaveBeenCalled();
        expect(ticket.stato).toEqual(IN_CONSEGNA_ANNULLATO);
        // Verifica che storico_stato contenga un oggetto con stato 'Accettato'
        const hasNewStateInHistory = ticket.storico_stato.some(hist => hist.stato === IN_CONSEGNA_ANNULLATO);
        expect(hasNewStateInHistory).toBeTruthy();

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ newTicket: expect.any(Object) });
    })

});