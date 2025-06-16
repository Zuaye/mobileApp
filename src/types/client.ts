export interface ClientRegistrationData {
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture?: File;
}

export interface ClientProfile
  extends Omit<ClientRegistrationData, "profilePicture"> {
  id: string;
  profilePictureUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
