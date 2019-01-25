class CountdownTimer {

    constructor(target_date) {
        let date_in_milliseconds;

        date_in_milliseconds = new Date().getTime();
        this.time_in_milliseconds = CountdownTimer.convert_date_to_seconds(date_in_milliseconds, target_date);
    }

    static convert_date_to_seconds(actual_date = undefined, target_date) {
        let date_diff;

        if (target_date === undefined) {
            return 0;
        }

        target_date = new Date(target_date).getTime();

        date_diff = target_date - actual_date;

        if (date_diff < 0) {
            return 0;
        }

        return date_diff;
    }

    static convert_milliseconds_to_time(milliseconds = 0) {
        let days, hours, minutes, seconds;

        seconds = Math.floor(milliseconds / 1000);
        minutes = Math.floor(seconds / 60);
        hours = Math.floor(minutes / 60);
        days = Math.floor(hours / 24);

        seconds = seconds % 60;
        minutes = minutes % 60;
        hours = hours % 24;

        return {days: days, hours: hours, minutes: minutes, seconds: seconds};
    }

    static decrease_one_second(milliseconds = 0) {
        if (milliseconds < 1000) {
            return 0;
        }

        return milliseconds - 1000;
    }

    static get_time(milliseconds = 0) {
        return CountdownTimer.convert_milliseconds_to_time(milliseconds);
    }

    static update_time(html, milliseconds = 0) {
        let time;

        time = CountdownTimer.get_time(milliseconds);
        CountdownTimer.display_time(html, time);

        return CountdownTimer.decrease_one_second(milliseconds);
    }

    // TODO: Stop the setInterval when the time in milliseconds is zero.
    static sleep_wakeup_forever(html, milliseconds = 0) {
        setInterval(function () {
            milliseconds = CountdownTimer.update_time(html, milliseconds);
        }, 1000);
    }

    static display_time(html, time) {
        html.getElementById("days").innerText = time.days;
        html.getElementById("hours").innerText = time.hours;
        html.getElementById("minutes").innerText = time.minutes;
        html.getElementById("seconds").innerText = time.seconds;
    }

    run(html) {
        CountdownTimer.sleep_wakeup_forever(html, this.time_in_milliseconds)
    }
}
