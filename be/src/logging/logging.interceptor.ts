import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const { method, url, body, headers } = request

    const requestLog = {
      timestamp: new Date(),
      method,
      url,
      headers,
      body,
    }

    // console.log('Request:', requestLog)

    const startTime = Date.now()

    return next
      .handle()
      .pipe(
        tap((response) => {
          const responseLog = {
            timestamp: new Date(),
            duration: Date.now() - startTime,
            request: requestLog,
            response,
            status: 'success',
          }
          // console.log('Response:', responseLog)
        }),
        catchError((error) => {
          const errorLog = {
            timestamp: new Date(),
            duration: Date.now() - startTime,
            request: requestLog,
            error: {
              message: error.message,
              code: error.status || 500,
              stack: error.stack,
            },
            status: 'error',
          }
          // console.log('Error:', errorLog)
          throw error
        }),
      )
  }
}
