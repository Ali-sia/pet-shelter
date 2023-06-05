const { Cat } = require('../../models/index');
const { catchAsync } = require('../../utils');

const getCatsList = catchAsync(async (req, res, next) => {
  const data = await Cat.find();

  res.status(200).json({
    status: 'ok',
    code: 200,
    data,
  });
});

module.exports = getCatsList;
