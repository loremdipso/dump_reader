
// based off https://stackoverflow.com/a/33542499
export function saveDataToFile(filename: string, data: string) {
	const blob = new Blob([data], { type: "text/json" });
	const elem = window.document.createElement("a");
	elem.href = window.URL.createObjectURL(blob);
	elem.download = filename;
	document.body.appendChild(elem);
	elem.click();
	document.body.removeChild(elem);
}