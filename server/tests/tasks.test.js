const tasks = require('../controllers/tasks-controller');
const mongodb = require('mongodb');

test('should get back a confirmation message with task id when creating', () => {
    expect(tasks.createTask({
        description: "Test Description", 
        priority: "High",
        dueDate: Date.now(),
        occurrence: "Daily",
        userID: mongodb.ObjectId.createFromHexString(1)
    }).toBe(
        { message: "Success"}
    ));
});
        
