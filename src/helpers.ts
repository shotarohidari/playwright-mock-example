// Playwrightのテストで使う、APIはまだ未実装
export const fetchProfileList = async () => {
    const res = await fetch("http://maching.com/api/list/all");
    const data = await res.json();
    return data;
}