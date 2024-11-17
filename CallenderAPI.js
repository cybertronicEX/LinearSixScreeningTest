const express = require('express');
const cors = require('cors');
dataModel = [
    { calenderId: 1, startTime: "10.30", endTime: "11.00" },
    { calenderId: 1, startTime: "11.30", endTime: "12.00" },
]
const app = express();
app.use(cors());
app.get('/getData', (req, res) => {
    const { calenderId, startTime, endTime } = req.query;
    const timePattern = /^\d{2}\.\d{2}$/;
    if (calenderId && startTime && endTime) {
        if (!timePattern.test(startTime) || !timePattern.test(endTime)) {
            return res.status(400).json({ message: 'Please use HH.mm (e.g., 10.30)' });
        } else {
            const meetings = dataModel.filter(item => item.calenderId === Number(calenderId));
            console.log(meetings);

            if (meetings.length > 0) {
                const [startHours, startMinutes] = startTime.split('.').map(Number);
                const [endHours, endMinutes] = endTime.split('.').map(Number);
                if (startHours > 24 || endHours > 24 || startMinutes > 59 || endMinutes > 59) {
                    return res.status(400).json({ message: 'please use a  valid time in between 00.00 - 23.59' });
                } else if (endHours < startHours) {
                    return res.status(400).json({ message: 'End time cannot be prior to start time.' });
                } else {
                    const result = meetings.filter(element => {
                        const [meetingStartHours, meetingStartMinutes] = element.startTime.split('.').map(Number);
                        const [meetingEndHours, meetingEndMinutes] = element.endTime.split('.').map(Number);
                        const meetingStart = meetingStartHours * 60 + meetingStartMinutes;
                        const meetingEnd = meetingEndHours * 60 + meetingEndMinutes;
                        const requestStart = startHours * 60 + startMinutes;
                        const requestEnd = endHours * 60 + endMinutes;
                        return !(meetingEnd <= requestStart || meetingStart >= requestEnd);
                    })
                    if (result.length > 0) {
                        return res.json(result);
                    } else {
                        res.json({ message: 'No meetings found in the time slot.' })
                    }
                }
            } else {
                res.status(404).json({ message: 'calenderId not found' });
            }
        }
    } else {
        res.status(400).json({
            message: 'Missing Data'
        })
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

