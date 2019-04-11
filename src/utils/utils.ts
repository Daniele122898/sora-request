
const isAdmin = (userId: string): boolean => {
    if (userId === '192750776005689344') return true;
    return false;
};

export { isAdmin }