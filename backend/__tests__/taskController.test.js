const { getAllTasks, createTask, updateTask, deleteTask } = require('../src/controllers/task-controller');
const Task = require('../src/models/Task');
const Category = require('../src/models/Category');
const { getDateTomorrow } = require('../src/util/dates');

// Mocks
jest.mock('../src/models/Task');
jest.mock('../src/models/Category');
jest.mock('../src/util/dates');

describe('getAllTasks controller', () => {
    let req, res;

    const mockTaskFind = (result) => {
        Task.find.mockReturnValue({ sort: jest.fn().mockResolvedValue(result) });
    };

    beforeEach(() => {
        req = {
            user: { _id: 'user123' },
            query: {}
        };

        res = {
            json: jest.fn(),
            status: jest.fn(() => res)
        };

        Task.find.mockReset();
        getDateTomorrow.mockReset();
        jest.clearAllMocks();
    });

    it('should fetch all tasks for the user', async () => {
        const fakeTasks = [{ title: 'Test Task' }];
        mockTaskFind(fakeTasks);

        await getAllTasks(req, res);

        expect(Task.find).toHaveBeenCalledWith({ 'user.userId': 'user123' });
        expect(res.json).toHaveBeenCalledWith(fakeTasks);
    });

    it('should apply "today" dueDate filter', async () => {
        const todayMidnight = new Date(new Date().setHours(0, 0, 0, 0));
        const tomorrow = new Date(todayMidnight);
        tomorrow.setDate(tomorrow.getDate() + 1);
        getDateTomorrow.mockReturnValue(tomorrow);

        req.query.dueDate = 'today';
        const fakeTasks = [{ title: 'Today Task' }];
        mockTaskFind(fakeTasks);

        await getAllTasks(req, res);

        expect(Task.find).toHaveBeenCalledWith({
            'user.userId': 'user123',
            taskDate: {
                $gte: todayMidnight,
                $lt: tomorrow
            }
        });
        expect(res.json).toHaveBeenCalledWith(fakeTasks);
    });

    it('should apply "past" dueDate filter', async () => {
        const todayMidnight = new Date(new Date().setHours(0, 0, 0, 0));

        req.query.dueDate = 'past';
        const fakeTasks = [{ title: 'Old Task' }];
        mockTaskFind(fakeTasks);

        await getAllTasks(req, res);

        expect(Task.find).toHaveBeenCalledWith({
            'user.userId': 'user123',
            taskDate: {
                $lt: todayMidnight
            }
        });
        expect(res.json).toHaveBeenCalledWith(fakeTasks);
    });

    it('should apply completed=false filter', async () => {
        req.query.completed = 'false';
        const fakeTasks = [{ title: 'Incomplete Task' }];
        mockTaskFind(fakeTasks);

        await getAllTasks(req, res);

        expect(Task.find).toHaveBeenCalledWith({
            'user.userId': 'user123',
            completed: false
        });
        expect(res.json).toHaveBeenCalledWith(fakeTasks);
    });

    it('should apply search filter', async () => {
        req.query.search = 'meeting';
        const fakeTasks = [{ title: 'Team Meeting' }];
        mockTaskFind(fakeTasks);

        await getAllTasks(req, res);

        expect(Task.find).toHaveBeenCalledWith({
            'user.userId': 'user123',
            title: { $regex: 'meeting', $options: 'i' }
        });
        expect(res.json).toHaveBeenCalledWith(fakeTasks);
    });

    it('should apply date filter', async () => {
        const inputDate = '2023-12-25';
        req.query.date = inputDate;

        const dateAtMidnight = new Date(new Date(inputDate).setHours(0, 0, 0, 0));
        const dateNextDay = new Date(dateAtMidnight);
        dateNextDay.setDate(dateNextDay.getDate() + 1);

        const fakeTasks = [{ title: 'Christmas Task' }];
        mockTaskFind(fakeTasks);

        await getAllTasks(req, res);

        expect(Task.find).toHaveBeenCalledWith({
            'user.userId': 'user123',
            taskDate: {
                $gte: dateAtMidnight,
                $lt: dateNextDay
            }
        });
        expect(res.json).toHaveBeenCalledWith(fakeTasks);
    });

});

