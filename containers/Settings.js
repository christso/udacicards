import React from 'react';
import { Text, Platform, TouchableOpacity, TimePickerAndroid, DatePickerIOS } from 'react-native';
import { connect } from 'react-redux';
import View from '../components/View';
import { lightPurp } from '../utils/colors';
import SectionHeading from '../components/SectionHeading';
import { setQuizReminder } from '../actions/quizReminder';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import SubmitBtn from '../components/SubmitBtn';

class Settings extends React.Component {
  state = {
    showDatePickerIOS: false
  }

  setReminder = (hour, minute) => {
    this.props.dispatch(setQuizReminder(hour, minute));
    clearLocalNotification()
      .then(setLocalNotification(hour, minute));
  }

  showTimePickerAndroid = async () => {
    const remindHour = this.props.quizReminder.hour;
    const remindMinute = this.props.quizReminder.minute;
    const { action, hour, minute } = await TimePickerAndroid.open({
      hour: remindHour,
      minute: remindMinute,
      is24Hour: false, // Will display '2 PM'
    });

    if (action !== TimePickerAndroid.dismissedAction) {
      this.setReminder(hour || 0, minute || 0);
    }
  }

  hideDatePickerIOS = () => {
    console.log('hideDatePicker');
    this.setState((state) => ({ showDatePickerIOS: false }));
  }

  createDatePickerIOS = () => {
    const remindHour = this.props.quizReminder.hour;
    const remindMinute = this.props.quizReminder.minute;

    const currentDate = new Date();
    return (
      <View>
        <Text>Daily Reminder Time</Text>
          <DatePickerIOS
            date={new Date(
              currentDate.getUTCFullYear(),
              currentDate.getUTCMonth(),
              currentDate.getUTCDay(),
              remindHour,
              remindMinute
            )}
            onDateChange={(dt) => this.setReminder(dt.getHours(), dt.getMinutes())}
            mode='time'
          />
          <SubmitBtn onPress={this.hideDatePickerIOS} text='Select' />
      </View>
    )
  }

  showTimePicker = async () => {
    if (Platform.OS == 'ios') {
      this.setState((state) => ({ ...state, showDatePickerIOS: true }))
    } else {
      await this.showTimePickerAndroid();
    }
  }

  render() {
    const { quizReminder } = this.props;

    if (this.state.showDatePickerIOS) {
      return this.createDatePickerIOS()
    }

    return (
      <View>
        <SectionHeading text='Notifications' />
        <Text>Daily Reminder:</Text>
        <Text onPress={this.showTimePicker}>{quizReminder.hour
          + ':' + quizReminder.minute.toString().padStart(2, '0')}</Text>
      </View>
    )
  }
}

function mapStateToProps({ quizReminder }) {
  return {
    quizReminder
  };
}

export default connect(mapStateToProps)(Settings);