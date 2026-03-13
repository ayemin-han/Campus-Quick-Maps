export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: undefined;  
  Detail: {
    location: {
      id: string;
      name: string;
      description: string;
      image: any;
    };
  };
};
