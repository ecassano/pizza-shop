import { api } from "@/lib/axios";

export interface ApproveOrderProps {
  orderId: string;
}

export const approveOrder = async ({ orderId }: ApproveOrderProps) => {
  await api.patch(`/orders/${orderId}/approve`);
};
