// ヘッダ行に"種別"が入っていればそのテーブルは利用履歴だろう
const nodesSnapshot = document.evaluate(
    '//table[./tbody/tr/td/font/text()="種別"]//tr',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
);

const ym = document.evaluate(
    '//select[@name="specifyYearMonth"]/option[@selected]/text()',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE
).singleNodeValue.nodeValue.replace('年', '-').replace('月', '')

let yy = ym.split("-")[0]
const m = ym.split("-")[1]

const d = document.evaluate(
    '//select[@name="specifyDay"]/option[@selected]/text()',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE
).singleNodeValue.nodeValue.replace(' 日', '')

const fileName = `suica-${ym}-${d}.json`;
const table = [];
let current_md = m + "/" + d

for ( var i=1 ; i < nodesSnapshot.snapshotLength; i++ )
{
    row = {};
    item = nodesSnapshot.snapshotItem(i)
    row.date = item.children[1].innerText;
    row.type1 = item.children[2].innerText;
    row.placeOfUse1 = item.children[3].innerText;
    row.type2 = item.children[4].innerText;
    row.placeOfUse2 = item.children[5].innerText;
    row.balance = item.children[6].innerText;
    row.difference = item.children[7].innerText;

    if (current_md < row.date) {
        yy = yy -1
    }
    row.date_full = `${yy}/${row.date}`
    current_md = row.date

    table.push(row);
    console.log(row)
}
const jsonData = JSON.stringify(table);

const link = document.createElement("a");
link.href = "data:text/plain," + encodeURIComponent(jsonData);
link.download = fileName;
link.click();
