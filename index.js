import express from 'express';
import { addLogger } from './src/utils/logger.js';

const app = express();
app.use(addLogger); // Uso el middleware con .use

app.get('/', (req, res) => {
    try {
        res.send('Hello World');

    } catch (error) {
        req.logger.error('Test error!');
        res.status(500).send(error);
    }
})

//////------Testeo con ARTILLERY (libreria para testear la performance de un servidor)--------//////
app.get('/suma', (req, res) => {
    try {
        let suma = 0
        for (let i = 0; i < 10000; i++) {
            suma += 1;
        }
        res.send(`Suma: ${suma}`);
    } catch (error) {
        //req.logger.error(error); cambio por el siguiente
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()} ` );
        res.status(500).send(error)
    }


})

app.get('/multiplicacion', (req, res) => {
    try {
        let multiplicacion = 1
        for (let i = 0; i < 4000; i++) {
            multiplicacion *= 1;
        }
        res.send(`Multiplicacion: ${multiplicacion}`);
    } catch (error) {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()} ` );
        res.status(500).send(error)
    }
})

app.get('/logger', (req, res) => {
    try {
        req.logger.info('Test info');
        req.logger.warn('Test warning');
        req.logger.error('Test error');
        req.logger.fatal('Test fatal')
    } catch (error) {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()} ` );
        res.status(500).send(error)
    }
})

app.listen(4000, () => console.log('Server on port 4000'));
//app.listen(4000, (req, res) => req.logger.info('Server on port 4000')); No funciona, corregir