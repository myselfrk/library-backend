const config =  require('config');

exports.getPaginationOptions = function(req) {
  const page = (req.query.pageNo !== undefined) ? parseInt(req.query.pageNo) : config.pagination.defaultPage;
  const limit = (req.query.pageSize !== undefined) ? parseInt(req.query.pageSize) : config.pagination.defaultLimit;

  return {
    page: page,
    limit: limit
  };
};

exports.setPaginationHeaders = function(res, result) {
  res.set('Pagination-Count', result.total);
  res.set('Pagination-Page', result.page);
  res.set('Pagination-Limit', result.limit);
};
