import express from 'express';

const serve = (publicFolder) => {
  const expressStatic = express.static(publicFolder);

  return (req, res, next) => {
    if (req.path === '/') {
      return next();
    } else if (['/server', '/admin'].some(path => req.url.startsWith(path))) {
      return res.status(404).end('404 Not found');
    }

    expressStatic(req, res, next);
  };
};

export default serve;
