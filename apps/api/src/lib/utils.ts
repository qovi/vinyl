/**
 * Handle the result of a database operation
 * @param result - The result of the database operation
 * @param message - The message to throw if the result is empty
 * @returns The result of the database operation
 * @throws {Error} If the result is empty
 */
export function handleResult<T>(result: T[], message: string): T {
    if (!result.length) {
        throw new Error(message);
    }
    return result[0];
}