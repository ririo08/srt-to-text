<script setup lang="ts">
import { format } from 'date-fns'
import { saveAs } from 'file-saver'

const { processSrtContent } = useConverter()
const result: Ref<string> = ref('')
const handleFileChange = (files: FileList) => {
  const file = files[0]

  if (file) {
    // FileReaderを作成
    const reader = new FileReader()
    // ファイル読み込み完了時の処理を設定
    reader.onload = (e: ProgressEvent<FileReader>) => {
      // 読み込んだ結果を取得
      const text = e.target?.result as string
      // SRTファイルのパース処理を実行
      result.value = processSrtContent(text)
    }
    // ファイルをテキストとして読み込む
    reader.readAsText(file)
  }
}

const download = () => {
  const blob = new Blob([result.value], { type: 'text/plain;charset=utf-8' })
  const today = format(new Date(), 'yyyy-MM-dd_HHmmss')
  saveAs(blob, today + '_result.txt')
}
</script>

<template>
  <div class="max-w-xl m-auto mt-4">
    <h1 class="text-2xl font-bold">
      srtファイルから文字起こし抽出
    </h1>
    <p class="mt-2">
      srtファイルを選択してください(ドラッグ&ドロップ可)
    </p>
    <UInput
      type="file"
      accept=".srt"
      @change="handleFileChange"
    />
    <div v-if="result">
      <UButton
        class="mt-2"
        label="ダウンロード"
        @click="download"
      />
      <pre class="whitespace-pre-wrap bg-gray-800 p-2 rounded mt-4">{{ result }}</pre>
    </div>
  </div>
</template>
