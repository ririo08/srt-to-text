export const useTransfer = () => {
  // 時間情報、[音楽]、1文字のみの文字列、改行を削除する関数
  function processSrtContent(content: string): string {
    return content
      .split('\r')
      .map(line => line.trim()) // 各行の先頭と末尾の空白文字を削除
      .filter((line) => {
        // 行番号を除外
        if (line.match(/^\d+$/)) return false
        // 時間情報を除外
        if (line.match(/^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}$/)) return false
        // [音楽]を除外
        if (line.includes('[音楽]')) return false
        // 1文字のみの文字列を除外
        if (line.trim().length === 1) return false
        return true
      })
      .join(' ')
      .replace(/\s+/g, ' ') // 複数のスペースを1つに
      .trim() // 先頭と末尾のスペースを削除
  }

  return {
    processSrtContent,
  }
}
