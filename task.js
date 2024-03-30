const express = require('express');
const router = express.Router();
const Task = require('./src/db/models/collection').Task;

router.get('/courses/:courseId/tasks', (req, res) => {
    const courseId = req.params.courseId;


    Task.find({ course_id: courseId })
        .then(tasks => {
            if (tasks.length === 0) {
                res.status(404).json({ error: 'No tasks found for the specified course' });
            } else {
                res.json(tasks);
            }
        })
        .catch(error => {
            console.error('Error retrieving tasks:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});


router.post('/addTask', (req, res) => {
    const { courseId, taskName, dueDate, additionalDetails } = req.body;


    const newTask = new Task({
        course_id: courseId,
        task_name: taskName,
        due_date: dueDate,
        additional_details: additionalDetails
    });


    newTask.save()
        .then(task => {
            res.status(201).json(task);
        })
        .catch(error => {
            console.error('Error adding task:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

module.exports = router;