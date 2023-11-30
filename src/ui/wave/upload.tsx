'use client'

import React from 'react'
import Button from '@mui/material/Button'
import { S3 } from 'aws-sdk'
import { PutObjectRequest } from 'aws-sdk/clients/s3'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props = {
  samples: File[]
  setSamples: (arg: File[]) => void
}
//s3
const s3 = new S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});
// S3に画像をアップロードし、そのURLを取得する関数
const uploadFileToS3 = async (file: File) => {
  // アップロード時のファイル名を作成
  const fileName = `${Date.now()}-${file.name}`;
  // S3へのアップロードに必要な情報をまとめるオブジェクト
  const params: PutObjectRequest = {
    Bucket: process.env.S3_BUCKET_NAME ? process.env.S3_BUCKET_NAME : '',
    Key: fileName,
    ContentType: file.type,
    Body: file,
  };
  // Bucket: アップロード先のバケット名を環境変数から取得します。
  // Key: アップロードするファイルのキーを指定します。
  // ContentType: アップロードするファイルのMIMEタイプを指定します。
  // Body: アップロードするファイルデータを指定します。

  try {
    // S3に画像をアップロードする
    const data = await s3.upload(params).promise();
    // アップロード成功時の処理
    console.log('画像アップロード成功:', data.Location);
    // アップロードされた画像のURLを取得
    return data.Location;
  } catch (error) {
    // アップロードエラー発生時の処理
    console.error('画像アップロードエラー:', error);
    // null値を返す
    return null;
  }
};

export default function FileUploader (props: Props) {
  const inputId = Math.random().toString(32).substring(2)
  const searchParams = useSearchParams()
  const pathname = usePathname();
    const { replace } = useRouter();

  const handleOnAddSample = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files: File[] = []
    
    for (const file of e.target.files) {
      files.push(file)
      console.log(file)
    }
    props.setSamples([...props.samples, ...files])
    const buildFormData = (files?: File[]) => {
      if (!files) {
        return new FormData();
      }
      // DB へアップロードするために、FormData へ append する
      // @see https://developer.mozilla.org/ja/docs/Web/API/FormData/Using_FormData_Objects
      const formData = new FormData();
      // append の第一引数はバックエンドと合わせる
      files.forEach((samples) => formData.append('samples', samples));
      return formData;
    };
    console.log(buildFormData(files))
    //uploadFileToS3(files[0])
    {/** */}
    await fetch('/api/upload', {
      method: 'POST',
      body: buildFormData(files),
    })
    const params = new URLSearchParams(searchParams);
    const waveFiles = 'VOLTA_rim_03.wav'

    params.set('file', waveFiles)
    replace(`${pathname}?${params.toString()}`);
    console.log('set')
  }

 
  return (
    <>
      
      <label htmlFor={inputId}>
        <Button variant='contained' component='span' sx={{ height: 1 ,width: 1}}>
          UPLOAD
        </Button>
        <input
          id={inputId}
          type='file'
          multiple
          accept='audio/*,.wav'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnAddSample(e)}
          style={{ display: 'none' }}
        />
      </label>
    </>
  )
}

