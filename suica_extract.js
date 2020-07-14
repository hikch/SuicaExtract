// ヘッダ行に"種別"が入っていればそのテーブルは利用履歴だろう
const nodesSnapshot = document.evaluate(
    '//table[./tbody/tr/td/font/text()="種別"]//tr',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
);

const table = [];
for ( var i=1 ; i < nodesSnapshot.snapshotLength; i++ )
{
    row = {};
    item = nodesSnapshot.snapshotItem(i)
    row.date = item.children[0].innerText;
    row.type1 = item.children[1].innerText;
    row.placeOfUse1 = item.children[2].innerText;
    row.type2 = item.children[3].innerText;
    row.placeOfUse2 = item.children[4].innerText;
    row.balance = item.children[5].innerText;
    row.difference = item.children[6].innerText;
    table.push(row);
}
const jsonData = JSON.stringify(table);

const ym = document.evaluate(
    '//select[@name="specifyYearMonth"]/option[@selected]/text()',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE
).singleNodeValue.nodeValue.replace('/', '-')

const d = document.evaluate(
    '//select[@name="specifyDay"]/option[@selected]/text()',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE
).singleNodeValue.nodeValue

const fileName = `suica-${ym}-${d}.json`;

const link = document.createElement("a");
link.href = "data:text/plain," + encodeURIComponent(jsonData);
link.download = fileName;
link.click();
