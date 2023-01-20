/**
 * @DESC  Higher order function that can be used to wrap controller function to remove repeated try catch blocks.
 */
const asyncHandler = (cb) => async (req, res, next) => {
  try {
    await cb(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = asyncHandler;
