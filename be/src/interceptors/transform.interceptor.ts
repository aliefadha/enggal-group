import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T = unknown> {
  statusCode: number;
  message: string;
  data: T;
  meta?: unknown;
}

@Injectable()
export class TransformInterceptor
  implements NestInterceptor<unknown, Response<unknown>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<unknown>> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        if (
          data &&
          typeof data === 'object' &&
          'data' in data &&
          'meta' in data
        ) {
          const {
            data: innerData,
            meta,
            message,
          } = data as {
            data: unknown;
            meta: unknown;
            message?: string;
          };

          return {
            statusCode: response.statusCode,
            message: message ?? 'Success',
            data: innerData,
            meta,
          };
        }

        return {
          statusCode: response.statusCode,
          message: 'Success',
          data,
        };
      }),
    );
  }
}
