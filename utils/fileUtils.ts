
/**
 * Reads a File object and converts it to a Base64 data URL.
 * @param file The image file to convert.
 * @returns A promise that resolves with the Base64 data URL as a string.
 */
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error('Failed to read file as Base64 string.'));
            }
        };
        reader.onerror = (error) => reject(error);
    });
};
