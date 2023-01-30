import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";

import { COLORS, FONTS, STYLES } from "../../assets/styles";

const MONTHS = [
  "ינואר",
  "פברואר",
  "מרס",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];

const WEEK = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const generateMonthDays = (date) => {
  const days = [];
  let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfWeek = firstDayOfMonth.getDay();

  const days_num = getDaysInMonth(date.getFullYear(), date.getMonth());
  var week = [];
  for (let i = 0; i < dayOfWeek; i++) {
    week.push(" ");
  }

  for (let i = 1; i <= days_num; i++) {
    week.push(i.toString());
    if (week.length == 7) {
      days.push(week);
      week = [];
    }
  }
  if (week.length > 0) days.push(week);

  const index = days.length - 1;
  const length = 7 - days[index].length;

  for (let i = 0; i < length; i++) {
    days[index].push(" ");
  }

  return days;
};

const DatePicker = ({ currentDate, onSelect, style = {} }) => {
  const [selectedDate, setSelectedDate] = React.useState(currentDate);
  const [monthDays, setMonthDays] = React.useState(
    generateMonthDays(currentDate)
  );

  const handleNextMonth = () => {
    const date = new Date();
    date.setTime(selectedDate.getTime());
    date.setMonth(date.getMonth() + 1);
    setSelectedDate(date);
    setMonthDays(generateMonthDays(date));
  };

  const handlePrevMonth = () => {
    const date = new Date();
    date.setTime(selectedDate.getTime());
    date.setMonth(date.getMonth() - 1);
    setSelectedDate(date);
    setMonthDays(generateMonthDays(date));
  };

  const selectDay = (day) => {
    const date = new Date();
    date.setTime(selectedDate.getTime());
    date.setDate(parseInt(day));
    setSelectedDate(date);

    onSelect(date);
  };

  return (
    <View style={[styles.continer, style]}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={handlePrevMonth}>
          <AntDesign name="arrowright" size={30} color={COLORS.blue} />
        </TouchableOpacity>

        <View style={styles.headerTextWrapper}>
          <Text style={[FONTS.h2, { marginTop: -5, marginHorizontal: 10 }]}>
            {selectedDate.getFullYear()}
          </Text>
          <Text style={[FONTS.h2, { marginHorizontal: 10 }]}>
            {MONTHS[selectedDate.getMonth()]}
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.7} onPress={handleNextMonth}>
          <AntDesign name="arrowleft" size={30} color={COLORS.blue} />
        </TouchableOpacity>
      </View>

      <View style={{ marginVertical: 10 }}>
        <View style={styles.daysWrapper}>
          {WEEK.map((day) => (
            <View style={styles.dayTitleWrapper} key={day}>
              <Text style={[FONTS.body1, { color: COLORS.darkGray }]}>
                {day}
              </Text>
            </View>
          ))}
        </View>
        <Divider />
      </View>

      <View>
        {monthDays.map((week, index) => (
          <View key={index.toString()} style={styles.week}>
            {week.map((day, i) =>
              day != " " ? (
                <TouchableOpacity
                  onPress={() => selectDay(day)}
                  key={i.toString()}
                  style={[
                    styles.dayWrapper,
                    selectedDate.getDate().toString() == day
                      ? styles.selected
                      : null,
                  ]}
                >
                  <Text
                    style={[
                      FONTS.body2,
                      selectedDate.getDate().toString() == day
                        ? { color: COLORS.white }
                        : null,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={[styles.dayWrapper]} key={i.toString()} />
              )
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    padding: 10,
    ...STYLES.shadow,
  },
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTextWrapper: {
    flexDirection: "row-reverse",
    alignItems: "center",
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  daysWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row-reverse",
  },
  week: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayTitleWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dayWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    height: 40,
    width: 40,
  },
  selected: {
    borderRadius: 20,
    backgroundColor: COLORS.blue,
  },
});
