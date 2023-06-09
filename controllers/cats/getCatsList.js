const { Cat } = require('../../models/index');
const { catchAsync } = require('../../utils');

const { enums } = require('../../constants');

const getCatsList = catchAsync(async (req, res, next) => {
  const {
    page,
    limit,
    status = 'all',
    location = 'all',
    gender = 'all',
    color = 'all',
  } = req.query;

  ///api/cats?status=<homeless>&location=<Kherson>&color=<Orange>&gender=<female>&page=<1>&limit=<2>

  const statusQuery =
    status === 'all' ? enums.STATUS_ENUM.ALL.split(',') : status.split(',');
  const locationQuery =
    location === 'all' ? enums.CITY_ENUM.ALL.split(',') : location.split(',');
  const colorQuery =
    color === 'all' ? enums.COLORS_ENUM.ALL.split(',') : color.split(',');
  const genderQuery =
    gender === 'all' ? enums.GENDERS_ENUM.ALL.split(',') : gender.split(',');

  const searchOptions = {
    $and: [
      { status: { $in: statusQuery } },
      { location: { $in: locationQuery } },
      { color: { $in: colorQuery } },
      { gender: { $in: genderQuery } },
    ],
  };

  const catsQuery = Cat.find(searchOptions);

  const paginationPage = +page || 1;
  const paginationLimit = +limit || 5;
  const skip = (paginationPage - 1) * paginationLimit;

  catsQuery.skip(skip).limit(paginationLimit);
  const catsCount = await Cat.count(catsQuery);
  const result = await catsQuery;

  res.status(200).json({
    status: 'ok',
    code: 200,
    total: catsCount,
    data: { result },
  });
});

module.exports = getCatsList;
