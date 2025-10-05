import Auth from "@/components/auth/login";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootTabParamList } from "../_layout";

type Props = BottomTabScreenProps<RootTabParamList, 'Profil'>;


export default function AuthScreen({ route }: Props) {
  const isSignUp = route.params.isSignUp
  return <Auth isSignUpProp={isSignUp} />;
}



