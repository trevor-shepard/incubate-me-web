export interface Timestamp {
	seconds: number
	nanoseconds: number
}

export const convertTimestampToDate = (timestamp: Timestamp) =>
	new Date(timestamp.seconds * 1000)


export const convertTimestampsToDates = (object: {[key: string]: any} ) => {
	const val: {[key: string]: any} = {}

	for (const key of Object.keys(object)) {
		const value = object[key]

		if (typeof object[key] === 'object') {
			val[key] = convertTimestampsToDates(value)
		}

		if (value.second && value.nanoseconds) val[key]= convertTimestampToDate(value as Timestamp)
	}

	return val
} 
