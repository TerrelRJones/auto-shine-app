export type AuthStackParams = {
  Registration: undefined;
  Login: undefined;
};

export type HomeStackParams = {
  HomeStack: undefined;
  Service: undefined;
  Profile: { serviceId: string };
  Payment: undefined;
  Confirmation: undefined;
};
export type ProfileStackParams = {
  Profile: undefined;
  Edit: undefined;
  AddVehicle: undefined;
  AddAddress: undefined;
};
