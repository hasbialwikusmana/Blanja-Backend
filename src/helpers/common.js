const response = (res, result, status, message, pagination) => {
  const resultPrint = {};
  resultPrint.status = "Success";
  if (status >= 400) {
    resultPrint.status = "Error";
  }
  resultPrint.status_code = status || 200;
  resultPrint.data = result || null;
  resultPrint.message = message || null;
  resultPrint.pagination = pagination;
  return res.status(resultPrint.status_code).json(resultPrint);
};

module.exports = {
  response,
};
