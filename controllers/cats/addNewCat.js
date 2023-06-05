const createError = require('http-errors');
const { Cat } = require('../../models/index');
const { catchAsync, catValidator } = require('../../utils');

const addNewCat = catchAsync(async (req, res, next) => {
  const { error } = catValidator(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  const result = await Cat.create({ ...req.body });

  res.status(201).json({
    status: 'added',
    code: 201,
    data: { result },
  });
});

module.exports = addNewCat;
