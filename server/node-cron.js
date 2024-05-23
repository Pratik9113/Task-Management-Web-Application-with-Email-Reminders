

import cron from "node-cron";
import addModel from "./models/addmodel.js";
import { SendmailTransport } from "./sendMail.js";
import userModel from "./models/userModules.js";
const startCron = () => {
    cron.schedule('* * * * *', async () => {
        try {
            const allTasks = await addModel.find();
            const now = new Date();
            for(const task of allTasks){
                const [year, month, day] = task.deadline.split('-').map(Number);
                const [hour, minute] = task.time.split(':').map(Number);
                const deadlineTime = new Date(year, month - 1, day, hour, minute);
                const oneHourBeforeDeadline = new Date(deadlineTime.getTime() - (60 * 60 * 1000));
                if (now >= oneHourBeforeDeadline && now < deadlineTime) {
                    const user = await userModel.findById(task.userId);
                    if (user && user.email && !task.reminderSent) {
                        task.reminderSent  = true;
                        await task.save();
                        await SendmailTransport(user.email, task.title, task.description, task.deadline);
                        console.log('Reminder sent to:', user.email);
                    } else {
                        console.log('User not found for task:', task._id);
                    }
                }
                console.log('Checked task for email reminders:', task._id);
            }

            console.log('Checked all tasks for email reminders');

        } catch (error) {
            console.error('Error occurred while checking tasks for email reminders:', error);
        }
    });
}


export default startCron;
