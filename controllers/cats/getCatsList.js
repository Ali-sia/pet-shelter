const { Cat } = require('../../models/index');
const { catchAsync } = require('../../utils');

const getCatsList = catchAsync(async (req, res, next) => {
  const result = await Cat.find().sort({ createdAt: 1 }).lean();

  res.status(200).json({
    status: 'ok',
    code: 200,
    data: { result },
  });
});

module.exports = getCatsList;
