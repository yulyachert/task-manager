import './LoadEnv'; // Must be the first import
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import app from '@server';
import logger from '@shared/Logger';

import User from './models/User';
import Tasks from './models/Tasks';

const sequelizeOptions: SequelizeOptions = {
    // @ts-ignore
    models: [User, Tasks]
};

if (!process.env.url) {
    throw new URIError();
}

const sequelize =  new Sequelize(process.env.url, sequelizeOptions);

// Start the server
(async () => {
    await sequelize.sync({ force: false, alter: true });
    const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
        logger.info('Express server started on port: ' + port);
    });

})();



