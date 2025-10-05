import CreateMeditationForm from "@/components/meditaion/CreateMeditationForm";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { mainStyleSheet as styles } from "../admin/style";

type CreateMeditationModalProps = {
  visible: boolean;
  setShowMeditationForm: (show: boolean) => void;
  createMeditation: (
    userId: string,
    title: string,
    description: string,
    date: string,
    verse: string,
    audioUrl: string
   ) => Promise<{ data: any; error: any }>;
   userId: string;
  error: any;
  setError: (error: any) => void;
  success: string | null;
  setSuccess: (message: string | null) => void;
};

export const CreateMeditationModal: React.FC<CreateMeditationModalProps> = ({
  visible,
  setShowMeditationForm,
  createMeditation,
  userId,
  error,
  setError,
  success,
  setSuccess,
}) => {
  return (
         <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
            <View style={styles.fullScreenForm}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowMeditationForm(false)}
              >
                <Ionicons name="close" size={32} color="#1d2052" />
              </TouchableOpacity>
              <CreateMeditationForm
                onCreate={async (title, description, date, verse, audioUrl) => {
                  const { data, error } = await createMeditation(userId, title, description, date, verse, audioUrl);
                  if (error) setError(error);
                  if (data) {
                    setError(null);
                    setSuccess("Meditation created successfully");
                    setShowMeditationForm(false);
                  }
                }}
                error={error}
                success={success}
              />
            </View>
          </Modal>
  );
};

export default CreateMeditationModal;
