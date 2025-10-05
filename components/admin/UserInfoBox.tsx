// components/admin/UserInfoBox.tsx
import React from "react";
import { Image, Text, View } from "react-native";
import { mainStyleSheet as styles } from "./style";

type UserInfoBoxProps = {
  userInfo: any;
};

const UserInfoBox: React.FC<UserInfoBoxProps> = ({ userInfo }) => {
  if (!userInfo) return null;

  return (
    <View style={styles.userInfoBox}>
      <Image
        source={
          userInfo.user_metadata?.avatar_url
            ? { uri: userInfo.user_metadata?.avatar_url }
            : require("@/assets/images/icon.png")
        }
        style={styles.avatar}
      />
      <Text style={styles.userInfoText}>
        Names: {userInfo.user_metadata?.name || "N/A"}
      </Text>
      <Text style={styles.userInfoText}>
        Church: {userInfo.user_metadata?.church || "N/A"}
      </Text>
      <Text style={styles.userInfoText}>
        Phone: {userInfo.user_metadata?.phone || "N/A"}
      </Text>
      <Text style={styles.userInfoText}>Email: {userInfo.email}</Text>
      <Text style={styles.userInfoText}>
        Role: {userInfo.user_metadata?.role || "N/A"}
      </Text>
    </View>
  );
};

export default UserInfoBox;
