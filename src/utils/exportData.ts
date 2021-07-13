import ExcelJS from "exceljs";
import { Routes, RoutesAnalysis, RoutesLayers } from "../types/routes";
import { gatherAnalysisData } from "./gatherAnalysisData";

export const exportData = async (
  routes: Routes,
  layers: RoutesLayers,
  analyses: RoutesAnalysis
) => {
  console.info(analyses);

  if (!routes || !analyses) {
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("My Sheet");

  const nameRow = sheet.getRow(1);

  Object.values(routes).forEach((route, index) => {
    const analysis = analyses[route.id];
    const gpx = layers[route.id].gpx;

    const data = gatherAnalysisData(gpx, analysis);
    const firstColumn = 5 * index + 1;

    nameRow.getCell(firstColumn).value = route.name;

    sheet.getRow(2).getCell(firstColumn).value = "Początek";
    sheet.getRow(3).getCell(firstColumn).value = data.startTime;
    sheet.getRow(4).getCell(firstColumn).value = "Koniec";
    sheet.getRow(5).getCell(firstColumn).value = data.endTime;
    sheet.getRow(6).getCell(firstColumn).value = "Długość";
    sheet.getRow(7).getCell(firstColumn).value = data.routeLength;
    sheet.getRow(8).getCell(firstColumn).value = "Pokonany dystans";
    sheet.getRow(9).getCell(firstColumn).value = data.distance;
    sheet.getRow(10).getCell(firstColumn).value = "Średnia prędkość w ruchu";
    sheet.getRow(11).getCell(firstColumn).value = data.movingSpeed;
    sheet.getRow(12).getCell(firstColumn).value =
      "Średnia prędkość dla całego przebiegu";
    sheet.getRow(13).getCell(firstColumn).value = data.totalSpeed;
    sheet.getRow(14).getCell(firstColumn).value =
      "Minimalna wysokość nad poziomem morza";
    sheet.getRow(15).getCell(firstColumn).value = data.elevationMin;
    sheet.getRow(16).getCell(firstColumn).value =
      "Maksymalna wysokość nad poziomem morza";
    sheet.getRow(17).getCell(firstColumn).value = data.elevationMax;

    sheet.getRow(19).getCell(firstColumn).value = "Precyzja lotu";
    sheet.getRow(20).getCell(firstColumn).value = "LP.";
    sheet.getRow(20).getCell(firstColumn + 1).value = "Opuszczenie trasy";
    sheet.getRow(20).getCell(firstColumn + 2).value = "Powrót na trasę";
    sheet.getRow(20).getCell(firstColumn + 3).value = "Czas poza trasą";

    if (data.offtrackIntervals.length) {
      data.offtrackIntervals.forEach((interval, intervalIndex) => {
        sheet.getRow(21 + intervalIndex).getCell(firstColumn).value =
          interval.index;
        sheet.getRow(21 + intervalIndex).getCell(firstColumn + 1).value =
          interval.start;
        sheet.getRow(21 + intervalIndex).getCell(firstColumn + 2).value =
          interval.end;
        sheet.getRow(21 + intervalIndex).getCell(firstColumn + 3).value =
          interval.duration;
      });

      sheet
        .getRow(21 + data.offtrackIntervals.length)
        .getCell(firstColumn).value = "Łącznie";
      sheet
        .getRow(21 + data.offtrackIntervals.length)
        .getCell(firstColumn + 3).value = data.offtrackIntervalsSum;
    }
  });

  // write to a new buffer
  const buffer = await workbook.xlsx.writeBuffer();
  download(buffer);
};

const download = (byte: ExcelJS.Buffer) => {
  var blob = new Blob([byte], { type: "application/xlsx" });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  var fileName = "results.xlsx";
  link.download = fileName;
  link.click();
};
