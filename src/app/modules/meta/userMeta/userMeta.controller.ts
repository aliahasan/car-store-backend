import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../../utils/sendResponse';
import tryCatchAsync from '../../../utils/tryCatchAsync';
import { userMetaServices } from './userMeta.service';

const handleGetUserMetaData = tryCatchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await userMetaServices.getUserMetaData(userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Meta data retrieved successfully',
    data: result,
  });
});

export const userMetaControllers = {
  handleGetUserMetaData,
};
