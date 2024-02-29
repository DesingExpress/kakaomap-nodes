export function autoFitColumnWidth(sheet) {
  for (let i = 0; i < sheet.columns.length; i += 1) {
    let dataMax = 0;
    const column = sheet.columns[i];
    for (let j = 1; j < column.values.length; j += 1) {
      const columnLength = column.values[j].length;
      if (columnLength > dataMax) {
        dataMax = columnLength;
      }
    }
    column.width = dataMax < 10 ? 10 : dataMax;
  }

  sheet.columns[1].width = 12;
}

export function tableStyle(sheet, data) {
  if (data.length > 0) {
    sheet.addTable({
      name: "contentsList",
      ref: "A1",
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "TableStyleMedium2",
      },
      columns: data[0].map((e, i) => {
        return { name: e, filterButton: false };
      }),
      rows: data.slice(1),
    });

    data.forEach((r, ri) => {
      const row = sheet.getRow(ri + 1);
      row.alignment = { vertical: "middle", horizontal: "center" };
      //   firstRow.font = { ...firstRow.font, bold: true };
    });
  }

  //   rows.forEach((row, ri) => {});
}
