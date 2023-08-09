import Papa from 'papaparse';

const parseCsv = (csvFile, callback) => {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
            callback(results.data);
        }
    })
}

export default parseCsv;