// 將 金錢數字轉為千分號 與 加上 $ 字號 

export default function (num) {
    const n = Number(num);
    return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
      const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c);
      return currency;
    })}`;
  }