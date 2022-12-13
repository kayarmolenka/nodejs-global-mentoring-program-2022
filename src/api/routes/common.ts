import express, { Router } from 'express';

const routerCommon: Router = express.Router();

routerCommon.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json('Chose another router');

  res.end();
});


export default routerCommon;
