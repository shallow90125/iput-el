import { AlarmDoc } from "@/types/AlarmDoc";
import { FirestoreDataConverter } from "firebase/firestore";

export const alarmConverter: FirestoreDataConverter<AlarmDoc> = {
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: data.id,
      hour: data.hour,
      minute: data.minute,
      weekBit: data.weekBit,
      isEnabled: data.isEnabled,
    };
  },
  toFirestore(data: AlarmDoc) {
    return {
      id: data.id,
      hour: data.hour,
      minute: data.minute,
      weekBit: data.weekBit,
      isEnabled: data.isEnabled,
    };
  },
};
