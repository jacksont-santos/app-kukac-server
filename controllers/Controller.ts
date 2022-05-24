import Service from "../services/Service";

const service = new Service;

class Controller {

    getPalindromos = (request: any, response: any) => {
        const start = Number(request.params.start);
        const end = Number(request.params.end);
        if (start >= 0 && end >= 0){
            const palindromos = service.findPalindromos(start, end);
            response.send(palindromos);
        } else {
            response.status(400).send({error: "Número inválido"});
        }  
    };
    getTrade = (request: any, response: any) => {
        const {pago, pagar} = request.body;
        if (!pago || !pagar){
            response.status(400).send("Informe o valor pago e o valor à pagar!")
        } else if (typeof pago !== typeof 1 || typeof pagar !== typeof 1){
            response.status(400).send("Esperando um valor do tipo 'number'!")
        }
        const cashierResponse = service.setTrade(pagar, pago);
        response.send(cashierResponse)
    };
    newVehicle = (request: any, response: any) => {
        const {modelo, ano, qtd, marca, tipo, passageiros} = request.body
        const message = service.setVehicle(modelo, ano, qtd, marca, tipo, passageiros)
        response.send(message)
    };
    getCeps = async (request: any, response: any) => {
        const listJson = request.body
        let list: number[] = Object.values(listJson)
        const ceps = await service.searchCEP(list)
        response.send(ceps)
    };
}

export default Controller;