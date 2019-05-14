import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, prettyPrint, printf } = format;

export class APILogger {
    public static myFormat = printf(info => {
        return `[${info.timestamp}] [${info.level}] => ${info.message}`
    });

    public static logger = createLogger({
        level: 'info',
        format: combine(
            label({ label: 'projects-api errors' }),
            timestamp(),
            APILogger.myFormat
        ),

        transports: [
            new transports.File({ filename: 'combined.log' }),
            new transports.Console(),
        ],
    });
}