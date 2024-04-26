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

});