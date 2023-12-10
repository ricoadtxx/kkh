// Load history from localStorage when the page loads
window.onload = function () {
	loadHistory();
};

function saveHistoryToLocalStorage(history) {
	// Save the history as a JSON string in localStorage
	localStorage.setItem("history", JSON.stringify(history));
}

function loadHistoryFromLocalStorage() {
	// Retrieve the history from localStorage
	const historyString = localStorage.getItem("history");

	// Parse the JSON string to get the history array
	return JSON.parse(historyString) || [];
}

function loadHistory() {
	const history = loadHistoryFromLocalStorage();
	const modalHistoryElement = document.getElementById("modal-history");

	// Display history in the modal
	modalHistoryElement.innerHTML = "<h2>Riwayat</h2>";
	history.forEach((entry) => {
		modalHistoryElement.innerHTML += `<p>${entry}</p>`;
	});
}

function addToHistory(entry) {
	const history = loadHistoryFromLocalStorage();
	const percobaanKe = history.length + 1;
	const historyEntry = `Percobaan ke-${percobaanKe}: ${entry}`;
	history.push(historyEntry);
	saveHistoryToLocalStorage(history);
}


function clearHistory() {
	// Menghapus riwayat dari localStorage
	localStorage.removeItem("history");

	// Memuat kembali halaman untuk menampilkan perubahan
	location.reload();
}

function hitung() {
	let sudutBiasa1 = totalSudut(
		"derajat-biasa-1",
		"menit-biasa-1",
		"detik-biasa-1",
		"derajat-biasa-2",
		"menit-biasa-2",
		"detik-biasa-2"
	);
	let sudutLuarBiasa1 = totalSudut(
		"derajat-luar-1",
		"menit-luar-1",
		"detik-luar-1",
		"derajat-luar-2",
		"menit-luar-2",
		"detik-luar-2"
	);

	document.getElementById("result1").innerHTML = `
        <p>total Sudut Biasa seri 2: ${decimalToDMS(sudutBiasa1)} derajat</p>
        <p>total Sudut Luar Biasa seri 2: ${decimalToDMS(
					sudutLuarBiasa1
				)} derajat</p>
    `;

	let sudutBiasa2 = totalSudut(
		"derajat-biasa-3",
		"menit-biasa-3",
		"detik-biasa-3",
		"derajat-biasa-4",
		"menit-biasa-4",
		"detik-biasa-4"
	);
	let sudutLuarBiasa2 = totalSudut(
		"derajat-luar-3",
		"menit-luar-3",
		"detik-luar-3",
		"derajat-luar-4",
		"menit-luar-4",
		"detik-luar-4"
	);

	let rerataSudut =
		(sudutBiasa1 + sudutBiasa2 + sudutLuarBiasa1 + sudutLuarBiasa2) / 4;

	let selisih = [
		{
			"biasa seri 1": Math.abs(rerataSudut - sudutBiasa1),
		},
		{
			"biasa seri 2": Math.abs(rerataSudut - sudutBiasa2),
		},
		{
			"luar biasa seri 1": Math.abs(rerataSudut - sudutLuarBiasa1),
		},
		{
			"luar biasa seri 2": Math.abs(rerataSudut - sudutLuarBiasa2),
		},
	];

	let torDMS = 10 / 3600;

	let pesan = "";

	for (let i = 0; i < selisih.length; i++) {
		let nilaiSelisih = Object.values(selisih[i])[0];

		if (nilaiSelisih >= torDMS) {
			pesan += `Sudut ${
				Object.keys(selisih[i])[0]
			} perlu diukur ulang (${decimalToDMS(
				nilaiSelisih
			)} lebih dari 10 detik).<br>`;
		}
	}

	document.getElementById("all-result").innerHTML = `
        <div id="result1">
            <p>total Sudut Biasa seri 1: ${decimalToDMS(
							sudutBiasa1
						)} derajat</p>
            <p>total Sudut Luar Biasa seri 1: ${decimalToDMS(
							sudutLuarBiasa1
						)} derajat</p>
        </div>
        <div id="result2">
            <p>total Sudut Biasa seri 2: ${decimalToDMS(sudutBiasa2)}</p>
            <p>total Sudut Luar Biasa seri 2: ${decimalToDMS(
							sudutLuarBiasa2
						)}</p>
        </div>
        <div id="rata-rata">
            <p>Rata-rata Sudut: ${decimalToDMS(rerataSudut)}</p>
        </div>
        <div id="hasilPerbandingan">
            ${pesan}
        </div>
    `;

	// Save the result to history
    const historyEntry = `
        <div id="result1">
            <p>total Sudut Biasa seri 2: ${decimalToDMS(sudutBiasa1)} derajat</p>
            <p>total Sudut Luar Biasa seri 2: ${decimalToDMS(sudutLuarBiasa1)} derajat</p>
        </div>
        <div id="result2">
            <p>total Sudut Biasa seri 2: ${decimalToDMS(sudutBiasa2)}</p>
            <p>total Sudut Luar Biasa seri 2: ${decimalToDMS(sudutLuarBiasa2)}</p>
        </div>
        <div id="rata-rata">
            <p>Rata-rata Sudut: ${decimalToDMS(rerataSudut)}</p>
        </div>
        <div id="hasilPerbandingan">
            ${pesan}
        </div>
    `;
    addToHistory(historyEntry);
}

function showModal() {
	// Memanggil fungsi loadHistory untuk menampilkan riwayat di dalam modal
	loadHistory();
	const modal = document.getElementById("all-result-modal");
	modal.style.display = "block";
}

function closeModal() {
	const modal = document.getElementById("all-result-modal");
	modal.style.display = "none";
}

// Menutup modal jika pengguna mengklik di luar area kontennya
window.onclick = function (event) {
	const modal = document.getElementById("all-result-modal");
	if (event.target === modal) {
		modal.style.display = "none";
	}
};

function SudutDD(derajatId, menitId, detikId) {
	let derajat = parseFloat(document.getElementById(derajatId).value) || 0;
	let menit = parseFloat(document.getElementById(menitId).value) || 0;
	let detik = parseFloat(document.getElementById(detikId).value) || 0;

	const DMStoDecimal = derajat + menit / 60 + detik / 3600;

	return DMStoDecimal;
}

function totalSudut(
	derajatId1,
	menitId1,
	detikId1,
	derajatId2,
	menitId2,
	detikId2
) {
	let sudut1 = SudutDD(derajatId1, menitId1, detikId1);
	let sudut2 = SudutDD(derajatId2, menitId2, detikId2);

	let totalSudut = sudut2 - sudut1;

	if (totalSudut < 0) {
		totalSudut += 360;
	}

	return totalSudut;
}

function decimalToDMS(decimalDegrees) {
	const derajat = Math.floor(decimalDegrees);
	const menitDecimal = (decimalDegrees - derajat) * 60;
	const menit = Math.floor(menitDecimal);
	const detik = (menitDecimal - menit) * 60;

	return `${derajat}° ${menit}' ${detik.toFixed(2)}"`;
}
