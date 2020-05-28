
const isAdmin = (userId: string): boolean => {
    if (userId === '192750776005689344') return true;
    return false;
};

const getRequestString = (state: number): string => {
    switch (state) {
        case 0:
            return "Pending";
        case 1:
            return "Accepted";
        case 2:
            return "Rejected";
        default:
            return "Unknown";
    }
}

/*public enum RequestState
    {
        Pending,
        Accepted,
        Rejected
    }*/

export { isAdmin, getRequestString }
