import * as http from 'http';

import { logger } from './config/logger';
import { App } from './app';

export class Server {
    port: number = Config.server.port;
    server: any;

    constructor() {
        this.setServer();
    }

    setServer() {
        /**
         * Create HTTP server.
         */
        const appInstance: App = App.getInstance();
        this.server = http.createServer(appInstance.app);
        this.server.listen(this.port, () => {
            logger.info(`Server listening on port: ${this.port} Mode = ${Config.server.environment}`);
        });
        this.server.on('error', this.onError);
    }

    /**
     * Event listener for HTTP server "error" event.
     */
    onError(error: any) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = `Port ${this.port}`;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                logger.error(`${bind} requires elevated privileges`, error);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                logger.error(`${bind} is already in use`, error);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}
