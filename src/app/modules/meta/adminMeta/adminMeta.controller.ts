import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../../utils/sendResponse';
import tryCatchAsync from '../../../utils/tryCatchAsync';
import { adminMetaService } from './adminMeta.service';

const handleGetAdminMetaData = tryCatchAsync(async (req, res) => {
  const result = await adminMetaService.getAdminMetaData();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Meta data retrieved successfully',
    data: result,
  });
});

export const adminMetaControllers = {
  handleGetAdminMetaData,
};
