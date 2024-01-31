export type fetchResponseError = {
  success: false;
  message: string;
};

export type shippingInfoProps = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
};