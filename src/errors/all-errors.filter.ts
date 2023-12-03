import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(Error)
export class AllErrorsFilter implements ExceptionFilter {
  catch(exception: Error | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      // jeżeli to NestJS'owy błąd, instancja HttpException, to obsłuż ją tak jak do tej pory:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      response.status(exception.getStatus()).json(exception.getResponse());
      // nie idź dalej, żeby nie zrobić "podwójnego response" na jeden request!
      return;
    }
    // jeśli błąd posiada pole `code` sprawdź, czy to nie file-system error
    if (
      [
        'EACCES',
        'EEXIST',
        'ENOENT',
        'ENOTDIR',
        'ENOTEMPTY',
        'EMFILE',
        'EISDIR',
      ].includes(exception?.code)
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'File i/o error (check logs)',
        error: 'Internal Server Error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
    // Jeśli to nieznany błąd (inny niż HttpException):
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Unknown error',
      error: 'Internal Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
