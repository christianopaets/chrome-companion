type DatetimeFormats = {
    [key: string]: {
        [key: string]: Intl.DateTimeFormatOptions;
    }
}

const formats: DatetimeFormats = {
    en: {
        conversation: {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }
    }
};

export default formats;
