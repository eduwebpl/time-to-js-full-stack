
export function formatDate(dateISO = '') {

		if(!dateISO) {
			return ''
		}

	  return new Intl.DateTimeFormat('pl-PL', {
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
	  }).format(new Date(dateISO))
}
