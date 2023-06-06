const createError = require('http-errors');
const { Cat } = require('../../models/index');
const { catchAsync } = require('../../utils');

const getCatById = catchAsync(async (req, res, next) => {
  const { catId } = req.params;

  const result = await Cat.findById(catId);
  if (!result) {
    throw createError(404, `Cat with id ${catId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    data: { result },
  });
});

module.exports = getCatById;
