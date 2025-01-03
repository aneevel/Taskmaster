const ValidationUtil = require('../../utility/validation');

describe('ValidationUtil', () => {
    describe('isValidEmail', () => {
        it('should return true for valid email addresses', () => {
            expect(ValidationUtil.isValidEmail('test@example.com')).toBe(true);
            expect(ValidationUtil.isValidEmail('user.name@domain.co.uk')).toBe(true);
            expect(ValidationUtil.isValidEmail('user+tag@domain.com')).toBe(true);
        });

        it('should return false for invalid email addresses', () => {
            expect(ValidationUtil.isValidEmail('test')).toBe(false);
            expect(ValidationUtil.isValidEmail('@domain.com')).toBe(false);
            expect(ValidationUtil.isValidEmail('test@')).toBe(false);
            expect(ValidationUtil.isValidEmail('test@domain')).toBe(false);
        });
    });

    describe('isValidPassword', () => {
        it('should return true for valid passwords', () => {
            expect(ValidationUtil.isValidPassword('password123')).toBe(true);
            expect(ValidationUtil.isValidPassword('12345678')).toBe(true);
        });

        it('should return false for invalid passwords', () => {
            expect(ValidationUtil.isValidPassword('')).toBe(false);
            expect(ValidationUtil.isValidPassword('short')).toBe(false);
            expect(ValidationUtil.isValidPassword('a'.repeat(51))).toBe(false);
        });
    });

    describe('isValidName', () => {
        it('should return true for valid names', () => {
            expect(ValidationUtil.isValidName('John')).toBe(true);
            expect(ValidationUtil.isValidName('Mary Jane')).toBe(true);
        });

        it('should return false for invalid names', () => {
            expect(ValidationUtil.isValidName('')).toBe(false);
            expect(ValidationUtil.isValidName('   ')).toBe(false);
            expect(ValidationUtil.isValidName('a'.repeat(51))).toBe(false);
        });
    });

    describe('userDetailsAreValid', () => {
        it('should return true for valid user details', () => {
            expect(ValidationUtil.userDetailsAreValid(
                'test@example.com',
                'password123',
                'Doe',
                'John'
            )).toBe(true);
        });

        it('should return false if any detail is invalid', () => {
            expect(ValidationUtil.userDetailsAreValid(
                'invalid-email',
                'password123',
                'Doe',
                'John'
            )).toBe(false);

            expect(ValidationUtil.userDetailsAreValid(
                'test@example.com',
                'short',
                'Doe',
                'John'
            )).toBe(false);
        });
    });
}); 