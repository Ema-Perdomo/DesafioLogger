import winston from "winston";

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "red",
        error: "orange",
        warn: "yellow",
        info: "cyan",
        http: "magenta",
        debug: "blue"
    }
}

const logger = winston.createLogger({
    levesl: customLevels.levels, // Implemento el objeto e consiguracion
    transports: [

        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(                               // Los mensajes de info se mostraran en la consola
                winston.format.colorize({ color: customLevels.colors }), // Color correspondiente para cada nivel
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level: 'warning',
            filename: './warnings.log', // Quieron que los warning se guarden en este archivo
            format: winston.format.simple()
        }),
        new winston.transports.File({
            level: 'error',
            filename: './errors.log', // Archivo donde se guardan los errores
            format: winston.format.simple()
        }),
        new winston.transports.File({
            level: 'fatal',
            filename: './errors.log',
            format: winston.format.simple()
        })
    ]
})

//Lo vamos a usar en un pequeño archivo config a nivel de rutas como middleware
export const addLogger = (req, res, next) => { //next porque se debe contiuar la ejecucion luego de terminar el middleware
    req.logger = logger;
    req.logger.info(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()} `);
}