export interface Timestamp {
	seconds: number
	nanoseconds: number
}

export const convertTimestamp = (timestamp: Timestamp) =>
	new Date(timestamp.seconds * 1000)
