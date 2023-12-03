import pinoPretty, { PrettyOptions } from 'pino-pretty';

export default function (opts: PrettyOptions) {
  return pinoPretty({
    ...opts,
    messageFormat(log, messageKey) {
      // formatowanie, jeśli mamy reqId:
      const reqId = log.reqId ? `<RQ:${log.reqId}> |` : '';
      // formatowanie, jeśli nadany context:
      const context = log.context ? `[${log.context || ''}]` : '';
      // wiadomość podana w `.log('')` lub `.warn('')` ale bez kontekstu i reqId
      const msg = log[messageKey];
      return [reqId, context, msg].join(' ');
    },
    // Tych pól nie pokazuj pod logowaną wartością i nie dodawaj ich automatycznie
    ignore: 'context,reqId,hostname,pid',
  });
}
