import * as Crypto from "expo-crypto";
import * as Calendar from "expo-calendar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const encrpt = async (text) => {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    text
  );
  return digest;
};

export const getDate = (time) => {
  const d = new Date(time);
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getTime = (time) => {
  const d = new Date(time);
  const hours = d.getHours().toString().padStart(2, "0");
  const mins = d.getMinutes().toString().padStart(2, "0");
  return `${hours} : ${mins}`;
};

export const CompareDateObjects = (date1, date2) => {
  return (
    date1.getDay() == date2.getDay() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear()
  );
};

const getDefaultCalendarSource = async () => {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
};

const createCalendar = async () => {
  const defaultCalendarSource =
    Platform.OS === "ios"
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: "Expo Calendar" };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: "Expo Calendar",
    color: "blue",
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: "internalCalendarName",
    ownerAccount: "personal",
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
  return newCalendarID;
};

const requestCalenderPermissions = async () => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status !== "granted") {
    return false;
  }
  return true;
};

export const createCalendarEvent = async (
  title,
  date,
  location,
  description
) => {
  const calendarPermission = await requestCalenderPermissions();
  if (!calendarPermission) {
    return;
  }

  let calendarId = await AsyncStorage.getItem("calendarId");
  if (calendarId == null) {
    calendarId = await createCalendar();
    await AsyncStorage.setItem("calendarId", calendarId);
  }

  // Define the event details
  const eventDetails = {
    title: title,
    startDate: date, // new date start time
    endDate: new Date(date.getTime() + 60 * 60 * 1000), // Event duration: 1 hour
    timeZone: "IST",
    location: location,
    notes: description,
  };
  // Create the event in the calendar
  try {
    const eventId = await Calendar.createEventAsync(calendarId, eventDetails);
    let events = await AsyncStorage.getItem("events");
    if (events == null) {
      events = [eventId];
    } else {
      events = JSON.parse(events);
      events.push(eventId);
    }
    console.log(events);
    await AsyncStorage.setItem("events", JSON.stringify(events));
    return eventId;
  } catch (error) {
    console.log("Error creating event:", error);
    return null;
  }
};

export const removeCalendarEvent = async (eventId) => {
  const calendarPermission = await requestCalenderPermissions();
  if (!calendarPermission) {
    return;
  }
  // Remove the event from the calendar
  try {
    await Calendar.deleteEventAsync(eventId, { futureEvents: false });
    let events = await AsyncStorage.getItem("events");
    if (events != null) {
      events = JSON.parse(events);
      events = events.filter((event) => event !== eventId);
      await AsyncStorage.setItem("events", JSON.stringify(events));
    }
    return true;
  } catch (error) {
    console.log("Error removing event:", error);
    return false;
  }
};

export const removeAllEvents = async () => {
  let events = await AsyncStorage.getItem("events");
  if (events != null) {
    events = JSON.parse(events);
    for (let event of events) {
      await Calendar.deleteEventAsync(event, { futureEvents: false });
    }
    await AsyncStorage.removeItem("events");
  }
};
