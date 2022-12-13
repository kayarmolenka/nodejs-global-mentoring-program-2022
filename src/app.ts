import express from 'express';

import { routerUsers, routerCommon } from './api/routes';
import { PORT } from './constants';

const app = express();

app.use(express.json());

app.listen(PORT, () => console.log(`Server has been started on ${PORT}`));

app.use('/', routerCommon);
app.use('/users', routerUsers);
