const { getCategories, createCategory, updateCategory, deleteCategory} = require('../src/controllers/category-controller');
const Category = require('../src/models/Category');
const Task = require('../src/models/Task');

// Mocks
jest.mock('../src/models/Category');
jest.mock('../src/models/Task');

describe('getCategories controller', () => {
    let req, res;

    const mockCategoryFind = (result) => {
        Category.find.mockReturnValue({ sort: jest.fn().mockResolvedValue(result) });
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

        Category.find.mockReset();
        jest.clearAllMocks();
    });

    it('should fetch all categories for the user', async () => {
        const fakeCategories = [{ name: 'Test Category', colour: 'green' }];
        mockCategoryFind(fakeCategories);

        await getCategories(req, res);

        expect(Category.find).toHaveBeenCalledWith({ 'user.userId': 'user123' });
        expect(res.json).toHaveBeenCalledWith(fakeCategories);
    });

});

describe('createCategory controller', () => {
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

        Category.mockReset();
        Category.findById.mockReset();
    });

    it('should return 400 if name is missing', async () => {
        req.body = { colour: 'red' };

        await createCategory(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Category name is required' });
    });

    it('should create a new category', async () => {
        req.body = {
            name: 'New Category',
            colour: 'red'
        };

        const expectedCategory = {
            name: req.body.name,
            colour: req.body.colour,
            user: {
                username: 'testuser',
                userId: req.user
            }
        };

        // Create a mock Category instance with all required properties + save()
        const mockCategoryInstance = {
            ...expectedCategory,
            save: jest.fn().mockResolvedValue()
        };

        Category.mockImplementation(() => mockCategoryInstance);

        await createCategory(req, res);

        expect(mockCategoryInstance.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockCategoryInstance);
    });

});

describe('updateCategory controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: { id: 'category123' },
            user: { _id: 'user123' },
            body: {
                name: 'Updated Category',
                colour: 'blue'
            }
        };
        res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    it('should return 404 if category is not found', async () => {
        Category.find.mockResolvedValue(null);

        await updateCategory(req, res);

        expect(Category.find).toHaveBeenCalledWith({ 'user.userId': 'user123', _id: 'category123' });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Category not found' });
    });

    it('should update category and related tasks and return updated category', async () => {
        const fakeCategory = { _id: 'category123', name: 'Old Name' };
        const updatedCategory = { _id: 'category123', name: 'Updated Category', colour: 'blue' };

        Category.find.mockResolvedValue(fakeCategory);
        Category.findByIdAndUpdate.mockResolvedValue(updatedCategory);
        Task.updateMany.mockResolvedValue({ modifiedCount: 1 });

        await updateCategory(req, res);

        expect(Category.findByIdAndUpdate).toHaveBeenCalledWith(
            'category123',
            req.body,
            { new: true }
        );

        expect(Task.updateMany).toHaveBeenCalledWith(
            { 'category.categoryId': 'category123' },
            {
                $set: {
                    'category.name': 'Updated Category',
                    'category.colour': 'blue'
                }
            }
        );

        expect(res.json).toHaveBeenCalledWith(updatedCategory);
    });

    it('should return 500 on error', async () => {
        const error = new Error('Something went wrong');
        Category.find.mockRejectedValue(error);

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

        await updateCategory(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });

        consoleSpy.mockRestore();
    });

});

describe('deleteCategory controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: { id: 'category123' },
            user: { _id: 'user123' }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        jest.clearAllMocks();
    });

    it('should return 404 if category is not found', async () => {
        Category.find.mockResolvedValue([]); // Empty array = not found

        await deleteCategory(req, res);

        expect(Category.find).toHaveBeenCalledWith({ 'user.userId': 'user123', _id: 'category123' });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Category not found' });
    });

    it('should delete the category and unset it from tasks', async () => {
        const fakeCategory = [{ _id: 'category123' }];
        Category.find.mockResolvedValue(fakeCategory);
        Category.deleteOne.mockResolvedValue({ deletedCount: 1 });
        Task.updateMany.mockResolvedValue({ modifiedCount: 5 });

        await deleteCategory(req, res);

        expect(Category.deleteOne).toHaveBeenCalledWith({ _id: 'category123' });
        expect(Task.updateMany).toHaveBeenCalledWith(
            { 'category.categoryId': 'category123' },
            { $unset: { category: null } }
        );
        expect(res.json).toHaveBeenCalledWith({ message: 'Category deleted' });
    });

    it('should return 500 if an error occurs', async () => {
        const error = new Error('DB Error');
        Category.find.mockRejectedValue(error);

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});


        await deleteCategory(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });

        consoleSpy.mockRestore();

    });
});