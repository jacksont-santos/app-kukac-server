import fs from 'fs';
import axios from 'axios';

class Service {

    findPalindromos = (start: number, end: number): number[] => {
        let listNumber = []
        let listPalindromos = []

        for (let numero = start; numero <= end; numero++) {
            listNumber.push(numero)
        }

        for (let numero of listNumber) {
            if (numero > 9) {
                const numeroConvertido = numero.toString()
                let numeroInvertido = ''

                let arrayInvertido = []
                for (let caractere of numeroConvertido) {
                    arrayInvertido.unshift(caractere)
                }

                for (let item of arrayInvertido) {
                    numeroInvertido = numeroInvertido + item
                }

                if (numeroConvertido == numeroInvertido) {
                    listPalindromos.push(numero);
                }
            }
        }
        return listPalindromos
    }

    setTrade = (purchaseValue: number, amountPaid: number) => {
        if (amountPaid < purchaseValue){
            return {message: 'Valor pago insuficiente!' }
        } else if (amountPaid === purchaseValue){
            return {message: 'Não há troco!'}
        }
        let returnedValue = amountPaid - purchaseValue
        let notasCem = 0
        let notasDez = 0
        let notasUm = 0

        let count = Math.floor(returnedValue/100);
        if (count >= 1){ notasCem = count }

        count = returnedValue%100
        count = Math.floor(count/10)
        if (count >= 1){ notasDez = count }

        count = returnedValue%100
        count  = count%10
        if (count >= 1){ notasUm = count }

        const minimoNotas = notasCem + notasDez + notasUm

        return {
            minimoNotas,
            purchaseValue,
            returnedValue,
            notasCem,
            notasDez,
            notasUm
        }

    }

    setVehicle = (modelo: string, ano: number, qtd: 2 | 4, marca: string, tipo: string, passageiros: 1 | 2) => {
        interface Veiculo {
            modelo: string;
            anoFabricacao: number;
            quantidadePortas?: number;
            marca: string;
        }

        class Carro implements Veiculo {
            modelo: string;
            anoFabricacao: number;
            quantidadePortas: 2 | 4;
            marca: string;

            constructor(mod: string, anoF: number, qtd: 2 | 4, marc: string){
                this.modelo = mod
                this.anoFabricacao = anoF
                this.quantidadePortas = qtd
                this.marca = marc
            }

            getModelo(): string {
                return this.modelo
            }
            setModelo(modelo : string) {
                this.modelo = modelo;
            }
            
            getAnoFabricacao() : number {
                return this.anoFabricacao
            }
            setAnoFabricacao(ano : number) {
                this.anoFabricacao = ano;
            }
            
            getQuantidadePortas(): number {
                return this.quantidadePortas
            }
            setQuantidadePortas(portas: 2 | 4){
               this.quantidadePortas = portas 
            }

            getMarca(): string {
                return this.marca
            }
            setMarca(marca: string) {
                this.marca = marca
            }
            
        } 

        class Moto implements Veiculo {
            modelo: string;
            anoFabricacao: number;
            marca: string;
            rodas: 2;
            passageiros: 1 | 2

            constructor(mod: string, anoF: number, marc: string, passageiros: 1 | 2){
                this.modelo = mod
                this.anoFabricacao = anoF
                this.marca = marc
                this.passageiros = passageiros
                this.rodas = 2
            }

            getModelo(): string {
                return this.modelo
            }
            setModelo(modelo : string) {
                this.modelo = modelo;
            }
            
            getAnoFabricacao() : number {
                return this.anoFabricacao
            }
            setAnoFabricacao(ano : number) {
                this.anoFabricacao = ano;
            }

            getMarca(): string {
                return this.marca
            }
            setMarca(marca: string) {
                this.marca = marca
            }
        }

        if (tipo === "carro"){
            let carro = new Carro(modelo, ano, qtd, marca)
            let carroJson = JSON.stringify(carro)
            fs.writeFile('dbSimulator.json', carroJson, { flag : 'a+' } ,(err) =>{
            if (err){ console.log(err) }
        })
        return {message: "Veiculo registrado"}
        } else if (tipo === "moto"){
            let moto = new Moto(modelo, ano, marca, passageiros)
            let motoJson = JSON.stringify(moto)
            fs.writeFile('dbSimulator.json', motoJson, { flag : 'a+' } ,(err) =>{
            if (err){ console.log(err) }
        })
        return {message: "Veiculo registrado"}
        } else { return {message: "Veiculo NÃO registrado! verifique se as informações estão corretas. "}}
    }

    searchCEP = async (list: number[]) => {
        const listCep = list
        let responseList:any = []
        for (let cep of listCep){
            await axios(`https://viacep.com.br/ws/${cep}/json/`)
                .then((response) => {
                    responseList.push(response.data)
                }).catch((erro) => {
                    console.log(erro)
                });
        }
        return responseList
    }

};

export default Service