describe('createTask controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            user: {
                _id: 'user123',
                username: 'testuser'
            }
        };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res)
        };

        Task.mockReset();
        Category.findById.mockReset();
    });

    it('should return 400 if title is missing', async () => {
        req.body = { taskDate: new Date() };

        await createTask(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Task title is required' });
    });

    it('should create a new task without category', async () => {
        req.body = {
            title: 'New Task',
            taskDate: new Date()
        };

        const expectedTask = {
            title: req.body.title,
            taskDate: req.body.taskDate,
            user: {
                username: 'testuser',
                userId: req.user
            },
            category: {}
        };

        // Create a mock Task instance with all required properties + save()
        const mockTaskInstance = {
            ...expectedTask,
            save: jest.fn().mockResolvedValue()
        };

        Task.mockImplementation(() => mockTaskInstance);

        await createTask(req, res);

        expect(mockTaskInstance.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockTaskInstance);
    });

    it('should create a task with category info if valid categoryId is given', async () => {
        req.body = {
            title: 'Categorized Task',
            taskDate: new Date(),
            category: {
                categoryId: 'cat123'
            }
        };

        const fakeCategory = {
            _id: 'cat123',
            name: 'Work',
            colour: 'blue'
        };

        Category.findById.mockResolvedValue(fakeCategory);

        const expectedTask = {
            title: req.body.title,
            taskDate: req.body.taskDate,
            user: {
                username: 'testuser',
                userId: req.user
            },
            category: {
                categoryId: 'cat123'
            },
        }
        const mockTaskInstance = {
            ...expectedTask,
            save: jest.fn().mockResolvedValue()
        };

        Task.mockImplementation(() => mockTaskInstance);

        await createTask(req, res);

        expect(Category.findById).toHaveBeenCalledWith('cat123');
        expect(mockTaskInstance.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockTaskInstance);
    });

});

describe('updateTask controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: { _id: 'user123', username: 'testuser' },
            params: { id: 'task123' },
            body: {}
        };
        res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    it('should return 404 if task not found', async () => {
        Task.findOne.mockResolvedValue(null);

        await updateTask(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Task of user not found' });
    });

    it('should update task if found and no category is provided', async () => {
        const existingTask = {
            _id: 'task123',
            _doc: {
                title: 'Old Title',
                completed: false,
                user: {
                    userId: 'user123'
                }
            }
        };

        req.body = {
            title: 'Updated Title',
            completed: true
        };

        Task.findOne.mockResolvedValue(existingTask);
        Task.findByIdAndUpdate.mockResolvedValue({ ...existingTask._doc, ...req.body });

        await updateTask(req, res);

        expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
            'task123',
            expect.objectContaining({
                title: 'Updated Title',
                completed: true,
                category: {}
            }),
            { new: true }
        );

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Updated Title',
            completed: true
        }));
    });

    it('should update task and link category if categoryId is provided', async () => {
        const existingTask = {
            _id: 'task123',
            _doc: {
                title: 'Old Task',
                completed: false,
                user: { userId: 'user123' }
            }
        };

        const mockCategory = {
            _id: 'cat123',
            name: 'Work',
            colour: 'blue'
        };

        req.body = {
            title: 'Updated Task',
            category: { categoryId: 'cat123' }
        };

        Task.findOne.mockResolvedValue(existingTask);
        Category.findById.mockResolvedValue(mockCategory);
        Task.findByIdAndUpdate.mockResolvedValue({
            ...existingTask._doc,
            ...req.body,
            category: {
                name: mockCategory.name,
                colour: mockCategory.colour,
                categoryId: mockCategory._id
            }
        });

        await updateTask(req, res);

        expect(Category.findById).toHaveBeenCalledWith('cat123');
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Updated Task',
            category: {
                name: 'Work',
                colour: 'blue',
                categoryId: 'cat123'
            }
        }));
    });

});

describe('deleteTask controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: {_id: 'user123', username: 'testuser'},
            params: {id: 'task123'},
            body: {}
        };
        res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    it('should return 404 if task not found', async () => {
        Task.find.mockResolvedValue(null);

        await deleteTask(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Task of user not found' });
    });

    it('should delete the task if it exists', async () => {
        Task.find.mockResolvedValue([ { _id: 'task123' } ]);
        Task.deleteOne.mockResolvedValue({});

        await deleteTask(req, res);

        expect(Task.deleteOne).toHaveBeenCalledWith({ _id: 'task123' });
        expect(res.json).toHaveBeenCalledWith({ message: 'Task deleted' });
    });


});