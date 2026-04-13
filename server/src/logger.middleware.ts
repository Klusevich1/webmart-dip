import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const duration = Date.now() - start;
      const status = res.statusCode;
      const statusEmoji = status >= 500 ? '❌' : status >= 400 ? '⚠️' : '✅';
      const ts = new Date().toISOString().slice(11, 19); // HH:mm:ss
      console.log(`[${ts}] ${statusEmoji} ${method} ${originalUrl} → ${status} (${duration}ms)`);
    });

    next();
  }
}
