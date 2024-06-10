<script setup lang="ts">
import { format } from 'date-fns'
import { saveAs } from 'file-saver'

useHeadTemplate()
const { processSrtContent } = useConverter()

const result: Ref<string> = ref('')
const resultLength = computed(() => {
  return result.value.length.toLocaleString() + '文字, ' + result.value.split(/\s+/).length.toLocaleString() + '単語'
})

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
      srtファイルからテキスト抽出
    </h1>
    <p class="mt-1">
      srtファイルからテキスト情報のみを抽出してダウンロードすることができます。<br>
      事前に結果も確認することができます。
    </p>
    <p class="mt-4">
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
        icon="i-heroicons-arrow-down-on-square-16-solid"
        label="ダウンロード"
        @click="download"
      />
      <p class="mt-4">
        {{ resultLength }}
      </p>
      <pre class="whitespace-pre-wrap bg-gray-200 dark:bg-gray-800 p-2 rounded">{{ result }}</pre>
    </div>
  </div>
</template>

<style deep>
html {
  overflow-y: scroll;
}
</style>
