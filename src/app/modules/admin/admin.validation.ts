import { z } from 'zod';

const updateUserSchema = z.object({
  isBlocked: z.boolean({
    required_error: 'update info is required',
    invalid_type_error: 'the update data must be a boolean',
  }),
  userId: z.string({
    required_error: 'user id is required',
    invalid_type_error: 'the user id must be a string',
  }),
});

const updateRoleSchema = z.object({
  role: z.string({
    required_error: 'update info is required',
  }),
});
const updateOrderDeliveryStatusSchema = z.object({
  deliveryStatus: z.string({
    required_error: ' status  is required',
  }),
});
const updateOrderStatus = z.object({
  orderStatus: z.string({
    required_error: 'order status  is required',
  }),
  orderId: z.string({
    required_error: 'order id  is required',
    invalid_type_error: 'the order id must be a string',
  }),
});
export const adminValidations = {
  updateUserSchema,
  updateRoleSchema,
  updateOrderStatus,
  updateOrderDeliveryStatusSchema,
};
