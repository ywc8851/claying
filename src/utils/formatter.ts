export const parseSubscribersCount = (count: number): string => {
	if (count < 1000) {
		return `${count}명`;
	} else if (count < 10000) {
		return `${(count / 1000).toFixed(2).replace(/\.?0+$/, "")}천명`;
	} else if (count < 100000000) {
		if (count >= 1000000) {
			return `${Math.floor(count / 10000)}만명`;
		}
		return `${(count / 10000).toFixed(2).replace(/\.?0+$/, "")}만명`;
	} else {
		return `${(count / 100000000).toFixed(1).replace(/\.?0+$/, "")}억명`;
	}
};

const formatToTwoDigits = (time: number): string => time.toString().padStart(2, "0");

export const calcuateTimeLeft = (): string => {
	const now = new Date();
	const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9, 0, 0);
	const diff = tomorrow.getTime() - now.getTime();
	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((diff / (1000 * 60)) % 60);
	const seconds = Math.floor((diff / 1000) % 60);

	return `${formatToTwoDigits(hours)}:${formatToTwoDigits(minutes)}:${formatToTwoDigits(seconds)}`;
};

const formatMinutesToTime = (minutes: number): string => {
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;
	const formattedHours = hours.toString().padStart(2, "0");
	const formattedMinutes = remainingMinutes.toString().padStart(2, "0");
	return `${formattedHours}:${formattedMinutes}`;
};

export const formatTimeRange = (startMinutes: number): string => {
	const startTime = formatMinutesToTime(startMinutes);
	return `${startTime} ~`;
};
