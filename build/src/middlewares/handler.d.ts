declare const handleSuccess: (reply: any, response: any) => void;
declare const handleCatch: (reply: any, error: any) => void;
declare const handleCustomError: (type: string, language: string) => Promise<{
    type: any;
    status_code: any;
    error_message: string;
}>;
declare const handleJoiError: (error: any) => Promise<never>;
export { handleCatch, handleSuccess, handleCustomError, handleJoiError, };
