import { Router } from "express";
import controller from "../controllers/Controller";

const control = new controller;

const routes = Router();

routes.get('/palindromos/:start/:end', control.getPalindromos);
routes.post('/purchase', control.getTrade);
routes.post('/novoVeiculo', control.newVehicle);
routes.post('/ceps', control.getCeps)

export default routes;