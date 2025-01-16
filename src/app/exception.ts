import type { ErrorRequestHandler, RequestHandler } from 'express';

export const sendNotFoundError: RequestHandler = (_req, res) => {
  res.status(404).send({
    status: false,
    message: '無此路由資訊'
  });
};

export const catchCustomError: ErrorRequestHandler = (err, _req, res, _next) => {
  const message = getErrorMessage(err);

  res.status(err?.status || 400).send({
    ...message,
    status: false
  });

  return;
};

const getErrorMessage = (err: any) => {
  if (typeof err === 'string') {
    return { message: err };
  }

  if ('type' in err && err.type === 'entity.parse.failed') {
    return { message: err.type };
  }

  // 開發模式回傳錯誤訊息
  if (process.env.NODE_ENV === 'development') {
    return { message: err.message, err };
  }

  return { message: err.message };
};

